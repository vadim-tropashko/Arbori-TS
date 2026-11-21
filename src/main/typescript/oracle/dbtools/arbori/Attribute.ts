/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParseInt } from '../../arbori/util/ParseInt';
import { LexerToken } from '../parser/LexerToken';
import { ParseNode } from '../parser/ParseNode';

function attributeDef(varDefs: any, name: string): Attribute | null {
    return varDefs instanceof Map ? varDefs.get(name) ?? null : varDefs?.[name] ?? null;
}

export abstract class Attribute {
    name: string;

    src: Array<LexerToken>;

    public static getSibling(self: ParseNode, parent: ParseNode, offset: number): ParseNode {
        if (parent == null)return null;
        if (offset === 1){
            let matched: boolean = false;
            {
                let array = parent.children();
                for(let index = 0; index < array.length; index++) {
                    let c = array[index];
                    {
                        if (matched)return c;
                        if (c === self)matched = true;
                    }
                }
            }
            return null;
        }
        if (offset === -1){
            let prior: ParseNode = null;
            {
                let array = parent.children();
                for(let index = 0; index < array.length; index++) {
                    let c = array[index];
                    {
                        if (c === self)return prior;
                        prior = c;
                    }
                }
            }
            return null;
        }
        const children: ParseNode[] = /* toArray */((a1, a2) => { if(a1.length >= a2.length) { a1.length=0; a1.push.apply(a1, a2); return a1; } else { return a2.slice(0); } })([], parent.children());
        for(let i: number = 0; i < children.length; i++) {{
            const child: ParseNode = children[i];
            if (child === self){
                const pos: number = i + offset;
                if (0 <= pos && pos < children.length)return children[pos];
            }
        };}
        return null;
    }

