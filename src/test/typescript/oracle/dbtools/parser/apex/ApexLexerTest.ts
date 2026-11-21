/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerRegressionTest } from '../LexerRegressionTest';
import { LexerToken } from '../LexerToken';

export class ApexLexerTest extends LexerRegressionTest {
    public static main(args: string[]) {
        LexerRegressionTest.singleTest = null;
        new ApexLexerTest().run();
    }

    public testLexerRegression() {
        this.run();
    }

    /**
     * 
     * @return {string}
     */
    fixtureDirectory(): string {
        return "apex";
    }

    /**
     * 
     * @param {string} input
     * @return {LexerToken[]}
     */
    parse(input: string): Array<LexerToken> {
        return ApexLexer1.parse$java_lang_String$boolean(input, this.keepsWhitespaceAndComments());
    }
}
ApexLexerTest["__class"] = "oracle.dbtools.parser.apex.ApexLexerTest";




import { ApexLexer1 } from './ApexLexer1';


ApexLexerTest.main(null);
