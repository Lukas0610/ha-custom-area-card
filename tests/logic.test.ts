import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { localize, STRINGS } from "../src/localize.ts";
import {
  activeAlerts,
  aggregate,
  aggregatedDisplay,
  alertEntityIds,
  detailsLine,
  validateSensors,
  cameraEntity,
  cardSize,
  computeCssColor,
  editorData,
  editorValueToConfig,
  gridOptions,
  normalizeConfig,
  sensorsDisplay,
  stubConfig,
} from "../src/logic.ts";
import type { CustomAreaCardConfig, HomeAssistant } from "../src/types.ts";

type Spec = { state: string; dc?: string; unit?: string; area?: string; device?: string; hidden?: boolean; category?: "config" };

function fakeHass(specs: Record<string, Spec>): HomeAssistant {
  return {
    states: Object.fromEntries(
      Object.entries(specs).map(([id, s]) => [
        id,
        { entity_id: id, state: s.state, attributes: { device_class: s.dc, unit_of_measurement: s.unit } },
      ])
    ),
    entities: Object.fromEntries(
      Object.entries(specs).map(([id, s]) => [
        id,
        { entity_id: id, area_id: s.area ?? null, device_id: s.device ?? null, hidden: s.hidden, entity_category: s.category ?? null },
      ])
    ),
    devices: { dev1: { id: "dev1", area_id: "living" } },
    areas: { living: { area_id: "living", name: "Living room", temperature_entity_id: "sensor.t" } },
    locale: { language: "en" },
    localize: (key: string) => key,
    formatEntityState: (s, state) => `${state ?? s.state} ${s.attributes.unit_of_measurement ?? ""}`.trim(),
  };
}

const card = (extra: Partial<CustomAreaCardConfig> = {}): CustomAreaCardConfig =>
  ({ type: "custom:custom-area-card", area: "living", ...extra });

test("details line shows the sensors in the configured order", () => {
  const hass = fakeHass({ "sensor.t": { state: "21.5", unit: "°C" }, "sensor.h": { state: "40", unit: "%" } });
  assert.equal(sensorsDisplay(hass, ["sensor.h", "sensor.t"]), "40 % · 21.5 °C");
});

test("details line hides unavailable, unknown and deleted sensors", () => {
  const hass = fakeHass({
    "sensor.a": { state: "unavailable" },
    "sensor.b": { state: "unknown" },
    "sensor.c": { state: "3", unit: "W" },
  });
  assert.equal(sensorsDisplay(hass, ["sensor.a", "sensor.b", "sensor.gone", "sensor.c"]), "3 W");
  assert.equal(sensorsDisplay(hass, ["sensor.a"]), "");
  assert.equal(sensorsDisplay(hass, []), undefined);
  assert.equal(sensorsDisplay(hass, undefined), undefined);
});

test("aggregate functions", () => {
  const v = [4, 1, 3, 2];
  assert.equal(aggregate(v, "sum"), 10);
  assert.equal(aggregate(v, "min"), 1);
  assert.equal(aggregate(v, "max"), 4);
  assert.equal(aggregate(v, "avg"), 2.5);
  assert.equal(aggregate(v, "median"), 2.5);
  assert.equal(aggregate([5, 1, 3], "median"), 3);
});

test("aggregated sensors: numeric, available, same unit as the first", () => {
  const hass = fakeHass({
    "sensor.off": { state: "unavailable", unit: "°F" },
    "sensor.text": { state: "high", unit: "°F" },
    "sensor.a": { state: "20", unit: "°C" },
    "sensor.f": { state: "70", unit: "°F" },
    "sensor.b": { state: "21.25", unit: "°C" },
    "sensor.empty": { state: "", unit: "°C" },
  });
  const all = ["sensor.off", "sensor.text", "sensor.a", "sensor.f", "sensor.b", "sensor.empty"];
  assert.equal(aggregatedDisplay(hass, { entities: all, aggregate: "avg" }), "20.6 °C", "rounded to 1 decimal");
  assert.equal(aggregatedDisplay(hass, { entities: all }), "20.6 °C", "defaults to avg");
  assert.equal(aggregatedDisplay(hass, { entities: all, aggregate: "max" }), "21.3 °C");
  assert.equal(aggregatedDisplay(hass, { entities: ["sensor.off", "sensor.text"] }), undefined);

  hass.entities["sensor.a"].display_precision = 2;
  assert.equal(
    aggregatedDisplay(hass, { entities: all, aggregate: "sum" }),
    "41.25 °C",
    "display precision of the first sensor is left to formatEntityState"
  );
});

