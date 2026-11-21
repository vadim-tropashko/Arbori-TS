/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../arbori/util/Service.js';

/**
 * Facilitates the third step of Semantic Analysis & Transaltion
 * the actual text rewrite specifications
 * It cuts every interval [x,y) and inserts replacement string
 * The interval is formally a key in substututions map
 * and the replacement is corresponding value
 * @author Dim
 * @param {string} input
 * @class
 */
export class Substitutions {
    /*private*/ input: string;

    public getInput(): string {
        return this.input;
    }

    public constructor(input?: any) {
        if (((typeof input === 'string') || input === null)) {
            let __args = arguments;
            if (this.input === undefined) { this.input = null; } 
            if (this.target === undefined) { this.target = null; } 
            this.substitutions = <any>({});
            this.input = input;
        } else if (((input != null && input instanceof <any>Parsed) || input === null)) {
            let __args = arguments;
            let target: any = __args[0];
            if (this.input === undefined) { this.input = null; } 
            if (this.target === undefined) { this.target = null; } 
            this.substitutions = <any>({});
            this.target = target;
            this.input = target.getInput();
        } else throw new Error('invalid overload');
    }

    /*private*/ target: Parsed;

    substitutions: any;

    public size(): number {
        return /* size */((m) => { if(m.entries==null) m.entries=[]; return m.entries.length; })(<any>this.substitutions);
    }

