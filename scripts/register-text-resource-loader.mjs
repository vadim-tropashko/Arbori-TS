import * as moduleApi from "node:module";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

if (typeof moduleApi.registerHooks === "function") {
  moduleApi.registerHooks({
    load(url, context, nextLoad) {
      if (!url.startsWith("file:") || extname(fileURLToPath(url)) !== ".prg") {
        return nextLoad(url, context);
      }
      const contents = readFileSync(fileURLToPath(url), "utf8");
      return {
        format: "module",
        shortCircuit: true,
        source: `export default ${JSON.stringify(contents)};`,
      };
    },
  });
} else {
  moduleApi.register("./text-resource-loader.mjs", import.meta.url);
}
