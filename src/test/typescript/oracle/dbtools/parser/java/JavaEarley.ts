/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Array } from '../../../arbori/util/Array';
import { Service } from '../../../arbori/util/Service';
import { SyntaxError } from '../plsql/SyntaxError';
import { Earley } from '../Earley';

export class JavaEarley extends Earley {
    public static example: string = "/Users/VTROPASH/eclipse-workspace/sandbox/src/example.java.txt";

    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String(JavaEarley.example);
        const src: Array<LexerToken> = JavaEarley.lex(input);
        if (/* size */(<number>src.length) < 100)LexerToken.print$java_util_List(src);
        const earley: JavaEarley = JavaEarley.getInstance();
        const T: boolean = true;
        const F: boolean = false;
        earley.printOrderedRules("postfixExpre ssion", F, F);
        console.info("----rules=" + earley.rules.length);
        console.info("----symbols=" + earley.allSymbols.length);
        const matrix: Matrix = new Matrix(earley);
        if (/* size */(<number>src.length) < 1100)matrix.visual = new VisualImpl(src, earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (matrix.visual != null)matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const top: Cell = matrix.get(0, /* size */(<number>src.length));
        if (top != null)console.info(/* size */(<number>src.length) + " tokens, top = " + top.toString()); else {
            console.info("***** Syntactically Invalid fargment *****");
            const err: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["classDeclaration"], src, earley, matrix);
            console.info(err.getDetailedMessage());
        }
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (/* size */(<number>src.length) < 1100)root.printTree$();
    }

    public constructor(originalRules: Array<RuleTuple>) {
        super(originalRules);
        this._keywords = <any>([]);
        this.notOptimizableHeadSymbols = null;
        this.optimizableHeadPreSymbols = null;
        this.initKeywords();
    }

    static instance: JavaEarley = null;

    public static getInstance(): JavaEarley {
        if (JavaEarley.instance != null)return JavaEarley.instance;
        const rules: Array<RuleTuple> = <any>([]);
        const version: number = 20;
        const javaFile: string = "java" + version + ".grammar";
        let grammar: string;
        let file: string = null;
        try {
            file = "/Users/VTROPASH/git/dbtools-commons/dbtools-libraries/dbtools-arbori/src/test/resources/oracle/dbtools/parser/java/" + javaFile;
            grammar = Service.readFile$java_lang_String(file);
        } catch(e) {
            throw Object.defineProperty(new Error("Failed to read file " + file), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String(grammar);
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, grammar);
        Grammar.grammar(root, src, rules);
        RuleTransforms.eliminateEmptyProductions(rules);
        JavaEarley.instance = new JavaEarley(rules);
        JavaEarley.instance.isCaseSensitive = true;
        if (8 < version)JavaEarley.instance.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(JavaEarley.instance.symbolIndexes, "Identifier");
        return JavaEarley.instance;
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
        if (symbol !== this.identifier)return false;
        if (suspect != null && /* contains */(this._keywords.indexOf(<any>(suspect)) >= 0))return false;
        const token: LexerToken = /* get */src[y];
        if (token.type !== Token.IDENTIFIER)return false;
        if (suspect == null)return true;
        return true;
    }

    isScannedSymbol(y: number, src: Array<LexerToken>, pos: number, t: Parser.Tuple, suspect: number): boolean {
        const symbol: number = t.content(pos);
        const token: LexerToken = /* get */src[y];
        if (symbol === this.digits && token.type === Token.DIGITS)return true;
        if (token.type === Token.QUOTED_STRING && symbol === /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "character_literal"))return true;
        if (symbol === this.string_literal && token.type === Token.DQUOTED_STRING)return true;
        return suspect != null && suspect === symbol || this.isIdentifier(y, src, symbol, suspect) && (suspect == null || this.notConfusedAsId(suspect, t.head, pos));
    }

    public static keywords: string[]; public static keywords_$LI$(): string[] { if (JavaEarley.keywords == null) { JavaEarley.keywords = ["\'abstract\'", "\'assert\'", "\'boolean\'", "\'break\'", "\'byte\'", "\'case\'", "\'catch\'", "\'char\'", "\'class\'", "\'continue\'", "\'default\'", "\'do\'", "\'double\'", "\'else\'", "\'enum\'", "\'extends\'", "\'final\'", "\'finally\'", "\'float\'", "\'for\'", "\'if\'", "\'implements\'", "\'import\'", "\'instanceof\'", "\'int\'", "\'interface\'", "\'long\'", "\'native\'", "\'new\'", "\'package\'", "\'private\'", "\'protected\'", "\'public\'", "\'return\'", "\'short\'", "\'static\'", "\'strictfp\'", "\'super\'", "\'switch\'", "\'synchronized\'", "\'this\'", "\'throw\'", "\'throws\'", "\'transient\'", "\'try\'", "\'void\'", "\'volatile\'", "\'while\'"]; }  return JavaEarley.keywords; }

    /*private*/ _keywords: Array<number>;

    initKeywords() {
        for(let index = 0; index < JavaEarley.keywords_$LI$().length; index++) {
            let k = JavaEarley.keywords_$LI$()[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this._keywords, this.getSymbol(k))
        }
    }

    public static isKeyword(candidate: string): boolean {
        for(let index = 0; index < JavaEarley.keywords_$LI$().length; index++) {
            let k = JavaEarley.keywords_$LI$()[index];
            if (k.substring(1, k.length - 1) === candidate)return true;
        }
        return false;
    }

    /*private*/ notOptimizableHeadSymbols: number[];

    /*private*/ optimizableHeadPreSymbols: number[];

    public isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple: Parser.Tuple, preSym: number, mid: number, y: number): boolean {
        if (this.notOptimizableHeadSymbols == null){
            this.notOptimizableHeadSymbols = Array.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("formalParameterList"));
            this.notOptimizableHeadSymbols = Array.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("fieldAccess"));
            this.notOptimizableHeadSymbols = Array.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("relationalExpression"));
        }
        if (this.optimizableHeadPreSymbols == null){
            this.optimizableHeadPreSymbols = Array.insert$long_A$long(this.optimizableHeadPreSymbols, Service.lPair(this.getSymbol("\"variableInitializerList[3,8)\""), this.getSymbol("\"variableInitializerList[3,8)\"")));
            this.optimizableHeadPreSymbols = Array.insert$long_A$long(this.optimizableHeadPreSymbols, Service.lPair(this.getSymbol("\"classBody[3,5)\""), this.getSymbol("classBodyDeclaration")));
            this.optimizableHeadPreSymbols = Array.insert$long_A$long(this.optimizableHeadPreSymbols, Service.lPair(this.getSymbol("\"ordinaryCompilationUnit[4,6)\""), this.getSymbol("importDeclaration")));
            this.optimizableHeadPreSymbols = Array.insert$long_A$long(this.optimizableHeadPreSymbols, Service.lPair(this.getSymbol("\"blockStatements[3,5)\""), this.getSymbol("blockStatement")));
            this.optimizableHeadPreSymbols = Array.insert$long_A$long(this.optimizableHeadPreSymbols, Service.lPair(this.getSymbol("\"variableDeclaratorList[3,8)\""), this.getSymbol("\"variableDeclaratorList[3,8)\"")));
        }
        const headSym: number = tuple.head;
        const i: number = Array.indexOf$int_A$int(this.notOptimizableHeadSymbols, headSym);
        if (this.notOptimizableHeadSymbols[i] === headSym)return false;
        if (mid === 44)mid = mid;
        const j: number = Array.indexOf$long_A$long(this.optimizableHeadPreSymbols, Service.lPair(headSym, preSym));
        if (this.optimizableHeadPreSymbols[j] === Service.lPair(headSym, preSym))return true;
        return super.isOptimizable$int$int$int$int(headSym, preSym, mid, y);
    }

    /**
     * 
     * @param {Parser.Tuple} tuple
     * @param {number} preSym
     * @param {number} mid
     * @param {number} y
     * @return {boolean}
     */
    public isOptimizable(tuple?: any, preSym?: any, mid?: any, y?: any): boolean {
        if (((tuple != null && tuple instanceof <any>Parser.Tuple) || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple, preSym, mid, y);
        } else if (((tuple != null && (tuple instanceof Array)) || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return super.isOptimizable(tuple, preSym, mid, y);
        } else if (((typeof tuple === 'number') || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$int$int$int$int(tuple, preSym, mid, y);
        } else throw new Error('invalid overload');
    }

    public static recognizedJava(input: string): boolean {
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$java_lang_String$int(input, "&", Lexer.JAVA_$LI$());
        let earley: JavaEarley;
        try {
            earley = JavaEarley.getInstance();
        } catch(e) {
            console.error(e.message, e);
            return false;
        }
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const top: Cell = matrix.get(0, /* size */(<number>src.length));
        if (top == null)return false;
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        return root != null && /* size */(<number>src.length) < root.to + 5;
    }

    public static lex(input: string): Array<LexerToken> {
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$java_lang_String$int(input, "&", LexerToken.JAVA_$LI$());
        for(let index = 0; index < src.length; index++) {
            let token = src[index];
            {
                if (token.type === Token.UNKNOWN && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(token.content, "L"))token.type = Token.DIGITS;
            }
        }
        return src;
    }

    public parse(src?: any, m?: any) {
        if (((src != null && (src instanceof Array)) || src === null) && ((m != null && m instanceof <any>Matrix) || m === null)) {
            super.parse(src, m);
        } else if (((typeof src === 'string') || src === null) && m === undefined) {
            return <any>this.parse$java_lang_String(src);
        } else if (((src != null && (src instanceof Array)) || src === null) && m === undefined) {
            return <any>this.parse$java_util_List(src);
        } else throw new Error('invalid overload');
    }

    parse$java_lang_String(input: string): Parsed {
        const src: Array<LexerToken> = JavaEarley.lex(input);
        const earley: JavaEarley = this;
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const top: Cell = matrix.get(0, /* size */(<number>src.length));
        if (top == null)return null;
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        return new Parsed(input, src, root);
    }
}
JavaEarley["__class"] = "oracle.dbtools.parser.java.JavaEarley";




import { Parsed } from '../Parsed';


import { Lexer } from '../Lexer';


import { Parser } from '../Parser';


import { Token } from '../Token';


import { RuleTransforms } from '../RuleTransforms';


import { Grammar } from '../Grammar';


import { RuleTuple } from '../RuleTuple';


import { ParseNode } from '../ParseNode';


import { Cell } from '../Cell';


import { VisualImpl } from '../VisualImpl';


import { Matrix } from '../Matrix';


import { LexerToken } from '../LexerToken';


JavaEarley.main(null);
