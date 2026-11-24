/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../arbori/util/Service.js';
import { Cell } from '../Cell.js';
import { Earley } from '../Earley.js';
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { Matrix } from '../Matrix.js';
import { RecognizedRule } from '../RecognizedRule.js';
import { Token } from '../Token.js';
import { HarvestDoc } from './doc/HarvestDoc.js';

/**
 * SQL syntax analysis with user friendly error messages
 * see: SyntaxError.main() for example usage
 * @author Dim
 * @extends Error
 * @class
 */
export class SyntaxError {
    static __static_initialized: boolean = false;
    static __static_initialize() { if (!SyntaxError.__static_initialized) { SyntaxError.__static_initialized = true; SyntaxError.__static_initializer_0(); } }

    public line: number;

    public offset: number;

    public end: number;

    public code: string;

    public marker: string;

    public detailedMessageKey: string;

    /*private*/ weightedRules: Array<RecognizedRule>;

    /*private*/ earley: Earley;

    public matrix: Matrix;

    static TITLE: string = "Syntax Error";

    static MESSAGE_KEY: string = "SyntaxError_Message";

    static  __static_initializer_0() {
        try {
        } catch(e) {
        }
    }

    public static checkSQLQuerySyntax$java_lang_String(input: string): SyntaxError {
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A(input, ["subquery", "select", "sql_statement"]);
    }

    public static checkSQLQuerySyntax$java_lang_String$java_lang_String$java_lang_String(input: string, marker: string, format: string): SyntaxError {
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_lang_String$java_lang_String(input, ["subquery", "select", "sql_statement"], marker, format);
    }

