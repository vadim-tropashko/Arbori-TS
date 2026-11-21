import { clearMatrixView, getMatrixCell, renderMatrix } from "./sql-earley-matrix.js";

const fileInput = document.querySelector("#sql-file");
const loadFileButton = document.querySelector("#load-file-button");
const parseButton = document.querySelector("#parse-button");
const sqlInsightButton = document.querySelector("#sql-insight-button");
const fileName = document.querySelector("#file-name");
const status = document.querySelector("#status");
const sqlEditor = document.querySelector("#sql-editor");
const connectionUser = document.querySelector("#connection-user");
const connectionPassword = document.querySelector("#connection-password");
const connectionString = document.querySelector("#connection-string");
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const viewTitles = { "tab-sql": "SQL", "tab-lexed": "Lexed", "tab-matrix": "Matrix", "tab-tree": "Parse tree", "tab-insight": "SQL Insight" };
let inputSourceName = "/Users/vtropash/sandbox/example.sql";
parseButton.disabled = typeof window.sqlWorkbenchElectron?.parseSql !== "function";
const electronBridge = window.sqlWorkbenchElectron;
const sqlInsightAvailable = typeof electronBridge?.completeSqlInsight === "function";
sqlInsightButton.disabled = !sqlInsightAvailable;
electronBridge?.onDictionaryQuery?.((log) => appendDictionaryLogs([log]));
let dictionaryQueryCount = 0;
let completionRequestSequence = 0;

sqlEditor.addEventListener("input", () => {
  fileName.textContent = `Edited copy of: ${inputSourceName}`;
  status.textContent = `${sqlEditor.value.length.toLocaleString()} characters in the SQL editor.`;
  completionRequestSequence++;
  sqlInsightButton.disabled = !sqlInsightAvailable;
  clearResults();
});

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  sqlEditor.value = await file.text();
  fileInput.value = "";
  inputSourceName = file.name;
  fileName.textContent = file.name;
  status.textContent = `${sqlEditor.value.length.toLocaleString()} characters loaded from ${file.name}.`;
  clearResults();
});

loadFileButton.addEventListener("click", () => fileInput.click());

parseButton.addEventListener("click", () => void runParse());
sqlInsightButton.addEventListener("click", () => void runSqlInsight());

