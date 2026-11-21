/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { Token } from '../Token.js';

/**
 * Lightweight APEXlang lexer independent of the generated ANTLR lexer.
 * 
 * <p>The lexer recognizes APEXlang structure and treats values such as HTML,
 * CSS, and JavaScript as opaque payloads. This is intentional: the Earley
 * parser needs their boundaries, not their internal language grammars.</p>
 * @class
 * @extends Lexer
 */
export class ApexLexer1 extends Lexer {
    static HTML_VALUES: Array<string>; public static HTML_VALUES_$LI$(): Array<string> { if (ApexLexer1.HTML_VALUES == null) { ApexLexer1.HTML_VALUES = Set.of<any>("additionalText", "headerText", "htmlCode", "htmlExpression", "linkText", "postText"); }  return ApexLexer1.HTML_VALUES; }

    static JAVA_SCRIPT_VALUES: Array<string>; public static JAVA_SCRIPT_VALUES_$LI$(): Array<string> { if (ApexLexer1.JAVA_SCRIPT_VALUES == null) { ApexLexer1.JAVA_SCRIPT_VALUES = Set.of<any>("javaScriptExpression", "jsCode", "jsExpression"); }  return ApexLexer1.JAVA_SCRIPT_VALUES; }

    static OPAQUE_LINE_VALUES: Array<string>; public static OPAQUE_LINE_VALUES_$LI$(): Array<string> { if (ApexLexer1.OPAQUE_LINE_VALUES == null) { ApexLexer1.OPAQUE_LINE_VALUES = Set.of<any>("inline", "cssStyling", "staticValues"); }  return ApexLexer1.OPAQUE_LINE_VALUES; }

    static LEADING_WHITESPACE_OPAQUE_VALUES: Array<string>; public static LEADING_WHITESPACE_OPAQUE_VALUES_$LI$(): Array<string> { if (ApexLexer1.LEADING_WHITESPACE_OPAQUE_VALUES == null) { ApexLexer1.LEADING_WHITESPACE_OPAQUE_VALUES = Set.of<any>("javaScriptExpression", "jsCode", "jsExpression", "executeWhenPageLoads", "staticValues"); }  return ApexLexer1.LEADING_WHITESPACE_OPAQUE_VALUES; }

    static CONDITION_VALUES: Array<string>; public static CONDITION_VALUES_$LI$(): Array<string> { if (ApexLexer1.CONDITION_VALUES == null) { ApexLexer1.CONDITION_VALUES = Set.of<any>("request=Value", "itemColumn=value", "itemColumn!=value", "itemColumn>value", "itemColumn>=value", "itemColumn<value", "itemColumn<=value", "itemColumnIsNull", "itemColumnIsNotNull", "itemColumnIsInList", "itemColumnIsNotInList", "item=value", "item!=value", "item>value", "item>=value", "item<value", "item<=value", "itemIsNull", "itemIsNotNull", "itemIsInList", "itemIsNotInList"); }  return ApexLexer1.CONDITION_VALUES; }