    public static checkSQLQuerySyntax(input?: any, marker?: any, format?: any): SyntaxError {
        if (((typeof input === 'string') || input === null) && ((typeof marker === 'string') || marker === null) && ((typeof format === 'string') || format === null)) {
            return <any>SyntaxError.checkSQLQuerySyntax$java_lang_String$java_lang_String$java_lang_String(input, marker, format);
        } else if (((typeof input === 'string') || input === null) && marker === undefined && format === undefined) {
            return <any>SyntaxError.checkSQLQuerySyntax$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    public static checkSQLStatementSyntax$java_lang_String(input: string): SyntaxError {
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A(input, ["sql_statements"]);
    }

    public static checkSQLStatementSyntax$java_lang_String$java_lang_String$java_lang_String(input: string, marker: string, format: string): SyntaxError {
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_lang_String$java_lang_String(input, ["sql_statements"], marker, format);
    }

    public static checkSQLStatementSyntax(input?: any, marker?: any, format?: any): SyntaxError {
        if (((typeof input === 'string') || input === null) && ((typeof marker === 'string') || marker === null) && ((typeof format === 'string') || format === null)) {
            return <any>SyntaxError.checkSQLStatementSyntax$java_lang_String$java_lang_String$java_lang_String(input, marker, format);
        } else if (((typeof input === 'string') || input === null) && marker === undefined && format === undefined) {
            return <any>SyntaxError.checkSQLStatementSyntax$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    public static checkSingleStatement(input: string): SyntaxError {
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A(input, ["sql_statement", "select", "insert", "update", "delete", "merge"]);
    }

    public getSuggestions(): string[] {
        const ret: Array<string> = <any>([]);
        {
            let array = this.topNsuggestions();
            for(let index = 0; index < array.length; index++) {
                let s = array[index];
                {
                    const candidate: string = this.earley.allSymbols[Service.lX(s)];
                    if (/* contains */(ret.indexOf(<any>(candidate)) >= 0))continue;
                    if (0 < candidate.indexOf('['))continue;
                    /* add */(ret.push(candidate)>0);
                }
            }
        }
        return /* toArray */ret.slice(0);
    }

    public static checkSyntax$java_lang_String$java_lang_String_A(input: string, grammarSymbols: string[]): SyntaxError {
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_lang_String$java_lang_String(input, grammarSymbols, "^^^", "SyntaxError_DetailedMessage");
    }

    /*private*/ static checkSyntax$java_lang_String$java_lang_String_A$java_lang_String$java_lang_String(input: string, grammarSymbols: string[], marker: string, format: string): SyntaxError {
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        const earley: Earley = SqlEarley.partialRecognizer();
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$java_lang_String$java_lang_String(input, grammarSymbols, src, earley, matrix, marker, format);
    }

    public static checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input: string, grammarSymbols: string[], src: Array<LexerToken>, earley: Earley, matrix: Matrix): SyntaxError {
        return SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$java_lang_String$java_lang_String(input, grammarSymbols, src, earley, matrix, "^^^", "SyntaxError_DetailedMessage");
    }

    public static checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$java_lang_String$java_lang_String(input: string, grammarSymbols: string[], src: Array<LexerToken>, earley: Earley, matrix: Matrix, marker: string, format: string): SyntaxError {
        if (/* size */(<number>src.length) === 0)return null;
        const top: Cell = matrix.get(0, /* size */(<number>src.length));
        if (top != null){
            for(let index = 0; index < grammarSymbols.length; index++) {
                let s = grammarSymbols[index];
                {
                    for(let i: number = 0; i < top.size(); i++) {{
                        const tuple: Parser.Tuple = earley.rules[top.getRule(i)];
                        const candidate: string = earley.allSymbols[tuple.head];
                        // A root rule name in the full-span cell is insufficient: the
                        // parser also stores unfinished Earley states there. Treat the
                        // input as accepted only when that root production is complete.
                        if (candidate === s && top.getPosition(i) === tuple.rhs.length)return null;
                    };}
                }
            }
        }
        const maxY: number = matrix.lastY();
        let end: number = 0;
        if (0 < maxY)end = /* get */src[maxY - 1].end;
        let line: number = 0;
        let beginLinePos: number = 0;
        let endLinePos: number = input.length;
        for(let i: number = 0; i < endLinePos; i++) {{
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(i)) == '\n'.charCodeAt(0)){
                if (i < end){
                    line++;
                    beginLinePos = i;
                } else {
                    endLinePos = i;
                    break;
                }
            }
        };}
        const code: string = input.substring(beginLinePos, endLinePos);
        const offset: number = end - beginLinePos;
        let token: LexerToken = null;
        let maybePrefix: boolean = false;
        if (maxY < /* size */(<number>src.length))token = /* get */src[maxY]; else if (maxY === /* size */(<number>src.length)){
            token = /* get */src[maxY - 1];
            maybePrefix = true;
        }
        let rules: Array<RecognizedRule> = <any>([]);
        SyntaxError.pendingRules$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$int$oracle_dbtools_parser_LexerToken$java_util_List(earley, matrix, maxY, null, rules);
        if (maybePrefix)SyntaxError.pendingRules$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$int$oracle_dbtools_parser_LexerToken$java_util_List(earley, matrix, maxY - 1, token, rules);
        for(let index = 0; index < rules.length; index++) {
            let rp = rules[index];
            {
                const s: number = SyntaxError.parentChildSymbols(rp, earley);
                const ss: string = earley.allSymbols[Service.lX(s)];
                if (SyntaxError.isTypo(ss, token)){
                    rules = <any>([]);
                    /* add */(rules.push(rp)>0);
                    return new SyntaxError(line, offset, token.begin, code, Service.identln$int$java_lang_String(offset, marker), rules, earley, matrix, format);
                }
            }
        }
        return new SyntaxError(line, offset, end, code, Service.identln$int$java_lang_String(offset, marker), rules, earley, matrix, format);
    }

    public static checkSyntax(input?: any, grammarSymbols?: any, src?: any, earley?: any, matrix?: any, marker?: any, format?: any): SyntaxError {
        if (((typeof input === 'string') || input === null) && ((grammarSymbols != null && grammarSymbols instanceof <any>Array && (grammarSymbols.length == 0 || grammarSymbols[0] == null ||(typeof grammarSymbols[0] === 'string'))) || grammarSymbols === null) && ((src != null && (src instanceof Array)) || src === null) && ((earley != null && earley instanceof <any>Earley) || earley === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof marker === 'string') || marker === null) && ((typeof format === 'string') || format === null)) {
            return <any>SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$java_lang_String$java_lang_String(input, grammarSymbols, src, earley, matrix, marker, format);
        } else if (((typeof input === 'string') || input === null) && ((grammarSymbols != null && grammarSymbols instanceof <any>Array && (grammarSymbols.length == 0 || grammarSymbols[0] == null ||(typeof grammarSymbols[0] === 'string'))) || grammarSymbols === null) && ((src != null && (src instanceof Array)) || src === null) && ((earley != null && earley instanceof <any>Earley) || earley === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && marker === undefined && format === undefined) {
            return <any>SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, grammarSymbols, src, earley, matrix);
        } else if (((typeof input === 'string') || input === null) && ((grammarSymbols != null && grammarSymbols instanceof <any>Array && (grammarSymbols.length == 0 || grammarSymbols[0] == null ||(typeof grammarSymbols[0] === 'string'))) || grammarSymbols === null) && ((typeof src === 'string') || src === null) && ((typeof earley === 'string') || earley === null) && matrix === undefined && marker === undefined && format === undefined) {
            return <any>SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_lang_String$java_lang_String(input, grammarSymbols, src, earley);
        } else if (((typeof input === 'string') || input === null) && ((grammarSymbols != null && grammarSymbols instanceof <any>Array && (grammarSymbols.length == 0 || grammarSymbols[0] == null ||(typeof grammarSymbols[0] === 'string'))) || grammarSymbols === null) && src === undefined && earley === undefined && matrix === undefined && marker === undefined && format === undefined) {
            return <any>SyntaxError.checkSyntax$java_lang_String$java_lang_String_A(input, grammarSymbols);
        } else throw new Error('invalid overload');
    }

