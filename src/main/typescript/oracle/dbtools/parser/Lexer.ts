/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParseInt } from '../../arbori/util/ParseInt.js';
import { StringTokenizer } from '../../arbori/util/StringTokenizer.js';
import { Rexel } from './Rexel.js';
import { Token } from './Token.js';
import { ParsingCancelled } from './ParsingCancelled.js';
import { LexerToken } from './LexerToken.js';

export class Lexer {
    public static readonly __class = "oracle.dbtools.parser.Lexer";

    public static parse$java_lang_String(input: string): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String(input);
    }

    public static parse$java_lang_String$java_lang_String(input: string, extraOper: string): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String$java_lang_String(input, extraOper);
    }

    public static parse$java_lang_String$boolean(input: string, keepWSandCOMMENTS: boolean): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String$boolean(input, keepWSandCOMMENTS);
    }

    public static parse$java_lang_String$boolean$int(input: string, keepWSandCOMMENTS: boolean, flags: number): Array<LexerToken> {
        return new Lexer().doParse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, flags);
    }

    public static parse(input?: any, keepWSandCOMMENTS?: any, flags?: any): Array<LexerToken> {
        if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && ((typeof flags === 'number') || flags === null)) {
            return <any>Lexer.parse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, flags);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'string') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>Lexer.parse$java_lang_String$java_lang_String(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>Lexer.parse$java_lang_String$boolean(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && keepWSandCOMMENTS === undefined && flags === undefined) {
            return <any>Lexer.parse$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    public static match(list1: Array<LexerToken>, list2: Array<LexerToken>): boolean {
        if (/* size */(<number>list1.length) !== /* size */(<number>list2.length)){
            console.error("list1.size()=" + /* size */(<number>list1.length) + " != list2.size()=" + /* size */(<number>list2.length));
            return false;
        }
        let i: number = -1;
        for(let index = 0; index < list1.length; index++) {
            let t1 = list1[index];
            {
                i++;
                const t2: LexerToken = /* get */list2[i];
                if (("\r\n" === t1.content) && ("\r" === t2.content))continue;
                if (("\r\n" === t1.content) && ("\n" === t2.content))continue;
                const s1: string = t1.toString();
                const s2: string = t2.toString();
                if (!("" === t1.content.trim()) && !(s1 === s2) || t1.begin !== t2.begin || t1.end !== t2.end || t1.type !== t2.type){
                    console.error("t1=" + s1 + "\n != t2=" + s2);
                    return false;
                }
            }
        }
        return true;
    }

    public static customLineCommentPrefixes: string[]; public static customLineCommentPrefixes_$LI$(): string[] { if (Lexer.customLineCommentPrefixes == null) { Lexer.customLineCommentPrefixes = []; }  return Lexer.customLineCommentPrefixes; }

    /*private*/ curlyParen: number;

    /*private*/ __stop: boolean;

    /*private*/ tokenize(sourceExpr: string, flags: number, extraOper: string): Array<LexerToken> {
        const ret: Array<LexerToken> = <any>([]);
        let operation: string = "(){}[]^-|!*+.><=\'\",;:%@?/\\~" + extraOper;
        if ((flags & Lexer.HtmlComments) === Lexer.HtmlComments)operation = "></-=\"!";
        if ((flags & Lexer.PoundComments) === Lexer.PoundComments)operation += "#";
        const ws: string = " \n\r\t";
        const st: StringTokenizer = new StringTokenizer(sourceExpr, operation + ws, true);
        let pos: number = 0;
        let isWrapped: boolean = false;
        let contextualFlags: number = flags;
        this.curlyParen = 0;
        this.recognizedJS = 0;
        this.predecessor = null;
        let prior: LexerToken | null = null;
        OUTER: while((st.hasMoreTokens())) {{
            if (this.__stop){
                this.__stop = false;
                throw new ParsingCancelled();
            }
            let token: string = st.nextToken();
            pos += token.length;
            let last: LexerToken | null = null;
            if (/* size */(<number>ret.length) > 0)last = ret[ret.length - 1];
            if (last != null && ("{" === last.content))this.curlyParen++; else if (last != null && ("}" === last.content))this.curlyParen--;
            if (isWrapped){
                if ((((lhs, rhs) => lhs || rhs)("/" === token, ";" === token)) && last != null && ("\n" === last.content) && Lexer.isWrappedTerminator(sourceExpr, pos)){
                    const marker: string = "\"/\"";
                    /* add */(ret.push(new LexerToken(marker, pos - marker.length, pos, Token.WRAP))>0);
                    isWrapped = false;
                    continue;
                } else if ("\n" === token){
                    /* add */(ret.push(new LexerToken(token, pos - token.length, pos, Token.WS))>0);
                    continue;
                } else {
                    if (last != null && "\n" === last.content)last.content = "?";
                    continue;
                }
            }
            if (last != null && last.type === Token.COMMENT && (contextualFlags & Lexer.JavaSqlMultilineComments) === Lexer.JavaSqlMultilineComments && (!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, "*/") || (last.content === ("/*/")))){
                last.content = last.content + token;
                last.end = pos;
                if (last != null && last.type === Token.COMMENT && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, "*/") && !(last.content === ("/*/"))){
                    last.content = sourceExpr.substring(last.begin, last.end);
                }
                continue;
            }
            if (last != null && last.type === Token.COMMENT && (contextualFlags & Lexer.HtmlComments) === Lexer.HtmlComments && (!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, ">"))){
                const abbr: string = "<! ...";
                if ("-" === token)last.content = last.content + token; else if ((">" === token) && (last.content.length <= 2 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(last.content.charAt(2)) != '-'.charCodeAt(0)))last.content = last.content + token; else if ((">" === token) && (last.content.length <= 2 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(last.content.charAt(last.content.length - 2)) == '-'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(last.content.charAt(last.content.length - 3)) == '-'.charCodeAt(0)))last.content = last.content + token;
                last.end = pos;
                if (last != null && last.type === Token.COMMENT && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, ">")){
                    last.content = sourceExpr.substring(last.begin, last.end);
                }
                continue;
            }
            if (last != null && (last.type === Token.LINE_COMMENT || last.type === Token.DBTOOLS_COMMAND || last.type === Token.SQLPLUS_COMMAND) && !("\n" === token) && !("\r" === token)){
                last.content = last.content + token;
                last.end += token.length;
                continue;
            }
            if (last != null && (last.type === Token.LINE_COMMENT || last.type === Token.DBTOOLS_COMMAND || last.type === Token.SQLPLUS_COMMAND) && (("\n" === token) || ("\r" === token))){
                const nl: string = "n/l";
                const tmp: string = /* replace */last.content.split("\n").join(nl);
                let endsWithMinus: boolean = false;
                if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(tmp.trim(), "-"))endsWithMinus = true;
                if ((!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content.toLowerCase(), "pro") && !/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content.toLowerCase(), "rem")) || !endsWithMinus){
                    last.end = last.begin + last.content.length;
                } else {
                    last.content = last.content + token;
                    continue;
                }
            }
            if (last != null && last.type === Token.DOC){
                const precedingChar: string = last.content.charAt(last.content.length - 2);
                if (("\n" === token) && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, "#") && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(precedingChar) == '\n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(precedingChar) == '\r'.charCodeAt(0))){
                    last.end = pos;
                    last.content = sourceExpr.substring(last.begin, last.end);
                } else {
                    last.content += token;
                    continue;
                }
            }
            if (last != null && last.type === Token.SELECT_AI){
                const nl: string = "n/l";
                const tmp: string = /* replace */last.content.split("\n").join(nl).trim();
                if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(tmp, nl + nl)){
                    last.end = pos;
                    last.content = sourceExpr.substring(last.begin, last.end);
                } else {
                    last.content += token;
                    continue;
                }
            }
            if (last != null && last.type === Token.QUOTED_STRING && !(last.isStandardLiteral$int(contextualFlags) || last.isAltLiteral())){
                last.content = last.content + token;
                last.end = last.begin + last.content.length;
                continue;
            }
            if (last != null && last.type === Token.INCOMPLETE && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(last.content.charAt(0)) == '\"'.charCodeAt(0)){
                if (!("\"" === token) || (contextualFlags & Lexer.SQL_$LI$()) !== Lexer.SQL_$LI$() && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(last.content.charAt(last.content.length - 1)) == '\\'.charCodeAt(0)){
                    last.content = last.content + token;
                    last.end = last.begin + last.content.length;
                    continue;
                }
                last.end = pos;
                last.content = sourceExpr.substring(last.begin, last.end);
                last.type = Token.DQUOTED_STRING;
                continue;
            }
            if (last != null && last.type === Token.BQUOTED_STRING && !("`" === token) && !(/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(last.content, "`") && last.content.length > 1)){
                continue;
            }
            if (last != null && last.type === Token.BQUOTED_STRING && ("`" === token)){
                if (Lexer.insideTemplateVar(sourceExpr.substring(last.begin + 1, pos)))continue;
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(sourceExpr.charAt(pos - 2)) == '\\'.charCodeAt(0) && (pos - 3 < 0 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(sourceExpr.charAt(pos - 3)) != '\\'.charCodeAt(0)))continue;
                last.end = pos;
                last.content = sourceExpr.substring(last.begin, last.end);
                continue;
            }
            if (last != null && last.type === Token.REGEXP && pos <= last.end){
                if (("/" === token) && last.end === pos){
                    last.content = sourceExpr.substring(last.begin, last.end);
                    continue;
                }
                continue;
            }
            if ((contextualFlags & Lexer.JavaSqlMultilineComments) === Lexer.JavaSqlMultilineComments && ("*" === token) && last != null && ("/" === last.content)){
                last.content = last.content + token;
                last.end = last.begin + last.content.length;
                last.type = Token.COMMENT;
                continue;
            }
            if ((contextualFlags & Lexer.RegExp) === Lexer.RegExp && !("*" === token) && !("/" === token) && last != null && ("/" === last.content) && prior != null && prior.type !== Token.OPERATION){
                const lineEnd: number = sourceExpr.indexOf('\n', last.end);
                const nextSlash: number = Lexer.terminatingSlash(sourceExpr, last.end, lineEnd);
                if (0 < nextSlash && (nextSlash < lineEnd || lineEnd === -1)){
                    last.content = last.content + token;
                    last.end = nextSlash + 1;
                    last.type = Token.REGEXP;
                    continue;
                }
            }
            if ((contextualFlags & Lexer.SqlLineComments) === Lexer.SqlLineComments && ("-" === token) && last != null && ("-" === last.content) || (contextualFlags & Lexer.JavaLineComments) === Lexer.JavaLineComments && ("/" === token) && last != null && ("/" === last.content)){
                let isHttp: boolean = false;
                if ("/" === token){
                    let start: number = last.begin - "http:".length;
                    if (0 <= start && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("http:", sourceExpr.substring(start, last.begin)))isHttp = true;
                    start = last.begin - "https:".length;
                    if (0 <= start && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("https:", sourceExpr.substring(start, last.begin)))isHttp = true;
                }
                if (!isHttp){
                    last.content = last.content + token;
                    last.type = Token.LINE_COMMENT;
                    last.end += token.length;
                    continue;
                }
            }
            if ((contextualFlags & Lexer.HtmlComments) === Lexer.HtmlComments && ("!" === token) && last != null && ("<" === last.content)){
                last.content = last.content + token;
                last.end = last.begin + last.content.length;
                last.type = Token.COMMENT;
                continue;
            }
            if ((contextualFlags & Lexer.SqlPlusComments) === Lexer.SqlPlusComments)if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("rem", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("rema", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("remar", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("remark", token)){
                let isRP: boolean = last == null;
                if (!isRP){
                    let prefLen: number = 12;
                    if (pos < prefLen)prefLen = pos;
                    let prefix: string = sourceExpr.substring(pos - prefLen, pos - token.length);
                    const nl: string = "n/l";
                    prefix = /* replace */prefix.split("\n").join(nl);
                    if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(prefix.trim(), nl))isRP = true;
                }
                if (isRP){
                    /* add */(ret.push(new LexerToken(token, pos - token.length, -9, Token.LINE_COMMENT))>0);
                    continue;
                }
            }
            for(let index = 0; index < Lexer.customLineCommentPrefixes_$LI$().length; index++) {
                let pref = Lexer.customLineCommentPrefixes_$LI$()[index];
                {
                    if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(pref, token)){
                        /* add */(ret.push(new LexerToken(token, pos - token.length, -9, Token.LINE_COMMENT))>0);
                        continue OUTER;
                    } else if (last != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(pref, last.content)){
                        last.content = last.content + token;
                        last.end = last.begin + last.content.length + token.length;
                        last.type = Token.LINE_COMMENT;
                        continue OUTER;
                    }
                }
            }
            if ((contextualFlags & Lexer.PoundComments) === Lexer.PoundComments && ("#" === token)){
                /* add */(ret.push(new LexerToken(token, pos - token.length, -9, Token.LINE_COMMENT))>0);
                continue;
            }
            if ((contextualFlags & Lexer.SqlPlusCommands) === Lexer.SqlPlusCommands && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("soda", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("input", token)) && (last == null || (("\n" === last.content) || ("\r" === last.content)))){
                /* add */(ret.push(new LexerToken(token, pos - token.length, -9, Token.DBTOOLS_COMMAND))>0);
                continue;
            }
            if (((contextualFlags & Lexer.SqlPlusCommands) === Lexer.SqlPlusCommands && this.isSqlPlusPrefix(token, sourceExpr, pos)) && Lexer.startsLine(last, sourceExpr, "@" === token ? 2 : 1)){
                if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("prompt", token))token = "pro   ";
                /* add */(ret.push(new LexerToken(token, pos - token.length, -9, Token.SQLPLUS_COMMAND))>0);
                continue;
            }
            let lastUpper: string = "N/A";
            if (last != null)lastUpper = last.content.toUpperCase();
            if ((contextualFlags & Lexer.PlSqlMacros) === Lexer.PlSqlMacros && (contextualFlags & Lexer.JS_$LI$()) !== Lexer.JS_$LI$() && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$IF", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$ELSIF", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$ELSE", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$END", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("$ERROR", token))){
                /* add */(ret.push(new LexerToken(token, pos - token.length, pos, Token.MACRO_SKIP))>0);
                continue;
            }
            if (last != null && last.type === Token.MACRO_SKIP && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(lastUpper, "$IF") && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(lastUpper, "$THEN")){
                /* add */(ret.push(new LexerToken(token, pos - token.length, pos, Token.MACRO_SKIP))>0);
                continue;
            }
            if (last != null && last.type === Token.MACRO_SKIP && (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(lastUpper, "$IF") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(lastUpper, "$ELSIF") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(lastUpper, "$ELSE") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(lastUpper, "$ERROR"))){
                last.content = last.content + token;
                last.end += token.length;
                continue;
            }
            if (last != null && last.type === Token.IDENTIFIER && last.end === -11 && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "@") && !(("\n" === token) || ("\r" === token))){
                last.content = last.content + token;
                continue;
            }
            if (last != null && last.type === Token.IDENTIFIER && last.end === -11 && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(last.content, "@") && (("\n" === token) || ("\r" === token))){
                last.end = pos - 1;
                /* add */(ret.push(new LexerToken(token, pos - 1, pos, Token.WS))>0);
                continue;
            }
            if ((contextualFlags & Lexer.QuotedStrings) === Lexer.QuotedStrings && ("\'" === token)){
                if (last != null && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("q", last.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("N", last.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("u", last.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("nq", last.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("uq", last.content))){
                    last.content += token;
                    last.type = Token.QUOTED_STRING;
                } else /* add */(ret.push(new LexerToken(token, pos - 1, -10, Token.QUOTED_STRING))>0);
                continue;
            }
            if ((contextualFlags & Lexer.QuotedStrings) === Lexer.QuotedStrings && ("\"" === token)){
                /* add */(ret.push(new LexerToken(token, pos - 1, -11, Token.INCOMPLETE))>0);
                continue;
            }
            if (("`" === token) && 0 <= operation.indexOf('`')){
                /* add */(ret.push(new LexerToken(token, pos - 1, -11, Token.BQUOTED_STRING))>0);
                continue;
            }
            if (token.length === 1 && 0 <= ws.indexOf(token.charAt(0))){
                /* add */(ret.push(new LexerToken(token, pos - 1, pos, Token.WS))>0);
                continue;
            }
            if (token.length === 1 && 0 <= operation.indexOf(token.charAt(0))){
                /* add */(ret.push(new LexerToken(token, pos - 1, pos, Token.OPERATION))>0);
                continue;
            }
            if ('0'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(token.charAt(0)) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(token.charAt(0)) <= '9'.charCodeAt(0) && (last == null || !("#" === last.content))){
                if (Lexer.isHexLiteral(token)){
                    /* add */(ret.push(new LexerToken(token, pos - token.length, pos, Token.DIGITS))>0);
                    continue;
                }
                if (!Lexer.fixedExponent(token, ret, pos - token.length)){
                    if (Lexer.hasSciSuffix(token)){
                        /* add */(ret.push(new LexerToken(token.substring(0, token.length - 1), pos - token.length, pos - 1, Token.DIGITS))>0);
                        /* add */(ret.push(new LexerToken(token.substring(token.length - 1), pos - 1, pos, Token.DIGITS))>0);
                    } else {
                        try {
                            const value = BigInt(token);
                            if (value < -(1n << 63n) || value > (1n << 63n) - 1n)throw new Error("long overflow");
                            /* add */(ret.push(new LexerToken(token, pos - token.length, pos, Token.DIGITS))>0);
                        } catch(e) {
                            /* add */(ret.push(new LexerToken(token, pos - token.length, pos, Token.UNKNOWN))>0);
                        }
                    }
                }
                continue;
            }
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("WRAPPED", token) && last != null){
                let sawId: boolean = false;
                for (let i = ret.length - 1; i >= 0; i--) {
                    const t: LexerToken = ret[i];
                    if (sawId && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(".", t.content)){
                        sawId = false;
                        continue;
                    }
                    if (sawId && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("PROCEDURE", t.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("FUNCTION", t.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("TRIGGER", t.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("TYPE", t.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("PACKAGE", t.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("BODY", t.content))){
                        isWrapped = true;
                        break;
                    }
                    if (t.type === Token.WS || t.type === Token.COMMENT || t.type === Token.LINE_COMMENT)continue;
                    if (t.type === Token.IDENTIFIER || t.type === Token.DQUOTED_STRING){
                        sawId = true;
                        continue;
                    }
                    break;
                }
            }
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("doc", token) && (contextualFlags & Lexer.SqlPlusComments) === Lexer.SqlPlusComments){
                const cBefore: string = sourceExpr.charAt(pos - 4);
                let cAfter: string = '\n';
                if (pos + 3 < sourceExpr.length){
                    if (pos < sourceExpr.length){
                        cAfter = sourceExpr.charAt(pos);
                        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cAfter) == ' '.charCodeAt(0))cAfter = sourceExpr.charAt(pos + 1);
                        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cAfter) == ' '.charCodeAt(0))cAfter = sourceExpr.charAt(pos + 2);
                    }
                    if ((3 === pos || ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cBefore) == '\n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cBefore) == '\r'.charCodeAt(0))) && (sourceExpr.length < pos + 3 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cAfter) == '\n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cAfter) == '\r'.charCodeAt(0))){
                        /* add */(ret.push(new LexerToken(token, pos, pos + 3, Token.DOC))>0);
                        continue;
                    }
                }
            }
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("select", token) && Lexer.startsLine(last, sourceExpr, 1)){
                if (pos + 1 + 2 + 1 + 1 < sourceExpr.length){
                    const ai: string = sourceExpr.substring(pos, pos + 1 + 2 + 1).trim();
                    if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("ai", ai)){
                        /* add */(ret.push(new LexerToken(token, pos, pos + 6, Token.SELECT_AI))>0);
                        continue;
                    }
                }
            }
            prior = last;
            /* add */(ret.push(new LexerToken(token, pos - token.length, pos, Token.IDENTIFIER))>0);
            if (contextualFlags === flags){
                const context: number = this.inferContext(token);
                if (context !== -1)contextualFlags |= context;
            }
        }};
        if (/* size */(<number>ret.length) > 0){
            const last: LexerToken = ret[ret.length - 1];
            last.end = sourceExpr.length;
        }
        return ret;
    }

    /*private*/ static isWrappedTerminator(sourceExpr: string, pos: number): boolean {
        while((pos < sourceExpr.length)) {{
            const c: string = sourceExpr.charAt(pos++);
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '\n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '\r'.charCodeAt(0))return true;
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) != ' '.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) != '\t'.charCodeAt(0))return false;
        }};
        return true;
    }

    /*private*/ static startsLine(last: LexerToken | null, input: string, leadingSpacesTolerance: number): boolean {
        if (last == null)return true;
        if ("\n" === last.content)return true;
        if ("\r" === last.content)return true;
        if (last.type === Token.WS && 8 < last.begin){
            let prefix: string = input.substring(last.begin - leadingSpacesTolerance, last.begin);
            const nl: string = "n/l";
            prefix = /* replace */prefix.split("\n").join(nl);
            if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(prefix.trim(), nl))return true;
        }
        return false;
    }

    static hasSciSuffix(token: string): boolean {
        const suffix: string = token.charAt(token.length - 1);
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'K'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'k'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'M'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'm'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'G'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'g'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'T'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 't'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'P'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'p'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'E'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(suffix) != 'e'.charCodeAt(0))return false;
        return ParseInt.isInt(token.substring(0, token.length - 1));
    }

    static JSkeywords: string[]; public static JSkeywords_$LI$(): string[] { if (Lexer.JSkeywords == null) { Lexer.JSkeywords = ["var", "const", "let"]; }  return Lexer.JSkeywords; }

    /*private*/ recognizedJS: number;

    predecessor: string | null;

    /*private*/ inferContext(token: string): number {
        if (this.predecessor != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("language", this.predecessor) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("javascript", token))this.recognizedJS |= 1 | 2;
        if ((this.recognizedJS & 1) === 0)for(let index = 0; index < Lexer.JSkeywords_$LI$().length; index++) {
            let kw = Lexer.JSkeywords_$LI$()[index];
            if (kw === token)this.recognizedJS |= 1;
        }
        if ((this.recognizedJS & 2) === 0)if ("{" === token)this.recognizedJS |= 2;
        this.predecessor = token;
        if ((this.recognizedJS & 3) === 3)return Lexer.JS_$LI$();
        return -1;
    }

    /*private*/ static insideTemplateVar(str: string): boolean {
        const st: StringTokenizer = new StringTokenizer(str, "${}", true);
        let nesting: number = 0;
        let prior: string | null = null;
        while((st.hasMoreTokens())) {{
            const token: string = st.nextToken();
            if (("{" === token) && ("$" === prior))nesting++; else if ("}" === token)nesting--;
            prior = token;
        }};
        return 0 < nesting;
    }

    /*private*/ static terminatingSlash(sourceExpr: string, start: number, end: number): number {
        let input: string;
        if (end < 0)input = sourceExpr.substring(start); else input = sourceExpr.substring(start, end);
        const st: StringTokenizer = new StringTokenizer(input, "\\/ ()[]", true);
        let prior: string | null = null;
        let current: string | null = null;
        let pos: number = start;
        let parenBalance: number = 0;
        while((st.hasMoreTokens())) {{
            current = st.nextToken();
            if (("[" === prior) && ("]" === current)){
                prior = null;
                pos += current.length;
                continue;
            }
            if ("[" === prior){
                pos += current.length;
                continue;
            }
            if ("\\" === prior){
                prior = null;
                pos += current.length;
                continue;
            }
            if (")" === prior)parenBalance--;
            if ("(" === prior)parenBalance++;
            if ("/" === current){
                if (parenBalance !== 0)return -1;
                if ((" " === prior) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(0)) == ' '.charCodeAt(0)){
                    if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("g", st.nextToken()))return pos + 1;
                    return -1;
                }
                return pos;
            }
            prior = current;
            pos += current.length;
        }};
        return -1;
    }

    hostCommands: string[];

    /**
     * Identify superambiguous SQL*Plus commands here
     * @param {string} token
     * @return
     * @param {string} input
     * @param {number} pos
     * @return {boolean}
     * @private
     */
    /*private*/ isSqlPlusPrefix(token: string, input: string, pos: number): boolean {
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("pro", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("prom", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("promp", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("prompt", token))return true;
        if (("@" === token) && this.curlyParen === 0){
            let limit: number = 30;
            if (input.length - pos < limit)limit = input.length - pos;
            const lookahead: string = input.substring(pos, pos + limit).toLowerCase();
            if (/* contains */(lookahead.indexOf("insert") != -1) || /* contains */(lookahead.indexOf("delete") != -1) || /* contains */(lookahead.indexOf("update") != -1)){
                if (/* contains */(lookahead.indexOf("{") != -1))return false;
                limit = 100;
                if (pos < limit)limit = pos;
                const lookback: string = input.substring(pos - limit, pos);
                const src: Array<LexerToken> = Lexer.parse$java_lang_String(lookback);
                if (LexerToken.contains(src, ["duality", "view"]))return false;
            }
            return true;
        }
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("HOST", token)){
            if (pos + 4 < input.length){
                const cmd: string = input.substring(pos, pos + 4);
                if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cmd.trim(), "&"))return true;
            }
            if (pos + 4 + 12 < input.length){
                const cmd: string = input.substring(pos + 4, pos + 4 + 12);
                for(let index = 0; index < this.hostCommands.length; index++) {
                    let candiadate = this.hostCommands[index];
                    if (/* contains */(cmd.indexOf(candiadate) != -1))return true;
                }
            } else return false;
        }
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("PAUSE", token))return true;
        return false;
    }

    static fixedExponent(iNput: string, ret: Array<LexerToken>, pos: number): boolean {
        const tmp: Array<LexerToken> = <any>([]);
        const st: StringTokenizer = new StringTokenizer(iNput, "efdEFD", true);
        while((st.hasMoreTokens())) {{
            const token: string = st.nextToken();
            pos += token.length;
            if (ParseInt.isInt(token)){
                /* add */(tmp.push(new LexerToken(token, pos - token.length, pos, Token.DIGITS))>0);
                continue;
            }
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("e", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("f", token) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("d", token)){
                /* add */(tmp.push(new LexerToken(token, pos - token.length, pos, Token.IDENTIFIER))>0);
                continue;
            }
            return false;
        }};
        if (/* size */(<number>tmp.length) === 0)return false; else {
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, tmp);
            return true;
        }
    }

    /*private*/ static isHexLiteral(iNput: string): boolean {
        if (iNput.length < 3)return false;
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(iNput.charAt(0)) != '0'.charCodeAt(0))return false;
        const input: string = iNput.toLowerCase();
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(1)) != 'x'.charCodeAt(0))return false;
        for(let i: number = 2; i < input.length; i++) {{
            if (/* isDigit *//\d/.test(input.charAt(i)[0]))continue;
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(i)) == 'a'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(i)) == 'b'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(i)) == 'c'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(i)) == 'd'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(i)) == 'e'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(i)) == 'f'.charCodeAt(0))continue;
            return false;
        };}
        return true;
    }

    public doParse$java_lang_String(input: string): Array<LexerToken> {
        return this.doParse$java_lang_String$boolean(input, false);
    }

    public doParse$java_lang_String$java_lang_String(input: string, extraOper: string): Array<LexerToken> {
        const ret: Array<LexerToken> = <any>([]);
        try {
            this.doParse$java_lang_String$boolean$int$java_lang_String$java_util_ArrayList(input, false, Lexer.SQL_$LI$(), extraOper, ret);
        } catch(e) {
            throw Object.defineProperty(new Error("doParse(...) has been interrupted with lexer.stop=true"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        return ret;
    }

    public doParse$java_lang_String$boolean(input: string, keepWSandCOMMENTS: boolean): Array<LexerToken> {
        return this.doParse$java_lang_String$boolean$int(input, keepWSandCOMMENTS, Lexer.SQL_$LI$());
    }

    public static QuotedStrings: number = 1;

    public static SqlPlusComments: number = 2;

    public static PlSqlMacros: number = 4;

    public static JavaLineComments: number = 8;

    public static SqlLineComments: number = 16;

    public static JavaSqlMultilineComments: number = 32;

    public static HtmlComments: number = 64;

    public static JsonStrings: number = 128;

    public static PoundComments: number = 256;

    public static RegExp: number = 512;

    public static SqlPlusCommands: number = 1024;

    public static SQL: number; public static SQL_$LI$(): number { if (Lexer.SQL == null) { Lexer.SQL = Lexer.QuotedStrings + Lexer.SqlPlusCommands + Lexer.SqlPlusComments + Lexer.PlSqlMacros + Lexer.SqlLineComments + Lexer.JavaSqlMultilineComments + Lexer.JavaLineComments; }  return Lexer.SQL; }

    public static GRAMMAR: number; public static GRAMMAR_$LI$(): number { if (Lexer.GRAMMAR == null) { Lexer.GRAMMAR = Lexer.QuotedStrings + Lexer.SqlLineComments + Lexer.JavaSqlMultilineComments; }  return Lexer.GRAMMAR; }

    public static ARBORI: number; public static ARBORI_$LI$(): number { if (Lexer.ARBORI == null) { Lexer.ARBORI = Lexer.QuotedStrings + Lexer.SqlLineComments + Lexer.JavaLineComments + Lexer.JavaSqlMultilineComments; }  return Lexer.ARBORI; }

    public static TEST: number; public static TEST_$LI$(): number { if (Lexer.TEST == null) { Lexer.TEST = Lexer.QuotedStrings + Lexer.SqlLineComments + Lexer.JavaSqlMultilineComments; }  return Lexer.TEST; }

    public static JAVA: number; public static JAVA_$LI$(): number { if (Lexer.JAVA == null) { Lexer.JAVA = Lexer.QuotedStrings + Lexer.JavaLineComments + Lexer.JavaSqlMultilineComments; }  return Lexer.JAVA; }

    public static JS: number; public static JS_$LI$(): number { if (Lexer.JS == null) { Lexer.JS = Lexer.JAVA_$LI$() + Lexer.JsonStrings + Lexer.RegExp + Lexer.PoundComments; }  return Lexer.JS; }

    public doParse$java_lang_String$boolean$int(input: string, keepWSandCOMMENTS: boolean, flags: number): Array<LexerToken> {
        const ret: Array<LexerToken> = <any>([]);
        try {
            let separators: string = "";
            if ((flags & Lexer.SQL_$LI$()) === Lexer.SQL_$LI$())separators += "`";
            this.doParse$java_lang_String$boolean$int$java_lang_String$java_util_ArrayList(input, keepWSandCOMMENTS, flags, separators, ret);
        } catch(e) {
            throw Object.defineProperty(new Error("doParse(...) has been interrupted with lexer.stop=true"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        return ret;
    }

    public doParse$java_lang_String$java_lang_String$int(input: string, extraOper: string, flags: number): Array<LexerToken> {
        try {
            const ret: Array<LexerToken> = <any>([]);
            this.doParse$java_lang_String$boolean$int$java_lang_String$java_util_ArrayList(input, false, flags, extraOper, ret);
            return ret;
        } catch(e) {
            throw Object.defineProperty(new Error("doParse(...) has been interrupted with lexer.stop=true"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    doParse$java_lang_String$boolean$int$java_lang_String$java_util_ArrayList(input: string, keepWSandCOMMENTS: boolean, flags: number, extraOper: string, ret: Array<LexerToken>) {
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
                    if (token.type === Token.IDENTIFIER){
                        if (last != null && last.type === Token.DQUOTED_STRING && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token.content, "___")){
                            last.content = last.content + token.content;
                            last.end = token.end;
                            continue;
                        }
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
                    if (keepWSandCOMMENTS || token.type !== Token.WS && token.type !== Token.COMMENT && token.type !== Token.LINE_COMMENT && token.type !== Token.MACRO_SKIP && token.type !== Token.SQLPLUSLINECONTINUE_SKIP && token.type !== Token.DOC)/* add */(ret.push(token)>0);
                    last = token;
                }
            }
        }
        if (Lexer.incomplete(ret))try {
            const ter: Array<LexerToken> = <any>([]);
            this.rexel = new Rexel();
            this.rexel.doParse$java_lang_String$boolean$int$java_lang_String$java_util_List(input, keepWSandCOMMENTS, flags, extraOper, ter);
            this.rexel = null;
            const retPos: number = Lexer.brokenLiteralOrIdAt(ret, ter);
            const tmp: Array<LexerToken> = this.join(input, ret, ter, retPos);
            /* clear */(ret.length = 0);
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, tmp);
        } catch(e) {
        }
    }

    join(input: string, src: Array<LexerToken>, crs: Array<LexerToken>, pos: number): Array<LexerToken> {
        const ret: Array<LexerToken> = <any>(/* subList */src.slice(0, pos).slice(0));
        const end: number = /* get */src[pos - 1].end;
        const tmp: Array<LexerToken> = <any>([]);
        for(let i: number = /* size */(<number>crs.length) - 1; 0 <= i; i--) {{
            const t: LexerToken = /* get */crs[i];
            if (t.begin < end)break;
            /* addFirst */tmp.unshift(t);
        };}
        const first = tmp[0];
        if (first != null && end < first.begin)/* add */(ret.push(new LexerToken(input.substring(end, first.begin), end, first.begin, Token.INCOMPLETE))>0);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, tmp);
        return ret;
    }

    public doParse$java_lang_String$int$java_lang_String$java_util_ArrayList$java_util_ArrayList$java_lang_InterruptedException(input: string, flags: number, extraOper: string, src: Array<LexerToken>, fullSrc: Array<LexerToken>, interrupted: Error) {
        let last: LexerToken | null = null;
        {
            let array = this.tokenize(input, flags, extraOper);
            for(let index = 0; index < array.length; index++) {
                let token = array[index];
                {
                    if (token.type === Token.IDENTIFIER){
                        if (last != null && last.type === Token.DQUOTED_STRING && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token.content, "___")){
                            last.content = last.content + token.content;
                            last.end = token.end;
                            continue;
                        }
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
                    /* add */(fullSrc.push(token)>0);
                    if (token.type !== Token.WS && token.type !== Token.COMMENT && token.type !== Token.LINE_COMMENT && token.type !== Token.MACRO_SKIP && token.type !== Token.SQLPLUSLINECONTINUE_SKIP)/* add */(src.push(token)>0);
                    last = token;
                }
            }
        }
        if (Lexer.incomplete(src))try {
            const ter: Array<LexerToken> = <any>([]);
            this.rexel = new Rexel();
            this.rexel.doParse$java_lang_String$boolean$int$java_lang_String$java_util_List(input, false, flags, extraOper, ter);
            this.rexel = null;
            let retPos: number = Lexer.brokenLiteralOrIdAt(src, ter);
            let tmp: Array<LexerToken> = this.join(input, src, ter, retPos);
            /* clear */(src.length = 0);
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(src, tmp);
            const fullTer: Array<LexerToken> = <any>([]);
            this.rexel = new Rexel();
            this.rexel.doParse$java_lang_String$boolean$int$java_lang_String$java_util_List(input, true, flags, extraOper, fullTer);
            this.rexel = null;
            retPos = Lexer.brokenLiteralOrIdAt(fullSrc, fullTer);
            tmp = this.join(input, fullSrc, fullTer, retPos);
            /* clear */(fullSrc.length = 0);
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(fullSrc, tmp);
        } catch(e) {
        }
    }

    /**
     * Get fullSrc and src at one pass
     * @param {string} input
     * @param {number} flags
     * @param {string} extraOper
     * @param {LexerToken[]} src
     * @param {LexerToken[]} fullSrc
     * @param {Error} interrupted
     * @throws InterruptedException
     */
    public doParse(input?: any, flags?: any, extraOper?: any, src?: any, fullSrc?: any, interrupted?: any) {
        if (((typeof input === 'string') || input === null) && ((typeof flags === 'number') || flags === null) && ((typeof extraOper === 'string') || extraOper === null) && ((src != null && (src instanceof Array)) || src === null) && ((fullSrc != null && (fullSrc instanceof Array)) || fullSrc === null) && ((interrupted != null && (interrupted["__classes"] && interrupted["__classes"].indexOf("java.lang.InterruptedException") >= 0)) || interrupted === null)) {
            return <any>this.doParse$java_lang_String$int$java_lang_String$java_util_ArrayList$java_util_ArrayList$java_lang_InterruptedException(input, flags, extraOper, src, fullSrc, interrupted);
        } else if (((typeof input === 'string') || input === null) && ((typeof flags === 'boolean') || flags === null) && ((typeof extraOper === 'number') || extraOper === null) && ((typeof src === 'string') || src === null) && ((fullSrc != null && (fullSrc instanceof Array)) || fullSrc === null) && interrupted === undefined) {
            return <any>this.doParse$java_lang_String$boolean$int$java_lang_String$java_util_ArrayList(input, flags, extraOper, src, fullSrc);
        } else if (((typeof input === 'string') || input === null) && ((typeof flags === 'string') || flags === null) && ((typeof extraOper === 'number') || extraOper === null) && src === undefined && fullSrc === undefined && interrupted === undefined) {
            return <any>this.doParse$java_lang_String$java_lang_String$int(input, flags, extraOper);
        } else if (((typeof input === 'string') || input === null) && ((typeof flags === 'boolean') || flags === null) && ((typeof extraOper === 'number') || extraOper === null) && src === undefined && fullSrc === undefined && interrupted === undefined) {
            return <any>this.doParse$java_lang_String$boolean$int(input, flags, extraOper);
        } else if (((typeof input === 'string') || input === null) && ((typeof flags === 'string') || flags === null) && extraOper === undefined && src === undefined && fullSrc === undefined && interrupted === undefined) {
            return <any>this.doParse$java_lang_String$java_lang_String(input, flags);
        } else if (((typeof input === 'string') || input === null) && ((typeof flags === 'boolean') || flags === null) && extraOper === undefined && src === undefined && fullSrc === undefined && interrupted === undefined) {
            return <any>this.doParse$java_lang_String$boolean(input, flags);
        } else if (((typeof input === 'string') || input === null) && flags === undefined && extraOper === undefined && src === undefined && fullSrc === undefined && interrupted === undefined) {
            return <any>this.doParse$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    /*private*/ static nlCnt(lineMap: number[], src: Array<LexerToken>): number {
        let ret: number = 0;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                if (t.type !== Token.QUOTED_STRING && t.type !== Token.DQUOTED_STRING && t.type !== Token.COMMENT)continue;
                if (t.end < 1)continue;
                const lineStart = Lexer.charPos2LineNo0(lineMap, t.begin);
                const lineEnd = Lexer.charPos2LineNo0(lineMap, t.end - 1);
                ret += lineEnd - lineStart;
            }
        }
        return ret;
    }

    private static charPos2LineNo0(lineMap: number[], pos: number): number {
        if (lineMap.length === 0 || lineMap[lineMap.length - 1] < pos) return lineMap.length;
        let low = 0;
        let high = lineMap.length - 1;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (pos <= lineMap[mid]) high = mid;
            else low = mid + 1;
        }
        return low;
    }

    static brokenLiteralOrIdAt(src: Array<LexerToken>, crs: Array<LexerToken>): number {
        const size: number = /* size */(<number>src.length);
        if (size === 0)return -1;
        let pos: number = -1;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                pos++;
                if (t.type === Token.DQUOTED_STRING){
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(t.content.charAt(t.content.length - 1)) != '\"'.charCodeAt(0))return pos;
                }
                if (t.type === Token.QUOTED_STRING){
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(t.content.charAt(t.content.length - 1)) != '\''.charCodeAt(0))return pos;
                }
                if (t.type === Token.INCOMPLETE){
                    return pos;
                }
            }
        }
        return -1;
    }

    /*private*/ static incomplete(src: Array<LexerToken>): boolean {
        if (/* size */(<number>src.length) === 0)return false;
        const t: LexerToken = /* get */src[/* size */(<number>src.length) - 1];
        return t.incomplete();
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
        return Lexer.char2lex$java_util_List$int$boolean(src, offset, false);
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
            return <any>Lexer.char2lex$java_util_List$int$boolean(src, offset, strict);
        } else if (((src != null && (src instanceof Array)) || src === null) && ((typeof offset === 'number') || offset === null) && strict === undefined) {
            return <any>Lexer.char2lex$java_util_List$int(src, offset);
        } else throw new Error('invalid overload');
    }

    /*private*/ static matchingDelimiter(ch: string): string {
        if ('<'.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return '>'; else if ('['.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return ']'; else if ('{'.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return '}'; else if ('('.charCodeAt(0) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))((ch)))return ')'; else return ch;
    }

    rexel: Rexel | null;

    public stop() {
        this.__stop = true;
        if (this.rexel != null)this.rexel.stop();
    }

    constructor() {
        this.curlyParen = 0;
        this.__stop = false;
        this.recognizedJS = 0;
        this.predecessor = null;
        this.hostCommands = [" ls ", " cd ", " pwd ", " mkdir ", " rmdir ", " cp ", " mv ", " rm ", " touch ", " cat ", " more ", " less ", " head ", " tail ", " grep ", " find ", " locate ", " chmod ", " chown ", " ps ", " top ", " kill ", " echo ", " man ", " who ", " whoami ", " uname ", " df ", " du ", " tar ", " gzip ", " gunzip ", " ssh ", " scp ", " ping ", " traceroute ", " ifconfig ", " netstat ", " history ", " alias ", " unalias ", " export ", " env ", " date ", " cal ", " uptime ", " clear ", " diff ", " sort ", " uniq ", " wc ", " cut ", " paste ", " sed ", " awk ", " xargs ", " tee ", " ln ", " which ", " whereis ", " apt ", " yum ", " make ", " gcc ", " vi ", " nano ", " curl ", " wget ", " ftp ", " sudo ", " su ", " logout ", " exit "];
        this.rexel = null;
    }
}

