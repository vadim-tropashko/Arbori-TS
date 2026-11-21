/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
export class NamedValue {
    public name: string;

    public atomic: string;

    public composite: Array<NamedValue>;

    public constructor(n?: any, a?: any) {
        if (((typeof n === 'string') || n === null) && ((typeof a === 'string') || a === null)) {
            let __args = arguments;
            if (this.name === undefined) { this.name = null; } 
            this.atomic = null;
            this.composite = null;
            this.name = n;
            this.atomic = a;
        } else if (((typeof n === 'string') || n === null) && ((a != null && (a instanceof Array)) || a === null)) {
            let __args = arguments;
            let c: any = __args[1];
            if (this.name === undefined) { this.name = null; } 
            this.atomic = null;
            this.composite = null;
            this.name = n;
            this.composite = c;
        } else throw new Error('invalid overload');
    }

    public isLiteral(): boolean {
        return this.name == null || (this.name === this.valueString());
    }

    public child$java_lang_String(name: string): NamedValue {
        if (this.composite == null)return null;
        for(let index = 0; index < this.composite.length; index++) {
            let c = this.composite[index];
            {
                if (name === c.name)return c;
            }
        }
        return null;
    }

    public child(name?: any): NamedValue {
        if (((typeof name === 'string') || name === null)) {
            return <any>this.child$java_lang_String(name);
        } else if (((typeof name === 'number') || name === null)) {
            return <any>this.child$int(name);
        } else throw new Error('invalid overload');
    }

    public firstChild(): NamedValue {
        return this.child$int(0);
    }

    public child$int(index: number): NamedValue {
        if (this.composite == null)return null;
        return /* get */this.composite[index];
    }

    public valueString(): string {
        if (this.atomic != null)return this.atomic;
        if (this.composite != null){
            let openBr: string = "{";
            const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
            let i: number = 0;
            for(let index = 0; index < this.composite.length; index++) {
                let v = this.composite[index];
                {
                    if (0 === i++){
                        if (v.isLiteral())openBr = "[";
                        /* append */(sb => { sb.str += <any>openBr; return sb; })(ret);
                    } else /* append */(sb => { sb.str += <any>','; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>v.toString(); return sb; })(ret);
                }
            }
            if (openBr === ("{"))/* append */(sb => { sb.str += <any>"}"; return sb; })(ret); else /* append */(sb => { sb.str += <any>"]"; return sb; })(ret);
            return /* toString */ret.str;
        }
        throw Object.defineProperty(new Error("atomic == map == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        if (this.name == null)return this.valueString();
        if (this.isLiteral())return this.name;
        return this.name + "=" + this.valueString();
    }
}
NamedValue["__class"] = "oracle.dbtools.parser.json.NamedValue";



