import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";

await rm("dist/renderer", { recursive: true, force: true });
await mkdir("dist/renderer", { recursive: true });
await cp("electron/renderer", "dist/renderer", { recursive: true });
await build({
  entryPoints: ["src/main/typescript/electron/main.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node22",
  external: ["electron", "oracledb"],
  outfile: "dist/electron-main.cjs",
});
await copyFile("src/main/typescript/electron/preload.cjs", "dist/preload.cjs");
