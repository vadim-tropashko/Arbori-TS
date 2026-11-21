/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { MaterializedPredicate } from '../arbori/MaterializedPredicate';
import { Program } from '../arbori/Program';
import { SqlProgram } from '../arbori/SqlProgram';
import { Earley } from '../parser/Earley';
import { Grammar } from '../parser/Grammar';
import { Lexer } from '../parser/Lexer';
import { LexerToken } from '../parser/LexerToken';
import { Matrix } from '../parser/Matrix';
import { ParseNode } from '../parser/ParseNode';
import { Resource } from '../parser/Resource';
import { RuleTransforms } from '../parser/RuleTransforms';
import { RuleTuple } from '../parser/RuleTuple';
import { Token } from '../parser/Token';
import { Visual } from '../parser/Visual';
import { Variables } from '../parser/js/Variables';
import { SyntaxError } from '../parser/plsql/SyntaxError';
import { GlobalMap } from '../../arbori/scripting/GlobalMap';
import { Scripting } from '../../arbori/scripting/Scripting';
import { Service } from '../../arbori/util/Service';
import { CharOffsets } from '../../arbori/util/CharOffsets';

/**
 * Common codebase for regression tests
 * @author Dim
 * @param {string} testFile
 * @param {string} basePath
 * @param {string} jsPath
 * @class
 * @extends Scripting
 */
export abstract class Base extends Scripting {
    public singleTest: number;

    /*private*/ maxTestNo: number;

    /*private*/ testCount: number;

    public static failedTests: Array<number>; public static failedTests_$LI$(): Array<number> { if (Base.failedTests == null) { Base.failedTests = <any>([]); }  return Base.failedTests; }

    public printOKTests: boolean;

    public setEquality: boolean;

    __rules: Array<RuleTuple>;

    earley: Earley;

    __assertion: number;

    __comment: number;

    code: number;

    dotted_name: number;

    digits: number;

    __element: number;

    __output: number;

    inputSql: number;

    __result: number;

    identifier: number;

    __parameters: number;

    __program: number;

    quoted_string: number;

    result_limit: number;

    time_limit: number;

    StringLiteral: number;

    /*private*/ __resultLimit: number;

    /*private*/ __timingLimit: number;

    public static commonRoot(): string {
        let currentDir: string = process.cwd();
        currentDir = /* replace */currentDir.split("/dbtools-libraries/dbtools-common").join("");
        currentDir = /* replace */currentDir.split("/dbtools-libraries/dbtools-arbori").join("");
        return currentDir;
    }

    /*private*/ input: string;

