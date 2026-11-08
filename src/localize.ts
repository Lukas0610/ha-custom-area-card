// Strings Home Assistant has no translation for. Everything else uses hass.localize with
// the native area card's keys, so it is translated into every language HA supports.
// Every key must exist in all languages (tests/logic.test.ts checks this).

export const STRINGS = {
  en: {
    name: "Custom area card",
    description: "The area card, with individually selected sensors in the details line.",
    sensors: "Sensors",
    sensors_helper: "Shown in the details line in this order. Unavailable sensors are hidden.",
    aggregated_sensors: "Aggregated sensors",
    aggregated_sensors_helper:
      "Each entry combines several sensors into one value, shown after the sensors above. Only sensors with the same unit as the first are combined.",
    aggregate: "Aggregation",
    aggregate_sum: "Sum",
    aggregate_min: "Minimum",
    aggregate_max: "Maximum",
    aggregate_avg: "Average",
    aggregate_median: "Median",
  },
  de: {
    name: "Benutzerdefinierte Bereichskarte",
    description: "Die Bereichskarte, mit einzeln ausgewählten Sensoren in der Detailzeile.",
    sensors: "Sensoren",
    sensors_helper:
      "Werden in dieser Reihenfolge in der Detailzeile angezeigt. Nicht verfügbare Sensoren werden ausgeblendet.",
    aggregated_sensors: "Aggregierte Sensoren",
    aggregated_sensors_helper:
      "Jeder Eintrag fasst mehrere Sensoren zu einem Wert zusammen, angezeigt nach den Sensoren oben. Es werden nur Sensoren mit derselben Einheit wie der erste zusammengefasst.",
    aggregate: "Aggregation",
    aggregate_sum: "Summe",
    aggregate_min: "Minimum",
    aggregate_max: "Maximum",
    aggregate_avg: "Durchschnitt",
    aggregate_median: "Median",
  },
} as const;

export type StringKey = keyof (typeof STRINGS)["en"];

export function localize(language: string | undefined, key: StringKey): string {
  const lang = (language || "en").toLowerCase();
  const table: Record<StringKey, string> =
    (STRINGS as Record<string, Record<StringKey, string>>)[lang] ??
    (STRINGS as Record<string, Record<StringKey, string>>)[lang.split("-")[0]] ??
    STRINGS.en;
  return table[key] ?? STRINGS.en[key];
}
