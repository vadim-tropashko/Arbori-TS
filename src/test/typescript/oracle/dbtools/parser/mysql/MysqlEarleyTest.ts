/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';

/**
 * Verifies cached MySQL grammar state and request-local parser reuse.
 * @class
 */
export class MysqlEarleyTest {
    /**
     * Verifies the grammar and prediction tables are initialized once and shared by clones.
     */
    constructor_cachedGrammarAndPredictions_areShared() {
        const firstParser: MysqlEarley = new MysqlEarley();
        const secondParser: MysqlEarley = new MysqlEarley();
        Assertions.assertNotSame(firstParser, secondParser);
        Assertions.assertSame(firstParser.rules, secondParser.rules);
        Assertions.assertSame(firstParser.allSymbols, secondParser.allSymbols);
        Assertions.assertSame(firstParser.predicts, secondParser.predicts);
    }

    /**
     * Verifies independent parser clones can parse concurrently without shared matrix state.
     */
    constructor_concurrentParsing_returnsParseTrees() {
        const source: Array<LexerToken> = Lexer.parse$java_lang_String("select * from test_table;");
        const executor: ExecutorService = Executors.newFixedThreadPool(4);
        const parses: Array<Future<ParseNode>> = <any>([]);
        try {
            for(let i: number = 0; i < 8; i++) {{
                /* add */(parses.push(executor.submit<any>(((source) => {
                    return () => new MysqlEarley().parse$java_util_List(source)
                })(source)))>0);
            };}
            for(let index = 0; index < parses.length; index++) {
                let parse = parses[index];
                {
                    Assertions.assertNotNull(parse.get(30, TimeUnit.SECONDS));
                }
            }
        } finally {
            executor.shutdownNow();
        }
    }
}
MysqlEarleyTest["__class"] = "oracle.dbtools.parser.mysql.MysqlEarleyTest";




import { MysqlEarley } from './MysqlEarley';

