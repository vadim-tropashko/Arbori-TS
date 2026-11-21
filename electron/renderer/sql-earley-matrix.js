let matrixResizeObserver;

export function clearMatrixView() {
  matrixResizeObserver?.disconnect();
  matrixResizeObserver = undefined;
  document.querySelector(".matrix-cell-tooltip")?.remove();
  document.querySelector("#matrix-view").replaceChildren();
  const inspector = document.querySelector("#matrix-inspector");
  inspector.replaceChildren();
  const hint = document.createElement("p");
  hint.className = "matrix-hint";
  hint.textContent = "Choose Parse to build the SqlEarley matrix.";
  inspector.append(hint);
}

export function renderMatrix(matrix, tokens) {
  const container = document.querySelector("#matrix-view");
  matrixResizeObserver?.disconnect();
  matrixResizeObserver = undefined;
  container.replaceChildren();
  const inspector = document.querySelector("#matrix-inspector");
  inspector.replaceChildren();
  const tokenCount = matrix.boundaries.length - 1;
  const panel = container.closest(".tab-panel");
  const layout = container.parentElement;
  const splitter = layout.querySelector(".matrix-splitter");
  const panelPadding = Number.parseFloat(getComputedStyle(panel).paddingLeft) + Number.parseFloat(getComputedStyle(panel).paddingRight);
  const panelContentWidth = panel.parentElement.clientWidth - panelPadding;
  let cellSize = 1;
  let side = 1;
  const completionJoinIndex = buildCompletionJoinIndex(matrix);
  let maxCount = 1;
  forEachMatrixCell(matrix, (cell) => { maxCount = Math.max(maxCount, cell.count); });
  const skippedAt = new Map();
  for (const skipped of matrix.skippedOrigins ?? []) {
    const previous = skippedAt.get(skipped.origin);
    if (previous === undefined || skipped.fromPosition < previous) skippedAt.set(skipped.origin, skipped.fromPosition);
  }
  const canvas = document.createElement("canvas");
  canvas.id = "matrix-canvas";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", `Earley chart matrix for ${tokenCount} tokens`);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable in this browser.");
  document.querySelector(".matrix-cell-tooltip")?.remove();
  const cellTooltip = document.createElement("div");
  cellTooltip.className = "matrix-cell-tooltip";
  cellTooltip.setAttribute("role", "tooltip");
  cellTooltip.hidden = true;
  document.body.append(cellTooltip);
  const visitedCells = new Set((matrix.visitedCells ?? []).map((cell) => `${cell.from}/${cell.to}`));
  const paint = (selection) => drawMatrixCanvas(context, matrix, tokens, cellSize, side, maxCount, visitedCells, selection);
  let selected;
  let selectedItem = 0;
  const resizeCanvas = () => {
    const panelWidth = layout.clientWidth || panelContentWidth;
    const leftFr = Number.parseFloat(getComputedStyle(layout).getPropertyValue("--matrix-left-fr")) || 2.125;
    const fallbackWidth = window.matchMedia("(max-width: 900px)").matches
      ? panelWidth
      : (panelWidth - 10) * leftFr / (leftFr + 1);
    const availableWidth = Math.max(1, (container.clientWidth || fallbackWidth) - 2);
    cellSize = Math.max(1, Math.min(40, availableWidth / (tokenCount + 1)));
    side = (tokenCount + 1) * cellSize;
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.ceil(side * pixelRatio);
    canvas.height = Math.ceil(side * pixelRatio);
    canvas.style.width = `${side}px`;
    canvas.style.height = `${side}px`;
    context.setTransform(canvas.width / side, 0, 0, canvas.height / side, 0, 0);
    paint(selected);
  };
  container.append(canvas);
  resizeCanvas();
  matrixResizeObserver = new ResizeObserver(() => {
    if (container.clientWidth > 0) resizeCanvas();
  });
  matrixResizeObserver.observe(container);
  setupMatrixSplitter(layout, splitter);
  document.querySelector("#panel-matrix .empty-state").hidden = true;
  if (tokenCount > 0) {
    const note = document.createElement("p");
    note.className = "matrix-limit";
    const skippedCount = matrix.rangeSkippedOriginCount;
    note.textContent = `${tokenCount} tokens` + (skippedCount === undefined ? "" : ` · ${skippedCount.toLocaleString()} X origins pruned`) + (tokenCount > 300
      ? " · only the first eight items per cell are retained for this large input."
      : " · hover to inspect");
    container.append(note);
  }

  const selectAt = (x, y) => {
    const rect = canvas.getBoundingClientRect();
    const from = Math.floor((x - rect.left) * side / rect.width / cellSize);
    const to = Math.floor((y - rect.top) * side / rect.height / cellSize);
    if (from < 0 || to < 0 || from > tokenCount || to > tokenCount) return;
    cellTooltip.textContent = `[${from},${to})`;
    cellTooltip.hidden = false;
    const popup = cellTooltip.getBoundingClientRect();
    cellTooltip.style.left = `${Math.max(8, Math.min(x + 14, window.innerWidth - popup.width - 8))}px`;
    cellTooltip.style.top = `${Math.max(8, Math.min(y + 14, window.innerHeight - popup.height - 8))}px`;
    const key = `${from}/${to}`;
    if (selected?.key === key) return;
    const completion = findCompletionJoin(from, to, matrix, completionJoinIndex);
    selectedItem = completion?.itemIndex ?? 0;
    selected = {
      key,
      from,
      to,
      data: getMatrixCell(matrix, from, to),
      skippedFrom: from <= to ? skippedAt.get(from) : undefined,
      completionJoin: completion?.join,
    };
    updateMatrixInspector(inspector, selected, selectedItem, tokens);
    paint(selected);
  };
  canvas.addEventListener("mousemove", (event) => selectAt(event.clientX, event.clientY));
  canvas.addEventListener("mouseleave", () => { cellTooltip.hidden = true; });
  canvas.addEventListener("click", (event) => selectAt(event.clientX, event.clientY));
  canvas.addEventListener("wheel", (event) => {
    const states = selected?.data?.states ?? [];
    if (states.length < 2) return;
    event.preventDefault();
    selectedItem = (selectedItem + (event.deltaY > 0 ? 1 : -1) + states.length) % states.length;
    selected.completionJoin = findCompletionJoin(selected.from, selected.to, matrix, completionJoinIndex, selectedItem)?.join;
    updateMatrixInspector(inspector, selected, selectedItem, tokens);
    paint(selected);
  }, { passive: false });
}

