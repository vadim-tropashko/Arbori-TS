/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Token } from './Token.js';
import { Lexer } from './Lexer.js';

/**
 * E.g.
 * select * from emp
 * #Tokens=7
 * --------------------------------
 * 0    [0,6) select   <IDENTIFIER>
 * 1    [6,7)          <WS>
 * 2    [7,8) *        <OPERATION>
 * 3    [8,9)          <WS>
 * 4    [9,13) from    <IDENTIFIER>
 * 5    [13,14)        <WS>
 * 6    [14,17) emp    <IDENTIFIER>
 * ^  ^    ^          ^
 * |  |    |         type
 * |  | content
 * |  |
 * |  to
 * from
 * 
 * @param {*} text
 * @param {number} from
 * @param {number} to
 * @param {Token} t
 * @class
 */
export class LexerToken {
    public static readonly __class = "oracle.dbtools.parser.LexerToken";

    public content: string;

    public begin: number;

    public end: number;

    public type: Token;

    public constructor(text: any, from: number, to: number, t: Token) {
        this.content = text.toString();
        this.begin = from;
        this.end = to;
        this.type = t;
    }

    public print() {
        console.info(this.toString());
    }

    public toString(): string {
        return "[" + this.begin + "," + this.end + ") " + this.content + "   <" + this.type + ">";
    }

