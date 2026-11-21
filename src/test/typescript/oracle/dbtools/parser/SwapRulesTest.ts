/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { SqlEarley } from './plsql/SqlEarley';

export class SwapRulesTest {
    static earley: SqlEarley = null;

    static setUp() {
        SwapRulesTest.earley = new SqlEarley();
    }

    public swapRulesProducesCorrectArrangement() {
        const ruleA: string = SwapRulesTest.earley.rules[0].toString$();
        const ruleB: string = SwapRulesTest.earley.rules[1].toString$();
        SwapRulesTest.earley.swapRules(ruleA, ruleB);
        assertEquals(ruleB, SwapRulesTest.earley.rules[0].toString$());
        assertEquals(ruleA, SwapRulesTest.earley.rules[1].toString$());
        SwapRulesTest.earley.swapRules(ruleA, ruleB);
        assertEquals(ruleA, SwapRulesTest.earley.rules[0].toString$());
        assertEquals(ruleB, SwapRulesTest.earley.rules[1].toString$());
    }

    public swapSameRuleIsNoOp() {
        const rule: string = SwapRulesTest.earley.rules[0].toString$();
        const before: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(SwapRulesTest.earley.rules.length);
        for(let i: number = 0; i < SwapRulesTest.earley.rules.length; i++) {before[i] = SwapRulesTest.earley.rules[i].toString$();}
        SwapRulesTest.earley.swapRules(rule, rule);
        for(let i: number = 0; i < SwapRulesTest.earley.rules.length; i++) {assertEquals(before[i], SwapRulesTest.earley.rules[i].toString$(), "Rule at index " + i + " should be unchanged");}
    }

    public matchesRuleAgreesWithToStringForAllRules() {
        for(let i: number = 0; i < Math.min(SwapRulesTest.earley.rules.length, 500); i++) {{
            const ruleStr: string = SwapRulesTest.earley.rules[i].toString$();
            let foundIndex: number = -1;
            for(let j: number = 0; j < SwapRulesTest.earley.rules.length; j++) {{
                if (SwapRulesTest.earley.rules[j].toString$() === ruleStr){
                    foundIndex = j;
                    break;
                }
            };}
            assertEquals(i, foundIndex, "Rule at index " + i + " should be found by its toString(): " + ruleStr);
        };}
    }
}
SwapRulesTest["__class"] = "oracle.dbtools.parser.SwapRulesTest";