function setupMatrixSplitter(layout, splitter) {
  if (splitter.dataset.bound === "true") return;
  splitter.dataset.bound = "true";
  let dragging = false;

  const setPercent = (requestedPercent) => {
    const width = layout.getBoundingClientRect().width;
    const available = width - splitter.getBoundingClientRect().width;
    if (available <= 0) return;
    const minPercent = Math.max(30, 280 / available * 100);
    const maxPercent = Math.min(80, (available - 260) / available * 100);
    const percent = Math.max(minPercent, Math.min(maxPercent, requestedPercent));
    const leftWidth = available * percent / 100;
    const rightWidth = available - leftWidth;
    layout.style.setProperty("--matrix-left-fr", `${leftWidth / rightWidth}fr`);
    splitter.setAttribute("aria-valuenow", String(Math.round(percent)));
  };

  splitter.addEventListener("pointerdown", (event) => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    event.preventDefault();
    dragging = true;
    layout.classList.add("is-resizing");
    splitter.setPointerCapture(event.pointerId);
    const rect = layout.getBoundingClientRect();
    const available = rect.width - splitter.getBoundingClientRect().width;
    setPercent((event.clientX - rect.left) / available * 100);
  });
  splitter.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const rect = layout.getBoundingClientRect();
    const available = rect.width - splitter.getBoundingClientRect().width;
    setPercent((event.clientX - rect.left) / available * 100);
  });
  const stopDragging = () => {
    dragging = false;
    layout.classList.remove("is-resizing");
  };
  splitter.addEventListener("pointerup", stopDragging);
  splitter.addEventListener("pointercancel", stopDragging);
  splitter.addEventListener("keydown", (event) => {
    const current = Number(splitter.getAttribute("aria-valuenow")) || 68;
    let next;
    if (event.key === "ArrowLeft") next = current - 2;
    else if (event.key === "ArrowRight") next = current + 2;
    else if (event.key === "Home") next = 30;
    else if (event.key === "End") next = 80;
    else return;
    event.preventDefault();
    setPercent(next);
  });
}

