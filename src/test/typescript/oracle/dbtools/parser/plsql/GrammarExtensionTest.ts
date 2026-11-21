/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../../../../../../main/typescript/oracle/dbtools/parser/Earley.js';
import { Grammar } from '../../../../../../main/typescript/oracle/dbtools/parser/Grammar.js';
import { Lexer } from '../../../../../../main/typescript/oracle/dbtools/parser/Lexer.js';
import { LexerToken } from '../../../../../../main/typescript/oracle/dbtools/parser/LexerToken.js';
import { Matrix } from '../../../../../../main/typescript/oracle/dbtools/parser/Matrix.js';
import { ParseNode } from '../../../../../../main/typescript/oracle/dbtools/parser/ParseNode.js';
import { RuleTuple } from '../../../../../../main/typescript/oracle/dbtools/parser/RuleTuple.js';
import { ParsedSql } from '../../../../../../main/typescript/oracle/dbtools/parser/plsql/ParsedSql.js';
import { SqlEarley } from '../../../../../../main/typescript/oracle/dbtools/parser/plsql/SqlEarley.js';

export class GrammarExtensionTest {
    public static main(args: string[]) {
        GrammarExtensionTest.testAll();
    }

    public test() {
        GrammarExtensionTest.testAll();
    }

    static testAll() {
        const failed: Array<string> = <any>([]);
        for(let index = 0; index < GrammarExtensionTest.testInputs_$LI$().length; index++) {
            let tst = GrammarExtensionTest.testInputs_$LI$()[index];
            {
                try {
                    GrammarExtensionTest.testOne(tst);
                } catch(e) {
                    /* add */(failed.push(tst + "-->" + e.message)>0);
                }
            }
        }
        if (0 < /* size */(<number>failed.length))throw Object.defineProperty(new Error(/* toString */('['+failed.join(', ')+']')), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
    }

    static testInputs: string[]; public static testInputs_$LI$(): string[] { if (GrammarExtensionTest.testInputs == null) { GrammarExtensionTest.testInputs = ["select * from (select AI informal query);"]; }  return GrammarExtensionTest.testInputs; }

    static testOne(input: string) {
        const grammar: string = "subquery: select_ai_command;\nselect_ai_command: \'RUNSQL\';\nselect_ai_command: \'SHOWSQL\';\nselect_ai_command: \'NARRATE\';\nselect_ai_command: \'CHAT\';\nselect_ai_command: \'EXPLAINSQL\';\nselect_ai_command: \'FEEDBACK\';\nselect_ai_command: \'SUMMARIZE\';\nselect_ai_command: \'SELECT\' \'AI\' limited_text ;\n";
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(grammar);
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, grammar);
        const rules: Array<RuleTuple> = <any>([]);
        Grammar.grammar(root, src, rules);
        SqlEarley.extendGrammar(rules);
        const parsed: ParsedSql = new ParsedSql(input);
        if (!parsed.getRoot().contains$java_lang_String("sql_statement")){
            throw Object.defineProperty(new Error("!parsed.getRoot().contains(\"sql_statement\")"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
        }
    }

}
GrammarExtensionTest["__class"] = "oracle.dbtools.parser.plsql.GrammarExtensionTest";




if (process.argv[1]?.endsWith("/GrammarExtensionTest.ts") || process.argv[1]?.endsWith("/GrammarExtensionTest.js")) {
    GrammarExtensionTest.main([]);
}
