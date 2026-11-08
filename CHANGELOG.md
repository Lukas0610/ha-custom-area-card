# Changelog

All notable changes are documented here. Versions follow [Semantic Versioning](https://semver.org/);
each `## [x.y.z]` section becomes the GitHub release notes.

## [0.1.0]

### Added
- Area card (`custom:custom-area-card`) that looks and behaves like the built-in area card:
  compact, icon, picture and camera display types, alerts, features, tap actions and grid sizing.
- The details line shows individually selected sensors (`sensors`) in the chosen order,
  instead of averaged or summed sensor classes. Unavailable sensors are hidden.
- Visual editor, laid out like the built-in one, with a sensor picker in place of
  "Sensor classes". Picking the card in the card picker pre-selects the area's temperature
  and humidity sensors.
- English and German translations. All other labels use Home Assistant's own translations.