function matrixHeatColor(count, maximum) {
  const ratio = Math.log1p(count) / Math.log1p(maximum);
  if (ratio < 0.58) {
    const darken = ratio / 0.58;
    const gray = Math.round(204 - 54 * darken);
    return `rgb(${gray},${gray},${gray})`;
  }
  const heat = (ratio - 0.58) / 0.42;
  return `rgb(${Math.round(150 + 65 * heat)},${Math.round(150 - 90 * heat)},${Math.round(150 - 100 * heat)})`;
}

function drawMatrixCanvas(context, matrix, tokens, cellSize, side, maxCount, visitedCells, selected) {
  context.clearRect(0, 0, side, side);
  context.fillStyle = "#0000c0";
  context.fillRect(0, 0, side, side);
  for (const key of visitedCells) {
    const [from, to] = key.split("/").map(Number);
    if (from > to || getMatrixCell(matrix, from, to)) continue;
    context.fillStyle = "#00ff00";
    context.fillRect(from * cellSize, to * cellSize, cellSize, cellSize);
  }
  forEachMatrixCell(matrix, (cell) => {
    context.fillStyle = matrixHeatColor(cell.count, maxCount);
    context.fillRect(cell.from * cellSize, cell.to * cellSize, cellSize, cellSize);
  });
  if (selected) {
    const join = selected.completionJoin;
    if (join) {
      const fromX = (join.from + 0.5) * cellSize;
      const middleX = (join.middle + 0.5) * cellSize;
      const middleY = (join.middle + 0.5) * cellSize;
      const toY = (join.to + 0.5) * cellSize;
      context.beginPath();
      context.strokeStyle = "rgba(230, 28, 35, 0.9)";
      context.lineWidth = Math.max(1, Math.min(3, cellSize / 4));
      context.moveTo(fromX, middleY);
      context.lineTo(fromX, toY);
      context.moveTo(middleX, toY);
      context.lineTo(fromX, toY);
      context.stroke();
    }
  }
  if (cellSize >= 4) {
    context.fillStyle = "#fff";
    context.textBaseline = "middle";
    context.textAlign = "left";
    context.font = `${Math.max(7, Math.min(13, cellSize))}px sans-serif`;
    for (let index = 0; index < tokens.length; index++) {
      const x = index * cellSize + 2;
      const y = (index + 1) * cellSize - cellSize / 2;
      context.fillText(tokens[index].content, x, y);
    }
  }
  if (selected) {
    context.strokeStyle = "#d52f25";
    context.lineWidth = Math.max(2, Math.min(4, cellSize / 5));
    context.strokeRect(selected.from * cellSize + 1, selected.to * cellSize + 1, cellSize - 2, cellSize - 2);
  }
}

function buildCompletionJoinIndex(matrix) {
  const completedByCell = new Map();
  const stateDotsByCell = new Map();
  const stateRuleKey = (state) => `${state.head}\u0001${state.rhs.join("\u0002")}`;

  forEachMatrixCell(matrix, (cell) => {
    if (!cell.states) return;
    const completedHeads = new Set();
    const stateDots = new Set();
    for (const state of cell.states) {
      const ruleKey = stateRuleKey(state);
      stateDots.add(`${ruleKey}\u0003${state.dot}`);
      if (state.dot === state.rhs.length) {
        completedHeads.add(state.head);
      }
    }
    if (completedHeads.size) completedByCell.set(`${cell.from}/${cell.to}`, completedHeads);
    if (stateDots.size) stateDotsByCell.set(`${cell.from}/${cell.to}`, stateDots);
  });

  return { completedByCell, stateDotsByCell, stateRuleKey };
}

function forEachMatrixCell(matrix, visit) {
  if (matrix.rows) {
    for (const row of matrix.rows) for (const cell of row.values()) visit(cell);
    return;
  }
  for (const cell of matrix.cells ?? []) visit(cell);
}

