/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Parser } from "./Parser.js";
import { RuleTuple } from "./RuleTuple.js";
import { SqlEarley } from './plsql/SqlEarley.js';
import { Service } from '../../arbori/util/Service.js';

/**
 * Grammar transformations, such as eliminating empty productions
 * @author Dim
 * @class
 */
export class RuleTransforms {
    public static readonly __class = "oracle.dbtools.parser.RuleTransforms";

    private static uniqueRules(rules: Array<RuleTuple>): Array<RuleTuple> {
        const ordered = [...rules].sort((a, b) => a.compareTo(b));
        return ordered.filter((rule, index) => index === 0 || rule.compareTo(ordered[index - 1]) !== 0);
    }
    /*private*/ static log(__delete: Array<RuleTuple>, add: Array<RuleTuple>) {
        let debug: boolean = true;
        debug = false;
        if (debug){
            console.info("---:");
            RuleTuple.printRules(__delete);
            console.info("+++:");
            RuleTuple.printRules(add);
            console.info();
        }
    }

    public static removeRules(head: string, src: Array<RuleTuple>) {
        const tmp: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < src.length; index++) {
            let candidate = src[index];
            if (head === candidate.head)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmp, candidate);
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(src,tmp);
    }

    public static substituteSingleBinaryProductions(src: Array<RuleTuple>) {
        while((true)) {{
            const __delete: Array<RuleTuple> = <any>([]);
            const add: Array<RuleTuple> = <any>([]);
            for(let index = 0; index < src.length; index++) {
                let c1 = src[index];
                {
                    if (!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(c1.head, ")") && !/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(c1.head, "#")){
                        continue;
                    }
                    if (/* contains */(c1.head.indexOf("___") != -1)){
                        continue;
                    }
                    if (c1.rhs.length !== 2)continue;
                    let ok: boolean = true;
                    for(let index1 = 0; index1 < src.length; index1++) {
                        let c2 = src[index1];
                        {
                            if ((c1.head === c2.head) && !c1.equals(c2)){
                                ok = false;
                                break;
                            }
                        }
                    }
                    if (ok){
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, c1);
                        console.info(">>> " + c1.toString());
                        for(let index1 = 0; index1 < src.length; index1++) {
                            let c2 = src[index1];
                            {
                                const tmp: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(c2.rhs.length * 2);
                                let pos: number = 0;
                                for(let i: number = 0; i < c2.rhs.length; i++) {{
                                    if (c2.rhs[i] === c1.head){
                                        tmp[pos++] = c1.rhs[0];
                                        tmp[pos++] = c1.rhs[1];
                                    } else {
                                        tmp[pos++] = c2.rhs[i];
                                    }
                                };}
                                if (pos === c2.rhs.length)continue;
                                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, c2);
                                const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(pos);
                                for(let i: number = 0; i < rhs.length; i++) {rhs[i] = tmp[i];}
                                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(c2.head, rhs));
                            }
                        }
                        break;
                    }
                }
            }
            if (/* size */(<number>__delete.length) === 0)break;
            RuleTransforms.log(__delete, add);
            /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(src,__delete);
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(src, add);
        }};
    }

    public static substituteSingleUnaryProductions(src: Array<RuleTuple>) {
        if (/* size */(<number>src.length) === 1)return;
        while((true)) {{
            const __delete: Array<RuleTuple> = <any>([]);
            const add: Array<RuleTuple> = <any>([]);
            for(let index = 0; index < src.length; index++) {
                let c1 = src[index];
                {
                    if ("javascript" === c1.head){
                        continue;
                    }
                    if ("javascript" === c1.head)console.info("######################## " + c1.toString());
                    if (c1.rhs.length !== 1)continue;
                    if (/* contains */(c1.head.indexOf("___") != -1)){
                        continue;
                    }
                    if (c1.rhs[0] === c1.head){
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, c1);
                        continue;
                    }
                    let ok: boolean = true;
                    for(let index1 = 0; index1 < src.length; index1++) {
                        let c2 = src[index1];
                        {
                            if ((c1.head === c2.head) && !c1.equals(c2)){
                                ok = false;
                                break;
                            }
                        }
                    }
                    if (ok){
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, c1);
                        console.info(">>> " + c1.toString());
                        for(let index1 = 0; index1 < src.length; index1++) {
                            let c2 = src[index1];
                            {
                                const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(c2.rhs.length);
                                ok = false;
                                for(let i: number = 0; i < c2.rhs.length; i++) {{
                                    if (c2.rhs[i] === c1.head){
                                        rhs[i] = c1.rhs[0];
                                        ok = true;
                                    } else rhs[i] = c2.rhs[i];
                                };}
                                if (ok){
                                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, c2);
                                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(c2.head, rhs));
                                }
                            }
                        }
                        break;
                    }
                }
            }
            if (/* size */(<number>__delete.length) === 0)break;
            RuleTransforms.log(__delete, add);
            /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(src,__delete);
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(src, add);
        }};
    }

    public static dubiousEmptyProductions: Array<string>; public static dubiousEmptyProductions_$LI$(): Array<string> { if (RuleTransforms.dubiousEmptyProductions == null) { RuleTransforms.dubiousEmptyProductions = <any>([]); }  return RuleTransforms.dubiousEmptyProductions; }

    public static eliminateEmptyProductions(src: Array<RuleTuple>) {
        // Java receives a TreeSet here. Preserve its value-based uniqueness and ordering.
        src.splice(0, src.length, ...RuleTransforms.uniqueRules(src));
        while((true)) {{
            const __delete: Array<RuleTuple> = <any>([]);
            const add: Array<RuleTuple> = <any>([]);
            let head: string = null;
            for(let index = 0; index < src.length; index++) {
                let c1 = src[index];
                {
                    if (head == null && c1.rhs.length === 0){
                        head = c1.head;
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, c1);
                        if (!/* contains */(head.indexOf("[") != -1))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(RuleTransforms.dubiousEmptyProductions_$LI$(), head);
                        break;
                    }
                }
            }
            if (head == null)break;
            let isSingular: boolean = true;
            for(let index = 0; index < src.length; index++) {
                let c1 = src[index];
                {
                    if (c1.rhs.length !== 0 && (head === c1.head)){
                        isSingular = false;
                        break;
                    }
                }
            }
            for(let index = 0; index < src.length; index++) {
                let c2 = src[index];
                {
                    let matched: number = 0;
                    for(let index1 = 0; index1 < c2.rhs.length; index1++) {
                        let rhs = c2.rhs[index1];
                        if (rhs === head){
                            matched++;
                        }
                    }
                    if (matched === 0)continue;
                    if (isSingular)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, c2);
                    if (matched > 2)throw Object.defineProperty(new Error("head = " + head + " matched " + c2.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    if (matched === 1){
                        const tmp: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(c2.rhs.length - 1);
                        for(let i: number = 0, j: number = 0; i < tmp.length; i++, j++) {{
                            if (c2.rhs[i] === head)j++;
                            tmp[i] = c2.rhs[j];
                        };}
                        if (c2.head === ("expr#"))console.info();
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(c2.head, tmp));
                    }
                    if (matched === 2){
                        const tmp11: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(c2.rhs.length - 2);
                        const tmp01: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(c2.rhs.length - 1);
                        const tmp10: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(c2.rhs.length - 1);
                        for(let i: number = 0, j: number = 0; i < tmp11.length; i++, j++) {{
                            if (c2.rhs[i] === head)j++;
                            tmp11[i] = c2.rhs[j];
                        };}
                        for(let i: number = 0, j: number = 0; i < tmp10.length; i++, j++) {{
                            if (i === j && (c2.rhs[i] === head))j++;
                            tmp10[i] = c2.rhs[j];
                        };}
                        let matchedOnce: boolean = false;
                        for(let i: number = 0, j: number = 0; i < tmp01.length; i++, j++) {{
                            if (!matchedOnce && (c2.rhs[i] === head))matchedOnce = true; else if (matchedOnce && (c2.rhs[i] === head))j++;
                            tmp01[i] = c2.rhs[j];
                        };}
                        if (c2.head === ("expr#"))console.info();
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(c2.head, tmp11));
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(c2.head, tmp01));
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(c2.head, tmp10));
                    }
                }
            }
            const uniqueAdd = RuleTransforms.uniqueRules(add);
            const uniqueDelete = RuleTransforms.uniqueRules(__delete);
            if (uniqueDelete.length === 0 && uniqueAdd.length === 0)break;
            RuleTransforms.log(uniqueDelete, uniqueAdd);
            let next = RuleTransforms.uniqueRules([...src, ...uniqueAdd]);
            next = next.filter(candidate => !uniqueDelete.some(deleted => candidate.compareTo(deleted) === 0));
            src.splice(0, src.length, ...next);
        }};
    }

    /**
     * [sort of] fix for dubiousEmptyProductions
     * @param {RuleTuple[]} src
     */
    public static injectMissingEmptyProductions(src: Array<RuleTuple>) {
        const heirs: Array<string> = <any>([]);
        for(let index = 0; index < RuleTransforms.dubiousEmptyProductions_$LI$().length; index++) {
            let s = RuleTransforms.dubiousEmptyProductions_$LI$()[index];
            {
                console.info("injecting " + s);
                const add: Array<RuleTuple> = <any>([]);
                for(let index1 = 0; index1 < src.length; index1++) {
                    let c2 = src[index1];
                    {
                        let matched: number = 0;
                        for(let index2 = 0; index2 < c2.rhs.length; index2++) {
                            let rhs = c2.rhs[index2];
                            if (rhs === s){
                                matched++;
                            }
                        }
                        if (matched === 0)continue;
                        if (matched > 1)throw Object.defineProperty(new Error("head = " + s + " matched " + c2.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                        if (c2.rhs.length === 1)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(heirs, c2.head);
                        const tmp: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(c2.rhs.length - 1);
                        for(let i: number = 0, j: number = 0; i < tmp.length; i++, j++) {{
                            if (c2.rhs[i] === s)j++;
                            tmp[i] = c2.rhs[j];
                        };}
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(c2.head, tmp));
                    }
                }
                console.info("++**++:");
                RuleTuple.printRules(add);
                console.info();
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(src, add);
            }
        }
        RuleTransforms.dubiousEmptyProductions = heirs;
    }

    public static printRulesHierachy(name: string, rules: Array<RuleTuple>) {
        console.info("-------------Rules Hierachy------------");
        const prefixEnd: number = name.indexOf('[');
        const subset: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[index];
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(rule.head, prefixEnd > 0 ? name.substring(0, prefixEnd) : name))/* add */(subset.push(rule)>0);
        }
        RuleTransforms.printRule(name, subset, 0);
        console.info("-------------------------------------");
    }

    /*private*/ static printRule(name: string, subset: Array<RuleTuple>, offset: number) {
        for(let index = 0; index < subset.length; index++) {
            let rule = subset[index];
            if (rule.head === name){
                Service.identln$int$java_lang_String(offset, rule.toString());
                for(let i: number = 0; i < rule.rhs.length; i++) {RuleTransforms.printRule(rule.rhs[i], subset, offset + 1);}
            }
        }
    }

    public static print(rules: Array<RuleTuple>) {
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                console.info(r.toString() + ";");
            }
        }
    }

    public static printSelectedRules(name: string, rules: Array<RuleTuple>) {
        console.info("-------------Rules---------------");
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[index];
            if (/* contains */(rule.toString().indexOf(name) != -1))console.info(rule.toString());
        }
        console.info("-------------------------------------");
    }

    public static isEmptyHead(head: string, output: Array<RuleTuple>): boolean {
        const ret: boolean = /* contains */(RuleTransforms.emptyClosure(output).indexOf(<any>(head)) >= 0);
        return ret;
    }

    /*private*/ static emptyClosure(output: Array<RuleTuple>): Array<string> {
        const ret: Array<string> = <any>([]);
        for(let index = 0; index < output.length; index++) {
            let t = output[index];
            {
                if (t.rhs.length === 0)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, t.head);
            }
        }
        while((true)) {{
            const increment: Array<string> = <any>([]);
            for(let index = 0; index < output.length; index++) {
                let t = output[index];
                {
                    let add: boolean = true;
                    for(let index1 = 0; index1 < t.rhs.length; index1++) {
                        let rhs = t.rhs[index1];
                        if (!/* contains */(ret.indexOf(<any>(rhs)) >= 0)){
                            add = false;
                            break;
                        }
                    }
                    if (add)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(increment, t.head);
                }
            }
            if (/* containsAll */((a, r) => { for(let i=0;i<r.length;i++) { if(a.indexOf(<any>r[i])<0) return false; } return true; } )(ret,increment))break;
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, increment);
        }};
        return ret;
    }

    /**
     * Substitutes each subarray rule[i].rhs[] in the matching input element rhs woth the rule[i].head
     * Example: inject( new RuleTuple[]{ new RuleTuple("CreateOrReplace", new String[]{"'CREATE'"}),
     * new RuleTuple("CreateOrReplace", new String[]{"'CREATE', "'OR'", "'REPLACE'"})
     * },
     * input )
     * @param rule
     * @param {RuleTuple[]} input
     * @param {oracle.dbtools.parser.RuleTuple[]} rules
     */
    public static inject(rules: RuleTuple[], input: Array<RuleTuple>) {
        const add: Array<RuleTuple> = <any>([]);
        const __delete: Array<RuleTuple> = <any>([]);
        OUTER: for(let index = 0; index < input.length; index++) {
            let r = input[index];
            {
                INNER: for(let index1 = 0; index1 < rules.length; index1++) {
                    let r1 = rules[index1];
                    {
                        if (r.rhs.length <= 0 + r1.rhs.length)continue;
                        for(let i: number = 0; i < r1.rhs.length; i++) {{
                            if (!(r.rhs[i] === (r1.rhs[i])))continue INNER;
                        };}
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, r);
                        const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(r.rhs.length - r1.rhs.length + 1);
                        rhs[0] = r1.head;
                        for(let i: number = 1; i < r.rhs.length - r1.rhs.length + 1; i++) {rhs[i] = r.rhs[i + r1.rhs.length - 1];}
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, new RuleTuple(r.head, rhs));
                        continue OUTER;
                    }
                }
            }
        }
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(input, r)
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(input, add);
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(input,__delete);
    }

    public static intervals2Numbers(ret: Array<RuleTuple>) {
        const renaming: any = <any>({});
        const separator: string = "___";
        for(let index = 0; index < ret.length; index++) {
            let r = ret[index];
            {
                const pos: number = r.head.lastIndexOf("[");
                if (pos < 0)continue;
                const end: number = r.head.lastIndexOf(")");
                if (end < 0)continue;
                if (/* containsKey */renaming.hasOwnProperty(r.head))continue;
                let prefix: string = r.head.substring(0, pos);
                let postfix: string = r.head.substring(end + 1);
                const iDQuote: number = r.head.lastIndexOf("\"");
                if (iDQuote + 1 === pos){
                    prefix = r.head.substring(0, pos - 1);
                    postfix += "\"";
                }
                const iP: number = r.head.lastIndexOf("#");
                if (iP + 1 === pos){
                    prefix = r.head.substring(0, pos - 1);
                    postfix += "#";
                }
                let cnt: number = 0;
                {
                    let array = /* keySet */Object.keys(renaming);
                    for(let index1 = 0; index1 < array.length; index1++) {
                        let key = array[index1];
                        {
                            const value: string = /* get */((m,k) => m[k]===undefined?null:m[k])(renaming, key);
                            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(value, prefix + separator) && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(value, postfix))cnt++;
                        }
                    }
                }
                /* put */(renaming[r.head] = prefix + separator + cnt + postfix);
            }
        }
        for(let index = 0; index < ret.length; index++) {
            let r = ret[index];
            {
                let array = /* keySet */Object.keys(renaming);
                for(let index1 = 0; index1 < array.length; index1++) {
                    let key = array[index1];
                    r.renameSymbols(key, /* get */((m,k) => m[k]===undefined?null:m[k])(renaming, key))
                }
            }
        }
    }

    public static topNbyProductionCounts(src: Parser.Tuple[], n: number): any {
        const tmp: any = <any>({});
        for(let index = 0; index < src.length; index++) {
            let r = src[index];
            {
                let cnt: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>tmp, r.head);
                if (cnt == null)cnt = 0;
                cnt++;
                /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>tmp, r.head, cnt);
            }
        }
        const topN: any = <any>({});
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>tmp);
            for(let index = 0; index < array.length; index++) {
                let h = array[index];
                {
                    if (/* size */((m) => { if(m.entries==null) m.entries=[]; return m.entries.length; })(<any>topN) < n){
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>topN, h, /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>tmp, h));
                        continue;
                    }
                    let __delete: number = null;
                    {
                        let array1 = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>topN);
                        for(let index1 = 0; index1 < array1.length; index1++) {
                            let cmp = array1[index1];
                            {
                                if (/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>tmp, cmp) < /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>tmp, h)){
                                    if (__delete != null){
                                        if (/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>tmp, cmp) < /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>tmp, __delete))__delete = cmp;
                                    } else __delete = cmp;
                                }
                            }
                        }
                    }
                    if (__delete != null){
                        /* remove */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries.splice(i,1)[0]; } })(<any>topN, __delete);
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>topN, h, /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>tmp, h));
                    }
                }
            }
        }
        return topN;
    }

}