test("details line: single sensors first, then aggregated ones", () => {
  const hass = fakeHass({
    "sensor.t": { state: "21", unit: "°C" },
    "sensor.p1": { state: "100", unit: "W" },
    "sensor.p2": { state: "50.5", unit: "W" },
    "sensor.off": { state: "unknown", unit: "W" },
  });
  assert.equal(
    detailsLine(hass, {
      sensors: ["sensor.t"],
      aggregated_sensors: [
        { entities: ["sensor.off"], aggregate: "sum" },
        { entities: ["sensor.p1", "sensor.p2"], aggregate: "sum" },
      ],
    }),
    "21 °C · 150.5 W"
  );
  assert.equal(detailsLine(hass, { aggregated_sensors: [{ entities: ["sensor.p1"] }] }), "100 W");
  assert.equal(detailsLine(hass, { aggregated_sensors: [{ entities: ["sensor.off"] }] }), "");
  assert.equal(detailsLine(hass, { sensors: [], aggregated_sensors: [] }), undefined);
});

test("aggregated sensors are validated", () => {
  const ok = (aggregated_sensors: unknown) => validateSensors(card({ aggregated_sensors } as any));
  ok(undefined);
  ok([{ entities: ["sensor.a"] }, { entities: [], aggregate: "median" }]);
  assert.throws(() => ok({ entities: ["sensor.a"] }));
  assert.throws(() => ok([{ entities: "sensor.a" }]));
  assert.throws(() => ok([{ entities: ["sensor.a"], aggregate: "mean" }]));
  assert.throws(() => ok(["sensor.a"]));
  assert.throws(() => normalizeConfig(card({ aggregated_sensors: [{}] } as any)), /aggregated_sensors/);
});

test("config is normalized like the native card", () => {
  assert.throws(() => normalizeConfig(card({ area: "" })), /Specify an area/);
  assert.throws(() => normalizeConfig(card({ sensors: "sensor.t" as any })), /list of entity IDs/);

  const c = normalizeConfig(card({ vertical: true, navigation_path: "/x" }));
  assert.equal(c.display_type, "picture");
  assert.equal(c.vertical, false, "vertical only applies to compact");
  assert.deepEqual(c.tap_action, { action: "navigate", navigation_path: "/x" });

  const cam = normalizeConfig(card({ show_camera: true }));
  assert.equal(cam.display_type, "camera");
  assert.deepEqual(cam.image_tap_action, { action: "more-info" });
  assert.deepEqual(cam.tap_action, { action: "none" });
});

test("area membership: entity area wins, device area is inherited, hidden/config skipped", () => {
  const hass = fakeHass({
    "binary_sensor.own": { state: "on", dc: "motion", area: "living" },
    "binary_sensor.via_device": { state: "on", dc: "moisture", device: "dev1" },
    "binary_sensor.moved": { state: "on", dc: "motion", device: "dev1", area: "kitchen" },
    "binary_sensor.hidden": { state: "on", dc: "motion", area: "living", hidden: true },
    "binary_sensor.config": { state: "on", dc: "motion", area: "living", category: "config" },
    "camera.door": { state: "idle", device: "dev1" },
  });
  const ids = alertEntityIds(hass, "living", ["motion", "moisture"], undefined);
  assert.deepEqual(ids.sort(), ["binary_sensor.own", "binary_sensor.via_device"]);
  assert.equal(cameraEntity(hass, "living"), "camera.door");
  assert.deepEqual(alertEntityIds(hass, "living", ["motion"], ["binary_sensor.own"]), []);
});