async function runParse() {
  clearResults();
  try {
    if (typeof window.sqlWorkbenchElectron?.parseSql !== "function") {
      throw new Error("The SqlEarley bridge is missing. Run npm run build and restart the application.");
    }
    status.textContent = "Lexing and parsing with SqlEarley…";
    const result = await window.sqlWorkbenchElectron.parseSql(sqlEditor.value);
    const { tokens, matrix, tree, syntaxError, furthest } = result;
    renderLexed(tokens);
    renderMatrix(matrix, tokens);
    renderTree(tree, matrix, syntaxError);
    document.querySelector("#view-meta").textContent = syntaxError
      ? `${tokens.length} tokens · stopped at token ${furthest}`
      : `${tokens.length} tokens · parsed`;
    status.textContent = syntaxError
      ? `SqlEarley found a syntax error near token ${furthest}.`
      : `SqlEarley parsed ${tokens.length} tokens.`;
    activateTab(document.querySelector(syntaxError ? "#tab-tree" : "#tab-lexed"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    status.textContent = "Could not parse this input.";
    showError(document.querySelector("#panel-lexed"), message);
  }
}

async function runSqlInsight() {
  const requestSequence = ++completionRequestSequence;
  const panel = document.querySelector("#panel-insight");
  const results = document.querySelector("#sql-insight-results");
  const input = sqlEditor.value;
  const cursorPosition = sqlEditor.selectionStart ?? input.length;
  results.replaceChildren();
  panel.querySelector(".empty-state").hidden = true;
  panel.querySelector(".error")?.remove();
  sqlInsightButton.disabled = true;
  activateTab(document.querySelector("#tab-insight"));
  status.textContent = `Requesting SQL Insight at cursor position ${cursorPosition}.`;
  try {
    if (!sqlInsightAvailable) throw new Error("SQL Insight runs in the Electron application. Start it with npm run start:electron.");
    const response = await electronBridge.completeSqlInsight({
      input,
      cursor: cursorPosition,
      user: connectionUser.value,
      password: connectionPassword.value,
      connectString: connectionString.value,
    });
    if (!response.ok) throw new Error(response.error);
    if (!isCurrentCompletionRequest(requestSequence, input, cursorPosition)) return;
    const completion = response.completion;
    const suggestions = completion.entries;
    renderSqlInsightResults(suggestions);
    document.querySelector("#view-meta").textContent = `Cursor position ${cursorPosition} · ${suggestions.length} suggestions`;
    status.textContent = `SQL Insight returned ${suggestions.length} suggestions.`;
  } catch (error) {
    if (!isCurrentCompletionRequest(requestSequence, input, cursorPosition)) return;
    const message = error instanceof Error ? error.message : String(error);
    showError(panel, message);
    document.querySelector("#view-meta").textContent = `Cursor position ${cursorPosition}`;
    status.textContent = "Could not complete SQL Insight.";
    activateTab(document.querySelector("#tab-insight"));
  } finally {
    if (requestSequence === completionRequestSequence) sqlInsightButton.disabled = !sqlInsightAvailable;
  }
}

function isCurrentCompletionRequest(requestSequence, input, cursorPosition) {
  return requestSequence === completionRequestSequence
    && sqlEditor.value === input
    && sqlEditor.selectionStart === cursorPosition;
}

function renderSqlInsightResults(suggestions) {
  const results = document.querySelector("#sql-insight-results");
  const emptyStateMessage = document.querySelector("#panel-insight > .empty-state");
  results.replaceChildren();
  for (const suggestion of suggestions) {
    const item = document.createElement("li");
    item.textContent = suggestion.entry;
    if (suggestion.type && suggestion.type !== "UNKNOWN") {
      const type = document.createElement("span");
      type.className = "suggestion-type";
      type.textContent = suggestion.type;
      item.append(type);
    }
    results.append(item);
  }
  emptyStateMessage.hidden = suggestions.length > 0;
}

function appendDictionaryLogs(logs) {
  const container = document.querySelector("#query-log");
  container.querySelector(".log-empty")?.remove();
  for (const log of logs) {
    const entry = document.createElement("article");
    entry.className = "query-log-entry";
    const heading = document.createElement("div");
    heading.className = "query-log-entry-heading";
    const label = document.createElement("strong");
    label.textContent = "Dictionary query";
    const timestamp = document.createElement("time");
    timestamp.textContent = new Date(log.timestamp).toLocaleTimeString();
    heading.append(label, timestamp);
    const sql = document.createElement("pre");
    sql.textContent = log.sql;
    const bindsLabel = document.createElement("span");
    bindsLabel.className = "query-log-binds-label";
    bindsLabel.textContent = "Binds";
    const binds = document.createElement("pre");
    binds.textContent = JSON.stringify(log.binds, null, 2);
    entry.append(heading, sql, bindsLabel, binds);
    container.append(entry);
    dictionaryQueryCount++;
  }
  document.querySelector("#query-log-count").textContent = `${dictionaryQueryCount} ${dictionaryQueryCount === 1 ? "query" : "queries"}`;
}

loadDefaultInput();

for (const [index, tab] of tabs.entries()) {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = tabs[(index + offset + tabs.length) % tabs.length];
    activateTab(nextTab);
    nextTab.focus();
  });
}

function activateTab(activeTab) {
  for (const tab of tabs) {
    const active = tab === activeTab;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  }
  for (const panel of panels) panel.hidden = panel.id !== activeTab.getAttribute("aria-controls");
  document.querySelector("#view-title").textContent = viewTitles[activeTab.id];
}

function renderLexed(tokens) {
  const body = document.querySelector("#lexed-table tbody");
  body.replaceChildren();
  for (const [index, token] of tokens.entries()) {
    const row = document.createElement("tr");
    addCell(row, String(index));
    const span = addCell(row, `[${token.begin}, ${token.end})`);
    span.className = "span";
    addCell(row, token.type ?? "");
    const content = addCell(row, token.content ?? "");
    content.className = "code";
    body.append(row);
  }
  emptyState(document.querySelector("#panel-lexed"), tokens.length === 0);
}

