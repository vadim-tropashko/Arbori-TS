/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../../../../../main/typescript/oracle/dbtools/parser/Earley.js';
import { Grammar } from '../../../../../main/typescript/oracle/dbtools/parser/Grammar.js';
import { Lexer } from '../../../../../main/typescript/oracle/dbtools/parser/Lexer.js';
import { LexerToken } from '../../../../../main/typescript/oracle/dbtools/parser/LexerToken.js';
import { Matrix } from '../../../../../main/typescript/oracle/dbtools/parser/Matrix.js';
import { ParseNode } from '../../../../../main/typescript/oracle/dbtools/parser/ParseNode.js';
import { Parseable } from '../../../../../main/typescript/oracle/dbtools/parser/Parseable.js';
import { Parser } from '../../../../../main/typescript/oracle/dbtools/parser/Parser.js';
import { Resource } from '../../../../../main/typescript/oracle/dbtools/parser/Resource.js';
import { RuleTuple } from '../../../../../main/typescript/oracle/dbtools/parser/RuleTuple.js';
import { Token } from '../../../../../main/typescript/oracle/dbtools/parser/Token.js';
import { Visual } from '../../../../../main/typescript/oracle/dbtools/parser/Visual.js';
import { Yelrae } from '../../../../../main/typescript/oracle/dbtools/parser/Yelrae.js';
import { CmpNode } from '../parser/plsql/CmpNode.js';
import { SqlEarley } from '../../../../../main/typescript/oracle/dbtools/parser/plsql/SqlEarley.js';
import { SyntaxError } from '../../../../../main/typescript/oracle/dbtools/parser/plsql/SyntaxError.js';
import { Service } from '../../../../../main/typescript/oracle/arbori/util/Service.js';

/**
 * Catches regression in parse tree shapes due to SQL grammar and parser code evolutions
 * @author Dim
 * @param {*} parser
 * @param {Lexer} lexer
 * @class
 */
export class ParserTest {
    static __static_initialized: boolean = false;
    static __static_initialize() { if (!ParserTest.__static_initialized) { ParserTest.__static_initialized = true; ParserTest.__static_initializer_0(); } }

    static singleTest: number = null;

    testNo: number;

