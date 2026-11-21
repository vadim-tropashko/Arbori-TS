/* Generated from Java with JSweet 4.0.0-SNAPSHOT - http://www.jsweet.org */
import { MaterializedPredicate } from '../arbori/MaterializedPredicate';
import { Program } from '../arbori/Program';
import { SqlProgram } from '../arbori/SqlProgram';
import { Tuple } from '../arbori/Tuple';
import { Cell } from '../parser/Cell';
import { Earley } from '../parser/Earley';
import { Lexer } from '../parser/Lexer';
import { LexerToken } from '../parser/LexerToken';
import { Matrix } from '../parser/Matrix';
import { ParseNode } from '../parser/ParseNode';
import { Parsed } from '../parser/Parsed';
import { RecognizedRule } from '../parser/RecognizedRule';
import { Token } from '../parser/Token';
import { MysqlEarley } from '../parser/mysql/MysqlEarley';
import { SqlEarley } from '../parser/plsql/SqlEarley';
import { SyntaxError } from '../parser/plsql/SyntaxError';
import { DocURL } from '../parser/plsql/doc/DocURL';
import { HarvestDoc } from '../parser/plsql/doc/HarvestDoc';
import { GlobalMap } from '../../arbori/scripting/GlobalMap';
import { Completer } from './Completer';
import { JSCompleter } from './JSCompleter.js';
import { Parser } from '../parser/Parser';
import oracledb, { type Connection, type BindParameters } from 'oracledb';
import { Service } from '../../arbori/util/Service';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { TabCol } from '../insight/TabCol.js';

function isJavaWhitespace(value: string): boolean {
    const code = value.charCodeAt(0);
    return (code >= 0x0009 && code <= 0x000d) || (code >= 0x001c && code <= 0x0020) ||
        code === 0x1680 || (code >= 0x2000 && code <= 0x2006) ||
        (code >= 0x2008 && code <= 0x200a) || code === 0x2028 || code === 0x2029 ||
        code === 0x205f || code === 0x3000;
}

/**
 * Code completion to use in sqlcl and sqldevweb
 * 
 * <p>Top-level SELECT prefixes complete without parser or database access.
 * Incomplete SELECT lists can use a qualified table name to resolve columns.
 * Qualified-table FROM snippets are limited to SELECT lists whose query block
 * has no FROM clause.
 * 
 * @author Dim
 * @param {*} conn
 * @class
 * @extends Completer
 */
export class SqlCompleter extends Completer {
    public lastFunctionCallName: string;

    static color32: string = "\u001b[32m";

    static color1: string = "\u001b[1m";

    static color0: string = "\u001b[0m";

    static SELECT_KEYWORD: string = "SELECT";

    earley: Earley;

    public static example: string = "/Users/VTROPASH/eclipse-workspace/sandbox/src/example.sql";

    public editorOffset: number;

    programInstance: SqlCompleter.IProgram;

    public constructor(conn: Connection | null) {
        super();
        if (this.lastFunctionCallName === undefined) { this.lastFunctionCallName = null; }
        this.earley = null;
        this.editorOffset = -1;
        this.programInstance = null;
        this.dialect = null;
        this._conn = null;
        this.minPrefLen = 3;
        this.NOTASYNONYM = "NOTASYNONYM";
        this.synonymCache = <any>({});
        this._conn = conn;
    }

    dialect: SqlCompleter.Dialect;

    /*private*/ _conn: Connection | null;

    public getConnection(): Connection | null {
        return this._conn;
    }

    private connectedUser: string | null = null;
    private cachedConnection: Connection | null = null;

    refreshConnection(conn: Connection | null) {
        if (this.cachedConnection === conn)return;
        this.cachedConnection = conn;
        this.connectedUser = null;
        /* clear */(obj => { for (let member in obj) delete obj[member]; })(this.synonymCache);
    }

