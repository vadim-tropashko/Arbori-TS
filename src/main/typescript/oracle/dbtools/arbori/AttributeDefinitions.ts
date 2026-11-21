/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParseInt } from '../../arbori/util/ParseInt';
import { LexerToken } from '../parser/LexerToken';
import { Parsed } from '../parser/Parsed';
import { javaStringHashOrder } from './JavaCollections';

/**
 * Map of all attributes found in the named predicate definition
 * @author Dim
 * @param {string} evaluatedPredVar
 * @param {*} namedPredicates
 * @param {boolean} parentChild
 * @class
 * @extends *
 */
export class AttributeDefinitions extends Map<string, Attribute> {
    namedPredicates: any;

    /*private*/ independentAttributes: Array<string>;

    /*private*/ evaluatedPredVar: string;

    /*private*/ header: Array<string>;

    /*private*/ evaluatedPredicate: Predicate;

    public constructor(evaluatedPredVar: string, namedPredicates: any, parentChild: boolean) {
        super();
        if (this.namedPredicates === undefined) { this.namedPredicates = null; }
        if (this.independentAttributes === undefined) { this.independentAttributes = null; }
        if (this.evaluatedPredVar === undefined) { this.evaluatedPredVar = null; }
        if (this.header === undefined) { this.header = null; }
        if (this.evaluatedPredicate === undefined) { this.evaluatedPredicate = null; }
        this.namedPredicates = namedPredicates;
        this.independentAttributes = <any>([]);
        this.evaluatedPredVar = evaluatedPredVar;
        const allVariables: Array<string> = <any>([]);
        this.evaluatedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(namedPredicates, evaluatedPredVar);
        this.evaluatedPredicate.variables(allVariables, true);
        const javaVariables = javaStringHashOrder(allVariables);
        allVariables.splice(0, allVariables.length, ...javaVariables);
        const __delete: Array<string> = <any>([]);
        for(let index = 0; index < allVariables.length; index++) {
            let var1 = allVariables[index];
            {
                const prefix1: string = AttributeDefinitions.operPrefix(var1, '=');
                if (prefix1.length === var1.length)continue;
                const oper1: string = var1.substring(prefix1.length, prefix1.length + 1);
                if (!("=" === oper1))continue;
                for(let index1 = 0; index1 < allVariables.length; index1++) {
                    let var2 = allVariables[index1];
                    {
                        const prefix2: string = AttributeDefinitions.operPrefix(var2, '<');
                        if (!(prefix1 === prefix2))continue;
                        if (prefix2.length === var2.length)continue;
                        const oper2: string = var2.substring(prefix2.length, prefix2.length + 1);
                        if (!("<" === oper2))continue;
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, var2);
                    }
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(allVariables,__delete);
        const removal: Array<string> = <any>([]);
        for(let index = 0; index < allVariables.length; index++) {
            let s = allVariables[index];
            this.extractDependentAttributes(s, allVariables, removal, evaluatedPredVar, parentChild)
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(this.independentAttributes,removal);
        this.evaluatedPredicate.adjustIsFunFlag(this.independentAttributes);
    }

    public containsKey(name: string): boolean {
        return this.has(name);
    }

    public put(name: string, attribute: Attribute): Attribute {
        const previous = this.get(name);
        this.set(name, attribute);
        return previous;
    }

    public keySet(): Array<string> {
        return javaStringHashOrder(this.keys());
    }

    static operPrefix(__var: string, operation: string): string {
        const pos: number = __var.indexOf(operation);
        if (pos < 0)return __var;
        return __var.substring(0, pos);
    }

    /*private*/ extractDependentAttributes(name: string, allVariables: Array<string>, removal: Array<string>, evaluatedPredVar: string, parentChild: boolean) {
        if (this.containsKey(name))return;
        let ref: string = Attribute.referredTo(name);
        if (ref != null){
            if (0 < name.indexOf('<')){
                const pos: number = name.indexOf('<');
                const prefix: string = name.substring(0, pos);
                let postfix: string = name.substring(pos + 1);
                let type: AncestorDescendantNodes.Type = AncestorDescendantNodes.Type.CLOSEST;
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(postfix.charAt(0)) == '='.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(postfix.charAt(0)) == '<'.charCodeAt(0)){
                    postfix = postfix.substring(1);
                    type = AncestorDescendantNodes.Type.TRANSITIVE;
                }
                if (0 < prefix.indexOf('.') || 0 < prefix.indexOf('^') || 0 < prefix.indexOf('+') || 0 < prefix.indexOf('-')){
                    this.extractDependentAttributes(prefix, allVariables, removal, evaluatedPredVar, parentChild);
                    this.extractDependentAttributes(postfix, allVariables, removal, evaluatedPredVar, parentChild);
                    return;
                }
                const ee: AncestorExpr = new AncestorExpr(prefix, postfix, type, this.evaluatedPredicate);
                this.put(ee.name, ee);
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(removal, ee.name);
                this.extractDependentAttributes(ee.name, allVariables, removal, evaluatedPredVar, parentChild);
                return;
            } else if (0 < name.indexOf('=')){
                const pos: number = name.indexOf('=');
                const prefix: string = name.substring(0, pos);
                const postfix: string = name.substring(pos + 1);
                const prefSrc: Array<LexerToken> = LexerToken.parse$java_lang_String(prefix);
                const postSrc: Array<LexerToken> = LexerToken.parse$java_lang_String(postfix);
                if (1 < /* size */(<number>postSrc.length) && /* size */(<number>prefSrc.length) === 1){
                    let level: number = 0;
                    if ("^" === /* get */postSrc[1].content){
                        if (/* size */(<number>postSrc.length) === 2)level = 1; else if (/* size */(<number>postSrc.length) === 3 && ("^" === /* get */postSrc[2].content))level = 2;
                    }
                    if (0 < level && parentChild){
                        const postfixVar: string = /* get */postSrc[0].content;
                        const ee: ChildExpr = new ChildExpr(postfixVar, prefix, level, this.evaluatedPredicate);
                        this.put(postfixVar, ee);
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(removal, postfixVar);
                        this.extractDependentAttributes(postfixVar, allVariables, removal, evaluatedPredVar, parentChild);
                        return;
                    }
                }
                let prefRef: string = Attribute.referredTo(prefix);
                const postRef: string = Attribute.referredTo(postfix);
                if (null == prefRef && null == postRef){
                    let prefCnt: number = 0;
                    let postCnt: number = 0;
                    for(let index = 0; index < allVariables.length; index++) {
                        let s = allVariables[index];
                        {
                            for (const token of s.split(/[=^<>\[)?]/).filter(Boolean)) {
                                if (prefix === token)prefCnt++;
                                if (postfix === token)postCnt++;
                            }
                        }
                    }
                    if (postCnt < prefCnt)prefRef = "not null";
                }
                if (null == prefRef){
                    const ee: EqualExpr = new EqualExpr(prefix, postfix);
                    this.put(ee.name, ee);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(removal, ee.name);
                    ref = postfix;
                } else if (null == postRef){
                    const ee: EqualExpr = new EqualExpr(postfix, prefix);
                    this.put(ee.name, ee);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(removal, ee.name);
                    ref = prefix;
                } else {
                    this.extractDependentAttributes(prefix, allVariables, removal, evaluatedPredVar, parentChild);
                    this.extractDependentAttributes(postfix, allVariables, removal, evaluatedPredVar, parentChild);
                    return;
                }
            } else if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(name, "^"))this.put(name, new Parent(name)); else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(name.charAt(ref.length)) == '-'.charCodeAt(0)){
                const suffix: string = name.substring(ref.length);
                /* orElseThrow */((v, getError) => { if (v == null) throw getError(); return v; })(ParseInt.whenInt(suffix, (n) => this.put(name, new Sibling(name, n))),() => Object.defineProperty(new Error("Cant parse number in " + name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] }));
            } else if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(name.charAt(ref.length)) == '+'.charCodeAt(0)){
                const suffix: string = name.substring(ref.length);
                /* orElseThrow */((v, getError) => { if (v == null) throw getError(); return v; })(ParseInt.whenInt(suffix, (n) => this.put(name, new Sibling(name, n))),() => Object.defineProperty(new Error("Cant parse number in " + name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] }));
            } else if (0 < name.indexOf('.')){
                const pred: string = name.substring(0, name.indexOf('.'));
                const refPred: MaterializedPredicate = <MaterializedPredicate><any>/* get */((m,k) => m[k]===undefined?null:m[k])(this.namedPredicates, pred);
                if (refPred == null)throw Object.defineProperty(new Error("Undefined predicate " + pred), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                const postfix: string = name.substring(pred.length + 1);
                if (refPred.getAttribute$java_lang_String(postfix) == null)throw Object.defineProperty(new Error("Undefined variable " + postfix + " in " + pred), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                const col: Column = new Column(name, evaluatedPredVar);
                this.put(name, col);
                if (!/* contains */(allVariables.indexOf(<any>(col.rel)) >= 0)){
                    const ia: IndependentAttribute = new IndependentAttribute(col.rel);
                    ia.content = new MaterializedPredicate(col.rel, refPred);
                    this.put(col.rel, ia);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this.independentAttributes, col.rel);
                }
                ref = null;
            } else throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            if (ref != null)this.extractDependentAttributes(ref, allVariables, removal, evaluatedPredVar, parentChild);
        } else {
            this.put(name, new IndependentAttribute(name));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this.independentAttributes, name);
            const pred: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.namedPredicates, name);
            if (pred != null){
                if (!(pred != null && pred instanceof <any>MaterializedPredicate))throw Object.defineProperty(new Error(" !(" + name + " instanceof MaterializedPredicate)"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                throw Object.defineProperty(new Error("Fix TODO"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
        }
    }

    public evalDimensions(target: Parsed, emptyContent: boolean) {
        if (Program.debug)console.info(this.evaluatedPredicate.toString());
        const signature: Array<string> = <any>([]);
        this.evaluatedPredicate.signature(signature);
        this.header = <any>([]);
        {
            let array = this.keySet();
            for(let index = 0; index < array.length; index++) {
                let candidateAttr = array[index];
                if (/* contains */(signature.indexOf(<any>(candidateAttr)) >= 0))/* add */(this.header.push(candidateAttr)>0);
            }
        }
        for(let index = 0; index < this.independentAttributes.length; index++) {
            let __var = this.independentAttributes[index];
            {
                const varDef: IndependentAttribute = <IndependentAttribute>this.get(__var);
                if (!emptyContent){
                    if (/* size */(<number>this.independentAttributes.length) === 1)varDef.putFilter(this.evaluatedPredicate);
                    varDef.initContent(target.getRoot(), target.getSrc(), this, this.evaluatedPredVar);
                }
            }
        }
    }

    public listDimensions(): Array<string> {
        return javaStringHashOrder(this.independentAttributes);
    }

    public getDimensionContent(name: string): MaterializedPredicate {
        const ret: Attribute = this.get(name);
        return (<IndependentAttribute>ret).getContent();
    }

    public getHeader(): Array<string> {
        return this.header;
    }

    /**
     * Ad-hock greedy optimization
     * @param {number} joinedCardinality
     * @return {string} null if no suitable attribute to join found (e.g. the predicate may have disjunction in it, etc)
     * @param {string[]} joined
     */
    minimalRelatedDimension(joined: Array<string>, joinedCardinality: number): string {
        let ret: string = null;
        let isEmpty: boolean = false;
        for(let index = 0; index < this.independentAttributes.length; index++) {
            let current = this.independentAttributes[index];
            {
                if (this.getDimensionContent(current).cardinality() === 0)isEmpty = true;
                if (/* contains */(joined.indexOf(<any>(current)) >= 0))continue;
                if (!this.isConnected(joined, current) && !isEmpty && 1 < joinedCardinality)continue;
                if (ret == null || this.getDimensionContent(current).cardinality() < this.getDimensionContent(ret).cardinality())ret = current;
            }
        }
        return ret;
    }

    /*private*/ isConnected(joined: Array<string>, current: string): boolean {
        const p: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.namedPredicates, this.evaluatedPredVar);
        for(let index = 0; index < joined.length; index++) {
            let j = joined[index];
            {
                if (this.isRelated(current, j, p))return true;
            }
        }
        return false;
    }

    /*private*/ isRelated(s1: string, s2: string, p: Predicate): boolean {
        {
            let array = this.functions(s1);
            for(let index = 0; index < array.length; index++) {
                let d1 = array[index];
                {
                    let array1 = this.functions(s2);
                    for(let index1 = 0; index1 < array1.length; index1++) {
                        let d2 = array1[index1];
                        if (p.isRelated(d1, d2, this) != null)return true;
                    }
                }
            }
        }
        return false;
    }

    /*private*/ functions(s: string): Array<string> {
        const ret: Array<string> = <any>([]);
        {
            let array = this.keySet();
            for(let index = 0; index < array.length; index++) {
                let vd = array[index];
                if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(vd, s))/* add */(ret.push(vd)>0);
            }
        }
        return ret;
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        const ret: { str: string, toString: Function } = { str: super.toString(), toString: function() { return this.str; } };
        /* append */(sb => { sb.str += <any>"\nindependentAttributes = " + /* toString */('['+this.independentAttributes.join(', ')+']'); return sb; })(ret);
        /* append */(sb => { sb.str += <any>"\nevaluatedPredVar = " + this.evaluatedPredVar; return sb; })(ret);
        /* append */(sb => { sb.str += <any>"\nheader = " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(this.header); return sb; })(ret);
        return /* toString */ret.str;
    }

    public static main(args: string[]) {
        const p1: Predicate = new AncestorDescendantNodes("a.b", "c", AncestorDescendantNodes.Type.TRANSITIVE);
        const ret: Array<string> = <any>([]);
        p1.signature(ret);
        console.info(ret);
    }
}
AttributeDefinitions["__class"] = "oracle.dbtools.arbori.AttributeDefinitions";




import { Program } from './Program';


import { IndependentAttribute } from './IndependentAttribute';


import { Column, Sibling, Parent, EqualExpr, ChildExpr, AncestorExpr } from './Attribute';


import { MaterializedPredicate } from './MaterializedPredicate';


import { AncestorDescendantNodes } from './AncestorDescendantNodes';


import { Predicate } from './Predicate';


import { Attribute } from './Attribute';


