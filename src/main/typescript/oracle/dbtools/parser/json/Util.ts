/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { StringHelper } from '../../../../javaemul/internal/StringHelper.js';

export class Util {
    static specialEncoding: string = "^$%s%$^";

    public static cleanText(input: string): string {
        let ret: string = input;
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ret, "\""))ret = ret.substring(1, ret.length - 1);
        ret = /* replace */ret.split("\\\\").join(Util.specialEncoding);
        ret = /* replace */ret.split("\\\"").join("\"");
        ret = /* replace */ret.split("\\r").join("\r");
        ret = /* replace */ret.split("\\n").join("\n");
        ret = /* replace */ret.split("\\t").join("\t");
        ret = /* replace */ret.split("\\b").join("\b");
        ret = /* replace */ret.split("\\f").join("\f");
        ret = /* replace */ret.split(Util.specialEncoding).join("\\");
        return ret;
    }

    public static unescape(input: string): string {
        try {
            const f: JsonFactory = new JsonFactory();
            const p: JsonParser = f.createParser('\"' + input + '\"');
            const t: JsonToken = p.nextToken();
            return p.getText();
        } catch(e) {
            console.error(e.message, e);
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    public static sugarcoatText(input: string): string {
        if (input == null)return null;
        let ret: string = input;
        ret = /* replace */ret.split("\\").join("\\\\");
        ret = /* replace */ret.split("\r").join("\\r");
        ret = /* replace */ret.split("\n").join("\\n");
        ret = /* replace */ret.split("\t").join("\\t");
        ret = /* replace */ret.split("\b").join("\\b");
        ret = /* replace */ret.split("\f").join("\\f");
        ret = /* replace */ret.split("\"").join("\\\"");
        const b: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        {
            let array = /* toCharArray */(ret).split('');
            for(let index = 0; index < array.length; index++) {
                let c = array[index];
                {
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) >= 128)/* append */(sb => { sb.str += <any>StringHelper.format("%04X", (c).charCodeAt(0)); return sb; })(/* append */(sb => { sb.str += <any>"\\u"; return sb; })(b)); else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) < 32)/* append */(sb => { sb.str += <any>'?'; return sb; })(b); else /* append */(sb => { sb.str += <any>c; return sb; })(b);
                }
            }
        }
        return /* toString */b.str;
    }

    public static escape(input: string): string {
        try {
            const f: JsonFactory = new JsonFactory();
            const w: Writer = new CharArrayWriter();
            const g: JsonGenerator = f.createGenerator(w);
            g.writeString(input);
            g.close();
            let ret: string = w.toString();
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ret, "\""))ret = ret.substring(1, ret.length - 1);
            return ret;
        } catch(e) {
            console.error(e.message, e);
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    public static toJson(message: any): string {
        if (message == null)return null;
        if ((typeof message === 'string') && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)((<string>message), "\""))return <string>message;
        if ((typeof message === 'string') && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)((<string>message), "{"))return <string>message;
        if ((typeof message === 'string') && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)((<string>message), "["))return <string>message;
        if ((typeof message === 'string') && /* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)("OK",message)))return <string>"\"" + message + "\"";
        if ((typeof message === 'string') && /* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)("null",message)))return null;
        if (message != null && (message.constructor != null && message.constructor["__interfaces"] != null && message.constructor["__interfaces"].indexOf("oracle.dbtools.parser.json.Jsonable") >= 0))return (<Jsonable><any>message).toJson();
        if (message != null && message instanceof <any>Array && (message.length == 0 || message[0] == null ||message[0] != null && (message[0].constructor != null && message[0].constructor["__interfaces"] != null && message[0].constructor["__interfaces"].indexOf("oracle.dbtools.parser.json.Jsonable") >= 0))){
            const array: Jsonable[] = <Jsonable[]>message;
            const ret: { str: string, toString: Function } = { str: "[", toString: function() { return this.str; } };
            let pos: number = 0;
            for(let index = 0; index < array.length; index++) {
                let elem = array[index];
                {
                    if (0 < pos++)/* append */(sb => { sb.str += <any>','; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>elem.toJson(); return sb; })(ret);
                }
            }
            /* append */(sb => { sb.str += <any>']'; return sb; })(ret);
            return /* toString */ret.str;
        }
        if (message != null && (message["__classes"] && message["__classes"].indexOf("java.lang.Throwable") >= 0) || message != null && message instanceof <any>Error)return "\"" + (<Error>message).message + "\"";
        throw Object.defineProperty(new Error("VT: Unrecognized message: " + message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public static main(args: string[]) {
        const value: string = "Hello \n\"World\"";
        console.info(Util.escape(value));
        console.info(Util.sugarcoatText(value));
        console.info(Util.unescape(Util.escape(value)));
        console.info(Util.cleanText(Util.sugarcoatText(value)));
    }
}
Util["__class"] = "oracle.dbtools.parser.json.Util";




import { Jsonable } from './Jsonable.js';
