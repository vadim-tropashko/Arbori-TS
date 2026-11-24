/* Generated from Java with JSweet 3.1.3 - http://www.jsweet.org */
import { Base } from '../../../../../main/typescript/oracle/dbtools/test/Base.js';
import { Format } from '../../../../../main/typescript/oracle/dbtools/app/Format.js';
import { ParseNode } from '../../../../../main/typescript/oracle/dbtools/parser/ParseNode.js';
import { LexerToken } from '../../../../../main/typescript/oracle/dbtools/parser/LexerToken.js';
import { Resource } from '../../../../../main/typescript/oracle/dbtools/parser/Resource.js';
import { Service } from '../../../../../main/typescript/oracle/arbori/util/Service.js';

export class FormatRegressionTest extends Base {
    public constructor() {
        super("src/test/resources/oracle/dbtools/app/format.test");
        if (this.format === undefined) { this.format = null; }
    }

    public static async main(args: string[]) {
        const test: FormatRegressionTest = new FormatRegressionTest();
        test.singleTest = args != null && args.length > 0 ? parseInt(args[0], 10) : null;
        await test.test();
        if (test.singleTest != null)return;
        console.info("Reference test time = 2173 for 53 tests");
        if (test.singleTest != null)throw Object.defineProperty(new Error("test.singleTest != null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        const file: string = "MSC_CL_PRE_PROCESS.pkgbdy";
        const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/" + file);
        const t0: number = /* currentTimeMillis */Date.now();
        const format: Format = new Format();
        const output: string = format.format(input);
        const t1: number = /* currentTimeMillis */Date.now();
        console.info("MSC_CL_PRE_PROCESS fmt time = " + (t1 - t0));
        console.info("Compared to 21334");
        if (50000 < t1 - t0)throw Object.defineProperty(new Error("MSC_CL_PRE_PROCESS performance regressed to >50000 ms"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public regressionTest() {
        this.test();
    }

    format: Format;

    /**
     * 
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @param {number} testNum
     * @return {boolean}
     */
    assertion(root: ParseNode, src: Array<LexerToken>, input: string, testNum: number): boolean {
        this.format = new Format();
        /* put */(this.format.options[this.format.formatWhenSyntaxError] = false);
        return super.assertion(root, src, input, testNum);
    }

    public output$oracle_dbtools_parser_ParseNode$java_util_List$java_lang_String$int(root: ParseNode, src: Array<LexerToken>, input: string, testNum: number) {
        this.format = new Format();
        /* put */(this.format.options[this.format.formatWhenSyntaxError] = false);
        super.output(root, src, input, testNum);
    }

    /**
     * 
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @param {number} testNum
     */
    public output(root?: any, src?: any, input?: any, testNum?: any) {
        if (((root != null && root instanceof <any>ParseNode) || root === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof input === 'string') || input === null) && ((typeof testNum === 'number') || testNum === null)) {
            return <any>this.output$oracle_dbtools_parser_ParseNode$java_util_List$java_lang_String$int(root, src, input, testNum);
        } else if (((typeof root === 'string') || root === null) && ((typeof src === 'number') || src === null) && input === undefined && testNum === undefined) {
            return <any>this.output$java_lang_String$int(root, src);
        } else throw new Error('invalid overload');
    }

    public output$java_lang_String$int(input: string, pos: number): Array<string> {
        const output: Array<string> = <any>([]);
        let formatted: string;
        try {
            formatted = this.format.format(input);
        } catch(e) {
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        /* add */(output.push(formatted)>0);
        return output;
    }

    /**
     * 
     * @param {ParseNode} node
     * @param {LexerToken[]} src
     * @param {string} input
     */
    parameters(node: ParseNode, src: Array<LexerToken>, input: string) {
        let key: string = null;
        let value: string = null;
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains(this.__parameters)){
                        this.parameters(child, src, input);
                        continue;
                    } else if (child.contains(this.dotted_name)){
                        const current: string = child.content(src);
                        if (key == null){
                            key = current;
                            continue;
                        } else {
                            value = current;
                            break;
                        }
                    } else if (child.contains(this.digits)){
                        value = child.content(src);
                    }
                }
            }
        }
        this.set(key, value);
    }

    /*private*/ set(attribute: string, item: string) {
        if ((this.format.kwCase === attribute) || (this.format.idCase === attribute)){
            /* put */(this.format.options[attribute] = /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("Case.UPPER", item) ? Format.Case.UPPER : (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("Case.lower", item) ? Format.Case.lower : (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("Case.initCap", item) ? Format.Case.InitCap : Format.Case.NoCaseChange)));
            return;
        }
        if (this.format.singleLineComments === attribute){
            /* put */(this.format.options[attribute] = /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("singleLine", item) ? Format.InlineComments.SingleLine : (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("multiLine", item) ? Format.InlineComments.MultiLine : Format.InlineComments.CommentsUnchanged));
            return;
        }
        if ((this.format.breaksComma === attribute) || (this.format.breaksConcat === attribute) || (this.format.breaksAroundLogicalConjunctions === attribute)){
            let tmp: Format.Breaks = Format.Breaks.BeforeAndAfter;
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("Breaks.Before", item))tmp = Format.Breaks.Before;
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("Breaks.After", item))tmp = Format.Breaks.After;
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("Breaks.None", item))tmp = Format.Breaks.None;
            /* put */(this.format.options[attribute] = tmp);
            return;
        }
        if (this.format.breaksAroundLogicalConjunctions === attribute){
            /* put */(this.format.options[attribute] = !(item === ("Breaks.None")));
            return;
        }
        if (this.format.extraLinesAfterSignificantStatements === attribute){
            if ("BreaksX2.X!" === item)/* put */(this.format.options[attribute] = Format.BreaksX2.X1); else if ("BreaksX2.X2" === item)/* put */(this.format.options[attribute] = Format.BreaksX2.X2); else /* put */(this.format.options[attribute] = Format.BreaksX2.Keep);
            return;
        }
        if (this.format.useTab === attribute){
            /* put */(this.format.options[attribute] = item === ("true"));
            return;
        }
        if (this.format.spaceAroundBrackets === attribute){
            if ("Space.Outside" === item)/* put */(this.format.options[attribute] = Format.Space.Outside); else if ("Space.NoSpace" === item)/* put */(this.format.options[attribute] = Format.Space.NoSpace); else if ("Space.Default" === item)/* put */(this.format.options[attribute] = Format.Space.Default); else /* put */(this.format.options[attribute] = Format.Space.Inside);
            return;
        }
        if (this.format.flowControl === attribute){
            if ("FlowControl.IndentedActions" === item)/* put */(this.format.options[attribute] = Format.FlowControl.IndentedActions); else if ("FlowControl.Terse" === item)/* put */(this.format.options[attribute] = Format.FlowControl.Terse); else if ("FlowControl.IndentedConditionsActions" === item)/* put */(this.format.options[attribute] = Format.FlowControl.IndentedConditionsActions); else /* put */(this.format.options[attribute] = Format.FlowControl.SeparateConditionsActions);
            return;
        }
        try {
            const i: number = /* parseInt */parseInt(item);
            if (!Number.isNaN(i)){
                /* put */(this.format.options[attribute] = i);
                return;
            }
        } catch(e) {
        }
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("true", item) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("false", item))/* put */(this.format.options[attribute] = /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("true", item)); else /* put */(this.format.options[attribute] = item);
    }
}
FormatRegressionTest["__class"] = "oracle.dbtools.app.FormatRegressionTest";




import { Format } from './Format';


import { Resource } from './Resource';


await FormatRegressionTest.main(process.argv.slice(2));
