import { clearMatrixView, getMatrixCell, renderMatrix } from "./sql-earley-matrix.js";

const fileInput = document.querySelector("#sql-file");
const loadFileButton = document.querySelector("#load-file-button");
const parseButton = document.querySelector("#parse-button");
const sqlInsightButton = document.querySelector("#sql-insight-button");
const fileName = document.querySelector("#file-name");
const status = document.querySelector("#status");
const sqlEditor = document.querySelector("#sql-editor");
const syntaxErrorOverlay = document.querySelector("#syntax-error-overlay");
const syntaxErrorUnderline = document.querySelector("#syntax-error-underline");
const syntaxTooltip = document.querySelector("#syntax-tooltip");
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
let syntaxErrorState = null;
let syntaxCheckSequence = 0;
let syntaxCheckTimer = null;

sqlEditor.addEventListener("input", () => {
  fileName.textContent = `Edited copy of: ${inputSourceName}`;
  status.textContent = `${sqlEditor.value.length.toLocaleString()} characters in the SQL editor.`;
  completionRequestSequence++;
  sqlInsightButton.disabled = !sqlInsightAvailable;
  clearResults();
  scheduleSyntaxCheck();
});
sqlEditor.addEventListener("scroll", updateSyntaxErrorDecoration);
document.querySelector("#sql-editor-wrap").addEventListener("pointermove", updateSyntaxTooltipHover);
document.querySelector("#sql-editor-wrap").addEventListener("pointerleave", hideSyntaxTooltip);
syntaxErrorUnderline.addEventListener("focus", showSyntaxTooltip);
syntaxErrorUnderline.addEventListener("blur", hideSyntaxTooltip);
window.addEventListener("resize", updateSyntaxErrorDecoration);
window.addEventListener("scroll", updateSyntaxErrorDecoration, true);
new ResizeObserver(updateSyntaxErrorDecoration).observe(sqlEditor);

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  sqlEditor.value = await file.text();
  fileInput.value = "";
  inputSourceName = file.name;
  fileName.textContent = file.name;
  status.textContent = `${sqlEditor.value.length.toLocaleString()} characters loaded from ${file.name}.`;
  clearResults();
  scheduleSyntaxCheck(0);
});

loadFileButton.addEventListener("click", () => fileInput.click());

parseButton.addEventListener("click", () => void runParse());
sqlInsightButton.addEventListener("click", () => void runSqlInsight());

