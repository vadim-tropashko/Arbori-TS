import { LexerToken } from "../../oracle/dbtools/parser/LexerToken.js";
import { Matrix } from "../../oracle/dbtools/parser/Matrix.js";
import { ParseNode } from "../../oracle/dbtools/parser/ParseNode.js";
import { Parser } from "../../oracle/dbtools/parser/Parser.js";
import { Token } from "../../oracle/dbtools/parser/Token.js";
import { SqlEarley } from "../../oracle/dbtools/parser/plsql/SqlEarley.js";
import { SyntaxError } from "../../oracle/dbtools/parser/plsql/SyntaxError.js";

type MatrixStateView = {
  head: string;
  rhs: string[];
  dot: number;
  origin: number;
};

type MatrixCellView = {
  from: number;
  to: number;
  count: number;
  items: string[];
  completed: string[];
  states?: MatrixStateView[];
};

export type SqlWorkbenchToken = {
  content: string;
  begin: number;
  end: number;
  type: string;
};

export type SqlWorkbenchMatrix = {
  boundaries: number[];
  cells: MatrixCellView[];
  lookup: Record<string, MatrixCellView>;
  visitedCells: Array<{ from: number; to: number }>;
};

export type SqlWorkbenchTreeNode = {
  from: number;
  to: number;
  name: string;
  aliases: string[];
  content?: string;
  children: SqlWorkbenchTreeNode[];
};

export type SqlWorkbenchParseResult = {
  tokens: SqlWorkbenchToken[];
  matrix: SqlWorkbenchMatrix;
  tree: SqlWorkbenchTreeNode | null;
  syntaxError: string | null;
  furthest: number;
};

/** Adapts the Java-translated SqlEarley matrix/tree to the workbench's browser view model. */
export function parseSqlForWorkbench(input: string): SqlWorkbenchParseResult {
  const tokens = LexerToken.parse$java_lang_String(input);
  const parser = SqlEarley.getInstance();
  const matrix = new Matrix(parser);
  parser.parse$java_util_List$oracle_dbtools_parser_Matrix(tokens, matrix);

  const syntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(
    input,
    ["sql_statements", "select", "insert", "update", "delete", "merge"],
    tokens,
    parser,
    matrix,
  );
  const root = syntaxError
    ? null
    : parser.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(tokens, matrix, true, input);

  return {
    tokens: tokens.map(({ content, begin, end, type }) => ({ content, begin, end, type: Token[type] })),
    matrix: serializeMatrix(matrix, parser, tokens.length),
    tree: root ? serializeTree(root, tokens, parser) : null,
    syntaxError: syntaxError?.getDetailedMessage() ?? null,
    furthest: matrix.lastY(),
  };
}

function serializeMatrix(matrix: Matrix, parser: SqlEarley, tokenCount: number): SqlWorkbenchMatrix {
  const cells: MatrixCellView[] = [];
  const lookup: Record<string, MatrixCellView> = {};
  const retainStates = tokenCount <= 300;

  if (tokenCount === 0) return { boundaries: [0], cells, lookup, visitedCells: [] };

  for (let to = 0; to <= Math.min(tokenCount, matrix.lastY()); to++) {
    const origins = matrix.getXRange(to).keySet();
    for (const from of origins) {
      const cell = matrix.get(from, to);
      if (!cell) continue;
      const items: string[] = [];
      const completed = new Set<string>();
      const states: MatrixStateView[] = [];
      for (let i = 0; i < cell.size(); i++) {
        const rule = parser.rules[cell.getRule(i)];
        const dot = cell.getPosition(i);
        const head = parser.allSymbols[rule.head];
        const rhs = rule.rhs.map((symbol) => parser.allSymbols[symbol]);
        if (items.length < 8) items.push(rule.toString$int(dot));
        if (dot === rhs.length) completed.add(head);
        if (retainStates) states.push({ head, rhs, dot, origin: from });
      }
      const view: MatrixCellView = {
        from,
        to,
        count: cell.size(),
        items,
        completed: [...completed],
        ...(retainStates ? { states } : {}),
      };
      cells.push(view);
      lookup[`${from}/${to}`] = view;
    }
  }

  return {
    boundaries: Array.from({ length: tokenCount + 1 }, (_, index) => index),
    cells,
    lookup,
    visitedCells: [],
  };
}

function serializeTree(root: ParseNode, tokens: LexerToken[], parser: SqlEarley): SqlWorkbenchTreeNode {
  const makeView = (node: ParseNode): SqlWorkbenchTreeNode => {
    const symbols = node.content$()
      .filter((symbol) => symbol >= 0)
      .map((symbol) => parser.allSymbols[symbol]);
    const content = node.to - node.from === 1 ? tokens[node.from]?.content : undefined;
    return {
      from: node.from,
      to: node.to,
      name: symbols[0] ?? (content === undefined ? "parse" : "token"),
      aliases: symbols.slice(1),
      ...(content === undefined ? {} : { content }),
      children: [],
    };
  };

  const viewRoot = makeView(root);
  const pending: Array<{ source: ParseNode; target: SqlWorkbenchTreeNode }> = [{ source: root, target: viewRoot }];
  while (pending.length > 0) {
    const { source, target } = pending.pop()!;
    const children = source.childList();
    for (const child of children) {
      const childView = makeView(child);
      target.children.push(childView);
      pending.push({ source: child, target: childView });
    }
  }
  return viewRoot;
}
