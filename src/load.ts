// Home Assistant only defines most card components once a card that uses them is loaded.
// Creating a native card (or its editor) once through the public card helpers makes HA
// load them. Nothing from those cards is used afterwards.

type CardHelpers = { createCardElement: (config: Record<string, unknown>) => HTMLElement };
type ConfigurableCard = CustomElementConstructor & { getConfigElement(): Promise<HTMLElement> };

const CARD_COMPONENTS = ["ha-tile-container", "ha-tile-icon", "ha-tile-info", "hui-card-features"];

let cardComponents: Promise<void> | undefined;
let editorComponents: Promise<void> | undefined;

async function createNativeCard(config: Record<string, unknown>, tag: string) {
  if (!customElements.get(tag)) {
    const helpers: CardHelpers = await (window as any).loadCardHelpers();
    helpers.createCardElement(config);
    await customElements.whenDefined(tag);
  }
  return customElements.get(tag) as ConfigurableCard;
}

export function loadCardComponents(): Promise<void> {
  cardComponents ??= (async () => {
    await createNativeCard({ type: "area", area: "_" }, "hui-area-card");
    if (!customElements.get("hui-image")) {
      await createNativeCard({ type: "picture", image: "" }, "hui-picture-card");
    }
    await Promise.all(CARD_COMPONENTS.map((tag) => customElements.whenDefined(tag)));
  })();
  return cardComponents;
}

export function loadEditorComponents(): Promise<void> {
  editorComponents ??= (async () => {
    const areaCard = await createNativeCard({ type: "area", area: "_" }, "hui-area-card");
    if (!customElements.get("hui-card-features-editor")) {
      await areaCard.getConfigElement();
    }
    await customElements.whenDefined("hui-card-features-editor");
  })();
  return editorComponents;
}