    static referredTo(attr: string): string {
        let pos: number = attr.indexOf('<');
        if (0 < pos){
            let postfix: string = attr.substring(pos + 1).trim();
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(postfix.charAt(0)) == '='.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(postfix.charAt(0)) == '<'.charCodeAt(0))postfix = postfix.substring(1);
            if (((lhs, rhs) => lhs && rhs)(postfix.indexOf('.') < 0, postfix.indexOf(']') < 0))return postfix;
        }
        pos = attr.indexOf('=');
        if (0 < pos){
            const indexOfParentSymbol: number = attr.indexOf('^');
            if (pos < indexOfParentSymbol){
                return attr.substring(0, pos);
            }
            return attr.substring(pos + 1);
        } else if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(attr, "^"))return attr.substring(0, attr.length - 1); else {
            let pos1: number = attr.lastIndexOf('-');
            const pos2: number = attr.lastIndexOf('+');
            if (pos1 < pos2)pos1 = pos2;
            if (0 < pos1){
                const suffix: string = attr.substring(pos1);
                if (ParseInt.isInt(suffix)){
                    return attr.substring(0, pos1);
                }
            }
        }
        pos = attr.lastIndexOf('.');
        if (0 < pos)return attr.substring(0, pos);
        return null;
    }

    isDependent(primaryVar: string, varDefs: any): boolean {
        if (primaryVar === this.name)return true;
        const ref: Attribute = this.referredTo(varDefs);
        if (ref == null)return false;
        return ref.isDependent(primaryVar, varDefs);
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return this.name;
    }

    appendProposition(extra: Predicate, p: Predicate): Predicate {
        if (extra != null && extra instanceof <any>True)return p;
        if (p != null && p instanceof <any>True)return extra;
        return new CompositeExpr(extra, p, Oper.CONJUNCTION);
    }

    /**
     * Avoid allocating a new CompositeExpr when boolean algebra identities apply:
     * - True is the identity element for conjunction:  True AND x = x
     * - True is the absorbing element for disjunction: True OR x = True
     * - If neither child changed, reuse the original expression
     * @param {*} lft
     * @param {*} rgt
     * @param {CompositeExpr} ce
     * @return {*}
     * @private
     */
    /*private*/ static simplifyComposite(lft: Predicate, rgt: Predicate, ce: CompositeExpr): Predicate {
        if (lft === ce.lft && rgt === ce.rgt)return ce;
        if ((lft != null && lft instanceof <any>True) && (rgt != null && rgt instanceof <any>True))return True.INSTANCE_$LI$();
        if (ce.oper === Oper.CONJUNCTION){
            if (lft != null && lft instanceof <any>True)return rgt;
            if (rgt != null && rgt instanceof <any>True)return lft;
        } else if (ce.oper === Oper.DISJUNCTION){
            if ((lft != null && lft instanceof <any>True) || (rgt != null && rgt instanceof <any>True))return True.INSTANCE_$LI$();
        }
        return new CompositeExpr(lft, rgt, ce.oper);
    }

    static unaryFilter(p: Predicate, nodeVar: string): Predicate {
        if (p != null && p instanceof <any>NodeContent){
            const nc: NodeContent = <NodeContent><any>p;
            if (!(nc.nodeVar === nodeVar))return True.INSTANCE_$LI$(); else return p;
        }
        if (p != null && p instanceof <any>PositionalRelation){
            const pr: PositionalRelation = <PositionalRelation><any>p;
            if ((pr.a != null && pr.a instanceof <any>BindVar) && (pr.b.name === nodeVar))return p; else if ((pr.b != null && pr.b instanceof <any>BindVar) && (pr.a.name === nodeVar))return p; else if ((pr.a.name === nodeVar) && (pr.b.name === nodeVar))return p; else return True.INSTANCE_$LI$();
        }
        if (p != null && p instanceof <any>NodeMatchingSrc){
            const nms: NodeMatchingSrc = <NodeMatchingSrc><any>p;
            if (!(nms.nodeVar === nodeVar))return True.INSTANCE_$LI$(); else return p;
        }
        if (p != null && p instanceof <any>CompositeExpr){
            const ce: CompositeExpr = <CompositeExpr><any>p;
            if (ce.oper === Oper.CONJUNCTION || ce.oper === Oper.DISJUNCTION){
                const lft: Predicate = Attribute.unaryFilter(ce.lft, nodeVar);
                const rgt: Predicate = Attribute.unaryFilter(ce.rgt, nodeVar);
                return Attribute.simplifyComposite(lft, rgt, ce);
            } else if (ce.oper === Oper.NEGATION){
                return True.INSTANCE_$LI$();
            }
        }
        return True.INSTANCE_$LI$();
    }

    static binaryFilter(p: Predicate, nodeVar1: string, nodeVar2: string): Predicate {
        if (p != null && p instanceof <any>PositionalRelation){
            const pr: PositionalRelation = <PositionalRelation><any>p;
            if ((pr.a.name === nodeVar1) && (pr.b.name === nodeVar2))return p; else return True.INSTANCE_$LI$();
        }
        if (p != null && p instanceof <any>NodesWMatchingSrc){
            const nms: NodesWMatchingSrc = <NodesWMatchingSrc><any>p;
            if (!(nms.nodeVar1 === nodeVar1) || !(nms.nodeVar2 === nodeVar2))return True.INSTANCE_$LI$(); else return p;
        }
        if (p != null && p instanceof <any>CompositeExpr){
            const ce: CompositeExpr = <CompositeExpr><any>p;
            if (ce.oper === Oper.CONJUNCTION || ce.oper === Oper.DISJUNCTION){
                const lft: Predicate = Attribute.binaryFilter(ce.lft, nodeVar1, nodeVar2);
                const rgt: Predicate = Attribute.binaryFilter(ce.rgt, nodeVar1, nodeVar2);
                return Attribute.simplifyComposite(lft, rgt, ce);
            } else if (ce.oper === Oper.NEGATION){
                return True.INSTANCE_$LI$();
            }
        }
        return True.INSTANCE_$LI$();
    }

    /**
     * Evaluate attribute (fill in null values) in nodeAssignments
     * If Attribute is in many-to-one, then spawn nodeAssignments tuples
     * @param nodeAssignments
     * @param {ParseNode} root
     * @return  {Tuple[]} mutated list
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     */
    abstract eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple>;

    /**
     * This method chases attribute functional dependencies, until it finds an attribute listed in attributePositions
     * Then, the value along dependency chain is calculated
     * @param {*} attributePositions
     * @param {oracle.dbtools.parser.ParseNode[]} tuple
     * @param {*} varDefs
     * @return
     * @return {ParseNode}
     */
    abstract lookup(attributePositions: any, tuple: ParseNode[], varDefs: any): ParseNode;

    abstract referredTo(varDefs: any): Attribute;

    constructor() {
        if (this.name === undefined) { this.name = null; }
        if (this.src === undefined) { this.src = null; }
    }
}
Attribute["__class"] = "oracle.dbtools.arbori.Attribute";


