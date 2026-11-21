/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../../dbtools/parser/Lexer.js';
import { LexerToken } from '../../dbtools/parser/LexerToken.js';
import { Token } from '../../dbtools/parser/Token.js';
import { IO } from './IO.js';

export class Service extends IO {
    public static main(args: string[]) {
        let text: string = "select \n from \n dual";
        console.info(text);
        let map: number[] = Service.lineMap(text);
        for(let i: number = 1; i < map.length + 2; i++) {{
            const c: number = Service.lineNo2CharPos(text, i);
            const c1: number = Service.lineNo2CharPos1(map, i);
            if (c1 !== c)console.info("lineNo2CharPos1[" + i + "]=" + c1 + ", lineNo2CharPos[" + i + "]=" + c);
        };}
        for(let i: number = 0; i < text.length + 1; i++) {{
            const c1: number = Service.charPos2LineNo1(map, i);
            const c: number = Service.charPos2LineNo(text, i);
            if (c1 !== c)console.info("charPos2LineNo1[" + i + "]=" + c1 + ", charPos2LineNo[" + i + "]=" + c);
        };}
        text = "select \n\r from \n\r dual";
        map = Service.lineMap(text);
        console.info(text);
        for(let i: number = 1; i < map.length + 2; i++) {{
            const c1: number = Service.lineNo2CharPos1(map, i);
            const c: number = Service.lineNo2CharPos(text, i);
            if (c1 !== c)console.info("lineNo2CharPos1[" + i + "]=" + c1 + ", lineNo2CharPos[" + i + "]=" + c);
        };}
        for(let i: number = 0; i < text.length + 1; i++) {{
            const c1: number = Service.charPos2LineNo1(map, i);
            const c: number = Service.charPos2LineNo(text, i);
            if (c1 !== c)console.info("charPos2LineNo1[" + i + "]=" + c1 + ", charPos2LineNo[" + i + "]=" + c);
        };}
    }

    public static cleanFileName$java_lang_String(fileName: string): string {
        return Service.cleanFileName$java_lang_String$java_lang_String(fileName, "@");
    }

    public static cleanFileName$java_lang_String$java_lang_String(fileName: string, replace: string): string {
        const clean: string = /* replaceAll */fileName.replace(new RegExp("[<>:/\\|?*]", 'g'),replace);
        return clean;
    }

    public static cleanFileName(fileName?: any, replace?: any): string {
        if (((typeof fileName === 'string') || fileName === null) && ((typeof replace === 'string') || replace === null)) {
            return <any>Service.cleanFileName$java_lang_String$java_lang_String(fileName, replace);
        } else if (((typeof fileName === 'string') || fileName === null) && replace === undefined) {
            return <any>Service.cleanFileName$java_lang_String(fileName);
        } else throw new Error('invalid overload');
    }

    public static cleanScriptFileName$java_lang_String(fileName: string): string {
        return Service.cleanScriptFileName$java_lang_String$java_lang_String$java_lang_String(fileName, "_", "_");
    }

    public static cleanScriptFileName$java_lang_String$java_lang_String$java_lang_String(fileName: string, replace: string, replaceSpace: string): string {
        let clean: string = /* replaceAll */fileName.replace(new RegExp("[<>:/\\|?*()%&\'$@^~/#]", 'g'),replace);
        clean = /* replaceAll */clean.replace(new RegExp(" ", 'g'),replaceSpace);
        return clean;
    }

    public static cleanScriptFileName(fileName?: any, replace?: any, replaceSpace?: any): string {
        if (((typeof fileName === 'string') || fileName === null) && ((typeof replace === 'string') || replace === null) && ((typeof replaceSpace === 'string') || replaceSpace === null)) {
            return <any>Service.cleanScriptFileName$java_lang_String$java_lang_String$java_lang_String(fileName, replace, replaceSpace);
        } else if (((typeof fileName === 'string') || fileName === null) && replace === undefined && replaceSpace === undefined) {
            return <any>Service.cleanScriptFileName$java_lang_String(fileName);
        } else throw new Error('invalid overload');
    }

