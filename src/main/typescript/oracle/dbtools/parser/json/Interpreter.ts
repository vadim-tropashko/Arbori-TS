/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Program } from '../../arbori/Program.js';
import { LexerToken } from '../LexerToken.js';
import { Parsed } from '../Parsed.js';
import { Service } from '../../../arbori/util/Service.js';

export class Interpreter {
    public queryEvents: boolean;

    public ret: NamedValue;

    program: Program;

    public eval(input: string): NamedValue {
        const target: Parsed = new Parsed(input, LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.JsonStrings_$LI$()), JsonEarley.jsonParser(), "top");
        if (this.program != null){
            this.program.eval$oracle_dbtools_parser_Parsed(target);
            return this.ret;
        }
        this.program = new Interpreter.Interpreter$0(this, JsonEarley.jsonParser(), this);
        if (target.getSyntaxError() != null)console.error(target.getSyntaxError());
        const prg: string = Service.readFile$java_lang_Class$java_lang_String(Interpreter, "interpreter.arbori");
        this.program.compile$java_lang_String(prg);
        this.program.eval$oracle_dbtools_parser_Parsed(target);
        return this.ret;
    }

    public static main(args: string[]) {
        const file: string = "call.json";
        const input: string = Service.readFile$java_lang_String("C:\\Users\\dim\\Documents\\JSON/init.json");
        new Interpreter().eval(input);
    }

    constructor() {
        this.queryEvents = false;
        this.ret = null;
        this.program = null;
    }
}
Interpreter["__class"] = "oracle.dbtools.parser.json.Interpreter";


export namespace Interpreter {

    export class Interpreter$0 extends Program {
        public __parent: any;
        constructor(__parent: any, __arg0: any, __arg1: any) {
            super(__arg0, __arg1);
            this.__parent = __parent;
        }
    }

}




import { JsonEarley } from './JsonEarley.js';


import { NamedValue } from './NamedValue.js';
