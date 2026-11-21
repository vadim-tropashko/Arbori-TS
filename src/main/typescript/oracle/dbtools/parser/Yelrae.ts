/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Parser } from './Parser.js';

/**
 * Earley parser walking backwards
 * @author Dim
 * @param {Earley} employee
 * @class
 * @extends Parser
 */
export class Yelrae extends Parser implements Parseable {
    public static readonly __class = "oracle.dbtools.parser.Yelrae";
    public static PARSE_WITH_ERRORS: string = "parse with errors";

    public employee: Earley;

    static visual: Visual = null;

    static sqlInstance: Yelrae = null;

    private static sqlRecognizerFactory: ((roots: string[]) => Earley & { reInitKeywords(keywords: string[]): void }) | null = null;

    public static registerSqlRecognizerFactory(factory: (roots: string[]) => Earley & { reInitKeywords(keywords: string[]): void }): void {
        Yelrae.sqlRecognizerFactory = factory;
    }

    private static newSqlRecognizer(roots: string[]): Earley & { reInitKeywords(keywords: string[]): void } {
        if (Yelrae.sqlRecognizerFactory == null) {
            throw new Error("SQL recognizer is unavailable; import SqlEarley first");
        }
        return Yelrae.sqlRecognizerFactory(roots);
    }

    public static sqlYelraeInstance(): Yelrae {
        if (Yelrae.sqlInstance == null){
            const earley = Yelrae.newSqlRecognizer(["sql_statements", "subprg_body", "expr", "fml_part", "paren_expr_list", "basic_decl_item_list", "select"]);
            Yelrae.sqlInstance = new Yelrae(earley);
            const keywords: string[] = ["\'WITH\'", "\'SELECT\'", "\'FROM\'", "\'WHERE\'", "\'AND\'", "\'OR\'", "\'NOT\'", "\'DISTINCT\'", "\'UNION\'", "\'ALL\'", "\'INNER\'", "\'LEFT\'", "\'NATURAL\'", "\'OUTER\'", "\'ON\'", "\'INSERT\'", "\'UPDATE\'", "\'CREATE\'", "\'ALTER\'", "\'TABLE\'", "\'VALUES\'", "\'NUMBER\'", "\'VARCHAR2\'", "\'DATE\'", "\'INTEGER\'", "\'MULTISET\'", "\'IF\'", "\'THEN\'", "\'ELSE\'", "\'ELSEIF\'", "\'CASE\'", "\'WHEN\'", "\'DECLARE\'", "\'BEGIN\'", "\'END\'", "\'EXCEPTION\'"];
            earley.reInitKeywords(keywords);
        }
        return Yelrae.sqlInstance;
    }

    public parse$java_util_List$oracle_dbtools_parser_Matrix(src: Array<LexerToken>, matrix: Matrix): ParseNode {
        const crs: Array<LexerToken> = Yelrae.inverseSrc(src);
        if (Yelrae.visual != null){
            Yelrae.visual = new Visual(crs, this.employee);
            matrix.visual = Yelrae.visual;
            Yelrae.visual.matrix = matrix;
        }
        this.employee.parse$java_util_List$oracle_dbtools_parser_Matrix(crs, matrix);
        if (Yelrae.visual != null)Yelrae.visual.draw$();
        const out: ParseNode = this.employee.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(crs, matrix, true);
        this.invert(/* size */(<number>src.length), out);
        return out;
    }

    public parse(src?: any, matrix?: any): ParseNode {
        if (((src != null && (src instanceof Array)) || src === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null)) {
            return <any>this.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        } else if (((src != null && (src instanceof Array)) || src === null) && matrix === undefined) {
            return <any>this.parse$java_util_List(src);
        } else throw new Error('invalid overload');
    }

    /*private*/ invert(length: number, node: ParseNode) {
        const morf: number = length - node.from;
        node.from = length - node.to;
        node.to = morf;
        if (node.lft != null)this.invert(length, node.lft);
        if (node.rgt != null)this.invert(length, node.rgt);
        if (node.rgt != null && node.lft != null){
            const tmp: ParseNode = node.rgt;
            node.rgt = node.lft;
            node.lft = tmp;
        }
        if (node.topLevel != null){
            const topLevel: Array<ParseNode> = <any>([]);
            for(let index = 0; index < node.topLevel.length; index++) {
                let c = node.topLevel[index];
                {
                    this.invert(length, c);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(topLevel, c);
                }
            }
            node.topLevel = topLevel;
        }
    }

