/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Array as JArray } from '../../../arbori/util/Array.js';
import { IntegerMap } from '../../../arbori/util/IntegerMap.js';
import { JavaScript } from '../js/JavaScript.js';
import { Earley } from '../Earley.js';
import { Parser } from '../Parser.js';
import { Token } from '../Token.js';
import { Cell } from '../Cell.js';
import { Matrix } from '../Matrix.js';
import { Grammar } from '../Grammar.js';
import { ParseNode } from '../ParseNode.js';
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { RuleTuple } from '../RuleTuple.js';
import { Parseable } from '../Parseable.js';
import { Yelrae } from '../Yelrae.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Earley parsing method adapted for parsing SQL & PL/SQL & and some SQL*Plus commands
 * The grammar is fed by UnifiedRules
 * @author vtropash
 * @class
 * @extends Earley
 */
export class SqlEarley extends Earley implements Parseable {
    public constructor(rules?: any) {
        if (((rules != null && (rules instanceof Array)) || rules === null)) {
            let __args = arguments;
            super(rules);
            if (this.as === undefined) { this.as = 0; } 
            if (this.aliased_dml_table_expression_clause === undefined) { this.aliased_dml_table_expression_clause = 0; } 
            if (this.alter === undefined) { this.alter = 0; } 
            if (this.basic_decl_item === undefined) { this.basic_decl_item = 0; } 
            if (this.basic_decl_item_list === undefined) { this.basic_decl_item_list = 0; } 
            if (this.begin === undefined) { this.begin = 0; } 
            if (this.body === undefined) { this.body = 0; } 
            if (this.boolean_primary === undefined) { this.boolean_primary = 0; } 
            if (this.column === undefined) { this.column = 0; } 
            if (this.compound_expression === undefined) { this.compound_expression = 0; } 
            if (this.condition === undefined) { this.condition = 0; } 
            if (this.CONNECT === undefined) { this.CONNECT = 0; } 
            if (this.create === undefined) { this.create = 0; } 
            if (this.create_view === undefined) { this.create_view = 0; } 
            if (this.dbtools_lexeme === undefined) { this.dbtools_lexeme = 0; } 
            if (this.dotted_name === undefined) { this.dotted_name = 0; } 
            if (this.decl_id === undefined) { this.decl_id = 0; } 
            if (this.distinct === undefined) { this.distinct = 0; } 
            if (this.ELSE === undefined) { this.ELSE = 0; } 
            if (this.expr === undefined) { this.expr = 0; } 
            if (this.function_expression === undefined) { this.function_expression = 0; } 
            if (this.grouping_expression_list === undefined) { this.grouping_expression_list = 0; } 
            if (this.json_object_arg_list === undefined) { this.json_object_arg_list = 0; } 
            if (this.model_expression === undefined) { this.model_expression = 0; } 
            if (this.arg_list === undefined) { this.arg_list = 0; } 
            if (this.arg_star_list === undefined) { this.arg_star_list = 0; } 
            if (this.multiset_except === undefined) { this.multiset_except = 0; } 
            if (this.name_wo_function_call === undefined) { this.name_wo_function_call = 0; } 
            if (this.pkg_spec === undefined) { this.pkg_spec = 0; } 
            if (this.pls_expr === undefined) { this.pls_expr = 0; } 
            if (this.query_block === undefined) { this.query_block = 0; } 
            if (this.REPLACE === undefined) { this.REPLACE = 0; } 
            if (this.select === undefined) { this.select = 0; } 
            if (this.simple_expression === undefined) { this.simple_expression = 0; } 
            if (this.sim_stmt === undefined) { this.sim_stmt = 0; } 
            if (this.sql_statement === undefined) { this.sql_statement = 0; } 
            if (this.sql_statements === undefined) { this.sql_statements = 0; } 
            if (this.sqlplus_lexeme === undefined) { this.sqlplus_lexeme = 0; } 
            if (this.sqlplus_command === undefined) { this.sqlplus_command = 0; } 
            if (this.sqlplus_command1 === undefined) { this.sqlplus_command1 = 0; } 
            if (this.sqlplus_bindvar === undefined) { this.sqlplus_bindvar = 0; } 
            if (this.start === undefined) { this.start = 0; } 
            if (this.stmt === undefined) { this.stmt = 0; } 
            if (this.subquery === undefined) { this.subquery = 0; } 
            if (this.table === undefined) { this.table = 0; } 
            if (this.table_reference === undefined) { this.table_reference = 0; } 
            if (this.unlabeled_nonblock_stmt === undefined) { this.unlabeled_nonblock_stmt = 0; } 
            if (this.user_defined_types === undefined) { this.user_defined_types = 0; } 
            if (this.unknown === undefined) { this.unknown = 0; } 
            if (this.where_gby_hier === undefined) { this.where_gby_hier = 0; } 
            if (this.HEX_LITERAL === undefined) { this.HEX_LITERAL = 0; } 
            if (this.RegExpLiteral === undefined) { this.RegExpLiteral = 0; } 
            if (this.StringLiteral === undefined) { this.StringLiteral = 0; } 
            if (this.TemplateLiteral === undefined) { this.TemplateLiteral = 0; } 
            if (this.isJsHead === undefined) { this.isJsHead = null; } 
            this.whatToRecognize = [];
            this.END = this.getSymbol("\'END\'");
            this.RPAREN = this.getSymbol("\')\'");
            this.semi = this.getSymbol("\';\'");
            this.matchingTerminals = null;
            this.notOptimizableHeadSymbols = null;
            this._keywords = <any>([]);
            this._JSkeywords = <any>([]);
            this.initializeSqlGrammar();
            this.prioritizeRules$();
        } else if (((typeof rules === 'string') || rules === null)) {
            let __args = arguments;
            let dummy: any = __args[0];
            super();
            if (this.as === undefined) { this.as = 0; } 
            if (this.aliased_dml_table_expression_clause === undefined) { this.aliased_dml_table_expression_clause = 0; } 
            if (this.alter === undefined) { this.alter = 0; } 
            if (this.basic_decl_item === undefined) { this.basic_decl_item = 0; } 
            if (this.basic_decl_item_list === undefined) { this.basic_decl_item_list = 0; } 
            if (this.begin === undefined) { this.begin = 0; } 
            if (this.body === undefined) { this.body = 0; } 
            if (this.boolean_primary === undefined) { this.boolean_primary = 0; } 
            if (this.column === undefined) { this.column = 0; } 
            if (this.compound_expression === undefined) { this.compound_expression = 0; } 
            if (this.condition === undefined) { this.condition = 0; } 
            if (this.CONNECT === undefined) { this.CONNECT = 0; } 
            if (this.create === undefined) { this.create = 0; } 
            if (this.create_view === undefined) { this.create_view = 0; } 
            if (this.dbtools_lexeme === undefined) { this.dbtools_lexeme = 0; } 
            if (this.dotted_name === undefined) { this.dotted_name = 0; } 
            if (this.decl_id === undefined) { this.decl_id = 0; } 
            if (this.distinct === undefined) { this.distinct = 0; } 
            if (this.ELSE === undefined) { this.ELSE = 0; } 
            if (this.expr === undefined) { this.expr = 0; } 
            if (this.function_expression === undefined) { this.function_expression = 0; } 
            if (this.grouping_expression_list === undefined) { this.grouping_expression_list = 0; } 
            if (this.json_object_arg_list === undefined) { this.json_object_arg_list = 0; } 
            if (this.model_expression === undefined) { this.model_expression = 0; } 
            if (this.arg_list === undefined) { this.arg_list = 0; } 
            if (this.arg_star_list === undefined) { this.arg_star_list = 0; } 
            if (this.multiset_except === undefined) { this.multiset_except = 0; } 
            if (this.name_wo_function_call === undefined) { this.name_wo_function_call = 0; } 
            if (this.pkg_spec === undefined) { this.pkg_spec = 0; } 
            if (this.pls_expr === undefined) { this.pls_expr = 0; } 
            if (this.query_block === undefined) { this.query_block = 0; } 
            if (this.REPLACE === undefined) { this.REPLACE = 0; } 
            if (this.select === undefined) { this.select = 0; } 
            if (this.simple_expression === undefined) { this.simple_expression = 0; } 
            if (this.sim_stmt === undefined) { this.sim_stmt = 0; } 
            if (this.sql_statement === undefined) { this.sql_statement = 0; } 
            if (this.sql_statements === undefined) { this.sql_statements = 0; } 
            if (this.sqlplus_lexeme === undefined) { this.sqlplus_lexeme = 0; } 
            if (this.sqlplus_command === undefined) { this.sqlplus_command = 0; } 
            if (this.sqlplus_command1 === undefined) { this.sqlplus_command1 = 0; } 
            if (this.sqlplus_bindvar === undefined) { this.sqlplus_bindvar = 0; } 
            if (this.start === undefined) { this.start = 0; } 
            if (this.stmt === undefined) { this.stmt = 0; } 
            if (this.subquery === undefined) { this.subquery = 0; } 
            if (this.table === undefined) { this.table = 0; } 
            if (this.table_reference === undefined) { this.table_reference = 0; } 
            if (this.unlabeled_nonblock_stmt === undefined) { this.unlabeled_nonblock_stmt = 0; } 
            if (this.user_defined_types === undefined) { this.user_defined_types = 0; } 
            if (this.unknown === undefined) { this.unknown = 0; } 
            if (this.where_gby_hier === undefined) { this.where_gby_hier = 0; } 
            if (this.HEX_LITERAL === undefined) { this.HEX_LITERAL = 0; } 
            if (this.RegExpLiteral === undefined) { this.RegExpLiteral = 0; } 
            if (this.StringLiteral === undefined) { this.StringLiteral = 0; } 
            if (this.TemplateLiteral === undefined) { this.TemplateLiteral = 0; } 
            if (this.isJsHead === undefined) { this.isJsHead = null; } 
            this.whatToRecognize = [];
            this.END = this.getSymbol("\'END\'");
            this.RPAREN = this.getSymbol("\')\'");
            this.semi = this.getSymbol("\';\'");
            this.matchingTerminals = null;
            this.notOptimizableHeadSymbols = null;
            this._keywords = <any>([]);
            this._JSkeywords = <any>([]);
        } else if (rules === undefined) {
            let __args = arguments;
            super(SqlEarley.getRules());
            if (this.as === undefined) { this.as = 0; } 
            if (this.aliased_dml_table_expression_clause === undefined) { this.aliased_dml_table_expression_clause = 0; } 
            if (this.alter === undefined) { this.alter = 0; } 
            if (this.basic_decl_item === undefined) { this.basic_decl_item = 0; } 
            if (this.basic_decl_item_list === undefined) { this.basic_decl_item_list = 0; } 
            if (this.begin === undefined) { this.begin = 0; } 
            if (this.body === undefined) { this.body = 0; } 
            if (this.boolean_primary === undefined) { this.boolean_primary = 0; } 
            if (this.column === undefined) { this.column = 0; } 
            if (this.compound_expression === undefined) { this.compound_expression = 0; } 
            if (this.condition === undefined) { this.condition = 0; } 
            if (this.CONNECT === undefined) { this.CONNECT = 0; } 
            if (this.create === undefined) { this.create = 0; } 
            if (this.create_view === undefined) { this.create_view = 0; } 
            if (this.dbtools_lexeme === undefined) { this.dbtools_lexeme = 0; } 
            if (this.dotted_name === undefined) { this.dotted_name = 0; } 
            if (this.decl_id === undefined) { this.decl_id = 0; } 
            if (this.distinct === undefined) { this.distinct = 0; } 
            if (this.ELSE === undefined) { this.ELSE = 0; } 
            if (this.expr === undefined) { this.expr = 0; } 
            if (this.function_expression === undefined) { this.function_expression = 0; } 
            if (this.grouping_expression_list === undefined) { this.grouping_expression_list = 0; } 
            if (this.json_object_arg_list === undefined) { this.json_object_arg_list = 0; } 
            if (this.model_expression === undefined) { this.model_expression = 0; } 
            if (this.arg_list === undefined) { this.arg_list = 0; } 
            if (this.arg_star_list === undefined) { this.arg_star_list = 0; } 
            if (this.multiset_except === undefined) { this.multiset_except = 0; } 
            if (this.name_wo_function_call === undefined) { this.name_wo_function_call = 0; } 
            if (this.pkg_spec === undefined) { this.pkg_spec = 0; } 
            if (this.pls_expr === undefined) { this.pls_expr = 0; } 
            if (this.query_block === undefined) { this.query_block = 0; } 
            if (this.REPLACE === undefined) { this.REPLACE = 0; } 
            if (this.select === undefined) { this.select = 0; } 
            if (this.simple_expression === undefined) { this.simple_expression = 0; } 
            if (this.sim_stmt === undefined) { this.sim_stmt = 0; } 
            if (this.sql_statement === undefined) { this.sql_statement = 0; } 
            if (this.sql_statements === undefined) { this.sql_statements = 0; } 
            if (this.sqlplus_lexeme === undefined) { this.sqlplus_lexeme = 0; } 
            if (this.sqlplus_command === undefined) { this.sqlplus_command = 0; } 
            if (this.sqlplus_command1 === undefined) { this.sqlplus_command1 = 0; } 
            if (this.sqlplus_bindvar === undefined) { this.sqlplus_bindvar = 0; } 
            if (this.start === undefined) { this.start = 0; } 
            if (this.stmt === undefined) { this.stmt = 0; } 
            if (this.subquery === undefined) { this.subquery = 0; } 
            if (this.table === undefined) { this.table = 0; } 
            if (this.table_reference === undefined) { this.table_reference = 0; } 
            if (this.unlabeled_nonblock_stmt === undefined) { this.unlabeled_nonblock_stmt = 0; } 
            if (this.user_defined_types === undefined) { this.user_defined_types = 0; } 
            if (this.unknown === undefined) { this.unknown = 0; } 
            if (this.where_gby_hier === undefined) { this.where_gby_hier = 0; } 
            if (this.HEX_LITERAL === undefined) { this.HEX_LITERAL = 0; } 
            if (this.RegExpLiteral === undefined) { this.RegExpLiteral = 0; } 
            if (this.StringLiteral === undefined) { this.StringLiteral = 0; } 
            if (this.TemplateLiteral === undefined) { this.TemplateLiteral = 0; } 
            if (this.isJsHead === undefined) { this.isJsHead = null; } 
            this.whatToRecognize = [];
            this.END = this.getSymbol("\'END\'");
            this.RPAREN = this.getSymbol("\')\'");
            this.semi = this.getSymbol("\';\'");
            this.matchingTerminals = null;
            this.notOptimizableHeadSymbols = null;
            this._keywords = <any>([]);
            this._JSkeywords = <any>([]);
            this.initializeSqlGrammar();
            this.prioritizeRules$();
        } else throw new Error('invalid overload');
    }

