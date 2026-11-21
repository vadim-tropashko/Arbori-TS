/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley';
import { EarleyPredictionCache } from '../EarleyPredictionCache';

/**
 * Verifies the parser image; regenerate it with {@link UnifiedRules#main(String[])}.
 * @class
 */
export class PredictionCacheTest {
    /**
     * Ensures grammar changes cannot silently leave a stale packaged parser image behind.
     * @param {*} tempDir
     */
    validatePackagedPredictionCache_currentGrammar_matchesSource(tempDir: Path) {
        const source: SqlEarley = SqlEarley.fromSourceGrammar();
        EarleyPredictionCache.save(source, tempDir.resolve("source-predictions.cache"));
        const packaged: SqlEarley = new SqlEarley();
        Assertions.assertNotNull(packaged.allSymbols);
        Assertions.assertNotNull(packaged.rules);
        Assertions.assertNotNull(packaged.predicts);
        Assertions.assertEquals(packaged.allSymbols.length, packaged.predicts.length);
        Assertions.assertArrayEquals(source.allSymbols, packaged.allSymbols);
        Assertions.assertEquals(source.rules.length, packaged.rules.length);
        for(let i: number = 0; i < source.rules.length; i++) {{
            Assertions.assertNotNull(packaged.rules[i]);
            Assertions.assertNotNull(packaged.rules[i].rhs);
            Assertions.assertEquals(source.rules[i].head, packaged.rules[i].head);
            Assertions.assertArrayEquals(source.rules[i].rhs, packaged.rules[i].rhs);
        };}
        Assertions.assertArrayEquals(source.predicts, packaged.predicts, "Run UnifiedRules after changing the grammar");
        PredictionCacheTest.assertTerminalPredictionsEqual(source, packaged);
    }

    /**
     * Ensures the fixed-width codec preserves a cache accepted by the source grammar.
     * @param {*} tempDir
     */
    saveAndLoadPredictionCache_generatedCache_loadsSuccessfully(tempDir: Path) {
        const source: SqlEarley = SqlEarley.fromSourceGrammar();
        const cache: Path = tempDir.resolve("predictions.cache");
        EarleyPredictionCache.save(source, cache);
        const loaded: SqlEarley = SqlEarley.fromSourceGrammar();
        EarleyPredictionCache.load(loaded, cache);
        Assertions.assertArrayEquals(source.allSymbols, loaded.allSymbols);
        Assertions.assertEquals(source.rules.length, loaded.rules.length);
        for(let i: number = 0; i < source.rules.length; i++) {{
            Assertions.assertEquals(source.rules[i].head, loaded.rules[i].head);
            Assertions.assertArrayEquals(source.rules[i].rhs, loaded.rules[i].rhs);
        };}
        Assertions.assertArrayEquals(source.predicts, loaded.predicts);
        PredictionCacheTest.assertTerminalPredictionsEqual(source, loaded);
    }

    invalidPredictionCache_failsWithIOException(tempDir: Path) {
        const cache: Path = tempDir.resolve("invalid.cache");
        const output: GZIPOutputStream = new GZIPOutputStream(Files.newOutputStream(cache));
        try {
            output.write([0, 0, 0, 0, 0, 0, 0, 0]);
        } finally {
            output.close();
        }
        const exception: Error = <any>(Assertions.assertThrows(IOException, ((cache) => {
            return () => EarleyPredictionCache.load(SqlEarley.fromSourceGrammar(), cache)
        })(cache)));
        Assertions.assertEquals("Invalid prediction cache header", exception.message);
    }

    /*private*/ static assertTerminalPredictionsEqual(expected: SqlEarley, actual: SqlEarley) {
        try {
            const terminalPredictionsField: any = /* getDeclaredField */((c,p) => { return {owner:c,name:p}; })(Earley,"terminalPredictions");
            const expectedTerminals: Earley.PredictedTerminals[] = <Earley.PredictedTerminals[]>/* get */expected[terminalPredictionsField.name];
            const actualTerminals: Earley.PredictedTerminals[] = <Earley.PredictedTerminals[]>/* get */actual[terminalPredictionsField.name];
            const validField: any = /* getDeclaredField */((c,p) => { return {owner:c,name:p}; })(Earley.PredictedTerminals,"isValid");
            const symbolsField: any = /* getDeclaredField */((c,p) => { return {owner:c,name:p}; })(Earley.PredictedTerminals,"symbols");
            Assertions.assertNotNull(expectedTerminals);
            Assertions.assertNotNull(actualTerminals);
            Assertions.assertEquals(expectedTerminals.length, actualTerminals.length);
            for(let i: number = 0; i < expectedTerminals.length; i++) {{
                if (expectedTerminals[i] == null){
                    Assertions.assertNull(actualTerminals[i]);
                } else {
                    Assertions.assertNotNull(actualTerminals[i]);
                    Assertions.assertEquals(/* get */expectedTerminals[i][validField.name], /* get */actualTerminals[i][validField.name]);
                    Assertions.assertArrayEquals(<number[]>/* get */expectedTerminals[i][symbolsField.name], <number[]>/* get */actualTerminals[i][symbolsField.name]);
                }
            };}
        } catch(e) {
            throw Object.defineProperty(new Error("Unable to inspect terminal predictions"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
        }
    }
}
PredictionCacheTest["__class"] = "oracle.dbtools.parser.plsql.PredictionCacheTest";




import { SqlEarley } from './SqlEarley';

