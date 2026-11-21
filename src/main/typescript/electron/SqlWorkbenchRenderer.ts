import { parseSqlForWorkbench, type SqlWorkbenchParseResult } from "./sql-parser-workbench/SqlParseWorkbench.js";

/** Runs the Java-translated SqlEarley parser and adapts its result for the workbench UI. */
export function parseSql(input: string): SqlWorkbenchParseResult {
  return parseSqlForWorkbench(input);
}
