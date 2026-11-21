/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerToken } from '../parser/LexerToken';
import { ParseNode } from '../parser/ParseNode';
import { IdentedPredicate } from './Predicate';
import { Predicate } from './Predicate';
import { Parsed } from '../parser/Parsed';

/**
 * Ancestor-descendant relationship betweeen nodes.
 * @param {string} ancestor
 * @param {string} descendant
 * @param {AncestorDescendantNodes.Type} type
 * @class
 * @extends IdentedPredicate
 */
export class AncestorDescendantNodes extends IdentedPredicate {
    a: string;

    d: string;

    type: AncestorDescendantNodes.Type;

    public constructor(ancestor: string, descendant: string, type: AncestorDescendantNodes.Type) {
        super();
        if (this.a === undefined) { this.a = null; }
        if (this.d === undefined) { this.d = null; }
        if (this.type === undefined) { this.type = null; }
        this.a = ancestor;
        this.d = descendant;
        this.type = type;
    }

    public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
        const nodeA: ParseNode = this.getNode(this.a, attributePositions, tuple, varDefs);
        if (nodeA == null)return false;
        const nodeD: ParseNode = this.getNode(this.d, attributePositions, tuple, varDefs);
        if (nodeD == null)return false;
        if (this.type === AncestorDescendantNodes.Type.CLOSEST)return nodeA.from <= nodeD.from && nodeD.to <= nodeA.to && (nodeA.from !== nodeD.from || nodeD.to !== nodeA.to); else if (this.type === AncestorDescendantNodes.Type.TRANSITIVE)return nodeA.from <= nodeD.from && nodeD.to <= nodeA.to;
        throw Object.defineProperty(new Error("Unexpected AncestorDescendant type: " + AncestorDescendantNodes.Type["_$wrappers"][this.type].toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public eval(attributePositions?: any, tuple?: any, src?: any, varDefs?: any): any {
        if (((attributePositions != null && (attributePositions instanceof Object)) || attributePositions === null) && ((tuple != null && tuple instanceof <any>Array && (tuple.length == 0 || tuple[0] == null ||(tuple[0] != null && tuple[0] instanceof <any>ParseNode))) || tuple === null) && ((src != null && (src instanceof Array)) || src === null) && ((varDefs != null && (varDefs instanceof Object)) || varDefs === null)) {
            return <any>this.eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions, tuple, src, varDefs);
        } else if (((attributePositions != null && attributePositions instanceof <any>Parsed) || attributePositions === null) && tuple === undefined && src === undefined && varDefs === undefined) {
            return <any>this.eval$oracle_dbtools_parser_Parsed(attributePositions);
        } else throw new Error('invalid overload');
    }

    public toString(depth?: any): string {
        if (((typeof depth === 'number') || depth === null)) {
            return super.toString(depth);
        } else if (depth === undefined) {
            return <any>this.toString$();
        } else throw new Error('invalid overload');
    }

    public toString$(): string {
        return this.a + " " + AncestorDescendantNodes.Type["_$wrappers"][this.type].oper() + " " + this.d;
    }

    /**
     * 
     * @param {string[]} ret
     * @param {boolean} optimizeEqs
     */
    public variables(ret: Array<string>, optimizeEqs: boolean) {
        if (optimizeEqs)IdentedPredicate.variables(this.a + AncestorDescendantNodes.Type["_$wrappers"][this.type].oper() + this.d, ret); else {
            IdentedPredicate.variables(this.a, ret);
            IdentedPredicate.variables(this.d, ret);
        }
    }

    /**
     * 
     * @param {string[]} ret
     */
    public signature(ret: Array<string>) {
        IdentedPredicate.variables(this.a, ret);
        IdentedPredicate.variables(this.d, ret);
    }

    /**
     * 
     * @param {string} var1
     * @param {string} var2
     * @param {*} varDefs
     * @return {*}
     */
    public isRelated(var1: string, var2: string, varDefs: any): Predicate {
        const attr1: Attribute = varDefs instanceof Map ? varDefs.get(this.a) : varDefs?.[this.a];
        const attr2: Attribute = varDefs instanceof Map ? varDefs.get(this.d) : varDefs?.[this.d];
        if (attr1.isDependent(var1, varDefs) && attr2.isDependent(var2, varDefs) || attr2.isDependent(var1, varDefs) && attr1.isDependent(var2, varDefs))return this; else return null;
    }

    /**
     * 
     * @return {*}
     */
    public dependencies(): any {
        const ret: any = <any>({});
        let pos: number = this.a.indexOf('.');
        if (0 < pos)/* put */(ret[this.a.substring(0, pos)] = true);
        pos = this.d.indexOf('.');
        if (0 < pos)/* put */(ret[this.d.substring(0, pos)] = true);
        return ret;
    }

    innerLoop(node: ParseNode, anc: MaterializedPredicate): Array<Tuple> {
        if (1 < anc.arity())throw Object.defineProperty(new Error("1 < anc.arity()"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        const ret: Array<Tuple> = <any>([]);
        if (node != null && this.type === AncestorDescendantNodes.Type.CLOSEST)node = node.parent$();
        while((node != null)) {{
            const candidate: Tuple = new Tuple([node]);
            if (anc.getTuples().some(tuple => tuple.compareTo(candidate) === 0)) {
                if (!ret.some(tuple => tuple.compareTo(candidate) === 0)) ret.push(candidate);
            }
            node = node.parent$();
        }};
        return ret;
    }
}
AncestorDescendantNodes["__class"] = "oracle.dbtools.arbori.AncestorDescendantNodes";
AncestorDescendantNodes["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



export namespace AncestorDescendantNodes {

    export enum Type {
        CLOSEST, TRANSITIVE
    }

    /** @ignore */
    export class Type_$WRAPPER {
        constructor(protected _$ordinal: number, protected _$name: string) {
        }

        public oper(): string {
            if (this._$ordinal === Type.CLOSEST)return "<"; else if (this._$ordinal === Type.TRANSITIVE)return "<<";
            throw Object.defineProperty(new Error("Unexpected AncestorDescendant type: " + this.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        public name(): string { return this._$name; }
        public ordinal(): number { return this._$ordinal; }
        public compareTo(other: any): number { return this._$ordinal - (isNaN(other)?other._$ordinal:other); }
    }
    Type["__class"] = "oracle.dbtools.arbori.AncestorDescendantNodes.Type";
    Type["_$wrappers"] = {0: new Type_$WRAPPER(0, "CLOSEST"), 1: new Type_$WRAPPER(1, "TRANSITIVE")};

}




import { MaterializedPredicate } from './MaterializedPredicate';


import { Tuple } from './Tuple';


import { Attribute } from './Attribute';

