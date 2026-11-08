# Custom Area Card for Home Assistant

The built-in **area card**, with one difference: the details line below the area name shows the
**sensors you pick**, in the order you pick them, instead of sensor classes.

The built-in card shows, for example, the *median* of all temperature sensors and the *sum* of all
power sensors in an area. That's useless when you care about one specific sensor, or when the
area contains sensors that shouldn't be mixed in. This card shows exactly the sensors you choose,
and can also combine sensors you choose into one value (sum, minimum, maximum, average or median).

Everything else matches the built-in card: compact / icon / picture / camera display, alert
icons for motion, moisture etc., card features (area controls), tap actions, sections grid
sizing and the visual editor.

## Installation

### Home Assistant Marketplace (2026.11+)

1. **Settings → Marketplace → ⋮ → Custom repositories**, add
   `https://github.com/Lukas0610/ha-custom-area-card`, type **Dashboard**.
2. Search for **Custom Area Card** and select **Download**. The Marketplace adds the dashboard
   resource for you. Reload the browser.

### Manual

1. Download `custom-area-card.js` from the [latest release](https://github.com/Lukas0610/ha-custom-area-card/releases)
   into `config/www/`.
2. **Settings → Dashboards → ⋮ → Resources → Add resource**: URL `/local/custom-area-card.js`,
   type **JavaScript module**. Reload the browser.

Requires Home Assistant 2026.9 or newer.

## Usage

Edit a dashboard, select **Add card** and pick **Custom area card**. The editor is the same as
the built-in area card's, except that **Sensors** and **Aggregated sensors** replace
**Sensor classes**.

```yaml
type: custom:custom-area-card
area: living_room
sensors:
  - sensor.living_room_temperature
  - sensor.living_room_humidity
aggregated_sensors:
  - entities:
      - sensor.tv_power
      - sensor.soundbar_power
    aggregate: sum
alert_classes:
  - motion
  - window
display_type: compact
```

To switch an existing area card, change `type: area` to `type: custom:custom-area-card`
in its YAML and replace `sensor_classes` with `sensors`. All other options carry over.

## Options

| Option | Description |
|---|---|
| `area` | **Required.** Area ID. |
| `sensors` | List of sensor entity IDs shown in the details line, in this order. Each one is formatted like everywhere else in Home Assistant (display precision, units). Unavailable or unknown sensors are left out. |
| `aggregated_sensors` | List of entries shown after `sensors`, each as one value: `entities` (sensor entity IDs) and `aggregate` (`sum`, `min`, `max`, `avg` (default) or `median`). Unavailable and non-numeric sensors are skipped. Only sensors with the same unit as the first available one are combined. The value uses that sensor's unit and display precision (otherwise 1 decimal). |
| `name` | Overrides the area name. |
| `color` | Icon and feature color (theme color name or any CSS color). |
| `display_type` | `compact`, `icon`, `picture` (default) or `camera`. |
| `vertical` | `true` stacks icon and name (compact display only). |
| `camera_view` | `auto` (default) or `live` (camera display only). |
| `aspect_ratio` | Image aspect ratio, default `16:9`. Ignored in sections and panel views. |
| `alert_classes` | Binary sensor device classes shown as alert icons when on. |
| `features`, `features_position` | Card features, `bottom` (default) or `inline`. |
| `exclude_entities` | Entities ignored for alerts and features. |
| `tap_action`, `image_tap_action` | Standard [actions](https://www.home-assistant.io/dashboards/actions/). |

## Troubleshooting

- **"Custom element doesn't exist: custom-area-card":** the resource is missing or the browser
  cache is stale. Check **Settings → Dashboards → Resources**, then reload with the cache
  cleared.
- **Report a bug:** include the card YAML and the browser console output (F12 → Console). The
  console shows the card version as `CUSTOM-AREA-CARD x.y.z`.

## Development

```sh
npm install
npm run build      # dist/custom-area-card.js (commit it)
npm run watch      # rebuild on change
npm run typecheck
npm test
```

During development, serve `dist/custom-area-card.js` to Home Assistant, for example by copying
it to `config/www/` and adding it as a resource.
