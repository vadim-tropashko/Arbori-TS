/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { CharOffsets } from '../../arbori/util/CharOffsets.js';
import { SyntaxError } from './plsql/SyntaxError.js';

/**
 * A helper class. Parser boilerplate code, i.e.
 * 
 * String input = "select emp from empno;";
 * List<LexerToken> src =  Lexer.parse(input);
 * SqlEarley earley = SqlEarley.partialRecognizer();
 * Matrix matrix = new Matrix(earley);
 * earley.parse(src, matrix);
 * ParseNode root = earley.forest(src, matrix);
 * 
 * is wrapped into
 * 
 * Parsed parsed = new Parsed(
 * "select emp from empno;",
 * SqlEarley.getInstance(),
 * "sql_statement"
 * );
 * ParseNode root = parsed.getRoot();
 * 
 * @author Dim
 * @param {string} input
 * @param {LexerToken[]} src
 * @param {Earley} parser
 * @param {string} legitimateSymbol
 * @class
 */
export class Parsed {
    public input: string;

    public lineMap: number[];

    src: Array<LexerToken>;

    root: ParseNode;

    earley: Earley;

    /*private*/ rootPayload: string[];

    /*private*/ err: SyntaxError;

    public replacements: Substitutions;

    public debug: boolean;

    public constructor(input?: any, src?: any, parser?: any, legitimateSymbol?: any) {
        if (((typeof input === 'string') || input === null) && ((src != null && (src instanceof Array)) || src === null) && ((parser != null && parser instanceof <any>Earley) || parser === null) && ((typeof legitimateSymbol === 'string') || legitimateSymbol === null)) {
            let __args = arguments;
            if (this.input === undefined) { this.input = null; } 
            if (this.lineMap === undefined) { this.lineMap = null; } 
            if (this.src === undefined) { this.src = null; } 
            if (this.root === undefined) { this.root = null; } 
            if (this.earley === undefined) { this.earley = null; } 
            this.rootPayload = null;
            this.err = null;
            this.replacements = null;
            this.debug = false;
            this.lexer = null;
            this.matrix = null;
            this.input = input;
            this.earley = parser;
            this.src = src;
            if (legitimateSymbol != null)this.rootPayload = [legitimateSymbol];
            this.lineMap = CharOffsets.lineMap(input);
        } else if (((typeof input === 'string') || input === null) && ((src != null && (src instanceof Array)) || src === null) && ((parser != null && parser instanceof <any>Earley) || parser === null) && ((legitimateSymbol != null && legitimateSymbol instanceof <any>Array && (legitimateSymbol.length == 0 || legitimateSymbol[0] == null ||(typeof legitimateSymbol[0] === 'string'))) || legitimateSymbol === null)) {
            let __args = arguments;
            let rootPayload: any = __args[3];
            if (this.input === undefined) { this.input = null; } 
            if (this.lineMap === undefined) { this.lineMap = null; } 
            if (this.src === undefined) { this.src = null; } 
            if (this.root === undefined) { this.root = null; } 
            if (this.earley === undefined) { this.earley = null; } 
            this.rootPayload = null;
            this.err = null;
            this.replacements = null;
            this.debug = false;
            this.lexer = null;
            this.matrix = null;
            this.input = input;
            this.earley = parser;
            this.src = src;
            this.rootPayload = rootPayload;
            this.lineMap = CharOffsets.lineMap(input);
        } else if (((typeof input === 'string') || input === null) && ((src != null && src instanceof <any>Earley) || src === null) && ((typeof parser === 'string') || parser === null) && legitimateSymbol === undefined) {
            let __args = arguments;
            let parser: any = __args[1];
            let legitimateSymbol: any = __args[2];
            if (this.input === undefined) { this.input = null; } 
            if (this.lineMap === undefined) { this.lineMap = null; } 
            if (this.src === undefined) { this.src = null; } 
            if (this.root === undefined) { this.root = null; } 
            if (this.earley === undefined) { this.earley = null; } 
            this.rootPayload = null;
            this.err = null;
            this.replacements = null;
            this.debug = false;
            this.lexer = null;
            this.matrix = null;
            this.input = input;
            this.earley = parser;
            if (legitimateSymbol != null)this.rootPayload = [legitimateSymbol];
            this.lineMap = CharOffsets.lineMap(input);
        } else if (((typeof input === 'string') || input === null) && ((src != null && (src instanceof Array)) || src === null) && ((parser != null && parser instanceof <any>ParseNode) || parser === null) && legitimateSymbol === undefined) {
            let __args = arguments;
            let root: any = __args[2];
            if (this.input === undefined) { this.input = null; } 
            if (this.lineMap === undefined) { this.lineMap = null; } 
            if (this.src === undefined) { this.src = null; } 
            if (this.root === undefined) { this.root = null; } 
            if (this.earley === undefined) { this.earley = null; } 
            this.rootPayload = null;
            this.err = null;
            this.replacements = null;
            this.debug = false;
            this.lexer = null;
            this.matrix = null;
            this.input = input;
            this.src = src;
            this.root = root;
            this.lineMap = CharOffsets.lineMap(input);
        } else throw new Error('invalid overload');
    }

