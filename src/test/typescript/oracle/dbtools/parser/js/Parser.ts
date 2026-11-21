/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { RuleTransforms } from '../RuleTransforms';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { Visual } from '../Visual';
import { JavaScript } from './JavaScript';
import { SyntaxError } from '../plsql/SyntaxError';
import { Service } from '../../../arbori/util/Service';

export class Parser {
    static instance: Earley = null;

    public static getInstance(): Earley {
        if (Parser.instance != null)return Parser.instance;
        const rules: Array<RuleTuple> = Rules.read("dbtools-libraries/dbtools-arbori/src/test/resources/oracle/dbtools/parser/js/aggregate.rules");
        RuleTransforms.eliminateEmptyProductions(rules);
        Parser.instance = new Parser.Parser$0(rules);
        Parser.instance.isCaseSensitive = true;
        return Parser.instance;
    }

    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.js");
        const earley: Earley = Parser.getInstance();
        const T: boolean = true;
        const F: boolean = false;
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$java_lang_String$int(input, "&`", LexerToken.JS_$LI$());
        if (/* size */(<number>src.length) < 1200)LexerToken.print$java_util_List(src);
        const matrix: Matrix = new Matrix(earley);
        let visual: Visual = null;
        if (/* size */(<number>src.length) < 1200)visual = new Visual(src, earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (/* size */(<number>src.length) < 500)visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const out: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const err: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["Statement_List1"], src, earley, matrix);
        if (err != null){
            console.info(err.getDetailedMessage());
            return;
        }
        out.printTree$();
    }
}
Parser["__class"] = "oracle.dbtools.parser.js.Parser";


export namespace Parser {

    export class Parser$0 extends Earley {
        /**
         * 
         * @param {number} y
         * @param {LexerToken[]} src
         * @param {number} symbol
         * @param {number} suspect
         * @return {boolean}
         */
        isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
            if (suspect != null && (y === 0 || !("." === /* get */src[y - 1].content)) && /* contains */(this._keywords.indexOf(<any>(suspect)) >= 0) && (suspect !== this.importKw || /* size */(<number>src.length) - 1 <= y || !("(" === /* get */src[y + 1].content)) && /* contains */(this._keywords.indexOf(<any>(suspect)) >= 0)){
                return false;
            }
            const token: LexerToken = /* get */src[y];
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.StringLiteral && token.type === Token.DQUOTED_STRING || symbol === this.RegExpLiteral && token.type === Token.REGEXP || symbol === this.TemplateLiteral && token.type === Token.BQUOTED_STRING;
        }

