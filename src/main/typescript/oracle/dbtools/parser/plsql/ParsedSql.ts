/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell.js';
import { Earley } from '../Earley.js';
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { Matrix } from '../Matrix.js';
import { ParseNode } from '../ParseNode.js';
import { Parsed } from '../Parsed.js';
import { ParsingCancelled } from '../ParsingCancelled.js';
import { Visual } from '../Visual.js';
import { Service } from '../../../arbori/util/Service.js';
import { SqlEarley } from './SqlEarley.js';

/**
 * Aggregates together SQL lexical analysis, language recognition, and building parse tree
 * 
 * Usage:
 * ParsedSql parsed = new ParsedSql(input);
 * List<LexerToken> src = parsed.getSrc();
 * ParseNode root = parsed.getRoot();
 * 
 * Canceling long parsing (for a really long long input:
 * parsed.stop();
 * 
 * @author VTROPASH
 * @param {string} input
 * @param {boolean} partialRecognizer
 * @class
 * @extends Parsed
 */
export class ParsedSql extends Parsed {
    public constructor(input?: any, partialRecognizer?: any) {
        if (((typeof input === 'string') || input === null) && ((typeof partialRecognizer === 'boolean') || partialRecognizer === null)) {
            let __args = arguments;
            super(input, partialRecognizer ? SqlEarley.partialRecognizer() : SqlEarley.getInstance(), "sql_statements");
            this.lexer = new Lexer();
        } else if (((typeof input === 'string') || input === null) && partialRecognizer === undefined) {
            let __args = arguments;
            {
                let __args = arguments;
                let partialRecognizer: any = false;
                super(input, partialRecognizer ? SqlEarley.partialRecognizer() : SqlEarley.getInstance(), "sql_statements");
                this.lexer = new Lexer();
            }
        } else throw new Error('invalid overload');
    }

    /**
     * 
     * @return {LexerToken[]}
     */
    public getSrc(): Array<LexerToken> {
        if (this.src != null)return this.src;
        this.src = this.lexer.doParse$java_lang_String$boolean$int(this.input, false, Lexer.SQL_$LI$());
        return this.src;
    }