async function runParse() {
  cancelQueuedSyntaxCheck();
  clearResults();
  try {
    if (typeof window.sqlWorkbenchElectron?.parseSql !== "function") {
      throw new Error("The SqlEarley bridge is missing. Run npm run build and restart the application.");
    }
    status.textContent = "Lexing and parsing with SqlEarley…";
    const result = await window.sqlWorkbenchElectron.parseSql(sqlEditor.value);
    const { tokens, matrix, tree, syntaxError, errorRange, furthest } = result;
    renderLexed(tokens);
    renderMatrix(matrix, tokens);
    renderTree(tree, matrix, syntaxError);
    document.querySelector("#view-meta").textContent = syntaxError
      ? `${tokens.length} tokens · stopped at token ${furthest}`
      : `${tokens.length} tokens · parsed`;
    status.textContent = syntaxError
      ? `SqlEarley found a syntax error near token ${furthest}.`
      : `SqlEarley parsed ${tokens.length} tokens.`;
    activateTab(document.querySelector(syntaxError ? "#tab-sql" : "#tab-lexed"));
    renderSyntaxError(syntaxError, errorRange);
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
  clearSyntaxError();
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

function renderSyntaxError(message, range) {
  clearSyntaxError();
  if (!message || !range) return;
  syntaxErrorState = { message, start: range.start, end: range.end };
  sqlEditor.setAttribute("aria-invalid", "true");
  sqlEditor.setAttribute("aria-describedby", "syntax-tooltip");
  syntaxTooltip.textContent = message;
  revealSyntaxErrorRange();
  updateSyntaxErrorDecoration();
  showSyntaxTooltip();
}

function clearSyntaxError() {
  syntaxErrorState = null;
  syntaxErrorUnderline.removeAttribute("d");
  syntaxErrorUnderline.removeAttribute("aria-label");
  syntaxErrorOverlay.hidden = true;
  syntaxTooltip.hidden = true;
  syntaxTooltip.textContent = "";
  sqlEditor.removeAttribute("aria-invalid");
}

function scheduleSyntaxCheck(delay = 350) {
  clearTimeout(syntaxCheckTimer);
  const sequence = ++syntaxCheckSequence;
  const input = sqlEditor.value;
  syntaxCheckTimer = setTimeout(async () => {
    try {
      const result = await electronBridge.checkSqlSyntax(input);
      if (sequence !== syntaxCheckSequence || sqlEditor.value !== input) return;
      renderSyntaxError(result.syntaxError, result.errorRange);
      status.textContent = result.syntaxError
        ? "Syntax error found. See the highlighted location."
        : `SQL syntax is valid (${input.length.toLocaleString()} characters).`;
    } catch (error) {
      if (sequence !== syntaxCheckSequence || sqlEditor.value !== input) return;
      clearSyntaxError();
      const message = error instanceof Error ? error.message : String(error);
      status.textContent = `Could not check SQL syntax: ${message}`;
    }
  }, delay);
}

function cancelQueuedSyntaxCheck() {
  clearTimeout(syntaxCheckTimer);
  syntaxCheckSequence++;
}

function revealSyntaxErrorRange() {
  if (!syntaxErrorState) return;
  const style = getComputedStyle(sqlEditor);
  const lineHeight = Number.parseFloat(style.lineHeight) || 21.45;
  const paddingTop = Number.parseFloat(style.paddingTop) || 0;
  const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
  const borderTop = Number.parseFloat(style.borderTopWidth) || 0;
  const borderLeft = Number.parseFloat(style.borderLeftWidth) || 0;
  const source = sqlEditor.value;
  const start = Math.max(0, Math.min(syntaxErrorState.start, source.length));
  const lineStart = source.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  const lineIndex = source.slice(0, start).split("\n").length - 1;
  const lineTop = borderTop + paddingTop + lineIndex * lineHeight;
  if (lineTop < sqlEditor.scrollTop || lineTop + lineHeight > sqlEditor.scrollTop + sqlEditor.clientHeight) {
    sqlEditor.scrollTop = Math.max(0, lineTop - sqlEditor.clientHeight / 2);
  }
  const context = getTextMeasureContext(style);
  const charWidth = context.measureText(" ").width;
  const tabWidth = charWidth * (Number.parseFloat(style.tabSize) || 2);
  const errorX = borderLeft + paddingLeft + measureEditorText(source.slice(lineStart, start), context, tabWidth);
  if (errorX < sqlEditor.scrollLeft || errorX > sqlEditor.scrollLeft + sqlEditor.clientWidth - 24) {
    sqlEditor.scrollLeft = Math.max(0, errorX - sqlEditor.clientWidth / 3);
  }
}

function updateSyntaxErrorDecoration() {
  if (!syntaxErrorState) return;
  const editorStyle = getComputedStyle(sqlEditor);
  const wrap = document.querySelector("#sql-editor-wrap");
  const width = wrap.clientWidth;
  const height = wrap.clientHeight;
  syntaxErrorOverlay.setAttribute("viewBox", `0 0 ${width} ${height}`);
  syntaxErrorOverlay.setAttribute("width", String(width));
  syntaxErrorOverlay.setAttribute("height", String(height));

  const source = sqlEditor.value;
  const start = Math.max(0, Math.min(syntaxErrorState.start, source.length));
  const lineStart = source.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  const lineIndex = source.slice(0, start).split("\n").length - 1;
  const columnText = source.slice(lineStart, start);
  const lineHeight = Number.parseFloat(editorStyle.lineHeight) || 21.45;
  const fontSize = Number.parseFloat(editorStyle.fontSize) || 13;
  const paddingLeft = Number.parseFloat(editorStyle.paddingLeft) || 0;
  const paddingTop = Number.parseFloat(editorStyle.paddingTop) || 0;
  const borderLeft = Number.parseFloat(editorStyle.borderLeftWidth) || 0;
  const borderTop = Number.parseFloat(editorStyle.borderTopWidth) || 0;
  const context = getTextMeasureContext(editorStyle);
  const charWidth = context.measureText(" ").width;
  const tabSize = Number.parseFloat(editorStyle.tabSize) || 2;
  const xPrefix = measureEditorText(columnText, context, charWidth * tabSize);
  const errorText = source.slice(start, Math.max(start, syntaxErrorState.end));
  const errorWidth = measureEditorText(errorText, context, charWidth * tabSize);
  const x = borderLeft + paddingLeft + xPrefix - sqlEditor.scrollLeft;
  const y = borderTop + paddingTop + lineIndex * lineHeight - sqlEditor.scrollTop + lineHeight * 0.84;
  const xEnd = x + errorWidth;

  if (y < 0 || y > height || xEnd < 0 || x > width) {
    syntaxErrorUnderline.style.display = "none";
    syntaxTooltip.hidden = true;
    return;
  }
  syntaxErrorOverlay.hidden = false;
  syntaxErrorUnderline.style.display = "";
  syntaxErrorUnderline.setAttribute("aria-label", `Syntax error: ${syntaxErrorState.message}`);
  syntaxErrorUnderline.setAttribute("d", makeSquigglePath(x, xEnd, y, fontSize));
  syntaxErrorState.anchorX = Math.max(8, Math.min(x, width - 8));
  syntaxErrorState.anchorY = Math.max(8, Math.min(y, height - 8));
  if (!syntaxTooltip.hidden) positionSyntaxTooltip();
}

let textMeasureCanvas;
function getTextMeasureContext(style) {
  textMeasureCanvas ??= document.createElement("canvas");
  const context = textMeasureCanvas.getContext("2d");
  context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  return context;
}

function measureEditorText(text, context, tabWidth) {
  let width = 0;
  for (const character of text) {
    if (character === "\t") width = (Math.floor(width / tabWidth) + 1) * tabWidth;
    else width += context.measureText(character).width;
  }
  return width;
}

function makeSquigglePath(startX, endX, baseline, fontSize) {
  const amplitude = Math.max(1.1, Math.min(1.8, fontSize * 0.12));
  const step = 3.5;
  let path = `M ${startX} ${baseline}`;
  let x = startX;
  let direction = 1;
  while (x < endX) {
    x = Math.min(endX, x + step);
    path += ` L ${x} ${baseline + amplitude * direction}`;
    direction *= -1;
  }
  return path;
}

function showSyntaxTooltip() {
  if (!syntaxErrorState || syntaxErrorUnderline.style.display === "none" || !Number.isFinite(syntaxErrorState.anchorX)) return;
  syntaxTooltip.hidden = false;
  positionSyntaxTooltip();
}

function hideSyntaxTooltip() {
  syntaxTooltip.hidden = true;
}

function updateSyntaxTooltipHover(event) {
  if (!syntaxErrorState || syntaxErrorUnderline.style.display === "none") return;
  const rect = syntaxErrorUnderline.getBoundingClientRect();
  const tolerance = 5;
  const overMarker = event.clientX >= rect.left - tolerance && event.clientX <= rect.right + tolerance
    && event.clientY >= rect.top - tolerance && event.clientY <= rect.bottom + tolerance;
  if (overMarker) showSyntaxTooltip();
  else hideSyntaxTooltip();
}

function positionSyntaxTooltip() {
  if (!syntaxErrorState) return;
  const wrapRect = document.querySelector("#sql-editor-wrap").getBoundingClientRect();
  const left = Math.min(window.innerWidth - syntaxTooltip.offsetWidth - 12, wrapRect.left + syntaxErrorState.anchorX);
  const top = Math.min(window.innerHeight - syntaxTooltip.offsetHeight - 12, wrapRect.top + syntaxErrorState.anchorY + 10);
  syntaxTooltip.style.left = `${Math.max(12, left)}px`;
  syntaxTooltip.style.top = `${Math.max(12, top)}px`;
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
  status.textContent = `${sqlEditor.value.length.toLocaleString()} characters loaded. Checking SQL syntax…`;
  scheduleSyntaxCheck(0);
}