    public static parse(input?: any, keepWSandCOMMENTS?: any, flags?: any): Array<LexerToken> {
        if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && ((typeof flags === 'number') || flags === null)) {
            return super.parse(input, keepWSandCOMMENTS, flags);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'string') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>ApexLexer1.parse$java_lang_String$java_lang_String(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>ApexLexer1.parse$java_lang_String$boolean(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && keepWSandCOMMENTS === undefined && flags === undefined) {
            return <any>ApexLexer1.parse$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    public static parse$java_lang_String(input: string): Array<LexerToken> {
        return ApexLexer1.parse$java_lang_String$boolean(input, false);
    }

    public static parse$java_lang_String$boolean(input: string, keepWhitespaceAndComments: boolean): Array<LexerToken> {
        return new ApexLexer1().lex(input, keepWhitespaceAndComments);
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
            super.doParse(input, flags, extraOper, src, fullSrc, interrupted);
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

    public doParse$java_lang_String(input: string): Array<LexerToken> {
        return ApexLexer1.parse$java_lang_String(input);
    }

    public doParse$java_lang_String$boolean(input: string, keepWhitespaceAndComments: boolean): Array<LexerToken> {
        return ApexLexer1.parse$java_lang_String$boolean(input, keepWhitespaceAndComments);
    }

    /*private*/ lex(input: string, keepWhitespaceAndComments: boolean): Array<LexerToken> {
        const tokens: Array<LexerToken> = <any>([]);
        let position: number = 0;
        let pendingProperty: string = null;
        while((position < input.length)) {{
            if (ApexLexer1.startsWithIgnoreCase(input, position, "help") && ApexLexer1.isHelpBlockStart(input, position)){
                const end: number = ApexLexer1.closingBrace(input, position + 4);
                ApexLexer1.add(tokens, input, position, end, Token.WS, keepWhitespaceAndComments);
                position = end;
                pendingProperty = null;
                continue;
            }
            const character: string = input.charAt(position);
            if (ApexLexer1.isWhitespace(character)){
                if (pendingProperty != null && /* contains */(ApexLexer1.LEADING_WHITESPACE_OPAQUE_VALUES_$LI$().indexOf(<any>(pendingProperty)) >= 0) && ApexLexer1.hasUnquotedValue(input, position) && !ApexLexer1.startsWith(input, ApexLexer1.nextNonWhitespace(input, position), "```")){
                    const end: number = ApexLexer1.opaqueValueEnd(input, position, pendingProperty);
                    ApexLexer1.add(tokens, input, position, end, Token.HTML_CODE, keepWhitespaceAndComments);
                    position = end;
                    pendingProperty = null;
                    continue;
                }
                ApexLexer1.add(tokens, input, position, position + 1, Token.WS, keepWhitespaceAndComments);
                position++;
                continue;
            }
            if (ApexLexer1.startsWith(input, position, "//")){
                const end: number = ApexLexer1.lineEnd(input, position);
                ApexLexer1.add(tokens, input, position, end, Token.LINE_COMMENT, keepWhitespaceAndComments);
                position = end;
                continue;
            }
            if (ApexLexer1.startsWith(input, position, "/*")){
                let end: number = input.indexOf("*/", position + 2);
                if (end >= 0){
                    end += 2;
                    ApexLexer1.add(tokens, input, position, end, Token.COMMENT, keepWhitespaceAndComments);
                    position = end;
                    continue;
                }
            }
            if (ApexLexer1.startsWithIgnoreCase(input, position, "http://") || ApexLexer1.startsWithIgnoreCase(input, position, "https://")){
                const end: number = ApexLexer1.plainValueEnd(input, position);
                ApexLexer1.add(tokens, input, position, end, Token.IDENTIFIER, keepWhitespaceAndComments);
                position = end;
                pendingProperty = null;
                continue;
            }
            if (ApexLexer1.startsWithIgnoreCase(input, position, "javascript:")){
                const end: number = ApexLexer1.lineEnd(input, position);
                ApexLexer1.add(tokens, input, position, end, Token.HTML_CODE, keepWhitespaceAndComments);
                position = end;
                pendingProperty = null;
                continue;
            }
            if (ApexLexer1.startsWith(input, position, "```")){
                let end: number = input.indexOf("```", position + 3);
                end = end < 0 ? input.length : end + 3;
                ApexLexer1.add(tokens, input, position, end, Token.QUOTED_STRING, keepWhitespaceAndComments);
                position = end;
                pendingProperty = null;
                continue;
            }
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\''.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\"'.charCodeAt(0)){
                const end: number = ApexLexer1.quotedEnd(input, position, character);
                const type: Token = end === position + 1 ? Token.UNKNOWN : Token.DQUOTED_STRING;
                ApexLexer1.add(tokens, input, position, end, type, keepWhitespaceAndComments);
                position = end;
                pendingProperty = null;
                continue;
            }
            const valueEnd: number = ApexLexer1.opaqueValueEnd(input, position, pendingProperty);
            if (valueEnd > position){
                ApexLexer1.add(tokens, input, position, valueEnd, Token.HTML_CODE, keepWhitespaceAndComments);
                position = valueEnd;
                pendingProperty = null;
                continue;
            }
            if (ApexLexer1.isOperation(character)){
                const property: string = (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == ':'.charCodeAt(0) ? ApexLexer1.lastIdentifier(tokens) : null;
                ApexLexer1.add(tokens, input, position, position + 1, Token.OPERATION, keepWhitespaceAndComments);
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == ':'.charCodeAt(0)){
                    pendingProperty = property;
                } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) != '@'.charCodeAt(0)){
                    pendingProperty = null;
                }
                position++;
                continue;
            }
            const specialEnd: number = ApexLexer1.specialIdentifierEnd(input, position);
            if (specialEnd > position){
                ApexLexer1.add(tokens, input, position, specialEnd, Token.IDENTIFIER, keepWhitespaceAndComments);
                position = specialEnd;
                pendingProperty = null;
                continue;
            }
            const decimalEnd: number = ApexLexer1.decimalEnd(input, position);
            if (decimalEnd > position){
                ApexLexer1.add(tokens, input, position, decimalEnd, Token.DIGITS, keepWhitespaceAndComments);
                position = decimalEnd;
                pendingProperty = null;
                continue;
            }
            if (!ApexLexer1.isIdentifierStart(character)){
                ApexLexer1.add(tokens, input, position, position + 1, Token.UNKNOWN, keepWhitespaceAndComments);
                position++;
                pendingProperty = null;
                continue;
            }
            const end: number = ApexLexer1.identifierEnd(input, position);
            const type: Token = ApexLexer1.isDigits(input, position, end) ? Token.DIGITS : Token.IDENTIFIER;
            ApexLexer1.add(tokens, input, position, end, type, keepWhitespaceAndComments);
            position = end;
        }};
        return tokens;
    }

