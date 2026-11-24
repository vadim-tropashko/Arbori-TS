const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sqlWorkbenchElectron", {
  parseSql: (input) => ipcRenderer.invoke("parser:parse", input),
  checkSqlSyntax: (input) => ipcRenderer.invoke("parser:syntax-check", input),
  defaultSql: () => ipcRenderer.invoke("lexer:default-sql"),
  completeSqlInsight: (request) => ipcRenderer.invoke("sql-insight:complete", request),
});
