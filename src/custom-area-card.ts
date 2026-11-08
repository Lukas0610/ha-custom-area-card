import { mdiTextureBox } from "@mdi/js";
import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { loadCardComponents } from "./load.ts";
import { localize } from "./localize.ts";
import {
  activeAlerts,
  alertEntityIds,
  cameraEntity,
  cardSize,
  computeCssColor,
  DEFAULT_ASPECT_RATIO,
  featureLayout,
  featurePosition,
  gridOptions,
  hasAction,
  memoizeOne,
  normalizeConfig,
  sensorsDisplay,
  stubConfig,
} from "./logic.ts";
import type { ActionConfig, CustomAreaCardConfig, GridOptions, HomeAssistant } from "./types.ts";
import "./editor.ts";

declare const __VERSION__: string;

const CARD_TYPE = "custom-area-card";

@customElement(CARD_TYPE)
export class CustomAreaCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  /** Set by the dashboard: "grid" in sections views, "panel" in panel views. */
  @property({ attribute: false }) public layout?: string;

  @state() private _config?: CustomAreaCardConfig;

  @state() private _loaded = false;

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement("custom-area-card-editor");
  }

  public static getStubConfig(hass: HomeAssistant): CustomAreaCardConfig {
    return stubConfig(hass);
  }

  public setConfig(config: CustomAreaCardConfig): void {
    this._config = normalizeConfig(config);
  }

  public getCardSize(): number {
    return cardSize(this._config);
  }

  public getGridOptions(): GridOptions {
    return gridOptions(this._config);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this._loaded) {
      loadCardComponents().then(
        () => (this._loaded = true),
        (err) => console.error(`${CARD_TYPE}: could not load card components`, err)
      );
    }
  }

  private _featureContext = memoizeOne((area?: string, exclude?: string[]) => ({
    area_id: area,
    exclude_entities: exclude,
  }));

  private _alertEntityIds = memoizeOne(
    (_entities: HomeAssistant["entities"], area: string, classes: string[], exclude?: string[]) =>
      alertEntityIds(this.hass!, area, classes, exclude)
  );

  private _cameraEntity = memoizeOne((_entities: HomeAssistant["entities"], area: string) =>
    cameraEntity(this.hass!, area)
  );

  private get _hasImageAction(): boolean {
    if (this._config?.display_type === "compact") return false;
    // The image is interactive if it has its own action or the card has one
    return hasAction(this._config?.image_tap_action) || hasAction(this._config?.tap_action);
  }

  private _fireAction(config: Record<string, unknown>, action: string) {
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config, action },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleAction(ev: CustomEvent<{ action: string }>) {
    this._fireAction(this._config!, ev.detail.action);
  }

  private _handleImageAction() {
    const config = this._config!;
    if (!hasAction(config.image_tap_action)) {
      this._fireAction(config, "tap");
      return;
    }
    const entity =
      config.display_type === "camera"
        ? this._cameraEntity(this.hass!.entities, config.area!)
        : undefined;
    this._fireAction({ entity, tap_action: config.image_tap_action as ActionConfig }, "tap");
  }

  private _handleImageKeyDown(ev: KeyboardEvent) {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this._handleImageAction();
    }
  }

  private _alerts() {
    const { area, alert_classes: classes, exclude_entities: exclude } = this._config!;
    if (!classes) return [];
    return activeAlerts(
      this.hass!,
      classes,
      this._alertEntityIds(this.hass!.entities, area!, classes, exclude)
    );
  }

  private _renderAlertBadge(): TemplateResult | typeof nothing {
    const [stateObj] = this._alerts();
    if (!stateObj) return nothing;
    return html`
      <ha-tile-badge class="alert-badge">
        <ha-state-icon .hass=${this.hass} .stateObj=${stateObj}></ha-state-icon>
      </ha-tile-badge>
    `;
  }

  private _renderAlerts(): TemplateResult | typeof nothing {
    const alerts = this._alerts();
    if (alerts.length === 0) return nothing;
    return html`
      <div class="alerts">
        ${alerts.map(
          (stateObj) => html`
            <div class="alert">
              <ha-state-icon .hass=${this.hass} .stateObj=${stateObj}></ha-state-icon>
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderHeader(displayType: string, areaId: string): TemplateResult {
    const config = this._config!;
    const area = this.hass!.areas[areaId];
    const camera =
      displayType === "camera" ? this._cameraEntity(this.hass!.entities, areaId) : undefined;
    const ignoreAspectRatio = this.layout === "grid" || this.layout === "panel";
    const aspectRatio = ignoreAspectRatio
      ? undefined
      : config.aspect_ratio || DEFAULT_ASPECT_RATIO;
    const interactive = this._hasImageAction;

    return html`
      <div class="header">
        <div
          class="picture"
          role=${ifDefined(interactive ? "button" : undefined)}
          tabindex=${ifDefined(interactive ? "0" : undefined)}
          @click=${interactive ? this._handleImageAction : undefined}
          @keydown=${interactive ? this._handleImageKeyDown : undefined}
        >
          ${(displayType === "picture" || displayType === "camera") && (camera || area.picture)
            ? html`
                <hui-image
                  .hass=${this.hass}
                  .cameraImage=${camera}
                  .cameraView=${config.camera_view}
                  .image=${area.picture || undefined}
                  fit-mode="cover"
                  .aspectRatio=${aspectRatio}
                ></hui-image>
              `
            : html`
                <ha-aspect-ratio .aspectRatio=${aspectRatio}>
                  <div class="icon-container">
                    ${area.icon ? html`<ha-icon .icon=${area.icon}></ha-icon>` : nothing}
                  </div>
                </ha-aspect-ratio>
              `}
        </div>
        ${this._renderAlerts()}
      </div>
    `;
  }

  protected render() {
    if (!this._config || !this.hass || !this._loaded) {
      return nothing;
    }
    const config = this._config;
    const area = config.area ? this.hass.areas[config.area] : undefined;
    if (!area) {
      return html`
        <hui-warning>${this.hass.localize("ui.card.area.area_not_found")}</hui-warning>
      `;
    }

    const displayType = config.display_type || "picture";
    const position = featurePosition(config);
    const features = featureLayout(config);
    const hasFeatures = features.inline.length > 0 || features.below.length > 0;
    const context = this._featureContext(config.area, config.exclude_entities);
    const icon = area.icon || undefined;
    const color = config.color ? computeCssColor(config.color) : undefined;
    // The picture takes the extra height, so only the compact type reserves a row
    const fixedInfoHeight =
      displayType === "compact" && this.layout === "grid" && config.grid_options?.rows !== "auto";

    return html`
      <ha-card
        style=${styleMap({ "--tile-color": color })}
        role=${ifDefined(hasFeatures ? "group" : undefined)}
        aria-labelledby=${ifDefined(hasFeatures ? "name" : undefined)}
      >
        ${displayType === "compact" ? nothing : this._renderHeader(displayType, area.area_id)}
        <ha-tile-container
          .featurePosition=${position}
          .vertical=${Boolean(config.vertical)}
          .fixedInfoHeight=${fixedInfoHeight}
          .interactive=${hasAction(config.tap_action)}
          @action=${this._handleAction}
        >
          <ha-tile-icon slot="icon" .icon=${icon} .iconPath=${icon ? undefined : mdiTextureBox}>
            ${displayType === "compact" ? this._renderAlertBadge() : nothing}
          </ha-tile-icon>
          <ha-tile-info
            slot="info"
            class=${ifDefined(config.vertical && fixedInfoHeight ? "twoline" : undefined)}
            .secondary=${sensorsDisplay(this.hass, config.sensors)}
          >
            <span slot="primary" id="name">${config.name || area.name?.trim()}</span>
          </ha-tile-info>
          ${features.inline.length > 0
            ? html`
                <hui-card-features
                  slot="features-inline"
                  .hass=${this.hass}
                  .context=${context}
                  .color=${config.color}
                  .features=${features.inline}
                  .position=${position}
                ></hui-card-features>
              `
            : nothing}
          ${features.below.length > 0
            ? html`
                <hui-card-features
                  slot="features"
                  .columns=${features.columns}
                  .hass=${this.hass}
                  .context=${context}
                  .color=${config.color}
                  .features=${features.below}
                  .position=${"bottom"}
                ></hui-card-features>
              `
            : nothing}
        </ha-tile-container>
      </ha-card>
    `;
  }

  // tileCardStyle + hui-area-card styles from the HA frontend
  static styles = css`
    :host {
      --tile-color: var(--state-icon-color);
    }
    ha-card:has(ha-tile-container[focused]) {
      --shadow-default: var(--ha-card-box-shadow, 0 0 0 0 transparent);
      --shadow-focus: 0 0 0 1px var(--tile-color);
      border-color: var(--tile-color);
      box-shadow: var(--shadow-default), var(--shadow-focus);
    }
    ha-card {
      height: 100%;
      transition:
        box-shadow 180ms ease-in-out,
        border-color 180ms ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    ha-tile-icon {
      --tile-icon-color: var(--tile-color);
    }
    .header {
      flex: 1;
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, var(--ha-border-radius-lg));
      border-end-end-radius: 0;
      border-end-start-radius: 0;
      position: relative;
      z-index: 1;
    }
    .picture {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      position: relative;
      pointer-events: none;
    }
    .picture[role="button"] {
      pointer-events: auto;
      cursor: pointer;
    }
    .picture[role="button"]:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .picture hui-image {
      height: 100%;
    }
    .picture .icon-container {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      --mdc-icon-size: var(--ha-space-12);
      color: var(--tile-color);
    }
    .picture .icon-container::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background-color: var(--tile-color);
      opacity: 0.12;
    }
    .header + ha-tile-container {
      height: auto;
      flex: none;
    }
    ha-tile-badge {
      position: absolute;
      top: 3px;
      right: 3px;
      inset-inline-end: 3px;
      inset-inline-start: initial;
    }
    hui-card-features {
      --feature-color: var(--tile-color);
    }
    .alert-badge {
      --tile-badge-background-color: var(--orange-color);
    }
    .alerts {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: row;
      gap: var(--ha-space-2);
      padding: var(--ha-space-2);
      pointer-events: none;
      z-index: 1;
    }
    .alert {
      background-color: var(--orange-color);
      border-radius: var(--ha-border-radius-lg);
      width: var(--ha-space-6);
      height: var(--ha-space-6);
      padding: 2px;
      box-sizing: border-box;
      --mdc-icon-size: var(--ha-space-4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    ha-tile-info.twoline {
      /* two wrapped lines inside the 32px ha-tile-container reserves */
      --_tile-info-fixed-primary-line-height: var(--ha-space-4);
    }
    ha-tile-info.twoline > [slot="primary"] {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: normal;
      overflow-wrap: anywhere;
    }
  `;
}

const language = document.documentElement.lang || navigator.language;
const w = window as unknown as { customCards?: Record<string, unknown>[] };
w.customCards = w.customCards || [];
w.customCards.push({
  type: CARD_TYPE,
  name: localize(language, "name"),
  description: localize(language, "description"),
  preview: true,
  documentationURL: "https://github.com/Lukas0610/ha-custom-area-card",
});

console.info(
  `%c CUSTOM-AREA-CARD %c ${__VERSION__} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;"
);
