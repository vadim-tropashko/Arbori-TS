/* Java-derived SQL parse-tree helpers from dbtools-common BasicTabCol. */
import type { LexerToken } from "../parser/LexerToken.js";
import type { ParseNode } from "../parser/ParseNode.js";

export interface Column {
  colExpr: ParseNode | null;
  alias: string | null;
}

/** The parser-only portion of dbtools-common's BasicTabCol. */
export class TabCol {
  static getInlineViewNodes(root: ParseNode, src: LexerToken[]): Map<string, ParseNode> {
    const result = new Map<string, ParseNode>();
    for (const child of root.children()) {
      if (!child.contains("select_list") &&
          (child.contains("query_table_expression") ||
           child.contains("scalar_subquery_expression") ||
           child.contains("par_subquery"))) {
        for (const grandChild of child.children()) {
          if (!grandChild.contains("subquery")) continue;
          const previous = src[child.from - 1]?.content;
          if (previous?.toLowerCase() === "as") {
            const alias = src[child.from - 2]?.content;
            if (alias !== undefined) result.set(alias.toLowerCase(), grandChild);
          } else {
            result.set("inline subquery", grandChild);
          }
        }
      } else if (!child.contains("where_clause") && !child.contains("select_list")) {
        for (const [name, node] of TabCol.getInlineViewNodes(child, src)) result.set(name, node);
      }
    }
    return result;
  }

  static getMainQueryBlock(root: ParseNode | null): ParseNode | null {
    if (root === null) return null;
    if (root.contains("query_block")) return root;
    for (const child of root.children()) {
      if (child.contains("subquery") || child.contains("query_block")) {
        const found = TabCol.getMainQueryBlock(child);
        if (found !== null) return found;
      }
    }
    return null;
  }

  static getSelectList(root: ParseNode | null): ParseNode | null {
    if (root === null) return null;
    const visit = (node: ParseNode, isRoot: boolean): ParseNode | null => {
      if (!isRoot && node.contains("par_subquery")) return null;
      if (node.contains("select_list")) return node;
      for (const child of node.children()) {
        const found = visit(child, false);
        if (found !== null) return found;
      }
      return null;
    };
    return visit(root, true);
  }

  /** Mirrors BasicTabCol.extractColumns for the non-short-circuit call used by SqlCompleter. */
  static extractColumns(
    selectNode: ParseNode | null,
    src: LexerToken[],
    shortCircuit = false,
    _excludeCondition = false,
  ): Column[] {
    if (selectNode === null) return [];
    const columns: Column[] = [];
    const aliases = new Set<string>();
    for (const node of TabCol.getColumnNodes(selectNode)) {
      const children = node.children();
      if (children.length === 0) {
        const name = src[node.from]?.content ?? null;
        columns.push({ colExpr: node, alias: name });
        if (name !== null) aliases.add(name);
        continue;
      }
      if (node.contains("expr")) {
        columns.push({ colExpr: node, alias: null });
        shortCircuit = false;
        continue;
      }

      let expression: ParseNode | null = null;
      let alias: string | null = null;
      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if (index === 0) {
          if (child.contains("expr")) expression = child;
          else if (node.contains("select_term")) {
            expression = node;
            shortCircuit = false;
            break;
          }
        }
        if (index === 1) {
          alias = src[child.to - 1]?.content ?? null;
          break;
        }
      }
      if (alias === null || aliases.has(alias)) shortCircuit = false;
      columns.push({ colExpr: expression, alias });
      if (alias !== null) aliases.add(alias);
    }
    // Preserve the Java method's shortCircuit state transitions. This caller
    // requests false and does not use the resulting state.
    void shortCircuit;
    void _excludeCondition;
    return columns;
  }

  private static getColumnNodes(node: ParseNode): ParseNode[] {
    if (node.contains("select_term") || (node.contains("select_list") && node.contains("'*'"))) return [node];
    return node.children().flatMap((child) => TabCol.getColumnNodes(child));
  }
}