    public put$int$int$java_lang_String(X: number, Y: number, replacement: string) {
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.substitutions);
            for(let index = 0; index < array.length; index++) {
                let candidate = array[index];
                {
                    if (X === Service.lX(candidate) && Service.lY(candidate) === Y)continue;
                    if (X <= Service.lX(candidate) && Service.lX(candidate) < Y || X < Service.lY(candidate) && Service.lY(candidate) <= Y || Service.lX(candidate) <= X && X < Service.lY(candidate) || Service.lX(candidate) < X && X <= Service.lY(candidate))throw Object.defineProperty(new Error("[" + Service.lX(candidate) + "," + Service.lY(candidate) + ") overlaps with [" + X + "," + Y + ")"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.substitutions, Service.lPair(X, Y), replacement);
    }

    public get$int$int(X: number, Y: number): string {
        return /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, Service.lPair(X, Y));
    }

    public get(X?: any, Y?: any): string {
        if (((typeof X === 'number') || X === null) && ((typeof Y === 'number') || Y === null)) {
            return <any>this.get$int$int(X, Y);
        } else if (((X != null && X instanceof <any>ParseNode) || X === null) && Y === undefined) {
            return <any>this.get$oracle_dbtools_parser_ParseNode(X);
        } else throw new Error('invalid overload');
    }

    public replace$int$int$java_lang_String(X: number, Y: number, replacement: string) {
        this.put$int$int$java_lang_String(X, Y, replacement);
    }

    public replace(X?: any, Y?: any, replacement?: any) {
        if (((typeof X === 'number') || X === null) && ((typeof Y === 'number') || Y === null) && ((typeof replacement === 'string') || replacement === null)) {
            return <any>this.replace$int$int$java_lang_String(X, Y, replacement);
        } else if (((X != null && X instanceof <any>ParseNode) || X === null) && ((typeof Y === 'string') || Y === null) && replacement === undefined) {
            return <any>this.replace$oracle_dbtools_parser_ParseNode$java_lang_String(X, Y);
        } else throw new Error('invalid overload');
    }

    public get$oracle_dbtools_parser_ParseNode(node: ParseNode): string {
        if (this.target == null)throw Object.defineProperty(new Error("target == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        return this.get$int$int(/* get */this.target.getSrc()[node.from].begin, /* get */this.target.getSrc()[node.to - 1].end);
    }

    public put$oracle_dbtools_parser_ParseNode$java_lang_String$java_lang_String(node: ParseNode, replacement: string, annotation: string) {
        if (this.target == null)throw Object.defineProperty(new Error("target == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        const was: string = this.input.substring(/* get */this.target.getSrc()[node.from].begin, /* get */this.target.getSrc()[node.to - 1].end);
        let comment: string = "";
        if (annotation != null && !("" === annotation))comment = "/* " + annotation + was + " */";
        this.put$int$int$java_lang_String(/* get */this.target.getSrc()[node.from].begin, /* get */this.target.getSrc()[node.to - 1].end, replacement + comment);
    }

    public put(node?: any, replacement?: any, annotation?: any) {
        if (((node != null && node instanceof <any>ParseNode) || node === null) && ((typeof replacement === 'string') || replacement === null) && ((typeof annotation === 'string') || annotation === null)) {
            return <any>this.put$oracle_dbtools_parser_ParseNode$java_lang_String$java_lang_String(node, replacement, annotation);
        } else if (((typeof node === 'number') || node === null) && ((typeof replacement === 'number') || replacement === null) && ((typeof annotation === 'string') || annotation === null)) {
            return <any>this.put$int$int$java_lang_String(node, replacement, annotation);
        } else if (((node != null && node instanceof <any>ParseNode) || node === null) && ((typeof replacement === 'string') || replacement === null) && annotation === undefined) {
            return <any>this.put$oracle_dbtools_parser_ParseNode$java_lang_String(node, replacement);
        } else throw new Error('invalid overload');
    }

    public put$oracle_dbtools_parser_ParseNode$java_lang_String(node: ParseNode, replacement: string) {
        this.put$oracle_dbtools_parser_ParseNode$java_lang_String$java_lang_String(node, replacement, "");
    }

    public putWcomment(node: ParseNode, replacement: string) {
        this.put$oracle_dbtools_parser_ParseNode$java_lang_String$java_lang_String(node, replacement, "was:");
    }

    public delete(node: ParseNode) {
        this.put$oracle_dbtools_parser_ParseNode$java_lang_String$java_lang_String(node, "", "");
    }

    public deleteWcomment(node: ParseNode) {
        this.put$oracle_dbtools_parser_ParseNode$java_lang_String$java_lang_String(node, "", "deleted: ");
    }

    public append(node: ParseNode, appendix: string) {
        this.put$oracle_dbtools_parser_ParseNode$java_lang_String(node, "/*added:*/" + appendix);
    }

    public replace$oracle_dbtools_parser_ParseNode$java_lang_String(node: ParseNode, replacement: string) {
        this.put$oracle_dbtools_parser_ParseNode$java_lang_String(node, replacement);
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        let lastPos: number = 0;
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const begin: number = Service.lX(key);
                    const end: number = Service.lY(key);
                    if (lastPos < begin)/* append */(sb => { sb.str += <any>this.input.substring(lastPos, begin); return sb; })(ret);
                    /* append */(sb => { sb.str += <any>"\n---\n"; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>this.input.substring(begin, end); return sb; })(ret);
                    /* append */(sb => { sb.str += <any>"\n--->>>\n"; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key); return sb; })(ret);
                    /* append */(sb => { sb.str += <any>"\n---\n"; return sb; })(ret);
                    lastPos = end;
                }
            }
        }
        /* append */(sb => { sb.str += <any>this.input.substring(lastPos); return sb; })(ret);
        return /* toString */ret.str;
    }

    public transformInput(): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        let lastPos: number = 0;
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const begin: number = Service.lX(key);
                    const end: number = Service.lY(key);
                    if (lastPos < begin)/* append */(sb => { sb.str += <any>this.input.substring(lastPos, begin); return sb; })(ret);
                    /* append */(sb => { sb.str += <any>/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key); return sb; })(ret);
                    lastPos = end;
                }
            }
        }
        /* append */(sb => { sb.str += <any>this.input.substring(lastPos); return sb; })(ret);
        return /* toString */ret.str;
    }

    /**
     * 
     * @param {*} obj
     * @return {boolean}
     */
    public equals(obj: any): boolean {
        const cmp: Substitutions = <Substitutions>obj;
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const match: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>cmp.substitutions, key);
                    if (match == null)return false;
                    if (match === /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key))return false;
                }
            }
        }
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>cmp.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const match: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key);
                    if (match == null)return false;
                }
            }
        }
        return true;
    }

    public diff(obj: any): string {
        const cmp: Substitutions = <Substitutions>obj;
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const match: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>cmp.substitutions, key);
                    if (match == null)return "no match for " + Service.lX(key) + "," + Service.lY(key) + " `" + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key) + "`";
                    if (match === /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key))return "" + Service.lX(key) + "," + Service.lY(key) + " `" + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key) + "` != `" + match + "`";
                }
            }
        }
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>cmp.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const match: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key);
                    if (match == null)return "no match for " + Service.lX(key) + "," + Service.lY(key) + " `" + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>cmp.substitutions, key) + "`";
                }
            }
        }
        return "=";
    }

    public lines(): string[] {
        const ret: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */((m) => { if(m.entries==null) m.entries=[]; return m.entries.length; })(<any>this.substitutions));
        let pos: number = -1;
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    pos++;
                    ret[pos] = "" + Service.lX(key) + "," + Service.lY(key) + " `" + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key) + "`";
                }
            }
        }
        return ret;
    }

    /**
     * Calculate the offset in the input, given the offset in the transformed text, e.g.
     * Substitutions repl = new Substitutions("0123456789012345");
     * --0123456789012345              <-- input
     * repl.put(1,2,"[1,2)");          <-- input amendment#1
     * repl.put(11,12,"[11,12)");
     * repl.transformInput():
     * System.out.println(repl.transformInput());
     * --0[1,2)234567890[11,12)2345    <-- transformed text
     * --0123456789012345678901234     <-- offsets in the transformed text
     * System.out.println("**** repl.origOffset(1)="+repl.origOffset(1));
     * --repl.origOffset(1)=1
     * System.out.println("**** repl.origOffset(5)="+repl.origOffset(5));
     * --repl.origOffset(5)=1
     * System.out.println("**** repl.origOffset(10)="+repl.origOffset(10));
     * --repl.origOffset(10)=6
     * System.out.println("**** repl.origOffset(14)="+repl.origOffset(14));
     * --repl.origOffset(14)=10
     * System.out.println("**** repl.origOffset(19)="+repl.origOffset(19));
     * --repl.origOffset(19)=11
     * System.out.println("**** repl.origOffset(23)="+repl.origOffset(23));
     * --repl.origOffset(23)=13
     * @param {number} pos
     * @return {number}
     */
    public origOffset(pos: number): number {
        let diff: number = 0;
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.substitutions);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const begin: number = Service.lX(key);
                    const end: number = Service.lY(key);
                    if (pos + diff <= begin)break;
                    const len: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.substitutions, key).length;
                    if (begin - diff <= pos && pos < begin - diff + len){
                        const x: number = pos - (begin - diff);
                        diff -= x;
                        break;
                    } else diff += (end - begin) - len;
                }
            }
        }
        return pos + diff;
    }

    public static levenshteinDistance(x: string, y: string): number {
        if (x.length === 0)return y.length;
        if (y.length === 0)return x.length;
        const x1: string = x.substring(1);
        const y1: string = y.substring(1);
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(x.charAt(0)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(y.charAt(0)))return Substitutions.levenshteinDistance(x1, y1);
        const a: number = Substitutions.levenshteinDistance(x1, y);
        if (a === 0)return 1;
        const b: number = Substitutions.levenshteinDistance(x, y1);
        if (b === 0)return 1;
        const c: number = Substitutions.levenshteinDistance(x1, y1);
        return 1 + Math.min(a, Math.min(b, c));
    }

    public static main(args: string[]) {
        const repl: Substitutions = new Substitutions("0123456789012345");
        repl.put$int$int$java_lang_String(1, 12, "[1,12)");
        repl.put$int$int$java_lang_String(9, 10, "[9,10)");
        console.info("**** repl.toString():");
        console.info(repl.toString());
        console.info("**** repl.transformInput():");
        console.info(repl.transformInput());
        console.info("0123456789012345678901234");
        console.info("**** repl.origOffset(1)=" + repl.origOffset(1));
        console.info("**** repl.origOffset(5)=" + repl.origOffset(5));
        console.info("**** repl.origOffset(10)=" + repl.origOffset(10));
        console.info("**** repl.origOffset(14)=" + repl.origOffset(14));
        console.info("**** repl.origOffset(19)=" + repl.origOffset(19));
        console.info("**** repl.origOffset(23)=" + repl.origOffset(23));
        let t1: number = /* currentTimeMillis */Date.now();
        let x: string = "9012345";
        const y: string = "234567890[11,12)2345";
        console.info("levenshteinDistance(\"" + x + "\", \"" + y + "\")=" + Substitutions.levenshteinDistance(x, y));
        console.info(/* currentTimeMillis */Date.now() - t1);
        t1 = /* currentTimeMillis */Date.now();
        x = "678" + x;
        console.info("levenshteinDistance(\"" + x + "\", \"" + y + "\")=" + Substitutions.levenshteinDistance(x, y));
        console.info(/* currentTimeMillis */Date.now() - t1);
    }
}
Substitutions["__class"] = "oracle.dbtools.parser.Substitutions";




import { ParseNode } from './ParseNode.js';


import { Parsed } from './Parsed.js';
