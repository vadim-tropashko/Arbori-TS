/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerToken } from '../parser/LexerToken';
import { ParseNode } from '../parser/ParseNode';
import { Service } from '../../arbori/util/Service';
import { Attribute } from './Attribute';
import { Column, AncestorExpr } from './Attribute';

function attributeDefinitions(varDefs: any): string[] {
    return varDefs instanceof Map ? Array.from(varDefs.keys()) : Object.keys(varDefs ?? {});
}

function attributeDefinition(varDefs: any, name: string): Attribute | null {
    return varDefs instanceof Map ? varDefs.get(name) ?? null : varDefs?.[name] ?? null;
}

/**
 * View table as column store database
 * Evaluate all unary predicates first
 * IndependentAttribute is such an unary relation
 * @author Dim
 * @param {string} name
 * @class
 * @extends Attribute
 */
export class IndependentAttribute extends Attribute {
    content: MaterializedPredicate;

    /*private*/ cachedUnaryPredicate: Predicate;

    /*private*/ unaryFilterCache: any;

    public constructor(name: string) {
        super();
        if (this.content === undefined) { this.content = null; }
        this.cachedUnaryPredicate = null;
        this.unaryFilterCache = <any>({});
        this.failfastFilter = null;
        this.name = name;
    }

    public getContent(): MaterializedPredicate {
        return this.content;
    }

