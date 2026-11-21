/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Program } from '../../arbori/Program';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { JsonEarley } from '../json/JsonEarley';
import { Service } from '../../../arbori/util/Service';

export class Rules {
    public static main(args: string[]) {
        let input: string = Service.readFile$java_lang_String("../../VSCODE-workspace/example.ast");
        LexerToken.customLineCommentPrefixes = ["\"raw\""];
        input = /* replace */input.split(": \"raw\"").join(": \"r*w\"");
        const target: Parsed = new Parsed(input, LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.JsonStrings_$LI$()), JsonEarley.jsonParser(), "top");
        const program: Program = new Rules.Rules$0(JsonEarley.jsonParser(), new Rules());
        if (target.getSyntaxError() != null)console.error(target.getSyntaxError());
        const prg: string = Service.readFile$java_lang_Class$java_lang_String(Rules, "rules.arbori");
        program.compile$java_lang_String(prg);
        program.eval$oracle_dbtools_parser_Parsed(target);
    }

    public nodeVarContent(nodeVar: string, tuple: any, target: Parsed): number {
        const node: 

        const child2parent: any;

        const starts: any;

        const ends: any;

        const __rules: any;

        const input: string;

        const src: Array<LexerToken>;

        constructor() {
            this.child2parent = <any>({});
            this.starts = <any>({});
            this.ends = <any>({});
            this.__rules = <any>({});
            if (this.input === undefined) { this.input = null; }
            if (this.src === undefined) { this.src = null; }
        }
    }
    Rules["__class"] = "oracle.dbtools.parser.js.Rules";


    export namespace Rules {

        

        


