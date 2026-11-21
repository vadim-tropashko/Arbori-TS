/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { Token } from '../Token.js';
import { Service } from '../../../arbori/util/Service.js';

/**
 * 
 * @author Dim
 * @class
 */
export class Util {
    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_Class$java_lang_String(Util, "test.sql.java");
        console.info(input);
        console.info(Util.javaToSQL(input));
    }

    static javaToSQL(input: string): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            if (t.type === Token.DQUOTED_STRING)/* append */(sb => { sb.str += <any>/* replace */t.content.substring(1, t.content.length - 1).split("\\n").join("\n"); return sb; })(ret); else if (t.type === Token.WS)/* append */(sb => { sb.str += <any>t.content; return sb; })(ret); else if (t.type === Token.OPERATION && ("+" === t.content))continue;
        }
        return /* toString */ret.str;
    }
}
Util["__class"] = "oracle.dbtools.parser.plsql.Util";