    /**
     * Initialize an "unary" relation (with independent attributes and all its dependences)
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {AttributeDefinitions} varDefs
     * @param {string} predVar
     */
    public initContent(root: ParseNode, src: Array<LexerToken>, varDefs: AttributeDefinitions, predVar: string) {
        const attributes: Array<string> = <any>([]);
        /* add */(attributes.push(this.name)>0);
        {
            let array = varDefs.keySet();
            for(let index = 0; index < array.length; index++) {
                let candidate = array[index];
                {
                    let attr: Attribute = varDefs.get(candidate);
                    if (attr == null)attr = null;
                    if (!/* contains */(attributes.indexOf(<any>(candidate)) >= 0) && attr.isDependent(this.name, varDefs)){
                        /* add */(attributes.push(candidate)>0);
                    }
                }
            }
        }
        const newContent: MaterializedPredicate = new MaterializedPredicate(attributes, src, null);
        const fullPredicate: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(varDefs.namedPredicates, predVar);
        if (this.cachedUnaryPredicate !== fullPredicate){
            /* clear */(obj => { for (let member in obj) delete obj[member]; })(this.unaryFilterCache);
            this.cachedUnaryPredicate = fullPredicate;
        }
        if (this.content == null){
            const seedAttributes: string[] = [this.name];
            const seedPositions: number[] = [this.resolveSeedPosition(this.name, newContent)];
            const seedValues: ParseNode[] = [null];
            for(let node: ParseNode = root; node != null; node = node.next()) {{
                seedValues[0] = node;
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(newContent.tuples, this.addTuples(root, src, varDefs, predVar, attributes, fullPredicate, seedAttributes, seedPositions, seedValues, 1, newContent));
            };}
        } else {
            let prefix: string = "";
            const pos: number = this.content.name.indexOf(Column.NAMEQUALSEP);
            if (0 < pos)prefix = this.content.name.substring(0, pos) + '.';
            const seedCount: number = /* size */(<number>this.content.attributes.length);
            const seedAttributes: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(seedCount);
            const seedPositions: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(seedCount);
            const seedValuePositions: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(seedCount);
            for(let i: number = 0; i < seedCount; i++) {{
                const attr: string = /* get */this.content.attributes[i];
                seedAttributes[i] = prefix + attr;
                seedPositions[i] = this.resolveSeedPosition(seedAttributes[i], newContent);
                const valuePos: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.content.attributePositions, attr);
                seedValuePositions[i] = valuePos == null ? -1 : valuePos;
            };}
            const seedValues: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(seedCount);
            for(let index = 0; index < this.content.tuples.length; index++) {
                let tuple = this.content.tuples[index];
                {
                    for(let i: number = 0; i < seedCount; i++) {{
                        const valuePos: number = seedValuePositions[i];
                        seedValues[i] = valuePos < 0 ? null : tuple.values[valuePos];
                    };}
                    /* addAll */((l1, l2) => l1.push.apply(l1, l2))(newContent.tuples, this.addTuples(root, src, varDefs, predVar, attributes, fullPredicate, seedAttributes, seedPositions, seedValues, seedCount, newContent));
                }
            }
        }
        newContent.tuples = this.filterClosestAncestorDescendants(varDefs, predVar, newContent.attributePositions, newContent.tuples, root, src);
        this.content = newContent;
    }

    addTuples(root: ParseNode, src: Array<LexerToken>, varDefs: AttributeDefinitions, predVar: string, attributes: Array<string>, fullPredicate: Predicate, seedAttributes: string[], seedPositions: number[], seedValues: ParseNode[], seedCount: number, newContent: MaterializedPredicate): Array<Tuple> {
        let candidates: Array<Tuple> = <any>([]);
        const t: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(newContent.arity());
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(candidates, new Tuple(t));
        for(let i: number = 0; i < seedCount; i++) {{
            const pos: number = seedPositions[i];
            if (pos < 0)continue;
            t[pos] = seedValues[i];
            if (!this.getUnaryFilter(fullPredicate, seedAttributes[i])['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](newContent.attributePositions, t, src, varDefs))return /* emptySet */[];
        };}
        for(let index = 0; index < attributes.length; index++) {
            let attr = attributes[index];
            {
                candidates = newContent.assignDependencyChain(attr, candidates, varDefs, root, src);
                if (/* size */(<number>candidates.length) === 0)return /* emptySet */[];
            }
        }
        return this.filterUnaryPredicates(varDefs, predVar, newContent.attributePositions, candidates, root, src);
    }

    resolveSeedPosition(attr: string, newContent: MaterializedPredicate): number {
        let pos: number = newContent.getAttribute$java_lang_String(attr);
        if (pos == null){
            const p: number = this.name.indexOf(Column.NAMEQUALSEP);
            if (0 < p){
                pos = newContent.getAttribute$java_lang_String(this.name.substring(0, p) + '.' + attr);
            }
        }
        return pos == null ? -1 : pos;
    }

    getUnaryFilter(fullPredicate: Predicate, attr: string): Predicate {
        const cached: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.unaryFilterCache, attr);
        if (cached != null)return cached;
        const filter: Predicate = Attribute.unaryFilter(fullPredicate, attr);
        /* put */(this.unaryFilterCache[attr] = filter);
        return filter;
    }

    getLimits(): number {
        return this.content.cardinality();
    }

    /*private*/ failfastFilter: Predicate;

    putFilter(filter: Predicate) {
        this.failfastFilter = filter;
    }

    public filterClosestAncestorDescendants(varDefs: any, predVar: string, attributePositions: any, candidates: Array<Tuple>, root: ParseNode, src: Array<LexerToken>): Array<Tuple> {
        if (/* size */(<number>candidates.length) < 2)return candidates;
        const ancestorDescendantPositions: Array<number> = <any>([]);
        {
            let array = attributeDefinitions(varDefs);
            for(let index = 0; index < array.length; index++) {
                let a = array[index];
                {
                    const attr: Attribute = attributeDefinition(varDefs, a);
                    if (!(attr != null && attr instanceof <any>AncestorExpr))continue;
                    const ancExpr: AncestorExpr = <AncestorExpr>attr;
                    if (ancExpr.type !== AncestorDescendantNodes.Type.CLOSEST)continue;
                    if (!attr.isDependent(this.name, varDefs))continue;
                    const iDesc: number = this.getAttrPos(attributePositions, ancExpr.def);
                    if (iDesc == null)continue;
                    const iAnc: number = this.getAttrPos(attributePositions, ancExpr.name);
                    if (iAnc == null)continue;
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ancestorDescendantPositions, Service.lPair(iAnc, iDesc));
                }
            }
        }
        candidates = this.filterNested(candidates, ancestorDescendantPositions);
        return candidates;
    }

    public getAttrPos(attributePositions: any, str: string): number {
        let ret: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, str);
        if (ret == null){
            const id: number = str.indexOf('.');
            if (0 < id)ret = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, str.substring(id + 1));
        }
        return ret;
    }

    filterNested1(candidates: Array<Tuple>, ancestorDescendantPositions: Array<number>): Array<Tuple> {
        if (/* size */(<number>ancestorDescendantPositions.length) === 0)return candidates;
        const __delete: Array<Tuple> = <any>([]);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                if (/* contains */(__delete.indexOf(<any>(t)) >= 0))continue;
                for(let index1 = 0; index1 < candidates.length; index1++) {
                    let cmp = candidates[index1];
                    {
                        if (t === cmp)continue;
                        if (/* contains */(__delete.indexOf(<any>(cmp)) >= 0))continue;
                        if (this.isRedundant(t, cmp, ancestorDescendantPositions))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, cmp);
                    }
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(candidates,__delete);
        return candidates;
    }

    isRedundant(t: Tuple, cmp: Tuple, ancestorDescendantPositions: Array<number>): boolean {
        let isWiderAnc: IndependentAttribute.CmpState = IndependentAttribute.CmpState.CONFORMAL;
        let isNarrowerDesc: IndependentAttribute.CmpState = IndependentAttribute.CmpState.CONFORMAL;
        for(let index = 0; index < ancestorDescendantPositions.length; index++) {
            let pair = ancestorDescendantPositions[index];
            {
                const iAnc: number = Service.lX(pair);
                const iDesc: number = Service.lY(pair);
                const cmpAnc: ParseNode = cmp.values[iAnc];
                const tAnc: ParseNode = t.values[iAnc];
                const cmpDesc: ParseNode = cmp.values[iDesc];
                const tDesc: ParseNode = t.values[iDesc];
                if (!(cmpAnc.from <= tAnc.from && tAnc.to <= cmpAnc.to))isWiderAnc = IndependentAttribute.CmpState.FALSE;
                if (isWiderAnc === IndependentAttribute.CmpState.CONFORMAL && (cmpAnc.from < tAnc.from && tAnc.to <= cmpAnc.to || cmpAnc.from <= tAnc.from && tAnc.to < cmpAnc.to))isWiderAnc = IndependentAttribute.CmpState.STRICT;
                if (!(tDesc.from <= cmpDesc.from && cmpDesc.to <= tDesc.to))isNarrowerDesc = IndependentAttribute.CmpState.FALSE;
                if (isNarrowerDesc === IndependentAttribute.CmpState.CONFORMAL && (tDesc.from < cmpDesc.from && cmpDesc.to <= tDesc.to || tDesc.from <= cmpDesc.from && cmpDesc.to < tDesc.to))isNarrowerDesc = IndependentAttribute.CmpState.STRICT;
            }
        }
        if (isWiderAnc === IndependentAttribute.CmpState.STRICT && isNarrowerDesc !== IndependentAttribute.CmpState.FALSE || isNarrowerDesc === IndependentAttribute.CmpState.STRICT && isWiderAnc !== IndependentAttribute.CmpState.FALSE)return true;
        return false;
    }

    filterNested(candidates: Array<Tuple>, ancestorDescendantPositions: Array<number>): Array<Tuple> {
        if (/* size */(<number>ancestorDescendantPositions.length) === 0)return candidates;
        const colNode2tuple: any = <any>({});
        for(let index = 0; index < ancestorDescendantPositions.length; index++) {
            let pair = ancestorDescendantPositions[index];
            {
                const iAnc: number = Service.lX(pair);
                let ancMap: any = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>colNode2tuple, iAnc);
                if (ancMap == null){
                    ancMap = <any>({});
                    /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>colNode2tuple, iAnc, ancMap);
                }
                const iDesc: number = Service.lY(pair);
                let descMap: any = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>colNode2tuple, iDesc);
                if (descMap == null){
                    descMap = <any>({});
                    /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>colNode2tuple, iDesc, descMap);
                }
                for(let index1 = 0; index1 < candidates.length; index1++) {
                    let t = candidates[index1];
                    {
                        const tAnc: ParseNode = t.values[iAnc];
                        let ancTuples: Array<Tuple> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>ancMap, Service.lPair(tAnc.from, tAnc.to));
                        if (ancTuples == null){
                            ancTuples = <any>([]);
                            /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>ancMap, Service.lPair(tAnc.from, tAnc.to), ancTuples);
                        }
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ancTuples, t);
                        const tDesc: ParseNode = t.values[iDesc];
                        let descTuples: Array<Tuple> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>descMap, Service.lPair(tDesc.from, tDesc.to));
                        if (descTuples == null){
                            descTuples = <any>([]);
                            /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>descMap, Service.lPair(tDesc.from, tDesc.to), descTuples);
                        }
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(descTuples, t);
                    }
                }
            }
        }
        const __delete: Array<Tuple> = <any>([]);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                for(let index1 = 0; index1 < ancestorDescendantPositions.length; index1++) {
                    let pair = ancestorDescendantPositions[index1];
                    {
                        const iAnc: number = Service.lX(pair);
                        const ancMap: any = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>colNode2tuple, iAnc);
                        const iDesc: number = Service.lY(pair);
                        const descMap: any = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>colNode2tuple, iDesc);
                        const tAnc: ParseNode = t.values[iAnc];
                        for(let node: ParseNode = tAnc.parent$(); node != null; node = node.parent$()) {{
                            const nestedAnc: Array<Tuple> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>ancMap, Service.lPair(node.from, node.to));
                            if (nestedAnc == null)continue;
                            for(let index2 = 0; index2 < nestedAnc.length; index2++) {
                                let tt = nestedAnc[index2];
                                if (this.isRedundant(t, tt, ancestorDescendantPositions))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, tt);
                            }
                        };}
                        const tDesc: ParseNode = t.values[iDesc];
                        for(let node: ParseNode = tDesc.parent$(); node != null; node = node.parent$()) {{
                            const nestedDesc: Array<Tuple> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>descMap, Service.lPair(node.from, node.to));
                            if (nestedDesc == null)continue;
                            for(let index2 = 0; index2 < nestedDesc.length; index2++) {
                                let tt = nestedDesc[index2];
                                if (this.isRedundant(tt, t, ancestorDescendantPositions))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, t);
                            }
                        };}
                    }
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(candidates,__delete);
        return candidates;
    }

    filterUnaryPredicates(varDefs: AttributeDefinitions, predVar: string, attributePositions: any, candidates: Array<Tuple>, root: ParseNode, src: Array<LexerToken>): Array<Tuple> {
        if (this.failfastFilter == null){
            const fullPredicate: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(varDefs.namedPredicates, predVar);
            this.failfastFilter = this.ubFilter(varDefs, fullPredicate, attributePositions);
        }
        const ret: Array<Tuple> = <any>([]);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                if (this.failfastFilter['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, t.values, src, varDefs))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, t);
            }
        }
        return ret;
    }

    /**
     * Unary predicate extract (for all attributes)
     * @param {*} varDefs
     * @param {*} fullPredicate
     * @return
     * @param {*} attributePositions
     * @return {*}
     * @private
     */
    ubFilter(varDefs: any, fullPredicate: Predicate, attributePositions: any): Predicate {
        const tmp: Array<Predicate> = <any>([]);
        {
            let array = attributeDefinitions(varDefs);
            for(let index = 0; index < array.length; index++) {
                let s = array[index];
                {
                    const attr: Attribute = attributeDefinition(varDefs, s);
                    if (attr.isDependent(this.name, varDefs))/* add */(tmp.push(Attribute.unaryFilter(fullPredicate, attr.name))>0);
                }
            }
        }
        {
            let array = /* keySet */Object.keys(attributePositions);
            for(let index = 0; index < array.length; index++) {
                let attr1 = array[index];
                {
                    let array1 = /* keySet */Object.keys(attributePositions);
                    for(let index1 = 0; index1 < array1.length; index1++) {
                        let attr2 = array1[index1];
                        /* add */(tmp.push(Attribute.binaryFilter(fullPredicate, attr1, attr2))>0)
                    }
                }
            }
        }
        let ret: Predicate = True.INSTANCE_$LI$();
        for(let index = 0; index < tmp.length; index++) {
            let extra = tmp[index];
            ret = this.appendProposition(extra, ret)
        }
        return ret;
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     * @param {ParseNode} root
     * @return {Tuple[]}
     */
    eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple> {
        throw Object.defineProperty(new Error("or should just return candidates?"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    /**
     * 
     * @param {*} varDefs
     * @return {Attribute}
     */
    referredTo(varDefs: any): Attribute {
        return null;
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {oracle.dbtools.parser.ParseNode[]} tuple
     * @param {*} varDefs
     * @return {ParseNode}
     */
    lookup(attributePositions: any, tuple: ParseNode[], varDefs: any): ParseNode {
        const pos: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.name);
        if (pos == null)throw Object.defineProperty(new Error("Missing column " + this.name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        return tuple[pos];
    }
}
IndependentAttribute["__class"] = "oracle.dbtools.arbori.IndependentAttribute";


export namespace IndependentAttribute {

    export enum CmpState {
        STRICT, CONFORMAL, FALSE
    }
}




import { True } from './Predicate';


import { AncestorDescendantNodes } from './AncestorDescendantNodes';


import { Tuple } from './Tuple';


import { AttributeDefinitions } from './AttributeDefinitions';


import { Predicate } from './Predicate';


import { MaterializedPredicate } from './MaterializedPredicate';

