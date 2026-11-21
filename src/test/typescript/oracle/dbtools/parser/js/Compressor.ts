/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { RuleTuple } from '../RuleTuple';

export class Compressor {
    static simpleIter: string = "_List1";

    static commaIter: string = "_List2";

    public static main(args: string[]) {
        const rules: Array<RuleTuple> = Rules.read("src/oracle/dbtools/parser/js/rules/rules/semver.rules");
        Compressor.compress(rules);
        Rules.write(rules, "src/oracle/dbtools/parser/js/rules/compressed.rules");
    }

    public static compress(rules: Array<RuleTuple>) {
        Compressor.generalizeUnaryProductions(rules);
        while((Compressor.replaceRepetions(rules))) {{
            console.info(/* size */(<number>rules.length));
        }};
        while((Compressor.join(rules))) {{
            console.info(/* size */(<number>rules.length));
        }};
        Compressor.removeRedundancies(rules);
        const tmp: RuleTuple = new RuleTuple("Statement_List1", ["Statement_List1", "Statement_List1"]);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, tmp);
        while((RuleParser.inline$java_util_Set(rules))) {{
            console.info(/* size */(<number>rules.length));
        }};
        /* remove */(a => { let index = a.indexOf(tmp); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(rules);
        Compressor.deleteTrailingSemicolon(rules);
    }

    public static generalizeUnaryProductions(rules: Array<RuleTuple>) {
        const substitutions: any = Compressor.unarySubstitutions(rules);
        /* put */(substitutions["Literal"] = "Expression");
        /* put */(substitutions["Identifier"] = "Expression");
        /* remove */(map => { let deleted = substitutions["SequenceExpression"];delete substitutions["SequenceExpression"];return deleted;})(substitutions);
        const __delete: Array<RuleTuple> = <any>([]);
        const add: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(r.rhs.length);
                let cnt: number = 0;
                for(let i: number = 0; i < r.rhs.length; i++) {{
                    const substitute: string = /* get */((m,k) => m[k]===undefined?null:m[k])(substitutions, r.rhs[i]);
                    if (r.rhs.length === 1 && (r.head === substitute))break;
                    if (i === 0 && ((r.head === ("VariableDeclarator")) || (r.head === ("AssignmentExpression")) || (r.head === ("MethodDefinition")))){
                        rhs[i] = r.rhs[i];
                        continue;
                    }
                    if (i === 1 && (r.head === ("FunctionDeclaration"))){
                        rhs[i] = r.rhs[i];
                        continue;
                    }
                    if (i === 0 && (r.head === ("AssignmentExpression"))){
                        rhs[i] = r.rhs[i];
                        continue;
                    }
                    if (substitute != null && 3 < substitute.length){
                        cnt++;
                        rhs[i] = substitute;
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(substitute, [r.rhs[i]]));
                    } else {
                        rhs[i] = r.rhs[i];
                    }
                };}
                if (0 < cnt){
                    Compressor.addRule(__delete, r);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(r.head, rhs));
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(rules,__delete);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules, add);
    }

    /*private*/ static removeRedundancies(rules: Array<RuleTuple>) {
        const __delete: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                INNER: for(let index1 = 0; index1 < rules.length; index1++) {
                    let rr = rules[index1];
                    {
                        if (r === rr)continue;
                        if (!(r.head === rr.head))continue;
                        if (r.rhs.length !== rr.rhs.length)continue;
                        let diff: number = -1;
                        for(let i: number = 0; i < rr.rhs.length; i++) {{
                            if (!(r.rhs[i] === (rr.rhs[i]))){
                                if (-1 < diff)continue INNER;
                                diff = i;
                            }
                        };}
                        for(let index2 = 0; index2 < rules.length; index2++) {
                            let rrr = rules[index2];
                            {
                                if (!(rrr.head === (rr.rhs[diff])))continue;
                                if (rrr.rhs.length !== 1)continue;
                                if (!(rrr.rhs[0] === (r.rhs[diff])))continue;
                                Compressor.addRule(__delete, r);
                                break;
                            }
                        }
                    }
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(rules,__delete);
        console.info(">>>> deleted:");
        for(let index = 0; index < __delete.length; index++) {
            let r = __delete[index];
            console.info(r.toString())
        }
    }

    /**
     * Introduce iterative grammar symbols, e.g.
     * Statement_List1: Statement
     * Statement_List1: Statement_List1 Statement
     * @param {RuleTuple[]} rules
     * @return {boolean}
     * @private
     */
    /*private*/ static replaceRepetions(rules: Array<RuleTuple>): boolean {
        const __delete: Array<RuleTuple> = <any>([]);
        const add: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                let iterated: string = null;
                let from: number = -1;
                let to: number = -1;
                let separator: string = null;
                let iter: string = null;
                for(let i: number = 1; i < r.rhs.length; i++) {{
                    if (Compressor.matches(r.rhs, i, null)){
                        iterated = r.rhs[i];
                        if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(iterated, Compressor.simpleIter))continue;
                        if (Compressor.iterExists(iterated, rules))continue;
                        if (from === -1)from = i - 1;
                        if (0 < from)to = i + 1;
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(iterated + Compressor.simpleIter, [iterated]));
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(iterated + Compressor.simpleIter, [iterated + Compressor.simpleIter, iterated]));
                        iter = Compressor.simpleIter;
                    }
                    if (Compressor.matches(r.rhs, i, "\',\'")){
                        separator = "\',\'";
                        iterated = r.rhs[i];
                        if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(iterated, Compressor.commaIter))continue;
                        if (from === -1)from = i - 2;
                        if (0 <= from)to = i + 1;
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(iterated + Compressor.commaIter, [iterated]));
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(iterated + Compressor.commaIter, [iterated + Compressor.commaIter, separator, iterated]));
                        iter = Compressor.commaIter;
                    }
                    if (iterated != null && !(r.rhs[i] === separator) && !(r.rhs[i] === iterated))break;
                };}
                if (0 <= from && 0 <= to){
                    Compressor.addRule(__delete, r);
                    const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(r.rhs.length - to + from + 1);
                    for(let i: number = 0; i < from; i++) {{
                        rhs[i] = r.rhs[i];
                    };}
                    rhs[from] = iterated + iter;
                    for(let i: number = to; i < r.rhs.length; i++) {{
                        rhs[from + 1 + i - to] = r.rhs[i];
                    };}
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(r.head, rhs));
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(rules,__delete);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules, add);
        console.info(">>>> deleted:");
        for(let index = 0; index < __delete.length; index++) {
            let r = __delete[index];
            console.info(r.toString())
        }
        console.info(">>>> added:");
        for(let index = 0; index < add.length; index++) {
            let r = add[index];
            console.info(r.toString())
        }
        console.info();
        return 0 < /* size */(<number>__delete.length);
    }

    /*private*/ static iterExists(iter: string, rules: Array<RuleTuple>): boolean {
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            if (r.rhs.length === 1 && (r.rhs[0] === iter))for(let index1 = 0; index1 < rules.length; index1++) {
                let rr = rules[index1];
                if (rr.rhs.length === 2 && (rr.rhs[0] === r.head) && (rr.rhs[1] === iter))return true;
            }
        }
        return false;
    }

    /*private*/ static unarySubstitutions(rules: Array<RuleTuple>): any {
        const singleProductions: any = <any>({});
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                INNER: for(let index1 = 0; index1 < rules.length; index1++) {
                    let rr = rules[index1];
                    {
                        if (r === rr)continue;
                        if (!(r.head === rr.head))continue;
                        if (r.rhs.length < rr.rhs.length)continue;
                        let diff: number = -1;
                        for(let i: number = 1; i < rr.rhs.length; i++) {{
                            if (!(r.rhs[i] === (rr.rhs[i]))){
                                if (0 < diff)continue INNER;
                                diff = i;
                                if (1 < diff)break;
                            }
                        };}
                        if (0 <= diff){
                            const commonSuffix: string = Compressor.commonSuffix(r.rhs[diff], rr.rhs[diff]);
                            if (commonSuffix.length < 3 || (commonSuffix === (r.rhs[diff])))continue;
                            let rt: RuleTuple = new RuleTuple(commonSuffix, [r.rhs[diff]]);
                            let cnt: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>singleProductions, rt);
                            if (cnt == null)cnt = 0;
                            if (!(rt.head === (rt.rhs[0])))/* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>singleProductions, rt, cnt + 1);
                            rt = new RuleTuple(commonSuffix, [rr.rhs[diff]]);
                            cnt = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>singleProductions, rt);
                            if (cnt == null)cnt = 0;
                            if (!(rt.head === (rt.rhs[0])))/* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>singleProductions, rt, cnt + 1);
                        }
                    }
                }
            }
        }
        const chosenProductions: any = <any>({});
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>singleProductions);
            for(let index = 0; index < array.length; index++) {
                let rt = array[index];
                {
                    const symbol: string = /* get */((m,k) => m[k]===undefined?null:m[k])(chosenProductions, rt.rhs[0]);
                    if (symbol == null){
                        /* put */(chosenProductions[rt.rhs[0]] = rt.head);
                    } else {
                        const cnt: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>singleProductions, new RuleTuple(symbol, [rt.rhs[0]]));
                        if (cnt < /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>singleProductions, rt))/* put */(chosenProductions[rt.rhs[0]] = rt.head);
                    }
                }
            }
        }
        return chosenProductions;
    }

    /*private*/ static refactor(substitution: RuleTuple, input: RuleTuple): RuleTuple {
        if (substitution.rhs.length < 2)return null;
        if (input.rhs.length < substitution.rhs.length)return null;
        if (substitution === input)return null;
        OUTER: for(let i: number = 0; i < input.rhs.length - substitution.rhs.length; i++) {{
            for(let j: number = 0; j < substitution.rhs.length; j++) {{
                if (!(input.rhs[i + j] === (substitution.rhs[j])))continue OUTER;
            };}
            const ret: RuleTuple = new RuleTuple(input.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(input.rhs.length - substitution.rhs.length + 1));
            for(let j: number = 0; j < i; j++) {{
                ret.rhs[j] = input.rhs[j];
            };}
            ret.rhs[i] = substitution.head;
            for(let j: number = i + 1; j < input.rhs.length - substitution.rhs.length + 1; j++) {{
                ret.rhs[j] = input.rhs[j + substitution.rhs.length - 1];
            };}
            return ret;
        };}
        return null;
    }

    /*private*/ static inline(rules: Array<RuleTuple>): boolean {
        const __delete: Array<RuleTuple> = <any>([]);
        const add: Array<RuleTuple> = <any>([]);
        OUTER: for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                let array = Compressor.byLength(rules);
                for(let index1 = 0; index1 < array.length; index1++) {
                    let rr = array[index1];
                    {
                        const t: RuleTuple = Compressor.refactor(rr, r);
                        if (t == null)continue;
                        Compressor.addRule(__delete, r);
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, t);
                        continue OUTER;
                    }
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(rules,__delete);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules, add);
        return 0 < /* size */(<number>__delete.length);
    }

    /*private*/ static join(rules: Array<RuleTuple>): boolean {
        const __delete: Array<RuleTuple> = <any>([]);
        const add: Array<RuleTuple> = <any>([]);
        OUTER: for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            for(let i: number = 0; i < r.rhs.length - 1; i++) {{
                if ((r.rhs[i] === (r.rhs[i + 1])) && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(r.rhs[i], Compressor.simpleIter)){
                    Compressor.addRule(__delete, r);
                    const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(r.rhs.length - 1);
                    for(let j: number = 0; j <= i; j++) {{
                        rhs[j] = r.rhs[j];
                    };}
                    for(let j: number = i + 1; j < rhs.length; j++) {{
                        rhs[j] = r.rhs[j + 1];
                    };}
                    const a: RuleTuple = new RuleTuple(r.head, rhs);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, a);
                    continue OUTER;
                }
            };}
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(rules,__delete);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules, add);
        return 0 < /* size */(<number>__delete.length);
    }

    /*private*/ static deleteTrailingSemicolon(rules: Array<RuleTuple>): boolean {
        const __delete: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            if (1 < r.rhs.length && ("\';\'" === (r.rhs[r.rhs.length - 1])))INNER: for(let index1 = 0; index1 < rules.length; index1++) {
                let rr = rules[index1];
                {
                    if (rr.rhs.length + 1 !== r.rhs.length)continue;
                    if (!(rr.head === r.head))continue;
                    for(let i: number = 0; i < rr.rhs.length; i++) {{
                        if (!(rr.rhs[i] === (r.rhs[i])))continue INNER;
                    };}
                    Compressor.addRule(__delete, r);
                    break;
                }
            };
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(rules,__delete);
        return 0 < /* size */(<number>__delete.length);
    }

    static byLength(rules: Array<RuleTuple>): Array<RuleTuple> {
        const ret: Array<RuleTuple> = <any>([]);
        OUTER: for(let index = 0; index < rules.length; index++) {
            let rule = rules[index];
            {
                for(let j: number = 0; j < /* size */(<number>ret.length); j++) {{
                    if (/* get */ret[j].rhs.length <= rule.rhs.length){
                        /* add */ret.splice(j, 0, rule);
                        continue OUTER;
                    }
                };}
                /* add */(ret.push(rule)>0);
            }
        }
        return ret;
    }

    /*private*/ static commonSuffix(head1: string, head2: string): string {
        let ret: string = "";
        for(let i: number = head1.length - 1; 0 <= i; i--) {{
            const ii: number = i - head1.length + head2.length;
            if (ii < 0)break;
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(head1.charAt(i)) != (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(head2.charAt(ii)))break;
            ret = head1.charAt(i) + ret;
            if (/* isUpperCase */(s => s.toUpperCase() === s)(head1.charAt(i)))break;
        };}
        if (ret === Compressor.simpleIter.substring(1))return "";
        if (ret === Compressor.commaIter.substring(1))return "";
        return ret;
    }

    /*private*/ static matches(rhs: string[], i: number, separator: string): boolean {
        if (separator == null)return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(rhs[i].charAt(0)) != '\''.charCodeAt(0) && (rhs[i] === (rhs[i - 1]));
        if (i < 2)return false;
        if (!(separator === (rhs[i - 1])))return false;
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(rhs[i].charAt(0)) != '\''.charCodeAt(0) && (rhs[i] === (rhs[i - 2]));
    }

    /*private*/ static addRule(rules: Array<RuleTuple>, rule: RuleTuple) {
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, rule);
    }
}
Compressor["__class"] = "oracle.dbtools.parser.js.Compressor";




import { RuleParser } from './RuleParser';


import { Rules } from './Rules';


Compressor.main(null);