function renderTree(root, matrix, syntaxMessage = null) {
  const container = document.querySelector("#tree-view");
  container.replaceChildren();
  const empty = document.querySelector("#panel-tree .empty-state");
  if (!root) {
    empty.textContent = syntaxMessage ?? "No parse tree could be constructed for this input.";
    empty.classList.toggle("syntax-error", syntaxMessage !== null);
    empty.hidden = false;
    return;
  }
  empty.classList.remove("syntax-error");
  const list = document.createElement("ul");
  list.append(treeNode(root, matrix));
  container.append(list);
  empty.hidden = true;
}

function treeNode(node, matrix, depth = 0) {
  const chain = [node];
  let branch = node;
  let branchDepth = depth;
  while (
    branch.children.length === 1 &&
    branch.children[0].content === undefined &&
    branch.children[0].from === node.from &&
    branch.children[0].to === node.to
  ) {
    const child = branch.children[0];
    branch = child;
    branchDepth++;
    chain.push(child);
  }

  const item = document.createElement("li");
  const details = document.createElement("details");
  details.className = "tree-node";
  details.open = !(branchDepth > 10 || branch.children.length > 100);
  const summary = document.createElement("summary");
  const span = document.createElement("span");
  span.className = "tree-span";
  span.textContent = `[${node.from},${node.to})`;
  summary.append(span);
  const payload = new Set(getMatrixCell(matrix, node.from, node.to)?.completed ?? []);
  const chainLabels = chain.reverse().flatMap((part) => {
    const symbol = part.name;
    return [`${symbol}${payload.has(symbol) ? "" : "?"}`];
  });
  const derivationSymbols = new Set(chain.map((part) => part.name));
  const aliases = [...new Set(chain.flatMap((part) => part.aliases ?? []))]
    .filter((symbol) => !derivationSymbols.has(symbol))
    .map((symbol) => `${symbol}${payload.has(symbol) ? "" : "?"}`);
  const label = node.content === undefined
    ? `${[...new Set(chainLabels)].join(" > ")}${aliases.length ? `   ${aliases.join(" ")}` : ""}`
    : `'${node.content.replaceAll("'", "''")}'`;
  summary.append(document.createTextNode(` ${label}`));
  details.append(summary);
  if (branch.children.length) {
    const children = document.createElement("ul");
    for (const child of branch.children) children.append(treeNode(child, matrix, branchDepth + 1));
    details.append(children);
  }
  item.append(details);
  return item;
}

function addCell(row, value, tag = "td") {
  const cell = document.createElement(tag);
  cell.textContent = value;
  row.append(cell);
  return cell;
}

function emptyState(panel, empty) {
  const message = panel.querySelector(".empty-state");
  if (message) message.hidden = !empty;
}

function clearResults() {
  clearMatrixView();
  document.querySelector("#lexed-table tbody").replaceChildren();
  document.querySelector("#tree-view").replaceChildren();
  document.querySelector("#sql-insight-results").replaceChildren();
  for (const panel of panels) {
    emptyState(panel, true);
    panel.querySelector(".error")?.remove();
  }
  const treeEmptyState = document.querySelector("#panel-tree .empty-state");
  treeEmptyState.textContent = "Choose Parse to build the SqlEarley parse tree.";
  treeEmptyState.classList.remove("syntax-error");
  document.querySelector("#view-meta").textContent = "";
}

function showError(panel, message) {
  const error = document.createElement("div");
  error.className = "error";
  error.textContent = message;
  panel.prepend(error);
  emptyState(panel, false);
}

async function loadDefaultInput() {
  try {
    sqlEditor.value = await window.sqlWorkbenchElectron.defaultSql();
  } catch (error) {
    sqlEditor.value = "";
    const message = error instanceof Error ? error.message : String(error);
    status.textContent = `Could not load /Users/VTROPASH/sandbox/example.sql: ${message}`;
    parseButton.disabled = typeof window.sqlWorkbenchElectron?.parseSql !== "function";
    return;
  }
  fileName.textContent = "Default: /Users/VTROPASH/sandbox/example.sql";
  parseButton.disabled = typeof window.sqlWorkbenchElectron?.parseSql !== "function";
  status.textContent = `${sqlEditor.value.length.toLocaleString()} characters loaded. Choose Parse to run SqlEarley.`;
}
