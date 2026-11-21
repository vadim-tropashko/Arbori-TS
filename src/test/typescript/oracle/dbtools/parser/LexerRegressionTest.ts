/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Service } from '../../../../../main/typescript/oracle/arbori/util/Service.js';
import { SyntaxError } from '../../../../../main/typescript/oracle/dbtools/parser/plsql/SyntaxError.js';
import { Earley } from '../../../../../main/typescript/oracle/dbtools/parser/Earley.js';
import { Grammar } from '../../../../../main/typescript/oracle/dbtools/parser/Grammar.js';
import { ParseNode } from '../../../../../main/typescript/oracle/dbtools/parser/ParseNode.js';
import { RuleTuple } from '../../../../../main/typescript/oracle/dbtools/parser/RuleTuple.js';
import { Matrix } from '../../../../../main/typescript/oracle/dbtools/parser/Matrix.js';
import { Lexer } from '../../../../../main/typescript/oracle/dbtools/parser/Lexer.js';
import { LexerToken } from '../../../../../main/typescript/oracle/dbtools/parser/LexerToken.js';
import { Token } from '../../../../../main/typescript/oracle/dbtools/parser/Token.js';

/**
 * Creates a runner using this class's fixture grammar.
 * @class
 */
export class LexerRegressionTest {
    static singleTest: number = null;

    /*private*/ settings: any;

    /*private*/ failedTests: Array<number>;

    /*private*/ testParser: Earley;

    /*private*/ __assertion: number;

    /*private*/ __atest: number;

    /*private*/ comment: number;

    /*private*/ content: number;

    /*private*/ digits: number;

    /*private*/ identifier: number;

    /*private*/ output: number;

    /*private*/ __parameters: number;

    /*private*/ __query: number;

    /*private*/ __range: number;

    /*private*/ __token: number;

    /*private*/ __tokenList: number;

    /*private*/ type: number;

    /*private*/ testNo: number;