    public static pendingRules$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$int(earley: Earley, matrix: Matrix, y: number): Array<RecognizedRule> {
        const rules: Array<RecognizedRule> = <any>([]);
        SyntaxError.pendingRules$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$int$oracle_dbtools_parser_LexerToken$java_util_List(earley, matrix, y, null, rules);
        return rules;
    }

    static prefixFactor: number = 100;

    public static pendingRules$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$int$oracle_dbtools_parser_LexerToken$java_util_List(earley: Earley, matrix: Matrix, y: number, token: LexerToken, rules: Array<RecognizedRule>) {
        if (y < 0)return;
        for(let x: number = 0; x <= y; x++) {{
            const cell: Cell = matrix.get(x, y);
            if (cell != null){
                for(let i: number = 0; i < cell.size(); i++) {{
                    const rule: number = cell.getRule(i);
                    const pos: number = cell.getPosition(i);
                    const t: Parser.Tuple = earley.rules[rule];
                    if (pos < t.rhs.length){
                        const symbol: string = earley.allSymbols[t.rhs[pos]];
                        if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(symbol, "xml")){
                            const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(t.rhs.length);
                            for(let j: number = 0; j < rhs.length; j++) {rhs[j] = earley.allSymbols[t.rhs[j]];}
                            if (token == null){
                                const r: RecognizedRule = new RecognizedRule(earley.allSymbols[t.head], rhs, pos, x, y, 1);
                                if (!r.isRedundant(rules))/* add */(rules.push(r)>0);
                            } else if (token.type === Token.IDENTIFIER && earley.isTerminal(earley.rules[rule].rhs[pos]) && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(symbol.substring(1).toUpperCase(), token.content.toUpperCase()) && symbol.length !== token.content.length + 2){
                                const r: RecognizedRule = new RecognizedRule(earley.allSymbols[t.head], rhs, pos, x, y, token.content.length * SyntaxError.prefixFactor);
                                if (!r.isRedundant(rules))/* add */(rules.push(r)>0);
                            }
                        }
                    }
                };}
            }
        };}
    }

    public static pendingRules(earley?: any, matrix?: any, y?: any, token?: any, rules?: any) {
        if (((earley != null && earley instanceof <any>Earley) || earley === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof y === 'number') || y === null) && ((token != null && token instanceof <any>LexerToken) || token === null) && ((rules != null && (rules instanceof Array)) || rules === null)) {
            return <any>SyntaxError.pendingRules$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$int$oracle_dbtools_parser_LexerToken$java_util_List(earley, matrix, y, token, rules);
        } else if (((earley != null && earley instanceof <any>Earley) || earley === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof y === 'number') || y === null) && token === undefined && rules === undefined) {
            return <any>SyntaxError.pendingRules$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix$int(earley, matrix, y);
        } else throw new Error('invalid overload');
    }

    /*private*/ static isTypo(symbol: string, token: LexerToken): boolean {
        if (token == null || token.begin + 1 === token.end || token.begin + 2 === token.end)return false;
        const candidate: string = "\'" + token.content.toUpperCase() + "\'";
        if (symbol.length + 1 === candidate.length || symbol.length === candidate.length + 1 || symbol.length === candidate.length){
            let matched: number = 0;
            let brokenAt: number = -1;
            for(let i: number = 0; i < symbol.length && i < candidate.length; i++) {{
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(i)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(candidate.charAt(i)))matched++; else {
                    brokenAt = i;
                    break;
                }
            };}
            if (brokenAt + 1 < symbol.length && brokenAt + 1 < candidate.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(brokenAt + 1)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(candidate.charAt(brokenAt + 1)))for(let i: number = brokenAt + 1; i < symbol.length && i < candidate.length; i++) {{
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(i)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(candidate.charAt(i)))matched++; else break;
            };} else if (brokenAt + 1 < symbol.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(brokenAt + 1)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(candidate.charAt(brokenAt)))for(let i: number = brokenAt; i + 1 < symbol.length && i < candidate.length; i++) {{
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(i + 1)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(candidate.charAt(i)))matched++; else break;
            };} else if (brokenAt + 1 < candidate.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(brokenAt)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(candidate.charAt(brokenAt + 1)))for(let i: number = brokenAt; i < symbol.length && i + 1 < candidate.length; i++) {{
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(i)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(candidate.charAt(i + 1)))matched++; else break;
            };}
            if (matched === symbol.length - 1 || matched === candidate.length - 1)return true;
        }
        return false;
    }

    constructor(line: number, offset: number, end: number, code: string, marker: string, rules: Array<RecognizedRule>, earley: Earley, matrix: Matrix, format: string) {
        (<any>Object).setPrototypeOf(this, SyntaxError.prototype);
        if (this.line === undefined) { this.line = 0; }
        if (this.offset === undefined) { this.offset = 0; }
        if (this.end === undefined) { this.end = 0; }
        if (this.code === undefined) { this.code = null; }
        this.marker = "^^^";
        this.detailedMessageKey = "SyntaxError_DetailedMessage";
        if (this.weightedRules === undefined) { this.weightedRules = null; }
        if (this.earley === undefined) { this.earley = null; }
        if (this.matrix === undefined) { this.matrix = null; }
        this.line = line;
        this.offset = offset;
        this.end = end;
        this.code = code;
        this.marker = marker;
        this.earley = earley;
        this.detailedMessageKey = format;
        this.matrix = matrix;
        this.weightedRules = <any>([]);
        let i: number = -1;
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                if ((!(earley != null && earley instanceof <any>SqlEarley) || !("\'{\'" === (r.rhs[0]))) && !r.isRedundant(rules))/* add */(this.weightedRules.push(r)>0);
                i++;
                if (100 < i)break;
            }
        }
        /* sort */((l,c) => { if((<any>c).compare) l.sort((e1,e2)=>(<any>c).compare(e1,e2)); else l.sort(<any>c); })(this.weightedRules,new SyntaxError.SyntaxError$0(this));
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return this.getDetailedMessage();
    }

    public getDetailedMessage(): string {
        const pointer: string = Service.padln(this.marker, this.code.length);
        const allSuggestions: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        const ret: Array<string> = <any>([]);
        {
            let array = this.topNsuggestions();
            for(let index = 0; index < array.length; index++) {
                let s = array[index];
                {
                    const candidate: string = this.earley.allSymbols[Service.lX(s)];
                    if (/* contains */(ret.indexOf(<any>(candidate)) >= 0))continue;
                    if (0 < candidate.indexOf('['))continue;
                    /* add */(ret.push(candidate)>0);
                    /* append */(sb => { sb.str += <any>candidate + ','; return sb; })(allSuggestions);
                }
            }
        }
        let suggestions: string = /* toString */allSuggestions.str;
        if (60 < suggestions.length)suggestions = suggestions.substring(0, 50);
        return "Syntax Error at line " + (this.line + 1) + ", column " + this.offset + "\n\n" + this.code + "\n" + pointer + "\nExpected: " + suggestions + "\n";
    }

    /**
     * 
     * @return {string}
     */
    public getMessage(): string {
        return this.getDetailedMessage();
    }

    public getTitle(): string {
        return SyntaxError.TITLE;
    }

    public topNsuggestions(): Array<number> {
        // Java uses TreeMap<Long, Integer>; keep its key ordering for stable
        // tie-breaking when equal-frequency suggestions are ranked.
        const topN = new Map<number, number>();
        const N: number = 10;
        for(let index = 0; index < this.weightedRules.length; index++) {
            let rp = this.weightedRules[index];
            {
                let minVar: number = -1;
                let minVal: number = 2147483647;
                for (const s of [...topN.keys()].sort((a, b) => a - b)) {
                    const tmp = topN.get(s)!;
                    if (tmp < minVal){
                        minVar = s;
                        minVal = tmp;
                    }
                }
                const suggestedVar: number = SyntaxError.parentChildSymbols(rp, this.earley);
                const candidate: string = this.earley.allSymbols[Service.lX(suggestedVar)];
                if (0 < candidate.indexOf("___"))continue;
                if (0 === candidate.indexOf("\""))continue;
                if (this.hasParent(topN, this.earley.allSymbols[Service.lY(suggestedVar)]))continue;
                let suggestedVal: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.getFrequencies(), suggestedVar);
                if (suggestedVal == null)suggestedVal = 0;
                if (topN.size === N){
                    if (suggestedVal != null && minVal < suggestedVal){
                        topN.delete(minVar);
                        topN.set(suggestedVar, suggestedVal);
                    }
                } else topN.set(suggestedVar, suggestedVal);
            }
        }
        const myList = [...topN.entries()].sort((a, b) => a[0] - b[0]);
        myList.sort((a, b) => b[1] - a[1]);
        const ret: Array<number> = <any>([]);
        let i: number = 0;
        for(let index = 0; index < myList.length; index++) {
            let e = myList[index];
            {
                if (N < i)break;
                /* add */(ret.push(e[0])>0);
                i++;
            }
        }
        return ret;
    }

    hasParent(topN: Map<number, number>, cmp: string): boolean {
        for (const l of topN.keys()) {
            if (cmp === this.earley.allSymbols[Service.lY(l)]){
                return true;
            }
        }
        return false;
    }

    public topNrules$int$boolean(N: number, excludeAux: boolean): Array<RecognizedRule> {
        return this.topNrules$int$boolean$java_lang_String(N, excludeAux, null);
    }

    public static prefixWeight: number = 1000;

    public static progressionWeight: number = 100;

    public topNrules$int$boolean$java_lang_String(N: number, excludeAux: boolean, prefix: string): Array<RecognizedRule> {
        const ret: Array<RecognizedRule> = <any>([]);
        for(let index = 0; index < this.weightedRules.length; index++) {
            let rp = this.weightedRules[index];
            {
                if (excludeAux && 0 < rp.head.indexOf('['))continue;
                if (prefix != null){
                    const current: string = rp.rhs[rp.pos].toLowerCase();
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(current, '\'' + prefix.toLowerCase())){
                        rp.weight *= SyntaxError.prefixWeight * prefix.length;
                        /* add */(ret.push(rp)>0);
                        continue;
                    }
                }
                /* add */(ret.push(rp)>0);
            }
        }
        /* sort */((l,c) => { if((<any>c).compare) l.sort((e1,e2)=>(<any>c).compare(e1,e2)); else l.sort(<any>c); })(ret,new SyntaxError.SyntaxError$2(this));
        if (/* size */(<number>ret.length) <= N)return ret;
        return /* subList */ret.slice(0, N);
    }

    public topNrules(N?: any, excludeAux?: any, prefix?: any): Array<RecognizedRule> {
        if (((typeof N === 'number') || N === null) && ((typeof excludeAux === 'boolean') || excludeAux === null) && ((typeof prefix === 'string') || prefix === null)) {
            return <any>this.topNrules$int$boolean$java_lang_String(N, excludeAux, prefix);
        } else if (((typeof N === 'number') || N === null) && ((typeof excludeAux === 'boolean') || excludeAux === null) && prefix === undefined) {
            return <any>this.topNrules$int$boolean(N, excludeAux);
        } else throw new Error('invalid overload');
    }

    /*private*/ static parentChildSymbols(rp: RecognizedRule, earley: Earley): number {
        const entry: number = Service.lPair(/* get */((m,k) => m[k]===undefined?null:m[k])(earley.symbolIndexes, rp.rhs[rp.pos]), /* get */((m,k) => m[k]===undefined?null:m[k])(earley.symbolIndexes, rp.head));
        return entry;
    }

    /**
     * Example usage
     * @param {java.lang.String[]} args
     * @throws Exception
     */
    public static main(args: string[]) {
        const input: string = "--dbtools-dev[system]\nSELECT * FROM HR.EMPLOY";
        const ret: SyntaxError = SyntaxError.checkSQLStatementSyntax$java_lang_String(input);
        console.info(ret.getDetailedMessage());
        console.info("-----------------------------");
        {
            let array = ret.topNrules$int$boolean(3, true);
            for(let index = 0; index < array.length; index++) {
                let rr = array[index];
                {
                    console.info(rr.toString());
                }
            }
        }
    }
}
SyntaxError["__class"] = "oracle.dbtools.parser.plsql.SyntaxError";