    private async executeRows(sql: string, binds: BindParameters = []): Promise<any[][]> {
        const conn = this.getConnection();
        if (!conn) return [];
        conn.callTimeout = SqlCompleter.timeout;
        let result;
        try {
            result = await conn.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_ARRAY, maxRows: 500 });
        } catch (error) {
            if (error instanceof Error && error.message.includes("NJS-098")) {
                throw new Error(`${error.message}; SQL=${sql}; bindCount=${binds.length}`, { cause: error });
            }
            throw error;
        }
        return (result.rows ?? []) as any[][];
    }

    private async currentUser(): Promise<string | null> {
        if (this.connectedUser != null) return this.connectedUser;
        const rows = await this.executeRows('select user from dual');
        this.connectedUser = rows.length ? String(rows[0][0]) : null;
        return this.connectedUser;
    }

    public static timeout: number = 5000;

    // node-oracledb applies callTimeout to each round trip.

    public predict(pos: number, matrix: Matrix): Array<number> {
        if (1 < pos){
            const cell: Parser.EarleyCell = matrix.get(pos - 1, pos);
            if (cell != null)for(let i: number = 0; i < cell.size(); i++) {{
                if (cell.getPosition(i) !== 1)continue;
                const rule: number = cell.getRule(i);
                if (this.earley.rules[rule].head === this.earley.getSymbol("select_list") && this.earley.rules[rule].rhs[0] === this.earley.getSymbol("\'*\'")){
                    const predictions: Array<number> = <any>([]);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(predictions, Service.lPair(this.earley.getSymbol("\'FROM\'"), this.earley.getSymbol("from_clause")));
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(predictions, Service.lPair(this.earley.getSymbol("\'INTO\'"), this.earley.getSymbol("into_list")));
                    return predictions;
                }
            };}
        }
        return this.earley.predict$int$oracle_dbtools_parser_Matrix(pos, matrix);
    }

    condition(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "predicate";
        return "condition";
    }

    simple_comparison_condition___1(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "predicate";
        return "simple_comparison_condition___1";
    }

    cmp_op(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "comparisonOperator";
        return "cmp_op";
    }

    paren_expr_list(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "functionCall";
        return "paren_expr_list";
    }

    expr(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "expression";
        return "expr";
    }

    stmt(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "procedureSqlStatement";
        return "stmt";
    }

    table_reference(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "tableSource";
        return "table_reference";
    }

    dml_table_expression_clause(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "tableSource";
        return "dml_table_expression_clause";
    }

    column(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "fullColumnName";
        return "column";
    }

    bind_var(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "mysqlVariable";
        return "bind_var";
    }

    constrained_type(): string {
        if (this.dialect === SqlCompleter.Dialect.MySQL)return "dataType";
        return "constrained_type";
    }

    public static thresholdWeightFactor: number = (n => n<0?Math.ceil(n):Math.floor(n))(801840000000 / 6000000);

    public static maxKeywordSuggestions: number = 10;

    public static maxRuleSuggestions: number = 3;

    public topRuleSuggestions(err: SyntaxError, prefix: LexerToken, src: Array<LexerToken>): Array<RecognizedRule> {
        const N: number = 100;
        const tmp: Array<RecognizedRule> = err.topNrules$int$boolean$java_lang_String(N, false, prefix == null ? null : prefix.content);
        let cutWeight: number = -1;
        const ret: Array<RecognizedRule> = <any>([]);
        let i: number = 0;
        for(let index = 0; index < tmp.length; index++) {
            let rr = tmp[index];
            {
                if (cutWeight === -1)cutWeight = (n => n<0?Math.ceil(n):Math.floor(n))(rr.weight / SqlCompleter.thresholdWeightFactor);
                if (rr.weight < cutWeight){
                    break;
                }
                if (SqlCompleter.maxKeywordSuggestions <= i)break;
                if (rr.isKeyword()){
                    /* add */(ret.push(rr)>0);
                    i++;
                }
            }
        }
        cutWeight = -1;
        i = 0;
        for(let index = 0; index < tmp.length; index++) {
            let rr = tmp[index];
            {
                if (cutWeight === -1)cutWeight = (n => n<0?Math.ceil(n):Math.floor(n))(rr.weight / SqlCompleter.thresholdWeightFactor);
                if (rr.weight < cutWeight){
                    break;
                }
                if (SqlCompleter.maxRuleSuggestions <= i)break;
                if (!/* contains */(ret.indexOf(<any>(rr)) >= 0)){
                    rr.head = this.sugarcoatSymbol(rr.head);
                    rr.rhs[0] = this.sugarcoatSymbol(rr.rhs[0]);
                    /* add */(ret.push(rr)>0);
                    i++;
                }
            }
        }
        return ret;
    }

    getFrequencies(): any {
        if (this.dialect === SqlCompleter.Dialect.ORACLE)return HarvestDoc.getFrequencies();
        if (this.dialect === SqlCompleter.Dialect.MySQL)return MysqlEarley.getFrequencies();
        return null;
    }

    public topKWsuggestions(suggestions: Array<number>, prefix: LexerToken): Array<string> {
        if (this.getFrequencies() == null){
            const ret: Array<string> = <any>([]);
            let cnt: number = 0;
            for(let index = 0; index < suggestions.length; index++) {
                let entry = suggestions[index];
                {
                    let prefixKW: string = "\'";
                    if (prefix != null)prefixKW = "\'" + prefix.content;
                    let sym: string = this.earley.allSymbols[Service.lX(entry)];
                    if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(sym, prefixKW.toUpperCase()))continue;
                    if (sym.length < 5 && !("\'*\'" === sym) && !("\'-\'" === sym))continue;
                    sym = sym.substring(1, sym.length - 1);
                    if (/* contains */(ret.indexOf(<any>(sym)) >= 0))continue;
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, sym);
                    cnt++;
                    if (50 < cnt)break;
                }
            }
            return ret;
        }
        const topN: any = <any>({});
        const N: number = 15;
        for(let index = 0; index < suggestions.length; index++) {
            let entry = suggestions[index];
            {
                let prefixKW: string = "\'";
                if (prefix != null)prefixKW = "\'" + prefix.content;
                const sym: string = this.earley.allSymbols[Service.lX(entry)];
                if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(sym, prefixKW.toUpperCase())){
                    continue;
                }
                if (sym.length < 4 && !("\'*\'" === sym) && !("\'-\'" === sym))continue;
                const parent: string = this.earley.allSymbols[Service.lY(entry)];
                if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(parent, "]\"") && 0 < parent.indexOf("["))if (2 + sym.length < parent.length)continue;
                let minVar: number = -1;
                let minVal: number = 2147483647;
                {
                    let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>topN);
                    for(let index1 = 0; index1 < array.length; index1++) {
                        let s = array[index1];
                        {
                            const tmp: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>topN, s);
                            if (tmp < minVal){
                                minVar = s;
                                minVal = tmp;
                            }
                        }
                    }
                }
                const suggestedVar: number = entry;
                let suggestedVal: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.getFrequencies(), entry);
                if (suggestedVal == null)suggestedVal = 0;
                if (/* size */((m) => { if(m.entries==null) m.entries=[]; return m.entries.length; })(<any>topN) === N){
                    if (suggestedVal != null && minVal < suggestedVal){
                        /* remove */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries.splice(i,1)[0]; } })(<any>topN, minVar);
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>topN, suggestedVar, suggestedVal);
                    }
                } else /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>topN, suggestedVar, suggestedVal);
            }
        }
        const myList: Array<{ getKey(): number; getValue(): number }> = <any>([]);
        {
            let array = /* entrySet */((m) => { if(m.entries==null) m.entries=[]; return m.entries; })(<any>topN);
            for(let index = 0; index < array.length; index++) {
                let e = array[index];
                /* add */(myList.push(e)>0)
            }
        }
        /* sort */((l,c) => { if((<any>c).compare) l.sort((e1,e2)=>(<any>c).compare(e1,e2)); else l.sort(<any>c); })(myList,new SqlCompleter.SqlCompleter$1(this));
        let div: number = 0;
        if (prefix != null)div = prefix.content.length;
        const ret: Array<string> = <any>([]);
        let i: number = 0;
        for(let index = 0; index < myList.length; index++) {
            let e = myList[index];
            {
                if (N < i)break;
                let sugg: string = this.earley.allSymbols[Service.lX(e.getKey())];
                sugg = sugg.substring(1, sugg.length - 1);
                if (this.isColoredCompletionEnabled()){
                    const pre: string = sugg.substring(0, div);
                    const post: string = sugg.substring(div);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, SqlCompleter.color0 + pre + SqlCompleter.color32 + post + SqlCompleter.color0);
                } else /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, sugg);
                i++;
            }
        }
        return ret;
    }

    isColoredCompletionEnabled(): boolean {
        return false;
    }

    public sugarcoatSymbol(s: string): string {
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(s, "\""))return s.substring(1, s.length - 1);
        const pos: number = s.indexOf('[');
        if (0 < pos)return s.substring(0, pos);
        return s;
    }

    printRules(rules: Array<RecognizedRule>, symbol: string) {
        let i: number = -1;
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                i++;
                if (/* contains */(r.head.indexOf(symbol) != -1))console.info("i=" + i + "    " + r.toString() + " , weight=" + r.weight);
            }
        }
    }

    inline(input: Array<RecognizedRule>, matrix: Matrix, src: Array<LexerToken>): Array<RecognizedRule> {
        const ret: Array<RecognizedRule> = <any>([]);
        for(let index = 0; index < input.length; index++) {
            let rr = input[index];
            {
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, this.inlineRecognized(rr, matrix, src));
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, this.inlineAtPos(rr, matrix, src));
            }
        }
        return ret;
    }

    inlineRecognized(input: RecognizedRule, matrix: Matrix, src: Array<LexerToken>): Array<RecognizedRule> {
        const ret: Array<RecognizedRule> = <any>([]);
        if (input.X === input.Y)return ret;
        const cell: Parser.EarleyCell = matrix.get(input.X, input.Y);
        const node: ParseNode = this.earley.treeForACell(src, matrix, cell, input.X, input.Y);
        const rhs: Array<string> = node.flatten();
        /* add */(ret.push(new RecognizedRule(input, /* toArray */rhs.slice(0), null))>0);
        return ret;
    }

    inlineAtPos(input: RecognizedRule, matrix: Matrix, src: Array<LexerToken>): Array<RecognizedRule> {
        const ret: Array<RecognizedRule> = <any>([]);
        const symbol: string = input.rhs[input.pos];
        if ("..." === symbol){
            return ret;
        }
        const code: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, symbol);
        const railroads: any = HarvestDoc.getRailroads();
        const tdoc: DocURL = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>railroads, code);
        if (tdoc == null && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(0)) != '\''.charCodeAt(0) && !("identifier" === symbol) && !("digits" === symbol) && !("boolean" === symbol) && !("path" === symbol) && !("url" === symbol)){
            const tuples: Parser.Tuple[] = this.earley.rules;
            for(let i: number = 0; i < tuples.length; i++) {{
                const candidate: Parser.Tuple = tuples[i];
                if (candidate.head === code)/* add */(ret.push(new RecognizedRule(input, input.pos, candidate.rhs, candidate.head))>0);
            };}
        }
        return ret;
    }

    static missingId: string = "MISSING_ID";

    /**
     * Completes the following:
     * 1. Keywords
     * 2. Table list (prefixed and not)
     * 3. Column list in where clause (prefixed and not)
     * Calls on the same instance are serialized because completion uses instance-local request state.
     * @param {string} input  -- sql text
     * @param position  -- 0-based cursor position
     * @param {number} pos
     * @return {CompletionList}
     */
    public async complete(input: string, pos: number): Promise<CompletionList> {
        if (input.length < pos)pos = input.length;
        const simpleKeywordCompletion: CompletionList = this.topLevelSelectCompletion(input, pos);
        if (simpleKeywordCompletion != null){
            return simpleKeywordCompletion;
        }
        try {
            this.dialect = SqlCompleter.Dialect.ORACLE;
        } catch(e) {
            this.refreshConnection(null);
            this.dialect = null;
            this.programInstance = null;
        }
        const ret: CompletionList = new CompletionList();
        if (100000 < input.length)return ret;
        this.earley = /* clone *//* clone */((o: any) => { if (o.clone != undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(SqlEarley.getInstance());
        if (this.dialect === SqlCompleter.Dialect.MySQL)try {
            this.earley = new MysqlEarley();
        } catch(e) {
        }
        if (this.dialect !== SqlCompleter.Dialect.MySQL)try {
            for (const candidate of new JSCompleter(this.earley).complete(input, pos)) ret.add(candidate);
        } catch(e) {
        }
        try {
            let lexOptions: number = LexerToken.SQL_$LI$();
            if (this.dialect === SqlCompleter.Dialect.MySQL)lexOptions = LexerToken.SQL_$LI$() + LexerToken.PoundComments_$LI$();
            let src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, lexOptions);
            if (0 === /* size */(<number>src.length))return ret;
            try {
                const tmp: LexerToken = LexerToken.getTokenAtCharOffset(src, pos);
                if (tmp.posInsideLiteral(pos))return ret;
            } catch(e) {
            }
            let matrix: Matrix = new Matrix(this.earley);
            this.earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
            let toRecognize: string[] = ["sql_statements", "select", "insert", "update", "delete", "merge"];
            if (this.dialect === SqlCompleter.Dialect.MySQL)toRecognize = ["sqlStatements"];
            const error: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$java_lang_String$java_lang_String(input, toRecognize, src, this.earley, matrix, "^^^", "SyntaxError_DetailedMessage");
            if (error != null){
                let select: number = -1;
                let from: number = -1;
                for(let index = 0; index < src.length; index++) {
                    let t = src[index];
                    {
                        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("select", t.content) && t.end < pos)select = t.end;
                        if (0 <= select && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("from", t.content)){
                            if (pos < t.begin){
                                from = t.begin;
                                break;
                            }
                            select = -1;
                        }
                    }
                }
                if (0 <= select && 0 <= from){
                    const selClause: string = input.substring(select, from);
                    const selTokens: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(selClause, false, lexOptions);
                    if (1 < /* size */(<number>selTokens.length) && ("." === /* get */selTokens[/* size */(<number>selTokens.length) - 1].content))ret.alias = /* get */selTokens[/* size */(<number>selTokens.length) - 2].content; else if (2 < /* size */(<number>selTokens.length) && ("." === /* get */selTokens[/* size */(<number>selTokens.length) - 2].content)){
                        ret.prefix = /* get */selTokens[/* size */(<number>selTokens.length) - 1];
                        ret.alias = /* get */selTokens[/* size */(<number>selTokens.length) - 3].content;
                    }
                    let prefix: string = input.substring(0, select);
                    if (error.end <= select){
                        prefix = "select";
                        pos = prefix.length + 1;
                    } else pos = select + 1;
                    input = prefix + " * " + input.substring(from);
                    src = Lexer.parse$java_lang_String$boolean$int(input, false, lexOptions);
                    matrix = new Matrix(this.earley);
                    this.earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
                } else {
                    this.editorOffset = LexerToken.char2lex$java_util_List$int$boolean(src, pos, true);
                    let cur: LexerToken = null;
                    if (this.editorOffset < /* size */(<number>src.length))cur = /* get */src[this.editorOffset];
                    const predicted: Array<number> = this.predict(this.editorOffset, matrix);
                    const predictions: Array<string> = <any>([]);
                    for(let index = 0; index < predicted.length; index++) {
                        let key = predicted[index];
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(predictions, this.earley.allSymbols[Service.lX(key)])
                    }
                    if (/* contains */(predictions.indexOf(<any>("\';\'")) >= 0)){
                        const extra: string = ";";
                        input = input.substring(0, pos) + extra + input.substring(pos);
                        src = Lexer.parse$java_lang_String$boolean$int(input, false, lexOptions);
                    } else if (/* contains */(predictions.indexOf(<any>("\')\'")) >= 0)){
                        const extra: string = ");";
                        input = input.substring(0, pos) + extra + input.substring(pos);
                        src = Lexer.parse$java_lang_String$boolean$int(input, false, lexOptions);
                    } else if (/* contains */(predictions.indexOf(<any>(this.simple_comparison_condition___1())) >= 0)){
                        let extra: string = "=1 ";
                        if (/* contains */(predictions.indexOf(<any>(this.condition())) >= 0))extra = " " + SqlCompleter.missingId + extra;
                        input = input.substring(0, pos) + extra + input.substring(pos);
                        src = Lexer.parse$java_lang_String$boolean$int(input, false, lexOptions);
                    } else if (/* contains */(predictions.indexOf(<any>("identifier")) >= 0) && (cur == null || !cur.incomplete())){
                        let extra: string = " " + SqlCompleter.missingId;
                        if (2 < this.editorOffset && !/* contains */(predictions.indexOf(<any>(this.table_reference())) >= 0)){
                            const predicted2: Array<number> = this.predict(this.editorOffset - 2, matrix);
                            const predictions2: Array<string> = <any>([]);
                            for(let index = 0; index < predicted2.length; index++) {
                                let key = predicted2[index];
                                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(predictions2, this.earley.allSymbols[Service.lX(key)])
                            }
                            if (/* contains */(predictions2.indexOf(<any>(this.condition())) >= 0))extra = " " + SqlCompleter.missingId + " and 1 ";
                        }
                        input = input.substring(0, pos) + extra + " " + input.substring(pos);
                        src = Lexer.parse$java_lang_String$boolean$int(input, false, lexOptions);
                    }
                }
            }
            if (error != null){
                const recoveredMatrix: Matrix = new Matrix(this.earley);
                this.earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, recoveredMatrix);
                this.editorOffset = LexerToken.char2lex$java_util_List$int$boolean(src, pos, true);
                if (this.editorOffset - recoveredMatrix.lastY() > 2){
                    return ret;
                }
            }
            const target: Parsed = new Parsed(input, src, this.earley, <string>null);
            this.editorOffset = LexerToken.char2lex$java_util_List$int(src, pos);
            if (this.editorOffset < /* size */(<number>src.length) && /* get */src[this.editorOffset].begin < pos && pos <= /* get */src[this.editorOffset].end)ret.prefix = /* get */src[this.editorOffset];
            if (ret.prefix != null && ret.prefix.type === Token.OPERATION && !(ret.prefix.content === (":")) && !(ret.prefix.content === ("!")) && !(ret.prefix.content === ("^"))){
                ret.prefix = null;
                this.editorOffset++;
            }
            if (/* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)("*",ret.prefix))){
                ret.prefix = null;
                this.editorOffset--;
            }
            if (ret.alias == null){
                if (0 <= this.editorOffset - 2 && this.editorOffset < /* size */(<number>src.length) && ("." === /* get */src[this.editorOffset - 1].content))ret.alias = /* get */src[this.editorOffset - 2].content; else if (0 <= this.editorOffset - 3 && this.editorOffset < /* size */(<number>src.length) && ("." === /* get */src[this.editorOffset - 2].content)){
                    ret.alias = /* get */src[this.editorOffset - 3].content;
                }
            }
            if (4 <= /* get */src[0].content.length && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(/* get */src[0].content.substring(0, 4), "desc") || 3 <= /* get */src[0].content.length && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(/* get */src[0].content.substring(0, 3), "ddl") || 4 <= /* get */src[0].content.length && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(/* get */src[0].content.substring(0, 4), "info") || 4 <= /* get */src[0].content.length && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(/* get */src[0].content.substring(0, 4), "ctas")){
                let pref: string = "";
                if (ret.prefix != null){
                    pref = ret.prefix.content;
                    if (pos < ret.prefix.end)pref = pref.substring(0, pos - ret.prefix.begin);
                }
                let owner: string = null;
                const obj: string = pref;
                if (2 < /* size */(<number>src.length) && ("." === /* get */src[2].content))owner = /* get */src[1].content.toUpperCase();
                let typePredicate: string = "object_type in (\'TABLE\',\'VIEW\',\'SYNONYM\',\'PACKAGE\',\'PROCEDURE\',\'FUNCTION\',\'TYPE\') and";
                if (0 < obj.length)typePredicate = "";
                {
                    let array = await this.queryObjects(owner, obj.toUpperCase(), typePredicate);
                    for(let index = 0; index < array.length; index++) {
                        let sugg = array[index];
                        {
                            ret.add(sugg);
                        }
                    }
                }
                ret.pos = pos - pref.length;
                return ret;
            }
            const predicted: Array<number> = this.predict(this.editorOffset, matrix);
            const predictions: Array<string> = <any>([]);
            for(let index = 0; index < predicted.length; index++) {
                let key = predicted[index];
                {
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(predictions, this.earley.allSymbols[Service.lX(key)]);
                }
            }
            const alias2table: any = <any>({});
            let output: any = null;
            if (/* contains */(predictions.indexOf(<any>(this.expr())) >= 0) || /* contains */(predictions.indexOf(<any>("identifier")) >= 0) && /* contains */(predictions.indexOf(<any>(this.stmt())) >= 0) || /* contains */(predictions.indexOf(<any>(this.bind_var())) >= 0)){
                if (output == null)output = this.getProgram(this.earley).eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, this);
                const vars: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "localVars");
                {
                    let array = vars.getTuples();
                    for(let index = 0; index < array.length; index++) {
                        let t = array[index];
                        {
                            const id: ParseNode = vars.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t, "id");
                            const name: string = /* get */src[id.from].content;
                            ret.add(new CompletionItem(name, CompletionItem.Type.COLUMN));
                        }
                    }
                }
            }
            const filter: string = "object_type in (\'TABLE\',\'VIEW\',\'SYNONYM\') and";
            let fromClauses: MaterializedPredicate = null;
            let selectClauseAtCursor: MaterializedPredicate = null;
            let unfinishedSelectClauseAtCursor: MaterializedPredicate = null;
            let selectClauses: MaterializedPredicate = null;
            let qualifiedSelectTerms: MaterializedPredicate = null;
            let aliasInferredFromSelectClause: boolean = false;
            let onlyFromSnippets: boolean = false;
            let resolvedSelectQualifier: boolean = false;
            const completingColumn: boolean = /* contains */(predictions.indexOf(<any>(this.column())) >= 0);
            if (this.dialect !== SqlCompleter.Dialect.MySQL){
                if (output == null){
                    output = this.getProgram(this.earley).eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, this);
                }
                fromClauses = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "fromClauseInCursorQueryBlock");
                selectClauseAtCursor = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "selectClauseAtCursor");
                unfinishedSelectClauseAtCursor = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "unfinishedSelectClauseAtCursor");
                selectClauses = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "cursorInSelectClause");
                qualifiedSelectTerms = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "qualifiedSelectTermAtCursor");
                if (ret.alias == null){
                    let qualifier: ParseNode = null;
                    {
                        let array = selectClauses.getTuples();
                        for(let index = 0; index < array.length; index++) {
                            let tuple = array[index];
                            {
                                const candidate: ParseNode = selectClauses.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(tuple, "qualifier");
                                if (candidate.from <= this.editorOffset && (qualifier == null || qualifier.from < candidate.from)){
                                    qualifier = candidate;
                                }
                            }
                        }
                    }
                    if (qualifier != null){
                        ret.alias = /* get */src[qualifier.from].content;
                        aliasInferredFromSelectClause = true;
                    }
                }
            }
            if (ret.alias != null){
                const isStandaloneSelectClause: boolean = this.dialect !== SqlCompleter.Dialect.MySQL && completingColumn && /* isEmpty */(fromClauses.getTuples().length == 0) && !/* isEmpty */(selectClauses.getTuples().length == 0);
                if (isStandaloneSelectClause){
                    let prefix: string = "";
                    let cursorInsidePrefix: boolean = false;
                    if (ret.prefix != null){
                        prefix = ret.prefix.content;
                        if (pos < ret.prefix.end){
                            prefix = prefix.substring(0, pos - ret.prefix.begin);
                            cursorInsidePrefix = true;
                        }
                    }
                    try {
                        const columns: Array<string> = await this.queryColumns$java_lang_String$java_lang_String$java_lang_String(null, ret.alias, prefix);
                        resolvedSelectQualifier = !/* isEmpty */(columns.length == 0);
                        let prefixMatchesColumn: boolean = false;
                        for(let index = 0; index < columns.length; index++) {
                            let column = columns[index];
                            {
                                if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(column, prefix)){
                                    prefixMatchesColumn = true;
                                    break;
                                }
                            }
                        }
                        const onlyNewQualifiedSnippets: boolean = aliasInferredFromSelectClause && /* isEmpty */(qualifiedSelectTerms.getTuples().length == 0);
                        const selectedColumns: Array<string> = <any>([]);
                        if (onlyNewQualifiedSnippets){
                            {
                                let array = selectClauses.getTuples();
                                for(let index = 0; index < array.length; index++) {
                                    let tuple = array[index];
                                    {
                                        const qualifier: ParseNode = selectClauses.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(tuple, "qualifier");
                                        if (qualifier.from < this.editorOffset && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(ret.alias, /* get */src[qualifier.from].content) && qualifier.from + 2 < /* size */(<number>src.length)){
                                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(selectedColumns, /* toUpperCase *//* get */src[qualifier.from + 2].content.toUpperCase());
                                        }
                                    }
                                }
                            }
                        }
                        onlyFromSnippets = prefix.length === 0 && 0 < this.editorOffset && ("." === /* get */src[this.editorOffset - 1].content);
                        if (!/* isEmpty */(columns.length == 0) && prefix.length !== 0 && !cursorInsidePrefix && prefixMatchesColumn){
                            ret.add(new CompletionItem(" from " + ret.alias, CompletionItem.Type.SNIPPET));
                        }
                        for(let index = 0; index < columns.length; index++) {
                            let column = columns[index];
                            {
                                if (onlyNewQualifiedSnippets){
                                    if (!/* contains */(selectedColumns.indexOf(<any>(/* toUpperCase */column.toUpperCase())) >= 0)){
                                        ret.add(new CompletionItem(ret.alias + "." + /* toLowerCase */column.toLowerCase() + " from " + ret.alias, CompletionItem.Type.SNIPPET));
                                    }
                                } else {
                                    if (!onlyFromSnippets && !cursorInsidePrefix){
                                        ret.add(new CompletionItem(column, CompletionItem.Type.COLUMN));
                                    }
                                    ret.add(new CompletionItem(/* toLowerCase */column.toLowerCase() + " from " + ret.alias, CompletionItem.Type.SNIPPET));
                                }
                            }
                        }
                        if (prefix.length === 0 && !/* isEmpty */(columns.length == 0)){
                            ret.add(new CompletionItem("* from " + ret.alias, CompletionItem.Type.SNIPPET));
                        }
                    } catch(e) {
                    }
                }
            }
            let tablePrefix: string = "";
            if (ret.prefix != null){
                tablePrefix = ret.prefix.content;
                if (pos < ret.prefix.end){
                    tablePrefix = tablePrefix.substring(0, pos - ret.prefix.begin);
                }
            }
            const tablePrefixInSelectClause: boolean = this.dialect !== SqlCompleter.Dialect.MySQL && tablePrefix.length !== 0 && /* isEmpty */(fromClauses.getTuples().length == 0) && (!/* isEmpty */(selectClauseAtCursor.getTuples().length == 0) || !/* isEmpty */(unfinishedSelectClauseAtCursor.getTuples().length == 0));
            if (!tablePrefixInSelectClause && !/* contains */(predictions.indexOf(<any>(this.table_reference())) >= 0) && !/* contains */(predictions.indexOf(<any>(this.dml_table_expression_clause())) >= 0)){
                if (output == null){
                    output = this.getProgram(this.earley).eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, this);
                }
                if (this.dialect !== SqlCompleter.Dialect.MySQL){
                    const connect: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "connect");
                    {
                        let array = connect.getTuples();
                        for(let index = 0; index < array.length; index++) {
                            let t = array[index];
                            {
                                const command: ParseNode = connect.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t, "command");
                                let pref: string = /* get */src[command.from + 1].content;
                                if (SqlCompleter.missingId === pref)pref = "";
                                if (";" === pref)pref = "";
                                {
                                    let array1: string[] = [];
                                    for(let index1 = 0; index1 < array1.length; index1++) {
                                        let sugg = array1[index1];
                                        ret.add(new CompletionItem(sugg, CompletionItem.Type.TURLNET))
                                    }
                                }
                                return ret;
                            }
                        }
                    }
                }
                const predictions2: Array<string> = <any>([]);
                if (/* contains */(predictions.indexOf(<any>("identifier")) >= 0) && 1 < this.editorOffset){
                    const predicted2: Array<number> = this.predict(this.editorOffset - 2, target.getMatrix());
                    for(let index = 0; index < predicted2.length; index++) {
                        let key = predicted2[index];
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(predictions2, this.earley.allSymbols[Service.lX(key)])
                    }
                }
                if (/* contains */(predictions.indexOf(<any>("identifier")) >= 0) && /* contains */(predictions2.indexOf(<any>(this.constrained_type())) >= 0)){
                    let tbl: string = null;
                    if (1 < this.editorOffset && ("." === /* get */src[this.editorOffset - 1].content)){
                        tbl = /* get */src[this.editorOffset - 2].content.toUpperCase();
                        {
                            let array = await this.queryColumns$java_lang_String$java_lang_String$java_lang_String(null, tbl, null);
                            for(let index = 0; index < array.length; index++) {
                                let sugg = array[index];
                                {
                                    ret.add(new CompletionItem(sugg + "%TYPE", CompletionItem.Type.JAVA_CLASS));
                                }
                            }
                        }
                    }
                }
                let isJoin: boolean = false;
                const widestQb: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "\"widest qb\"");
                {
                    let array = widestQb.getTuples();
                    for(let index = 0; index < array.length; index++) {
                        let t = array[index];
                        {
                            const wqb: ParseNode = widestQb.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t, "query_block");
                            let j: number = 0;
                            {
                                let array1 = target.getSrc();
                                for(let index1 = 0; index1 < array1.length; index1++) {
                                    let lt = array1[index1];
                                    {
                                        if (j < wqb.from)continue;
                                        if (wqb.to <= j)break;
                                        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("JOIN", lt.content)){
                                            isJoin = true;
                                            break;
                                        }
                                        j++;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
                const tanqb: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(output, "\"table_alias in widest qb\"");
                {
                    let array = tanqb.getTuples();
                    for(let index = 0; index < array.length; index++) {
                        let t = array[index];
                        {
                            const table: ParseNode = tanqb.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t, "table");
                            let alias: ParseNode = tanqb.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t, "alias");
                            if (table.from + 1 === table.to && alias.from + 1 === alias.to)/* put */(alias2table[/* get */src[alias.from].content.toUpperCase()] = /* get */src[table.from].content.toUpperCase());
                            {
                                const _alias: string = "\'" + /* get */src[alias.from].content.toUpperCase() + "\'";
                                const _src: Array<LexerToken> = /* subList */src.slice(0, alias.from);
                                const _matrix: Matrix = new Matrix(this.earley);
                                this.earley.parse$java_util_List$oracle_dbtools_parser_Matrix(_src, _matrix);
                                const _predicted: Array<number> = this.predict(alias.from, _matrix);
                                const _predictions: Array<string> = <any>([]);
                                for(let index1 = 0; index1 < _predicted.length; index1++) {
                                    let key = _predicted[index1];
                                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(_predictions, this.earley.allSymbols[Service.lX(key)])
                                }
                                if (/* contains */(_predictions.indexOf(<any>(_alias)) >= 0))alias = table;
                            };
                            const begin: number = /* get */src[table.from].begin;
                            const end: number = /* get */src[table.to - 1].end;
                            let owner: string = null;
                            let tab: string = null;
                            if (ret.prefix != null){
                                tab = ret.prefix.content;
                                if (pos < ret.prefix.end)tab = tab.substring(0, pos - ret.prefix.begin);
                            }
                            const tableExpr: string = target.getInput().substring(begin, end);
                            if (0 < tableExpr.indexOf('.')){
                                owner = tableExpr.substring(0, tableExpr.indexOf('.'));
                                tab = tableExpr.substring(tableExpr.indexOf('.') + 1);
                            } else {
                                owner = null;
                                tab = tableExpr;
                            }
                            if (table === alias && table.to < /* size */(<number>src.length) && ("." === /* get */src[table.to].content)){
                                owner = tableExpr;
                                tab = "";
                                ret.prefix = null;
                            }
                            tab = tab.trim();
                            let ok: boolean = true;
                            for(let index1 = 0; index1 < predictions.length; index1++) {
                                let symbol = predictions[index1];
                                {
                                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(symbol, "where_clause") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(symbol, "\"fromClause[7,14)\"")){
                                        ok = false;
                                        break;
                                    }
                                }
                            }
                            if (ok){
                                const tst: ParseNode = target.getRoot().descendant(this.editorOffset, this.editorOffset, this.earley.getSymbol(this.table_reference()));
                                if (tst != null && tst.to <= tst.from + 4){
                                    {
                                        let array1 = await this.queryObjects(owner, tab.toUpperCase(), filter);
                                        for(let index1 = 0; index1 < array1.length; index1++) {
                                            let sugg = array1[index1];
                                            {
                                                ret.add(sugg);
                                            }
                                        }
                                    }
                                }
                            }
                            if (ret.alias != null && !(ret.alias.toUpperCase() === /* get */src[alias.from].content.toUpperCase()))continue;
                            let aliased: string = /* get */src[alias.from].content + '.';
                            if (alias.from + 1 < alias.to && alias === table)aliased = /* get */src[alias.to - 1].content + '.';
                            if (!onlyFromSnippets && (/* contains */(predictions.indexOf(<any>(this.column())) >= 0) || /* contains */(predictions2.indexOf(<any>(this.column())) >= 0))){
                                let prefix: string = null;
                                if (ret.prefix != null){
                                    if (alias === table)prefix = ret.prefix.content;
                                    if (0 < this.editorOffset && ("." === /* get */src[this.editorOffset - 1].content))prefix = ret.prefix.content;
                                }
                                const concatenateAlias: boolean = 1 < tanqb.cardinality() || isJoin;
                                let columns: Array<string>;
                                if (owner == null && this.dialect !== SqlCompleter.Dialect.MySQL){
                                    const currentOwner = await this.currentUser();
                                    columns = currentOwner == null ? /* emptyList */[] : await this.queryColumns$java_lang_String$java_lang_String$java_lang_String$boolean(currentOwner, tab, prefix, false);
                                    if (/* isEmpty */(columns.length == 0)){
                                        columns = await this.queryColumns$java_lang_String$java_lang_String$java_lang_String(null, tab, prefix);
                                    }
                                } else {
                                    columns = await this.queryColumns$java_lang_String$java_lang_String$java_lang_String(owner, tab, prefix);
                                }
                                for(let index1 = 0; index1 < columns.length; index1++) {
                                    let sugg = columns[index1];
                                    {
                                        if (concatenateAlias){
                                            sugg = aliased + sugg;
                                        }
                                        ret.add(new CompletionItem(sugg, CompletionItem.Type.COLUMN));
                                    }
                                }
                                if (!concatenateAlias && !/* isEmpty */(columns.length == 0))ret.add(new CompletionItem(aliased, CompletionItem.Type.COLUMN));
                                if (prefix != null && ret.alias == null){
                                    let array1 = await this.queryObjects(null, prefix.toUpperCase(), "object_type in (\'SEQUENCE\') and");
                                    for(let index1 = 0; index1 < array1.length; index1++) {
                                        let s = array1[index1];
                                        {
                                            ret.add(s);
                                        }
                                    }
                                }
                                const inlineViews = TabCol.getInlineViewNodes(target.getRoot(), target.getSrc());
                                {
                                    let array1 = Array.from(inlineViews.keys()).sort();
                                    for(let index1 = 0; index1 < array1.length; index1++) {
                                        let key = array1[index1];
                                        {
                                            let candidate: ParseNode = inlineViews.get(key);
                                            if (candidate == null)candidate = inlineViews.get("inline subquery");
                                            const inlineViewSelectList = TabCol.getSelectList(candidate);
                                            const inlineViewColumns = TabCol.extractColumns(inlineViewSelectList, target.getSrc(), false, false);
                                            for(let i: number = 0; i < /* size */(<number>inlineViewColumns.length); i++) {{
                                                const column = inlineViewColumns[i];
                                                let colName = column.alias;
                                                if (colName == null) {
                                                    const expression = column.colExpr;
                                                    if (expression == null) break;
                                                    if (expression.to - expression.from === 3 || expression.to - expression.from === 1)
                                                        colName = target.getSrc()[expression.to - 1].content;
                                                    else
                                                        break;
                                                }
                                                ret.add(new CompletionItem(colName, CompletionItem.Type.COLUMN));
                                            };}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (!resolvedSelectQualifier){
                let owner: string = null;
                const currentConnection = this.getConnection();
                if (tablePrefixInSelectClause && currentConnection != null){
                    owner = await this.currentUser();
                }
                const objectPrefix: string = this.publicDynamicViewSynonymName(tablePrefix);
                let tableCandidates: Array<CompletionItem> = await this.queryObjects(owner, objectPrefix, filter);
                if (tablePrefixInSelectClause && /* isEmpty */(tableCandidates.length == 0)){
                    owner = "PUBLIC";
                    tableCandidates = await this.queryObjects(owner, objectPrefix, filter);
                }
                if (!tablePrefixInSelectClause){
                    for(let index = 0; index < tableCandidates.length; index++) {
                        let sugg = tableCandidates[index];
                        {
                            ret.add(sugg);
                        }
                    }
                } else {
                    for(let index: number = 0; index < /* size */(<number>tableCandidates.length); index++) {{
                        /* set */(tableCandidates[index] = this.publicDynamicViewSynonym(/* get */tableCandidates[index]));
                    };}
                    const tableNames: Array<string> = <any>([]);
                    const synonymNames: Array<string> = <any>([]);
                    for(let index = 0; index < tableCandidates.length; index++) {
                        let sugg = tableCandidates[index];
                        {
                            if (sugg.type !== CompletionItem.Type.SYNONYM){
                                /* add */(tableNames.push(sugg.entry)>0);
                            } else {
                                /* add */(synonymNames.push(sugg.entry)>0);
                            }
                        }
                    }
                    const columnsByTable: any = await this.queryColumns$java_lang_String$java_util_Collection(owner, tableNames);
                    const columnsBySynonym: any = await this.querySynonymColumns(owner, synonymNames);
                    if (!/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("PUBLIC", owner)){
                        const unresolvedSynonymNames: Array<string> = <any>([]);
                        for(let index = 0; index < synonymNames.length; index++) {
                            let synonymName = synonymNames[index];
                            {
                                if (!/* containsKey */columnsBySynonym.hasOwnProperty(/* toUpperCase */synonymName.toUpperCase())){
                                    /* add */(unresolvedSynonymNames.push(synonymName)>0);
                                }
                            }
                        }
                        Object.assign(columnsBySynonym, await this.querySynonymColumns("PUBLIC", unresolvedSynonymNames));
                    }
                    for(let index = 0; index < synonymNames.length; index++) {
                        let synonymName = synonymNames[index];
                        {
                            const key = synonymName.toUpperCase();
                            if (!Object.prototype.hasOwnProperty.call(columnsBySynonym, key)) {
                                columnsBySynonym[key] = [];
                            }
                        }
                    }
                    const columnsByCandidate: Array<Array<string>> = <any>([]);
                    for(let index = 0; index < tableCandidates.length; index++) {
                        let sugg = tableCandidates[index];
                        {
                            const tableName: string = /* toUpperCase */sugg.entry.toUpperCase();
                            let columns: Array<string> = /* get */((m,k) => m[k]===undefined?null:m[k])(columnsByTable, tableName);
                            if (columns == null && sugg.type === CompletionItem.Type.SYNONYM){
                                columns = /* get */((m,k) => m[k]===undefined?null:m[k])(columnsBySynonym, tableName);
                            }
                            if (columns == null){
                                columns = /* emptyList */[];
                            }
                            /* add */(columnsByCandidate.push(columns)>0);
                        }
                    }
                    let wildcardCount: number = 0;
                    let columnCount: number = 0;
                    for(let index = 0; index < columnsByCandidate.length; index++) {
                        let columns = columnsByCandidate[index];
                        {
                            if (!/* isEmpty */(columns.length == 0)){
                                wildcardCount++;
                                columnCount += /* size */(<number>columns.length);
                            }
                        }
                    }
                    const wildcardsOnly: boolean = SqlCompleter.maxObjects < /* size */(<number>ret.entries.length) + wildcardCount + columnCount;
                    for(let index: number = 0; index < /* size */(<number>tableCandidates.length) && /* size */(<number>ret.entries.length) < SqlCompleter.maxObjects; index++) {{
                        const sugg: CompletionItem = /* get */tableCandidates[index];
                        if (ret.alias != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(ret.alias, sugg.entry)){
                            continue;
                        }
                        const columns: Array<string> = /* get */columnsByCandidate[index];
                        if (!/* isEmpty */(columns.length == 0)){
                            ret.add(new CompletionItem(/* toLowerCase */sugg.entry.toLowerCase() + ".* from " + /* toLowerCase */sugg.entry.toLowerCase(), CompletionItem.Type.SNIPPET));
                        }
                    };}
                    if (!wildcardsOnly){
                        for(let index: number = 0; index < /* size */(<number>tableCandidates.length) && /* size */(<number>ret.entries.length) < SqlCompleter.maxObjects; index++) {{
                            const sugg: CompletionItem = /* get */tableCandidates[index];
                            if (ret.alias != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(ret.alias, sugg.entry)){
                                continue;
                            }
                            const columns: Array<string> = /* get */columnsByCandidate[index];
                            for(let index = 0; index < columns.length; index++) {
                                let column = columns[index];
                                {
                                    if (/* size */(<number>ret.entries.length) === SqlCompleter.maxObjects){
                                        break;
                                    }
                                    ret.add(new CompletionItem(/* toLowerCase */sugg.entry.toLowerCase() + "." + /* toLowerCase */column.toLowerCase() + " from " + /* toLowerCase */sugg.entry.toLowerCase(), CompletionItem.Type.SNIPPET));
                                }
                            }
                        };}
                    }
                }
            }
            let isPackaged: boolean = resolvedSelectQualifier;
            if (!resolvedSelectQualifier && (/* contains */(predictions.indexOf(<any>("function_call")) >= 0) || /* contains */(predictions.indexOf(<any>("decl_id")) >= 0)) && (2 <= this.editorOffset || ret.alias != null)){
                const dot: string = /* get */src[this.editorOffset - 1].content;
                if (("." === dot) || ret.alias != null){
                    isPackaged = true;
                    const pkg: string = ret.alias != null ? ret.alias : /* get */src[this.editorOffset - 2].content;
                    if (!/* containsKey */alias2table.hasOwnProperty(pkg.toUpperCase())){
                        let prefix: string = "";
                        if (ret.prefix != null){
                            prefix = ret.prefix.content;
                            if (pos < ret.prefix.end)prefix = prefix.substring(0, pos - ret.prefix.begin);
                        }
                        {
                            let array = await this.queryPackageProcedures(null, pkg, prefix, /* contains */(predictions.indexOf(<any>("condition")) >= 0));
                            for(let index = 0; index < array.length; index++) {
                                let sugg = array[index];
                                {
                                    ret.add(sugg);
                                }
                            }
                        }
                        const tst: ParseNode = target.getRoot().locate$int$int(this.editorOffset, this.editorOffset + 1);
                        if (tst != null && tst.parent$() != null && !tst.parent$().contains$java_lang_String(this.table_reference()) && !tst.parent$().contains$java_lang_String("query_table_expression")){
                            let array = await this.queryPackageProcedures(pkg, null, prefix, /* contains */(predictions.indexOf(<any>("condition")) >= 0));
                            for(let index = 0; index < array.length; index++) {
                                let sugg = array[index];
                                {
                                    ret.add(sugg);
                                }
                            }
                        }
                    }
                }
            }
            if (!tablePrefixInSelectClause && !isPackaged && /* contains */(predictions.indexOf(<any>("function_call")) >= 0)){
                const tst: ParseNode = target.getRoot().locate$int$int(this.editorOffset, this.editorOffset + 1);
                if (tst != null && !tst.contains$java_lang_String(this.table_reference())){
                    let prefix: string = "";
                    if (ret.prefix != null)prefix = ret.prefix.content;
                    {
                        let array = await this.queryPackageProcedures(null, null, prefix, /* contains */(predictions.indexOf(<any>("condition")) >= 0));
                        for(let index = 0; index < array.length; index++) {
                            let sugg = array[index];
                            {
                                ret.add(sugg);
                            }
                        }
                    }
                    if (0 < prefix.length){
                        let array = await this.queryObjects(null, prefix.toUpperCase(), "object_type in (\'PACKAGE\',\'TYPE\') and");
                        for(let index = 0; index < array.length; index++) {
                            let sugg = array[index];
                            {
                                ret.add(sugg);
                            }
                        }
                    }
                }
            }
            if (/* contains */(predictions.indexOf(<any>(this.condition())) >= 0)){
                {
                    let array = this.joinConditions(ret.entries, alias2table);
                    for(let index = 0; index < array.length; index++) {
                        let item = array[index];
                        ret.add(item)
                    }
                }
            }
            if (this.lastFunctionCallName != null && /* contains */(predictions.indexOf(<any>("arg")) >= 0)){
                let pkg: string = null;
                let fun: string = null;
                if (0 < this.lastFunctionCallName.indexOf('.')){
                    pkg = this.lastFunctionCallName.substring(0, this.lastFunctionCallName.indexOf('.'));
                    fun = this.lastFunctionCallName.substring(this.lastFunctionCallName.indexOf('.') + 1);
                } else {
                    pkg = null;
                    fun = this.lastFunctionCallName;
                }
                let prefix: string = "";
                if (ret.prefix != null)prefix = ret.prefix.content;
                {
                    let array = this.inlineArguments(await this.queryArguments(pkg, fun, prefix));
                    for(let index = 0; index < array.length; index++) {
                        let sugg = array[index];
                        {
                            ret.add(new CompletionItem(sugg, CompletionItem.Type.ARGUMENT));
                        }
                    }
                }
            }
            if (ret.alias != null && !completingColumn && /* contains */(predictions.indexOf(<any>("\'FROM\'")) >= 0)){
                ret.add(new CompletionItem("FROM", CompletionItem.Type.KEYWORD));
            } else if (ret.alias == null || !completingColumn){
                const topKWsuggestions: Array<string> = this.topKWsuggestions(predicted, ret.prefix);
                if (/* size */(<number>topKWsuggestions.length) <= 15 && ret.size() === 0 || ret.prefix != null){
                    for(let index = 0; index < topKWsuggestions.length; index++) {
                        let sugg = topKWsuggestions[index];
                        {
                            ret.add(new CompletionItem(sugg, CompletionItem.Type.KEYWORD));
                        }
                    }
                }
            }
            if (ret.size() === 1 && 0 < ret.first().toString().indexOf(' '))return ret;
            let p: number = pos;
            if (ret.prefix != null)p = pos - ret.prefix.content.length;
            ret.pos = p;
            return ret;
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Throwable") >= 0) || __e != null && __e instanceof <any>Error) {
                const t: Error = <Error>__e;
                console.error(t.message, t);
                return ret;

            }
        } finally {
        }
    }

    topLevelSelectCompletion(input: string, pos: number): CompletionList {
        if (pos !== input.length){
            return null;
        }
        let start: number = 0;
        while((start < pos && isJavaWhitespace(input.charAt(start)))) {{
            start++;
        }};
        const prefixLength: number = pos - start;
        if (prefixLength < 3 || prefixLength >= SqlCompleter.SELECT_KEYWORD.length || SqlCompleter.SELECT_KEYWORD.slice(0, prefixLength).toUpperCase() !== input.slice(start, pos).toUpperCase()){
            return null;
        }
        const ret: CompletionList = new CompletionList();
        ret.prefix = new LexerToken(input.substring(start, pos), start, pos, Token.IDENTIFIER);
        ret.add(new CompletionItem(SqlCompleter.SELECT_KEYWORD, CompletionItem.Type.KEYWORD));
        ret.pos = start;
        return ret;
    }

    public addSuggestionItem(ret: CompletionList, sugg: RecognizedRule) {
        const symbol: string = sugg.rhs[sugg.pos];
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(0)) == '\''.charCodeAt(0))ret.add(new CompletionItem(symbol.substring(1, symbol.length - 1), CompletionItem.Type.KEYWORD));
    }

    public static reportedNoJSEngineAvailable: boolean = false;

    getProgram(earley: Earley): SqlCompleter.IProgram {
        if (this.programInstance == null){
            let file: string = "completion.prg";
            if (this.dialect === SqlCompleter.Dialect.MySQL)file = "completion_mysql.prg";
            this.programInstance = new SqlCompleter.IProgram(earley, readFileSync(resolve(process.cwd(), 'src/main/resources/oracle/dbtools/app', file), 'utf8'));
        }
        this.programInstance.offset = this.editorOffset;
        const globals: GlobalMap = this.programInstance.getGlobals();
        if (globals != null)globals.put("editorOffset", this.editorOffset);
        return this.programInstance;
    }

    public static discolor(cleaned: string): string {
        cleaned = /* replace */cleaned.split(SqlCompleter.color0).join("");
        cleaned = /* replace */cleaned.split(SqlCompleter.color1).join("");
        cleaned = /* replace */cleaned.split(SqlCompleter.color32).join("");
        return cleaned;
    }

    public static maxUsers: number = 20;

    public static maxObjects: number = 50;

    /**
     * 
     * @param {string} Owner
     * @param {string} prefix
     * @param {string} typesClause   postfixed(!)  e.g. "object_type in ('TABLE','VIEW','SYNONYM') and"
     * @return
     * @return {CompletionItem[]}
     */
    public async queryObjects(Owner: string, prefix: string, typesClause: string): Promise<Array<CompletionItem>> {
        if (!this.getConnection()) return [];
        if (SqlCompleter.missingId === prefix)prefix = "";
        if (prefix == null)prefix = "";
        let query = Owner == null ? this.objectsDictSql(typesClause) : this.objectsByOwnerDictSql(typesClause);
        let owner: string = Owner;
        const binds: Array<string> = [];
        if (owner != null){
            owner = Owner.toUpperCase();
            binds.push(owner);
        }
        if (owner == null && this.minPrefLen <= prefix.length) {
            query = query.split("owner=user").join("owner in ('PUBLIC','SYS',user)");
        }
        let leadingWildCard: string = this.prefixWildcard;
        if (prefix.length < this.minPrefLen || prefix.slice(0, 2).toUpperCase() === "V$" || prefix.slice(0, 3).toUpperCase() === "GV$")leadingWildCard = "";
        const like = leadingWildCard + prefix.toUpperCase().split("_").join("\\_") + '%';
        if (owner != null) binds.push(like);
        else binds.push(like, like);
        const rows = await this.executeRows(query, binds);
        const users: Array<CompletionItem> = [];
        const ret: Array<CompletionItem> = [];
        for (const [candidateValue, typeValue] of rows) {
            const candidate = String(candidateValue);
            const type = String(typeValue);
            if (candidate.endsWith(".")) users.push(new CompletionItem(candidate, CompletionItem.Type.USER));
            else if (type.toUpperCase() === "TABLE" || type.toUpperCase() === "BASE TABLE") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.TABLE);
            else if (type.toUpperCase() === "VIEW") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.VIEW);
            else if (type.toUpperCase() === "SYNONYM") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.SYNONYM);
            else if (type.toUpperCase() === "PROCEDURE") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.PROCEDURE);
            else if (type.toUpperCase() === "FUNCTION") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.FUNCTION);
            else if (type.toUpperCase() === "PACKAGE") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.PACKAGE);
            else if (type.toUpperCase() === "PACKAGE BODY") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.PACKAGE_BODY);
            else if (type.toUpperCase() === "SEQUENCE") this.addUnique(candidate + ".nextval", ret, CompletionItem.Type.SEQUENCE);
            else if (type.toUpperCase() === "INDEX") this.addUniqueFromDictionaryRow(candidate, ret, CompletionItem.Type.INDEX);
            else ret.push(new CompletionItem(candidate, CompletionItem.Type.OTHER_DB_OBJECT));
        }
        if (users.length < SqlCompleter.maxUsers) ret.push(...users);
        return ret;
    }

    publicDynamicViewSynonym(candidate: CompletionItem): CompletionItem {
        const candidateName: string = candidate.entry;
        const synonymName: string = this.publicDynamicViewSynonymName(candidateName);
        if (synonymName === candidateName){
            return candidate;
        }
        return new CompletionItem(synonymName, CompletionItem.Type.SYNONYM);
    }

    publicDynamicViewSynonymName(candidateName: string): string {
        const upperCaseName: string = /* toUpperCase */candidateName.toUpperCase();
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(upperCaseName, "V_$")){
            return "V$" + candidateName.substring(3);
        } else if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(upperCaseName, "GV_$")){
            return "GV$" + candidateName.substring(4);
        }
        return candidateName;
    }

    public objectsByOwnerDictSql(typesClause: string): string {
        return "select object_name, object_type from all_objects \nwhere " + typesClause + " owner = :1 and object_name like :2 ESCAPE \'\\\' \nand rownum < " + SqlCompleter.maxObjects + " order by object_name";
    }

    static MySQL: string = "MySQL";

    static H2: string = "H2";

    public objectsDictSql(typesClause: string): string {
        return "select object_name, object_type from (\nselect /*distinct*/ object_name, object_type from all_objects \nwhere " + typesClause + " owner=user \nand object_name like :1 ESCAPE \'\\\' \nunion all \nselect username||\'.\', \'USER\' from all_users where username like :2 and rownum <= " + SqlCompleter.maxUsers + " \norder by object_name\n) where rownum < 50";
    }

    queryColumns$java_lang_String$java_lang_String$java_lang_String(Owner: string, Table: string, prefix: string): Promise<Array<string>> {
        return this.queryColumns$java_lang_String$java_lang_String$java_lang_String$boolean(Owner, Table, prefix, true);
    }

    public async queryColumns$java_lang_String$java_lang_String$java_lang_String$boolean(Owner: string, Table: string, prefix: string, resolveSynonym: boolean): Promise<Array<string>> {
        if (!this.getConnection())return [];
        let owner: string = Owner;
        if (owner != null){
            owner = Owner.toUpperCase();
        }
        let table: string = Table;
        if (table != null){
            table = Table.toUpperCase();
            if (resolveSynonym){
                const synTab: string = await this.getTable(owner, table);
                if (synTab != null){
                    table = synTab;
                    const pos: number = synTab.indexOf('.');
                    if (0 < pos){
                        owner = synTab.substring(0, pos);
                        table = synTab.substring(pos + 1);
                    }
                }
            }
        }
        if (SqlCompleter.missingId === prefix)prefix = "";
        if (prefix == null)prefix = "";
        let query: string = this.columnsDictSql();
        if (owner != null)query = this.columnsByOwnerDictSql();
        const like = (this.minPrefLen <= prefix.length ? this.prefixWildcard : "") + prefix.toUpperCase() + '%';
        const binds = owner == null ? [table, like] : [owner, table, like];
        return (await this.executeRows(query, binds)).map((row) => String(row[0]));
    }

    public async queryColumns(Owner?: any, Table?: any, prefix?: any, resolveSynonym?: any): Promise<any> {
        if (((typeof Owner === 'string') || Owner === null) && ((typeof Table === 'string') || Table === null) && ((typeof prefix === 'string') || prefix === null) && ((typeof resolveSynonym === 'boolean') || resolveSynonym === null)) {
            return await this.queryColumns$java_lang_String$java_lang_String$java_lang_String$boolean(Owner, Table, prefix, resolveSynonym);
        } else if (((typeof Owner === 'string') || Owner === null) && ((typeof Table === 'string') || Table === null) && ((typeof prefix === 'string') || prefix === null) && resolveSynonym === undefined) {
            return await this.queryColumns$java_lang_String$java_lang_String$java_lang_String(Owner, Table, prefix);
        } else if (((typeof Owner === 'string') || Owner === null) && ((Table != null && (Table instanceof Array)) || Table === null) && prefix === undefined && resolveSynonym === undefined) {
            return await this.queryColumns$java_lang_String$java_util_Collection(Owner, Table);
        } else throw new Error('invalid overload');
    }

    async queryColumns$java_lang_String$java_util_Collection(owner: string, tableNames: Array<string>): Promise<Record<string, string[]>> {
        if (owner == null || /* isEmpty */(tableNames.length == 0)){
            return /* emptyMap */{};
        }
        if (!this.getConnection()){
            return /* emptyMap */{};
        }
        const names = tableNames.map((name) => name.toUpperCase());
        const placeholders = names.map((_, index) => `:${index + 2}`).join(",");
        const query = `select table_name, column_name from all_tab_columns where owner = :1 and table_name in (${placeholders}) order by table_name, column_id`;
        const rows = await this.executeRows(query, [owner.toUpperCase(), ...names]);
        const columnsByTable: Record<string, string[]> = {};
        for (const [tableValue, columnValue] of rows) {
            const tableName = String(tableValue);
            (columnsByTable[tableName] ??= []).push(String(columnValue));
        }
        return columnsByTable;
    }

    /**
     * Retrieves columns for direct synonyms with one dictionary query.
     * @param {string} owner
     * @param {string[]} synonymNames
     * @return {*}
     */
    async querySynonymColumns(owner: string, synonymNames: Array<string>): Promise<Record<string, string[]>> {
        if (owner == null || /* isEmpty */(synonymNames.length == 0)){
            return /* emptyMap */{};
        }
        if (!this.getConnection()){
            return /* emptyMap */{};
        }
        const names = synonymNames.map((name) => name.toUpperCase());
        const placeholders = names.map((_, index) => `:${index + 2}`).join(",");
        const query = `select s.synonym_name, c.column_name from all_synonyms s join all_tab_columns c on c.owner = s.table_owner and c.table_name = s.table_name where s.owner = :1 and s.synonym_name in (${placeholders}) order by s.synonym_name, c.column_id`;
        const rows = await this.executeRows(query, [owner.toUpperCase(), ...names]);
        const columnsBySynonym: Record<string, string[]> = {};
        for (const [synonymValue, columnValue] of rows) {
            const synonymName = String(synonymValue);
            (columnsBySynonym[synonymName] ??= []).push(String(columnValue));
        }
        return columnsBySynonym;
    }

    public columnsByOwnerDictSql(): string {
        return "select column_name from (\nselect column_name, column_id from all_tab_columns where owner = :1 and table_name = :2 \nand column_name like :3 order by column_id\n) where rownum < 50\n";
    }

    public columnsDictSql(): string {
        return "select column_name from (\nselect column_name, column_id from all_tab_columns where table_name = :1 and owner in (\'PUBLIC\',\'SYS\',user) \nand column_name like :2 order by column_id\n) where rownum < 50\n";
    }

    /*private*/ minPrefLen: number;

    async queryPackageProcedures(owner: string, pkg: string, prefix: string, functionsOnly: boolean): Promise<Array<CompletionItem>> {
        if (!this.getConnection())return [];
        if (SqlCompleter.missingId === prefix)prefix = "";
        if (prefix == null)prefix = "";
        if (pkg != null){
            const synTab: string = await this.getTable(owner, pkg.toUpperCase());
            if (synTab != null){
                pkg = synTab;
                const pos1: number = synTab.indexOf('.');
                if (0 < pos1){
                    owner = synTab.substring(0, pos1);
                    pkg = synTab.substring(pos1 + 1);
                }
            }
        }
        const binds: string[] = [];
        const ownerClause = owner != null ? `owner = :${binds.push(owner.toUpperCase())}` :
            (pkg == null && prefix.length < this.minPrefLen ? "owner = user" : "owner in ('PUBLIC','SYS',USER)");
        let query: string;
        if (pkg != null) {
            const pkgBind = binds.length + 1;
            binds.push(pkg.toUpperCase());
            const prefixBind = binds.length + 1;
            binds.push("");
            query = `select procedure_name from sys.all_procedures where ${ownerClause} and object_name = :${pkgBind} and procedure_name like :${prefixBind} ESCAPE '\\' and object_type = 'PACKAGE' and rownum < 50 order by procedure_name`;
        } else {
            const prefixBind = binds.length + 1;
            binds.push("");
            query = `select object_name from sys.all_procedures where ${ownerClause} and object_name like :${prefixBind} ESCAPE '\\' and object_type in (${!functionsOnly ? "'PROCEDURE'," : ""}'FUNCTION') and rownum < 50 order by object_name`;
        }
        const sqlLikePrefix: string = /* replace */prefix.toUpperCase().split("_").join("\\_");
        binds[binds.length - 1] = (this.minPrefLen <= prefix.length ? this.prefixWildcard : "") + sqlLikePrefix + '%';
        const rows = await this.executeRows(query, binds);
        const ret: Array<CompletionItem> = [];
        for (const row of rows) this.addUniqueFromDictionaryRow(String(row[0]), ret, CompletionItem.Type.PROCEDURE);
        return ret;
    }

    async queryArguments(pkg: string, __function: string, prefix: string): Promise<Array<string>> {
        if (!this.getConnection())return [];
        if (SqlCompleter.missingId === prefix)prefix = "";
        if (prefix == null)prefix = "";
        let query: string = "SELECT  a.owner||\'.\'||a.package_name||\'.\'||a.object_name||\'.\'||a.overload object_name, \n a.argument_name||\'=>\'||substr(a.argument_name,1,1)||\'/*\'||a.data_type||\' \'||a.defaulted||\'*/\' argument, a.position position \nFROM all_arguments a \nWHERE rownum <=50 and    argument_name is not null \n";
        if (pkg != null)query += "and package_name = :1 and object_name = :2  and argument_name like :3 \norder by position \n"; else query += "and  object_name = :1 and owner in (\'PUBLIC\',\'SYS\',user) \n and argument_name like :2 order by position";
        const binds: string[] = [];
        if (pkg != null) binds.push(pkg.toUpperCase());
        binds.push(__function.toUpperCase(), (this.minPrefLen <= prefix.length ? this.prefixWildcard : "") + prefix.toUpperCase() + '%');
        const rows = await this.executeRows(query, binds);
        return [...new Set(rows.map((row) => String(row[1])))];
    }

    inlineArguments(__arguments: Array<string>): Array<string> {
        const ret: Array<string> = <any>([]);
        const fullArgs: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        const shortArgs: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let index = 0; index < __arguments.length; index++) {
            let arg = __arguments[index];
            {
                const isDefault: boolean = 0 < arg.indexOf(" Y*/");
                arg = /* replace */arg.split(" Y*/").join("*/");
                arg = /* replace */arg.split(" N*/").join("*/");
                if (/* length */fullArgs.str.length > 0)/* append */(sb => { sb.str += <any>","; return sb; })(fullArgs);
                /* append */(sb => { sb.str += <any>arg; return sb; })(fullArgs);
                if (!isDefault){
                    if (/* length */shortArgs.str.length > 0)/* append */(sb => { sb.str += <any>","; return sb; })(shortArgs);
                    /* append */(sb => { sb.str += <any>arg; return sb; })(shortArgs);
                }
            }
        }
        if (/* length */fullArgs.str.length !== /* length */shortArgs.str.length){
            /* add */(ret.push("/*min sig:*/" + /* toString */shortArgs.str)>0);
            /* add */(ret.push("/*full sig:*/" + /* toString */fullArgs.str)>0);
        } else /* add */(ret.push(/* toString */fullArgs.str)>0);
        return ret;
    }

    /** Mirrors Java's addUnique(String, ...): this overload keeps its name verbatim. */
    public addUnique(name: string, ret: Array<CompletionItem>, type: CompletionItem.Type) {
        const item = new CompletionItem(name, type);
        if (!ret.some((existing) => existing.equals(item))) ret.push(item);
    }

    /** Mirrors Java's ResultSet overload, which quotes dictionary identifiers before delegating. */
    private addUniqueFromDictionaryRow(name: string, ret: Array<CompletionItem>, type: CompletionItem.Type) {
        const candidate = name.endsWith(".") ? name : Service.addDoubleQuote(name);
        this.addUnique(candidate, ret, type);
    }

    /**
     * generate equijoin condition, e.g. "select * from all_indexes i, all_objects o where"
     * (generated) "i.index_name = o.object_name and i.owner = o.owner"
     * @param {CompletionItem[]} items
     * @param oracle
     * @return
     * @param {*} alias2table
     * @return {CompletionItem[]}
     * @private
     */
    joinConditions(items: Array<CompletionItem>, alias2table: any): Array<CompletionItem> {
        const ret: Array<CompletionItem> = <any>([]);
        let cnt: number = 0;
        ret: for(let index = 0; index < items.length; index++) {
            let first = items[index];
            {
                const firstName: string = first.entry;
                const fi: number = firstName.indexOf('.');
                if (fi > 0 && /* Enum.equals */(<any>(CompletionItem.Type.COLUMN) === <any>(first.type))){
                    for(let index1 = 0; index1 < items.length; index1++) {
                        let second = items[index1];
                        {
                            const secondName: string = second.entry;
                            const si: number = secondName.indexOf('.');
                            if (si <= 0 || /* compareTo */firstName.localeCompare(secondName) <= 0)continue;
                            if (/* Enum.equals */(<any>(CompletionItem.Type.COLUMN) === <any>(first.type)) && this.colNamesMatch(firstName, secondName, alias2table)){
                                /* add */(ret.push(new CompletionItem(firstName + " = " + secondName, CompletionItem.Type.CONDITION))>0);
                                if (++cnt > 50)break ret;
                            }
                        }
                    }
                }
            }
        }
        return ret;
    }

    colNamesMatch(firstCol: string, secondCol: string, alias2table: any): boolean {
        const fi: number = firstCol.indexOf('.');
        if (fi < 0)return false;
        const si: number = secondCol.indexOf('.');
        if (si < 0)return false;
        const firstNAME: string = firstCol.substring(fi + 1).toUpperCase();
        const secondNAME: string = secondCol.substring(si + 1).toUpperCase();
        if (firstNAME == null)return false;
        if (firstNAME === secondNAME)return true;
        const tmp1: string = /* get */((m,k) => m[k]===undefined?null:m[k])(alias2table, firstCol.substring(0, fi).toUpperCase());
        if (tmp1 == null)return false;
        const firstTABLE: string = tmp1.toUpperCase();
        const tmp2: string = /* get */((m,k) => m[k]===undefined?null:m[k])(alias2table, secondCol.substring(0, si).toUpperCase());
        if (tmp2 == null)return false;
        const secondTABLE: string = tmp2.toUpperCase();
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(firstNAME, firstTABLE) && (secondNAME === (firstNAME + "_ID")) || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(firstNAME, firstTABLE) && (secondNAME === (firstNAME + "_NAME")) || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(secondNAME, secondTABLE) && (firstNAME === (secondNAME + "_ID")) || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(secondNAME, secondTABLE) && (firstNAME === (secondNAME + "_NAME")) || this.tabColNamesMatch(firstNAME, firstTABLE) && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(firstNAME, "_ID") && this.tabColNamesMatch(secondNAME, secondTABLE) && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(secondNAME, "_ID") || this.tabColNamesMatch(firstNAME, firstTABLE) && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(firstNAME, "_NAME") && this.tabColNamesMatch(secondNAME, secondTABLE) && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(secondNAME, "_NAME"))return true;
        return false;
    }

    tabColNamesMatch(column: string, table: string): boolean {
        if (table.length < 5 || column.length < 5)return false;
        for(let i: number = 0; i < table.length - 5; i++) {{
            const tab: string = table.substring(i, i + 5);
            if (/* contains */(column.indexOf(tab) != -1))return true;
        };}
        return false;
    }

    /*private*/ NOTASYNONYM: string;

    /*private*/ synonymCache: any;

    async getTable(owner: string, synonym: string): Promise<string | null> {
        if (/* containsKey */this.synonymCache.hasOwnProperty(this.fullName(synonym, owner))){
            const ret: string = /* get */((m,k) => m[k]===undefined?null:m[k])(this.synonymCache, this.fullName(synonym, owner));
            if (this.NOTASYNONYM === ret)return null;
            return ret;
        }
        const ownerClause = owner == null ? "owner in (user,'PUBLIC')" : "owner = :2";
        try {
            const binds = owner == null ? [synonym] : [synonym, owner.toUpperCase()];
            const rows = await this.executeRows(`select table_owner, table_name from all_synonyms where ${ownerClause} and synonym_name = :1`, binds);
            if (rows.length > 0) {
                const ret = `${rows[0][0]}.${rows[0][1]}`;
                this.synonymCache[this.fullName(synonym, owner)] = ret;
                return ret;
            }
            /* put */(this.synonymCache[this.fullName(synonym, owner)] = this.NOTASYNONYM);
            return null;
        } catch(e) {
            return null;
        }
    }

    fullName(synonym: string, owner: string): string {
        if (owner == null)return synonym;
        return owner + "." + synonym;
    }

    public lastFunction(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "name");
        const name: string = target.getInput().substring(/* get */target.getSrc()[node.from].begin, /* get */target.getSrc()[node.to - 1].end);
        this.lastFunctionCallName = name;
    }
}
SqlCompleter["__class"] = "oracle.dbtools.app.SqlCompleter";


export namespace SqlCompleter {

    export enum Dialect {
        ORACLE, MySQL, H2
    }

    export class IProgram extends Program {
        constructor(earley: Earley, programText: string) {
            super(earley, null);
            this.offset = -1;
            try {
                this.compile$java_lang_String$java_lang_Object(programText, this.struct);
            } catch(e) {
                throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
        }

        public offset: number;
    }
    IProgram["__class"] = "oracle.dbtools.app.SqlCompleter.IProgram";


    export class SqlCompleter$1 {
        public __parent: any;
        public compare(a: { getValue(): any }, b: { getValue(): any }): number {
            return /* compareTo */(<any>((o1: any, o2: any) => { if (o1 && o1.compareTo) { return o1.compareTo(o2); } else { return o1 < o2 ? -1 : o2 < o1 ? 1 : 0; } })((<number>b.getValue()),<number>a.getValue()));
        }

        constructor(__parent: any) {
            this.__parent = __parent;
        }
    }

}




import { CompletionItem } from './CompletionItem';


import { CompletionList } from './CompletionList';

