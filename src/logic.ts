// Card behavior without DOM or Lit, so it can be tested with plain Node.
// Ported from the HA frontend's hui-area-card.ts / hui-area-card-editor.ts; keep the
// behavior in sync with upstream, except that sensors replace sensor classes.
import type {
  ActionConfig,
  Aggregate,
  AggregatedSensorConfig,
  CustomAreaCardConfig,
  FeaturePosition,
  GridOptions,
  HassEntityState,
  HomeAssistant,
  LovelaceCardFeatureConfig,
} from "./types.ts";

export const DEFAULT_ASPECT_RATIO = "16:9";
/** The editor pre-fills these, like the native editor (the card itself defaults to none). */
export const DEFAULT_ALERT_CLASSES = ["motion", "moisture"];
export const SEPARATOR = " · "; // STRINGS_SEPARATOR_DOT
const HIDDEN_STATES = new Set(["unavailable", "unknown"]);
const INLINE_FEATURE_COLUMNS = 2;

/* ----------------------------------------------------------------------- config */

const isEntityList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((s) => typeof s === "string");

/** Throws for malformed `sensors` / `aggregated_sensors` (the editor then shows YAML). */
export function validateSensors(config: CustomAreaCardConfig): void {
  if (config.sensors !== undefined && !isEntityList(config.sensors)) {
    throw new Error("sensors must be a list of entity IDs");
  }
  const aggregated = config.aggregated_sensors;
  if (aggregated === undefined) return;
  if (
    !Array.isArray(aggregated) ||
    !aggregated.every(
      (item) =>
        item &&
        typeof item === "object" &&
        isEntityList(item.entities) &&
        (item.aggregate === undefined || AGGREGATES.includes(item.aggregate))
    )
  ) {
    throw new Error(
      `aggregated_sensors must be a list of {entities: [entity IDs], aggregate: ${AGGREGATES.join(" | ")}}`
    );
  }
}

export function normalizeConfig(config: CustomAreaCardConfig): CustomAreaCardConfig {
  if (!config.area) {
    throw new Error("Specify an area");
  }
  validateSensors(config);

  const displayType = config.display_type || (config.show_camera ? "camera" : "picture");
  const vertical = displayType === "compact" ? config.vertical : false;

  // Backwards compatibility: convert navigation_path to tap_action
  let tapAction = config.tap_action;
  if (config.navigation_path && !tapAction) {
    tapAction = { action: "navigate", navigation_path: config.navigation_path };
  }

  // Default image_tap_action only for the camera display type
  let imageTapAction = config.image_tap_action;
  if (displayType === "camera" && !imageTapAction) {
    imageTapAction = { action: "more-info" };
  }

  return {
    ...config,
    vertical,
    display_type: displayType,
    tap_action: tapAction || { action: "none" },
    image_tap_action: imageTapAction,
  };
}

export function stubConfig(hass: HomeAssistant): CustomAreaCardConfig {
  const area = Object.values(hass.areas)[0];
  // The native card defaults to temperature/humidity; use the area's own sensors for those.
  const sensors = [area?.temperature_entity_id, area?.humidity_entity_id].filter(
    (id): id is string => Boolean(id)
  );
  return {
    type: "custom:custom-area-card",
    area: area?.area_id || "",
    ...(sensors.length ? { sensors } : {}),
  };
}

export const hasAction = (config?: ActionConfig): boolean =>
  config !== undefined && config.action !== "none";

/* --------------------------------------------------------------------- entities */

interface AreaFilter {
  domain: string | string[];
  deviceClasses?: string[];
  exclude?: string[];
}

/**
 * Entities in an area, like generateEntityFilter with `entity_category: "none"`:
 * the entity's own area wins over its device's, and hidden entities are skipped.
 */
export function areaEntityIds(
  hass: HomeAssistant,
  areaId: string,
  { domain, deviceClasses, exclude }: AreaFilter
): string[] {
  const domains = new Set(Array.isArray(domain) ? domain : [domain]);
  const classes = deviceClasses ? new Set(deviceClasses) : undefined;
  return Object.values(hass.entities)
    .filter((entry) => {
      const id = entry.entity_id;
      const stateObj = hass.states[id];
      if (!stateObj || exclude?.includes(id)) return false;
      if (!domains.has(id.split(".")[0])) return false;
      if (classes && !classes.has(stateObj.attributes.device_class || "none")) return false;
      if (entry.hidden || entry.entity_category) return false;
      const entityArea =
        entry.area_id ?? (entry.device_id ? hass.devices[entry.device_id]?.area_id : null);
      return entityArea === areaId;
    })
    .map((entry) => entry.entity_id);
}

