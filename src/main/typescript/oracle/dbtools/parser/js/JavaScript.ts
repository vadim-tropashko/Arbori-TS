/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley.js';
import { Grammar } from '../Grammar.js';
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { Matrix } from '../Matrix.js';
import { ParseNode } from '../ParseNode.js';
import { RuleTransforms } from '../RuleTransforms.js';
import { RuleTuple } from '../RuleTuple.js';
import { Token } from '../Token.js';
import { Service } from '../../../arbori/util/Service.js';

export class JavaScript {
    static instance: Earley = null;

    public static keywords: string[]; public static keywords_$LI$(): string[] { if (JavaScript.keywords == null) { JavaScript.keywords = ["abstract", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "default", "delete", "do", "double", "else", "enum", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"]; }  return JavaScript.keywords; }

    public static getInstance(): Earley {
        if (JavaScript.instance != null)return JavaScript.instance;
        const rules: Array<RuleTuple> = <any>([]);
        const input: string = Service.readFile$java_lang_Class$java_lang_String(JavaScript, "js.grammar");
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, false, Lexer.GRAMMAR_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        Grammar.grammar(root, src, rules);
        RuleTransforms.eliminateEmptyProductions(rules);
        JavaScript.instance = new JavaScript.JavaScript$0(rules);
        JavaScript.instance.isCaseSensitive = true;
        return JavaScript.instance;
    }
}
JavaScript["__class"] = "oracle.dbtools.parser.js.JavaScript";


export namespace JavaScript {

    export class JavaScript$0 extends Earley {
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

        prioritizeRules(head: number, symbols: number[]) {
            const ruleNumbers: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(symbols.length);
            for(let i: number = 0; i < this.rules.length; i++) {{
                const t: Parser.Tuple = this.rules[i];
                if (t.head === head)for(let j: number = 0; j < symbols.length; j++) {{
                    if (t.rhs[0] === symbols[j]){
                        ruleNumbers[j] = i;
                        break;
                    }
                };}
            };}
            const tuples: Parser.Tuple[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(symbols.length);
            for(let j: number = 0; j < symbols.length; j++) {tuples[j] = this.rules[ruleNumbers[j]];}
            /* sort */((l) => {l.sort(); })(ruleNumbers);
            for(let i: number = 0; i < ruleNumbers.length; i++) {{
                this.rules[ruleNumbers[i]] = tuples[i];
            };}
        }

        /**
         * 
         * @param {number} ruleHead
         * @return {boolean}
         */
        isAsc(ruleHead: number): boolean {
            return true;
        }

        constructor(__arg0: any) {
            super(__arg0);
            (() => {
                this.prioritizeRules(this.getSymbol("\"sourceElements\""), [this.getSymbol("sourceElement"), this.getSymbol("\"sourceElements\"")]);
            })();
        }
    }

}




import { Parser } from '../Parser.js';

