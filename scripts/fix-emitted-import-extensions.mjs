import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";

const outputDir = resolve(process.argv[2] ?? "dist/arbori-test");

function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(path);
      continue;
    }
    if (!entry.isFile() || extname(path) !== ".js") continue;

    const source = readFileSync(path, "utf8");
    const rewritten = source.replace(
      /((?:from\s*|import\s*)["'])(\.{1,2}\/[^"']+)(["'])/g,
      (match, prefix, specifier, suffix) => {
        if (extname(specifier)) return match;
        const target = resolve(dirname(path), `${specifier}.js`);
        return existsSync(target) ? `${prefix}${specifier}.js${suffix}` : match;
      },
    );
    if (rewritten !== source) writeFileSync(path, rewritten);
  }
}

visit(outputDir);
