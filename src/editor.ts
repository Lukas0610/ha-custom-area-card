import { mdiGestureTap, mdiListBox, mdiTextShort } from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { loadEditorComponents } from "./load.ts";
import { localize as ownLocalize, type StringKey } from "./localize.ts";
import {
  AGGREGATES,
  binaryClassesForArea,
  DEFAULT_AGGREGATE,
  DEFAULT_ALERT_CLASSES,
  editorData,
  editorValueToConfig,
  memoizeOne,
  validateSensors,
} from "./logic.ts";
import type {
  CustomAreaCardConfig,
  DisplayType,
  HomeAssistant,
  LovelaceCardFeatureConfig,
} from "./types.ts";

type Schema = Record<string, any>;
type Localize = HomeAssistant["localize"];
type SelectOption = { value: string; label: string };

// Same as ACTION_RELATED_CONTEXT in the frontend's hui-action-editor.ts
const ACTION_RELATED_CONTEXT = { entity_id: "entity", area_id: "area" };

function fire(node: HTMLElement, type: string, detail: unknown) {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

@customElement("custom-area-card-editor")
export class CustomAreaCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: CustomAreaCardConfig;

  @state() private _loaded = false;

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this._loaded) {
      loadEditorComponents().then(
        () => (this._loaded = true),
        (err) => console.error("custom-area-card: could not load editor components", err)
      );
    }
  }

  public setConfig(config: CustomAreaCardConfig): void {
    // On error, the dashboard falls back to the YAML editor and shows the message.
    validateSensors(config);
    const displayType = config.display_type || (config.show_camera ? "camera" : "picture");
    this._config = { ...config, display_type: displayType };
    delete this._config.show_camera;
  }

  private _featureContext = memoizeOne((area?: string, exclude?: string[]) => ({
    area_id: area,
    exclude_entities: exclude,
  }));

  private _schema = memoizeOne(
    (
      localize: Localize,
      language: string,
      displayType: DisplayType,
      binaryClasses: SelectOption[]
    ): Schema[] => [
      { name: "area", selector: { area: {} } },
      {
        name: "content",
        flatten: true,
        type: "expandable",
        iconPath: mdiTextShort,
        schema: [
          {
            name: "",
            type: "grid",
            schema: [
              { name: "name", selector: { text: {} } },
              { name: "color", selector: { ui_color: {} } },
              {
                name: "display_type",
                required: true,
                selector: {
                  select: {
                    options: ["compact", "icon", "picture", "camera"].map((value) => ({
                      value,
                      label: localize(
                        `ui.panel.lovelace.editor.card.area.display_type_options.${value}`
                      ),
                    })),
                    mode: "dropdown",
                  },
                },
              },
              ...(displayType === "compact"
                ? [
                    {
                      name: "content_layout",
                      required: true,
                      selector: {
                        select: {
                          mode: "dropdown",
                          options: ["horizontal", "vertical"].map((value) => ({
                            value,
                            label: localize(
                              `ui.panel.lovelace.editor.card.area.content_layout_options.${value}`
                            ),
                          })),
                        },
                      },
                    },
                  ]
                : []),
              ...(displayType === "camera"
                ? [
                    {
                      name: "camera_view",
                      selector: {
                        select: {
                          options: ["auto", "live"].map((value) => ({
                            value,
                            label: localize(
                              `ui.panel.lovelace.editor.card.generic.camera_view_options.${value}`
                            ),
                          })),
                          mode: "dropdown",
                        },
                      },
                    },
                  ]
                : []),
            ],
          },
          {
            name: "alert_classes",
            selector: {
              select: { reorder: true, multiple: true, custom_value: true, options: binaryClasses },
            },
          },
          {
            // The one difference to the native editor: entities instead of sensor classes
            name: "sensors",
            selector: { entity: { multiple: true, reorder: true, filter: { domain: "sensor" } } },
          },
          {
            // HA's list editor: add/edit entries in a dialog, delete, reorder
            name: "aggregated_sensors",
            selector: {
              object: {
                multiple: true,
                reorder: true,
                fields: {
                  entities: {
                    label: ownLocalize(language, "sensors"),
                    required: true,
                    selector: { entity: { multiple: true, filter: { domain: "sensor" } } },
                  },
                  aggregate: {
                    label: ownLocalize(language, "aggregate"),
                    required: true,
                    default: DEFAULT_AGGREGATE,
                    selector: {
                      select: {
                        mode: "dropdown",
                        options: AGGREGATES.map((value) => ({
                          value,
                          label: ownLocalize(language, `aggregate_${value}`),
                        })),
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      {
        name: "interactions",
        type: "expandable",
        flatten: true,
        iconPath: mdiGestureTap,
        schema: [
          {
            name: "tap_action",
            selector: {
              ui_action: {
                default_action: "none",
                actions: ["navigate", "url", "perform-action", "none"],
              },
            },
            context: ACTION_RELATED_CONTEXT,
          },
          ...(displayType !== "compact"
            ? [
                {
                  name: "image_tap_action",
                  selector: {
                    ui_action: {
                      default_action: displayType === "camera" ? "more-info" : "none",
                      actions:
                        displayType === "camera"
                          ? ["more-info", "navigate", "url", "perform-action", "none"]
                          : ["navigate", "url", "perform-action", "none"],
                    },
                  },
                  context: ACTION_RELATED_CONTEXT,
                },
              ]
            : []),
        ],
      },
    ]
  );

  private _featuresSchema = memoizeOne((localize: Localize, vertical: boolean): Schema[] => [
    {
      name: "features_position",
      required: true,
      selector: {
        select: {
          mode: "box",
          options: ["bottom", "inline"].map((value) => ({
            label: localize(
              `ui.panel.lovelace.editor.card.tile.features_position_options.${value}`
            ),
            description: localize(
              `ui.panel.lovelace.editor.card.tile.features_position_options.${value}_description`
            ),
            value,
            image: {
              src: `/static/images/form/tile_features_position_${value}.svg`,
              src_dark: `/static/images/form/tile_features_position_${value}_dark.svg`,
              flip_rtl: true,
            },
            disabled: vertical && value === "inline",
          })),
        },
      },
    },
  ]);

  private _binaryOptions = memoizeOne(
    (
      _entities: HomeAssistant["entities"],
      area: string | undefined,
      exclude: string[] | undefined,
      current: string[]
    ): SelectOption[] => {
      const hass = this.hass!;
      const possible = binaryClassesForArea(hass, area, exclude);
      return [...new Set([...possible, ...current])]
        .map((deviceClass) => ({
          value: deviceClass,
          label:
            hass.localize(`component.binary_sensor.entity_component.${deviceClass}.name`) ||
            deviceClass,
        }))
        .sort((a, b) =>
          a.label.localeCompare(b.label, hass.locale.language, { sensitivity: "base" })
        );
    }
  );

  protected render() {
    if (!this.hass || !this._config || !this._loaded) {
      return nothing;
    }
    const config = this._config;
    const displayType = config.display_type || "picture";
    const vertical = Boolean(config.vertical) && displayType === "compact";
    const data = editorData(config);
    const schema = this._schema(
      this.hass.localize,
      this.hass.locale.language,
      displayType,
      this._binaryOptions(
        this.hass.entities,
        config.area,
        config.exclude_entities,
        config.alert_classes || DEFAULT_ALERT_CLASSES
      )
    );
    const context = this._featureContext(config.area, config.exclude_entities);
    // Area-based features (area controls) need an existing area
    const hasCompatibleFeatures = Boolean(config.area && this.hass.areas[config.area]);

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <ha-expansion-panel outlined>
        <ha-svg-icon slot="leading-icon" .path=${mdiListBox}></ha-svg-icon>
        <h3 slot="header">
          ${this.hass.localize("ui.panel.lovelace.editor.card.generic.features")}
        </h3>
        <div class="content">
          ${hasCompatibleFeatures
            ? html`
                <ha-form
                  class="features-form"
                  .hass=${this.hass}
                  .data=${data}
                  .schema=${this._featuresSchema(this.hass.localize, vertical)}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._valueChanged}
                ></ha-form>
              `
            : nothing}
          <hui-card-features-editor
            .hass=${this.hass}
            .context=${context}
            .features=${config.features ?? []}
            @features-changed=${this._featuresChanged}
            @edit-detail-element=${this._editDetailElement}
          ></hui-card-features-editor>
        </div>
      </ha-expansion-panel>
    `;
  }

  private _valueChanged(ev: CustomEvent<{ value: Record<string, unknown> }>) {
    ev.stopPropagation();
    fire(this, "config-changed", {
      config: editorValueToConfig(ev.detail.value, this._config!.features),
    });
  }

  private _featuresChanged(ev: CustomEvent<{ features: LovelaceCardFeatureConfig[] }>) {
    ev.stopPropagation();
    const features = ev.detail.features;
    const config: CustomAreaCardConfig = { ...this._config!, features };
    if (features.length === 0) delete config.features;
    fire(this, "config-changed", { config });
  }

  private _editDetailElement(ev: CustomEvent<{ subElementConfig: { index: number } }>) {
    ev.stopPropagation();
    const index = ev.detail.subElementConfig.index;
    fire(this, "edit-sub-element", {
      config: this._config!.features![index],
      saveConfig: (feature: LovelaceCardFeatureConfig) => this._updateFeature(index, feature),
      context: this._featureContext(this._config!.area, this._config!.exclude_entities),
      type: "feature",
    });
  }

  private _updateFeature(index: number, feature: LovelaceCardFeatureConfig) {
    const features = [...this._config!.features!];
    features[index] = feature;
    fire(this, "config-changed", { config: { ...this._config!, features } });
  }

  private _computeHelper = (schema: Schema): string | undefined => {
    switch (schema.name) {
      case "alert_classes":
        return this._config?.display_type === "compact"
          ? this.hass!.localize("ui.panel.lovelace.editor.card.area.alert_classes_helper")
          : undefined;
      case "sensors":
      case "aggregated_sensors":
        return ownLocalize(this.hass!.locale.language, `${schema.name}_helper` as StringKey);
      default:
        return undefined;
    }
  };

  private _computeLabel = (schema: Schema): string => {
    const l = this.hass!.localize;
    switch (schema.name) {
      case "area":
        return l("ui.panel.lovelace.editor.card.area.name");
      case "sensors":
      case "aggregated_sensors":
        return ownLocalize(this.hass!.locale.language, schema.name as StringKey);
      case "name":
      case "camera_view":
      case "content":
      case "interactions":
      case "tap_action":
        return l(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
      case "features_position":
        return l(`ui.panel.lovelace.editor.card.tile.${schema.name}`);
      default:
        return l(`ui.panel.lovelace.editor.card.area.${schema.name}`);
    }
  };

  // configElementStyle (expansion panel part) + hui-area-card-editor styles
  static styles = css`
    ha-form {
      display: block;
      margin-bottom: 24px;
    }
    .features-form {
      margin-bottom: 8px;
    }
    ha-expansion-panel {
      display: block;
      --expansion-panel-content-padding: 0;
      border-radius: var(--ha-border-radius-md);
      --ha-card-border-radius: var(--ha-border-radius-md);
    }
    ha-expansion-panel .content {
      padding: 12px;
    }
    ha-expansion-panel > *[slot="header"] {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
    }
    ha-expansion-panel ha-svg-icon {
      color: var(--secondary-text-color);
    }
  `;
}