/** First camera in the area, for the camera display type. */
export function cameraEntity(hass: HomeAssistant, areaId: string): string | undefined {
  return areaEntityIds(hass, areaId, { domain: "camera" })[0];
}

/** The area's binary sensors with one of the alert classes. */
export const alertEntityIds = (
  hass: HomeAssistant,
  areaId: string,
  alertClasses: string[],
  exclude: string[] | undefined
): string[] =>
  areaEntityIds(hass, areaId, { domain: "binary_sensor", deviceClasses: alertClasses, exclude });

/** One active (`on`) binary sensor per alert class, in the configured order. */
export function activeAlerts(
  hass: HomeAssistant,
  alertClasses: string[] | undefined,
  entityIds: string[]
): HassEntityState[] {
  if (!alertClasses) {
    return [];
  }
  return alertClasses
    .map((alertClass) =>
      entityIds
        .map((id) => hass.states[id])
        .find(
          (stateObj) =>
            stateObj?.attributes.device_class === alertClass && stateObj.state === "on"
        )
    )
    .filter((stateObj): stateObj is HassEntityState => Boolean(stateObj));
}

/**
 * The details line: each selected sensor's formatted state, in the configured order.
 * Unavailable, unknown and deleted sensors are left out, like the native card does.
 */
export function sensorsDisplay(
  hass: HomeAssistant,
  sensors: string[] | undefined
): string | undefined {
  if (!sensors?.length) {
    return undefined;
  }
  return sensors
    .map((id) => hass.states[id])
    .filter((stateObj) => stateObj && !HIDDEN_STATES.has(stateObj.state))
    .map((stateObj) => hass.formatEntityState(stateObj))
    .filter(Boolean)
    .join(SEPARATOR);
}

export const AGGREGATES: readonly Aggregate[] = ["sum", "min", "max", "avg", "median"];
export const DEFAULT_AGGREGATE: Aggregate = "avg";

export function aggregate(values: number[], fn: Aggregate): number {
  switch (fn) {
    case "sum":
      return values.reduce((acc, v) => acc + v, 0);
    case "min":
      return Math.min(...values);
    case "max":
      return Math.max(...values);
    case "avg":
      return values.reduce((acc, v) => acc + v, 0) / values.length;
    case "median": {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }
  }
}

/**
 * One aggregated value, like the native card's sensor classes: only available numeric
 * states count, and only sensors with the unit of the first one (no mixing °C and °F).
 * Formatted as the first sensor's state, so it gets its unit and display precision;
 * without a display precision it's rounded to 1 decimal like the native card does.
 */
export function aggregatedDisplay(
  hass: HomeAssistant,
  item: AggregatedSensorConfig
): string | undefined {
  let first: HassEntityState | undefined;
  const values: number[] = [];
  for (const id of item.entities) {
    const stateObj = hass.states[id];
    if (!stateObj || HIDDEN_STATES.has(stateObj.state) || stateObj.state.trim() === "") continue;
    const value = Number(stateObj.state);
    if (!Number.isFinite(value)) continue;
    first ??= stateObj;
    if (stateObj.attributes.unit_of_measurement === first.attributes.unit_of_measurement) {
      values.push(value);
    }
  }
  if (!first) {
    return undefined;
  }
  let value = aggregate(values, item.aggregate ?? DEFAULT_AGGREGATE);
  if (hass.entities[first.entity_id]?.display_precision == null) {
    value = Math.round(value * 10) / 10;
  }
  return hass.formatEntityState(first, String(value));
}

/** The whole details line: single sensors first, then aggregated ones. */
export function detailsLine(
  hass: HomeAssistant,
  config: Pick<CustomAreaCardConfig, "sensors" | "aggregated_sensors">
): string | undefined {
  const singles = sensorsDisplay(hass, config.sensors);
  const aggregated = config.aggregated_sensors?.length
    ? config.aggregated_sensors.map((item) => aggregatedDisplay(hass, item))
    : undefined;
  if (singles === undefined && aggregated === undefined) {
    return undefined;
  }
  return [singles, ...(aggregated ?? [])].filter(Boolean).join(SEPARATOR);
}

/** Caches the last result while all arguments are identical (like memoize-one). */
export function memoizeOne<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  let lastArgs: A | undefined;
  let lastResult: R;
  return (...args: A) => {
    if (
      lastArgs &&
      lastArgs.length === args.length &&
      args.every((arg, i) => arg === lastArgs![i])
    ) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = fn(...args);
    return lastResult;
  };
}

/* ------------------------------------------------------------------------ color */

const THEME_COLORS = new Set([
  "primary", "accent", "red", "pink", "purple", "deep-purple", "indigo", "blue",
  "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber",
  "orange", "deep-orange", "brown", "light-grey", "grey", "dark-grey", "blue-grey",
  "black", "white", "primary-text", "secondary-text", "disabled",
]);

