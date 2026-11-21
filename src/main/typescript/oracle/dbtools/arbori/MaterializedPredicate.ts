/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerToken } from '../parser/LexerToken';
import { ParseNode } from '../parser/ParseNode';
import { Parsed } from '../parser/Parsed';
import { SqlEarley } from '../parser/plsql/SqlEarley';
import { Service } from '../../arbori/util/Service';
import { javaStringHashOrder } from './JavaCollections';

function attributeDefinition(varDefs: any, name: string): Attribute | null {
    return varDefs instanceof Map ? varDefs.get(name) ?? null : varDefs?.[name] ?? null;
}

function attributeDefinitionNames(varDefs: any): string[] {
    return varDefs instanceof Map ? javaStringHashOrder(varDefs.keys()) : javaStringHashOrder(Object.keys(varDefs ?? {}));
}

/**
 * Arbori program consists of symbolic predicates, which are evaluated (materialized) into multivariate relations
 * (AKA tables in SQL world). MaterializedPredicates can be joined, projected, filtered and so on.
 * 
 * @author Dim
 * @param {string[]} attributes
 * @param {LexerToken[]} src
 * @param {string} name
 * @class
 */
export class MaterializedPredicate implements Predicate {
    attributePositions: any;

    attributes: Array<string>;

    tuples: Array<Tuple>;

    src: Array<LexerToken>;

    program: Program;

    name: string;