export namespace SyntaxError {

    export class SyntaxError$0 {
        public __parent: any;
        /**
         * 
         * @param {RecognizedRule} o1
         * @param {RecognizedRule} o2
         * @return {number}
         */
        public compare(o1: RecognizedRule, o2: RecognizedRule): number {
            return (o2.weight - o1.weight > 0) ? 1 : (o2.weight - o1.weight < 0) ? -1 : 0;
        }

        constructor(__parent: any) {
            this.__parent = __parent;
        }
    }


    export class SyntaxError$1 {
        public __parent: any;
        public compare(a: { getValue(): any }, b: { getValue(): any }): number {
            return /* compareTo */(<any>((o1: any, o2: any) => { if (o1 && o1.compareTo) { return o1.compareTo(o2); } else { return o1 < o2 ? -1 : o2 < o1 ? 1 : 0; } })((<number>b.getValue()),<number>a.getValue()));
        }

        constructor(__parent: any) {
            this.__parent = __parent;
        }
    }


    export class SyntaxError$2 {
        public __parent: any;
        /**
         * 
         * @param {RecognizedRule} o1
         * @param {RecognizedRule} o2
         * @return {number}
         */
        public compare(o1: RecognizedRule, o2: RecognizedRule): number {
            return (o2.weight - o1.weight > 0) ? 1 : (o2.weight - o1.weight < 0) ? -1 : 0;
        }

        constructor(__parent: any) {
            this.__parent = __parent;
        }
    }

}




SyntaxError.__static_initialize();

import { Parser } from '../Parser.js';


import { SqlEarley } from './SqlEarley.js';
