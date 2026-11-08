# CLAUDE.md

Home Assistant dashboard card `custom:custom-area-card`. It's a standalone port of the built-in
area card (`hui-area-card`). The only functional difference is that the details line shows
hand-picked sensors (`sensors: [entity_id, ...]`) instead of aggregated `sensor_classes`.
It's distributed through the HA Marketplace (category plugin/"Dashboard"; `hacs.json`, GitHub-only).
Owner: Lukas Berger <mail@lukasberger.at>. License: MIT (`LICENSE`).

## Layout

```
src/
  custom-area-card.ts  Card element (LitElement): render + styles ported from hui-area-card.ts,
                       card picker registration (window.customCards), console version banner.
  editor.ts            custom-area-card-editor: ha-form schema ported from hui-area-card-editor.ts.
  logic.ts             Everything without DOM/Lit: config normalization, area entity filter,
                       alerts, details line, feature layout, grid options, editor data round-trip.
  load.ts              Makes HA load its lazy components (see below).
  localize.ts          The card's own strings (en, de).
  types.ts             The subset of HA frontend types used (HA doesn't publish them).
tests/logic.test.ts    node:test, runs the .ts directly (Node type stripping). Only covers logic/localize.
dist/custom-area-card.js  Build output. COMMITTED (the Marketplace validates the repo, and releases
                       attach it). CI fails if it doesn't match the sources.
build.mjs              esbuild bundle (Lit and @mdi/js are bundled), injects __VERSION__.
upstream.json          sha256 of the native card/editor sources the port is based on.
hacs.json, CHANGELOG.md, .github/workflows/{validate,release}.yml
```

## Commands

```sh
npm install
npm run typecheck && npm test && npm run build
```
Node >= 22.18 is needed (TS type stripping in tests). Nothing exercises the Lit elements
locally. If you change `custom-area-card.ts`/`editor.ts`, say that they weren't tested against a
real HA instance.

## How it's built

- **Standalone (explicit user decision):** don't subclass, monkey-patch or call private
  members of `hui-area-card`/`hui-area-card-editor`. The behavior is ported into `logic.ts` and
  the element files. An earlier subclassing approach was rejected.
- **Rendering uses HA's own registered elements** by tag name: `ha-card`, `ha-tile-container`,
  `ha-tile-icon`, `ha-tile-info`, `ha-tile-badge`, `ha-state-icon`, `ha-icon`, `ha-aspect-ratio`,
  `hui-image`, `hui-card-features`, `hui-warning`. The editor uses `ha-form`, `ha-expansion-panel`,
  `ha-svg-icon` and `hui-card-features-editor`. Use these (and standard `ha-form` selectors)
  for any UI. Don't build custom controls (explicit user preference).
- Most of those elements are lazy-loaded by HA. `load.ts` creates a native area card (and calls
  its `getConfigElement()` for the editor) through `window.loadCardHelpers()` once, just so
  HA imports them. Card and editor render nothing until that's done.
- Actions are fired as the `hass-action` DOM event (`{config, action}`), which HA's
  `action-mixin` handles. The tile container emits `action` itself. The picture only supports tap
  (click/Enter/Space), like the native editor offers.
- Labels reuse the native card's translation keys via `hass.localize`
  (`ui.panel.lovelace.editor.card.area.*`, `...generic.*`, `...tile.*`). Only strings HA has no
  key for go in `localize.ts`, and **every key must exist in both `en` and `de`** (a test checks
  this). German uses informal "du".
- Details line = `sensors` (formatted states), then one value per `aggregated_sensors` entry
  (`detailsLine` in `logic.ts`). Aggregation follows the native sensor-class rules (numeric,
  available, same unit as the first), and is formatted through
  `hass.formatEntityState(firstStateObj, String(value))` for unit + display precision. The editor
  edits that list with the native `object` selector (`multiple` + `fields`); `reorder` is
  ignored by frontends before it existed.
- `hasCompatibleFeatures` (shows the features position picker) is approximated as "the area
  exists". The native editor asks the internal feature registry, which isn't reachable.

## Keeping in sync with upstream

- Source of truth: `home-assistant/frontend` `src/panels/lovelace/cards/hui-area-card.ts` and
  `editor/config-elements/hui-area-card-editor.ts` (plus `tile-card-style.ts`,
  `feature-layout.ts`, `entity_filter.ts`, `compute-color.ts`). Comments in `logic.ts` name the
  originals.
- The weekly `upstream` CI job fails when those two files change (sha256 vs `upstream.json`)
  or a used component disappears. Port the diff, then update the hashes in `upstream.json`.
- Minimum HA is **2026.9.0** (`hacs.json`): frontend 20260826 introduced the
  `ha-tile-container` props (`fixedInfoHeight`, inline feature slot) and `hui-card-features`
  `columns` used here. Raise it if a port relies on newer components.

## Releasing

- The version lives only in `package.json` (SemVer, **no `v` prefix**). `build.mjs` injects it
  into the bundle. The Marketplace requires the tag to equal that version.
- **Changelog entries for new changes always go under `## [Unreleased]`** (at the top, create it
  if missing). **Never bump the version or add a `## [x.y.z]` section on your own.** Only do it
  when the developer asks for a version bump/release (explicit owner preference).
- Steps (only when asked): bump `package.json` (`npm version x.y.z --no-git-tag-version`),
  `npm run build`, rename `## [Unreleased]` to `## [x.y.z]` in `CHANGELOG.md`, merge to `main`,
  then run **Actions → Release**. The workflow validates, refuses existing tags, missing
  changelog sections or a stale dist, attaches `dist/custom-area-card.js`, and marks
  `aN`/`bN`/`rcN`/`devN` versions as pre-releases.
- Never edit or move a published tag. Fix things in a new patch release.
