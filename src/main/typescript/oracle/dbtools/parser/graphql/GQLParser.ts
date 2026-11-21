/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../arbori/util/Service.js';
import { Cell } from '../Cell.js';
import { Earley } from '../Earley.js';
import { Grammar } from '../Grammar.js';
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { Matrix } from '../Matrix.js';
import { ParseNode } from '../ParseNode.js';
import { Parseable } from '../Parseable.js';
import { RuleTransforms } from '../RuleTransforms.js';
import { RuleTuple } from '../RuleTuple.js';
import { Token } from '../Token.js';
import { Visual } from '../Visual.js';
import { SyntaxError } from '../plsql/SyntaxError.js';

export class GQLParser extends Earley implements Parseable {
    public constructor() {
        super(GQLParser.getRules());
        this.keywords = ["query", "mutation", "subscription", "fragment", "on", "schema", "type", "scalar", "interface", "implements", "enum", "union", "extend", "input", "directive", "repeatable"];
        if (this.identifier === undefined) { this.identifier = 0; }
        if (this.digits === undefined) { this.digits = 0; }
        if (this.document === undefined) { this.document = 0; }
        if (this.stringLiteral === undefined) { this.stringLiteral = 0; }
        this._keywords = <any>([]);
        this.initKeywords();
        this.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "identifier");
        this.digits = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "digits");
        this.document = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "document");
        this.stringLiteral = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "stringLiteral");
    }

    static instance: GQLParser = null;

    public static getInstance(): GQLParser {
        if (GQLParser.instance != null)return GQLParser.instance;
        GQLParser.instance = new GQLParser();
        GQLParser.instance.isCaseSensitive = true;
        return GQLParser.instance;
    }

    /**
     * 
     * @param {number} y
     * @param {LexerToken[]} src
     * @param {number} symbol
     * @param {number} suspect
     * @return {boolean}
     */
    isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
        if (suspect != null && /* contains */(this._keywords.indexOf(<any>(suspect)) >= 0)){
            return false;
        }
        const token: LexerToken = /* get */src[y];
        return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING || symbol === this.digits && token.type === Token.DIGITS;
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
        return super.isOptimizable$int$int$int$int(headSym, preSym, mid, y);
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
            if (t.head !== this.document)continue;
            pos = cell.getPosition(i);
            if (this.rules[rule].rhs.length === pos)return this.tree(src, m, x, y, rule, pos);
        };}
        return super.treeForACell(src, m, cell, x, y);
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

    identifier: number;

    digits: number;

    document: number;

    stringLiteral: number;

    /*private*/ _keywords: Array<number>;

    initKeywords() {
        for(let index = 0; index < this.keywords.length; index++) {
            let k = this.keywords[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this._keywords, this.getSymbol(k))
        }
    }

    public static getRules(): Array<RuleTuple> {
        const rules: Array<RuleTuple> = <any>([]);
        let rulesTxt: string = Service.readFile$java_lang_Class$java_lang_String(GQLParser, "gql.grammar");
        rulesTxt = /* replace */rulesTxt.split("\'{\'").join("OPEN_CURLY");
        rulesTxt = /* replace */rulesTxt.split("\'}\'").join("CLOSE_CURLY");
        rulesTxt = /* replace */rulesTxt.split("private ").join("");
        rulesTxt = /* replace */rulesTxt.split("!(\')\'").join("!(\'closed_paren");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "/*", "*/");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "{", "}");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "{", "}");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "!(", ")");
        rulesTxt = /* replace */rulesTxt.split("OPEN_CURLY").join("\'{\'");
        rulesTxt = /* replace */rulesTxt.split("CLOSE_CURLY").join("\'}\'");
        rulesTxt = /* replace */rulesTxt.split("\'...\'").join("\'.\' \'.\' \'.\'");
        rulesTxt = /* replace */rulesTxt.split("\'::=\'").join("\':\' \':\' \'=\'");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(rulesTxt, false, Lexer.QuotedStrings + Lexer.JavaLineComments + Lexer.JavaSqlMultilineComments);
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, rulesTxt);
        Grammar.grammar(root, src, rules);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("selection", ["selection", "\',\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("selectionSet", ["\'[\'", "selectionSet", "\']\'"]));
        GQLParser.insertDotIdentifier(rules, "gqlField");
        RuleTransforms.eliminateEmptyProductions(rules);
        return rules;
    }

    /*private*/ static insertDotIdentifier(rules: Array<RuleTuple>, head: string) {
        const addendum: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[index];
            {
                if (head === rule.head){
                    const extra: number = 2;
                    const modified: RuleTuple = new RuleTuple(rule.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(rule.rhs.length + extra));
                    let pos: number = -1;
                    for(let i: number = 0; i < rule.rhs.length; i++) {{
                        if ("identifier" === (rule.rhs[i])){
                            pos = i + 1;
                            break;
                        }
                    };}
                    for(let i: number = 0; i < pos; i++) {{
                        modified.rhs[i] = rule.rhs[i];
                    };}
                    let incr: number = 0;
                    modified.rhs[pos + incr++] = "\'.\'";
                    modified.rhs[pos + incr++] = "identifier";
                    for(let i: number = pos; i < rule.rhs.length; i++) {{
                        modified.rhs[i + extra] = rule.rhs[i];
                    };}
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(addendum, modified);
                }
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules, addendum);
    }

    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String("dbtools-libraries/dbtools-arbori/src/test/resources/oracle/dbtools/parser/graphql/example.gql");
        const earley: Earley = GQLParser.getInstance();
        const T: boolean = true;
        const F: boolean = false;
        earley.printOrderedRules("document", T, F);
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$java_lang_String$int(input, "&`", Lexer.JS_$LI$());
        if (/* size */(<number>src.length) < 1200)LexerToken.print$java_util_List(src);
        const matrix: Matrix = new Matrix(earley);
        let visual: Visual = null;
        if (/* size */(<number>src.length) < 1200)visual = new Visual(src, earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (/* size */(<number>src.length) < 500)visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const out: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const err: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["document"], src, earley, matrix);
        if (err != null){
            console.info(err.getDetailedMessage());
            return;
        }
        out.printTree$int(5);
    }
}
GQLParser["__class"] = "oracle.dbtools.parser.graphql.GQLParser";
GQLParser["__interfaces"] = ["oracle.dbtools.parser.Parseable"];





import { Parser } from '../Parser.js';