test("one active alert per class, in the configured order", () => {
  const hass = fakeHass({
    "binary_sensor.m1": { state: "off", dc: "motion", area: "living" },
    "binary_sensor.m2": { state: "on", dc: "motion", area: "living" },
    "binary_sensor.m3": { state: "on", dc: "motion", area: "living" },
    "binary_sensor.w": { state: "on", dc: "moisture", area: "living" },
  });
  const classes = ["moisture", "motion", "door"];
  const alerts = activeAlerts(hass, classes, alertEntityIds(hass, "living", classes, undefined));
  assert.deepEqual(alerts.map((s) => s.entity_id), ["binary_sensor.w", "binary_sensor.m2"]);
  assert.deepEqual(activeAlerts(hass, undefined, []), []);
});

test("grid options and card size match the native card", () => {
  const c = (extra: Partial<CustomAreaCardConfig>) => normalizeConfig(card(extra));
  assert.deepEqual(gridOptions(c({})), { columns: 6, rows: 3, min_columns: 6, min_rows: 3 });
  assert.deepEqual(gridOptions(c({ display_type: "compact" })), { columns: 6, rows: 1, min_columns: 6, min_rows: 1 });
  assert.deepEqual(gridOptions(c({ display_type: "compact", vertical: true })), { columns: 6, rows: 2, min_columns: 3, min_rows: 2 });
  const f = [{ type: "area-controls" }, { type: "a" }, { type: "b" }];
  assert.deepEqual(gridOptions(c({ features: f, features_position: "inline" })), { columns: 12, rows: 5, min_columns: 12, min_rows: 5 });
  assert.equal(cardSize(c({})), 3);
  assert.equal(cardSize(c({ features: f })), 6);
});

test("editor round-trip cleans up like the native editor", () => {
  const data = editorData(card({ show_camera: true, navigation_path: "/x" }));
  assert.equal(data.display_type, "camera");
  assert.equal(data.content_layout, "horizontal");
  assert.equal(data.features_position, "bottom");
  assert.deepEqual(data.alert_classes, ["motion", "moisture"]);
  assert.ok(!("show_camera" in data));

  const config = editorValueToConfig(
    { ...data, display_type: "compact", content_layout: "vertical", sensors: [], image_tap_action: { action: "none" } },
    undefined
  );
  assert.equal(config.vertical, true);
  for (const key of ["content_layout", "camera_view", "navigation_path", "image_tap_action", "sensors", "features", "show_camera"]) {
    assert.ok(!(key in config), key);
  }

  const agg = (aggregated_sensors: unknown) =>
    editorValueToConfig({ type: "x", area: "a", aggregated_sensors }, undefined).aggregated_sensors;
  assert.equal(agg([]), undefined);
  assert.equal(agg([{ aggregate: "sum" }, { entities: [] }]), undefined, "entries without sensors are dropped");
  assert.deepEqual(agg([{ entities: ["sensor.a"], aggregate: "min" }, { entities: [] }]), [
    { entities: ["sensor.a"], aggregate: "min" },
  ]);
});

test("stub config uses the area's temperature and humidity sensors", () => {
  assert.deepEqual(stubConfig(fakeHass({})), { type: "custom:custom-area-card", area: "living", sensors: ["sensor.t"] });
});

test("theme colors resolve to CSS variables", () => {
  assert.equal(computeCssColor("red"), "var(--red-color)");
  assert.equal(computeCssColor("#ff0000"), "#ff0000");
});

test("translations: same keys in every language, English fallback", () => {
  const keys = Object.keys(STRINGS.en).sort();
  for (const [lang, table] of Object.entries(STRINGS)) {
    assert.deepEqual(Object.keys(table).sort(), keys, lang);
  }
  assert.equal(localize("de-AT", "sensors"), "Sensoren");
  assert.equal(localize("fr", "sensors"), "Sensors");
  assert.equal(localize(undefined, "sensors"), "Sensors");
});

test("version is SemVer without a v prefix and has a changelog section", () => {
  const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.match(version, /^\d+\.\d+\.\d+(-?(a|b|rc|dev)\d+)?$/);
  const changelog = readFileSync(new URL("../CHANGELOG.md", import.meta.url), "utf8");
  assert.ok(changelog.includes(`## [${version}]`));
});
