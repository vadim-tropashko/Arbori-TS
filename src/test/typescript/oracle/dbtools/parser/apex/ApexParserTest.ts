/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParserTest } from '../../test/ParserTest';
import { Base } from '../../test/Base';
import { Resource } from '../Resource';

export class ApexParserTest {
    static DEPRECATION_MESSAGE: string = "Deprecated in favor of APEXLangSecurityAnalyzer";

    public runRegressionTest() {
        let parser: ApexEarley;
        try {
            parser = ApexEarley.getInstance();
        } catch(error) {
            if (ApexParserTest.DEPRECATION_MESSAGE === error.message){
                return;
            }
            throw error;
        }
        new ParserTest(parser, new ApexLexer1()).test(Base.commonRoot() + '/' + Resource.testFolder + "/oracle/dbtools/parser/apex/regression.test");
    }

    public static main(args: string[]) {
        new ApexParserTest().runRegressionTest();
    }
}
ApexParserTest["__class"] = "oracle.dbtools.parser.apex.ApexParserTest";




import { ApexLexer1 } from './ApexLexer1';


import { ApexEarley } from './ApexEarley';


ApexParserTest.main(null);
