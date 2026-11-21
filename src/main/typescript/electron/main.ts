import { app, BrowserWindow, ipcMain } from "electron";
import { readFile } from "node:fs/promises";
import path from "node:path";
import oracledb from "oracledb";
import type { Connection } from "oracledb";
import { CompletionItem } from "../oracle/dbtools/app/CompletionItem.js";
import { SqlCompleter } from "../oracle/dbtools/app/SqlCompleter.js";
import { parseSqlForWorkbench } from "./sql-parser-workbench/SqlParseWorkbench.js";

const DEFAULT_SQL_PATH = "/Users/VTROPASH/sandbox/example.sql";

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  const projectRoot = app.getAppPath();
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 1000,
    minWidth: 760,
    minHeight: 600,
    title: "Arbori SQL Workbench",
    webPreferences: {
      preload: path.join(projectRoot, "dist", "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  void mainWindow.loadFile(path.join(projectRoot, "dist", "renderer", "index.html"));
  mainWindow.on("closed", () => { mainWindow = null; });
}

ipcMain.handle("parser:parse", (_event, input: unknown) => {
  if (typeof input !== "string") throw new TypeError("SQL input must be a string.");
  return parseSqlForWorkbench(input);
});

ipcMain.handle("lexer:default-sql", () => readFile(DEFAULT_SQL_PATH, "utf8"));

ipcMain.handle("sql-insight:complete", async (_event, request: unknown) => {
  const value = request as Partial<{
    input: unknown;
    cursor: unknown;
    user: unknown;
    password: unknown;
    connectString: unknown;
  }> | null;
  if (!value || typeof value.input !== "string") return { ok: false, error: "SQL input must be a string." };
  if (typeof value.cursor !== "number" || !Number.isInteger(value.cursor) || value.cursor < 0 || value.cursor > value.input.length) {
    return { ok: false, error: "The completion cursor is outside the SQL input." };
  }
  if (typeof value.user !== "string" || !value.user.trim() || typeof value.password !== "string" ||
      typeof value.connectString !== "string" || !value.connectString.trim()) {
    return { ok: false, error: "Enter an Oracle username, password, and connection string." };
  }

  let connection: Connection | undefined;
  try {
    connection = await oracledb.getConnection({
      user: value.user,
      password: value.password,
      connectString: value.connectString,
    });
    const completion = await new SqlCompleter(connection).complete(value.input, value.cursor);
    return {
      ok: true,
      completion: {
        entries: completion.entries.map((item) => ({
          entry: item.entry,
          type: CompletionItem.Type[item.type] ?? "UNKNOWN",
        })),
      },
    };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    if (connection) await connection.close();
  }
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