    /*private*/ initializeSqlGrammar() {
        this.initKeywords();
        this.initMemberGrammarSymbols();
        this.initJsHeadFlags();
    }

    public static fromSourceGrammar(): SqlEarley {
        const ret: SqlEarley = new SqlEarley(SqlEarley.getRules());
        ret.addSymbol2Recognize$java_lang_String("sql_statements");
        ret.addSymbol2Recognize$java_lang_String("subprg_body");
        ret.addSymbol2Recognize$java_lang_String("expr");
        return ret;
    }

    /**
     * 
     * @return {Earley}
     */
    copyForYelrae(): Earley {
        const copy: SqlEarley = /* clone *//* clone */((o: any) => { if (o.clone != undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(this);
        copy.predicts = null;
        copy.terminalPredictions = null;
        return copy;
    }

    /**
     * Speed up initialization
     * @return
     * @return {SqlEarley}
     */
    public clone(): SqlEarley {
        const ret: SqlEarley = new SqlEarley("dummy");
        ret.allSymbols = this.allSymbols;
        ret.symbolIndexes = this.symbolIndexes;
        ret.rules = this.rules;
        ret.identifier = this.identifier;
        ret.string_literal = this.string_literal;
        ret.digits = this.digits;
        ret.isCaseSensitive = this.isCaseSensitive;
        ret.predicts = this.predicts;
        ret.terminalPredictions = this.terminalPredictions;
        ret.copyMemberGrammarSymbols(this);
        ret._keywords = this._keywords;
        ret._JSkeywords = this._JSkeywords;
        ret.isJsHead = this.isJsHead;
        ret.whatToRecognize = this.whatToRecognize;
        return ret;
    }

    /**
     * Example usage
     * @param args -- standard dummy
     * @throws Exception
     */


    public static partialRecognizer(): SqlEarley {
        return SqlEarley.getInstance();
    }

    static fullRecInst: SqlEarley = null;

    public static getInstance(): SqlEarley {
        if (SqlEarley.fullRecInst == null){
            SqlEarley.fullRecInst = SqlEarley.newFullRecognizer();
        }
        return SqlEarley.fullRecInst;
    }

    public static newFullRecognizer(): SqlEarley {
        const ret: SqlEarley = new SqlEarley();
        ret.addSymbol2Recognize$java_lang_String("sql_statements");
        ret.addSymbol2Recognize$java_lang_String("subprg_body");
        ret.addSymbol2Recognize$java_lang_String("expr");
        return ret;
    }

    /**
     * Oracle SQL grammar extensions.
     * Re Eugene Perkov: In particular we are dealing with so-called logical SQL
     * which is a supreset of ANSI-92 Standard enhanced with some proprietary extensions
     * (e.g. FILTER(column_expression) USING(expression) and many others alike).
     * This is something that Oracle BI Server (OBIEE) produces out of presentation model + business model.
     * @param {RuleTuple[]} additionalRules
     * @return
     * @return {SqlEarley}
     */
    public grammarExtension(additionalRules: Array<RuleTuple>): SqlEarley {
        const originalRules: Array<RuleTuple> = SqlEarley.getRules();
        this.extractSymbols(additionalRules);
        this.rules = /* copyOf */this.rules.slice(0,/* size */(<number>originalRules.length) + /* size */(<number>additionalRules.length));
        let p: number = /* size */(<number>originalRules.length);
        for(let index = 0; index < additionalRules.length; index++) {
            let t = additionalRules[index];
            {
                if (t.rhs.length === 0)throw Object.defineProperty(new Error("empty production " + t.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                const h: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, t.head);
                const rhs: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(t.rhs.length);
                for(let i: number = 0; i < rhs.length; i++) {{
                    rhs[i] = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, t.rhs[i]);
                };}
                this.rules[p++] = new Parser.Tuple(this, h, rhs);
            }
        }
        this.matchingTerminals = null;
        this.predicts = null;
        this.terminalPredictions = null;
        this.isJsHead = null;
        this.initJsHeadFlags();
        return this;
    }

    /**
     * extend the grammar and amend the fullRecInst and partialRecInst parser instances
     * @param {RuleTuple[]} additionalRules
     */
    public static extendGrammar(additionalRules: Array<RuleTuple>) {
        SqlEarley.fullRecInst = SqlEarley.newFullRecognizer().grammarExtension(additionalRules);
    }

    static fname: string = "allRules.txt";

    static path: string = "/oracle/dbtools/parser/plsql/";

    static RULES_STRING_POOL: Map<number, string[]>; public static RULES_STRING_POOL_$LI$(): Map<number, string[]> { if (SqlEarley.RULES_STRING_POOL == null) { SqlEarley.RULES_STRING_POOL = new Map<number, string[]>(); }  return SqlEarley.RULES_STRING_POOL; }

    static loadRulesData(): number[] {
        let moduleRelativePath: string | null = null;
        try {
            moduleRelativePath = fileURLToPath(new URL('../../../../../../../allRules.txt', import.meta.url));
        } catch {
            // CommonJS bundles do not provide import.meta.url; use project-relative resources there.
        }
        const candidates = [
            `${process.cwd()}/src/main/resources/oracle/dbtools/parser/plsql/${SqlEarley.fname}`,
            `${process.cwd()}/allRules.txt`,
            ...(moduleRelativePath == null ? [] : [moduleRelativePath]),
        ];
        for (const path of candidates) {
            try {
                return Array.from(readFileSync(path));
            } catch {
                // Try the next project-relative location.
            }
        }
        throw new Error(`Unable to locate ${SqlEarley.fname}; checked ${candidates.join(', ')}`);
    }

    public static extractRules(): Array<RuleTuple> {
        const data: number[] = SqlEarley.loadRulesData();
        const delimiters: Array<number> = <any>([]);
        /* add */(delimiters.push(-1)>0);
        for(let i: number = 0; i < data.length; i++) {{
            if (data[i] == '\n'.charCodeAt(0))/* add */(delimiters.push(i)>0);
        };}
        /* add */(delimiters.push(data.length)>0);
        const lineCount: number = delimiters.length - 1;
        const rules: RuleTuple[] = [];
        for (let i = 0; i < lineCount; i++) {
            const rule = SqlEarley.parseRuleTuple(data, delimiters[i], delimiters[i + 1]);
            if (rule != null) rules.push(rule);
        }
        rules.sort((a, b) => a.compareTo(b));
        return rules.filter((rule, index) => index === 0 || rule.compareTo(rules[index - 1]) !== 0);
    }

    /*private*/ static parseRuleTuple(data: number[], prevDelimiter: number, nextDelimiter: number): RuleTuple {
        const lineStart: number = prevDelimiter + 1;
        if (lineStart >= nextDelimiter)return null;
        let colonPos: number = -1;
        for(let pos: number = lineStart; pos < nextDelimiter - 1; pos++) {{
            if (data[pos] == ':'.charCodeAt(0) && data[pos + 1] == ' '.charCodeAt(0)){
                colonPos = pos;
                break;
            }
        };}
        if (colonPos < 0)return null;
        const head: string = SqlEarley.poolString(data, lineStart, colonPos - lineStart);
        const rhs: Array<string> = <any>([]);
        let tokenStart: number = colonPos + 2;
        for(let pos: number = tokenStart; pos <= nextDelimiter; pos++) {{
            if (pos === nextDelimiter || data[pos] == ' '.charCodeAt(0)){
                if (pos > tokenStart){
                    /* add */(rhs.push(SqlEarley.poolString(data, tokenStart, pos - tokenStart))>0);
                }
                tokenStart = pos + 1;
            }
        };}
        return new RuleTuple(head, rhs);
    }

    /**
     * Reuse string references by interning byte sequences into a class local
     * shared pool.
     * 
     * Computes an FNV-1a hash of the byte range and returns a cached string if
     * one with the same hash already exists, avoiding redundant allocations.
     * @param {byte[]} data
     * @param {number} offset
     * @param {number} length
     * @return {string}
     * @private
     */
    /*private*/ static poolString(data: number[], offset: number, length: number): string {
        const hash: number = SqlEarley.hashBytes(data, offset, offset + length);
        const pool = SqlEarley.RULES_STRING_POOL_$LI$();
        const value = String.fromCharCode(...data.slice(offset, offset + length));
        const bucket = pool.get(hash);
        if (bucket) {
            const found = bucket.find(candidate => candidate === value);
            if (found !== undefined) return found;
            bucket.push(value);
        } else pool.set(hash, [value]);
        return value;
    }

    static hashBytes(buf: number[], start: number, end: number): number {
        let h = 0x811c9dc5;
        for(let i: number = start; i < end; i++) {{
            h = Math.imul(h ^ (buf[i] & 255), 0x01000193);
        };}
        return h >>> 0;
    }

    static origRules: Array<RuleTuple> = null;

    static getRules(): Array<RuleTuple> {
        if (SqlEarley.origRules == null)try {
            SqlEarley.origRules = SqlEarley.extractRules();
            // Java applies these adjustments to a TreeSet<RuleTuple>. The
            // generated array operations below use identity-based indexOf,
            // so compare rules by RuleTuple.compareTo while applying them.
            const identityIndexOf = SqlEarley.origRules.indexOf.bind(SqlEarley.origRules);
            SqlEarley.origRules.indexOf = (candidate: RuleTuple, fromIndex = 0): number => {
                const start = Math.max(0, fromIndex);
                for (let index = start; index < SqlEarley.origRules.length; index++) {
                    if (SqlEarley.origRules[index].compareTo(candidate) === 0) return index;
                }
                return -1;
            };
            /* remove */(a => { let index = a.indexOf(new RuleTuple("identifier", ["idq"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("identifier", ["id"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\'.\'", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\'@\'", "dblink", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\'.\'", "identifier", "\'@\'", "dblink", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'OR\'", "\'REPLACE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'OR\'", "\'REPLACE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\'.\'", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'OR\'", "\'REPLACE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\'@\'", "dblink", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_synonym", ["\'CREATE\'", "\'OR\'", "\'REPLACE\'", "\'PUBLIC\'", "\'SYNONYM\'", "identifier", "\'.\'", "identifier", "\'FOR\'", "identifier", "\'.\'", "identifier", "\'@\'", "dblink", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'DATABASE\'", "\'LINK\'", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'DATABASE\'", "\'LINK\'", "create_database_link___0", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'PUBLIC\'", "\'DATABASE\'", "\'LINK\'", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'DATABASE\'", "\'LINK\'", "identifier", "\'USING\'", "string_literal", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'PUBLIC\'", "\'DATABASE\'", "\'LINK\'", "create_database_link___0", "identifier", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'DATABASE\'", "\'LINK\'", "create_database_link___0", "identifier", "\'USING\'", "string_literal", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'PUBLIC\'", "\'DATABASE\'", "\'LINK\'", "identifier", "\'USING\'", "string_literal", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("create_database_link", ["\'CREATE\'", "\'SHARED\'", "\'PUBLIC\'", "\'DATABASE\'", "\'LINK\'", "create_database_link___0", "identifier", "\'USING\'", "string_literal", "\';\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("function_call", ["name", "\'(\'", "\')\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlEarley.origRules, new RuleTuple("function_call", ["dotted_name", "\'(\'", "\')\'"]));
            /* remove */(a => { let index = a.indexOf(new RuleTuple("function_call", ["name", "\'(\'", "call_arg", "\')\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("function_call", ["name", "\'(\'", "call_arg", "call_arg_list", "\')\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("inline_constraint___0", ["references_clause"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlEarley.origRules, new RuleTuple("call_statement", ["call_statement", "\'.\'", "procedure_call"]));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlEarley.origRules, new RuleTuple("call_statement", ["call_statement", "\'.\'", "procedure_call", "\'INTO\'", "name"]));
            /* remove */(a => { let index = a.indexOf(new RuleTuple("condition", ["expr"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("arg_list", ["arg_list", "arg"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* remove */(a => { let index = a.indexOf(new RuleTuple("library_unit", ["unlabeled_nonblock_stmt"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlEarley.origRules, new RuleTuple("cast_expression_arg", ["expr"]));
            /* remove */(a => { let index = a.indexOf(new RuleTuple("function_call", ["name", "\'(\'", "\'+\'", "\')\'"])); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlEarley.origRules);
            SqlEarley.origRules.sort((left, right) => left.compareTo(right));
            SqlEarley.origRules.indexOf = identityIndexOf;
            SqlEarley.RULES_STRING_POOL_$LI$().clear();
        } catch(e) {
        }
        return SqlEarley.origRules;
    }

    /*private*/ as: number;

    /*private*/ aliased_dml_table_expression_clause: number;

    /*private*/ alter: number;

    /*private*/ basic_decl_item: number;

    /*private*/ basic_decl_item_list: number;

    /*private*/ begin: number;

    /*private*/ body: number;

    /*private*/ boolean_primary: number;

    /*private*/ column: number;

    /*private*/ compound_expression: number;

    /*private*/ condition: number;

    public CONNECT: number;

    /*private*/ create: number;

    /*private*/ create_view: number;

    /*private*/ dbtools_lexeme: number;

    /*private*/ dotted_name: number;

    public decl_id: number;

    /*private*/ distinct: number;

    /*private*/ ELSE: number;

    /*private*/ expr: number;

    /*private*/ function_expression: number;

    /*private*/ grouping_expression_list: number;

    /*private*/ json_object_arg_list: number;

    /*private*/ model_expression: number;

    /*private*/ arg_list: number;

    /*private*/ arg_star_list: number;

    public multiset_except: number;

    /*private*/ name_wo_function_call: number;

    /*private*/ pkg_spec: number;

    /*private*/ pls_expr: number;

    public query_block: number;

    public REPLACE: number;

    public select: number;

    public simple_expression: number;

    public sim_stmt: number;

    public sql_statement: number;

    public sql_statements: number;

    public sqlplus_lexeme: number;

    public sqlplus_command: number;

    public sqlplus_command1: number;

    public sqlplus_bindvar: number;

    /*private*/ start: number;

    public stmt: number;

    public subquery: number;

    public table: number;

    public table_reference: number;

    /*private*/ unlabeled_nonblock_stmt: number;

    /*private*/ user_defined_types: number;

    /*private*/ unknown: number;

    /*private*/ where_gby_hier: number;

    /*private*/ HEX_LITERAL: number;

    /*private*/ RegExpLiteral: number;

    /*private*/ StringLiteral: number;

    /*private*/ TemplateLiteral: number;

    /*private*/ isJsHead: boolean[];

    static MEMBER_GRAMMAR_SYMBOL_OVERRIDES: Map<string, string>;
    public static MEMBER_GRAMMAR_SYMBOL_OVERRIDES_$LI$(): Map<string, string> {
        if (SqlEarley.MEMBER_GRAMMAR_SYMBOL_OVERRIDES == null) {
            SqlEarley.MEMBER_GRAMMAR_SYMBOL_OVERRIDES = new Map([
                ["as", "'AS'"], ["begin", "'BEGIN'"], ["distinct", "'DISTINCT'"],
                ["ELSE", "'ELSE'"], ["REPLACE", "'REPLACE'"],
                ["sqlplus_command1", "sqlplus_command#"], ["start", "'START'"],
                ["StringLiteral", "string_literal"], ["where_gby_hier", "\"where,gby,hier\""]
            ]);
        }
        return SqlEarley.MEMBER_GRAMMAR_SYMBOL_OVERRIDES;
    }

    /*private*/ initMemberGrammarSymbols() {
        try {
            const overrides = SqlEarley.MEMBER_GRAMMAR_SYMBOL_OVERRIDES_$LI$();
            for (const field of Object.keys(this)) {
                if (typeof this[field] !== "number") continue;
                this[field] = this.getSymbol(overrides.get(field) ?? field);
            }
        } catch (e) {
            throw new Error("Failed to initialize SqlEarley grammar symbols", { cause: e });
        }
    }

    /*private*/ copyMemberGrammarSymbols(src: SqlEarley) {
        try {
            for (const field of Object.keys(src)) {
                if (typeof src[field] === "number" && field in this) this[field] = src[field];
            }
        } catch (e) {
            throw new Error("Failed to copy SqlEarley member fields", { cause: e });
        }
    }

    /*private*/ initJsHeadFlags() {
        if (this.isJsHead != null)return;
        const flags: boolean[] = (s => { let a=[]; while(s-->0) a.push(false); return a; })(this.allSymbols.length);
        for(let i: number = 0; i < this.allSymbols.length; i++) {{
            const head: string = this.allSymbols[i];
            flags[i] = 3 < head.length && this.isUpperCase(head.charAt(0)) && this.isLowerCase(head.charAt(1));
        };}
        this.isJsHead = flags;
    }

    private isUpperCase(character: string): boolean {
        return character !== character.toLowerCase();
    }

    private isLowerCase(character: string): boolean {
        return character !== character.toUpperCase();
    }

    /*private*/ prioritizeRules$() {
        this.prioritizeRules$int$int_A(this.getSymbol("adt_field"), [this.getSymbol("method_specification"), this.getSymbol("field")]);
        this.prioritizeRules$int$int_A(this.getSymbol("\"alter_pluggable_database_clause\""), [this.getSymbol("pdb_datafile_clause"), this.getSymbol("pdb_change_state_from_root")]);
        this.prioritizeRules$int$int_A(this.getSymbol("alter_table___0#"), [this.getSymbol("constraint_clauses"), this.getSymbol("column_clauses"), this.getSymbol("alter_external_table")]);
        this.prioritizeRules$int$int_A(this.getSymbol("analytic_function"), [this.getSymbol("nth_value"), this.getSymbol("first_last_value"), this.getSymbol("lag"), this.getSymbol("lead"), this.getSymbol("a_f")]);
        this.prioritizeRules$int$int_A(this.getSymbol("arg"), [this.getSymbol("pls_expr"), this.getSymbol("expr#")]);
        const plsRule: string = "assoc_arg:  assoc_name_list  \'=\' \'>\'   pls_expr;";
        const sqlRule: string = "assoc_arg: sim_expr  \'=\'  \'>\'  expr;";
        this.swapRules(plsRule, sqlRule);
        this.prioritizeRules$int$int_A(this.getSymbol("basic_d"), [this.getSymbol("subprg_i"), this.getSymbol("object_d")]);
        this.prioritizeRules$int$int_A(this.basic_decl_item, [this.getSymbol("pragma"), this.getSymbol("basic_d")]);
        this.prioritizeRules$int$int_A(this.boolean_primary, [this.getSymbol("\'TRUE\'"), this.getSymbol("\'FALSE\'"), this.getSymbol("sim_expr"), this.condition, this.function_expression]);
        this.prioritizeRules$int$int_A(this.getSymbol("sim_expr"), [this.getSymbol("aggregate_function"), this.getSymbol("arith_expr"), this.getSymbol("multiset_value_expression")]);
        const simExprRule: string = "boolean_primary:  sim_expr;";
        const boolPriRule: string = "boolean_primary:  condition;";
        this.swapRules(simExprRule, boolPriRule);
        this.prioritizeRules$int$int_A(this.getSymbol("cell_assignment___0"), [this.getSymbol("multi_column_for_loop"), this.getSymbol("cell_assignment___1")]);
        this.prioritizeRules$int$int_A(this.getSymbol("col_properties___0"), [this.getSymbol("out_of_line_ref_constraint"), this.getSymbol("out_of_line_constraint"), this.getSymbol("column_definition")]);
        this.prioritizeRules$int$int_A(this.getSymbol("column_definition___0#"), [this.getSymbol("inline_ref_constraint"), this.getSymbol("inline_constraint")]);
        this.prioritizeRules$int$int_A(this.getSymbol("column_definition___2"), [this.getSymbol("expr"), this.getSymbol("condition")]);
        const condExprRule: string = "\"cond_or_expr\":  expr;";
        const condModelRule: string = "\"cond_or_expr\":  model_condition;";
        this.swapRules(condExprRule, condModelRule);
        let rule2: string = "insert_into_clause:  \'INTO\'  aliased_dml_table_expression_clause;";
        let rule3: string = "insert_into_clause:  \'INTO\'  aliased_dml_table_expression_clause  insert_into_clause___0;";
        this.swapRules(rule2, rule3);
        this.prioritizeRules$int$int_A(this.getSymbol("comparison_condition"), [this.getSymbol("between_condition"), this.getSymbol("group_comparison_condition"), this.getSymbol("simple_comparison_condition")]);
        this.prioritizeRules$int$int_A(this.compound_expression, [this.getSymbol("expr"), this.getSymbol("compound_expression___1")]);
        this.prioritizeRules$int$int_A(this.condition, [this.getSymbol("compound_condition"), this.getSymbol("comparison_condition"), this.getSymbol("null_condition"), this.getSymbol("JSON_condition"), this.getSymbol("simple_expression"), this.function_expression]);
        this.prioritizeRules$int$int_A(this.getSymbol("datetime_expression___1"), [this.getSymbol("\'DBTIMEZONE\'"), this.getSymbol("string_literal"), this.expr]);
        this.prioritizeRules$int$int_A(this.getSymbol("default_clause___2"), [this.expr, this.condition]);
        const ee1: string = "else_expr:  condition;";
        const ee2: string = "else_expr:  expr;";
        this.swapRules(ee1, ee2);
        this.prioritizeRules$int$int_A(this.getSymbol("expr#"), [this.simple_expression, this.compound_expression, this.function_expression, this.getSymbol("object_access_expression"), this.getSymbol("type_constructor_expression"), this.getSymbol("JSON_object_access_expr"), this.getSymbol("model_expression"), this.getSymbol("compound_condition")]);
        this.prioritizeRules$int$int_A(this.getSymbol("\"expr|Dexpr|condition\""), [this.expr, this.condition]);
        this.prioritizeRules$int$int_A(this.function_expression, [this.getSymbol("function"), this.getSymbol("function_call")]);
        rule2 = "function_expression:  function_call;";
        rule3 = "function_expression:  function_expression  \'.\'  function_call;";
        this.swapRules(rule2, rule3);
        rule3 = "function_expression:  function_expression  \'.\'  identifier;";
        this.swapRules(rule2, rule3);
        this.prioritizeRules$int$int_A(this.getSymbol("function"), [this.getSymbol("analytic_function"), this.getSymbol("aggregate_function"), this.getSymbol("timebucket_function"), this.getSymbol("single_row_function"), this.getSymbol("object_reference_function")]);
        this.prioritizeRules$int$int_A(this.getSymbol("group_by_col"), [this.getSymbol("rollup_cube_clause"), this.getSymbol("expr")]);
        const innerCrossJoinRule: string = "join_clause:  table_reference_or_join_clause  \"inner_cross_join_clause\";";
        const outerJoinRule: string = "join_clause:  table_reference_or_join_clause  \"outer_join_clause\";";
        this.swapRules(innerCrossJoinRule, outerJoinRule);
        this.prioritizeRules$int$int_A(this.getSymbol("modify_column_clauses___1"), [this.getSymbol("modify_col_visibility"), this.getSymbol("modify_col_properties"), this.getSymbol("virtual_column_definition")]);
        this.prioritizeRules$int$int_A(this.getSymbol("pdb_change_state"), [this.getSymbol("pdb_change_state___0"), this.identifier]);
        this.prioritizeRules$int$int_A(this.pls_expr, [this.getSymbol("pls_expr"), this.getSymbol("and_expr")]);
        this.prioritizeRules$int$int_A(this.getSymbol("procedure_call"), [this.getSymbol("pseudocol"), this.getSymbol("name")]);
        this.prioritizeRules$int$int_A(this.getSymbol("query_table_expression"), [this.getSymbol("xmltable"), this.getSymbol("table_collection_expression"), this.function_expression]);
        this.prioritizeRules$int$int_A(this.getSymbol("select_term"), [this.expr, this.getSymbol("\"aliased_expr\""), this.getSymbol("\"aliased_condition\"")]);
        const ske1: string = "searched_case_expression#:  \'WHEN\'  condition  \'THEN\'  condition;";
        const ske2: string = "searched_case_expression#:  \'WHEN\'  condition  \'THEN\'  expr;";
        this.swapRules(ske1, ske2);
        this.prioritizeRules$int$int_A(this.simple_expression, [this.getSymbol("literal"), this.getSymbol("pseudocol"), this.getSymbol("\'CONNECT_BY_ROOT\'"), this.getSymbol("\'CONNECT_BY_ISCYCLE\'"), this.getSymbol("\'CONNECT_BY_ISLEAF\'"), this.getSymbol("identifier"), this.getSymbol("column")]);
        this.prioritizeRules$int$int_A(this.sim_stmt, [this.getSymbol("null_stmt"), this.getSymbol("exit_stmt"), this.getSymbol("continue_stmt"), this.getSymbol("raise_stmt"), this.getSymbol("return_stmt"), this.getSymbol("procedure_call")]);
        rule2 = "subquery:  subquery  SET_OPER  subquery;";
        rule3 = "subquery:  subquery  \"where,gby,hier\";";
        this.swapRules(rule2, rule3);
        this.prioritizeRules$int$int_A(this.getSymbol("ty_def"), [this.getSymbol("array_ty_def"), this.getSymbol("tbl_ty_def")]);
        this.prioritizeRules$int$int_A(this.getSymbol("unconstrained_type_wo_datetime_wo_national"), [this.getSymbol("pls_number_datatypes"), this.getSymbol("link_expanded_n")]);
        this.prioritizeRules$int$int_A(this.unlabeled_nonblock_stmt, [this.getSymbol("sql_stmt"), this.sim_stmt]);
        this.prioritizeRules$int$int_A(this.getSymbol("values_clause___0"), [this.getSymbol("par_expr_list"), this.expr]);
        this.prioritizeRules$int$int_A(this.getSymbol("windowing_clause___3"), [this.getSymbol("\'UNBOUNDED\'"), this.expr]);
        this.prioritizeRules$int$int_A(this.getSymbol("windowing_clause___6"), [this.getSymbol("\'UNBOUNDED\'"), this.expr]);
    }

    public prioritizeRules$int$int_A(head: number, symbols: number[]) {
        const ruleNumbers: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(symbols.length);
        for(let i: number = 0; i < this.rules.length; i++) {{
            const t: Parser.Tuple = this.rules[i];
            if (t.head === head && (t.rhs.length === 1 || t.head === this.boolean_primary || t.head === this.basic_decl_item || t.head === this.compound_expression || t.head === this.function_expression || t.head === this.simple_expression || t.head === this.pls_expr || t.head === this.unlabeled_nonblock_stmt || t.head === this.sim_stmt))for(let j: number = 0; j < symbols.length; j++) {{
                if (t.rhs[0] === symbols[j]){
                    ruleNumbers[j] = i;
                    break;
                }
            };}
        };}
        const tuples: Parser.Tuple[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(symbols.length);
        for(let j: number = 0; j < symbols.length; j++) {tuples[j] = this.rules[ruleNumbers[j]];}
        /* sort */((l) => {l.sort(); })(ruleNumbers);
        for(let i: number = 0; i < ruleNumbers.length; i++) {{
            this.rules[ruleNumbers[i]] = tuples[i];
        };}
    }

    /**
     * Swap rules indexes in order to influence derivation
     * Rule priority example:
     * expr:simple_expression < expr:function_expression < expr:object_access_expression
     * @param {number} head
     * @param {int[]} symbols
     * @private
     */
    public prioritizeRules(head?: any, symbols?: any) {
        if (((typeof head === 'number') || head === null) && ((symbols != null && symbols instanceof <any>Array && (symbols.length == 0 || symbols[0] == null ||(typeof symbols[0] === 'number'))) || symbols === null)) {
            return <any>this.prioritizeRules$int$int_A(head, symbols);
        } else if (head === undefined && symbols === undefined) {
            return <any>this.prioritizeRules$();
        } else throw new Error('invalid overload');
    }

    /*private*/ whatToRecognize: number[];

    public addSymbol2Recognize$java_lang_String(additionalSymbol: string) {
        this.addSymbol2Recognize$int(this.getSymbol(additionalSymbol));
    }

    /**
     * Reconizer starts expecting whatToRecognize symbols
     * Expand this list by one more symbol
     * @param {string} additionalSymbol
     */
    public addSymbol2Recognize(additionalSymbol?: any) {
        if (((typeof additionalSymbol === 'string') || additionalSymbol === null)) {
            return <any>this.addSymbol2Recognize$java_lang_String(additionalSymbol);
        } else if (((typeof additionalSymbol === 'number') || additionalSymbol === null)) {
            return <any>this.addSymbol2Recognize$int(additionalSymbol);
        } else throw new Error('invalid overload');
    }

    public addSymbol2Recognize$int(additionalSymbol: number) {
        const tmp: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.whatToRecognize.length + 1);
        for(let i: number = 0; i < this.whatToRecognize.length; i++) {{
            if (this.whatToRecognize[i] === additionalSymbol)return;
            tmp[i] = this.whatToRecognize[i];
        };}
        tmp[this.whatToRecognize.length] = additionalSymbol;
        this.whatToRecognize = tmp;
    }

    public nullifySymbol2Recognize() {
        this.whatToRecognize = [];
    }

    /**
     * 
     * @param {LexerToken[]} src
     * @param {Matrix} matrix
     */
    initCell00(src: Array<LexerToken>, matrix: Matrix) {
        let t1: number = 0;
        if (matrix.visual != null)t1 = /* nanoTime */(Date.now() * 1000000);
        matrix.initCells(/* size */(<number>src.length));
        if (/* size */(<number>src.length) === 0)return;
        this.initCell(matrix, this.whatToRecognize, 0, null);
        if (matrix.visual != null){
            const t2: number = /* nanoTime */(Date.now() * 1000000);
            matrix.visual.visited[0][0] += (<number>(t2 - t1)|0);
        }
        const LAtoken: LexerToken = /* get */src[0];
    }

    scan$oracle_dbtools_parser_Matrix$java_util_List$long_A(matrix: Matrix, src: Array<LexerToken>, deletedXs: number[]): boolean {
        const y: number = matrix.lastY();
        if (/* size */(<number>src.length) <= y){
            return false;
        }
        if (deletedXs != null){
            for(let index = 0; index < deletedXs.length; index++) {
                let range = deletedXs[index];
                for(let x: number = (range >>> 0); x < Math.floor(range / 0x1_0000_0000); x++) {matrix.allXs = JArray.delete$int_A$int(matrix.allXs, x);}
            }
            deletedXs = null;
        }
        const token: LexerToken = /* get */src[y];
        const tokUpper: string = token.content.toUpperCase();
        const suspect: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'" + tokUpper + "\'");
        let ret: boolean = false;
        for(let i: number = matrix.allXs.length - 1; 0 <= i; i--) {{
            const x: number = matrix.allXs[i];
            if (this.scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer$long_A(matrix, y, src, x, suspect, deletedXs))ret = true;
        };}
        if (this.scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer$long_A(matrix, y, src, y, suspect, deletedXs))ret = true;
        return ret;
    }

    END: number;

    RPAREN: number;

    semi: number;

    public scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer$long_A(matrix: Matrix, y: number, src: Array<LexerToken>, x: number, suspect: number, deletedXs: number[]): boolean {
        let t1: number = 0;
        if (matrix.visual != null)t1 = /* nanoTime */(Date.now() * 1000000);
        let content: number[] = null;
        const candidateRules: Cell = matrix.get(x, y);
        if (candidateRules == null)return false;
        let lookahead: string = null;
        if (y < /* size */(<number>src.length) - 2)lookahead = /* get */src[y + 1].content.toUpperCase();
        for(let j: number = 0; j < candidateRules.size(); j++) {{
            const pos: number = candidateRules.getPosition(j);
            const ruleNo: number = candidateRules.getRule(j);
            const t: Parser.Tuple = this.rules[ruleNo];
            if (t.size() - 1 < pos)continue;
            if (this.isScannedSymbol(y, src, pos, t, suspect)){
                if (pos < t.size() - 2 && !this.lookaheadOK(t.rhs[pos + 1], lookahead))continue;
                const cellElem: number = Parser.makeMatrixCellElem(ruleNo, pos + 1, t);
                content = JArray.insert$long_A$long(content, cellElem);
                if (t.rhs.length === pos + 1)matrix.enqueue((t.head * 0x1_0000_0000 + (x >>> 0)));
            }
        };}
        if (content == null)return false;
        matrix.put(x, y + 1, new Parser.EarleyCell(this, content));
        matrix.allXs = JArray.insert$int_A$int(matrix.allXs, x);
        if (matrix.visual != null){
            const t2: number = /* nanoTime */(Date.now() * 1000000);
            matrix.visual.visited[x][y + 1] += (<number>(t2 - t1)|0);
        }
        return true;
    }

    public scan(matrix?: any, y?: any, src?: any, x?: any, suspect?: any, deletedXs?: any): boolean {
        if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof y === 'number') || y === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof x === 'number') || x === null) && ((typeof suspect === 'number') || suspect === null) && ((deletedXs != null && deletedXs instanceof <any>Array && (deletedXs.length == 0 || deletedXs[0] == null ||(typeof deletedXs[0] === 'number'))) || deletedXs === null)) {
            return <any>this.scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer$long_A(matrix, y, src, x, suspect, deletedXs);
        } else if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof y === 'number') || y === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof x === 'number') || x === null) && ((typeof suspect === 'number') || suspect === null) && deletedXs === undefined) {
            return super.scan(matrix, y, src, x, suspect);
        } else if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((y != null && (y instanceof Array)) || y === null) && ((src != null && src instanceof <any>Array && (src.length == 0 || src[0] == null ||(typeof src[0] === 'number'))) || src === null) && x === undefined && suspect === undefined && deletedXs === undefined) {
            return <any>this.scan$oracle_dbtools_parser_Matrix$java_util_List$long_A(matrix, y, src);
        } else if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((y != null && (y instanceof Array)) || y === null) && src === undefined && x === undefined && suspect === undefined && deletedXs === undefined) {
            return <any>this.scan$oracle_dbtools_parser_Matrix$java_util_List(matrix, y);
        } else throw new Error('invalid overload');
    }

    /*private*/ matchingTerminals: string[];

    getMatchingTerminals(): string[] {
        if (this.matchingTerminals != null)return this.matchingTerminals;
        this.matchingTerminals = (s => { let a=[]; while(s-->0) a.push(null); return a; })(this.allSymbols.length);
        for(let i: number = 0; i < this.allSymbols.length; i++) {{
            const symbol: string = this.allSymbols[i];
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(0)) == '\''.charCodeAt(0))this.matchingTerminals[i] = symbol.substring(1, symbol.length - 1);
        };}
        return this.matchingTerminals;
    }

    /**
     * 
     * @param {number} s
     * @param {string} lookahead
     * @return {boolean}
     */
    lookaheadOK(s: number, lookahead: string): boolean {
        if (lookahead == null)return true;
        const terminal: string = this.getMatchingTerminals()[s];
        if (terminal == null)return true;
        return /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(terminal, lookahead);
    }

    isIdentifier$int$java_util_List$int$java_lang_Integer$boolean(y: number, src: Array<LexerToken>, symbol: number, suspect: number, isJsRule: boolean): boolean {
        return this.isIdentifier$oracle_dbtools_parser_LexerToken$int$java_util_List$int$java_lang_Integer$boolean(/* get */src[y], y, src, symbol, suspect, isJsRule);
    }

    public isIdentifier$oracle_dbtools_parser_LexerToken$int$java_util_List$int$java_lang_Integer$boolean(token: LexerToken, y: number, src: Array<LexerToken>, symbol: number, suspect: number, isJsRule: boolean): boolean {
        if (symbol === this.RegExpLiteral && token.type === Token.REGEXP)return true;
        if (symbol !== this.identifier)return false;
        let prior: LexerToken = null;
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("WHEN", token.content)){
            if (0 < y)prior = /* get */src[y - 1];
            if (prior != null && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("CASE", prior.content)))return false;
            if (y + 1 < /* size */(<number>src.length) && /* get */src[y + 1].type === Token.OPERATION)return true;
            if (0 < y && prior.type === Token.OPERATION)return true;
        }
        if (!isJsRule && suspect != null && /* contains */(this._keywords.indexOf(<any>(suspect)) >= 0)){
            if (0 < y)prior = /* get */src[y - 1];
            if (prior == null || !(":" === prior.content))return false;
        }
        if (isJsRule){
            if (this.isLowerCase(token.content.charAt(0))){
                const suspect1: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'" + token.content.toUpperCase() + "\'");
                if (suspect1 != null && /* contains */(this._JSkeywords.indexOf(<any>(suspect1)) >= 0))return false;
            }
        }
        if (!isJsRule && token.type === Token.DQUOTED_STRING)return true;
        if (token.type !== Token.IDENTIFIER)return false;
        if (suspect == null)return true;
        if (prior == null && 0 < y)prior = /* get */src[y - 1];
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("TO", token.content) && prior != null && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("YEAR", prior.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("HOUR", prior.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("MINUTE", prior.content)))return false;
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("IF", token.content)){
            if (prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("TABLE", prior.content))return false;
        }
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("BY", token.content) && prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("CONNECT", prior.content))return false;
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("CASE", token.content)){
            if (y + 1 < /* size */(<number>src.length) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("WHEN", /* get */src[y + 1].content))return false;
        }
        if (prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("FROM", prior.content))if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("FIRST", token.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("LAST", token.content)){
            let next: LexerToken = null;
            if (y + 1 < /* size */(<number>src.length))next = /* get */src[y + 1];
            if (next != null && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("OVER", next.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("IGNORE", next.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("RESPECT", next.content)))return false;
        }
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("AS", token.content))if (prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("@", prior.content))return false;
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("BETWEEN", token.content)){
            let next: LexerToken = null;
            if (y < /* size */(<number>src.length) - 1)next = /* get */src[y + 1];
            if (next != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("-", next.content))return false;
        }
        return true;
    }

    public isIdentifier(token?: any, y?: any, src?: any, symbol?: any, suspect?: any, isJsRule?: any): boolean {
        if (((token != null && token instanceof <any>LexerToken) || token === null) && ((typeof y === 'number') || y === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof symbol === 'number') || symbol === null) && ((typeof suspect === 'number') || suspect === null) && ((typeof isJsRule === 'boolean') || isJsRule === null)) {
            return <any>this.isIdentifier$oracle_dbtools_parser_LexerToken$int$java_util_List$int$java_lang_Integer$boolean(token, y, src, symbol, suspect, isJsRule);
        } else if (((typeof token === 'number') || token === null) && ((y != null && (y instanceof Array)) || y === null) && ((typeof src === 'number') || src === null) && ((typeof symbol === 'number') || symbol === null) && ((typeof suspect === 'boolean') || suspect === null) && isJsRule === undefined) {
            return <any>this.isIdentifier$int$java_util_List$int$java_lang_Integer$boolean(token, y, src, symbol, suspect);
        } else if (((typeof token === 'number') || token === null) && ((y != null && (y instanceof Array)) || y === null) && ((typeof src === 'number') || src === null) && ((typeof symbol === 'number') || symbol === null) && suspect === undefined && isJsRule === undefined) {
            return super.isIdentifier(token, y, src, symbol);
        } else throw new Error('invalid overload');
    }

    /**
     * 
     * @param {number} y
     * @param {LexerToken[]} src
     * @param {number} pos
     * @param {Parser.Tuple} t
     * @param {number} suspect
     * @return {boolean}
     */
    isScannedSymbol(y: number, src: Array<LexerToken>, pos: number, t: Parser.Tuple, suspect: number): boolean {
        const token: LexerToken = /* get */src[y];
        const symbol: number = t.content(pos);
        if (symbol === this.digits && token.type === Token.DIGITS)return true;
        if (symbol === this.unknown && token.type === Token.UNKNOWN)return true;
        if (symbol === this.string_literal && token.type === Token.BQUOTED_STRING)return true;
        if (symbol === this.string_literal && token.type === Token.QUOTED_STRING)return true;
        if (symbol === this.sqlplus_bindvar){
            if (token.type === Token.IDENTIFIER && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(token.content.charAt(0)) == '&'.charCodeAt(0))return true;
        }
        if (symbol === this.dbtools_lexeme){
            if (token.type === Token.DBTOOLS_COMMAND || token.type === Token.SELECT_AI)return true;
        }
        if (symbol === this.sqlplus_lexeme){
            if (token.type === Token.SQLPLUS_COMMAND)return true;
        }
        if (suspect != null && suspect === symbol)return true;
        const isJsRule: boolean = this.isJsHead != null ? this.isJsHead[t.head] : false;
        if (isJsRule && symbol === this.string_literal && token.type === Token.DQUOTED_STRING)return true;
        if (symbol === this.RegExpLiteral && token.type === Token.REGEXP)return suspect == null || this.notConfusedAsId(suspect, t.head, pos);
        if (symbol !== this.identifier)return false;
        if (!this.isIdentifier$oracle_dbtools_parser_LexerToken$int$java_util_List$int$java_lang_Integer$boolean(token, y, src, symbol, suspect, isJsRule))return false;
        return suspect == null || this.notConfusedAsId(suspect, t.head, pos);
    }

    notConfusedAsId(suspect: number, head: number, pos: number): boolean {
        return (suspect !== this.begin || head !== this.dotted_name && head !== this.decl_id || pos !== 0) && (suspect !== this.start || head !== this.table_reference || pos !== 1) && (suspect !== this.distinct || head !== this.multiset_except || pos !== 3) && (suspect !== this.body || head !== this.pkg_spec || pos !== 1) && (suspect !== this.as || head !== this.table_reference || pos !== 1) && (suspect !== this.ELSE || head !== this.aliased_dml_table_expression_clause || pos !== 1) && (suspect !== this.REPLACE || head !== this.user_defined_types || pos !== 0);
    }

    /*private*/ notOptimizableHeadSymbols: number[];

    public isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple: Parser.Tuple, preSym: number, mid: number, y: number): boolean {
        if (preSym === this.sql_statement && y < mid + 3)return false;
        if (this.notOptimizableHeadSymbols == null){
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.grouping_expression_list);
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.json_object_arg_list);
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.model_expression);
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.arg_star_list);
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.compound_expression);
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("alter_system___0"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("alter_system___1"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("alter_table___0"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("alter_table___2"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("column"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("column_definition"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("column_definition___0#"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("default_clause"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("dotted_expr"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("elsif_clause_opt"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("list_subpartition_desc___0"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("member_condition"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("mining_attribute_clause___3"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("mining_attribute_clause___4"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("nested_table_col_properties___3"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("object_access_expression"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("opaque_format_spec"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("physical_properties"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("pivot_clause___0#"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("simple_comparison_condition"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("table_properties___0"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("row_limiting_clause___6"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("function_call"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("duality_subquery"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("printspec"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("LabeledStatement"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("MemberExpression"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("FunctionExpression"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("formalParameterList"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("AssignmentExpression"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("IfStatement"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("Statement_List1"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("MethodDefinition_List1"));
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("BinaryExpression"));
        }
        const headSym: number = tuple.head;
        const i: number = JArray.indexOf$int_A$int(this.notOptimizableHeadSymbols, headSym);
        if (this.notOptimizableHeadSymbols[i] === headSym)return false;
        if (this.subquery === headSym && tuple.rhs.length === 2 && tuple.rhs[1] === this.getSymbol("row_limiting_clause"))return false;
        return super.isOptimizable$int$int$int$int(headSym, preSym, mid, y);
    }

    /**
     * 
     * @param {Parser.Tuple} tuple
     * @param {number} preSym
     * @param {number} mid
     * @param {number} y
     * @return {boolean}
     */
    public isOptimizable(tuple?: any, preSym?: any, mid?: any, y?: any): boolean {
        if (((tuple != null && tuple instanceof <any>Parser.Tuple) || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple, preSym, mid, y);
        } else if (((tuple != null && (tuple instanceof Array)) || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$java_util_List$int$int$int(tuple, preSym, mid, y);
        } else if (((typeof tuple === 'number') || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$int$int$int$int(tuple, preSym, mid, y);
        } else throw new Error('invalid overload');
    }

    /**
     * 
     * @param {number} ruleHead
     * @return {boolean}
     */
    isAsc(ruleHead: number): boolean {
        return ruleHead === this.getSymbol("sql_statements") || ruleHead === this.getSymbol("subquery") || ruleHead === this.getSymbol("join_clause");
    }

    /**
     * @param {LexerToken[]} src -- input after lexical analysis
     * @return {number} how many tokens were recognized
     */
    public recognize(src: Array<LexerToken>): number {
        const matrix: Matrix = new Matrix(SqlEarley.getInstance());
        this.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        for(let i: number = /* size */(<number>src.length); 0 < i; i--) {{
            const top: Cell = matrix.get(0, i);
            if (top != null)return i;
        };}
        throw Object.defineProperty(new Error("all empty cells?"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public static keywords: string[]; public static keywords_$LI$(): string[] { if (SqlEarley.keywords == null) { SqlEarley.keywords = ["\'WITH\'", "\'SELECT\'", "\'FROM\'", "\'WHERE\'", "\'AND\'", "\'OR\'", "\'NOT\'", "\'DISTINCT\'", "\'UNION\'", "\'ALL\'", "\'ON\'", "\'INSERT\'", "\'UPDATE\'", "\'CREATE\'", "\'ALTER\'", "\'TABLE\'", "\'VALUES\'", "\'VARCHAR2\'", "\'INTEGER\'", "\'WHEN\'"]; }  return SqlEarley.keywords; }

    /*private*/ _keywords: Array<number>;

    /*private*/ _JSkeywords: Array<number>;

    initKeywords() {
        for(let index = 0; index < SqlEarley.keywords_$LI$().length; index++) {
            let k = SqlEarley.keywords_$LI$()[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this._keywords, this.getSymbol(k))
        }
        for(let index = 0; index < JavaScript.keywords_$LI$().length; index++) {
            let k = JavaScript.keywords_$LI$()[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this._JSkeywords, this.getSymbol("\'" + k.toUpperCase() + "\'"))
        }
    }

    public reInitKeywords(replacement: string[]) {
        /* clear */(this._keywords.length = 0);
        for(let index = 0; index < replacement.length; index++) {
            let k = replacement[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this._keywords, this.getSymbol(k))
        }
    }

    /**
     * 
     * @param {ParseNode} ret
     * @param {Parser.EarleyCell} cell
     */
    postprocess(ret: ParseNode, cell: Parser.EarleyCell) {
        if (ret.contains$int(this.subquery) && !ret.contains$int(this.query_block)){
            {
                let array = ret.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    if (child.contains$int(this.query_block))child.deleteContent(this.query_block);
                }
            }
            ret.addContent$int(this.query_block);
        }
        if (ret.contains$int(this.arg_star_list))ret.addContent$int(this.arg_list);
        if (cell != null && !ret.contains$int(this.name_wo_function_call) && !ret.contains$int(this.table)){
            let hasKeyword: boolean = false;
            {
                let array = ret.content$();
                for(let index = 0; index < array.length; index++) {
                    let s = array[index];
                    {
                        if (s < 0)continue;
                        const symbol: string = this.allSymbols[s];
                        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(0)) == '\''.charCodeAt(0))hasKeyword = true;
                    }
                }
            }
            if (!hasKeyword)for(let i: number = 0; i < cell.size(); i++) {{
                const rule: number = cell.getRule(i);
                const pos: number = cell.getPosition(i);
                const tuple: Parser.Tuple = this.rules[rule];
                if (pos < tuple.rhs.length)continue;
                if (tuple.head === this.column){
                    ret.addContent$java_lang_String("column");
                    break;
                }
            };}
        }
    }

    /**
     * 
     * @param {LexerToken[]} src
     * @param {Matrix} m
     * @param {Parser.EarleyCell} cell
     * @param {number} x
     * @param {number} y
     * @return {ParseNode}
     */
    public treeForACell(src: Array<LexerToken>, m: Matrix, cell: Parser.EarleyCell, x: number, y: number): ParseNode {
        let rule: number = -1;
        let pos: number = -1;
        for(let i: number = 0; i < cell.size(); i++) {{
            rule = cell.getRule(i);
            const t: Parser.Tuple = this.rules[rule];
            if (t.head !== this.sql_statements && t.head !== this.select)continue;
            pos = cell.getPosition(i);
            if (this.rules[rule].rhs.length === pos)return this.tree(src, m, x, y, rule, pos);
        };}
        return super.treeForACell(src, m, cell, x, y);
    }

    /**
     * 
     * @param {number} symbol
     * @return {boolean}
     */
    public isAuxNode(symbol: number): boolean {
        return this.where_gby_hier === symbol;
    }

    public static newPartialRecognizer(strings: string[]): SqlEarley {
        throw Object.defineProperty(new Error("Deprecated"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    isOptimizable$java_util_List$int$int$int(src: Array<LexerToken>, x: number, mid: number, y: number): boolean {
        if (4 <= mid && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("SET", /* get */src[mid].content))return false;
        return super.isOptimizable$java_util_List$int$int$int(src, x, mid, y);
    }

    isCompletable(rule: number, src: Array<LexerToken>, x: number, mid: number, y: number): boolean {
        const t: Parser.Tuple = this.rules[rule];
        if (t.head === this.alter || t.head === this.create){
            if (("/" === /* get */src[y - 2].content) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("BEGIN", /* get */src[y - 1].content))return false;
        }
        return super.isCompletable(rule, src, x, mid, y);
    }
}
SqlEarley["__interfaces"] = ["oracle.dbtools.parser.Parseable"];
Yelrae.registerSqlRecognizerFactory(roots => SqlEarley.newPartialRecognizer(roots));


























