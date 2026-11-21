/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Attribute } from '../../dbtools/arbori/Attribute.js';
import { ParseNode } from '../../dbtools/parser/ParseNode.js';
import { Substitutions } from '../../dbtools/parser/Substitutions.js';
import { ParsedSql } from '../../dbtools/parser/plsql/ParsedSql.js';

/**
 * This is a workaround oracle RDBMS dictionary design flaw
 * where user having SELECT_CATALOG_ROLE privilege won't see
 * objects owned by other users via all_objects views
 * Known usages: sql completer, sqlcl project export
 * @author VTROPASH
 * @param {*} conn
 * @class
 */
export class DictionaryViews {
    conn: Connection;

    public all2DbaViews: any;

    public cachedQueries: any;

    public constructor(conn: Connection) {
        if (this.conn === undefined) { this.conn = null; }
        this.all2DbaViews = <any>({});
        this.cachedQueries = <any>({});
        this.conn = conn;
    }

    /**
     * Find all_/dba_views in dictionary query
     * and adjust them according to their availability
     * @param {string} query
     * @return
     * @return {string}
     */
    public translate(query: string): string {
        if (this.conn == null)return query;
        try {
            if (this.conn.isClosed())return query;
        } catch(e) {
            return query;
        }
        let ret: string = /* get */((m,k) => m[k]===undefined?null:m[k])(this.cachedQueries, query);
        if (ret != null)return ret;
        ret = query;
        const parsed: ParsedSql = new ParsedSql(query);
        if (parsed.getSyntaxError() != null)return query;
        const subs: Substitutions = new Substitutions(parsed);
        {
            let array = parsed.getRoot().descendants();
            for(let index = 0; index < array.length; index++) {
                let node = array[index];
                {
                    if (node.from + 1 !== node.to)continue;
                    if (!node.contains$java_lang_String("identifier"))continue;
                    const gParent: ParseNode = node.parent$().parent$();
                    const predecessor: ParseNode = Attribute.getSibling(node, node.parent$(), -1);
                    if (!node.contains$java_lang_String("query_table_expression") && !node.contains$java_lang_String("query_table_expression___0") && !gParent.contains$java_lang_String("column") && (predecessor == null || !predecessor.contains$java_lang_String("query_table_expression")) && !node.contains$java_lang_String("table"))continue;
                    const token: string = /* get */parsed.getSrc()[node.from].content.toLowerCase();
                    if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token, "dba_") && !/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token, "all_") && !/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token, "user_"))continue;
                    let postfix: string = token.substring(4);
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token, "user_"))postfix = token.substring(5);
                    let dictView: string = /* get */((m,k) => m[k]===undefined?null:m[k])(this.all2DbaViews, "all_" + postfix);
                    if (dictView == null){
                        const probe: string = "select 1 from dba_" + postfix + " where 1=0";
                        const stmt: Statement = this.conn.createStatement();
                        const rs: ResultSet = stmt.executeQuery(probe);
                        try {
                            dictView = "Dba_" + postfix;
                            /* put */(this.all2DbaViews["all_" + postfix] = dictView);
                        } catch(e) {
                            dictView = "All_" + postfix;
                            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(postfix, "role_privs"))dictView = "User_" + postfix;
                            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(postfix, "sys_privs"))dictView = "User_" + postfix;
                            /* put */(this.all2DbaViews["all_" + postfix] = dictView);
                        } finally {
                            rs.close();
                            stmt.close();
                        }
                    }
                    subs.replace$oracle_dbtools_parser_ParseNode$java_lang_String(node, dictView);
                }
            }
        }
        ret = subs.transformInput();
        /* put */(this.cachedQueries[query] = ret);
        return ret;
    }
}
DictionaryViews["__class"] = "oracle.arbori.util.DictionaryViews";



