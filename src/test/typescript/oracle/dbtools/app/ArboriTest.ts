/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { MaterializedPredicate } from '../../../../../main/typescript/oracle/dbtools/arbori/MaterializedPredicate.js';
import { Program } from '../../../../../main/typescript/oracle/dbtools/arbori/Program.js';
import { SqlProgram } from '../../../../../main/typescript/oracle/dbtools/arbori/SqlProgram.js';
import { Tuple } from '../../../../../main/typescript/oracle/dbtools/arbori/Tuple.js';
import { Earley } from '../../../../../main/typescript/oracle/dbtools/parser/Earley.js';
import { Grammar } from '../../../../../main/typescript/oracle/dbtools/parser/Grammar.js';
import { Lexer } from '../../../../../main/typescript/oracle/dbtools/parser/Lexer.js';
import { LexerToken } from '../../../../../main/typescript/oracle/dbtools/parser/LexerToken.js';
import { Matrix } from '../../../../../main/typescript/oracle/dbtools/parser/Matrix.js';
import { ParseNode } from '../../../../../main/typescript/oracle/dbtools/parser/ParseNode.js';
import { Resource } from '../../../../../main/typescript/oracle/dbtools/parser/Resource.js';
import { RuleTuple } from '../../../../../main/typescript/oracle/dbtools/parser/RuleTuple.js';
import { Token } from '../../../../../main/typescript/oracle/dbtools/parser/Token.js';
import { Visual } from '../../../../../main/typescript/oracle/dbtools/parser/Visual.js';
import { SyntaxError } from '../../../../../main/typescript/oracle/dbtools/parser/plsql/SyntaxError.js';
import { GlobalMap } from '../../../../../main/typescript/oracle/arbori/scripting/GlobalMap.js';
import { Service } from '../../../../../main/typescript/oracle/arbori/util/Service.js';
import { fileURLToPath } from 'node:url';

/**
 * Catches regression in parse tree shapes due to SQL grammar and parser code evolutions
 * 
 * for test grammar see unitTest.grammar
 * 
 * the test cases are in unit.test
 * 
 * @author Dim
 * @class
 */
export class ArboriTest {
    public singleTest: number;

    static debug: boolean = false;

    static printDiffs: boolean = true;

    static currentTestNo: number = 0;

    testNo: number;

    public static unitTestIsOK: boolean = true;

    static __assertion: number = -1;

    static __atest: number = -1;

    static attribute: number = -1;

    static closePar: number = -1;

    static __comment: number = -1;

    static col: number = -1;

    static content: number = -1;

    static header: number = -1;

    static identifier: number = -1;

    static marker: number = -1;

    static openPar: number = -1;

    static __output: number = -1;

    static program_code_or_filename: number = -1;

    static program_with_input: number = -1;

    static sql_prefix: number = -1;

    static sql_postfix: number = -1;

    static __table: number = -1;

    static __tables: number = -1;

    static value: number = -1;

    public static main(args: string[]) {
        new ArboriTest().test();
    }

