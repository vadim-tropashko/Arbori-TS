import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

const textResourceExtensions = new Set([".prg"]);

export async function load(url, context, nextLoad) {
  if (!url.startsWith("file:") || !textResourceExtensions.has(extname(fileURLToPath(url)))) {
    return nextLoad(url, context);
  }

  const contents = await readFile(fileURLToPath(url), "utf8");
  return {
    format: "module",
    shortCircuit: true,
    source: `export default ${JSON.stringify(contents)};`,
  };
}