/** Theme color name → `var(--name-color)`; anything else is used as CSS as-is. */
export const computeCssColor = (color: string): string =>
  THEME_COLORS.has(color) ? `var(--${color}-color)` : color;

/* ----------------------------------------------------------------------- layout */

export const featurePosition = (config: CustomAreaCardConfig): FeaturePosition =>
  config.vertical ? "bottom" : config.features_position || "bottom";

export interface FeatureLayout {
  inline: LovelaceCardFeatureConfig[];
  below: LovelaceCardFeatureConfig[];
  columns: number;
}

export function featureLayout(config: CustomAreaCardConfig): FeatureLayout {
  const features = config.features ?? [];
  if (featurePosition(config) !== "inline") {
    return { inline: [], below: features, columns: 1 };
  }
  const below = features.slice(1);
  return {
    inline: features.slice(0, 1),
    below,
    columns: Math.min(below.length, INLINE_FEATURE_COLUMNS),
  };
}

export function featureRows(config: CustomAreaCardConfig): number {
  const { below, columns } = featureLayout(config);
  return Math.ceil(below.length / Math.max(columns, 1));
}

export function cardSize(config: CustomAreaCardConfig | undefined): number {
  const displayType = config?.display_type || "picture";
  return (
    1 +
    (displayType === "compact" ? (config?.vertical ? 1 : 0) : 2) +
    (config ? featureRows(config) : 0)
  );
}

export function gridOptions(config: CustomAreaCardConfig | undefined): GridOptions {
  let columns = 6;
  let minColumns = 6;
  let rows = 1;
  const position = config ? featurePosition(config) : "bottom";
  const featuresCount = config?.features?.length || 0;
  if (config && featuresCount) {
    if (position === "inline") {
      minColumns = 12;
      columns = 12;
    }
    rows += featureRows(config);
  }
  if (config?.vertical) {
    rows++;
    minColumns = 3;
  }
  if ((config?.display_type || "picture") !== "compact") {
    rows += position === "inline" && featuresCount > 0 ? 3 : 2;
  }
  return { columns, rows, min_columns: minColumns, min_rows: rows };
}

/* ----------------------------------------------------------------------- editor */

/** Form data for the editor: the config plus the defaults the form displays. */
export function editorData(config: CustomAreaCardConfig): Record<string, unknown> {
  const displayType = config.display_type || (config.show_camera ? "camera" : "picture");
  const vertical = Boolean(config.vertical) && displayType === "compact";
  const data: Record<string, unknown> = {
    camera_view: "auto",
    alert_classes: DEFAULT_ALERT_CLASSES,
    display_type: displayType,
    content_layout: vertical ? "vertical" : "horizontal",
    ...config,
  };
  delete data.show_camera;
  if (config.navigation_path && !config.tap_action) {
    data.tap_action = { action: "navigate", navigation_path: config.navigation_path };
  }
  if (!data.features_position || vertical) {
    data.features_position = "bottom";
  }
  return data;
}

/** Turns the editor's form value back into a card config, like the native editor. */
export function editorValueToConfig(
  value: Record<string, unknown>,
  features: LovelaceCardFeatureConfig[] | undefined
): CustomAreaCardConfig {
  const config = { features, ...value } as CustomAreaCardConfig;
  if (!config.features) delete config.features;
  delete config.show_camera;
  if (config.tap_action && config.navigation_path) delete config.navigation_path;
  if (config.display_type !== "camera") delete config.camera_view;
  if (
    config.image_tap_action &&
    (config.display_type === "compact" ||
      (config.display_type !== "camera" && config.image_tap_action.action === "more-info"))
  ) {
    delete config.image_tap_action;
  }
  if (config.content_layout) {
    config.vertical = config.content_layout === "vertical";
    delete config.content_layout;
  }
  if (Array.isArray(config.sensors) && config.sensors.length === 0) delete config.sensors;
  if (Array.isArray(config.aggregated_sensors)) {
    // The list dialog can save entries without sensors; those would never show anything.
    const items = config.aggregated_sensors.filter((item) => item?.entities?.length);
    if (items.length) config.aggregated_sensors = items;
    else delete config.aggregated_sensors;
  }
  return config;
}

/** Device classes of the area's binary sensors, for the alert classes picker. */
export function binaryClassesForArea(
  hass: HomeAssistant,
  areaId: string | undefined,
  exclude: string[] | undefined
): string[] {
  if (!areaId) return [];
  const classes = areaEntityIds(hass, areaId, { domain: "binary_sensor", exclude })
    .map((id) => hass.states[id].attributes.device_class)
    .filter((c): c is string => Boolean(c));
  return [...new Set(classes)];
}