    public static inverseSrc(src: Array<LexerToken>): Array<LexerToken> {
        const crs: Array<LexerToken> = <any>([]);
        const size: number = /* size */(<number>src.length);
        for(let i: number = 0; i < size; i++) {{
            /* add */(crs.push(/* get */src[size - i - 1])>0);
        };}
        return crs;
    }

    public constructor(employee: Earley) {
        super();
        if (this.employee === undefined) { this.employee = null; }
        if (employee.predicts != null)throw Object.defineProperty(new Error("template.predicts != null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        this.employee = employee;
        employee.rules = employee.invertRules();
        this.allSymbols = employee.allSymbols;
        this.symbolIndexes = employee.symbolIndexes;
        this.rules = employee.rules;
    }

    public parse$java_util_List(src: Array<LexerToken>): ParseNode {
        const matrix: Matrix = new Matrix(this.employee);
        return this.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
    }

    public static duplexParse$java_util_List$oracle_dbtools_parser_Matrix(src: Array<LexerToken>, forward: Matrix): ParseNode {
        return Yelrae.duplexParse$oracle_dbtools_parser_Earley$java_util_List$oracle_dbtools_parser_Matrix(Yelrae.newSqlRecognizer(["sql_statements", "subprg_body", "expr", "fml_part", "paren_expr_list", "basic_decl_item_list"]), src, forward);
    }

    public static duplexParse$oracle_dbtools_parser_Earley$java_util_List$oracle_dbtools_parser_Matrix(earley: Earley, src: Array<LexerToken>, forward: Matrix): ParseNode {
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src, forward, true);
        let endOdParse: number = 0;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                endOdParse = child.to
            }
        }
        if (root.to === endOdParse)return root;
        try {
            const addendum: ParseNode = earley.getYelrae().parse$java_util_List(src);
            if (addendum.topLevel != null)for(let index = 0; index < addendum.topLevel.length; index++) {
                let child = addendum.topLevel[index];
                root.addTopLevel(child)
            }
            return root;
        } catch(e) {
            console.error(e.message, e);
            return root;
        }
    }

    public static duplexParse(earley?: any, src?: any, forward?: any): ParseNode {
        if (((earley != null && earley instanceof <any>Earley) || earley === null) && ((src != null && (src instanceof Array)) || src === null) && ((forward != null && forward instanceof <any>Matrix) || forward === null)) {
            return <any>Yelrae.duplexParse$oracle_dbtools_parser_Earley$java_util_List$oracle_dbtools_parser_Matrix(earley, src, forward);
        } else if (((earley != null && (earley instanceof Array)) || earley === null) && ((src != null && src instanceof <any>Matrix) || src === null) && forward === undefined) {
            return <any>Yelrae.duplexParse$java_util_List$oracle_dbtools_parser_Matrix(earley, src);
        } else throw new Error('invalid overload');
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
    treeForACell(src: Array<LexerToken>, m: Matrix, cell: Parser.EarleyCell, x: number, y: number): ParseNode {
        throw Object.defineProperty(new Error("Abstract method"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    /**
     * 
     * @param {number} ruleNo
     * @param {number} pos
     * @param {boolean} selected
     * @param {number} x
     * @param {number} mid
     * @param {number} y
     * @param {Matrix} matrix
     * @param {{ str: string, toString: Function }} sb
     */
    toHtml(ruleNo: number, pos: number, selected: boolean, x: number, mid: number, y: number, matrix: Matrix, sb: { str: string, toString: Function }) {
        throw Object.defineProperty(new Error("Abstract method"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }
}
Yelrae["__interfaces"] = ["oracle.dbtools.parser.Parseable"];



export namespace Yelrae {

    export class Yelrae$0 extends Yelrae {
        constructor(__arg0: any) {
            super(__arg0);
        }
    }
    Yelrae$0["__interfaces"] = ["oracle.dbtools.parser.Parseable"];


}




import { Matrix } from './Matrix.js';


import { ParseNode } from './ParseNode.js';


import { Lexer } from './Lexer.js';


import { LexerToken } from './LexerToken.js';


import { Visual } from './Visual.js';


import { Earley } from './Earley.js';


import { Parseable } from './Parseable.js';


