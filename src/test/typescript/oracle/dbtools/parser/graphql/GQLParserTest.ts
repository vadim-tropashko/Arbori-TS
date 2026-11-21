/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Parseable } from '../Parseable';
import { RuleTransforms } from '../RuleTransforms';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { Visual } from '../Visual';
import { SyntaxError } from '../plsql/SyntaxError';
import { ParserTest } from '../../test/ParserTest';
import { Service } from '../../../arbori/util/Service';

export class GQLParserTest {
    /*private*/ static runRegressionTest() {
        const ert: ParserTest = new ParserTest(GQLParser.getInstance(), new Lexer());
        ert.test("dbtools-libraries/dbtools-arbori/src/test/resources/oracle/dbtools/parser/graphql/regression.test");
    }

    public static main(args: string[]) {
        GQLParserTest.runRegressionTest();
    }
}
GQLParserTest["__class"] = "oracle.dbtools.parser.graphql.GQLParserTest";




import { GQLParser } from './GQLParser';


GQLParserTest.main(null);
