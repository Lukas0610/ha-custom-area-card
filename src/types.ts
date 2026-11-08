// The subset of Home Assistant's frontend types this card uses. HA doesn't publish its
// frontend types as a package, so they're declared here.

export interface HassEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, any> & {
    device_class?: string;
    unit_of_measurement?: string;
  };
}

export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  area_id?: string | null;
  hidden?: boolean;
  entity_category?: "config" | "diagnostic" | null;
}

export interface DeviceRegistryEntry {
  id: string;
  area_id?: string | null;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
  icon?: string | null;
  picture?: string | null;
  temperature_entity_id?: string | null;
  humidity_entity_id?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntityState>;
  entities: Record<string, EntityRegistryEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  areas: Record<string, AreaRegistryEntry>;
  locale: { language: string };
  localize: (key: string, ...args: any[]) => string;
  formatEntityState: (stateObj: HassEntityState, state?: string) => string;
}

export interface ActionConfig {
  action: string;
  [key: string]: unknown;
}

export interface LovelaceCardFeatureConfig {
  type: string;
  [key: string]: unknown;
}

export type DisplayType = "compact" | "icon" | "picture" | "camera";
export type FeaturePosition = "bottom" | "inline";

export interface CustomAreaCardConfig {
  type: string;
  area?: string;
  name?: string;
  color?: string;
  /** Entity IDs shown in the details line, in this order. */
  sensors?: string[];
  alert_classes?: string[];
  display_type?: DisplayType;
  /** @deprecated Use `display_type` instead (kept for configs copied from the area card). */
  show_camera?: boolean;
  vertical?: boolean;
  camera_view?: "auto" | "live";
  aspect_ratio?: string;
  features?: LovelaceCardFeatureConfig[];
  features_position?: FeaturePosition;
  exclude_entities?: string[];
  /** @deprecated Use `tap_action` instead (kept for configs copied from the area card). */
  navigation_path?: string;
  tap_action?: ActionConfig;
  image_tap_action?: ActionConfig;
  grid_options?: { rows?: number | "auto"; columns?: number | "full" };
  [key: string]: unknown;
}

export interface GridOptions {
  columns: number;
  rows: number;
  min_columns: number;
  min_rows: number;
}
