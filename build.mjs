// Bundles src/ into dist/custom-area-card.js. `node build.mjs --watch` rebuilds on change.
import { readFileSync } from "node:fs";
import * as esbuild from "esbuild";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

const options = {
  entryPoints: ["src/custom-area-card.ts"],
  outfile: "dist/custom-area-card.js",
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2021",
  legalComments: "none",
  define: { __VERSION__: JSON.stringify(version) },
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  await (await esbuild.context(options)).watch();
} else {
  await esbuild.build(options);
}
