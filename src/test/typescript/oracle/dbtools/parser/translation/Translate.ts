/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { Visual } from '../Visual';
import { Service } from '../../../arbori/util/Service';

export class Translate {
    public static main(args: string[]) {
        Translate.instantiateParser();
        const file: string = "input.sql";
        const input: string = Service.readFile$java_lang_Class$java_lang_String(Translate, file);
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        const matrix: Matrix = new Matrix(Translate.parser);
        if (/* size */(<number>src.length) < 1000)matrix.visual = new Visual(src, Translate.parser);
        Translate.parser.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (matrix.visual != null)matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const root: ParseNode = Translate.parser.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src, matrix, true);
        root.printTree$();
    }

    static parser: Earley = null;

    static rules: Array<RuleTuple>; public static rules_$LI$(): Array<RuleTuple> { if (Translate.rules == null) { Translate.rules = <any>([]); }  return Translate.rules; }

    static instantiateParser() {
        const p: Parsed = new Parsed(Service.readFile$java_lang_Class$java_lang_String(Translate, "sql_fragment.grammar"), Grammar.bnfParser(), "grammar");
        Grammar.grammar(p.getRoot(), p.getSrc(), Translate.rules_$LI$());
        Translate.parser = new Translate.Translate$0(Translate.rules_$LI$());
        Translate.parser.skipRanges = false;
    }
}
Translate["__class"] = "oracle.dbtools.parser.translation.Translate";


export namespace Translate {

    export class Translate$0 extends Earley {
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

        /**
         * 
         * @param {LexerToken[]} src
         * @param {Matrix} m
         * @param {Parser.EarleyCell} cell
         * @param {number} x
         * @param {number} y
         * @return {ParseNode}
         */
        public treeForACell(src: Array<LexerToken>, m: Matrix, cell: Parser.EarleyCell, x: number, y: number): ParseNode {
            let rule: number = -1;
            let pos: number = -1;
            for(let i: number = 0; i < cell.size(); i++) {{
                rule = cell.getRule(i);
                const t: Parser.Tuple = this.rules[rule];
                if (t.head !== this.getSymbol("\"statements\""))continue;
                pos = cell.getPosition(i);
                if (this.rules[rule].rhs.length === pos)return this.tree(src, m, x, y, rule, pos);
            };}
            return super.treeForACell(src, m, cell, x, y);
        }

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}




import { Parser } from '../Parser';


Translate.main(null);
