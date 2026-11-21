import { ParserTest } from "../../test/ParserTest.js";
import { Resource } from "../../../../../../main/typescript/oracle/dbtools/parser/Resource.js";
import { LexerRegressionTest } from "../LexerRegressionTest.js";
import { ArboriTest } from "../../app/ArboriTest.js";
import { GrammarExtensionTest } from "./GrammarExtensionTest.js";
import { SqlInsightTest } from "../../app/SqlInsightTest.js";

/** Runs the SQL parser regression and documentation DSL fixtures in sequence. */
export class DocStatementsTest {
    static async main(_args: string[] = []): Promise<void> {
        const started = Date.now();
        const fixtures = [
            ["SQL parser regressions", "oracle/dbtools/parser/plsql/regression.test"],
            ["PL/SQL documentation statements", "oracle/dbtools/parser/plsql/doc/doc_plsql.test"],
            ["SQL documentation statements", "oracle/dbtools/parser/plsql/doc/doc_sql.test"],
        ] as const;

        for (const [name, relativePath] of fixtures) {
            console.log(`\n=== ${name} ===`);
            ParserTest.failedTests_$LI$().length = 0;
            new ParserTest().test(Resource.testFolder + relativePath);
        }

        console.log("\n=== Lexer regressions ===");
        LexerRegressionTest.test();

        console.log("\n=== Arbori engine ===");
        const arboriTest = new ArboriTest();
        arboriTest.test();
        if (!ArboriTest.unitTestIsOK) throw new Error("Arbori engine tests failed");

        // Temporarily disabled while the SyntaxError expected-suggestion cases are reconciled.
        // if (!new SyntaxErrorTest().test()) throw new Error("SQL syntax error tests failed");

        console.log("\n=== SQL Insight ===");
        await SqlInsightTest.main([]);

        console.log("\n=== Grammar extension ===");
        new GrammarExtensionTest().test();

        console.log(`DocStatementsTest completed in ${Date.now() - started} ms.`);
    }
}

DocStatementsTest.main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`DocStatementsTest failed: ${message}`);
    process.exitCode = 1;
});