    public getInput(): string {
        return this.input;
    }

    public getEarley(): Earley {
        return this.earley;
    }

    lexer: Lexer;

    public getSrc(): Array<LexerToken> {
        if (this.src == null){
            this.lexer = new Lexer();
            for(let index = 0; index < this.rootPayload.length; index++) {
                let payload = this.rootPayload[index];
                {
                    if ("javascript" === payload){
                        this.src = this.lexer.doParse$java_lang_String$java_lang_String$int(this.input, "&", Lexer.JAVA_$LI$() + Lexer.RegExp);
                        this.lexer = null;
                        return this.src;
                    }
                    if ("program" === payload){
                        this.src = this.lexer.doParse$java_lang_String$java_lang_String$int(this.input, "&", Lexer.ARBORI_$LI$());
                        this.lexer = null;
                        return this.src;
                    }
                }
            }
            this.src = this.lexer.doParse$java_lang_String(this.input);
            this.lexer = null;
        }
        return this.src;
    }

    public matrix: Matrix;

    public getMatrix(): Matrix {
        this.getRoot();
        return this.matrix;
    }

    public getRoot(): ParseNode {
        this.getSrc();
        if (this.root == null){
            if (/* size */(<number>this.src.length) === 0)return new ParseNode(0, 0, -1, this.earley);
            this.matrix = new Matrix(this.earley);
            if (this.debug){
                const isCmdline = (new Error().stack ?? "").includes("oracle.dbtools.cmdline");
                if (!isCmdline){
                    this.matrix.visual = new Visual(this.src, this.earley);
                    this.matrix.visual.matrix = this.matrix;
                }
            }
            try {
                this.earley.doParse(this.src, this.matrix);
            } catch(e1) {
                throw Object.defineProperty(new Error("getRoot(): parse cancelled"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
            if (this.debug && this.matrix.visual != null)this.matrix.visual.draw$();
            if (this.rootPayload != null && this.rootPayload.length === 1 && (Yelrae.PARSE_WITH_ERRORS === (this.rootPayload[0]))){
                const e: Earley = this.earley;
                this.root = Yelrae.duplexParse$oracle_dbtools_parser_Earley$java_util_List$oracle_dbtools_parser_Matrix(e, this.src, this.matrix);
            } else this.root = this.earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(this.src, this.matrix, true, this.input);
            if (this.rootPayload != null && !(Yelrae.PARSE_WITH_ERRORS === (this.rootPayload[0])) && (this.root.topLevel != null || this.matrix.get(0, /* size */(<number>this.src.length)) == null))this.err = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(this.input, this.rootPayload, this.src, this.earley, this.matrix);
        }
        return this.root;
    }

    public getSyntaxError(): SyntaxError {
        if (this.err != null)return this.err;
        this.getRoot();
        return this.err;
    }

    public stop() {
        if (this.lexer != null)this.lexer.stop();
        if (this.earley != null)this.earley.stop();
    }

    public content$oracle_dbtools_parser_ParseNode(node: ParseNode): string {
        return this.content$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_ParseNode(node, node);
    }

    public content$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_ParseNode(from: ParseNode, to: ParseNode): string {
        return this.getInput().substring(/* get */this.getSrc()[from.from].begin, /* get */this.getSrc()[to.to - 1].end);
    }

    public content(from?: any, to?: any): string {
        if (((from != null && from instanceof <any>ParseNode) || from === null) && ((to != null && to instanceof <any>ParseNode) || to === null)) {
            return <any>this.content$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_ParseNode(from, to);
        } else if (((from != null && from instanceof <any>ParseNode) || from === null) && to === undefined) {
            return <any>this.content$oracle_dbtools_parser_ParseNode(from);
        } else throw new Error('invalid overload');
    }
}
Parsed["__class"] = "oracle.dbtools.parser.Parsed";




import { Yelrae } from './Yelrae.js';


import { ParsingCancelled } from './ParsingCancelled.js';


import { Visual } from './Visual.js';


import { Matrix } from './Matrix.js';


import { Lexer } from './Lexer.js';


import { Substitutions } from './Substitutions.js';


import { Earley } from './Earley.js';


import { ParseNode } from './ParseNode.js';


import { LexerToken } from './LexerToken.js';