export class EqualExpr extends Attribute {
    def: string;

    public constructor(name: string, def: string) {
        super();
        if (this.def === undefined) { this.def = null; }
        this.name = name;
        this.def = def;
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     * @param {ParseNode} root
     * @return {Tuple[]}
     */
    eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple> {
        const nameCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.name);
        const defCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.def);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                t.values[nameCol] = t.values[defCol];
            }
        }
        return candidates;
    }

    /**
     * 
     * @param {*} varDefs
     * @return {Attribute}
     */
    referredTo(varDefs: any): Attribute {
        return attributeDef(varDefs, this.def);
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return '\"' + this.name + '=' + this.def + '\"';
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {oracle.dbtools.parser.ParseNode[]} tuple
     * @param {*} varDefs
     * @return {ParseNode}
     */
    lookup(attributePositions: any, tuple: ParseNode[], varDefs: any): ParseNode {
        return this.referredTo(varDefs).lookup(attributePositions, tuple, varDefs);
    }
}
EqualExpr["__class"] = "oracle.dbtools.arbori.EqualExpr";


/**
 * AncestorExpr assists evaluating Arbori query in a single walk of parse tree.
 * This is faster than evaluating Cartesian product, then filtering out all tuples
 * which don't match a filter condition.
 * 
 * For example, a typical "ancestor < descendant" predicate can be evaluated via nested loops over all tree nodes
 * and keeping all the node pairs which match "ancestor < descendant" condition. This method has complexity N^2.
 * 
 * A Better alternative is to walk the tree (complexity=N) and for each node traverse the ancestors path (complexity=log(N))
 * with total complexity is N*log(N).
 * 
 * With cartesian product implementation Arbori evaluation time of descendantNodes query in format.prg
 * for FND_STATS package body was 230 sec (12646 nodes, max tree depth = 73)
 * With ancestor chain filtering the timing was expected to improve by the factor of 12646/73
 * Indeed, the measured timing now is:
 * isolatedNodes eval time = 258 (ms)
 * descendantNodes eval time = 718
 * selNodes eval time = 31
 * ancestors eval time = 0
 * descendants eval time = 0
 * hierarchy eval time = 1208
 * "built-ins" eval time = 81
 * "ids" eval time = 110
 * identifiers eval time = 30
 * formattedNodes eval time = 0
 * paddedIdsInScope eval time = 210
 * extraLines eval time = 10
 * notPaddedParenthesis eval time = 290
 * (aggregate) eval time = 2946
 * callback time = 460
 * @param {string} name
 * @param {string} def
 * @param {AncestorDescendantNodes.Type} type
 * @param {*} full
 * @class
 * @extends Attribute
 */
export class AncestorExpr extends Attribute {
    def: string;

    type: AncestorDescendantNodes.Type;

    __unaryFilter: Predicate;