    public constructor() {
        this.settings = <any>({});
        this.failedTests = <any>([]);
        if (this.testParser === undefined) { this.testParser = null; }
        if (this.__assertion === undefined) { this.__assertion = 0; }
        if (this.__atest === undefined) { this.__atest = 0; }
        if (this.comment === undefined) { this.comment = 0; }
        if (this.content === undefined) { this.content = 0; }
        if (this.digits === undefined) { this.digits = 0; }
        if (this.identifier === undefined) { this.identifier = 0; }
        if (this.output === undefined) { this.output = 0; }
        if (this.__parameters === undefined) { this.__parameters = 0; }
        if (this.__query === undefined) { this.__query = 0; }
        if (this.__range === undefined) { this.__range = 0; }
        if (this.__token === undefined) { this.__token = 0; }
        if (this.__tokenList === undefined) { this.__tokenList = 0; }
        if (this.type === undefined) { this.type = 0; }
        if (this.testNo === undefined) { this.testNo = 0; }
        try {
            this.testParser = new LexerRegressionTest.LexerRegressionTest$0(this, this.getRules());
        } catch(exception) {
            throw new Error(exception.message, { cause: exception });
        }
        this.output = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "output");
        this.__tokenList = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "token_list");
        this.__assertion = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "assertion");
        this.__query = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "query");
        this.__atest = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "atest");
        this.__token = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "token");
        this.__range = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "range");
        this.content = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "content");
        this.type = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "type");
        this.digits = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "digits");
        this.comment = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "comment");
        this.__parameters = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "parameters");
        this.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(this.testParser.symbolIndexes, "identifier");
    }

    /**
     * Runs the PL/SQL lexer regression fixture.
     */
    public static test() {
        new LexerRegressionTest().run();
    }

    /**
     * Runs the PL/SQL lexer regression fixture from the command line.
     * @param {java.lang.String[]} args
     */
    public static main(args: string[]) {
        LexerRegressionTest.test();
    }

    /**
     * Runs the fixture configured by this runner.
     * 
     * @throws Exception when the fixture is invalid or a regression is found
     */
    public run() {
        /* clear */(obj => { for (let member in obj) delete obj[member]; })(this.settings);
        /* clear */(this.failedTests.length = 0);
        this.testNo = 0;
        const input: string = Service.readFile$java_lang_String(this.resourcePath("lexerRegression.test"));
        const source: Array<LexerToken> = Lexer.parse$java_lang_String$java_lang_String(input, "`");
        const matrix: Matrix = new Matrix(this.testParser);
        this.testParser.parse$java_util_List$oracle_dbtools_parser_Matrix(source, matrix);
        const syntaxError: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["atest"], source, this.testParser, matrix);
        if (syntaxError != null){
            throw Object.defineProperty(new Error("Invalid lexer regression fixture at line " + syntaxError.line + '\n' + syntaxError.code + '\n' + syntaxError.marker), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
        }
        this.atest(this.testParser.forest$java_util_List$oracle_dbtools_parser_Matrix(source, matrix), source, input);
        if (!/* isEmpty */(this.failedTests.length == 0)){
            throw Object.defineProperty(new Error("Failed lexer regressions: " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(this.failedTests)), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        if (LexerRegressionTest.singleTest != null)throw Object.defineProperty(new Error("singleTest != null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        console.log("Lexer regression fixture passed.");
    }

    /**
     * @return {string} the directory below {@code oracle/dbtools/parser} containing fixtures.
     */
    fixtureDirectory(): string {
        return "plsql";
    }

    /**
     * Lexes a fixture query using the selected whitespace setting.
     * 
     * @param {string} input query text from the fixture
     * @return {LexerToken[]} lexer tokens for comparison
     */
    parse(input: string): Array<LexerToken> {
        return Lexer.parse$java_lang_String$boolean(input, this.keepsWhitespaceAndComments());
    }

    /**
     * @return {boolean} whether the current fixture setting retains whitespace tokens.
     */
    keepsWhitespaceAndComments(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.settings, "keepWsAndComments") !== false;
    }

    /*private*/ getRules(): Array<RuleTuple> {
        const input: string = Service.readFile$java_lang_String(this.grammarResourcePath("lexerTest.grammar"));
        const source: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.TEST_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(source, input);
        const rules: Array<RuleTuple> = <any>([]);
        Grammar.grammar(root, source, rules);
        return rules;
    }

    /*private*/ resourcePath(name: string): string {
        return LexerRegressionTest.resourcePath(this.fixtureDirectory(), name);
    }

    /*private*/ grammarResourcePath(name: string): string {
        return LexerRegressionTest.resourcePath("plsql", name);
    }

    public static resourcePath(directory: string, name: string): string {
        return resolve(process.cwd(), "src/test/resources/oracle/dbtools/parser", directory, name);
    }

    /*private*/ atest(root: ParseNode, source: Array<LexerToken>, input: string) {
        if (root.contains$int(this.__assertion)){
            if (LexerRegressionTest.singleTest == null || LexerRegressionTest.singleTest === this.testNo){
                this.assertion(root, source, input);
            }
            return;
        }
        if (root.contains$int(this.output)){
            if (LexerRegressionTest.singleTest == null || LexerRegressionTest.singleTest === this.testNo){
                {
                    let array = root.children();
                    for(let index = 0; index < array.length; index++) {
                        let child = array[index];
                        {
                            LexerToken.print$java_util_List(this.query(child, source, input));
                            return;
                        }
                    }
                }
            }
            return;
        }
        if (root.contains$int(this.comment)){
            this.testNo = /* parseInt */parseInt(input.substring(/* get */source[root.from + 2].begin, /* get */source[root.to - 1].end - 1));
        }
        if (root.contains$int(this.__parameters)){
            this.parameters(root, source);
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    this.atest(child, source, input);
                }
            }
        }
    }

    /*private*/ parameters(root: ParseNode, source: Array<LexerToken>) {
        let key: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.__parameters)){
                        this.parameters(child, source);
                    } else if (child.contains$int(this.identifier)){
                        key = child.content$java_util_List(source);
                    } else if (child.contains$java_lang_String("\'FALSE\'")){
                        /* put */(this.settings[key] = false);
                    } else if (child.contains$java_lang_String("\'TRUE\'")){
                        /* put */(this.settings[key] = true);
                    }
                }
            }
        }
    }

    /*private*/ query(root: ParseNode, source: Array<LexerToken>, input: string): Array<LexerToken> {
        return this.parse(this.sqlFragment(root, source, input));
    }

    /*private*/ sqlFragment(root: ParseNode, source: Array<LexerToken>, input: string): string {
        const value: string = input.substring(/* get */source[root.from].begin, /* get */source[root.to - 1].end);
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(value.charAt(0)) == '\"'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(value.charAt(0)) == '`'.charCodeAt(0)){
            return value.substring(1, value.length - 1);
        }
        return value;
    }

    /*private*/ assertion(root: ParseNode, source: Array<LexerToken>, input: string) {
        let actual: Array<LexerToken> = null;
        let expected: Array<LexerToken> = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.__query)){
                        actual = this.query(child, source, input);
                    } else if (child.contains$int(this.__tokenList)){
                        expected = this.tokenList(child, source, input);
                    }
                }
            }
        }
        if (!Lexer.match(expected, actual)){
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this.failedTests, this.testNo);
        }
    }

    /*private*/ tokenList(root: ParseNode, source: Array<LexerToken>, input: string): Array<LexerToken> {
        const tokens: Array<LexerToken> = <any>([]);
        if (root.contains$int(this.__token)){
            /* add */(tokens.push(this.token(root, source, input))>0);
            return tokens;
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    /* addAll */((l1, l2) => l1.push.apply(l1, l2))(tokens, this.tokenList(child, source, input));
                }
            }
        }
        return tokens;
    }

    /*private*/ token(root: ParseNode, source: Array<LexerToken>, input: string): LexerToken {
        const result: LexerToken = new LexerToken(" ", -1, -1, null);
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.__range)){
                        const tokenRange: number = this.range(child, source);
                        result.begin = Service.lX(tokenRange);
                        result.end = Service.lY(tokenRange);
                    } else if (child.contains$int(this.content)){
                        let tokenContent: string = child.content$java_util_List(source);
                        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tokenContent, "\"```"))tokenContent = tokenContent.substring(1, tokenContent.length - 1); else if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tokenContent, "`"))tokenContent = tokenContent.substring(1, tokenContent.length - 1);
                        result.content = tokenContent;
                    } else if (child.contains$int(this.type)){
                        const tokenType: string = child.content$java_util_List(source);
                        result.type = /* Enum.valueOf */<any>Token[tokenType.substring(1, tokenType.length - 1)];
                    }
                }
            }
        }
        return result;
    }

    /*private*/ range(root: ParseNode, source: Array<LexerToken>): number {
        let begin: number = -1;
        let end: number = -1;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$int(this.digits)){
                        if (begin === -1){
                            begin = /* parseInt */parseInt(/* get */source[child.from].content);
                        } else {
                            end = /* parseInt */parseInt(/* get */source[child.from].content);
                        }
                    }
                }
            }
        }
        return Service.lPair(begin, end);
    }
}
LexerRegressionTest["__class"] = "oracle.dbtools.parser.LexerRegressionTest";


export namespace LexerRegressionTest {

    export class LexerRegressionTest$0 extends Earley {
        public __parent: any;
        /**
         * 
         * @param {number} y
         * @param {LexerToken[]} source
         * @param {number} symbol
         * @param {number} suspect
         * @return {boolean}
         */
        isIdentifier(y: number, source: Array<LexerToken>, symbol: number, suspect: number): boolean {
            const lexerToken: LexerToken = /* get */source[y];
            return symbol === this.identifier && (lexerToken.type === Token.IDENTIFIER || lexerToken.type === Token.DQUOTED_STRING || lexerToken.type === Token.BQUOTED_STRING);
        }

        constructor(__parent: any, __arg0: any) {
            super(__arg0);
            this.__parent = __parent;
        }
    }

}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
    LexerRegressionTest.main([]);
}

