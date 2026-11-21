/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../arbori/util/Service.js';
import { Earley } from '../Earley.js';

export class JsonEarley {
    static instance: Earley = null;

    public static jsonParser(): Earley {
        if (JsonEarley.instance != null)return JsonEarley.instance;
        const rules: Array<RuleTuple> = <any>([]);
        const input: string = Service.readFile$java_lang_Class$java_lang_String(JsonEarley, "/oracle/dbtools/parser/json/json.grammar");
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        Grammar.grammar(root, src, rules);
        RuleTransforms.eliminateEmptyProductions(rules);
        JsonEarley.instance = new JsonEarley.JsonEarley$0(rules);
        JsonEarley.instance.isCaseSensitive = true;
        return JsonEarley.instance;
    }

    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String("arbori/src/test/resources/oracle/dbtools/parser/json/call.json");
        let t1: number = /* nanoTime */(Date.now() * 1000000);
        LexerToken.customLineCommentPrefixes = ["\"raw\""];
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.JAVA_$LI$() + LexerToken.JsonStrings_$LI$());
        let t2: number = /* nanoTime */(Date.now() * 1000000);
        LexerToken.print$java_util_List(src);
        console.info("Lex time = " + (n => n<0?Math.ceil(n):Math.floor(n))((t2 - t1) / 1000000));
        const earley: Earley = JsonEarley.jsonParser();
        const matrix: Matrix = new Matrix(earley);
        const t21: number = /* nanoTime */(Date.now() * 1000000);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const t22: number = /* nanoTime */(Date.now() * 1000000);
        console.info("parse time = " + (n => n<0?Math.ceil(n):Math.floor(n))((t22 - t21) / 1000000));
        t1 = /* nanoTime */(Date.now() * 1000000);
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src, matrix, true);
        if (/* size */(<number>src.length) < 1000)root.printTree$();
        t2 = /* nanoTime */(Date.now() * 1000000);
        console.info("Reduction time = " + (n => n<0?Math.ceil(n):Math.floor(n))((t2 - t1) / 1000000));
    }
}
JsonEarley["__class"] = "oracle.dbtools.parser.json.JsonEarley";


export namespace JsonEarley {

    export class JsonEarley$0 extends Earley {
        /**
         * 
         * @param {number} y
         * @param {LexerToken[]} src
         * @param {number} symbol
         * @param {number} suspect
         * @return {boolean}
         */
        isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
            const token: LexerToken = /* get */src[y];
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING;
        }

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}




import { Matrix } from '../Matrix.js';


import { Token } from '../Token.js';


import { RuleTransforms } from '../RuleTransforms.js';


import { Grammar } from '../Grammar.js';


import { ParseNode } from '../ParseNode.js';


import { LexerToken } from '../LexerToken.js';


import { RuleTuple } from '../RuleTuple.js';