    public constructor(name: string, def: string, type: AncestorDescendantNodes.Type, full: Predicate) {
        super();
        if (this.def === undefined) { this.def = null; }
        if (this.type === undefined) { this.type = null; }
        if (this.__unaryFilter === undefined) { this.__unaryFilter = null; }
        this.name = name;
        this.def = def;
        this.type = type;
        this.__unaryFilter = Attribute.unaryFilter(full, name);
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     * @param {ParseNode} root
     * @return {Tuple[]}
     */
    eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple> {
        const ret: Array<Tuple> = <any>([]);
        const nameCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.name);
        const defCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.def);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                let node: ParseNode = t.values[defCol];
                if (this.type === AncestorDescendantNodes.Type.CLOSEST && node != null)node = node.parent$();
                while((node != null)) {{
                    const t1: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(t.values.length);
                    /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(t.values, 0, t1, 0, t.values.length);
                    t1[nameCol] = node;
                    if (this.__unaryFilter['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, t1, this.src, null))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new Tuple(t1));
                    node = node.parent$();
                }};
            }
        }
        return ret;
    }

    /**
     * 
     * @param {*} varDefs
     * @return {Attribute}
     */
    referredTo(varDefs: any): Attribute {
        return attributeDef(varDefs, this.def);
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return '\"' + this.name + AncestorDescendantNodes.Type["_$wrappers"][this.type].oper() + this.def + '\"';
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
        return tuple[pos];
    }
}
AncestorExpr["__class"] = "oracle.dbtools.arbori.AncestorExpr";


/**
 * WIP:
 * Analogous to AncestorExpr optimization, consider
 * 
 * x: [columnExpr) column
 * & [colIden) identifier
 * & columnExpr = colIden^
 * & [tabIden) identifier
 * & columnExpr = tabIden^^
 * ;
 * It can be evaluated in one dimension if we pivot all attributes over columnExpr
 * @param {string} name
 * @param {string} def
 * @param {number} level
 * @param {*} full
 * @class
 * @extends Attribute
 */
export class ChildExpr extends Attribute {
    level: number;

    def: string;

    __unaryFilter: Predicate;

    public constructor(name: string, def: string, level: number, full: Predicate) {
        super();
        this.level = 1;
        if (this.def === undefined) { this.def = null; }
        if (this.__unaryFilter === undefined) { this.__unaryFilter = null; }
        this.name = name;
        this.level = level;
        this.def = def;
        this.__unaryFilter = Attribute.unaryFilter(full, name);
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     * @param {ParseNode} root
     * @return {Tuple[]}
     */
    eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple> {
        const ret: Array<Tuple> = <any>([]);
        const nameCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.name);
        const defCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.def);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                const node: ParseNode = t.values[defCol];
                let children: Array<ParseNode> = node.children();
                if (this.level === 2){
                    const grandchildren: Array<ParseNode> = <any>([]);
                    for(let index1 = 0; index1 < children.length; index1++) {
                        let p = children[index1];
                        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(grandchildren, p.children())
                    }
                    children = grandchildren;
                }
                for(let index1 = 0; index1 < children.length; index1++) {
                    let p = children[index1];
                    {
                        const t1: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(t.values.length);
                        /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(t.values, 0, t1, 0, t.values.length);
                        t1[nameCol] = p;
                        if (this.__unaryFilter['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, t1, this.src, null))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new Tuple(t1));
                    }
                }
            }
        }
        return ret;
    }

    /**
     * 
     * @param {*} varDefs
     * @return {Attribute}
     */
    referredTo(varDefs: any): Attribute {
        return attributeDef(varDefs, this.def);
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return '\"' + this.name + " " + this.level + " " + this.def + '\"';
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
        return tuple[pos];
    }
}
ChildExpr["__class"] = "oracle.dbtools.arbori.ChildExpr";


export class Parent extends Attribute {
    ref: string;