    public constructor(attributes?: any, src?: any, name?: any) {
        if (((attributes != null && (attributes instanceof Array)) || attributes === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof name === 'string') || name === null)) {
            let __args = arguments;
            if (this.attributes === undefined) { this.attributes = null; } 
            if (this.src === undefined) { this.src = null; } 
            this.attributePositions = <any>({});
            this.tuples = <any>([]);
            this.program = null;
            this.name = null;
            this.name = name;
            this.attributes = attributes;
            for(let i: number = 0; i < /* size */(<number>attributes.length); i++) {/* put */(this.attributePositions[/* get */attributes[i]] = i);}
            this.src = src;
        } else if (((typeof attributes === 'string') || attributes === null) && ((src != null && src instanceof <any>MaterializedPredicate) || src === null) && name === undefined) {
            let __args = arguments;
            let name: any = __args[0];
            if (this.attributes === undefined) { this.attributes = null; } 
            if (this.src === undefined) { this.src = null; } 
            this.attributePositions = <any>({});
            this.tuples = <any>([]);
            this.program = null;
            this.name = null;
            this.name = name;
            this.attributes = src.attributes;
            this.attributePositions = src.attributePositions;
            this.tuples = src.tuples;
            this.src = src.src;
            this.program = src.program;
        } else throw new Error('invalid overload');
    }

    public getTuples(): Array<Tuple> {
        return this.tuples;
    }

    public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
        throw Object.defineProperty(new Error("N/A"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    /**
     * Tuple evaluation: not well defined
     * @param {*} attributePositions
     * @param {oracle.dbtools.parser.ParseNode[]} tuple
     * @param {LexerToken[]} src
     * @param {*} varDefs
     * @return {boolean}
     */
    public eval(attributePositions?: any, tuple?: any, src?: any, varDefs?: any): any {
        if (((attributePositions != null && (attributePositions instanceof Object)) || attributePositions === null) && ((tuple != null && tuple instanceof <any>Array && (tuple.length == 0 || tuple[0] == null ||(tuple[0] != null && tuple[0] instanceof <any>ParseNode))) || tuple === null) && ((src != null && (src instanceof Array)) || src === null) && ((varDefs != null && (varDefs instanceof Object)) || varDefs === null)) {
            return <any>this.eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions, tuple, src, varDefs);
        } else if (((attributePositions != null && attributePositions instanceof <any>Parsed) || attributePositions === null) && tuple === undefined && src === undefined && varDefs === undefined) {
            return <any>this.eval$oracle_dbtools_parser_Parsed(attributePositions);
        } else throw new Error('invalid overload');
    }

    /**
     * Variables for [symbolic] predicate evaluation are not needed if predicate is materialized already
     * @param {string[]} ret
     * @param {boolean} optimizeEqs
     */
    public variables(ret: Array<string>, optimizeEqs: boolean) {
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, this.attributes);
    }

    /**
     * 
     * @param {string[]} ret
     */
    public signature(ret: Array<string>) {
        this.variables(ret, false);
    }

    /**
     * This method is for symbolic predicates only
     * @param {string} var1
     * @param {string} var2
     * @param {*} varDefs
     * @return {*}
     */
    public isRelated(var1: string, var2: string, varDefs: any): Predicate {
        throw Object.defineProperty(new Error("N/A"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public add(vector: any) {
        const tuple: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>this.attributes.length));
        for(let i: number = 0; i < tuple.length; i++) {{
            tuple[i] = /* get */((m,k) => m[k]===undefined?null:m[k])(vector, /* get */this.attributes[i]);
        };}
        this.addContent(tuple);
    }

    public addContent(tuple: ParseNode[]) {
        if (this.program != null && this.program.stop)throw Object.defineProperty(new Error("Arbori program stop requested"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        const candidate = new Tuple(tuple);
        let low = 0;
        let high = this.tuples.length;
        while (low < high) {
            const middle = (low + high) >>> 1;
            if (this.tuples[middle].compareTo(candidate) < 0) low = middle + 1;
            else high = middle;
        }
        if (low < this.tuples.length && this.tuples[low].compareTo(candidate) === 0) return;
        this.tuples.splice(low, 0, candidate);
    }

    public getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(tuple: Tuple, attribute: string): ParseNode {
        const attrPos: number = this.getAttribute$java_lang_String(attribute);
        if (attrPos == null)throw Object.defineProperty(new Error("Missing " + this.name + "." + attribute), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        return tuple.values[attrPos];
    }

    /**
     * Get value of a cell in the content table
     * @param tupleNum
     * @param {string} attribute
     * @return
     * @param {Tuple} tuple
     * @return {ParseNode}
     */
    public getAttribute(tuple?: any, attribute?: any): any {
        if (((tuple != null && tuple instanceof <any>Tuple) || tuple === null) && ((typeof attribute === 'string') || attribute === null)) {
            return <any>this.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(tuple, attribute);
        } else if (((typeof tuple === 'string') || tuple === null) && attribute === undefined) {
            return <any>this.getAttribute$java_lang_String(tuple);
        } else if (((typeof tuple === 'number') || tuple === null) && attribute === undefined) {
            return <any>this.getAttribute$int(tuple);
        } else throw new Error('invalid overload');
    }

    public getAttribute$int(colPos: number): string {
        return /* get */this.attributes[colPos];
    }

    public getAttribute$java_lang_String(colName: string): number {
        let ret: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.attributePositions, colName);
        if (ret != null)return ret;
        if (this.name != null && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(colName, this.name))ret = /* get */((m,k) => m[k]===undefined?null:m[k])(this.attributePositions, colName.substring(this.name.length + 1));
        return ret;
    }

    public arity(): number {
        return /* size */(<number>this.attributes.length);
    }

    public cardinality(): number {
        return /* size */(<number>this.tuples.length);
    }

    public toString$(): string {
        return this.toString$int(0);
    }

    public toString$int(ident: number): string {
        let ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        if (this.name != null)ret = { str: this.name + "=", toString: function() { return this.str; } };
        /* append */(sb => { sb.str += <any>"["; return sb; })(ret);
        for(let i: number = 0; i < /* size */(<number>this.attributes.length); i++) {/* append */(sb => { sb.str += <any>(i > 0 ? "         " : "") + /* get */this.attributes[i]; return sb; })(ret);}
        /* append */(sb => { sb.str += <any>"]\n"; return sb; })(ret);
        for(let index = 0; index < this.tuples.length; index++) {
            let t = this.tuples[index];
            {
                let firstTuple: boolean = true;
                for(let i: number = 0; i < /* size */(<number>this.attributes.length); i++) {{
                    let value: string = "N/A (null)";
                    const node: ParseNode = t.values[i];
                    if (node != null)value = "[" + t.values[i].from + "," + t.values[i].to + ")";
                    /* append */(sb => { sb.str += <any>(firstTuple ? Service.identln$int$java_lang_String(ident, " ") : "  "); return sb; })(ret);
                    /* append */(sb => { sb.str += <any>value; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>" "; return sb; })(ret);
                    if (node != null)/* append */(sb => { sb.str += <any>MaterializedPredicate.mnemonics(node.from, node.to, this.src); return sb; })(ret);
                    firstTuple = false;
                };}
                /* append */(sb => { sb.str += <any>"\n"; return sb; })(ret);
            }
        }
        return /* toString */ret.str;
    }

    public toString(ident?: any): string {
        if (((typeof ident === 'number') || ident === null)) {
            return <any>this.toString$int(ident);
        } else if (ident === undefined) {
            return <any>this.toString$();
        } else throw new Error('invalid overload');
    }

    public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
        return this;
    }

    public static union(x: MaterializedPredicate, y: MaterializedPredicate): MaterializedPredicate {
        const header: Array<string> = <any>([]);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(header, x.attributes);
        /* retainAll */((a, r) => { let b=false; for(let i=0;i<a.length;i++) { let ndx=r.indexOf(a[i]); if(ndx<0) { a.splice(i, 1); i--; b=true; } } return b; })(header,y.attributes);
        const ret: MaterializedPredicate = new MaterializedPredicate(header, x.src, null);
        ret.program = x.program;
        for(let index = 0; index < x.tuples.length; index++) {
            let tupleX = x.tuples[index];
            {
                const retTuple: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>header.length));
                for(let index1 = 0; index1 < ret.attributes.length; index1++) {
                    let attr = ret.attributes[index1];
                    {
                        retTuple[/* get */((m,k) => m[k]===undefined?null:m[k])(ret.attributePositions, attr)] = tupleX.values[/* get */((m,k) => m[k]===undefined?null:m[k])(x.attributePositions, attr)];
                    }
                }
                ret.addContent(retTuple);
            }
        }
        for(let index = 0; index < y.tuples.length; index++) {
            let tupleY = y.tuples[index];
            {
                const retTuple: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>header.length));
                for(let index1 = 0; index1 < ret.attributes.length; index1++) {
                    let attr = ret.attributes[index1];
                    {
                        retTuple[/* get */((m,k) => m[k]===undefined?null:m[k])(ret.attributePositions, attr)] = tupleY.values[/* get */((m,k) => m[k]===undefined?null:m[k])(y.attributePositions, attr)];
                    }
                }
                ret.addContent(retTuple);
            }
        }
        return ret;
    }

    public static join(x: MaterializedPredicate, y: MaterializedPredicate): MaterializedPredicate {
        const header: Array<string> = <any>([]);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(header, x.attributes);
        for(let index = 0; index < y.attributes.length; index++) {
            let s = y.attributes[index];
            if (!/* contains */(x.attributes.indexOf(<any>(s)) >= 0))/* add */(header.push(s)>0);
        }
        const ret: MaterializedPredicate = new MaterializedPredicate(header, x.src, null);
        ret.program = x.program;
        for(let index = 0; index < x.tuples.length; index++) {
            let tupleX = x.tuples[index];
            for(let index1 = 0; index1 < y.tuples.length; index1++) {
                let tupleY = y.tuples[index1];
                {
                    let retTuple: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>header.length));
                    for(let index2 = 0; index2 < ret.attributes.length; index2++) {
                        let attr = ret.attributes[index2];
                        {
                            const iX: number = /* get */((m,k) => m[k]===undefined?null:m[k])(x.attributePositions, attr);
                            const xAttr: number = iX;
                            const iY: number = /* get */((m,k) => m[k]===undefined?null:m[k])(y.attributePositions, attr);
                            const yAttr: number = iY;
                            const iRet: number = /* get */((m,k) => m[k]===undefined?null:m[k])(ret.attributePositions, attr);
                            if (xAttr == null)retTuple[iRet] = tupleY.values[iY]; else if (yAttr == null)retTuple[iRet] = tupleX.values[iX]; else {
                                if (tupleY.values[iY].from !== tupleX.values[iX].from || tupleY.values[iY].to !== tupleX.values[iX].to){
                                    retTuple = null;
                                    break;
                                } else retTuple[iRet] = tupleX.values[iX];
                            }
                        }
                    }
                    if (retTuple != null)ret.addContent(retTuple);
                }
            }
        }
        return ret;
    }

    public static difference(x: MaterializedPredicate, y: MaterializedPredicate): MaterializedPredicate {
        const header: Array<string> = <any>([]);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(header, x.attributes);
        const ret: MaterializedPredicate = new MaterializedPredicate(header, x.src, null);
        ret.program = x.program;
        for(let index = 0; index < x.tuples.length; index++) {
            let tupleX = x.tuples[index];
            {
                let foundMatch: boolean = false;
                for(let index1 = 0; index1 < y.tuples.length; index1++) {
                    let tupleY = y.tuples[index1];
                    {
                        let tuplesMatch: boolean = true;
                        for(let index2 = 0; index2 < y.attributes.length; index2++) {
                            let attr = y.attributes[index2];
                            {
                                const iY: number = /* get */((m,k) => m[k]===undefined?null:m[k])(y.attributePositions, attr);
                                const iX: number = /* get */((m,k) => m[k]===undefined?null:m[k])(x.attributePositions, attr);
                                if (iX == null)continue;
                                if (tupleY.values[iY].from !== tupleX.values[iX].from || tupleY.values[iY].to !== tupleX.values[iX].to){
                                    tuplesMatch = false;
                                    break;
                                }
                            }
                        }
                        if (tuplesMatch){
                            foundMatch = true;
                            break;
                        }
                    }
                }
                if (!foundMatch)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret.tuples, tupleX);
            }
        }
        return ret;
    }

    /**
     * After materialized predicate evaluation trim attributes
     * Bail out if there is name conflict
     * TODO: leave prefix but wrap name in double quotes?
     */
    public trimAttributes() {
        const trimmedAttributePositions: any = <any>({});
        const trimmedAttributes: Array<string> = <any>([]);
        for(let i: number = 0; i < /* size */(<number>this.attributes.length); i++) {{
            let attribute: string = /* get */this.attributes[i];
            {
                const pos: number = attribute.lastIndexOf('.');
                if (0 < pos)attribute = attribute.substring(pos + 1);
                if (/* containsKey */trimmedAttributePositions.hasOwnProperty(attribute))if (0 < pos)return;
            };
            /* put */(trimmedAttributePositions[attribute] = i);
            /* add */(trimmedAttributes.push(attribute)>0);
        };}
        this.attributePositions = trimmedAttributePositions;
        this.attributes = trimmedAttributes;
    }

    /**
     * Applies join filter
     * @param {MaterializedPredicate} x
     * @param {MaterializedPredicate} y
     * @param {*} filter
     * @param {*} varDefs
     * @param {ParseNode} root
     * @return
     * @param {LexerToken[]} src
     * @return {MaterializedPredicate}
     */
    public static filteredCartesianProduct(x: MaterializedPredicate, y: MaterializedPredicate, filter: Predicate, varDefs: any, root: ParseNode, src: Array<LexerToken>): MaterializedPredicate {
        const allVariables: Array<string> = <any>([]);
        {
            let array = attributeDefinitionNames(varDefs);
            for(let index = 0; index < array.length; index++) {
                let z = array[index];
                {
                    const attr: Attribute = attributeDefinition(varDefs, z);
                    for(let index1 = 0; index1 < x.attributes.length; index1++) {
                        let s = x.attributes[index1];
                        {
                            if (x.name != null && s.indexOf('.') < 0)s = x.name + '.' + s;
                            if (attr.isDependent(s, varDefs)){
                                /* add */(allVariables.push(z)>0);
                                break;
                            }
                        }
                    }
                }
            }
        }
        {
            let array = attributeDefinitionNames(varDefs);
            for(let index = 0; index < array.length; index++) {
                let z = array[index];
                {
                    if (/* contains */(allVariables.indexOf(<any>(z)) >= 0))continue;
                    const attr: Attribute = attributeDefinition(varDefs, z);
                    for(let index1 = 0; index1 < y.attributes.length; index1++) {
                        let s = y.attributes[index1];
                        {
                            if (y.name != null && s.indexOf('.') < 0)s = y.name + '.' + s;
                            if (attr.isDependent(s, varDefs)){
                                /* add */(allVariables.push(z)>0);
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (filter != null && filter instanceof <any>AncestorDescendantNodes){
            const loop: AncestorDescendantNodes = <AncestorDescendantNodes><any>filter;
            if (null == y.getAttribute$java_lang_String(loop.d)){
                const tmp: MaterializedPredicate = x;
                x = y;
                y = tmp;
            }
        }
        const ret: MaterializedPredicate = new MaterializedPredicate(allVariables, x.src, null);
        ret.program = x.program;
        for(let index = 0; index < y.tuples.length; index++) {
            let tupleY = y.tuples[index];
            {
                let innerLoop: Array<Tuple> = x.tuples;
                if (filter != null && filter instanceof <any>AncestorDescendantNodes){
                    const loop: AncestorDescendantNodes = <AncestorDescendantNodes><any>filter;
                    try {
                        let index: number = y.getAttribute$java_lang_String(loop.d);
                        if (index == null){
                            const attr: Attribute = attributeDefinition(varDefs, loop.d);
                            if (attr != null && attr instanceof <any>EqualExpr){
                                const eExpr: EqualExpr = <EqualExpr>attr;
                                let d: string = eExpr.def;
                                const pos: number = d.indexOf('.');
                                if (0 < pos){
                                    d = d.substring(pos + 1);
                                    index = y.getAttribute$java_lang_String(d);
                                }
                            }
                        }
                        innerLoop = loop.innerLoop(tupleY.values[index], x);
                    } catch(e) {
                    }
                }
                for(let index1 = 0; index1 < innerLoop.length; index1++) {
                    let tupleX = innerLoop[index1];
                    {
                        const retTuple: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>allVariables.length));
                        const mismatchedAttributes: Array<string> = <any>([]);
                        for(let i: number = 0; i < retTuple.length; i++) {{
                            const attr: string = ret.getAttribute$int(i);
                            let j: number = /* get */((m,k) => m[k]===undefined?null:m[k])(x.attributePositions, attr);
                            if (j != null){
                                retTuple[i] = tupleX.values[j];
                                continue;
                            }
                            j = /* get */((m,k) => m[k]===undefined?null:m[k])(y.attributePositions, attr);
                            if (j != null){
                                retTuple[i] = tupleY.values[j];
                                continue;
                            }
                            const dotPos: number = attr.indexOf('.');
                            if (0 < dotPos){
                                const refPred: string = attr.substring(0, dotPos);
                                const simpleName: string = attr.substring(dotPos + 1);
                                if (x.name != null && (x.name === refPred)){
                                    j = /* get */((m,k) => m[k]===undefined?null:m[k])(x.attributePositions, simpleName);
                                    if (j != null){
                                        retTuple[i] = tupleX.values[j];
                                        continue;
                                    }
                                } else if (y.name != null && (y.name === refPred)){
                                    j = /* get */((m,k) => m[k]===undefined?null:m[k])(y.attributePositions, simpleName);
                                    if (j != null){
                                        retTuple[i] = tupleY.values[j];
                                        continue;
                                    }
                                }
                            }
                            /* add */(mismatchedAttributes.push(attr)>0);
                        };}
                        for(let index2 = 0; index2 < mismatchedAttributes.length; index2++) {
                            let attr = mismatchedAttributes[index2];
                            {
                                let tmp: Array<Tuple> = <any>([]);
                                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmp, new Tuple(retTuple));
                                tmp = ret.assignDependencyChain(attr, tmp, varDefs, root, src);
                                if (1 < /* size */(<number>tmp.length))throw Object.defineProperty(new Error("1 < tmp.size()"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                                for(let index3 = 0; index3 < tmp.length; index3++) {
                                    let p = tmp[index3];
                                    if (retTuple !== p.values)throw Object.defineProperty(new Error("retTuple != p"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                                }
                            }
                        }
                        if (filter['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](ret.attributePositions, retTuple, x.src, varDefs))ret.addContent(retTuple);
                    }
                }
            }
        }
        for(let index = 0; index < allVariables.length; index++) {
            let v1 = allVariables[index];
            for(let index1 = 0; index1 < allVariables.length; index1++) {
                let v2 = allVariables[index1];
                {
                    if (/* compareTo */v1.localeCompare(v2) <= 0)continue;
                    const p: Predicate = filter.isRelated(v1, v2, varDefs);
                    if (p != null && p instanceof <any>AncestorDescendantNodes){
                        const ad: AncestorDescendantNodes = <AncestorDescendantNodes><any>p;
                        if (ad.type !== AncestorDescendantNodes.Type.CLOSEST)continue;
                        const col: number = ret.getAttribute$java_lang_String(ad.a);
                        if (col == null)throw Object.defineProperty(new Error("Predicate " + ret.name + " doesn\'t have " + ad.a + " attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                        const ap: AggregatePredicate = new AggregatePredicate(ad.a, ret.getAttribute$java_lang_String(ad.d), filter);
                        const ret1: MaterializedPredicate = new MaterializedPredicate(allVariables, x.src, null);
                        for(let index2 = 0; index2 < ret.tuples.length; index2++) {
                            let tuple = ret.tuples[index2];
                            ap.eval$oracle_dbtools_arbori_Tuple$java_util_Set$int(tuple, ret1.tuples, col)
                        }
                        return ret1;
                    }
                }
            }
        }
        return ret;
    }

    /**
     * Applies full filter
     * @param {MaterializedPredicate} x
     * @param {*} filter
     * @param {*} varDefs
     * @param {ParseNode} root
     * @return
     * @return {MaterializedPredicate}
     */
    public static filter(x: MaterializedPredicate, filter: Predicate, varDefs: any, root: ParseNode): MaterializedPredicate {
        const signature: Array<string> = <any>([]);
        filter.signature(signature);
        const header: Array<string> = MaterializedPredicate.disambigute(signature);
        let xAttributePositions: any = x.attributePositions;
        if (x.name != null){
            const tmp: any = <any>({});
            {
                let array = /* keySet */Object.keys(xAttributePositions);
                for(let index = 0; index < array.length; index++) {
                    let attr = array[index];
                    /* put */(tmp[x.name + "." + attr] = /* get */((m,k) => m[k]===undefined?null:m[k])(xAttributePositions, attr))
                }
            }
            xAttributePositions = tmp;
        }
        const ret: MaterializedPredicate = new MaterializedPredicate(header, x.src, null);
        ret.program = x.program;
        for(let index = 0; index < x.tuples.length; index++) {
            let tupleX = x.tuples[index];
            {
                if (filter['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](xAttributePositions, tupleX.values, x.src, varDefs)){
                    const projectedTuple: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>header.length));
                    for(let ix: number = 0; ix < tupleX.values.length; ix++) {{
                        const colName: string = x.getAttribute$int(ix);
                        let ip: number = /* get */((m,k) => m[k]===undefined?null:m[k])(ret.attributePositions, colName);
                        if (ip == null){
                            const pos: number = colName.indexOf('.');
                            if (0 < pos){
                                if (/* contains */(signature.indexOf(<any>(colName)) >= 0))ip = /* get */((m,k) => m[k]===undefined?null:m[k])(ret.attributePositions, colName.substring(pos + 1));
                            }
                        }
                        if (ip != null)projectedTuple[ip] = tupleX.values[ix];
                    };}
                    for(let ip: number = 0; ip < projectedTuple.length; ip++) {{
                        if (projectedTuple[ip] != null)continue;
                        const ixName: string = ret.getAttribute$int(ip);
                        let ax: Attribute = attributeDefinition(varDefs, ixName);
                        if (ax == null)ax = attributeDefinition(varDefs, x.name + "." + ixName);
                        projectedTuple[ip] = ax.lookup(xAttributePositions, tupleX.values, varDefs);
                    };}
                    ret.addContent(projectedTuple);
                }
            }
        }
        return ret;
    }

    /**
     * Keep name qualifiers if there is more than one attribute with the same name
     * @param {string[]} signature
     * @return
     * @return {string[]}
     * @private
     */
    /*private*/ static disambigute(signature: Array<string>): Array<string> {
        signature = javaStringHashOrder(signature);
        const names: any = <any>({});
        for(let index = 0; index < signature.length; index++) {
            let candidate = signature[index];
            {
                let name: string = candidate;
                const pos: number = candidate.indexOf('.');
                if (0 < pos)name = name.substring(pos + 1);
                if (/* containsKey */names.hasOwnProperty(name))/* put */(names[name] = candidate); else /* put */(names[name] = name);
            }
        }
        const ret: Array<string> = <any>([]);
        for(let index = 0; index < signature.length; index++) {
            let candidate = signature[index];
            {
                let name: string = candidate;
                const pos: number = candidate.indexOf('.');
                if (0 < pos)name = name.substring(pos + 1);
                const tmp: string = /* get */((m,k) => m[k]===undefined?null:m[k])(names, name);
                if (0 < tmp.indexOf('.'))/* add */(ret.push(candidate)>0); else /* add */(ret.push(name)>0);
            }
        }
        return ret;
    }

    /**
     * Attribute.navigate amended to recursive navigation
     * @param {string} name - attribute name
     * @param nodeAssignments
     * @param {*} varDefs
     * @param {ParseNode} root
     * @return {Tuple[]} mutated list
     * @param {Tuple[]} candidates
     * @param {LexerToken[]} src
     */
    assignDependencyChain(name: string, candidates: Array<Tuple>, varDefs: any, root: ParseNode, src: Array<LexerToken>): Array<Tuple> {
        if (/* size */(<number>candidates.length) === 0)return candidates;
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                const cell: ParseNode = t.values[/* get */((m,k) => m[k]===undefined?null:m[k])(this.attributePositions, name)];
                if (cell != null)return candidates; else break;
            }
        }
        const attr: Attribute = varDefs instanceof Map ? varDefs.get(name) : varDefs?.[name];
        if (attr == null) throw new Error(`Missing Arbori attribute definition: ${name}`);
        attr.src = src;
        const ref: Attribute = attr.referredTo(varDefs);
        if (ref == null)return candidates;
        candidates = this.assignDependencyChain(ref.name, candidates, varDefs, root, src);
        return attr.eval(this.attributePositions, candidates, root);
    }

    /**
     * 
     * @return {*}
     */
    public dependencies(): any {
        return <any>({});
    }

    public static tupleMnemonics$java_util_Map$java_util_List(tuple: any, src: Array<LexerToken>): string {
        return MaterializedPredicate.tupleMnemonics$java_util_Map$java_util_List$boolean(tuple, src, false);
    }

    public static tupleMnemonics$java_util_Map$java_util_List$boolean(tuple: any, src: Array<LexerToken>, independentOnly: boolean): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        let num: number = -1;
        {
            let array = /* keySet */Object.keys(tuple);
            for(let index = 0; index < array.length; index++) {
                let attribute = array[index];
                {
                    if (independentOnly && (0 <= attribute.indexOf('^') || 0 <= attribute.indexOf('+') || 0 <= attribute.indexOf('-')))continue;
                    num++;
                    if (0 < num)/* append */(sb => { sb.str += <any>",  "; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>attribute + " = "; return sb; })(ret);
                    const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, attribute);
                    if (node != null)/* append */(sb => { sb.str += <any>"[" + node.from + "," + node.to + ")"; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>" "; return sb; })(ret);
                    if (node != null)/* append */(sb => { sb.str += <any>MaterializedPredicate.mnemonics(node.from, node.to, src); return sb; })(ret);
                }
            }
        }
        return /* toString */ret.str;
    }

    public static tupleMnemonics(tuple?: any, src?: any, independentOnly?: any): string {
        if (((tuple != null && (tuple instanceof Object)) || tuple === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof independentOnly === 'boolean') || independentOnly === null)) {
            return <any>MaterializedPredicate.tupleMnemonics$java_util_Map$java_util_List$boolean(tuple, src, independentOnly);
        } else if (((tuple != null && (tuple instanceof Object)) || tuple === null) && ((src != null && (src instanceof Array)) || src === null) && independentOnly === undefined) {
            return <any>MaterializedPredicate.tupleMnemonics$java_util_Map$java_util_List(tuple, src);
        } else throw new Error('invalid overload');
    }

    /**
     * Helper method to render abbreviated content of parsed text covered by ParseNode
     * @param {number} from  -- beginning of node interval
     * @param {number} to -- end of node interval
     * @param {LexerToken[]} src  -- lexed text
     * @return
     * @return {string}
     */
    public static mnemonics(from: number, to: number, src: Array<LexerToken>): string {
        const _8: number = 8;
        if (from + 1 === to)return Service.padln(_8 + 2 < /* get */src[from].content.length ? /* get */src[from].content.substring(0, _8 + 2) : /* get */src[from].content, _8 + 2); else {
            const ret: { str: string, toString: Function } = { str: "\"", toString: function() { return this.str; } };
            for(let i: number = from; i < to && i < from + _8; i++) {{
                const token: string = /* get */src[i].content.toUpperCase();
                let t: string = token.substring(0, 1).toLowerCase();
                for(let j: number = 0; j < SqlEarley.keywords_$LI$().length; j++) {if (SqlEarley.keywords_$LI$()[j].substring(1, SqlEarley.keywords_$LI$()[j].length - 1) === token){
                    t = t.toUpperCase();
                    break;
                };}
                /* append */(sb => { sb.str += <any>t; return sb; })(ret);
            };}
            /* append */(sb => { sb.str += <any>'\"'; return sb; })(ret);
            return Service.padln(/* toString */ret.str, _8 + 2);
        }
    }

    /**
     * 
     * @param {string[]} independentAttributes
     */
    public adjustIsFunFlag(independentAttributes: Array<string>) {
    }
}
MaterializedPredicate["__class"] = "oracle.dbtools.arbori.MaterializedPredicate";
MaterializedPredicate["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];





import { AggregatePredicate } from './AggregatePredicate';


import { EqualExpr } from './Attribute';


import { AncestorDescendantNodes } from './AncestorDescendantNodes';


import { Attribute } from './Attribute';


import { Program } from './Program';


import { Tuple } from './Tuple';


import { Predicate } from './Predicate';