    public constructor(parser?: any, lexer?: any) {
        if (((parser != null && (parser.constructor != null && parser.constructor["__interfaces"] != null && parser.constructor["__interfaces"].indexOf("oracle.dbtools.parser.Parseable") >= 0)) || parser === null) && ((lexer != null && lexer instanceof <any>Lexer) || lexer === null)) {
            let __args = arguments;
            if (this.parser === undefined) { this.parser = null; } 
            if (this.lexer === undefined) { this.lexer = null; } 
            this.testNo = 0;
            this.parser = parser;
            this.lexer = lexer;
        } else if (parser === undefined && lexer === undefined) {
            let __args = arguments;
            {
                let __args = arguments;
                let parser: any = /* clone *//* clone */((o: any) => { if (o.clone != undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(SqlEarley.getInstance());
                let lexer: any = new Lexer();
                if (this.parser === undefined) { this.parser = null; } 
                if (this.lexer === undefined) { this.lexer = null; } 
                this.testNo = 0;
                this.parser = parser;
                this.lexer = lexer;
            }
            if (this.parser === undefined) { this.parser = null; } 
            if (this.lexer === undefined) { this.lexer = null; } 
            this.testNo = 0;
        } else throw new Error('invalid overload');
    }

    static failedTests: Array<number>; public static failedTests_$LI$(): Array<number> { ParserTest.__static_initialize(); if (ParserTest.failedTests == null) { ParserTest.failedTests = <any>([]); }  return ParserTest.failedTests; }

    static output: number = -1;

    static __tree: number = -1;

    static __node: number = -1;

    static __range: number = -1;

    static digits: number = -1;

    static __assertion: number = -1;

    public static __query: number = -1;

    static __comment: number = -1;

    public static testParser: Earley = null;

    static  __static_initializer_0() {
        try {
            ParserTest.testParser = new ParserTest.ParserTest$0(ParserTest.getRules());
        } catch(e) {
            console.error(e.message, e);
        }
        ParserTest.output = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "output");
        ParserTest.__tree = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "tree");
        ParserTest.__assertion = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "assertion");
        ParserTest.__query = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "query");
        ParserTest.__node = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "node");
        ParserTest.__range = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "range");
        ParserTest.digits = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "digits");
        ParserTest.__comment = /* get */((m,k) => m[k]===undefined?null:m[k])(ParserTest.testParser.symbolIndexes, "comment");
    }

    public static main(args: string[]) {
        const testFile: string = Resource.testFolder + "oracle/dbtools/parser/plsql/regression.test";
        new ParserTest().test(testFile);
        if (ParserTest.singleTest != null)throw Object.defineProperty(new Error("singleTest != null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    static random: { nextInt(bound: number): number };
    public static random_$LI$(): { nextInt(bound: number): number } {
        ParserTest.__static_initialize();
        if (ParserTest.random == null) ParserTest.random = { nextInt: bound => Math.floor(Math.random() * bound) };
        return ParserTest.random;
    }

    static introduceRandomError: boolean = false;

    public test(testFile: string) {
        const input: string = Service.readFile$java_lang_String(testFile);
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$java_lang_String(input, "`");
        const visual: Visual = null;
        const matrix: Matrix = new Matrix(ParserTest.testParser);
        ParserTest.testParser.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["atest"], src, ParserTest.testParser, matrix);
        if (s != null){
            if (visual != null)visual.draw$oracle_dbtools_parser_Matrix(matrix);
            console.error("Syntax Error");
            console.error("at line#" + s.line);
            console.error(s.code);
            console.error(s.marker);
            console.error("Expected:  ");
            {
                let array = s.getSuggestions();
                for(let index = 0; index < array.length; index++) {
                    let tmp = array[index];
                    console.info(tmp + ',')
                }
            }
            throw Object.defineProperty(new Error(">>>> syntactically invalid code fragment <<<<"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
        }
        const root: ParseNode = ParserTest.testParser.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        this.atest(root, src, input);
        if (/* size */(<number>ParserTest.failedTests_$LI$().length) === 0)console.info("*** ALL " + (this.testNo + 1) + " TESTS are OK *** ---> "); else console.error("*** FAILED " + /* size */(<number>ParserTest.failedTests_$LI$().length) + " tests *** ");
        let cnt: number = -1;
        for(let index = 0; index < ParserTest.failedTests_$LI$().length; index++) {
            let testNo = ParserTest.failedTests_$LI$()[index];
            {
                cnt++;
                if (cnt < 10)console.error(testNo + ","); else if (cnt === 10)console.error(" ... "); else if (/* size */(<number>ParserTest.failedTests_$LI$().length) - 10 < cnt)console.error("," + testNo);
            }
        }
        if (0 < /* size */(<number>ParserTest.failedTests_$LI$().length))throw Object.defineProperty(new Error("TestFailed"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    static getRules(): Array<RuleTuple> {
        const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/regrTest.grammar");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.TEST_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        const ret: Array<RuleTuple> = <any>([]);
        Grammar.grammar(root, src, ret);
        return ret;
    }

    /**
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @return {void} node that violates assertion
     * @throws Exception
     * @param {string} input
     * @private
     */
    /*private*/ atest(root: ParseNode, src: Array<LexerToken>, input: string) {
        if (root.contains$int(ParserTest.__assertion)){
            if (ParserTest.singleTest != null && (<number>ParserTest.singleTest|0) !== this.testNo)return;
            this.assertion(root, src, input);
            return;
        }
        if (root.contains$int(ParserTest.output)){
            if (ParserTest.singleTest != null && (<number>ParserTest.singleTest|0) !== this.testNo)return;
            {
                let array = root.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        const out: ParseNode = this.query(child, src, input);
                        console.info("TEST#" + this.testNo + ":  ---> ");
                        console.info(out.tree());
                        return;
                    }
                }
            }
            return;
        }
        if (root.contains$int(ParserTest.__comment))this.comment(root, src, input);
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    this.atest(child, src, input);
                }
            }
        }
    }

    /*private*/ comment(root: ParseNode, src: Array<LexerToken>, input: string): ParseNode {
        const testNum: string = input.substring(/* get */src[root.from + 2].begin, /* get */src[root.to - 1].end - 1);
        this.testNo = /* parseInt */parseInt(testNum);
        return null;
    }

    /*private*/ query(root: ParseNode, src: Array<LexerToken>, input: string): ParseNode {
        return this.parse(this.sql_fragment(root, src, input));
    }

    /*private*/ parser: Parseable;

    /*private*/ lexer: Lexer;

    /*private*/ parse(q: string): ParseNode {
        const src1: Array<LexerToken> = this.lexer.doParse$java_lang_String(q);
        if (ParserTest.introduceRandomError){
            const pos: number = ParserTest.random_$LI$().nextInt(/* size */(<number>src1.length) - 1);
            if (10 < pos){
                const t: LexerToken = /* get */src1[pos];
                t.type = Token.OPERATION;
                t.content = "\';\'";
            }
        }
        return this.parser.parse(src1);
    }

    sql_fragment(root: ParseNode, src: Array<LexerToken>, input: string): string {
        let ret: string = input.substring(/* get */src[root.from].begin, /* get */src[root.to - 1].end);
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(ret.charAt(0)) == '\"'.charCodeAt(0))ret = ret.substring(1, ret.length - 1);
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(ret.charAt(0)) == '`'.charCodeAt(0))ret = ret.substring(1, ret.length - 1);
        return ret;
    }

    assertion(root: ParseNode, src: Array<LexerToken>, input: string): ParseNode {
        let output: ParseNode = null;
        let cmp: CmpNode = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(ParserTest.__query)){
                        output = this.query(child, src, input);
                        continue;
                    }
                    if (child.from + 1 === child.to)if (("-" === child.content$java_util_List(src)) || (">" === child.content$java_util_List(src)) || (";" === child.content$java_util_List(src)))continue;
                    if (child.contains$int(ParserTest.__tree)){
                        cmp = ParserTest.tree(this.nodeList(child, src, input));
                        continue;
                    }
                }
            }
        }
        const test: boolean = cmp.isSubtree(output);
        if (!test){
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ParserTest.failedTests_$LI$(), this.testNo);
            console.info("TEST#" + this.testNo + ":  broken");
        }
        return null;
    }

    /*private*/ static tree(nodeList: Array<CmpNode>): CmpNode {
        for(let index = 0; index < nodeList.length; index++) {
            let parent = nodeList[index];
            for(let index1 = 0; index1 < nodeList.length; index1++) {
                let grandchild = nodeList[index1];
                {
                    if (parent.from < grandchild.from && grandchild.to <= parent.to || parent.from <= grandchild.from && grandchild.to < parent.to){
                        let isAdjacent: boolean = true;
                        for(let index2 = 0; index2 < nodeList.length; index2++) {
                            let child = nodeList[index2];
                            {
                                if (parent.from < child.from && child.to <= parent.to || parent.from <= child.from && child.to < parent.to)if (child.from < grandchild.from && grandchild.to <= child.to || child.from <= grandchild.from && grandchild.to < child.to){
                                    isAdjacent = false;
                                    break;
                                }
                            }
                        }
                        if (!isAdjacent)continue;
                        parent.addTopLevel(grandchild);
                    }
                }
            }
        }
        return ParserTest.root(nodeList);
    }

    /*private*/ static root(nodeList: Array<CmpNode>): CmpNode {
        let ret: CmpNode = null;
        for(let index = 0; index < nodeList.length; index++) {
            let candidate = nodeList[index];
            {
                if (ret == null){
                    ret = candidate;
                    continue;
                }
                if (candidate.from < ret.from && ret.to <= candidate.to || candidate.from <= ret.from && ret.to < candidate.to)ret = candidate;
            }
        }
        return ret;
    }

    /*private*/ nodeList(root: ParseNode, src: Array<LexerToken>, input: string): Array<CmpNode> {
        const ret: Array<CmpNode> = <any>([]);
        if (root.contains$int(ParserTest.__node)){
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, this.node(root, src, input));
            return ret;
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, this.nodeList(child, src, input));
                }
            }
        }
        return ret;
    }

    /*private*/ node(root: ParseNode, src: Array<LexerToken>, input: string): CmpNode {
        if (root.contains$int(ParserTest.__range)){
            const rng: number = ParserTest.range(root, src, input);
            return new CmpNode(Service.lX(rng), Service.lY(rng), <Parser><any>this.parser);
        }
        let ret: CmpNode = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(ParserTest.__range)){
                        const rng: number = ParserTest.range(child, src, input);
                        ret = new CmpNode(Service.lX(rng), Service.lY(rng), <Parser><any>this.parser);
                    }
                    if (child.contains$java_lang_String("any_branch")){
                        ret.isCollapsed = true;
                    } else if (child.contains$java_lang_String("\'=\'")){
                        ret.isExactPayload = true;
                    } else if (child.contains$java_lang_String("payload")){
                        ParserTest.payload(ret, child, src);
                    }
                }
            }
        }
        return ret;
    }

    /*private*/ static payload(cmp: CmpNode, payload: ParseNode, src: Array<LexerToken>) {
        {
            let array = payload.descendants();
            for(let index = 0; index < array.length; index++) {
                let d = array[index];
                {
                    const content: string = /* get */src[d.from].content;
                    if (">" === content)continue;
                    cmp.addContent$java_lang_String(content);
                }
            }
        }
    }

    /*private*/ static range(root: ParseNode, src: Array<LexerToken>, input: string): number {
        let x: number = -1;
        let y: number = -1;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(ParserTest.digits))if (x === -1)x = /* parseInt */parseInt(/* get */src[child.from].content); else y = /* parseInt */parseInt(/* get */src[child.from].content);
                }
            }
        }
        return Service.lPair(x, y);
    }
}
ParserTest["__class"] = "oracle.dbtools.test.ParserTest";


export namespace ParserTest {

    export class ParserTest$0 extends Earley {
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
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING || symbol === this.identifier && token.type === Token.BQUOTED_STRING;
        }

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}




ParserTest.__static_initialize();