    /*private*/ static opaqueValueEnd(input: string, position: number, property: string): number {
        if (property == null){
            return -1;
        }
        if (/* contains */(ApexLexer1.HTML_VALUES_$LI$().indexOf(<any>(property)) >= 0)){
            const end: number = ApexLexer1.htmlEnd(input, position);
            return end === position ? -1 : end;
        }
        if (("url" === property) && ApexLexer1.startsWithIgnoreCase(input, position, "javascript:")){
            return ApexLexer1.lineEnd(input, position);
        }
        if ("executeWhenPageLoads" === property){
            return ApexLexer1.javaScriptEnd(input, position);
        }
        if (/* contains */(ApexLexer1.JAVA_SCRIPT_VALUES_$LI$().indexOf(<any>(property)) >= 0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) != '\"'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) != '\''.charCodeAt(0)){
            return ApexLexer1.lineEnd(input, position);
        }
        if ("staticValues" === property){
            const closingBrace: number = input.indexOf('}', position);
            return ApexLexer1.nearest(ApexLexer1.lineEnd(input, position), closingBrace, -1);
        }
        if (/* contains */(ApexLexer1.OPAQUE_LINE_VALUES_$LI$().indexOf(<any>(property)) >= 0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) != '\"'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) != '\''.charCodeAt(0)){
            return ApexLexer1.lineEnd(input, position);
        }
        return -1;
    }

    /*private*/ static hasUnquotedValue(input: string, position: number): boolean {
        for(let index: number = position; index < input.length; index++) {{
            if (!ApexLexer1.isWhitespace(input.charAt(index))){
                return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) != '\''.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) != '\"'.charCodeAt(0);
            }
        };}
        return false;
    }

    /*private*/ static nextNonWhitespace(input: string, position: number): number {
        while((position < input.length && ApexLexer1.isWhitespace(input.charAt(position)))) {{
            position++;
        }};
        return position;
    }

    /*private*/ static htmlEnd(input: string, position: number): number {
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) == '{'.charCodeAt(0)){
            return ApexLexer1.lineEnd(input, position);
        }
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) == '<'.charCodeAt(0)){
            const elementEnd: number = ApexLexer1.htmlElementEnd(input, position);
            if (elementEnd > position){
                return elementEnd;
            }
        }
        const tripleQuote: number = input.indexOf("```", position);
        const closingBrace: number = input.indexOf('}', position);
        return ApexLexer1.nearest(input.length, tripleQuote, closingBrace);
    }

    /*private*/ static htmlElementEnd(input: string, position: number): number {
        let index: number = position;
        let depth: number = 0;
        while((index < input.length)) {{
            const tagStart: number = input.indexOf('<', index);
            if (tagStart < 0){
                return -1;
            }
            const tagEnd: number = input.indexOf('>', tagStart + 1);
            const newline: number = ApexLexer1.lineEnd(input, index);
            if (newline < tagStart){
                return newline < input.length ? newline + 1 : -1;
            }
            if (tagEnd < 0 || newline < tagEnd){
                return newline < input.length ? newline + 1 : -1;
            }
            const closing: boolean = tagStart + 1 < input.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(tagStart + 1)) == '/'.charCodeAt(0);
            const single: boolean = tagEnd > tagStart + 1 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(tagEnd - 1)) == '/'.charCodeAt(0);
            const name: string = ApexLexer1.htmlTagName(input, tagStart + (closing ? 2 : 1), tagEnd);
            if (/* isEmpty */(name.length === 0)){
                return -1;
            }
            if (closing){
                if (--depth === 0){
                    return tagEnd + 1;
                }
            } else if (!single && !ApexLexer1.isHtmlVoidElement(name)){
                depth++;
            } else if (depth === 0){
                return tagEnd + 1;
            }
            index = tagEnd + 1;
        }};
        return -1;
    }

    /*private*/ static htmlTagName(input: string, start: number, tagEnd: number): string {
        let end: number = start;
        while((end < tagEnd && (/* isLetterOrDigit *//[a-zA-Z\d]/.test(input.charAt(end)[0]) || "._:-".indexOf(input.charAt(end)) >= 0))) {{
            end++;
        }};
        return input.substring(start, end).toLowerCase();
    }

    /*private*/ static isHtmlVoidElement(name: string): boolean {
        return /* contains */(Set.of<any>("area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr").indexOf(<any>(name)) >= 0);
    }

    /*private*/ static javaScriptEnd(input: string, position: number): number {
        let braces: number = 0;
        for(let index: number = position; index < input.length; index++) {{
            const character: string = input.charAt(index);
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '{'.charCodeAt(0)){
                braces++;
            } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '}'.charCodeAt(0)){
                if (braces === 0){
                    return index;
                }
                braces--;
            } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\r'.charCodeAt(0)){
                return index;
            }
        };}
        return input.length;
    }

    /*private*/ static quotedEnd(input: string, position: number, quote: string): number {
        for(let index: number = position + 1; index < input.length; index++) {{
            const character: string = input.charAt(index);
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\r'.charCodeAt(0)){
                return position + 1;
            }
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(quote) && (index === position + 1 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index - 1)) != '\\'.charCodeAt(0))){
                return index + 1;
            }
        };}
        return position + 1;
    }

    /*private*/ static isHelpBlockStart(input: string, position: number): boolean {
        let afterHelp: number = position + 4;
        if ((position > 0 && !ApexLexer1.isWhitespace(input.charAt(position - 1))) || afterHelp >= input.length){
            return false;
        }
        while((afterHelp < input.length && ApexLexer1.isWhitespace(input.charAt(afterHelp)))) {{
            afterHelp++;
        }};
        return afterHelp < input.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(afterHelp)) == '{'.charCodeAt(0);
    }

    /*private*/ static closingBrace(input: string, position: number): number {
        let braces: number = 0;
        for(let index: number = position; index < input.length; index++) {{
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == '{'.charCodeAt(0)){
                braces++;
            } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == '}'.charCodeAt(0) && --braces === 0){
                return index + 1;
            }
        };}
        return input.length;
    }

    /*private*/ static identifierEnd(input: string, position: number): number {
        let end: number = position + 1;
        while((end < input.length && ApexLexer1.isIdentifierContinue(input.charAt(end)))) {{
            end++;
        }};
        return end;
    }

    /*private*/ static plainValueEnd(input: string, position: number): number {
        let end: number = position + 1;
        while((end < input.length && !ApexLexer1.isWhitespace(input.charAt(end)))) {{
            end++;
        }};
        return end;
    }

    /*private*/ static isDigits(input: string, start: number, end: number): boolean {
        for(let index: number = start; index < end; index++) {{
            if (!/* isDigit *//\d/.test(input.charAt(index)[0])){
                return false;
            }
        };}
        return true;
    }

    /*private*/ static decimalEnd(input: string, position: number): number {
        let index: number = (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) == '-'.charCodeAt(0) ? position + 1 : position;
        const digitsStart: number = index;
        while((index < input.length && /* isDigit *//\d/.test(input.charAt(index)[0]))) {{
            index++;
        }};
        if (index === digitsStart || index === input.length || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) != '.'.charCodeAt(0)){
            return -1;
        }
        const fractionStart: number = ++index;
        while((index < input.length && /* isDigit *//\d/.test(input.charAt(index)[0]))) {{
            index++;
        }};
        return index === fractionStart || (index < input.length && ApexLexer1.isIdentifierContinue(input.charAt(index))) ? -1 : index;
    }

    /*private*/ static specialIdentifierEnd(input: string, position: number): number {
        const conditionEnd: number = ApexLexer1.conditionValueEnd(input, position);
        if (conditionEnd > position){
            return conditionEnd;
        }
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) == '&'.charCodeAt(0)){
            return ApexLexer1.apexSubstitutionEnd(input, position);
        }
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(position)) == '#'.charCodeAt(0)){
            return ApexLexer1.substitutionEnd(input, position);
        }
        return -1;
    }

    /*private*/ static conditionValueEnd(input: string, position: number): number {
        for(let index = 0; index < ApexLexer1.CONDITION_VALUES_$LI$().length; index++) {
            let condition = ApexLexer1.CONDITION_VALUES_$LI$()[index];
            {
                if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(input, condition, position) && (position + condition.length === input.length || !ApexLexer1.isIdentifierContinue(input.charAt(position + condition.length)))){
                    return position + condition.length;
                }
            }
        }
        return -1;
    }

    /*private*/ static apexSubstitutionEnd(input: string, position: number): number {
        let index: number = position + 1;
        if (index < input.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == '#'.charCodeAt(0)){
            index++;
            if (index < input.length && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == 'x'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == 'X'.charCodeAt(0))){
                index++;
            }
            const entityStart: number = index;
            while((index < input.length && /* isLetterOrDigit *//[a-zA-Z\d]/.test(input.charAt(index)[0]))) {{
                index++;
            }};
            return index > entityStart && index < input.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == ';'.charCodeAt(0) ? index + 1 : -1;
        }
        if (index >= input.length || !ApexLexer1.isIdentifierStart(input.charAt(index))){
            return -1;
        }
        index = ApexLexer1.identifierEnd(input, index);
        if (index < input.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == '!'.charCodeAt(0)){
            index++;
            if (index >= input.length || !ApexLexer1.isIdentifierStart(input.charAt(index))){
                return -1;
            }
            index = ApexLexer1.identifierEnd(input, index);
        }
        return index > position + 1 && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index - 1)) == '.'.charCodeAt(0) ? index : index < input.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == '.'.charCodeAt(0) ? index + 1 : -1;
    }

    /*private*/ static substitutionEnd(input: string, position: number): number {
        let index: number = position + 1;
        if (index >= input.length || !ApexLexer1.isIdentifierStart(input.charAt(index))){
            return -1;
        }
        index = ApexLexer1.identifierEnd(input, index);
        if (index >= input.length || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index++)) != '#'.charCodeAt(0)){
            return -1;
        }
        while((index < input.length)) {{
            if (ApexLexer1.isIdentifierContinue(input.charAt(index))){
                index++;
            } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(index)) == '#'.charCodeAt(0) && index + 1 < input.length && ApexLexer1.isIdentifierStart(input.charAt(index + 1))){
                const closingHash: number = ApexLexer1.identifierEnd(input, index + 1);
                if (closingHash < input.length && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input.charAt(closingHash)) == '#'.charCodeAt(0)){
                    index = closingHash + 1;
                } else {
                    break;
                }
            } else {
                break;
            }
        }};
        return index;
    }

    /*private*/ static lastIdentifier(tokens: Array<LexerToken>): string {
        for(let index: number = /* size */(<number>tokens.length) - 1; index >= 0; index--) {{
            const token: LexerToken = /* get */tokens[index];
            if (token.type === Token.WS || token.type === Token.OPERATION){
                continue;
            }
            return token.type === Token.IDENTIFIER ? token.content : null;
        };}
        return null;
    }

    /*private*/ static add(tokens: Array<LexerToken>, input: string, start: number, end: number, type: Token, keepWhitespaceAndComments: boolean) {
        if (keepWhitespaceAndComments || (type !== Token.WS && type !== Token.COMMENT && type !== Token.LINE_COMMENT)){
            /* add */(tokens.push(new LexerToken(input.substring(start, end), start, end, type))>0);
        }
    }

    /*private*/ static isOperation(character: string): boolean {
        return ":{}()[];@".indexOf(character) >= 0;
    }

    /*private*/ static isIdentifierStart(character: string): boolean {
        return /* isLetterOrDigit *//[a-zA-Z\d]/.test(character[0]) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '_'.charCodeAt(0);
    }

    /*private*/ static isIdentifierContinue(character: string): boolean {
        return ApexLexer1.isIdentifierStart(character) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '.'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '$'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '-'.charCodeAt(0);
    }

    /*private*/ static isWhitespace(character: string): boolean {
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == ' '.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\n'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\r'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '\t'.charCodeAt(0);
    }

    /*private*/ static startsWith(input: string, position: number, text: string): boolean {
        return /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(input, text, position);
    }

    /*private*/ static startsWithIgnoreCase(input: string, position: number, text: string): boolean {
        return input.regionMatches(true, position, text, 0, text.length);
    }

    /*private*/ static lineEnd(input: string, position: number): number {
        const newline: number = input.indexOf('\n', position);
        const carriageReturn: number = input.indexOf('\r', position);
        return ApexLexer1.nearest(input.length, newline, carriageReturn);
    }

    /*private*/ static nearest(fallback: number, first: number, second: number): number {
        let result: number = fallback;
        if (first >= 0 && first < result){
            result = first;
        }
        if (second >= 0 && second < result){
            result = second;
        }
        return result;
    }
}
ApexLexer1["__class"] = "oracle.dbtools.parser.apex.ApexLexer1";