    public constructor(name: string) {
        super();
        if (this.ref === undefined) { this.ref = null; }
        this.name = name;
        this.ref = Attribute.referredTo(name);
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     * @param {ParseNode} root
     * @return {Tuple[]}
     */
    eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple> {
        const nameCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.name);
        const refCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.ref);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                if (t.values[refCol] == null)continue;
                t.values[nameCol] = t.values[refCol].parent$();
            }
        }
        return candidates;
    }

    /**
     * 
     * @param {*} varDefs
     * @return {Attribute}
     */
    referredTo(varDefs: any): Attribute {
        return attributeDef(varDefs, this.ref);
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {oracle.dbtools.parser.ParseNode[]} tuple
     * @param {*} varDefs
     * @return {ParseNode}
     */
    lookup(attributePositions: any, tuple: ParseNode[], varDefs: any): ParseNode {
        return this.referredTo(varDefs).lookup(attributePositions, tuple, varDefs).parent$();
    }
}
Parent["__class"] = "oracle.dbtools.arbori.Parent";


export class Sibling extends Attribute {
    ref: string;

    shift: number;

    public constructor(name: string, shift: number) {
        super();
        if (this.ref === undefined) { this.ref = null; }
        if (this.shift === undefined) { this.shift = 0; }
        this.name = name;
        this.ref = Attribute.referredTo(name);
        this.shift = shift;
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     * @param {ParseNode} root
     * @return {Tuple[]}
     */
    eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple> {
        const nameCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.name);
        const refCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.ref);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                if (t.values[refCol] == null)continue;
                t.values[nameCol] = t.values[refCol].parent$();
                if (t.values[nameCol] == null)continue;
                t.values[nameCol] = Attribute.getSibling(t.values[refCol], t.values[nameCol], this.shift);
            }
        }
        return candidates;
    }

    /**
     * 
     * @param {*} varDefs
     * @return {Attribute}
     */
    referredTo(varDefs: any): Attribute {
        return attributeDef(varDefs, this.ref);
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {oracle.dbtools.parser.ParseNode[]} tuple
     * @param {*} varDefs
     * @return {ParseNode}
     */
    lookup(attributePositions: any, tuple: ParseNode[], varDefs: any): ParseNode {
        const self: ParseNode = this.referredTo(varDefs).lookup(attributePositions, tuple, varDefs);
        if (self == null)return null;
        return Attribute.getSibling(self, self.parent$(), this.shift);
    }
}
Sibling["__class"] = "oracle.dbtools.arbori.Sibling";


export class Column extends Attribute {
    static NAMEQUALSEP: string = "->";

    rel: string;

    public constructor(name: string, evaluatedPredVar: string) {
        super();
        if (this.rel === undefined) { this.rel = null; }
        const pos: number = name.indexOf('.');
        this.name = name;
        this.rel = name.substring(0, pos) + Column.NAMEQUALSEP + evaluatedPredVar;
    }

    /**
     * 
     * @param {*} attributePositions
     * @param {Tuple[]} candidates
     * @param {ParseNode} root
     * @return {Tuple[]}
     */
    eval(attributePositions: any, candidates: Array<Tuple>, root: ParseNode): Array<Tuple> {
        const nameCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.name);
        const defCol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, this.rel);
        for(let index = 0; index < candidates.length; index++) {
            let t = candidates[index];
            {
                t.values[nameCol] = t.values[defCol];
            }
        }
        return candidates;
    }

    /**
     * 
     * @param {*} varDefs
     * @return {Attribute}
     */
    referredTo(varDefs: any): Attribute {
        return attributeDef(varDefs, this.rel);
    }

    /**
     * 
     * @param {string} primaryVar
     * @param {*} varDefs
     * @return {boolean}
     */
    isDependent(primaryVar: string, varDefs: any): boolean {
        if (primaryVar === this.name)return true;
        return super.isDependent(primaryVar, varDefs);
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
Column["__class"] = "oracle.dbtools.arbori.Column";




import { AncestorDescendantNodes } from './AncestorDescendantNodes';


import { Tuple } from './Tuple';


import { NodesWMatchingSrc } from './Predicate';


import { NodeMatchingSrc } from './Predicate';


import { BindVar } from './Predicate';


import { PositionalRelation } from './Predicate';


import { NodeContent } from './Predicate';


import { Oper } from './Predicate';


import { CompositeExpr } from './Predicate';


import { True } from './Predicate';


import { Predicate } from './Predicate';