        public isOptimizable(src?: any, x?: any, mid?: any, y?: any): boolean {
            if (((src != null && (src instanceof Array)) || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
                return super.isOptimizable(src, x, mid, y);
            } else if (((src != null && src instanceof <any>Parser.Tuple) || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
                return <any>this.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(src, x, mid, y);
            } else if (((typeof src === 'number') || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
                return <any>this.isOptimizable$int$int$int$int(src, x, mid, y);
            } else throw new Error('invalid overload');
        }

        isOptimizable$int$int$int$int(headSym: number, preSym: number, mid: number, y: number): boolean {
            if ("LabeledStatement" === (this.allSymbols[headSym]))return false;
            if ("MemberExpression" === (this.allSymbols[headSym]))return false;
            if ("FunctionExpression" === (this.allSymbols[headSym]))return false;
            if ("AssignmentExpression" === (this.allSymbols[headSym]))return false;
            if ("IfStatement" === (this.allSymbols[headSym]))return false;
            if ("Statement_List1" === (this.allSymbols[headSym]))return false;
            if ("MethodDefinition_List1" === (this.allSymbols[headSym]))return false;
            return super.isOptimizable$int$int$int$int(headSym, preSym, mid, y);
        }

        /**
         * 
         * @param {Matrix} m
         * @param {number} x
         * @param {number} y
         */
        diagnose(m: Matrix, x: number, y: number) {
            if (false && Thread.currentThread().getStackTrace().length === 1000){
                const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
                const output: Cell = m.get(x, y);
                if (output == null){
                    /* append */(sb => { sb.str += <any>"null"; return sb; })(ret);
                } else {
                    /* append */(sb => { sb.str += <any>"[" + x + "," + y + ")\n"; return sb; })(ret);
                    const cutover: number = 50;
                    if (cutover < output.size())/* append */(sb => { sb.str += <any>" ... " + output.size() + " more symbols"; return sb; })(ret); else for(let i: number = 0; i < output.size() && i < cutover + 1; i++) {{
                        this.toString(output.getRule(i), output.getPosition(i), ret);
                        /* append */(sb => { sb.str += <any>'\n'; return sb; })(ret);
                    };}
                }
                JOptionPane.showMessageDialog(null, /* toString */ret.str);
            }
        }

        public keywords: string[];

        importKw: number;

        HEX_LITERAL: number;

        RegExpLiteral: number;

        StringLiteral: number;

        TemplateLiteral: number;

        _keywords: Array<number>;

        initKeywords() {
            for(let index = 0; index < this.keywords.length; index++) {
                let k = this.keywords[index];
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this._keywords, this.getSymbol(k))
            }
        }

        constructor(__arg0: any) {
            super(__arg0);
            this.keywords = ["\'abstract\'", "\'arguments\'", "\'await\'", "\'boolean\'", "\'break\'", "\'byte\'", "\'case\'", "\'catch\'", "\'char\'", "\'class\'", "\'const\'", "\'continue\'", "\'debugger\'", "\'delete\'", "\'do\'", "\'double\'", "\'else\'", "\'enum\'", "\'eval\'", "\'export\'", "\'false\'", "\'final\'", "\'finally\'", "\'float\'", "\'function\'", "\'goto\'", "\'if\'", "\'implements\'", "\'import\'", "\'instanceof\'", "\'int\'", "\'interface\'", "\'let\'", "\'long\'", "\'native\'", "\'new\'", "\'null\'", "\'package\'", "\'private\'", "\'protected\'", "\'public\'", "\'return\'", "\'short\'", "\'static\'", "\'super\'", "\'switch\'", "\'synchronized\'", "\'this\'", "\'throw\'", "\'throws\'", "\'transient\'", "\'true\'", "\'try\'", "\'typeof\'", "\'var\'", "\'void\'", "\'volatile\'", "\'while\'", "\'with\'", "\'yield\'"];
            if (this.importKw === undefined) { this.importKw = 0; }
            if (this.HEX_LITERAL === undefined) { this.HEX_LITERAL = 0; }
            if (this.RegExpLiteral === undefined) { this.RegExpLiteral = 0; }
            if (this.StringLiteral === undefined) { this.StringLiteral = 0; }
            if (this.TemplateLiteral === undefined) { this.TemplateLiteral = 0; }
            this._keywords = <any>([]);
            (() => {
                this.initKeywords();
                let ex1: string = "Expression:  SequenceExpression;";
                let ex2: string = "Expression:  UnaryExpression;";
                this.swapRules(ex1, ex2);
                ex1 = "Expression:  SequenceExpression;";
                ex2 = "Expression:  UpdateExpression;";
                this.swapRules(ex1, ex2);
                ex1 = "Expression:  SequenceExpression;";
                ex2 = "Expression:  YieldExpression;";
                this.swapRules(ex1, ex2);
                ex1 = "Expression_List2:  Expression;";
                ex2 = "Expression_List2:  Expression_List2  \',\'  Expression;";
                this.swapRules(ex1, ex2);
                ex1 = "SequenceExpression_List2:  SequenceExpression;";
                ex2 = "SequenceExpression_List2:  SequenceExpression_List2  \',\'  SequenceExpression;";
                this.swapRules(ex1, ex2);
                this.importKw = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'import\'");
                this.HEX_LITERAL = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "HEX_LITERAL");
                this.RegExpLiteral = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "RegExpLiteral");
                this.StringLiteral = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "StringLiteral");
                this.TemplateLiteral = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "TemplateLiteral");
            })();
        }
    }

}




import { Rules } from './Rules';


Parser.main(null);
