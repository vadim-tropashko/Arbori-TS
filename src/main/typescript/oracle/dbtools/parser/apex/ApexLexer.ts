/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';

/**
 * @deprecated Use {@link ApexLexer1}. Kept as a source-compatible facade for
 * existing callers while the handwritten lexer replaces ANTLR.
 * @class
 * @extends Lexer
 */
export class ApexLexer extends Lexer {
    public static parse(input?: any, keepWSandCOMMENTS?: any, flags?: any): Array<LexerToken> {
        if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && ((typeof flags === 'number') || flags === null)) {
            return super.parse(input, keepWSandCOMMENTS, flags);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'string') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>ApexLexer.parse$java_lang_String$java_lang_String(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && ((typeof keepWSandCOMMENTS === 'boolean') || keepWSandCOMMENTS === null) && flags === undefined) {
            return <any>ApexLexer.parse$java_lang_String$boolean(input, keepWSandCOMMENTS);
        } else if (((typeof input === 'string') || input === null) && keepWSandCOMMENTS === undefined && flags === undefined) {
            return <any>ApexLexer.parse$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    public static parse$java_lang_String(input: string): Array<LexerToken> {
        return ApexLexer1.parse$java_lang_String(input);
    }

    public static parse$java_lang_String$boolean(input: string, keepWhitespaceAndComments: boolean): Array<LexerToken> {
        return ApexLexer1.parse$java_lang_String$boolean(input, keepWhitespaceAndComments);
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
}
ApexLexer["__class"] = "oracle.dbtools.parser.apex.ApexLexer";




import { ApexLexer1 } from './ApexLexer1.js';