    /**
     * Parsed.getRoot() amended with parsing aborted upon interruption
     * @return
     * @throws InterruptedException
     * @return {ParseNode}
     */
    public parse(): ParseNode {
        if (this.earley == null)throw Object.defineProperty(new Error("earley == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        if (this.root == null){
            this.getSrc();
            let visual: Visual = null;
            if (this.debug)visual = new Visual(this.src, this.earley);
            this.matrix = new Matrix(this.earley);
            try {
                (<SqlEarley>this.earley).doParse(this.src, this.matrix);
            } catch(e) {
                this.src = null;
                throw Object.defineProperty(new Error("getSrc(): parse cancelled"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
            if (this.debug)visual.draw$oracle_dbtools_parser_Matrix(this.matrix);
            this.root = this.earley.forest$java_util_List$oracle_dbtools_parser_Matrix(this.src, this.matrix);
        }
        return this.root;
    }

    /**
     * 
     * @return {ParseNode}
     */
    public getRoot(): ParseNode {
        return this.parse();
    }

    /**
     * Check the descendants of the root node if they contain a symbol
     * Or if a node is a string literal as in
     * execute immediate 'drop materialized view x';
     * then parse the string literal and check if any
     * of its descendant nodes contains the symbol
     * @param {string} symbol
     * @return {boolean}
     */
    public contains(symbol: string): boolean {
        {
            let array = this.getRoot().descendants();
            for(let index = 0; index < array.length; index++) {
                let desc = array[index];
                {
                    if (desc.contains$java_lang_String(symbol))return true;
                    if (desc.contains$java_lang_String("string_literal") && desc.parent$() != null && desc.parent$().contains$java_lang_String("exec_immediate_statement")){
                        const ddl: string = this.getInput().substring(/* get */this.getSrc()[desc.from].begin + 1, /* get */this.getSrc()[desc.to - 1].end - 1);
                        const parsed: ParsedSql = new ParsedSql(ddl);
                        const ret: boolean = parsed.contains(symbol);
                        if (ret)return ret;
                    }
                }
            }
        }
        return false;
    }

    public static partialRecognize(input: string): ParsedSql.Language {
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        if (/* size */(<number>src.length) === 0){
            throw Object.defineProperty(new Error("empty input: `" + input + "`"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        const earley: SqlEarley = ParsedSql.partialRecognizer_$LI$();
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const symbol: number = ParsedSql.leftBottomSymbol(matrix);
        return ParsedSql.crawlRulesDependency(symbol);
    }

    static partialRecognizer: SqlEarley; public static partialRecognizer_$LI$(): SqlEarley { if (ParsedSql.partialRecognizer == null) { ParsedSql.partialRecognizer = SqlEarley.getInstance(); }  return ParsedSql.partialRecognizer; }

    static leftBottomSymbol(matrix: Matrix): number {
        OUTER: for(let i: number = matrix.lastY(); 0 < i; i--) {{
            const cell: Cell = matrix.get(0, i);
            if (cell != null){
                let bestRule: number = 0;
                let advanced: number = 0;
                for(let j: number = 0; j < cell.size(); j++) {{
                    const rule: number = cell.getRule(j);
                    const pos: number = cell.getPosition(j);
                    const tuple: Earley.Tuple = ParsedSql.partialRecognizer_$LI$().rules[rule];
                    if (advanced < pos || pos === tuple.rhs.length){
                        bestRule = rule;
                        advanced = pos;
                    }
                    if (pos === tuple.rhs.length){
                        if (tuple.head === ParsedSql.partialRecognizer_$LI$().sql_statements || tuple.head === ParsedSql.sql_statement_$LI$() || tuple.head === ParsedSql.library_unit_$LI$())continue OUTER;
                        return tuple.head;
                    }
                };}
                const tuple: Earley.Tuple = ParsedSql.partialRecognizer_$LI$().rules[bestRule];
                return tuple.head;
            }
        };}
        throw Object.defineProperty(new Error("all empty cells?"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    static library_unit: number; public static library_unit_$LI$(): number { if (ParsedSql.library_unit == null) { ParsedSql.library_unit = ParsedSql.partialRecognizer_$LI$().getSymbol("library_unit"); }  return ParsedSql.library_unit; }

    static create_plsql: number; public static create_plsql_$LI$(): number { if (ParsedSql.create_plsql == null) { ParsedSql.create_plsql = ParsedSql.partialRecognizer_$LI$().getSymbol("create_plsql"); }  return ParsedSql.create_plsql; }

    static call_statement: number; public static call_statement_$LI$(): number { if (ParsedSql.call_statement == null) { ParsedSql.call_statement = ParsedSql.partialRecognizer_$LI$().getSymbol("call_statement"); }  return ParsedSql.call_statement; }

    static sqlplus_command: number; public static sqlplus_command_$LI$(): number { if (ParsedSql.sqlplus_command == null) { ParsedSql.sqlplus_command = ParsedSql.partialRecognizer_$LI$().getSymbol("sqlplus_command"); }  return ParsedSql.sqlplus_command; }

    static sql_statement: number; public static sql_statement_$LI$(): number { if (ParsedSql.sql_statement == null) { ParsedSql.sql_statement = ParsedSql.partialRecognizer_$LI$().getSymbol("sql_statement"); }  return ParsedSql.sql_statement; }

    static sql_stmt: number; public static sql_stmt_$LI$(): number { if (ParsedSql.sql_stmt == null) { ParsedSql.sql_stmt = ParsedSql.partialRecognizer_$LI$().getSymbol("sql_stmt"); }  return ParsedSql.sql_stmt; }

    static unlabeled_nonblock_stmt: number; public static unlabeled_nonblock_stmt_$LI$(): number { if (ParsedSql.unlabeled_nonblock_stmt == null) { ParsedSql.unlabeled_nonblock_stmt = ParsedSql.partialRecognizer_$LI$().getSymbol("unlabeled_nonblock_stmt"); }  return ParsedSql.unlabeled_nonblock_stmt; }

    static crawlRulesDependency(symbol: number): ParsedSql.Language {
        if (symbol === ParsedSql.sql_stmt_$LI$())return ParsedSql.Language.SQL;
        if (symbol === ParsedSql.create_plsql_$LI$() || symbol === ParsedSql.call_statement_$LI$() || symbol === ParsedSql.unlabeled_nonblock_stmt_$LI$())return ParsedSql.Language.PLSQL;
        if (symbol === ParsedSql.sqlplus_command_$LI$())return ParsedSql.Language.SQLPLUS;
        if (symbol === ParsedSql.sql_statement_$LI$())return ParsedSql.Language.SQL;
        for(let i: number = 0; i < SqlEarley.getInstance().rules.length; i++) {{
            const tuple: Earley.Tuple = SqlEarley.getInstance().rules[i];
            if (tuple.head === tuple.rhs[0])continue;
            if (tuple.rhs[0] === symbol)try {
                return ParsedSql.crawlRulesDependency(tuple.head);
            } catch(e) {
                continue;
            }
        };}
        throw Object.defineProperty(new Error("failed to follow dependency chain for " + SqlEarley.getInstance().allSymbols[symbol]), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public static main(args: string[]) {
        ParsedSql.test$java_lang_String$boolean("begin\n execute immediate \'drop materialized view x\';end;", true);
        ParsedSql.test$java_lang_String$boolean("drop materialized view x", true);
        ParsedSql.test$java_lang_String$boolean("begin\n execute immediate \'create table x ( i integer );end;", false);
        ParsedSql.test$java_lang_String$boolean("create table x ( i integer );", false);
        console.info("4 tests are OK");
        if (true)return;
        let input: string = Service.readFile$java_lang_Class$java_lang_String(ParsedSql, "test.sql");
        console.info(ParsedSql.partialRecognize(input));
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("select", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("select 1", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("select 1,a", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("select 1,a from", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("select 1,a from dual", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("select 1,a from dual where ", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("select 1,a from dual where (select", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("create table", ParsedSql.Language.SQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("begin", ParsedSql.Language.PLSQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("begin null", ParsedSql.Language.PLSQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("begin null end", ParsedSql.Language.PLSQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("create function", ParsedSql.Language.PLSQL);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("CONNECT", ParsedSql.Language.SQLPLUS);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("CONNECT HR/", ParsedSql.Language.SQLPLUS);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("SET INSTANCE FIN2", ParsedSql.Language.SQLPLUS);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("EDIT REPORT", ParsedSql.Language.SQLPLUS);
        ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language("STARTUP NOMOUNT", ParsedSql.Language.SQLPLUS);
        input = Service.readFile$java_lang_String("C:\\Users\\dim\\git\\dbtools-commons\\common\\src\\main\\java\\oracle\\dbtools\\raptor\\compiler\\source.xml");
        {
            let array = ParsedSql.embeddedSelects(input);
            for(let index = 0; index < array.length; index++) {
                let s = array[index];
                console.info(s)
            }
        }
    }

    public static test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language(input: string, cmp: ParsedSql.Language) {
        if (ParsedSql.partialRecognize(input) !== cmp){
            console.info("**** Failed on\n" + input + "\nRecognized " + ParsedSql.partialRecognize(input));
        } else console.info(input + " -- OK");
    }

    public static test(input?: any, cmp?: any) {
        if (((typeof input === 'string') || input === null) && ((typeof cmp === 'number') || cmp === null)) {
            return <any>ParsedSql.test$java_lang_String$oracle_dbtools_parser_plsql_ParsedSql_Language(input, cmp);
        } else if (((typeof input === 'string') || input === null) && ((typeof cmp === 'boolean') || cmp === null)) {
            return <any>ParsedSql.test$java_lang_String$boolean(input, cmp);
        } else throw new Error('invalid overload');
    }

    static test$java_lang_String$boolean(input: string, expected: boolean): boolean {
        const cmp: boolean = new ParsedSql(input).contains("\'DROP\'");
        if (cmp !== expected){
            throw Object.defineProperty(new Error(input + "\n expected = " + expected + "\n actual = " + cmp), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        return true;
    }

    /**
     * Extracts embedded queries, e.g. \\oracle\\dbtools\\raptor\\compiler\\source.xml:
     * 
     * ...
     * <query minversion="10.1">
     * <sql>
     * <![CDATA[
     * SELECT LINE, POSITION, REPLACE(TEXT, CHR(10), ' '), attribute
     * FROM SYS.ALL_ERRORS A
     * WHERE A.NAME = :NAME AND A.TYPE = :TYPE AND A.OWNER = :OWNER
     * ORDER BY ATTRIBUTE, LINE, POSITION -- errors first
     * ]]>
     * </sql>
     * </query>
     * ...
     * 
     * @param {string} input
     * @return
     * @return {java.lang.String[]}
     */
    public static embeddedSelects(input: string): string[] {
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        const ret: Array<string> = <any>([]);
        for(let pos: number = 0; pos < /* size */(<number>src.length); ) {{
            const candidate: LexerToken = /* get */src[pos];
            if (!("SELECT" === candidate.content.toUpperCase())){
                pos++;
                continue;
            }
            const begin: number = pos;
            pos = ParsedSql.embeddedSelectEndPos(src, begin);
            if (pos === -1)break;
            /* add */(ret.push(input.substring(/* get */src[begin].begin, /* get */src[pos - 1].end))>0);
        };}
        return /* toArray */ret.slice(0);
    }

    public static embeddedSelectEndPos(input: Array<LexerToken>, startPos: number): number {
        const src: Array<LexerToken> = /* subList */input.slice(startPos, /* size */(<number>input.length));
        const earley: SqlEarley = SqlEarley.partialRecognizer();
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const select: ParseNode = ParsedSql.firstSelect(root);
        if (select != null)return startPos + select.to;
        return -1;
    }

    static firstSelect(node: ParseNode): ParseNode {
        if (node.contains$java_lang_String("select"))return node;
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                return ParsedSql.firstSelect(child)
            }
        }
        return null;
    }
}
ParsedSql["__class"] = "oracle.dbtools.parser.plsql.ParsedSql";


export namespace ParsedSql {

    /**
     * Recognize a command for sqlcli
     * Algorithm:
     * 1. find matrix cell where parsing advanced the most
     * 2. examine cell content
     * 3. follow recognized symbols up the rules dependency to see what their destination is
     * @ return enum {SQL, PLSQL, SQLPLUS}
     * @enum
     * @property {ParsedSql.Language} SQL
     * @property {ParsedSql.Language} PLSQL
     * @property {ParsedSql.Language} SQLPLUS
     * @class
     */
    export enum Language {
        SQL, PLSQL, SQLPLUS
    }
}