    public static convertNonAsciiFileName(fileName: string): string {
        if (!Service.isAscii(fileName)){
            return (<number>/* hashCode */(<any>((o: any) => { if (o.hashCode) { return o.hashCode(); } else { return o.toString().split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0); }})(fileName))).toString();
        }
        return fileName;
    }

    public static isAscii(s: string): boolean {
        const length: number = s.length;
        for(let i: number = 0; i < length; i++) {{
            const c: string = s.charAt(i);
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) > 'z'.charCodeAt(0)){
                return false;
            }
        };}
        return true;
    }

    public static copy$java_net_URL$java_lang_String(url: URL, dstdir: string) {
        IO.copy$java_net_URL$java_lang_String(url, dstdir);
    }

    public static copy$java_lang_String$java_lang_String$java_lang_String$java_lang_String(fromPath: string, fromEncoding: string, toPath: string, toEncoding: string) {
        IO.copy$java_lang_String$java_lang_String$java_lang_String$java_lang_String(fromPath, fromEncoding, toPath, toEncoding);
    }

    public static copy(fromPath?: any, fromEncoding?: any, toPath?: any, toEncoding?: any) {
        if (((typeof fromPath === 'string') || fromPath === null) && ((typeof fromEncoding === 'string') || fromEncoding === null) && ((typeof toPath === 'string') || toPath === null) && ((typeof toEncoding === 'string') || toEncoding === null)) {
            return <any>Service.copy$java_lang_String$java_lang_String$java_lang_String$java_lang_String(fromPath, fromEncoding, toPath, toEncoding);
        } else if (((fromPath != null && (fromPath instanceof URL)) || fromPath === null) && ((typeof fromEncoding === 'string') || fromEncoding === null) && toPath === undefined && toEncoding === undefined) {
            return <any>Service.copy$java_net_URL$java_lang_String(fromPath, fromEncoding);
        } else throw new Error('invalid overload');
    }

    public static toNull(src: string): string {
        return "" === src ? null : src;
    }

    public static identln$int$java_lang_String(level: number, txt: string): string {
        return Service.identln$int$java_lang_String$java_lang_String(level, txt, " ");
    }

    public static identln$int$java_lang_String$java_lang_String(level: number, txt: string, filling: string): string {
        const b: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < level; i++) {/* append */(sb => { sb.str += <any>filling; return sb; })(b);}
        /* append */(sb => { sb.str += <any>txt; return sb; })(b);
        return /* toString */b.str;
    }

    public static identln(level?: any, txt?: any, filling?: any): string {
        if (((typeof level === 'number') || level === null) && ((typeof txt === 'string') || txt === null) && ((typeof filling === 'string') || filling === null)) {
            return <any>Service.identln$int$java_lang_String$java_lang_String(level, txt, filling);
        } else if (((typeof level === 'number') || level === null) && ((typeof txt === 'string') || txt === null) && filling === undefined) {
            return <any>Service.identln$int$java_lang_String(level, txt);
        } else throw new Error('invalid overload');
    }

    /**
     * Translate character position into line number
     * Legacy; not efficient
     * @param {string} txt
     * @param {number} pos
     * @return      {number} 1 based line numbers
     */
    public static charPos2LineNo(txt: string, pos: number): number {
        return CharOffsets.charPos2LineNo(txt, pos);
    }

    public static lineNo2CharPos(txt: string, line: number): number {
        return CharOffsets.lineNo2CharPos(txt, line);
    }

    /**
     * Fixed long processing time in LSP
     * Build line map once, then query it efficiently
     * @return  {int[]} 0 based
     * @param {string} txt
     */
    public static lineMap(txt: string): number[] {
        return CharOffsets.lineMap(txt);
    }

    public static lineNo2CharPos0(lineMap: number[], line: number): number {
        return CharOffsets.lineNo2CharPos0(lineMap, line);
    }

    public static lineNo2CharPos1(lineMap: number[], line: number): number {
        return Service.lineNo2CharPos0(lineMap, line - 1);
    }

    public static charPos2LineNo0(lineMap: number[], pos: number): number {
        return CharOffsets.charPos2LineNo0(lineMap, pos);
    }

    public static charPos2LineNo1(lineMap: number[], pos: number): number {
        return Service.charPos2LineNo0(lineMap, pos) + 1;
    }

    public static padln(txt: string, newsize: number): string {
        const b: { str: string, toString: Function } = { str: txt, toString: function() { return this.str; } };
        for(let i: number = txt.length; i < newsize; i++) {{
            /* append */(sb => { sb.str += <any>" "; return sb; })(b);
        };}
        return /* toString */b.str;
    }

    public static pair(x: number, y: number): number {
        return (y << 16) | x;
    }

    public static Y(p: number): number {
        return p >> 16;
    }

    public static X(p: number): number {
        return p & 65535;
    }

    /**
     * For java scripting, as JS doesn't have one
     * @return
     * @param {string} input
     * @param {string} target
     * @param {string} replacement
     * @return {string}
     */
    public static replace(input: string, target: string, replacement: string): string {
        return /* replace */input.split(target).join(replacement);
    }

    /**
     * Bundle two ints into a long
     * @param {number} x
     * @param {number} y
     * @return
     * @return {number}
     */
    public static lPair(x: number, y: number): number {
        // Java stores this as a signed 64-bit long. JS bitwise operators
        // truncate to 32 bits, so use exact arithmetic while the packed value
        // remains within Number's integer precision (parser offsets do).
        return y * 0x1_0000_0000 + (x >>> 0);
    }

    /**
     * Extract second component of a pair
     * @param {number} pair
     * @return
     * @return {number}
     */
    public static lY(pair: number): number {
        return Math.floor(pair / 0x1_0000_0000);
    }

    public static lX(pair: number): number {
        return (pair % 0x1_0000_0000) | 0;
    }

    public static decrPair(p: number): number {
        return p - 65537;
    }

    public static addlX(pair: number, x: number): number {
        return pair + x;
    }

    public static addlY(pair: number, y: number): number {
        return pair + y * 0x1_0000_0000;
    }

    public static handleMixedCase(name: string, unquote: boolean = true): string {
        return DbObjNames['handleMixedCase$java_lang_String$boolean'](name, unquote);
    }

    public static addDoubleQuote(s: string): string {
        return Service.quoteIdentifier(s, '\"');
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
    public static quoteIdentifier(s: string, quoteChar: string): string {
        return DbObjNames.quoteIdentifier(s, quoteChar);
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
    public static shortenIdentifier(id: string, uniqueIds: Array<string>, idSize: number): string {
        return DbObjNames.shortenIdentifier(id, uniqueIds, idSize);
    }

    public static into2chars$java_lang_String(data: string): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < data.length; i++) {{
            /* append */(sb => { sb.str += <any>Service.into2chars$char(data.charAt(i)); return sb; })(ret);
        };}
        return /* toString */ret.str;
    }

    public static into2chars(data?: any): any {
        if (((typeof data === 'string') || data === null)) {
            return <any>Service.into2chars$java_lang_String(data);
        } else if (((typeof data === 'string') || data === null)) {
            return <any>Service.into2chars$char(data);
        } else throw new Error('invalid overload');
    }

    public static from2chars$java_lang_String(data: string): string {
        if (data == null)return null;
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < data.length; ) {{
            const chunk: string[] = [null, null];
            chunk[0] = data.charAt(i++);
            if (i >= data.length)return null;
            chunk[1] = data.charAt(i++);
            /* append */(sb => { sb.str += <any>Service.from2chars$char_A(chunk); return sb; })(ret);
        };}
        if (/* length */ret.str.length === 0)return null;
        return /* toString */ret.str;
    }

    public static from2chars(data?: any): any {
        if (((typeof data === 'string') || data === null)) {
            return <any>Service.from2chars$java_lang_String(data);
        } else if (((data != null && data instanceof <any>Array && (data.length == 0 || data[0] == null ||(typeof data[0] === 'string'))) || data === null)) {
            return <any>Service.from2chars$char_A(data);
        } else throw new Error('invalid overload');
    }

    static into2chars$char(input: string): string[] {
        const ret: string[] = [null, null];
        ret[0] = String.fromCharCode((Service.periodicRemainder((input).charCodeAt(0), 16) + 70));
        ret[1] = String.fromCharCode((Service.periodicDivision((input).charCodeAt(0), 16) + 70));
        return ret;
    }

    static from2chars$char_A(input: string[]): string {
        return String.fromCharCode((((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input[1]) - 70) * 16 + ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input[0]) - 70)));
    }

    static periodicRemainder(i: number, j: number): number {
        let ret: number = i % j;
        if (ret < 0)ret += j;
        return ret;
    }

    static periodicDivision(i: number, j: number): number {
        let ret: number = (i / j|0);
        if (ret < 0)ret -= 1;
        return ret;
    }

    public static into4chars$java_lang_String(data: string): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < data.length; i++) {{
            /* append */(sb => { sb.str += <any>Service.into4chars$char(data.charAt(i)); return sb; })(ret);
        };}
        return /* toString */ret.str;
    }

    public static into4chars(data?: any): any {
        if (((typeof data === 'string') || data === null)) {
            return <any>Service.into4chars$java_lang_String(data);
        } else if (((typeof data === 'string') || data === null)) {
            return <any>Service.into4chars$char(data);
        } else throw new Error('invalid overload');
    }

    public static from4chars$java_lang_String(data: string): string {
        if (data == null)return null;
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < data.length; ) {{
            const chunk: string[] = [null, null, null, null];
            chunk[0] = data.charAt(i++);
            if (i >= data.length)return null;
            chunk[1] = data.charAt(i++);
            if (i >= data.length)return null;
            chunk[2] = data.charAt(i++);
            if (i >= data.length)return null;
            chunk[3] = data.charAt(i++);
            /* append */(sb => { sb.str += <any>Service.from4chars$char_A(chunk); return sb; })(ret);
        };}
        if (/* length */ret.str.length === 0)return null;
        return /* toString */ret.str;
    }

    public static from4chars(data?: any): any {
        if (((typeof data === 'string') || data === null)) {
            return <any>Service.from4chars$java_lang_String(data);
        } else if (((data != null && data instanceof <any>Array && (data.length == 0 || data[0] == null ||(typeof data[0] === 'string'))) || data === null)) {
            return <any>Service.from4chars$char_A(data);
        } else throw new Error('invalid overload');
    }

    static into4chars$char(input: string): string[] {
        const ret: string[] = [null, null, null, null];
        let mod: number = Service.periodicRemainder((input).charCodeAt(0), 16 * 16 * 16);
        let div: number = Service.periodicDivision((input).charCodeAt(0), 16 * 16 * 16);
        ret[3] = String.fromCharCode((div + 70));
        div = Service.periodicDivision(mod, 16 * 16);
        mod = Service.periodicRemainder(mod, 16 * 16);
        ret[2] = String.fromCharCode((div + 70));
        ret[0] = String.fromCharCode((Service.periodicRemainder(mod, 16) + 70));
        ret[1] = String.fromCharCode((Service.periodicDivision(mod, 16) + 70));
        return ret;
    }

    static from4chars$char_A(input: string[]): string {
        return String.fromCharCode((((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input[3]) - 70) * 16 * 16 * 16 + ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input[2]) - 70) * 16 * 16 + ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input[1]) - 70) * 16 + ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(input[0]) - 70)));
    }

    /**
     * Used to init matrix cells at the bottom with a set of guessed symbols
     * @param {number[]} s
     * @return
     * @return {int[]}
     */
    public static toArray(s: Array<number>): number[] {
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(/* size */(<number>s.length));
        let i: number = 0;
        for(let index = 0; index < s.length; index++) {
            let ii = s[index];
            ret[i++] = ii
        }
        return ret;
    }
}
Service["__class"] = "oracle.arbori.util.Service";


export namespace Service {

    export enum CLEAN_TYPE {
        OFF, TRANSFORM30, TRANSFORM128, QUOTE30, QUOTE128, UNIQUE
    }
}




import { DbObjNames } from './DbObjNames.js';


import { CharOffsets } from './CharOffsets.js';
