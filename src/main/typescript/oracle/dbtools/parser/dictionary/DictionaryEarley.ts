/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley.js';
import { Grammar } from '../Grammar.js';
import { LexerToken } from '../LexerToken.js';
import { Matrix } from '../Matrix.js';
import { ParseNode } from '../ParseNode.js';
import { RuleTransforms } from '../RuleTransforms.js';
import { RuleTuple } from '../RuleTuple.js';
import { Token } from '../Token.js';
import { Visual } from '../Visual.js';
import { JsonEarley } from '../json/JsonEarley.js';
import { Service } from '../../../arbori/util/Service.js';

export class DictionaryEarley {
    static instance: Earley = null;

    public static getInstance(): Earley {
        if (DictionaryEarley.instance != null)return DictionaryEarley.instance;
        const rules: Array<RuleTuple> = <any>([]);
        const input: string = Service.readFile$java_lang_Class$java_lang_String(DictionaryEarley, "dictionary.grammar");
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        Grammar.grammar(root, src, rules);
        RuleTransforms.eliminateEmptyProductions(rules);
        DictionaryEarley.instance = new DictionaryEarley.DictionaryEarley$0(rules);
        DictionaryEarley.instance.isCaseSensitive = false;
        return DictionaryEarley.instance;
    }

    public static main(args: string[]) {
        let input: string = Service.readFile$java_lang_String("src/test/resources/oracle/dbtools/parser/dictionary/hr.dict");
        input = Service.readFile$java_lang_String("C:\\Temp\\Dictionary\\hr ~localhost_1521_xe\\dbobjects.dict");
        let t1: number = /* nanoTime */(Date.now() * 1000000);
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String(input);
        let t2: number = /* nanoTime */(Date.now() * 1000000);
        console.info("Lex time = " + (n => n<0?Math.ceil(n):Math.floor(n))((t2 - t1) / 1000000));
        const earley: Earley = DictionaryEarley.getInstance();
        const visual: Visual = new Visual(src, earley);
        const matrix: Matrix = new Matrix(earley);
        const t21: number = /* nanoTime */(Date.now() * 1000000);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const t22: number = /* nanoTime */(Date.now() * 1000000);
        console.info("parse time = " + (n => n<0?Math.ceil(n):Math.floor(n))((t22 - t21) / 1000000));
        t1 = /* nanoTime */(Date.now() * 1000000);
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src, matrix, true);
        if (/* size */(<number>src.length) < 1000)root.printTree$();
        t2 = /* nanoTime */(Date.now() * 1000000);
        console.info("Reduction time = " + (n => n<0?Math.ceil(n):Math.floor(n))((t2 - t1) / 1000000));
    }
}
DictionaryEarley["__class"] = "oracle.dbtools.parser.dictionary.DictionaryEarley";


export namespace DictionaryEarley {

    export class DictionaryEarley$0 extends Earley {
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
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'TABLES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'VIEWS\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'PACKAGES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'PROCEDURES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'FUNCTIONS\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'TRIGGERS\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'INDEXES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'MATERIALIZED\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'OPERATORS\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'TYPES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'QUEUES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'QUEUE\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'SEQUENCES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'SYNONYMS\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'PUBLIC\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'DATABASE\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'DIRECTORIES\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'EDITIONS\'") === suspect)return false;
            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'OTHER\'") === suspect){
                if (y + 1 < /* size */(<number>src.length) && (/* get */src[y + 1].content.toUpperCase() === ("USERS")))return false;
                if (y + 1 < /* size */(<number>src.length) && (/* get */src[y + 1].content.toUpperCase() === ("DATATYPES")))return false;
            }
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING;
        }

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}