export function getMatrixCell(matrix, from, to) {
  if (matrix.get) return matrix.get(from, to);
  if (matrix.lookup) return matrix.lookup[`${from}/${to}`];
  return matrix.cells?.find((cell) => cell.from === from && cell.to === to);
}

function findCompletionJoin(from, to, matrix, index, selectedItem) {
  const selected = getMatrixCell(matrix, from, to);
  if (!selected?.states) return undefined;

  // Trace one completed state in this cell back to the parent and child cells
  // that formed it: [from,middle) + [middle,to) -> [from,to).
  const candidates = selectedItem === undefined
    ? selected.states.map((state, itemIndex) => ({ state, itemIndex }))
    : [{ state: selected.states[selectedItem], itemIndex: selectedItem }].filter((item) => item.state);
  for (const { state: completed, itemIndex } of candidates) {
    if (completed.dot !== completed.rhs.length || completed.dot === 0) continue;
    for (let middle = from + 1; middle < to; middle++) {
      const parentSpan = `${from}/${middle}`;
      const childSpan = `${middle}/${to}`;
      const parentDot = completed.dot - 1;
      const parentStates = index.stateDotsByCell.get(parentSpan);
      const childHeads = index.completedByCell.get(childSpan);
      if (
        parentStates?.has(`${index.stateRuleKey(completed)}\u0003${parentDot}`) &&
        childHeads?.has(completed.rhs[parentDot])
      ) {
        return { itemIndex, join: { from, middle, to } };
      }
    }
  }
  return undefined;
}

function updateMatrixInspector(inspector, selected, selectedItem, tokens) {
  inspector.replaceChildren();
  const title = document.createElement("h3");
  title.textContent = `Cell [${selected.from}, ${selected.to})`;
  inspector.append(title);
  const tokenText = document.createElement("p");
  tokenText.textContent = tokens.slice(selected.from, selected.to).map((token) => token.content).join(" ") || "Empty span";
  inspector.append(tokenText);
  if (!selected.data) {
    const empty = document.createElement("p");
    empty.textContent = selected.skippedFrom !== undefined && selected.to >= selected.skippedFrom
      ? `No Earley items: X origin ${selected.from} was pruned from chart end ${selected.skippedFrom}.`
      : "No Earley items are stored in this cell.";
    inspector.append(empty);
    return;
  }
  const data = selected.data;
  const count = document.createElement("p");
  count.textContent = `${data.count.toLocaleString()} Earley item${data.count === 1 ? "" : "s"}`;
  inspector.append(count);
  if (data.completed.length) {
    const completed = document.createElement("p");
    completed.className = "matrix-completed";
    completed.textContent = `Completed: ${data.completed.join(", ")}`;
    inspector.append(completed);
  }
  const states = data.states ?? [];
  if (!states.length && data.items.length >= 8) {
    const limit = document.createElement("p");
    limit.textContent = "Showing the first eight items retained in this cell.";
    inspector.append(limit);
  }
  const items = document.createElement("ul");
  if (states.length) {
    const start = Math.max(0, Math.min(selectedItem - 150, states.length - 300));
    const end = Math.min(states.length, start + 300);
    for (let index = start; index < end; index++) {
      const state = states[index];
      const item = document.createElement("li");
      item.textContent = formatMatrixState(state);
      if (index === selectedItem) item.className = "matrix-highlight";
      items.append(item);
    }
    if (states.length > 300) {
      const note = document.createElement("p");
      note.textContent = `Showing items ${start + 1}–${end} of ${states.length.toLocaleString()}.`;
      inspector.append(note);
    }
    if (states.length > 1) {
      const hint = document.createElement("p");
      hint.textContent = "Use the mouse wheel to cycle through items.";
      inspector.append(hint);
    }
  } else {
    for (const value of data.items) {
      const item = document.createElement("li");
      item.textContent = value;
      items.append(item);
    }
  }
  inspector.append(items);
}

function formatMatrixState(state) {
  const rhs = [...state.rhs];
  rhs.splice(state.dot, 0, "•");
  return `${state.head} → ${rhs.join(" ")}  (from ${state.origin})`;
}