    public test() {
        const rules: Array<RuleTuple> = this.getRules();
        const testParser: Earley = new ArboriTestParser(this, rules);
        ArboriTest.identifier = testParser.identifier;
        ArboriTest.__assertion = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "assertion");
        ArboriTest.__atest = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "atest");
        ArboriTest.attribute = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "attribute");
        ArboriTest.closePar = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "\')\'");
        ArboriTest.col = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "\':\'");
        ArboriTest.__comment = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "comment");
        ArboriTest.content = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "content");
        ArboriTest.header = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "header");
        ArboriTest.__output = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "output");
        ArboriTest.marker = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "marker");
        ArboriTest.openPar = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "\'(\'");
        ArboriTest.program_with_input = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "program_with_input");
        ArboriTest.program_code_or_filename = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "program_code_or_filename");
        ArboriTest.sql_prefix = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "\"sql prefix\"");
        ArboriTest.sql_postfix = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "\"sql postfix\"");
        ArboriTest.__table = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "table");
        ArboriTest.__tables = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "tables");
        ArboriTest.value = /* get */((m,k) => m[k]===undefined?null:m[k])(testParser.symbolIndexes, "value");
        const input: string = Service.readFile$java_lang_String("src/test/resources/oracle/dbtools/arbori/unit.test");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$java_lang_String(input, "`");
        const visual: Visual = null;
        const matrix: Matrix = new Matrix(testParser);
        testParser.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["atest"], src, testParser, matrix);
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
        const root: ParseNode = testParser.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        this.atest(root, src, input);
        if (ArboriTest.unitTestIsOK)console.info("*** ALL TESTS are OK *** ---> "); else {
            console.error("*** TEST FAILED! *** ---> ");
            process.exitCode = 2;
        }
    }

    getRules(): Array<RuleTuple> {
        const input: string = Service.readFile$java_lang_String("src/test/resources/oracle/dbtools/arbori/unitTest.grammar");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.GRAMMAR_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        const ret = [] as Array<RuleTuple>;
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
    atest(root: ParseNode, src: Array<LexerToken>, input: string) {
        if (root.contains$int(ArboriTest.__assertion)){
            if (this.singleTest != null && ((this.singleTest as number) | 0) !== this.testNo){
                this.testNo++;
                return;
            }
            this.assertion(root, src, input);
            return;
        }
        if (root.contains$int(ArboriTest.__output)){
            if (this.singleTest != null && ((this.singleTest as number) | 0) !== this.testNo){
                this.testNo++;
                return;
            }
            this.output(root, src, input);
            return;
        }
        if (root.contains$int(ArboriTest.__comment))this.comment(root, src, input);
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

    output(root: ParseNode, src: Array<LexerToken>, input: string) {
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    const output: any = ArboriTest.runProgram(child, src, input);
                    {
                        let array1 = /* keySet */Object.keys(output);
                        for(let index1 = 0; index1 < array1.length; index1++) {
                            let p = array1[index1];
                            {
                                const obj: any = /* get */((m,k) => m[k]===undefined?null:m[k])(output, p);
                                if (obj == null)console.error("!!! missing object " + p); else if (obj instanceof MaterializedPredicate){
                                    const pred = obj as MaterializedPredicate;
                                    console.info(p + "=" + pred.toString$int(p.length + 1));
                                } else if (typeof obj === 'string'){
                                    console.info(p + "=" + obj.toString());
                                } else console.error("!!! unexpected output type for " + p);
                            }
                        }
                    }
                    console.info("TEST#" + (this.testNo++) + ":  ^^^^^ ");
                    return;
                }
            }
        }
    }

    static programs: any; public static programs_$LI$(): any { if (ArboriTest.programs == null) { ArboriTest.programs = {} as any; }  return ArboriTest.programs; }

    static runProgram(root: ParseNode, src: Array<LexerToken>, input: string): any {
        let program: ArboriTestUTProgram = null;
        let sawCol: boolean = false;
        let prefix: string = null;
        let markerPos: number = -1;
        let postfix: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(ArboriTest.program_code_or_filename)){
                        program = ArboriTest.program(child, src);
                        continue;
                    }
                    if (!sawCol && child.contains$int(ArboriTest.col)){
                        sawCol = true;
                        continue;
                    }
                    if (prefix == null && child.contains$int(ArboriTest.sql_prefix)){
                        prefix = input.substring(/* get */src[child.from].begin, /* get */src[child.to - 1].end);
                        markerPos = child.to - child.from;
                        continue;
                    }
                    if (child.contains$int(ArboriTest.marker)){
                        continue;
                    }
                    if (postfix == null && child.contains$int(ArboriTest.sql_postfix)){
                        postfix = input.substring(/* get */src[child.from].begin, /* get */src[child.to - 1].end);
                        continue;
                    }
                    throw Object.defineProperty(new Error("Unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        Program.debug = ArboriTest.debug;
        program.offset = markerPos;
        program.editorOffset = markerPos;
        program.test = {} as any;
        const globals: GlobalMap = program.getGlobals();
        if (globals != null)globals.put("editorOffset", markerPos);
        const executionInput = postfix == null ? prefix : prefix + ' ' + postfix;
        const predicateVectors: any = program.run$java_lang_String$java_lang_Object(executionInput, "JS action");
        const output: any = {} as any;
        {
            let array = /* keySet */Object.keys(program.namedPredicates);
            for(let index = 0; index < array.length; index++) {
                let p = array[index];
                {
                    /* put */(output[p] = /* get */((m,k) => m[k]===undefined?null:m[k])(predicateVectors, p));
                }
            }
        }
        if (program.test != null)Object.assign(output, program.test);
        return output;
    }

    static program(root: ParseNode, src: Array<LexerToken>): ArboriTestUTProgram {
        let str: string = root.content$java_util_List(src);
        if ((c => c.charCodeAt==null?c as any:c.charCodeAt(0))(str.charAt(0)) == '\"'.charCodeAt(0))str = str.substring(1, str.length - 1); else if ((c => c.charCodeAt==null?c as any:c.charCodeAt(0))(str.charAt(0)) == '`'.charCodeAt(0))str = str.substring(1, str.length - 1);
        let ret: ArboriTestUTProgram = null;
        const lexed: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(str, false, LexerToken.ARBORI_$LI$());
        const tmp: ParseNode = ArboriTestUTProgram.getArboriParser().parse$java_util_List(lexed);
        let code: string = str;
        if (!tmp.contains$int(ArboriTestUTProgram.getArboriParser().getSymbol("program"))){
            if (str.startsWith("/src/main/resources/")) {
                code = Service.readFile$java_lang_Class$java_lang_String(ArboriTest, str.substring("/src/main/resources/".length));
            } else {
                code = 0 <= str.indexOf('/') ? Service.readFile$java_lang_String(str) : Service.readFile$java_lang_String("src/test/resources/oracle/dbtools/arbori/" + str);
            }
        }
        ret = new ArboriTestUTProgram(code);
        /* put */(ArboriTest.programs_$LI$()[str] = ret);
        return ret;
    }

    comment(root: ParseNode, src: Array<LexerToken>, input: string) {
        const marker = src.slice(root.from, root.to).map(token => token.content).join('');
        if (marker.startsWith('++') && marker.endsWith(';')) {
            const testNo = Number(marker.substring(2, marker.length - 1));
            if (Number.isInteger(testNo)) this.testNo = testNo;
        }
    }

    assertion(root: ParseNode, src: Array<LexerToken>, input: string) {
        ArboriTest.currentTestNo = this.testNo;
        let output: any = null;
        let cmpT: any = null;
        let cmpNV: any = null;
        let sawDash: boolean = false;
        let sawGt: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (output == null && child.contains$int(ArboriTest.program_with_input)){
                        output = ArboriTest.runProgram(child, src, input);
                        continue;
                    }
                    if (!sawDash && child.from + 1 === child.to)if ("-" === child.content$java_util_List(src)){
                        sawDash = true;
                        continue;
                    }
                    if (!sawGt && child.from + 1 === child.to)if (">" === child.content$java_util_List(src)){
                        sawGt = true;
                        continue;
                    }
                    if (cmpT == null && child.contains$int(ArboriTest.__tables)){
                        cmpT = {} as any;
                        ArboriTest.tables(cmpT, child, src, input);
                        continue;
                    }
                    if (cmpNV == null && child.contains$java_lang_String("namedValues")){
                        cmpNV = {} as any;
                        ArboriTest.namedValues(cmpNV, child, src, input);
                        continue;
                    }
                    if (child.from + 1 === child.to)if (";" === child.content$java_util_List(src))continue;
                    throw Object.defineProperty(new Error("Unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        const outputT: any = {} as any;
        const outputNV: any = {} as any;
        {
            let array = /* keySet */Object.keys(output);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const obj: any = /* get */((m,k) => m[k]===undefined?null:m[k])(output, key);
                    if (obj instanceof MaterializedPredicate)/* put */(outputT[key] = obj as MaterializedPredicate);
                    if (typeof obj === 'string')/* put */(outputNV[key] = obj as string);
                }
            }
        }
        const test: boolean = ArboriTest.areMatchingT(outputT, cmpT) && ArboriTest.areMatchingNV(outputNV, cmpNV);
        if (!test){
            ArboriTest.unitTestIsOK = false;
        }
    }

    static areMatchingNV(outputNV: any, cmpNV: any): boolean {
        if (cmpNV == null)return true;
        {
            let array = /* keySet */Object.keys(cmpNV);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const oval: string = /* get */((m,k) => m[k]===undefined?null:m[k])(outputNV, key);
                    if (oval == null)return false;
                    if (!(oval === /* get */((m,k) => m[k]===undefined?null:m[k])(cmpNV, key)))return false;
                }
            }
        }
        return true;
    }

    static areMatchingT(cmp1: any, cmp2: any): boolean {
        let ret: boolean = true;
        {
            let array = /* keySet */Object.keys(cmp2);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const vd1: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(cmp1, key);
                    const vd2: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(cmp2, key);
                    if (vd1 == null || vd2 == null || !ArboriTest.areMatching(vd1, vd2)){
                        if (ArboriTest.printDiffs){
                            console.error(`TEST#${ArboriTest.currentTestNo}: ${vd1.toString$()}`);
                            console.error(`TEST#${ArboriTest.currentTestNo}: ${vd2.toString$()}`);
                        }
                        ret = false;
                    }
                }
            }
        }
        return ret;
    }

    static areMatching(vd1: MaterializedPredicate, vd2: MaterializedPredicate): boolean {
        if (vd1.arity() !== vd2.arity())return false;
        if (vd1.cardinality() !== vd2.cardinality())return false;
        for(let i: number = 0; i < vd1.arity(); i++) {{
            const attr1: string = vd1.getAttribute$int(i);
            if (null == vd2.getAttribute$java_lang_String(attr1))return false;
        };}
        const t1: Tuple[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(vd1.getTuples().length);
        let pos: number = 0;
        {
            let array = vd1.getTuples();
            for(let index = 0; index < array.length; index++) {
                let t = array[index];
                t1[pos++] = t
            }
        }
        const t2: Tuple[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(vd2.getTuples().length);
        pos = 0;
        {
            let array = vd2.getTuples();
            for(let index = 0; index < array.length; index++) {
                let t = array[index];
                t2[pos++] = t
            }
        }
        for(let i: number = 0; i < t1.length; i++) {{
            for(let j: number = 0; j < vd1.arity(); j++) {{
                const attr1: string = vd1.getAttribute$int(j);
                const node1: ParseNode = vd1.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t1[i], attr1);
                const node2: ParseNode = vd2.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t2[i], attr1);
                if (node1.from !== node2.from || node1.to !== node2.to)return false;
            };}
        };}
        return true;
    }

    static tables(ret: any, root: ParseNode, src: Array<LexerToken>, input: string) {
        if (root.contains$int(ArboriTest.__table)){
            ArboriTest.table(ret, root, src, input);
            return;
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                ArboriTest.tables(ret, child, src, input)
            }
        }
    }

    static namedValues(ret: any, root: ParseNode, src: Array<LexerToken>, input: string) {
        if (root.contains$java_lang_String("namedValue")){
            ArboriTest.namedValue(ret, root, src, input);
            return;
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                ArboriTest.namedValues(ret, child, src, input)
            }
        }
    }

    static namedValue(ret: any, root: ParseNode, src: Array<LexerToken>, input: string) {
        let name: string = null;
        let sawEq: boolean = false;
        let value: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (name == null && child.from + 1 === child.to){
                        name = child.content$java_util_List(src);
                        continue;
                    }
                    if (!sawEq && child.from + 1 === child.to)if ("=" === child.content$java_util_List(src)){
                        sawEq = true;
                        continue;
                    }
                    if (value == null && child.from + 1 === child.to){
                        value = child.content$java_util_List(src);
                        continue;
                    }
                    throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        /* put */(ret[name] = value);
    }

    static table(ret: any, root: ParseNode, src: Array<LexerToken>, input: string) {
        let name: string = null;
        let sawEq: boolean = false;
        let sawOpenBr: boolean = false;
        let sawCloseBr: boolean = false;
        let vd: MaterializedPredicate = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (name == null && child.from + 1 === child.to){
                        name = child.content$java_util_List(src);
                        continue;
                    }
                    if (!sawEq && child.from + 1 === child.to)if ("=" === child.content$java_util_List(src)){
                        sawEq = true;
                        continue;
                    }
                    if (!sawOpenBr && child.from + 1 === child.to)if ("[" === child.content$java_util_List(src)){
                        sawOpenBr = true;
                        continue;
                    }
                    if (vd == null && child.contains$int(ArboriTest.header)){
                        vd = new MaterializedPredicate(ArboriTest.values(child, src), src, null);
                        continue;
                    }
                    if (!sawCloseBr && child.from + 1 === child.to)if ("]" === child.content$java_util_List(src)){
                        sawCloseBr = true;
                        continue;
                    }
                    if (child.contains$int(ArboriTest.content)){
                        ArboriTest.addContent(vd, child, src);
                        continue;
                    }
                    throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        /* put */(ret[name] = vd);
    }

    static values(root: ParseNode, src: Array<LexerToken>): Array<string> {
        const ret: Array<string> = [];
        if (root.from + 1 === root.to && (/* get */src[root.from].type === Token.IDENTIFIER || /* get */src[root.from].type === Token.DQUOTED_STRING) || root.contains$int(ArboriTest.value) || root.contains$int(ArboriTest.attribute))/* add */(ret.push(root.content$java_util_List(src))>0); else {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, ArboriTest.values(child, src))
            }
        }
        return ret;
    }

    static addContent(ret: MaterializedPredicate, root: ParseNode, src: Array<LexerToken>) {
        let i: number = 0;
        let t: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(ret.arity());
        {
            let array = ArboriTest.values(root, src);
            for(let index = 0; index < array.length; index++) {
                let elem = array[index];
                {
                    const comma: number = elem.indexOf(',');
                    const clPar: number = elem.indexOf(')');
                    const from: number = /* parseInt */parseInt(elem.substring(1, comma));
                    const to: number = /* parseInt */parseInt(elem.substring(comma + 1, clPar));
                    t[i % ret.arity()] = new ParseNode(from, to, -1, -1, null);
                    if (i % ret.arity() === ret.arity() - 1){
                        ret.addContent(t);
                        t = (s => { let a=[]; while(s-->0) a.push(null); return a; })(ret.arity());
                    }
                    i++;
                }
            }
        }
    }

    constructor() {
        this.singleTest = null;
        this.testNo = 0;
    }
}
ArboriTest["__class"] = "oracle.dbtools.app.ArboriTest";


export class ArboriTestUTProgram extends SqlProgram {
    public constructor(arboriProgram: string) {
        super(arboriProgram);
        this.offset = -1;
        this.editorOffset = -1;
        this.newName = "-new name-";
    }

    public offset: number;

    public editorOffset: number;

    newName: string;
}
ArboriTestUTProgram["__class"] = "oracle.dbtools.app.ArboriTest.UTProgram";

class ArboriTestParser extends Earley {
    public __parent: any;
    isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
        const token: LexerToken = src[y];
        return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING || symbol === this.identifier && token.type === Token.BQUOTED_STRING;
    }

    constructor(__parent: any, __arg0: any) {
        super(__arg0);
        this.__parent = __parent;
    }
}




if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    ArboriTest.main([]);
}
