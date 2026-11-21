/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Program } from '../../arbori/Program.js';
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { ParseNode } from '../ParseNode.js';
import { Parsed } from '../Parsed.js';
import { Token } from '../Token.js';
import { Service } from '../../../arbori/util/Service.js';

export class Variables {
    public queryEvents: boolean;

    program: Program;

    target: Parsed;

    public eval(target: Parsed): any {
        this.target = target;
        if (this.program == null){
            this.program = new Variables.Variables$0(this, target.getEarley(), this);
            const prg: string = Service.readFile$java_lang_Class$java_lang_String(Variables, "variables.arbori");
            this.program.compile$java_lang_String(prg);
        }
        this.variables = <any>({});
        this.program.eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, this);
        return this.variables;
    }

    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_Class$java_lang_String(Variables, "example.js");
        const target: Parsed = new Parsed(input, LexerToken.parse$java_lang_String$boolean$int(input, false, Lexer.JAVA_$LI$()), JavaScript.getInstance(), "top");
        const vars: Variables = new Variables();
        vars.eval(target);
        console.info(vars.variables);
        {
            let array = ["x", "y", "Service", "String_"];
            for(let index = 0; index < array.length; index++) {
                let s = array[index];
                console.info(s + "=" + vars.getType(s))
            }
        }
    }

    public getDefinition(__var: string): ParseNode {
        if (this.target == null)return null;
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.variables);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const name: string = /* get */this.target.getSrc()[key.from].content;
                    if (name === __var)return /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.variables, key);
                }
            }
        }
        return null;
    }

    public getType(__var: string): string {
        const tmp: ParseNode = this.getDefinition(__var);
        if (tmp == null)return null;
        let def: string = tmp.content$java_util_List(this.target.getSrc());
        const firstToken: string = /* get */this.target.getSrc()[tmp.from].content;
        if ("Java" === firstToken){
            const last1: LexerToken = /* get */this.target.getSrc()[tmp.to - 2];
            if (last1.type !== Token.QUOTED_STRING && last1.type !== Token.DQUOTED_STRING)return null;
            def = last1.content.substring(1, last1.content.length - 1);
            return def;
        }
        if ("java" === firstToken){
            return def;
        }
        if ("new" === firstToken){
            let args: ParseNode = null;
            {
                let array = tmp.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    if (child.contains$java_lang_String("arguments"))args = child;
                }
            }
            if (args == null)return null;
            const cls: string = this.target.getInput().substring(/* get */this.target.getSrc()[tmp.from + 1].begin, /* get */this.target.getSrc()[args.from].begin);
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cls, "java."))return cls;
            if (tmp.from + 2 === args.from)return this.getType(cls);
        }
        return this.returnCallType(tmp);
    }

    public returnCallType(def: ParseNode): string {
        let fname: ParseNode = null;
        let args: ParseNode = null;
        {
            let array = def.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                if (fname == null)fname = child; else if (args == null)args = child;
            }
        }
        if (fname == null || args == null)return null;
        {
            let array = fname.descendants();
            for(let index = 0; index < array.length; index++) {
                let p = array[index];
                if (p.from + 1 === p.to && !p.contains$java_lang_String("\'.\'") && !p.contains$java_lang_String("identifier"))return null;
            }
        }
        const firstToken: string = /* get */this.target.getSrc()[fname.from].content;
        const tmp: string = this.getType(firstToken);
        if (tmp != null){
            const methodName: string = /* get */this.target.getSrc()[fname.from + 2].content;
            try {
                const c: any = /* forName */eval(tmp.split('.').slice(-1)[0]);
                let methods: { owner: any, name: string, fn : Function }[] = /* getDeclaredMethods */(c => Object.getOwnPropertyNames(c.prototype).filter(n => typeof c.prototype[n] == 'function').map(n => ({owner:c,name:n,fn:c.prototype[n]}) ) )(c);
                for(let index = 0; index < methods.length; index++) {
                    let method = methods[index];
                    {
                        const candidate: string = /* getName */method.name;
                        if (candidate === methodName)return /* getName */(c => typeof c === 'string' ? c : c["__class"] ? c["__class"] : c["name"])(method.getReturnType());
                    }
                }
                methods = /* getMethods */(c => Object.getOwnPropertyNames(c.prototype).filter(n => typeof c.prototype[n] == 'function').map(n => ({owner:c,name:n,fn:c.prototype[n]}) ) )(c);
                for(let index = 0; index < methods.length; index++) {
                    let method = methods[index];
                    {
                        const candidate: string = /* getName */method.name;
                        if (candidate === methodName)return /* getName */(c => typeof c === 'string' ? c : c["__class"] ? c["__class"] : c["name"])(method.getReturnType());
                    }
                }
            } catch(e) {
                console.error(e.message, e);
                return null;
            }
        }
        return null;
    }

    public variablesStartingWith(prefix: string): Array<string> {
        const ret: Array<string> = <any>([]);
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.variables);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const name: string = /* get */this.target.getSrc()[key.from].content;
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(name, prefix))/* add */(ret.push(name)>0);
                }
            }
        }
        return ret;
    }

    public variables: any;

    constructor() {
        this.queryEvents = false;
        this.program = null;
        this.target = null;
        this.variables = <any>({});
    }
}
Variables["__class"] = "oracle.dbtools.parser.js.Variables";


export namespace Variables {

    export class Variables$0 extends Program {
        public __parent: any;
        constructor(__parent: any, __arg0: any, __arg1: any) {
            super(__arg0, __arg1);
            this.__parent = __parent;
        }
    }

}




import { JavaScript } from './JavaScript.js';