    public static print$java_util_List(src: Array<LexerToken>) {
        let j: number = 0;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                console.info(j + "    ");
                t.print();
                j++;
            }
        }
    }

    public static print$java_util_List$int$int(src: Array<LexerToken>, from: number, to: number) {
        LexerToken.print$java_util_List$int$int$boolean(src, from, to, false);
    }

    public static print$java_util_List$int$int$boolean(src: Array<LexerToken>, from: number, to: number, toErr: boolean) {
        for(let i: number = from; i < to; i++) {{
            if (toErr)console.error(" " + /* get */src[i].content); else console.info(" " + /* get */src[i].content);
        };}
        if (toErr)console.error(); else console.info();
    }

    public static print(src?: any, from?: any, to?: any, toErr?: any) {
        if (((src != null && (src instanceof Array)) || src === null) && ((typeof from === 'number') || from === null) && ((typeof to === 'number') || to === null) && ((typeof toErr === 'boolean') || toErr === null)) {
            return <any>LexerToken.print$java_util_List$int$int$boolean(src, from, to, toErr);
        } else if (((src != null && (src instanceof Array)) || src === null) && ((typeof from === 'number') || from === null) && ((typeof to === 'number') || to === null) && toErr === undefined) {
            return <any>LexerToken.print$java_util_List$int$int(src, from, to);
        } else if (((src != null && (src instanceof Array)) || src === null) && from === undefined && to === undefined && toErr === undefined) {
            return <any>LexerToken.print$java_util_List(src);
        } else throw new Error('invalid overload');
    }

    public static isSqlPlusCmd: boolean = false;

    static split(input: string, delimiters: string, includeDelimiters: boolean): Array<string> {
        const ret: Array<string> = <any>([]);
        let currentToken: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < input.length; i++) {{
            const c: string = input.charAt(i);
            if (0 <= delimiters.indexOf(c)){
                if (0 < /* length */currentToken.str.length)/* add */(ret.push(/* toString */currentToken.str)>0);
                if (includeDelimiters)/* add */(ret.push(c)>0);
                currentToken = { str: "", toString: function() { return this.str; } };
                continue;
            } else {
                /* append */(sb => { sb.str += <any>c; return sb; })(currentToken);
                continue;
            }
        };}
        if (0 < /* length */currentToken.str.length){
            /* add */(ret.push(/* toString */currentToken.str)>0);
        }
        return ret;
    }

    public static customLineCommentPrefixes: string[]; public static customLineCommentPrefixes_$LI$(): string[] { if (LexerToken.customLineCommentPrefixes == null) { LexerToken.customLineCommentPrefixes = []; }  return LexerToken.customLineCommentPrefixes; }

    public static QuotedStrings: number; public static QuotedStrings_$LI$(): number { if (LexerToken.QuotedStrings == null) { LexerToken.QuotedStrings = Lexer.QuotedStrings; }  return LexerToken.QuotedStrings; }

    public static SqlPlusComments: number; public static SqlPlusComments_$LI$(): number { if (LexerToken.SqlPlusComments == null) { LexerToken.SqlPlusComments = Lexer.SqlPlusComments; }  return LexerToken.SqlPlusComments; }

    public static PlSqlMacros: number; public static PlSqlMacros_$LI$(): number { if (LexerToken.PlSqlMacros == null) { LexerToken.PlSqlMacros = Lexer.PlSqlMacros; }  return LexerToken.PlSqlMacros; }

    public static JavaLineComments: number; public static JavaLineComments_$LI$(): number { if (LexerToken.JavaLineComments == null) { LexerToken.JavaLineComments = Lexer.JavaLineComments; }  return LexerToken.JavaLineComments; }

    public static SqlLineComments: number; public static SqlLineComments_$LI$(): number { if (LexerToken.SqlLineComments == null) { LexerToken.SqlLineComments = Lexer.SqlLineComments; }  return LexerToken.SqlLineComments; }

    public static JavaSqlMultilineComments: number; public static JavaSqlMultilineComments_$LI$(): number { if (LexerToken.JavaSqlMultilineComments == null) { LexerToken.JavaSqlMultilineComments = Lexer.JavaSqlMultilineComments; }  return LexerToken.JavaSqlMultilineComments; }

    public static HtmlComments: number; public static HtmlComments_$LI$(): number { if (LexerToken.HtmlComments == null) { LexerToken.HtmlComments = Lexer.HtmlComments; }  return LexerToken.HtmlComments; }

    public static JsonStrings: number; public static JsonStrings_$LI$(): number { if (LexerToken.JsonStrings == null) { LexerToken.JsonStrings = Lexer.JsonStrings; }  return LexerToken.JsonStrings; }

    public static PoundComments: number; public static PoundComments_$LI$(): number { if (LexerToken.PoundComments == null) { LexerToken.PoundComments = Lexer.PoundComments; }  return LexerToken.PoundComments; }

    public static RegExp: number; public static RegExp_$LI$(): number { if (LexerToken.RegExp == null) { LexerToken.RegExp = Lexer.RegExp; }  return LexerToken.RegExp; }

    public static SQL: number; public static SQL_$LI$(): number { if (LexerToken.SQL == null) { LexerToken.SQL = Lexer.SQL_$LI$(); }  return LexerToken.SQL; }

    public static GRAMMAR: number; public static GRAMMAR_$LI$(): number { if (LexerToken.GRAMMAR == null) { LexerToken.GRAMMAR = Lexer.GRAMMAR_$LI$(); }  return LexerToken.GRAMMAR; }

    public static ARBORI: number; public static ARBORI_$LI$(): number { if (LexerToken.ARBORI == null) { LexerToken.ARBORI = Lexer.ARBORI_$LI$(); }  return LexerToken.ARBORI; }

    public static TEST: number; public static TEST_$LI$(): number { if (LexerToken.TEST == null) { LexerToken.TEST = LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$(); }  return LexerToken.TEST; }

    public static JAVA: number; public static JAVA_$LI$(): number { if (LexerToken.JAVA == null) { LexerToken.JAVA = LexerToken.QuotedStrings_$LI$() + LexerToken.JavaLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$(); }  return LexerToken.JAVA; }

    public static JS: number; public static JS_$LI$(): number { if (LexerToken.JS == null) { LexerToken.JS = LexerToken.JAVA_$LI$() + LexerToken.JsonStrings_$LI$() + LexerToken.RegExp_$LI$() + LexerToken.PoundComments_$LI$(); }  return LexerToken.JS; }

    public static parse$java_lang_String(input: string): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String$boolean(input, false);
    }

    public static parse$java_lang_String$java_lang_String(input: string, extraOper: string): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String$java_lang_String(input, extraOper);
    }

    public static parse$java_lang_String$boolean(input: string, keepWSandCOMMENTS: boolean): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, Lexer.SQL_$LI$());
    }

    public static parse$java_lang_String$boolean$int(input: string, keepWSandCOMMENTS: boolean, flags: number): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, flags);
    }

    public static parse$java_lang_String$java_lang_String$int(input: string, extraOper: string, flags: number): Array<LexerToken> {
        try {
            const ret: Array<LexerToken> = <any>([]);
            new Lexer().doParse$java_lang_String$boolean$int$java_lang_String$java_util_ArrayList(input, false, flags, extraOper, ret);
            return ret;
        } catch(e) {
            throw Object.defineProperty(new Error("parse(...) has been interrupted with lexer.stop=true"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    public static parse(input?: any, extraOper?: any, flags?: any): Array<LexerToken> {
        if (((typeof input === 'string') || input === null) && ((typeof extraOper === 'string') || extraOper === null) && ((typeof flags === 'number') || flags === null)) {
            return <any>LexerToken.parse$java_lang_String$java_lang_String$int(input, extraOper, flags);
        } else if (((typeof input === 'string') || input === null) && ((typeof extraOper === 'boolean') || extraOper === null) && ((typeof flags === 'number') || flags === null)) {
            return <any>LexerToken.parse$java_lang_String$boolean$int(input, extraOper, flags);
        } else if (((typeof input === 'string') || input === null) && ((typeof extraOper === 'string') || extraOper === null) && flags === undefined) {
            return <any>LexerToken.parse$java_lang_String$java_lang_String(input, extraOper);
        } else if (((typeof input === 'string') || input === null) && ((typeof extraOper === 'boolean') || extraOper === null) && flags === undefined) {
            return <any>LexerToken.parse$java_lang_String$boolean(input, extraOper);
        } else if (((typeof input === 'string') || input === null) && extraOper === undefined && flags === undefined) {
            return <any>LexerToken.parse$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    /*private*/ parse(input: string, keepWSandCOMMENTS: boolean, flags: number, extraOper: string, ret: Array<LexerToken>) {
        new Lexer().doParse$java_lang_String$boolean$int$java_lang_String$java_util_ArrayList(input, keepWSandCOMMENTS, flags, extraOper, ret);
    }

    public static incomplete(src: Array<LexerToken>): boolean {
        if (/* size */(<number>src.length) === 0)return false;
        const t: LexerToken = /* get */src[/* size */(<number>src.length) - 1];
        return t.incomplete();
    }

    public incomplete(): boolean {
        if (this.type === Token.QUOTED_STRING && !/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(this.content, "\'") || this.type === Token.DQUOTED_STRING && !/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(this.content, "\"") || this.type === Token.COMMENT && !/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(this.content, "*/"))return true;
        return false;
    }

    public posInsideLiteral(charOffset: number): boolean {
        if (this.type === Token.QUOTED_STRING || this.type === Token.DQUOTED_STRING || this.type === Token.COMMENT)return this.begin + 1 <= charOffset && charOffset <= this.end - 1;
        return false;
    }

    /**
     * Converts character offset into LexerToken position
     * E.g.
     * select * from emp
     * 0    [0,6) select   <IDENTIFIER>
     * 1    [6,7)          <WS>
     * 2    [7,8) *        <OPERATION>
     * 3    [8,9)          <WS>
     * ^     |
     * |     |    scanner2parserOffset(8)==3
     * -----
     * 4    [9,13) from    <IDENTIFIER>
     * 5    [13,14)        <WS>
     * 6    [14,17) emp    <IDENTIFIER>
     * 
     * @param {LexerToken[]} src
     * @param {number} start
     * @return {number}
     */
    public static scanner2parserOffset(src: Array<LexerToken>, start: number): number {
        let offset: number = -1;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                offset++;
                if (t.end > start)break;
            }
        }
        return offset;
    }

    public static getTokenAtCharOffset(src: Array<LexerToken>, offset: number): LexerToken {
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                if (t.begin <= offset && offset <= t.end)return t;
                if (offset <= t.begin)return t;
            }
        }
        throw Object.defineProperty(new Error("VT: offset = " + offset), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
    }

    public static char2lex$java_util_List$int(src: Array<LexerToken>, offset: number): number {
        return LexerToken.char2lex$java_util_List$int$boolean(src, offset, false);
    }

    public static char2lex$java_util_List$int$boolean(src: Array<LexerToken>, offset: number, strict: boolean): number {
        if (/* size */(<number>src.length) === 0)return 0;
        let pos: number = -1;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                pos++;
                if (t.begin <= offset && offset < t.end || !strict && t.begin <= offset && offset === t.end)return pos;
                if (offset <= t.begin)return pos;
            }
        }
        return pos + 1;
    }

    public static char2lex(src?: any, offset?: any, strict?: any): number {
        if (((src != null && (src instanceof Array)) || src === null) && ((typeof offset === 'number') || offset === null) && ((typeof strict === 'boolean') || strict === null)) {
            return <any>LexerToken.char2lex$java_util_List$int$boolean(src, offset, strict);
        } else if (((src != null && (src instanceof Array)) || src === null) && ((typeof offset === 'number') || offset === null) && strict === undefined) {
            return <any>LexerToken.char2lex$java_util_List$int(src, offset);
        } else throw new Error('invalid overload');
    }

    /**
     * Helper "divide and concur"
     * @param x start of progressively narrowing range
     * @param y end
     * @param offset
     * @return
     * 
     * private static int indexOf( List<LexerToken> src, int x,int y, int offset ) {
     * //System.out.println("x="+x);
     * //System.out.println("y="+y);
     * //System.out.println("offset="+offset);
     * if( x == y )
     * throw new AssertionError("x == y (== "+x+")");
     * if( x+1 == y ) {
     * LexerToken l1 = src.get(x);
     * if( l1.begin <= offset && offset < l1.end )
     * return x;
     * else {
     * LexerToken l2 = src.get(y);
     * if( l2.begin <= offset && offset < l2.end )
     * return y;
     * throw new AssertionError(x);
     * }
     * }
     * int mid = (x+y)/2;
     * if( offset < src.get(mid).begin )
     * return indexOf(src, x,mid, offset);
     * else
     * return indexOf(src, mid,y, offset);
     * }
     * @param {string} ch
     * @return {string}
     * @private
     */
    /*private*/ static matchingDelimiter(ch: string): string {
        if ('<'.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return '>'; else if ('['.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return ']'; else if ('{'.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return '}'; else if ('('.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return ')'; else return ch;
    }

    isStandardLiteral$(): boolean {
        return this.isStandardLiteral$int(Lexer.SQL_$LI$());
    }

    public isStandardLiteral$int(flags: number): boolean {
        if (this.content.length < 2)return false;
        if (!((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == '\''.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'N'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'u'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'U'.charCodeAt(0)))return false;
        let text: string = this.content;
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(0)) == 'n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(0)) == 'N'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(0)) == 'u'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(0)) == 'U'.charCodeAt(0)){
            if (text.length < 3)return false;
            text = text.substring(1);
        }
        if (text.length < 2)return false;
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(0)) == '\''.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(text.length - 1)) == '\''.charCodeAt(0) && (flags !== Lexer.JS_$LI$() || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(text.length - 2)) != '\\'.charCodeAt(0) || text.length < 3 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(text.length - 3)) == '\\'.charCodeAt(0));
    }

    public isStandardLiteral(flags?: any): boolean {
        if (((typeof flags === 'number') || flags === null)) {
            return <any>this.isStandardLiteral$int(flags);
        } else if (flags === undefined) {
            return <any>this.isStandardLiteral$();
        } else throw new Error('invalid overload');
    }

    isAltLiteral(): boolean {
        if (this.content.length < 5)return false;
        if (!((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'q'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'Q'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'N'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'u'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'U'.charCodeAt(0)))return false;
        let text: string = this.content;
        if (((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'N'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'u'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'U'.charCodeAt(0)) && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(1)) == 'q'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(1)) == 'Q'.charCodeAt(0))){
            if (text.length < 6)return false;
            text = text.substring(2);
        } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'q'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'Q'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'u'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.content.charAt(0)) == 'U'.charCodeAt(0)){
            text = text.substring(1);
        } else return false;
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(0)) == '\''.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(text.length - 1)) == '\''.charCodeAt(0))text = text.substring(1, text.length - 1); else return false;
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(LexerToken.matchingDelimiter(text.charAt(0))) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(text.charAt(text.length - 1));
    }

    /**
     * Shifts all tokens (i.e. increments all intervals) in src by offset
     * Typical usage includes a parsed fragment inside a larger fragment
     * where offset is the beginning of the fragment (in lexer units)
     * @param {LexerToken[]} src
     * @param {number} offset
     */
    public static moveInterval(src: Array<LexerToken>, offset: number) {
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                t.begin += offset;
                t.end += offset;
            }
        }
    }

    public static equals(cmp1: string, cmp2: string): boolean {
        const src1: Array<LexerToken> = Lexer.parse$java_lang_String(cmp1);
        const src2: Array<LexerToken> = Lexer.parse$java_lang_String(cmp2);
        if (/* size */(<number>src1.length) !== /* size */(<number>src2.length))return false;
        for(let j: number = 0; j < /* size */(<number>src1.length); j++) {{
            let content1: string = /* get */src1[j].content;
            let content2: string = /* get */src2[j].content;
            content1 = LexerToken.normalizeDbName(content1);
            content2 = LexerToken.normalizeDbName(content2);
            if (!(content1 === content2)){
                return false;
            }
        };}
        return true;
    }

    public static matchOneException(src1: Array<LexerToken>, src2: Array<LexerToken>, skip: number): boolean {
        if (/* size */(<number>src1.length) !== /* size */(<number>src2.length))return false;
        for(let j: number = 0; j < /* size */(<number>src1.length); j++) {{
            if (j === skip)continue;
            let content1: string = /* get */src1[j].content;
            let content2: string = /* get */src2[j].content;
            content1 = LexerToken.normalizeDbName(content1);
            content2 = LexerToken.normalizeDbName(content2);
            if (!(content1 === content2)){
                return false;
            }
        };}
        return true;
    }

    /**
     * Check if list of tokens src has subsequence subseq
     * For example, "select * from sys.obj$" has subseq: new String[]{"sys","."}
     * @param {LexerToken[]} src
     * @param {java.lang.String[]} subseq
     * @return
     * @return {boolean}
     */
    public static contains(src: Array<LexerToken>, subseq: string[]): boolean {
        return 0 <= LexerToken.indexOf(src, subseq);
    }

    public static indexOf(src: Array<LexerToken>, subseq: string[]): number {
        OUTER: for(let j: number = 0; j <= /* size */(<number>src.length) - subseq.length; j++) {{
            for(let i: number = 0; i < subseq.length; i++) {{
                if (!/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(/* get */src[i + j].content, subseq[i]))continue OUTER;
            };}
            return j;
        };}
        return -1;
    }

    private static normalizeDbName(name: string): string {
        return Lexer.parse(name, true).map(token => token.type === Token.DQUOTED_STRING
            ? token.content.length > 1 ? token.content.substring(1, token.content.length - 1) : token.content
            : token.content.toUpperCase()).join("");
    }

}
