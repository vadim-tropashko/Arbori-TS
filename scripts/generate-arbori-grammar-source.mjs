import { readFileSync, writeFileSync } from "node:fs";

const arbori = readFileSync(new URL("../src/main/resources/oracle/dbtools/arbori/arbori.grammar", import.meta.url), "utf8");
const javascript = readFileSync(new URL("../src/main/resources/oracle/dbtools/parser/js/js.grammar", import.meta.url), "utf8");
const output = `/** Generated from the Java resources by scripts/generate-arbori-grammar-source.mjs. */\nexport const arboriGrammarSource = ${JSON.stringify(arbori)};\nexport const javaScriptGrammarSource = ${JSON.stringify(javascript)};\n`;
writeFileSync(new URL("../src/main/typescript/oracle/dbtools/arbori/ArboriGrammarSource.ts", import.meta.url), output);
