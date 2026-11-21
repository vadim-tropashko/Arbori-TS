/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { LexerToken } from '../LexerToken';
import { Parsed } from '../Parsed';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { Service } from '../../../arbori/util/Service';

export class HtmlEarley {
    static instance: Earley = null;

    public static getInstance(): Earley {
        if (HtmlEarley.instance != null)return HtmlEarley.instance;
        const htmlGrammar: Parsed = new Parsed(Service.readFile$java_lang_Class$java_lang_String(HtmlEarley, "html.grammar"), Grammar.bnfParser(), "grammar");
        const rules: Array<RuleTuple> = <any>([]);
        Grammar.grammar(htmlGrammar.getRoot(), htmlGrammar.getSrc(), rules);
        HtmlEarley.instance = new HtmlEarley.HtmlEarley$0(rules);
        return HtmlEarley.instance;
    }
}
HtmlEarley["__class"] = "oracle.dbtools.parser.html.HtmlEarley";


export namespace HtmlEarley {

    export class HtmlEarley$0 extends Earley {
        /**
         * 
         * @param {number} y
         * @param {LexerToken[]} src
         * @param {number} symbol
         * @param {number} suspect
         * @return {boolean}
         */
        isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
            if (symbol !== this.identifier)return false;
            const token: LexerToken = /* get */src[y];
            if (token.type === Token.DQUOTED_STRING)return true;
            if (token.type === Token.IDENTIFIER)return true;
            return false;
        }

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}