    public constructor(testFile?: any, basePath?: any, jsPath?: any) {
        if (((typeof testFile === 'string') || testFile === null) && ((typeof basePath === 'string') || basePath === null) && ((typeof jsPath === 'string') || jsPath === null)) {
            let __args = arguments;
            super();
            if (this.__rules === undefined) { this.__rules = null; } 
            if (this.earley === undefined) { this.earley = null; } 
            if (this.__assertion === undefined) { this.__assertion = 0; } 
            if (this.__comment === undefined) { this.__comment = 0; } 
            if (this.code === undefined) { this.code = 0; } 
            if (this.dotted_name === undefined) { this.dotted_name = 0; } 
            if (this.digits === undefined) { this.digits = 0; } 
            if (this.__element === undefined) { this.__element = 0; } 
            if (this.__output === undefined) { this.__output = 0; } 
            if (this.inputSql === undefined) { this.inputSql = 0; } 
            if (this.__result === undefined) { this.__result = 0; } 
            if (this.identifier === undefined) { this.identifier = 0; } 
            if (this.__parameters === undefined) { this.__parameters = 0; } 
            if (this.__program === undefined) { this.__program = 0; } 
            if (this.quoted_string === undefined) { this.quoted_string = 0; } 
            if (this.result_limit === undefined) { this.result_limit = 0; } 
            if (this.time_limit === undefined) { this.time_limit = 0; } 
            if (this.StringLiteral === undefined) { this.StringLiteral = 0; } 
            if (this.__resultLimit === undefined) { this.__resultLimit = null; } 
            if (this.__timingLimit === undefined) { this.__timingLimit = null; } 
            if (this.input === undefined) { this.input = null; } 
            this.singleTest = null;
            this.maxTestNo = 0;
            this.testCount = 0;
            this.printOKTests = false;
            this.setEquality = false;
            this.input = Service.readFile$java_lang_String(testFile);
            let testGrammar: string = Service.readFile$java_lang_String(basePath);
            testGrammar += Service.readFile$java_lang_Class$java_lang_String(Variables, jsPath);
            testGrammar += Service.readFile$java_lang_Class$java_lang_String(Program, "arbori.grammar");
            testGrammar += this.addendumRules();
            this.__rules = Base.rules(testGrammar);
            this.earley = new Base.Base$0(this, this.__rules);
            this.earley.isCaseSensitive = true;
            this.__output = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "output");
            this.__assertion = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "assertion");
            this.inputSql = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "input");
            this.code = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "code");
            this.__comment = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "comment");
            this.__result = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "result");
            this.__element = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "element");
            this.dotted_name = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "dotted_name");
            this.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "identifier");
            this.__parameters = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "parameters");
            this.__program = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "program");
            this.quoted_string = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "quoted_string");
            this.digits = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "digits");
            this.result_limit = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "result_limit");
            this.time_limit = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "time_limit");
            this.StringLiteral = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "StringLiteral");
        } else if (((typeof testFile === 'string') || testFile === null) && basePath === undefined && jsPath === undefined) {
            let __args = arguments;
            {
                let __args = arguments;
                let basePath: any = "src/test/resources/oracle/dbtools/test/base.grammar";
                let jsPath: any = "js.grammar";
                super();
                if (this.__rules === undefined) { this.__rules = null; } 
                if (this.earley === undefined) { this.earley = null; } 
                if (this.__assertion === undefined) { this.__assertion = 0; } 
                if (this.__comment === undefined) { this.__comment = 0; } 
                if (this.code === undefined) { this.code = 0; } 
                if (this.dotted_name === undefined) { this.dotted_name = 0; } 
                if (this.digits === undefined) { this.digits = 0; } 
                if (this.__element === undefined) { this.__element = 0; } 
                if (this.__output === undefined) { this.__output = 0; } 
                if (this.inputSql === undefined) { this.inputSql = 0; } 
                if (this.__result === undefined) { this.__result = 0; } 
                if (this.identifier === undefined) { this.identifier = 0; } 
                if (this.__parameters === undefined) { this.__parameters = 0; } 
                if (this.__program === undefined) { this.__program = 0; } 
                if (this.quoted_string === undefined) { this.quoted_string = 0; } 
                if (this.result_limit === undefined) { this.result_limit = 0; } 
                if (this.time_limit === undefined) { this.time_limit = 0; } 
                if (this.StringLiteral === undefined) { this.StringLiteral = 0; } 
                if (this.__resultLimit === undefined) { this.__resultLimit = null; } 
                if (this.__timingLimit === undefined) { this.__timingLimit = null; } 
                if (this.input === undefined) { this.input = null; } 
                this.singleTest = null;
                this.maxTestNo = 0;
                this.testCount = 0;
                this.printOKTests = false;
                this.setEquality = false;
                this.input = Service.readFile$java_lang_String(testFile);
                let testGrammar: string = Service.readFile$java_lang_String(basePath);
                testGrammar += Service.readFile$java_lang_Class$java_lang_String(Variables, jsPath);
                testGrammar += Service.readFile$java_lang_Class$java_lang_String(Program, "arbori.grammar");
                testGrammar += this.addendumRules();
                this.__rules = Base.rules(testGrammar);
                this.earley = new Base.Base$0(this, this.__rules);
                this.earley.isCaseSensitive = true;
                this.__output = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "output");
                this.__assertion = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "assertion");
                this.inputSql = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "input");
                this.code = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "code");
                this.__comment = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "comment");
                this.__result = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "result");
                this.__element = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "element");
                this.dotted_name = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "dotted_name");
                this.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "identifier");
                this.__parameters = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "parameters");
                this.__program = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "program");
                this.quoted_string = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "quoted_string");
                this.digits = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "digits");
                this.result_limit = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "result_limit");
                this.time_limit = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "time_limit");
                this.StringLiteral = /* get */((m,k) => m[k]===undefined?null:m[k])(this.earley.symbolIndexes, "StringLiteral");
            }
            if (this.__rules === undefined) { this.__rules = null; } 
            if (this.earley === undefined) { this.earley = null; } 
            if (this.__assertion === undefined) { this.__assertion = 0; } 
            if (this.__comment === undefined) { this.__comment = 0; } 
            if (this.code === undefined) { this.code = 0; } 
            if (this.dotted_name === undefined) { this.dotted_name = 0; } 
            if (this.digits === undefined) { this.digits = 0; } 
            if (this.__element === undefined) { this.__element = 0; } 
            if (this.__output === undefined) { this.__output = 0; } 
            if (this.inputSql === undefined) { this.inputSql = 0; } 
            if (this.__result === undefined) { this.__result = 0; } 
            if (this.identifier === undefined) { this.identifier = 0; } 
            if (this.__parameters === undefined) { this.__parameters = 0; } 
            if (this.__program === undefined) { this.__program = 0; } 
            if (this.quoted_string === undefined) { this.quoted_string = 0; } 
            if (this.result_limit === undefined) { this.result_limit = 0; } 
            if (this.time_limit === undefined) { this.time_limit = 0; } 
            if (this.StringLiteral === undefined) { this.StringLiteral = 0; } 
            if (this.__resultLimit === undefined) { this.__resultLimit = null; } 
            if (this.__timingLimit === undefined) { this.__timingLimit = null; } 
            if (this.input === undefined) { this.input = null; } 
            this.singleTest = null;
            this.maxTestNo = 0;
            this.testCount = 0;
            this.printOKTests = false;
            this.setEquality = false;
        } else throw new Error('invalid overload');
    }

    addendumRules(): string {
        return "";
    }

    public async test(): Promise<boolean> {
        this.maxTestNo = 0;
        this.testCount = 0;
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$java_lang_String$int(this.input, "`#", LexerToken.ARBORI_$LI$());
        const matrix: Matrix = new Matrix(this.earley);
        if (/* size */(<number>src.length) < 100){
            matrix.visual = new Visual(src, this.earley);
            matrix.visual.matrix = matrix;
            matrix.visual.visited = <any> (function(dims) { let allocate = function(dims) { if (dims.length === 0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([/* size */(<number>src.length) + 1, /* size */(<number>src.length) + 1]);
        }
        this.earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(this.input, ["atest"], src, this.earley, matrix);
        if (s != null){
            if (matrix.visual != null)matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
            console.error("Syntax Error");
            console.error("at line#" + s.line);
            console.error(s.code);
            console.error(s.marker);
            console.error("Expected:  ");
            {
                let array = s.getSuggestions();
                for(let index = 0; index < array.length; index++) {
                    let tmp = array[index];
                    console.error(tmp + ',')
                }
            }
            throw Object.defineProperty(new Error(">>>> syntactically invalid code fragment <<<<"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
        }
        const root: ParseNode = this.earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const t1: number = /* currentTimeMillis */Date.now();
        await this.atest(root, src, this.input);
        const t2: number = /* currentTimeMillis */Date.now();
        console.info("Total test time = " + (t2 - t1));
        if (/* size */(<number>Base.failedTests_$LI$().length) === 0)console.info("*** ALL " + this.testCount + " TESTS are OK *** ---> "); else {
            console.error("*** TEST FAILED! *** ---> " + /* toString */('['+Base.failedTests_$LI$().join(', ')+']'));
            return false;
        }
        return true;
    }

    /*private*/ static rules(input: string): Array<RuleTuple> {
        try {
            const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.TEST_$LI$());
            const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
            const ret: Array<RuleTuple> = <any>([]);
            Grammar.grammar(root, src, ret);
            RuleTransforms.eliminateEmptyProductions(ret);
            return ret;
        } catch(e) {
            throw Object.defineProperty(new Error("VT: failed to init grammar for regression test"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    /*private*/ async atest(root: ParseNode, src: Array<LexerToken>, input: string): Promise<void> {
        if (root.contains$java_lang_String("jsBlock")){
            // Embedded JavaScript test blocks are intentionally ignored.
            return;
        }
        if (root.contains$int(this.__assertion)){
            this.testCount++;
            if (this.singleTest != null && (<number>this.singleTest|0) !== this.maxTestNo)return;
            if (this.printOKTests)console.info("TEST#" + this.maxTestNo + " -> ");
            if (await this.assertion(root, src, input, this.maxTestNo)){
                if (this.printOKTests)console.info("OK \n");
            } else if (this.printOKTests)console.info("*** Failed ***\n");
            return;
        }
        if (root.contains$int(this.__output)){
            this.testCount++;
            if (this.singleTest != null && (<number>this.singleTest|0) !== this.maxTestNo)return;
            if (this.printOKTests)console.info("TEST#" + this.maxTestNo + " -> ");
            await this.output$oracle_dbtools_parser_ParseNode$java_util_List$java_lang_String$int(root, src, input, this.maxTestNo);
            return;
        }
        if (root.contains$int(this.__comment)){
            this.comment(root, src, input);
            return;
        }
        if (root.contains$java_lang_String("grantDba")){
            await this.grantDba();
            return;
        }
        if (root.contains$java_lang_String("revokeDba")){
            await this.revokeDba();
            return;
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    await this.atest(child, src, input);
                }
            }
        }
    }

    async grantDba() {
        throw Object.defineProperty(new Error("grant dba directive is not supported by this test"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.UnsupportedOperationException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
    }

    async revokeDba() {
        throw Object.defineProperty(new Error("revoke dba directive is not supported by this test"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.UnsupportedOperationException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
    }

    public async output$oracle_dbtools_parser_ParseNode$java_util_List$java_lang_String$int(root: ParseNode, src: Array<LexerToken>, input: string, testNum: number): Promise<void> {
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.__parameters))this.parameters(child, src, input); else if (child.contains$int(this.inputSql)){
                        const output: Array<string> = await this.completion(child, src, input, testNum, null);
                        if (output != null){
                            console.info("TEST#" + this.maxTestNo + " ->\n" + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(output));
                        }
                    }
                }
            }
        }
    }

    public async output(root?: any, src?: any, input?: any, testNum?: any): Promise<any> {
        if (((root != null && root instanceof <any>ParseNode) || root === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof input === 'string') || input === null) && ((typeof testNum === 'number') || testNum === null)) {
            return <any>this.output$oracle_dbtools_parser_ParseNode$java_util_List$java_lang_String$int(root, src, input, testNum);
        } else if (((typeof root === 'string') || root === null) && ((typeof src === 'number') || src === null) && input === undefined && testNum === undefined) {
            return <any>this.output$java_lang_String$int(root, src);
        } else throw new Error('invalid overload');
    }

    cmp(output: string, cmp: string): boolean {
        return cmp === output;
    }

    /**
     * Returns a String with common hidden characters replaced with visible characters,
     * this is done to visually check the issue pointed out as the error, since most
     * of the time hidden characters are involved.
     * 
     * @param {string} input a String with the difference found that caused the issue, not
     * necessarily the exact error but the difference.
     * @return {string} String with hidden characters replaced for visual inspection.
     * @private
     */
    /*private*/ showHiddenCharacters(input: string): string {
        if (input == null || /* isEmpty */(input.length === 0))return input;
        let output: string = input;
        const hiddenCharacters: any = <any>({});
        /* put */(hiddenCharacters[" "] = "\u00b7");
        /* put */(hiddenCharacters["\t"] = "\u00af");
        /* put */(hiddenCharacters["\r"] = "\u00b6");
        /* put */(hiddenCharacters["\n"] = "\u21b5");
        {
            let array = /* entrySet */(o => { let s = []; for (let e in o) s.push({ k: e, v: o[e], getKey: function() { return this.k }, getValue: function() { return this.v } }); return s; })(hiddenCharacters);
            for(let index = 0; index < array.length; index++) {
                let entry = array[index];
                {
                    output = /* replace */output.split(entry.getKey()).join(entry.getValue());
                }
            }
        }
        return output;
    }

    async assertion(root: ParseNode, src: Array<LexerToken>, input: string, testNum: number): Promise<boolean> {
        let output: Array<string> = null;
        const cmp: any = <any>({});
        const expectedSets: any[] = [];
        this.__resultLimit = null;
        this.__timingLimit = null;
        let lineCounter: number = 0;
        let hasResult: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.__result)){
                        const alternatives = child.descendants().filter((node) => node.contains$java_lang_String("expected_set"));
                        if (alternatives.length > 0) {
                            const resultLimit = child.descendants()
                                .filter((node) => node.contains$int(this.result_limit))
                                .sort((a, b) => (a.to - a.from) - (b.to - b.from))[0];
                            if (resultLimit != null) this.resultLimit(resultLimit, src);
                            const timeLimit = child.descendants()
                                .filter((node) => node.contains$int(this.time_limit))
                                .sort((a, b) => (a.to - a.from) - (b.to - b.from))[0];
                            if (timeLimit != null) this.timingLimit(timeLimit, src);
                            for (const alternative of alternatives) expectedSets.push(this.result(alternative, src, input));
                        } else {
                            expectedSets.push(this.result(child, src, input));
                        }
                        hasResult = true;
                    }
                }
            }
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.__parameters))this.parameters(child, src, input); else if (child.contains$int(this.inputSql)){
                        output = await this.completion(child, src, input, testNum, this.__timingLimit);
                        if (output == null){
                            return false;
                        }
                    } else if (child.contains$int(this.__program)){
                        this.program(child, src, input, /* get */output[0]);
                        hasResult = true;
                    }
                }
            }
        }
        if (expectedSets.length > 0) {
            const selected = expectedSets.find((expected) => this.matchesExpectedSet(expected, output)) ?? expectedSets[0];
            Object.assign(cmp, selected);
        }
        if (this.__timingLimit != null){
            /* remove */(map => { let deleted = cmp["time"];delete cmp["time"];return deleted;})(cmp);
        }
        if (!hasResult && !this.setEquality){
            console.info("TEST#" + this.maxTestNo + " ->\n" + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(output));
        }
        if (this.__resultLimit != null && this.__resultLimit <= /* size */(<number>output.length)){
            console.info("expected fewer than " + this.__resultLimit + " matches, but got " + /* size */(<number>output.length) + "; actual suggestions:");
            for(let index = 0; index < output.length; index++) {
                let match = output[index];
                {
                    console.info(match);
                }
            }
            console.info(this.diagnosticContext(root, src));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(Base.failedTests_$LI$(), testNum);
            console.info("Failed test number " + testNum);
            return false;
        }
        {
            let array = /* keySet */Object.keys(cmp);
            for(let index = 0; index < array.length; index++) {
                let c = array[index];
                {
                    const isPositive: boolean = /* get */((m,k) => m[k]===undefined?null:m[k])(cmp, c);
                    let cC: string = /* replace */c.split("\r").join("");
                    let isCaseSensitive: boolean = false;
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cC.charAt(0)) == '\"'.charCodeAt(0)){
                        isCaseSensitive = true;
                        cC = /* replace */cC.split("\\\"").join("\"");
                    }
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cC.charAt(0)) == '`'.charCodeAt(0)){
                        cC = cC.substring(1, cC.length - 1);
                    }
                    if (!isCaseSensitive)cC = cC.toLowerCase();
                    let matched: boolean = false;
                    const prefix: string = this.longestCommonPrefix(cC, "");
                    let str1: string = "";
                    let str2: string = "";
                    for(let index1 = 0; index1 < output.length; index1++) {
                        let o = output[index1];
                        {
                            let oO: string = /* replace */o.split("\r").join("");
                            if (isCaseSensitive && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(oO.charAt(0)) != '\"'.charCodeAt(0))oO = this.quoteOutput(oO);
                            if (!isCaseSensitive)oO = oO.toLowerCase();
                            if (this.cmp(oO, cC)){
                                matched = true;
                                break;
                            } else {
                                const p: string = this.longestCommonPrefix(cC, oO);
                                lineCounter = 1 + p.length - /* replace */p.split("\n").join("").length;
                                if (prefix.length < p.length && 1 < lineCounter){
                                    const mapCC: number[] = CharOffsets.lineMap(cC);
                                    const mapOO: number[] = CharOffsets.lineMap(oO);
                                    const lastPos: number = 0;
                                    for(let i: number = 0; i < mapCC.length && i < mapOO.length; i++) {{
                                        const posCC: number = CharOffsets.lineNo2CharPos0(mapCC, i);
                                        const posOO: number = CharOffsets.lineNo2CharPos0(mapOO, i);
                                        str1 = oO.substring(lastPos, posOO);
                                        str2 = cC.substring(lastPos, posCC);
                                        if (posCC !== posOO || !(str1 === str2)){
                                            break;
                                        }
                                    };}
                                }
                            }
                        }
                    }
                    if (!matched && isPositive || matched && !isPositive){
                        console.info((isPositive ? "missing expected match for " : "unexpected match for ") + c);
                        console.info("Actual suggestions: " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(output));
                        console.info(this.diagnosticContext(root, src));
                        console.info("Failed test number " + testNum);
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(Base.failedTests_$LI$(), testNum);
                        if (0 < str1.length){
                            console.info("Diff found in line " + lineCounter);
                            console.info(">>>\n\"" + this.showHiddenCharacters(str1) + "\"!=\"" + this.showHiddenCharacters(str2) + "\"");
                            console.info("Character key for normally hidden characters:");
                            console.info("\" \" > \"\u00b7\"");
                            console.info("\"\\t\" > \"\u00af\"");
                            console.info("\"\\r\" > \"\u2014\"");
                            console.info("\"\\n\" > \"\u21b5\"");
                            console.info("Origin token length " + str1.length);
                            console.info("Target token length " + str2.length);
                        }
                        return false;
                    }
                }
            }
        }
        if (this.setEquality){
            for(let index = 0; index < output.length; index++) {
                let o = output[index];
                {
                    let oO: string = /* replace */o.split("\r").join("");
                    let matched: boolean = false;
                    let str1: string = "";
                    let str2: string = "";
                    {
                        let array = /* keySet */Object.keys(cmp);
                        for(let index1 = 0; index1 < array.length; index1++) {
                            let c = array[index1];
                            {
                                const isPositive: boolean = /* get */((m,k) => m[k]===undefined?null:m[k])(cmp, c);
                                let cC: string = /* replace */c.split("\r").join("");
                                let isCaseSensitive: boolean = false;
                                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cC.charAt(0)) == '\"'.charCodeAt(0)){
                                    isCaseSensitive = true;
                                    cC = /* replace */cC.split("\\\"").join("\"");
                                }
                                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(cC.charAt(0)) == '`'.charCodeAt(0)){
                                    cC = cC.substring(1, cC.length - 1);
                                }
                                if (!isCaseSensitive)cC = cC.toLowerCase();
                                let prefix: string = this.longestCommonPrefix(cC, "");
                                if (isCaseSensitive && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(oO.charAt(0)) != '\"'.charCodeAt(0))oO = this.quoteOutput(oO);
                                if (!isCaseSensitive)oO = oO.toLowerCase();
                                if (cC === oO){
                                    matched = true;
                                    break;
                                } else {
                                    const p: string = this.longestCommonPrefix(cC, oO);
                                    if (prefix.length < p.length){
                                        prefix = p;
                                        let index1: number = prefix.length + 3;
                                        if (oO.length < index1)index1 = oO.length;
                                        str1 = oO.substring(prefix.length, index1);
                                        let index2: number = prefix.length + 3;
                                        if (cC.length < index2)index2 = cC.length;
                                        str2 = cC.substring(prefix.length, index2);
                                    }
                                }
                            }
                        }
                    }
                    if (!matched){
                        console.info("unexpected suggestion: " + oO);
                        console.info("Expected entries: " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(/* keySet */Object.keys(cmp)));
                        console.info("Actual suggestions: " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(output));
                        console.info(this.diagnosticContext(root, src));
                        console.info("Failed test number " + testNum);
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(Base.failedTests_$LI$(), testNum);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private matchesExpectedSet(expected: Record<string, boolean>, output: string[]): boolean {
        const normalize = (value: string, caseSensitive: boolean): string => {
            let normalized = value.split("\r").join("");
            if (caseSensitive) normalized = normalized.split("\\\"").join("\"");
            else normalized = normalized.toLowerCase();
            return normalized;
        };
        const matches = (expectedText: string, actualText: string): boolean => {
            let caseSensitive = expectedText.startsWith('"');
            if (expectedText.startsWith('`')) expectedText = expectedText.slice(1, -1);
            let normalizedExpected = normalize(expectedText, caseSensitive);
            let actual = actualText.split("\r").join("");
            if (caseSensitive && !actual.startsWith('"')) actual = this.quoteOutput(actual);
            if (!caseSensitive) actual = actual.toLowerCase();
            return actual === normalizedExpected;
        };

        for (const [expectedText, positive] of Object.entries(expected)) {
            const found = output.some((actual) => matches(expectedText, actual));
            if (Boolean(positive) !== found) return false;
        }
        if (this.setEquality) {
            for (const actual of output) {
                if (!Object.keys(expected).some((expectedText) => matches(expectedText, actual))) return false;
            }
        }
        return true;
    }

    quoteOutput(output: string): string {
        return '\"' + output + '\"';
    }

    /**
     * Maximum time permitted for one completion check; zero disables the limit.
     * @return {number}
     */
    completionTimeLimitMillis(): number {
        return 0;
    }

    /*private*/ diagnosticContext(root: ParseNode, src: Array<LexerToken>): string {
        return "Test fixture:\n" + root.content$java_util_List(src);
    }

    /*private*/ async completion(root: ParseNode, src: Array<LexerToken>, input: string, testNum: number, expectedTimingLimitMillis: number): Promise<Array<string>> {
        const startedAt: number = /* nanoTime */(Date.now() * 1000000);
        const output: Array<string> = await this.query(root, src, input);
        const elapsedNanos: number = /* nanoTime */(Date.now() * 1000000) - startedAt;
        const completionTimeLimitMillis: number = expectedTimingLimitMillis == null ? this.completionTimeLimitMillis() : expectedTimingLimitMillis;
        if (completionTimeLimitMillis > 0 && elapsedNanos > completionTimeLimitMillis * 1000000){
            const elapsedMillis: number = (n => n<0?Math.ceil(n):Math.floor(n))((elapsedNanos + 999999) / 1000000);
            console.info("Failed test number " + testNum);
            console.info("completion exceeded " + completionTimeLimitMillis + " ms: took " + elapsedMillis + " ms;");
            console.info(this.diagnosticContext(root, src));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(Base.failedTests_$LI$(), testNum);
            return null;
        }
        return output;
    }

    parameters(node: ParseNode, src: Array<LexerToken>, input: string) {
    }

    result(node: ParseNode, src: Array<LexerToken>, input: string): any {
        if (node.contains$int(this.time_limit)){
            this.timingLimit(node, src);
        }
        if (node.contains$int(this.result_limit)){
            this.resultLimit(node, src);
        }
        if (node.contains$int(this.__element)){
            return this.element(node, src, input);
        }
        const output: any = <any>({});
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    Object.assign(output, this.result(child, src, input));
                }
            }
        }
        return output;
    }

    /*private*/ timingLimit(node: ParseNode, src: Array<LexerToken>) {
        this.__timingLimit = parseFloat(/* get */src[node.to - 1].content);
    }

    /*private*/ resultLimit(node: ParseNode, src: Array<LexerToken>) {
        this.__resultLimit = parseFloat(/* get */src[node.to - 1].content);
    }

    /*private*/ element(node: ParseNode, src: Array<LexerToken>, input: string): any {
        const output: any = <any>({});
        if (node.contains$int(this.dotted_name) || node.contains$int(this.code)){
            const current: string = node.content$java_util_List(src);
            /* put */(output[current] = true);
            return output;
        }
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.dotted_name) || child.contains$int(this.code)){
                        const current: string = child.content$java_util_List(src);
                        /* put */(output[current] = false);
                        return output;
                    }
                }
            }
        }
        return output;
    }

    async query(root: ParseNode, src: Array<LexerToken>, input: string): Promise<Array<string>> {
        if (root.contains$int(this.code)){
            return await this.output$java_lang_String$int(Base.sql_fragment(root, src, input), -1);
        }
        let lhs: string = "";
        let rhs: string = "";
        let codeChunks: number = 0;
        let hasCursorMarker: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.code)){
                        codeChunks++;
                        if (lhs === "")lhs = Base.sql_fragment(child, src, input); else rhs = Base.sql_fragment(child, src, input);
                    } else if (child.contains$java_lang_String("marker")){
                        hasCursorMarker = true;
                    }
                }
            }
        }
        if (1 < codeChunks && !hasCursorMarker){
            throw Object.defineProperty(new Error("Multiple code chunks require a ! cursor marker"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        return await this.output$java_lang_String$int(lhs + rhs, lhs.length);
    }

    program(node: ParseNode, src: Array<LexerToken>, input: string, sql: string) {
        const arbori: string = input.substring(/* get */src[node.from].begin, /* get */src[node.to - 1].end);
        const r: SqlProgram = new Base.Base$1(this, arbori);
        const output: any = r.run$java_lang_String$java_util_List$java_lang_Object(sql, null, "JS action");
        if (this.getGlobals().get("debug") != null){
            let array = /* keySet */Object.keys(output);
            for(let index = 0; index < array.length; index++) {
                let p = array[index];
                console.info(p + "=" + /* get */((m,k) => m[k]===undefined?null:m[k])(output, p).toString$int(p.length + 1))
            }
        }
    }

    public async output$java_lang_String$int(sql: string, pos: number): Promise<Array<string>> { throw new Error('cannot invoke abstract overloaded method... check your argument(s) type(s)'); }

    /*private*/ static sql_fragment(root: ParseNode, src: Array<LexerToken>, input: string): string {
        return /* replace */input.substring(/* get */src[root.from].begin, /* get */src[root.to - 1].end).split("`").join("");
    }

    /*private*/ comment(root: ParseNode, src: Array<LexerToken>, input: string): ParseNode {
        let txt: string = input.substring(/* get */src[root.from + 1].begin, /* get */src[root.to - 1].end - 1);
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(txt.charAt(0)) == '+'.charCodeAt(0))txt = txt.substring(1);
        const testNo: number = /* parseInt */parseInt(txt);
        if (this.maxTestNo < testNo)this.maxTestNo = testNo;
        if (this.singleTest != null && (<number>this.singleTest|0) !== testNo)return null;
        return null;
    }

    /*private*/ longestCommonPrefix(a: string, b: string): string {
        const minLength: number = Math.min(a.length, b.length);
        for(let i: number = 0; i < minLength; i++) {{
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(a.charAt(i)) != (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(b.charAt(i))){
                return a.substring(0, i);
            }
        };}
        return a.substring(0, minLength);
    }
}
Base["__class"] = "oracle.dbtools.test.Base";


export namespace Base {

    export class Base$0 extends Earley {
        public __parent: any;
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
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.__parent.code && token.type === Token.DQUOTED_STRING || symbol === this.__parent.code && token.type === Token.BQUOTED_STRING || symbol === this.__parent.StringLiteral && token.type === Token.DQUOTED_STRING || symbol === this.__parent.quoted_string && token.type === Token.QUOTED_STRING;
        }

        constructor(__parent: any, __arg0: any) {
            super(__arg0);
            this.__parent = __parent;
        }
    }


    export class Base$1 extends SqlProgram {
        public __parent: any;
        constructor(__parent: any, programText: string) {
            super(programText, __parent, __parent.getGlobals());
            this.__parent = __parent;
        }
    }

}



