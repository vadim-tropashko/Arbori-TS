/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerToken } from '../LexerToken.js';

/**
 * Reserved home for the adapter from ANTLR lexer tokens to Arbori lexer tokens.
 * 
 * <p>The APEX lexer no longer uses ANTLR, so retaining the former implementation
 * would unnecessarily retain the ANTLR runtime dependency. Keep this class so a
 * future ANTLR lexer has the established integration point and can restore the
 * adapter together with its runtime dependency.</p>
 * @class
 */
export class AntlrLexerAdapter {
    /**
     * Converts ANTLR tokens while preserving their original source offsets.
     * 
     * @param {string} input the text that was lexed
     * @param antlrTokens tokens emitted by the ANTLR lexer
     * @param tokenTypeMapper maps an ANTLR token to an Arbori token type
     * @return {LexerToken[]} Arbori lexer tokens in ANTLR source order
     */
    public static convert(input: string): Array<LexerToken> {
        const result: Array<LexerToken> = <any>([]);
        return result;
    }
}
AntlrLexerAdapter["__class"] = "oracle.dbtools.parser.antlr.AntlrLexerAdapter";



