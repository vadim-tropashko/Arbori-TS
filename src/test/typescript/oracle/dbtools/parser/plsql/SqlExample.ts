/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../arbori/util/Service';
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { Visual } from '../Visual';
import { VisualImpl } from '../VisualImpl';
import { ParsingCancelled } from '../ParsingCancelled';
import { RecognitionChain } from '../RecognitionChain';

export class SqlExample {
    public static example: string = "/Users/VTROPASH/sandbox/example.sql";

    public static visualize: boolean = false;

    public static main(args: string[]) {
        SqlExample.visualize = true;
        let input: string = Service.readFile$java_lang_String(SqlExample.example);
        if (1 === args.length){
            input = args[0];
        }
        const t1: number = /* currentTimeMillis */Date.now();
        const earley: SqlEarley = SqlEarley.getInstance();
        const t2: number = /* currentTimeMillis */Date.now();
        console.info("Earley init time = " + (t2 - t1));
        const T: boolean = true;
        const F: boolean = false;
        earley.printOrderedRules("\"cond_or_expr\"", T, T);
        for(let index = 0; index < earley.allSymbols.length; index++) {
            let s = earley.allSymbols[index];
            if (s.length < 2)throw Object.defineProperty(new Error("s=" + s), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        let maxRuleLen: number = 0;
        for(let index = 0; index < earley.rules.length; index++) {
            let rule = earley.rules[index];
            {
                if (maxRuleLen < rule.rhs.length)maxRuleLen = rule.rhs.length;
                if (rule.rhs.length === 1 && rule.head === rule.rhs[0])console.info("***** " + earley.allSymbols[rule.head] + ":" + earley.allSymbols[rule.head]);
            }
        }
        console.info("----rules=" + earley.rules.length);
        console.info("----maxRuleLen=" + maxRuleLen);
        console.info("!nil=" + earley.getSymbol("!nil"));
        console.info("allSymbols[0]=" + earley.allSymbols[0]);
        console.info("allSymbols[1]=" + earley.allSymbols[1]);
        console.info("allSymbols[2]=" + earley.allSymbols[2]);
        const parsed: Parsed = new Parsed(input, earley, "sql_statements");
        SqlExample.parse(parsed);
    }

    public static parse(parsed: Parsed) {
        let t1: number = /* currentTimeMillis */Date.now();
        const src: Array<LexerToken> = parsed.getSrc();
        if (/* size */(<number>src.length) > 2147483647)throw Object.defineProperty(new Error(/* size */(<number>src.length) + " tokens"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        let t2: number = /* currentTimeMillis */Date.now();
        console.info("Lex time = " + (t2 - t1));
        if (/* size */(<number>src.length) < 100)LexerToken.print$java_util_List(src);
        const earley: Earley = parsed.getEarley();
        const matrix: Matrix = new Matrix(earley);
        if (SqlExample.visualize && 0 < /* size */(<number>src.length) && /* size */(<number>src.length) < 1000)matrix.visual = new VisualImpl(src, earley);
        if (!SqlExample.visualize)matrix.visual = null;
        console.info(matrix.toString().substring(0, 10));
        t1 = /* currentTimeMillis */Date.now();
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        console.info(matrix.toString().substring(0, 10));
        t2 = /* currentTimeMillis */Date.now();
        console.info("Earley parse time = " + (t2 - t1));
        if (matrix.visual != null)matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const top: Cell = matrix.get(0, /* size */(<number>src.length));
        if (top != null)console.info(/* size */(<number>src.length) + " tokens, top = " + top.toString()); else {
            console.info(SyntaxError.checkSyntax$java_lang_String$java_lang_String_A(parsed.input, ["sql_statements", "select", "insert", "update", "delete", "merge"]));
        }
        t1 = /* currentTimeMillis */Date.now();
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src, matrix, true, parsed.input);
        t2 = /* currentTimeMillis */Date.now();
        console.info("Reduction time = " + (t2 - t1));
        if (/* size */(<number>src.length) < 1000)new RecognitionChain(root).printTree$(); else root.printTree$int(3);
        root.contentAsStrings();
    }
}
SqlExample["__class"] = "oracle.dbtools.parser.plsql.SqlExample";




import { SyntaxError } from './SyntaxError';


import { Parser } from '../Parser';


import { SqlEarley } from './SqlEarley';


SqlExample.main(null);
