/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from './Lexer.js';
import { Token } from './Token.js';
import { ParsingCancelled } from './ParsingCancelled.js';
import { LexerToken } from './LexerToken.js';

/**
 * Do lexical analysis backwards
 * Useful for inputs with broken syntax, e.g. having quote or comment closing delimiter missing
 * @author Dim
 * @class
 */
export class Rexel {
    public static readonly __class = "oracle.dbtools.parser.Rexel";

    /*private*/ __stop: boolean;

    /*private*/ tokenize(sourceExpr: string, flags: number, extraOper: string): Array<LexerToken> {
        this.__stop = false;
        const ret: Array<LexerToken> = <any>([]);
        const operation: string = "(){}[]^-|!*+.><=\'\",;:%@?/\\#~" + extraOper;
        const ws: string = " \n\r\t";
        let pos: number = sourceExpr.length;
        let commentedTokens: Array<LexerToken> = <any>([]);
        const tokens: Array<string> = LexerToken.split(sourceExpr, operation + ws, true);
        for(let i: number = /* size */(<number>tokens.length) - 1; 0 <= i; i--) {{
            if (this.__stop){
                this.__stop = false;
                throw new ParsingCancelled();
            }
            const token: string = /* get */tokens[i];
            pos -= token.length;
            let last: LexerToken | null = null;
            if (/* size */(<number>ret.length) > 0)last = ret[0];
            if (0 < /* size */(<number>commentedTokens.length) && (token === ("\n")))commentedTokens = <any>([]);
            if (("-" === token) && last != null && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "-") && last.type !== Token.COMMENT){
                let eol: number = pos;
                for(; 0 < /* size */(<number>ret.length); ) {{
                    const first: LexerToken = ret[0];
                    eol = first.end;
                    const nlPos: number = Math.max(first.content.indexOf('\n'), first.content.indexOf('\r'));
                    if (nlPos < 0){
                        const rem: LexerToken = /* removeFirst */ret.splice(0, 1)[0];
                        if (/* size */(<number>commentedTokens.length) === 0 || commentedTokens[0].end === rem.begin)/* addFirst */commentedTokens.unshift(rem);
                    } else {
                        eol = first.begin + nlPos;
                        break;
                    }
                };}
                /* addFirst */ret.unshift(new LexerToken(sourceExpr.substring(pos, eol), pos, eol, Token.LINE_COMMENT));
                continue;
            }
            if (last != null && last.type === Token.COMMENT && (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "/*") || (last.content === ("/*/")))){
                if (("*" === token) || ("/" === token))last.content = token + last.content; else last.content = " ... */";
                last.begin = pos;
                if (last != null && last.type === Token.COMMENT && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, "*/") && !(last.content === ("/*/"))){
                    last.content = sourceExpr.substring(last.begin, last.end);
                }
                continue;
            }
            if (last != null && last.type === Token.QUOTED_STRING && !(last.isStandardLiteral$() || last.isAltLiteral())){
                last.content = token + last.content;
                last.begin = last.end - last.content.length;
                continue;
            }
            if (last != null && last.type === Token.DQUOTED_STRING && !("\"" === token) && !(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "\"") && last.content.length > 1)){
                last.begin = pos;
                last.content = sourceExpr.substring(last.begin, last.end);
                continue;
            }
            if (last != null && last.type === Token.DQUOTED_STRING && ("\"" === token)){
                last.begin = pos;
                last.content = sourceExpr.substring(last.begin, last.end);
                continue;
            }
            if (last != null && last.type === Token.BQUOTED_STRING && !("`" === token) && !(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "`") && last.content.length > 1)){
                continue;
            }
            if (last != null && last.type === Token.BQUOTED_STRING && ("`" === token)){
                last.begin = pos;
                last.content = sourceExpr.substring(last.begin, last.end);
                continue;
            }
            if ((flags & Lexer.JavaSqlMultilineComments) === Lexer.JavaSqlMultilineComments && ("*" === token) && last != null && ("/" === last.content)){
                last.content = token + last.content;
                last.begin = last.end - last.content.length;
                last.type = Token.COMMENT;
                continue;
            }
            if ((flags & Lexer.SqlPlusComments) === Lexer.SqlPlusComments)if ((/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("rem", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("rema", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("remar", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("remark", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("pro", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("prom", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("promp", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("prompt", token)) && (last == null || (("\n" === last.content) || ("\r" === last.content)))){
                throw Object.defineProperty(new Error("sqlplus comment"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
            if ((flags & Lexer.PlSqlMacros) === Lexer.PlSqlMacros && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$IF", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$ELSIF", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$ELSE", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$END", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$ERROR", token))){
                throw Object.defineProperty(new Error("last.type == Token.MACRO_SKIP"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
            let lastUpper: string = "N/A";
            if (last != null)lastUpper = last.content.toUpperCase();
            if (last != null && last.type === Token.IDENTIFIER && last.begin === -11 && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "@") && !(("\n" === token) || ("\r" === token))){
                last.content = token + last.content;
                continue;
            }
            if (last != null && last.type === Token.IDENTIFIER && last.begin === -11 && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "@") && (("\n" === token) || ("\r" === token))){
                last.begin = pos;
                /* addFirst */ret.unshift(new LexerToken(token, pos, pos + 1, Token.WS));
                continue;
            }
            if ((flags & Lexer.QuotedStrings) === Lexer.QuotedStrings && ("\'" === token)){
                if (last != null && last.type === Token.LINE_COMMENT){
                    const fst: number = last.content.indexOf('\'');
                    const lst: number = last.content.lastIndexOf('\'');
                    if (fst === -1 || fst !== lst)throw Object.defineProperty(new Error("fst == -1 || fst != lst"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    /* removeFirst */ret.splice(0, 1)[0];
                    for(let index = 0; index < commentedTokens.length; index++) {
                        let t = commentedTokens[index];
                        /* addFirst */ret.unshift(t)
                    }
                    const f: LexerToken = ret[0];
                    f.begin = pos;
                    f.content = sourceExpr.substring(f.begin, f.end);
                } else /* addFirst */ret.unshift(new LexerToken(token, -11, pos + 1, Token.QUOTED_STRING));
                continue;
            }
            if ((flags & Lexer.QuotedStrings) === Lexer.QuotedStrings && ("\"" === token)){
                /* addFirst */ret.unshift(new LexerToken(token, -11, pos + 1, Token.DQUOTED_STRING));
                continue;
            }
            if (("`" === token) && 0 <= operation.indexOf('`')){
                /* addFirst */ret.unshift(new LexerToken(token, -11, pos + 1, Token.BQUOTED_STRING));
                continue;
            }
            if (/* contains */(operation.indexOf(token) != -1)){
                /* addFirst */ret.unshift(new LexerToken(token, pos, pos + 1, Token.OPERATION));
                continue;
            }
            if (/* contains */(ws.indexOf(token) != -1)){
                /* addFirst */ret.unshift(new LexerToken(token, pos, pos + 1, Token.WS));
                continue;
            }
            if ('0'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(token.charAt(0)) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(token.charAt(0)) <= '9'.charCodeAt(0)){
                if (Lexer.hasSciSuffix(token)){
                    /* addFirst */ret.unshift(new LexerToken(token.substring(token.length - 1), pos + token.length - 1, pos + token.length, Token.DIGITS));
                    /* addFirst */ret.unshift(new LexerToken(token.substring(0, token.length - 1), pos, pos + token.length - 1, Token.DIGITS));
                } else {
                    /* addFirst */ret.unshift(new LexerToken(token, pos, pos + token.length, Token.DIGITS));
                }
                continue;
            }
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("WRAPPED", token) && last != null){
                throw Object.defineProperty(new Error("is wrapped"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
            /* addFirst */ret.unshift(new LexerToken(token, pos, pos + token.length, Token.IDENTIFIER));
        };}
        return ret;
    }

    public static parse$java_lang_String(input: string): Array<LexerToken> {
        return Rexel.parse$java_lang_String$boolean(input, false);
    }

    public static parse$java_lang_String$java_lang_String(input: string, extraOper: string): Array<LexerToken> {
        const ret: Array<LexerToken> = <any>([]);
        try {
            new Rexel().doParse$java_lang_String$boolean$int$java_lang_String$java_util_List(input, false, Lexer.QuotedStrings + Lexer.SqlPlusComments + Lexer.PlSqlMacros, extraOper, ret);
        } catch(e) {
            throw Object.defineProperty(new Error("parse(...,interrupted==false) has thrown InterruptedException"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        return ret;
    }

    public static parse$java_lang_String$boolean(input: string, keepWSandCOMMENTS: boolean): Array<LexerToken> {
        return Rexel.parse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, Lexer.QuotedStrings + Lexer.SqlPlusComments + Lexer.PlSqlMacros);
    }

    public static parse$java_lang_String$boolean$int(input: string, keepWSandCOMMENTS: boolean, flags: number): Array<LexerToken> {
        try {
            return new Rexel().doParse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, flags);
        } catch(e) {
            throw Object.defineProperty(new Error("Parsing is Cancelled"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    /**
     * @param {string} input see above
     * @param {boolean} keepWSandCOMMENTS see above
     * @param {number} flags --  bitmask:
     * QuotedStrings = 1
     * SqlPlusComments = 2
     * @return
     * @return {LexerToken[]}
     */
    public static parse(input?: any, keepWSandCOMMENTS?: any, flags?: any): Array<LexerToken> {
        if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && ((typeof flags === 'number') || flags === null)) {
            return <any>Rexel.parse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, flags);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'string') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>Rexel.parse$java_lang_String$java_lang_String(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>Rexel.parse$java_lang_String$boolean(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && keepWSandCOMMENTS === undefined && flags === undefined) {
            return <any>Rexel.parse$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    public doParse$java_lang_String$boolean$int(input: string, keepWSandCOMMENTS: boolean, flags: number): Array<LexerToken> {
        const ret: Array<LexerToken> = <any>([]);
        this.doParse$java_lang_String$boolean$int$java_lang_String$java_util_List(input, keepWSandCOMMENTS, flags, "", ret);
        return ret;
    }

    public doParse$java_lang_String$boolean$int$java_lang_String$java_util_List(input: string, keepWSandCOMMENTS: boolean, flags: number, extraOper: string, ret: Array<LexerToken>) {
        let last: LexerToken | null = null;
        {
            let array = this.tokenize(input, flags, extraOper);
            for(let index = 0; index < array.length; index++) {
                let token = array[index];
                {
                    if (this.__stop){
                        this.__stop = false;
                        throw new ParsingCancelled();
                    }
                    if (token.type === Token.QUOTED_STRING){
                        if (last != null && last.type === Token.QUOTED_STRING){
                            last.content = last.content + token.content;
                            last.end = token.end;
                            continue;
                        }
                        if (last != null && last.type === Token.IDENTIFIER && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("n", last.content) && last.end === token.begin){
                            last.begin = token.begin;
                            last.end = token.end;
                            last.type = token.type;
                            last.content = token.content;
                            continue;
                        }
                    }
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token.content, "@"))token.end = token.begin + token.content.length;
                    if (("#" === token.content) && last != null)if (last.type === Token.IDENTIFIER){
                        last.end += 1;
                        last.content += "#";
                        continue;
                    }
                    if ((token.type === Token.IDENTIFIER || token.type === Token.DIGITS) && last != null)if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, "#") && last.type === Token.IDENTIFIER){
                        last.end += token.content.length;
                        last.content += token.content;
                        continue;
                    }
                    if (keepWSandCOMMENTS || token.type !== Token.WS && token.type !== Token.COMMENT && token.type !== Token.LINE_COMMENT && token.type !== Token.MACRO_SKIP && token.type !== Token.SQLPLUSLINECONTINUE_SKIP)/* add */(ret.push(token)>0);
                    last = token;
                }
            }
        }
    }

    public doParse(input?: any, keepWSandCOMMENTS?: any, flags?: any, extraOper?: any, ret?: any) {
        if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && ((typeof flags === 'number') || flags === null) && ((typeof extraOper === 'string') || extraOper === null) && ((ret != null && (ret instanceof Array)) || ret === null)) {
            return <any>this.doParse$java_lang_String$boolean$int$java_lang_String$java_util_List(input, keepWSandCOMMENTS, flags, extraOper, ret);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && ((typeof flags === 'number') || flags === null) && extraOper === undefined && ret === undefined) {
            return <any>this.doParse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, flags);
        } else throw new Error('invalid overload');
    }

    public stop() {
        this.__stop = true;
    }

    constructor() {
        this.__stop = false;
    }
}

