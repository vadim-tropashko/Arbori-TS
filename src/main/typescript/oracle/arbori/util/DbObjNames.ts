/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../../dbtools/parser/Lexer.js';
import { LexerToken } from '../../dbtools/parser/LexerToken.js';
import { Token } from '../../dbtools/parser/Token.js';
import { createHash } from 'node:crypto';

export interface DbObjNames {}

export namespace DbObjNames {

    /**
     * Converts a canonical Oracle object name to a safe filename component.
     * 
     * <p>Canonical ordinary identifiers are uppercase. Names that are lowercase, mixed-case,
     * explicitly quoted, or contain characters outside the ordinary identifier syntax retain their
     * alphanumeric characters in lowercase and receive a SHA-256 suffix derived from the original
     * name.
     * 
     * @param {string} objectName the canonical object name
     * @return {string} a deterministic filename component
     */
    export function objectNameToFilename(objectName: string): string {
        if (objectName == null)return null;
        if (DbObjNames.isCanonicalStandardName(objectName)){
            return /* toLowerCase */objectName.toLowerCase();
        }
        const sanitized: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let offset: number = 0; offset < objectName.length; ) {{
            const codePoint: number = /* codePointAt */objectName.charCodeAt(offset);
            if (('a'.charCodeAt(0) <= codePoint && codePoint <= 'z'.charCodeAt(0)) || ('A'.charCodeAt(0) <= codePoint && codePoint <= 'Z'.charCodeAt(0)) || ('0'.charCodeAt(0) <= codePoint && codePoint <= '9'.charCodeAt(0))){
                sanitized.str += String.fromCodePoint(codePoint).toLowerCase();
            }
            offset += codePoint > 0xffff ? 2 : 1;
        };}
        return /* toString *//* append */(sb => { sb.str += <any>DbObjNames.sha256(objectName); return sb; })(sanitized).str;
    }

    export function isCanonicalStandardName(objectName: string): boolean {
        const tokens: Array<LexerToken> = Lexer.parse$java_lang_String$boolean(objectName, true);
        if (/* size */(<number>tokens.length) !== 1 || /* get */tokens[0].type === Token.DQUOTED_STRING)return false;
        if (/* isEmpty */(objectName.length === 0) || !DbObjNames.isIdentifierStart(objectName.charAt(0)))return false;
        for(let index: number = 1; index < objectName.length; index++) {{
            const character: string = objectName.charAt(index);
            if (!DbObjNames.isIdentifierPart(character))return false;
        };}
        return objectName === /* toUpperCase */objectName.toUpperCase();
    }

    export function isIdentifierStart(character: string): boolean {
        return ('a'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) <= 'z'.charCodeAt(0)) || ('A'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) <= 'Z'.charCodeAt(0)) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '_'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '$'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) == '#'.charCodeAt(0);
    }

    export function isIdentifierPart(character: string): boolean {
        return DbObjNames.isIdentifierStart(character) || ('0'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(character) <= '9'.charCodeAt(0));
    }

    export function sha256(value: string): string {
        return createHash("sha256").update(value, "utf8").digest("hex");

    }

    export function handleMixedCase$java_lang_String(name: string): string {
        return DbObjNames['handleMixedCase$java_lang_String$boolean'](name, true);
    }

    export function handleMixedCase$java_lang_String$boolean(name: string, unquote: boolean): string {
        if (name == null)return null;
        const out: Array<LexerToken> = Lexer.parse$java_lang_String$boolean(name, true);
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let index = 0; index < out.length; index++) {
            let t = out[index];
            {
                let s: string = t.content;
                if (t.type === Token.DQUOTED_STRING){
                    if (unquote && 1 < s.length)s = s.substring(1, s.length - 1);
                } else s = s.toUpperCase();
                /* append */(sb => { sb.str += <any>s; return sb; })(ret);
            }
        }
        return /* toString */ret.str;
    }

    /**
     * Convert to upper case unquoted name parts
     * @param {string} name  -- input
     * @param {boolean} unquote -- remove double quotes if true
     * @return
     * @return {string}
     */
    export function handleMixedCase(name?: any, unquote?: any): string {
        if (((typeof name === 'string') || name === null) && ((typeof unquote === 'boolean') || unquote === null)) {
            return <any>DbObjNames.handleMixedCase$java_lang_String$boolean(name, unquote);
        } else if (((typeof name === 'string') || name === null) && unquote === undefined) {
            return <any>DbObjNames.handleMixedCase$java_lang_String(name);
        } else throw new Error('invalid overload');
    }

    export function addDoubleQuote(s: string): string {
        return DbObjNames.quoteIdentifier(s, '\"');
    }

    /**
     * Quotes an identifier based on the following:
     * 1) Any lower/mixed case identifier is quoted
     * 2) Any identifier starting with the quote string is NOT quoted. If it is currently quoted (first/last characters
     * are the quote character) then no quoting is needed, and if it not quoted but contains a quote character, the name is
     * invalid.
     * 3) The string is checked for invalid characters; any invalid characters require the string be quoted. A valid identifier
     * starts with a letter and contains only letters, digits, or one of _$#. Note that the database allows any valid character
     * in the database character set. We by policy use the basic ASCII character set to determine letters.
     * 
     * Conflicting requirements:
     * - SYS.DBMS_SQLTUNE.ACCEPT_ALL_SQL_PROFILES composite object names shouldn't be quoted
     * - Bug 20667620: weird column name "NO." should
     * @param {string} s
     * @param {string} quoteChar
     * @return
     * @return {string}
     */
    export function quoteIdentifier(s: string, quoteChar: string): string {
        const quoteString: string = /* valueOf */String(quoteChar).toString();
        if (s == null)return null;
        let quote: boolean = false;
        const legitimateChars: string = "$#_";
        if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(s, quoteString) && !quote){
            const chars: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(s.length);
            /* getChars */((a, s, e, d, l) => { d.splice.apply(d, [l, e-s].concat(<any>a.substring(s, e).split(''))); })(s, 0, chars.length, chars, 0);
            if (chars.length > 0 && '0'.charCodeAt(0) <= (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(chars[0]) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(chars[0]) <= '9'.charCodeAt(0))quote = true; else for(let index = 0; index < chars.length; index++) {
                let c = chars[index];
                {
                    if (legitimateChars.indexOf(c) < 0 && ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) < '0'.charCodeAt(0) || '9'.charCodeAt(0) < (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) < 'A'.charCodeAt(0) || 'Z'.charCodeAt(0) < (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c))){
                        quote = true;
                        break;
                    }
                }
            }
        }
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(s, "_") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(s, "$") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(s, "#"))quote = true;
        return quote ? `${quoteString}${s}${quoteString}` : s;
    }

    /**
     * shortenIdentifier shortens a string to a specified length with sensitivity to
     * uniqueness within a set of identifiers for use as database identifier.
     * 
     * Assumes the string is not quoted.
     * 
     * Will truncate and add sequential suffix to id to ensure that the id complies with
     * the size constraint provided (idSize)
     * 
     * Caller manages the idsize, including accounting for quotes
     * Caller provides list for managing uniqueness set.
     * Skips uniqueness checking if uniqueIds list is null
     * 
     * @param {string} id : the string to shorten
     * @param {string[]} uniqueIds : the list to maintain the set of unique identifiers or null for no uniqueness checking
     * @param {number} idSize : the length constraint on the id
     * @return {string} A unique string in the form &lt;string&gt;&lt;suffix-n&gt;
     */
    export function shortenIdentifier(id: string, uniqueIds: Array<string>, idSize: number): string {
        if (uniqueIds == null){
            if (id.length <= idSize){
                return id;
            } else {
                return id.substring(0, idSize);
            }
        }
        const candiId: string = id;
        let newId: string = id;
        let suffix: number = 1;
        if (id.length <= idSize){
            if (!/* contains */(uniqueIds.indexOf(<any>(id)) >= 0)){
                /* add */(uniqueIds.push(id)>0);
                return id;
            } else {
                while((newId.length <= idSize)) {{
                    ++suffix;
                    newId = candiId + suffix;
                    if (!/* contains */(uniqueIds.indexOf(<any>(newId)) >= 0)){
                        /* add */(uniqueIds.push(newId)>0);
                        return newId;
                    }
                }};
            }
        } else {
            newId = candiId.substring(0, idSize);
            if (!/* contains */(uniqueIds.indexOf(<any>(newId)) >= 0)){
                /* add */(uniqueIds.push(newId)>0);
                return newId;
            }
        }
        while((/* toString */(''+(suffix)).length <= idSize)) {{
            ++suffix;
            newId = candiId.substring(0, idSize - /* toString */(''+(suffix)).length);
            newId = newId + suffix;
            if (!/* contains */(uniqueIds.indexOf(<any>(newId)) >= 0)){
                /* add */(uniqueIds.push(newId)>0);
                return newId;
            }
        }};
        return id;
    }
}


export namespace DbObjNames {

    export enum CLEAN_TYPE {
        OFF, TRANSFORM30, TRANSFORM128, QUOTE30, QUOTE128, UNIQUE
    }
}



