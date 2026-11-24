/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParseInt } from '../../arbori/util/ParseInt';
import { Tuple } from './Tuple';
import { Program } from './Program';
import { Attribute } from './Attribute';
import { MaterializedPredicate } from './MaterializedPredicate';
import { LexerToken } from '../parser/LexerToken';
import { ParseNode } from '../parser/ParseNode';
import { Parsed } from '../parser/Parsed';

function getAttributeDefinition(varDefs: any, name: string): Attribute | null {
    return varDefs instanceof Map ? varDefs.get(name) ?? null : varDefs?.[name] ?? null;
}

/**
 * Arbori program consists of statements, each evaluates boolean expression of predicates
 * Here we classify various predicates
 * except for MaterializedPredicate and AggragatePredicate which warrant separate attention
 * @author Dim
 * @class
 */
export interface Predicate {
    toString(depth: number): string;

    /**
     * Evaluate nodeAssignments tuple against predicate expression
     * @param nodeAssignments
     * @param {LexerToken[]} src
     * @param {*} varDefs
     * @return
     * @param {*} attributePositions
     * @param {oracle.dbtools.parser.ParseNode[]} tuple
     * @return {boolean}
     */
    eval(attributePositions?: any, tuple?: any, src?: any, varDefs?: any): any;

    /**
     * Gather variables in the predicate expression
     * @param {string[]} ret -- collect stuff here
     * @param {boolean} optimizeEqs TODO
     * @param {boolean} optimizeEqs -- if encounted disjunction, then can't assume that any variable find around equality predicate is dependent anymore
     */
    variables(ret: Array<string>, optimizeEqs: boolean);

    /**
     * Output variables in the predicate expression
     * Subset of variables (for rules with disjunction)
     * @param {string[]} ret -- collect stuff here
     * @param optimizeEqs TODO
     * @param optimizeEqs -- if encounted disjunction, then can't assume that any variable find around equality predicate is dependent anymore
     */
    signature(ret: Array<string>);

    /**
     * Optimization: get all dependencies
     * Predicate is mapped to True if dependency is positive
     * @return {*}
     */
    dependencies(): any;

    /**
     * When evaluating predicate expression need to find attribute which is joined to intermeditory result
     * so that the result would not be cartesian product
     * @param {string} var1
     * @param {string} var2
     * @return {*} if there is binary predicate expression relating var1 with var2
     * @param {*} varDefs
     */
    isRelated(var1: string, var2: string, varDefs: any): Predicate;

    /**
     * Get copy in another program
     * @param prg
     * @return
     * @param {string[]} independentAttributes
     */
    adjustIsFunFlag(independentAttributes: Array<string>);
}

export namespace Predicate {

    export const UNASSIGNED_VAR: string = "unassigned var: ";
}


/**
 * Predicates in the expression defined elsewhere
 * e.g.  "proc scope" | "block scope" | "loop scope"
 * @author Dim
 * @param {string} name
 * @param {Program} program
 * @class
 */
export class PredRef implements Predicate {
    name: string;

    program: Program;

    public constructor(name: string, program: Program) {
        if (this.name === undefined) { this.name = null; }
        if (this.program === undefined) { this.program = null; }
        this.name = name;
        this.program = program;
    }

    public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
        const ref: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.program.namedPredicates, this.name);
        if (ref == null)throw Object.defineProperty(new Error("Unreferenced predicate variable " + this.name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        if (!(ref != null && ref instanceof <any>MaterializedPredicate))throw Object.defineProperty(new Error("Unevaluated predicate variable " + this.name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        return ref['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, tuple, src, varDefs);
    }

    /**
     * 
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
     * 
     * @param {number} depth
     * @return {string}
     */
    public toString(depth: number): string {
        return "->" + this.name;
    }

    /**
     * 
     * @param {string[]} ret
     * @param {boolean} optimizeEqs
     */
    public variables(ret: Array<string>, optimizeEqs: boolean) {
        const ref: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.program.namedPredicates, this.name);
        if (ref == null)throw Object.defineProperty(new Error("Unreferenced predicate variable " + this.name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        ref.variables(ret, optimizeEqs);
    }

    /**
     * 
     * @param {string[]} ret
     */
    public signature(ret: Array<string>) {
        this.variables(ret, false);
    }

    public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
        const ref: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.program.namedPredicates, this.name);
        if (ref == null)throw Object.defineProperty(new Error("Unreferenced predicate variable " + this.name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        if (!(ref != null && ref instanceof <any>MaterializedPredicate))throw Object.defineProperty(new Error("Unevaluated predicate variable " + this.name), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        return ref['eval$oracle_dbtools_parser_Parsed'](target);
    }

    /**
     * 
     * @param {string} var1
     * @param {string} var2
     * @param {*} varDefs
     * @return {*}
     */
    public isRelated(var1: string, var2: string, varDefs: any): Predicate {
        return null;
    }

    /**
     * 
     * @return {*}
     */
    public dependencies(): any {
        const ret: any = <any>({});
        /* put */(ret[this.name] = true);
        return ret;
    }

    /**
     * 
     * @param {string[]} independentAttributes
     */
    public adjustIsFunFlag(independentAttributes: Array<string>) {
    }
}
PredRef["__class"] = "oracle.dbtools.arbori.PredRef";
PredRef["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



export abstract class IdentedPredicate implements Predicate {
    public toString(depth: number): string {
        const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < depth; i++) {/* append */(sb => { sb.str += <any>"  "; return sb; })(sb);}
        /* append */(sb => { sb.str += <any>this.toString(); return sb; })(sb);
        /* append */(sb => { sb.str += <any>'\n'; return sb; })(sb);
        return /* toString */sb.str;
    }

    getNode(nodeVar: string, attributePositions: any, tuple: ParseNode[], varDefs: any): ParseNode {
        const attrPos: number = /* get */((m,k) => m[k]===undefined?null:m[k])(attributePositions, nodeVar);
        let ret: ParseNode = null;
        if (attrPos != null)ret = tuple[attrPos]; else {
            const attr: Attribute = varDefs instanceof Map ? varDefs.get(nodeVar) : varDefs?.[nodeVar];
            if (attr == null) {
                const varDefNames = varDefs instanceof Map ? Array.from(varDefs.keys()) : Object.keys(varDefs ?? {});
                console.error(`[Arbori] unresolved attribute ${nodeVar}; attributePositions=[${Object.keys(attributePositions ?? {}).join(", ")}], varDefs=[${varDefNames.join(", ")}]`);
                throw new Error(`Unresolved Arbori attribute: ${nodeVar}`);
            }
            return attr.lookup(attributePositions, tuple, varDefs);
        }
        return ret;
    }

    static variables(__var: string, ret: Array<string>) {
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, __var);
        if (0 < __var.indexOf("<<")){
            const prefix: string = __var.substring(0, __var.indexOf("<<"));
            IdentedPredicate.variables(prefix, ret);
            IdentedPredicate.variables(__var.substring(__var.indexOf("<<") + 2), ret);
        } else if (0 < __var.indexOf("<=")){
            const prefix: string = __var.substring(0, __var.indexOf("<="));
            IdentedPredicate.variables(prefix, ret);
            IdentedPredicate.variables(__var.substring(__var.indexOf("<=") + 2), ret);
        } else if (0 < __var.indexOf('<')){
            const prefix: string = __var.substring(0, __var.indexOf('<'));
            IdentedPredicate.variables(prefix, ret);
            IdentedPredicate.variables(__var.substring(__var.indexOf('<') + 1), ret);
        } else if (0 < __var.indexOf('=')){
            const prefix: string = __var.substring(0, __var.indexOf('='));
            IdentedPredicate.variables(prefix, ret);
            IdentedPredicate.variables(__var.substring(__var.indexOf('=') + 1), ret);
        } else if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(__var, "^")){
            IdentedPredicate.variables(__var.substring(0, __var.length - 1), ret);
        } else {
            let pos: number = __var.lastIndexOf('-');
            const pos2: number = __var.lastIndexOf('+');
            if (pos < pos2)pos = pos2;
            if (0 < pos){
                const suffix: string = __var.substring(pos);
                if (ParseInt.isInt(suffix)){
                    IdentedPredicate.variables(__var.substring(0, pos), ret);
                }
            }
        }
    }

    /**
     * 
     * @param {string[]} ret
     */
    public signature(ret: Array<string>) {
        this.variables(ret, false);
    }

    public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
        return null;
    }

    /**
     * 
     * @param {string[]} independentAttributes
     */
    public adjustIsFunFlag(independentAttributes: Array<string>) {
    }

    public abstract dependencies(): any;
    public abstract eval(attributePositions?: any, tuple?: any, src?: any, varDefs?: any): any;
    public abstract isRelated(var1?: any, var2?: any, varDefs?: any): any;
    constructor() {
    }
}
IdentedPredicate["__class"] = "oracle.dbtools.arbori.IdentedPredicate";
IdentedPredicate["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



/**
 * Comparing head or tail of one node with the other (or bind var, for that matter).
 * Or arithmetic expression
 * @class
 */
export abstract class Position {
    master: PositionalRelation;

    setMaster(master: PositionalRelation) {
        this.master = master;
    }

    name: string;

    constructor(name: string) {
        if (this.master === undefined) { this.master = null; }
        this.name = null;
        if (name == null)return;
        this.setName(name);
    }

    public setName(name: string) {
        this.name = name.trim();
        const len: number = this.name.length;
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.name.charAt(0)) == '('.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.name.charAt(len - 1)) == ')'.charCodeAt(0))this.name = this.name.substring(1, len - 1);
    }

    abstract eval(attributePositions: any, tuple: ParseNode[], varDefs: any): number;

    public clone(): Position {
        try {
            const ctor: Constructor<any> = (<any>this.constructor).getDeclaredConstructor(String);
            const ret: Position = <any>ctor.newInstance(this.name);
            ret.master = this.master;
            return ret;
        } catch(e) {
            throw Object.defineProperty(new Error("Position clone() reflection failed: " + e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }
}
Position["__class"] = "oracle.dbtools.arbori.Position";

/** Arithmetic offset applied to a node boundary or bind variable. */
export class Composite extends Position {
    child: Position;
    addendum: number;

    constructor(child: Position, addendum: number) {
        super(child.name);
        this.child = child;
        this.addendum = addendum;
    }

    public eval(attributePositions: any, tuple: ParseNode[], varDefs: any): number {
        return this.child.eval(attributePositions, tuple, varDefs) + this.addendum;
    }

    public toString(): string {
        return this.addendum + "+" + this.child.toString();
    }

    public setMaster(master: PositionalRelation): void {
        super.setMaster(master);
        this.child.setMaster(master);
    }

    public clone(): Position {
        return new Composite(this.child, this.addendum);
    }
}
Composite["__class"] = "oracle.dbtools.arbori.Composite";


export class JSFunc implements Predicate {
    name: string;

    program: Program;

    args: Array<string>;

    public constructor(name: string, program: Program, args: Array<string>) {
        if (this.name === undefined) { this.name = null; }
        if (this.program === undefined) { this.program = null; }
        if (this.args === undefined) { this.args = null; }
        this.name = name;
        this.program = program;
        this.args = args;
    }

    public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, t: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
        try {
            const tuple: Record<string, ParseNode> = {};
            for (const colName of Object.keys(attributePositions)) {
                tuple[colName] = t[attributePositions[colName]];
            }
            const runtimeProgram = this.program as any;
            const globals = runtimeProgram.getGlobals?.();
            const hostMethod = runtimeProgram.struct?.[this.name];
            if (typeof hostMethod === "function") {
                const result = hostMethod.call(runtimeProgram.struct, attributePositions, t, src);
                if (typeof result !== "boolean") throw new TypeError(`Arbori callback ${this.name} must return boolean`);
                return result;
            }
            const callback = globals?.get?.(this.name) ?? (globalThis as any)[this.name];
            if (typeof callback !== "function") return true;
            globals?.put?.("tuple", tuple);
            if (this.args.length > 2) throw new Error(`Wrong number of arguments (=${this.args.length})`);
            const result = callback(...this.args);
            if (typeof result !== "boolean") throw new TypeError(`Arbori callback ${this.name} must return boolean`);
            return result;
        } catch (error) {
            console.error(error instanceof Error ? error.message : String(error));
            return false;
        }
    }

    public eval(attributePositions?: any, t?: any, src?: any, varDefs?: any): any {
        if (attributePositions instanceof Parsed && t === undefined) {
            return this.eval$oracle_dbtools_parser_Parsed(attributePositions);
        }
        return this.eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions, t, src, varDefs);
    }

    public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
        const runtimeProgram = this.program as any;
        const globals = runtimeProgram.getGlobals?.();
        const hostMethod = runtimeProgram.struct?.[this.name];
        if (typeof hostMethod === "function") {
            const result = hostMethod.call(runtimeProgram.struct);
            if (typeof result !== "boolean") throw new TypeError(`Arbori callback ${this.name} must return boolean`);
            return result ? True.INSTANCE.eval$oracle_dbtools_parser_Parsed(target) : new False().eval$oracle_dbtools_parser_Parsed(target);
        }
        const callback = globals?.get?.(this.name) ?? (globalThis as any)[this.name];
        if (typeof callback !== "function") return new False().eval$oracle_dbtools_parser_Parsed(target);
        if (this.args.length > 2) throw new Error(`Wrong number of arguments (=${this.args.length})`);
        const result = callback(...this.args);
        if (typeof result !== "boolean") throw new TypeError(`Arbori callback ${this.name} must return boolean`);
        return result ? True.INSTANCE.eval$oracle_dbtools_parser_Parsed(target) : new False().eval$oracle_dbtools_parser_Parsed(target);
    }

    public toString(depth: number): string { return "." + this.name; }
    public variables(_ret: Array<string>, _optimizeEqs: boolean): void {}
    public signature(_ret: Array<string>): void {}
    public isRelated(_var1: string, _var2: string, _varDefs: any): Predicate { return null; }
    public dependencies(): any { return {}; }
    public adjustIsFunFlag(_independentAttributes: Array<string>): void {}
    }
    JSFunc["__class"] = "oracle.dbtools.arbori.JSFunc";
    JSFunc["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    /**
     * Composite expression build of primitive relations by operations of conjunction, disjunction, and negation
     * DIFFERENCE is not implemented yet
     * @enum
     * @property {Oper} CONJUNCTION
     * @property {Oper} DISJUNCTION
     * @property {Oper} NEGATION
     * @property {Oper} DIFFERENCE
     * @class
     */
    export enum Oper {
        CONJUNCTION, DISJUNCTION, NEGATION, DIFFERENCE
    }

    export class CompositeExpr implements Predicate {
        public __parent: any;
        lft: Predicate;

        rgt: Predicate;

        oper: Oper;

        public constructor(lft: Predicate, rgt: Predicate, oper: Oper) {
            if (this.lft === undefined) { this.lft = null; }
            if (this.rgt === undefined) { this.rgt = null; }
            if (this.oper === undefined) { this.oper = null; }
            this.lft = lft;
            this.rgt = rgt;
            this.oper = oper;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            if (this.oper === Oper.CONJUNCTION)return this.lft['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, tuple, src, varDefs) && this.rgt['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, tuple, src, varDefs);
            if (this.oper === Oper.DISJUNCTION)return this.lft['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, tuple, src, varDefs) || this.rgt['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, tuple, src, varDefs);
            if (this.oper === Oper.NEGATION)return !this.lft['eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map'](attributePositions, tuple, src, varDefs);
            throw Object.defineProperty(new Error("Unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }

        public eval(attributePositions?: any, tuple?: any, src?: any, varDefs?: any): any {
            if (((attributePositions != null && (attributePositions instanceof Object)) || attributePositions === null) && ((tuple != null && tuple instanceof <any>Array && (tuple.length == 0 || tuple[0] == null ||(tuple[0] != null && tuple[0] instanceof <any>ParseNode))) || tuple === null) && ((src != null && (src instanceof Array)) || src === null) && ((varDefs != null && (varDefs instanceof Object)) || varDefs === null)) {
                return <any>this.eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions, tuple, src, varDefs);
            } else if (((attributePositions != null && attributePositions instanceof <any>Parsed) || attributePositions === null) && tuple === undefined && src === undefined && varDefs === undefined) {
                return <any>this.eval$oracle_dbtools_parser_Parsed(attributePositions);
            } else throw new Error('invalid overload');
        }

        public toString$(): string {
            return this.toString$int(0);
        }

        public toString$int(depth: number): string {
            const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
            for(let i: number = 0; i < depth; i++) {/* append */(sb => { sb.str += <any>"  "; return sb; })(sb);}
            /* append */(sb => { sb.str += <any>Oper["_$wrappers"][this.oper].toString().substring(0, 4) + '\n'; return sb; })(sb);
            /* append */(sb => { sb.str += <any>this.lft.toString(depth + 1); return sb; })(sb);
            if (this.rgt != null)/* append */(sb => { sb.str += <any>this.rgt.toString(depth + 1); return sb; })(sb);
            return /* toString */sb.str;
        }

        public toString(depth?: any): string {
            if (((typeof depth === 'number') || depth === null)) {
                return <any>this.toString$int(depth);
            } else if (depth === undefined) {
                return <any>this.toString$();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @param {string[]} ret
         * @param {boolean} optimizeEqs
         */
        public variables(ret: Array<string>, optimizeEqs: boolean) {
            if (this.rgt == null){
                this.lft.variables(ret, optimizeEqs && this.oper === Oper.CONJUNCTION);
                return;
            }
            this.lft.variables(ret, optimizeEqs && this.oper === Oper.CONJUNCTION);
            this.rgt.variables(ret, optimizeEqs && this.oper === Oper.CONJUNCTION);
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            if (this.rgt == null){
                this.lft.signature(ret);
                return;
            }
            if (this.oper === Oper.CONJUNCTION){
                this.lft.signature(ret);
                this.rgt.signature(ret);
            } else if (this.oper === Oper.DISJUNCTION){
                const first: Array<string> = <any>([]);
                this.lft.signature(first);
                const second: Array<string> = <any>([]);
                this.rgt.signature(second);
                for(let index = 0; index < first.length; index++) {
                    let f = first[index];
                    for(let index1 = 0; index1 < second.length; index1++) {
                        let s = second[index1];
                        {
                            for(let i: number = f.indexOf('.'); 0 < i; i = f.indexOf('.', i + 1)) {f = f.substring(i + 1);}
                            for(let i: number = s.indexOf('.'); 0 < i; i = s.indexOf('.', i + 1)) {s = s.substring(i + 1);}
                            if (f === s)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, f);
                        }
                    }
                }
            } else if (this.oper === Oper.DIFFERENCE){
                this.lft.signature(ret);
            }
        }

        public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
            if (this.oper === Oper.DISJUNCTION){
                const l: MaterializedPredicate = this.lft['eval$oracle_dbtools_parser_Parsed'](target);
                if (l == null)return null;
                const r: MaterializedPredicate = this.rgt['eval$oracle_dbtools_parser_Parsed'](target);
                if (r == null)return null;
                return MaterializedPredicate.union(l, r);
            }
            if (this.oper === Oper.CONJUNCTION){
                const l: MaterializedPredicate = this.lft['eval$oracle_dbtools_parser_Parsed'](target);
                if (l == null)return null;
                const r: MaterializedPredicate = this.rgt['eval$oracle_dbtools_parser_Parsed'](target);
                if (r == null)return null;
                return MaterializedPredicate.join(l, r);
            }
            if (this.oper === Oper.DIFFERENCE){
                const l: MaterializedPredicate = this.lft['eval$oracle_dbtools_parser_Parsed'](target);
                if (l == null)return null;
                const r: MaterializedPredicate = this.rgt['eval$oracle_dbtools_parser_Parsed'](target);
                if (r == null)return null;
                return MaterializedPredicate.difference(l, r);
            }
            if (this.oper === Oper.NEGATION){
                const l: MaterializedPredicate = this.lft['eval$oracle_dbtools_parser_Parsed'](target);
                if (l == null)return null;
                if (0 < /* size */(<number>l.attributes.length))return null;
                if (/* size */(<number>l.tuples.length) === 0){
                    const ret: MaterializedPredicate = new MaterializedPredicate(<any>([]), target.getSrc(), "DEE");
                    ret.addContent([]);
                    return ret;
                } else return new MaterializedPredicate(<any>([]), target.getSrc(), "DUM");
            }
            return null;
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            if (this.oper !== Oper.CONJUNCTION && this.oper !== Oper.DISJUNCTION && this.oper !== Oper.NEGATION)return null;
            const l: Predicate = this.lft.isRelated(var1, var2, varDefs);
            let r: Predicate = null;
            if (this.oper !== Oper.NEGATION)r = this.rgt.isRelated(var1, var2, varDefs);
            if (l != null && r != null)return new CompositeExpr(l, r, this.oper);
            if (l == null && r != null && this.oper === Oper.CONJUNCTION)return r;
            if (l != null && r == null && this.oper === Oper.CONJUNCTION)return l;
            if (l != null && r == null && this.oper === Oper.NEGATION)return this;
            return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            if (this.oper === Oper.CONJUNCTION){
                const ret: any = this.lft.dependencies();
                Object.assign(ret, this.rgt.dependencies());
                return ret;
            }
            if (this.oper === Oper.DIFFERENCE){
                const ret: any = this.lft.dependencies();
                {
                    let array = /* keySet */Object.keys(this.rgt.dependencies());
                    for(let index = 0; index < array.length; index++) {
                        let s = array[index];
                        /* put */(ret[s] = false)
                    }
                }
                return ret;
            }
            if (this.oper === Oper.DISJUNCTION){
                if (this.rgt != null && this.rgt instanceof <any>MaterializedPredicate){
                    if ((<MaterializedPredicate><any>this.rgt).cardinality() === 0)return this.lft.dependencies();
                }
                if (this.lft != null && this.lft instanceof <any>MaterializedPredicate){
                    if ((<MaterializedPredicate><any>this.lft).cardinality() === 0)return this.rgt.dependencies();
                }
                const ret: any = <any>({});
                {
                    let array = /* keySet */Object.keys(this.lft.dependencies());
                    for(let index = 0; index < array.length; index++) {
                        let s = array[index];
                        /* put */(ret[s] = false)
                    }
                }
                {
                    let array = /* keySet */Object.keys(this.rgt.dependencies());
                    for(let index = 0; index < array.length; index++) {
                        let s = array[index];
                        /* put */(ret[s] = false)
                    }
                }
                return ret;
            }
            if (this.oper === Oper.NEGATION){
                const ret: any = <any>({});
                {
                    let array = /* keySet */Object.keys(this.lft.dependencies());
                    for(let index = 0; index < array.length; index++) {
                        let s = array[index];
                        /* put */(ret[s] = false)
                    }
                }
                return ret;
            }
            throw Object.defineProperty(new Error("Unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }

        /**
         * 
         * @param {string[]} independentAttributes
         */
        public adjustIsFunFlag(independentAttributes: Array<string>) {
            this.lft.adjustIsFunFlag(independentAttributes);
            if (this.rgt != null)this.rgt.adjustIsFunFlag(independentAttributes);
        }
    }
    CompositeExpr["__class"] = "oracle.dbtools.arbori.CompositeExpr";
    CompositeExpr["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    /**
     * A useful leaf to hang off the tree branch
     * Also used to evaluate boolean bind variables
     * @class
     */
    export class True implements Predicate {
        public __parent: any;
        static INSTANCE: True; public static INSTANCE_$LI$(): True { if (True.INSTANCE == null) { True.INSTANCE = new True(); }  return True.INSTANCE; }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            return true;
        }

        /**
         * 
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

        public toString$(): string {
            return "true";
        }

        public toString$int(depth: number): string {
            const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
            for(let i: number = 0; i < depth; i++) {/* append */(sb => { sb.str += <any>"  "; return sb; })(sb);}
            /* append */(sb => { sb.str += <any>this.toString$(); return sb; })(sb);
            /* append */(sb => { sb.str += <any>'\n'; return sb; })(sb);
            return /* toString */sb.str;
        }

        /**
         * 
         * @param {number} depth
         * @return {string}
         */
        public toString(depth?: any): string {
            if (((typeof depth === 'number') || depth === null)) {
                return <any>this.toString$int(depth);
            } else if (depth === undefined) {
                return <any>this.toString$();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @param {string[]} ret
         * @param {boolean} optimizeEqs
         */
        public variables(ret: Array<string>, optimizeEqs: boolean) {
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            this.variables(ret, false);
        }

        public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
            const ret: MaterializedPredicate = new MaterializedPredicate(<any>([]), target.getSrc(), "DEE");
            ret.addContent([]);
            return ret;
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            return <any>({});
        }

        /**
         * 
         * @param {string[]} independentAttributes
         */
        public adjustIsFunFlag(independentAttributes: Array<string>) {
        }

        constructor(__parent: any) {
            this.__parent = __parent;
        }
    }
    True["__class"] = "oracle.dbtools.arbori.True";
    True["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    export class False implements Predicate {
        public __parent: any;
        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            return false;
        }

        /**
         * 
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

        public toString$(): string {
            return "false";
        }

        public toString$int(depth: number): string {
            const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
            for(let i: number = 0; i < depth; i++) {/* append */(sb => { sb.str += <any>"  "; return sb; })(sb);}
            /* append */(sb => { sb.str += <any>this.toString$(); return sb; })(sb);
            /* append */(sb => { sb.str += <any>'\n'; return sb; })(sb);
            return /* toString */sb.str;
        }

        /**
         * 
         * @param {number} depth
         * @return {string}
         */
        public toString(depth?: any): string {
            if (((typeof depth === 'number') || depth === null)) {
                return <any>this.toString$int(depth);
            } else if (depth === undefined) {
                return <any>this.toString$();
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @param {string[]} ret
         * @param {boolean} optimizeEqs
         */
        public variables(ret: Array<string>, optimizeEqs: boolean) {
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            this.variables(ret, false);
        }

        public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
            const ret: MaterializedPredicate = new MaterializedPredicate(<any>([]), target.getSrc(), "DUM");
            return ret;
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            return <any>({});
        }

        /**
         * 
         * @param {string[]} independentAttributes
         */
        public adjustIsFunFlag(independentAttributes: Array<string>) {
        }

        constructor(__parent: any) {
            this.__parent = __parent;
        }
    }
    False["__class"] = "oracle.dbtools.arbori.False";
    False["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    export class Header implements Predicate {
        public __parent: any;
        attributes: Array<string>;

        constructor(attributes: Array<string>) {
            if (this.attributes === undefined) { this.attributes = null; }
            this.attributes = attributes;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            return false;
        }

        /**
         * 
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

        public toString$(): string {
            return "[" + /* toString */('['+this.attributes.join(', ')+']') + "...]";
        }

        public toString$int(depth: number): string {
            const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
            for(let i: number = 0; i < depth; i++) {/* append */(sb => { sb.str += <any>"  "; return sb; })(sb);}
            /* append */(sb => { sb.str += <any>this.toString$(); return sb; })(sb);
            /* append */(sb => { sb.str += <any>'\n'; return sb; })(sb);
            return /* toString */sb.str;
        }

        /**
         * 
         * @param {number} depth
         * @return {string}
         */
        public toString(depth?: any): string {
            if (((typeof depth === 'number') || depth === null)) {
                return <any>this.toString$int(depth);
            } else if (depth === undefined) {
                return <any>this.toString$();
            } else throw new Error('invalid overload');
        }

        /**
         * 
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

        public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
            const ret: MaterializedPredicate = new MaterializedPredicate(this.attributes, target.getSrc(), this.toString$());
            return ret;
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            return <any>({});
        }

        /**
         * 
         * @param {string[]} independentAttributes
         */
        public adjustIsFunFlag(independentAttributes: Array<string>) {
        }
    }
    Header["__class"] = "oracle.dbtools.arbori.Header";
    Header["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    /**
     * One of the most often used proposition, asserting that a node variable content includes a certain grammar symbol
     * @param {string} nodeVar
     * @param {number} content
     * @class
     * @extends IdentedPredicate
     */
    export class NodeContent extends IdentedPredicate {
        nodeVar: string;

        content: number;

        public constructor(nodeVar: string, content: number) {
            super();
            if (this.nodeVar === undefined) { this.nodeVar = null; }
            if (this.content === undefined) { this.content = 0; }
            this.nodeVar = nodeVar;
            this.content = content;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            const node: ParseNode = this.getNode(this.nodeVar, attributePositions, tuple, varDefs);
            if (node == null)return false;
            return node.contains$int(this.content);
        }

        /**
         * 
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

        public toString(depth?: any): string {
            if (((typeof depth === 'number') || depth === null)) {
                return super.toString(depth);
            } else if (depth === undefined) {
                return <any>this.toString$();
            } else throw new Error('invalid overload');
        }

        public toString$(): string {
            return "[" + this.nodeVar + ") " + this.content;
        }

        /**
         * 
         * @param {string[]} ret
         * @param {boolean} optimizeEqs
         */
        public variables(ret: Array<string>, optimizeEqs: boolean) {
            IdentedPredicate.variables(this.nodeVar, ret);
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            this.variables(ret, false);
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            const ret: any = <any>({});
            const pos: number = this.nodeVar.indexOf('.');
            if (0 < pos)/* put */(ret[this.nodeVar.substring(0, pos)] = true);
            return ret;
        }

        /**
         * 
         * @param {string[]} independentAttributes
         */
        public adjustIsFunFlag(independentAttributes: Array<string>) {
        }
    }
    NodeContent["__class"] = "oracle.dbtools.arbori.NodeContent";
    NodeContent["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    /**
     * Nodes with the same lexical content. Example: PL/SQL variable declaration and usage
     * @param {string} nodeVar1
     * @param {string} nodeVar2
     * @class
     * @extends IdentedPredicate
     */
    export class NodesWMatchingSrc extends IdentedPredicate {
        public __parent: any;
        nodeVar1: string;

        nodeVar2: string;

        public constructor(nodeVar1: string, nodeVar2: string) {
            super();
            if (this.nodeVar1 === undefined) { this.nodeVar1 = null; }
            if (this.nodeVar2 === undefined) { this.nodeVar2 = null; }
            this.nodeVar1 = nodeVar1;
            this.nodeVar2 = nodeVar2;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            const node1: ParseNode = this.getNode(this.nodeVar1, attributePositions, tuple, varDefs);
            if (node1 == null)return false;
            const node2: ParseNode = this.getNode(this.nodeVar2, attributePositions, tuple, varDefs);
            if (node2 == null)return false;
            const content1: string = node1.content$java_util_List$java_lang_Boolean(src, true);
            const content2: string = node2.content$java_util_List$java_lang_Boolean(src, true);
            return /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(content1, content2);
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
            return "?" + this.nodeVar1 + " = ?" + this.nodeVar2;
        }

        public variables(ret: Array<string>, optimizeEqs: boolean) {
            IdentedPredicate.variables(this.nodeVar1, ret);
            IdentedPredicate.variables(this.nodeVar2, ret);
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            this.variables(ret, false);
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            const attr1: Attribute = getAttributeDefinition(varDefs, this.nodeVar1);
            const attr2: Attribute = getAttributeDefinition(varDefs, this.nodeVar2);
            if (attr1.isDependent(var1, varDefs) && attr2.isDependent(var2, varDefs) || attr2.isDependent(var1, varDefs) && attr1.isDependent(var2, varDefs))return this; else return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            const ret: any = <any>({});
            let pos: number = this.nodeVar1.indexOf('.');
            if (0 < pos)/* put */(ret[this.nodeVar1.substring(0, pos)] = true);
            pos = this.nodeVar2.indexOf('.');
            if (0 < pos)/* put */(ret[this.nodeVar2.substring(0, pos)] = true);
            return ret;
        }
    }
    NodesWMatchingSrc["__class"] = "oracle.dbtools.arbori.NodesWMatchingSrc";
    NodesWMatchingSrc["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    /**
     * Node matching specific literal
     * @param {string} nodeVar
     * @param {string} literal
     * @param {boolean} addWsDividers
     * @class
     * @extends IdentedPredicate
     */
    export class NodeMatchingSrc extends IdentedPredicate {
        public __parent: any;
        nodeVar: string;

        literal: string;

        addWsDividers: boolean;

        public constructor(nodeVar: string, literal: string, addWsDividers: boolean) {
            super();
            if (this.nodeVar === undefined) { this.nodeVar = null; }
            if (this.literal === undefined) { this.literal = null; }
            if (this.addWsDividers === undefined) { this.addWsDividers = null; }
            this.nodeVar = nodeVar;
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(literal.charAt(0)) != '\''.charCodeAt(0))throw Object.defineProperty(new Error("expected string literal"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            this.literal = literal.substring(1, literal.length - 1);
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(literal.charAt(1)) == '\''.charCodeAt(0))this.literal = this.literal.substring(1, this.literal.length - 1);
            this.addWsDividers = addWsDividers;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            const node: ParseNode = this.getNode(this.nodeVar, attributePositions, tuple, varDefs);
            if (node == null)return false;
            return /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(node.content$java_util_List(src), this.literal);
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
            return "?" + this.nodeVar + " = \'" + this.literal + "\'";
        }

        public variables(ret: Array<string>, optimizeEqs: boolean) {
            IdentedPredicate.variables(this.nodeVar, ret);
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            this.variables(ret, false);
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            const ret: any = <any>({});
            const pos: number = this.nodeVar.indexOf('.');
            if (0 < pos)/* put */(ret[this.nodeVar.substring(0, pos)] = true);
            return ret;
        }
    }
    NodeMatchingSrc["__class"] = "oracle.dbtools.arbori.NodeMatchingSrc";
    NodeMatchingSrc["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    /**
     * WIP:
     * Parent-child relationship between nodes (with one level extension to grandparent-grandchild)
     * @param {string} parent
     * @param {string} child
     * @param {number} level
     * @param {Program} program
     * @class
     * @extends IdentedPredicate
     */
    export class ParentChildNodes extends IdentedPredicate {
        public __parent: any;
        p: string;

        c: string;

        level: number;

        program: Program;

        public constructor(parent: string, child: string, level: number, program: Program) {
            super();
            if (this.p === undefined) { this.p = null; }
            if (this.c === undefined) { this.c = null; }
            this.level = 1;
            if (this.program === undefined) { this.program = null; }
            this.p = parent;
            this.c = child;
            this.level = level;
            this.program = program;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            const nodeP: ParseNode = this.getNode(this.p, attributePositions, tuple, varDefs);
            if (nodeP == null)return false;
            const nodeC: ParseNode = this.getNode(this.c, attributePositions, tuple, varDefs);
            if (nodeC == null)return false;
            if (this.level === 1)return nodeC.parent$() === nodeP; else if (this.level === 2)return nodeC.parent$().parent$() === nodeP;
            throw Object.defineProperty(new Error("Unexpected level = " + this.level), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
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
            return this.p + " = " + this.c + (this.level === 2 ? "^^" : "^");
        }

        /**
         * 
         * @param {string[]} ret
         * @param {boolean} optimizeEqs
         */
        public variables(ret: Array<string>, optimizeEqs: boolean) {
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, this.p + "=" + this.c + (this.level === 2 ? "^^" : "^"));
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            IdentedPredicate.variables(this.p, ret);
            IdentedPredicate.variables(this.c, ret);
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            const attr1: Attribute = getAttributeDefinition(varDefs, this.p);
            const attr2: Attribute = getAttributeDefinition(varDefs, this.c);
            if (attr1.isDependent(var1, varDefs) && attr2.isDependent(var2, varDefs) || attr2.isDependent(var1, varDefs) && attr1.isDependent(var2, varDefs))return this; else return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            const ret: any = <any>({});
            let pos: number = this.p.indexOf('.');
            if (0 < pos)/* put */(ret[this.p.substring(0, pos)] = true);
            pos = this.c.indexOf('.');
            if (0 < pos)/* put */(ret[this.c.substring(0, pos)] = true);
            return ret;
        }

        innerLoop(node: ParseNode, anc: MaterializedPredicate): Array<Tuple> {
            if (1 < anc.arity())throw Object.defineProperty(new Error("1 < anc.arity()"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            const ret: Array<Tuple> = <any>([]);
            let children: Array<ParseNode> = node.children();
            if (this.level === 2){
                const grandchildren: Array<ParseNode> = <any>([]);
                for(let index = 0; index < children.length; index++) {
                    let p = children[index];
                    /* addAll */((l1, l2) => l1.push.apply(l1, l2))(grandchildren, p.children())
                }
                children = grandchildren;
            }
            for(let index = 0; index < children.length; index++) {
                let p = children[index];
                {
                    const candidate: Tuple = new Tuple([p]);
                    if (/* contains */(anc.getTuples().indexOf(<any>(candidate)) >= 0))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, candidate);
                }
            }
            return ret;
        }
    }
    ParentChildNodes["__class"] = "oracle.dbtools.arbori.ParentChildNodes";
    ParentChildNodes["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    export class PositionalRelation extends IdentedPredicate {
        public __parent: any;
        a: Position;

        b: Position;

        prog: Program;

        isReflexive: boolean;

        isGT: boolean;

        public constructor(a: Position, b: Position, isReflexive: boolean, isGT: boolean, prog: Program) {
            super();
            if (this.a === undefined) { this.a = null; }
            if (this.b === undefined) { this.b = null; }
            if (this.prog === undefined) { this.prog = null; }
            if (this.isReflexive === undefined) { this.isReflexive = false; }
            if (this.isGT === undefined) { this.isGT = false; }
            this.prog = prog;
            this.a = a;
            this.a.setMaster(this);
            this.b = b;
            this.b.setMaster(this);
            this.isReflexive = isReflexive;
            this.isGT = isGT;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            if (this.isReflexive && this.isGT)return this.a.eval(attributePositions, tuple, varDefs) <= this.b.eval(attributePositions, tuple, varDefs); else if (this.isReflexive && !this.isGT)return this.a.eval(attributePositions, tuple, varDefs) === this.b.eval(attributePositions, tuple, varDefs); else if (!this.isReflexive && this.isGT)return this.a.eval(attributePositions, tuple, varDefs) < this.b.eval(attributePositions, tuple, varDefs); else throw Object.defineProperty(new Error("!isReflexive && !isGT"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
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
            return this.a.toString() + (this.isGT ? " <" : "") + (this.isReflexive ? "=" : "") + " " + this.b.toString();
        }

        public variables(ret: Array<string>, optimizeEqs: boolean) {
            if (!(this.a != null && this.a instanceof <any>BindVar))IdentedPredicate.variables(this.a.name, ret);
            if (!(this.b != null && this.b instanceof <any>BindVar))IdentedPredicate.variables(this.b.name, ret);
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            if ((this.a != null && this.a instanceof <any>BindVar) || (this.b != null && this.b instanceof <any>BindVar))return null;
            const attr1: Attribute = getAttributeDefinition(varDefs, this.a.name);
            const attr2: Attribute = getAttributeDefinition(varDefs, this.b.name);
            if (attr1.isDependent(var1, varDefs) && attr2.isDependent(var2, varDefs) || attr2.isDependent(var1, varDefs) && attr1.isDependent(var2, varDefs))return this; else return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            const ret: any = <any>({});
            let pos: number = this.a.name.indexOf('.');
            if (0 < pos)/* put */(ret[this.a.name.substring(0, pos)] = true);
            pos = this.b.name.indexOf('.');
            if (0 < pos)/* put */(ret[this.b.name.substring(0, pos)] = true);
            return ret;
        }
    }
    PositionalRelation["__class"] = "oracle.dbtools.arbori.PositionalRelation";
    PositionalRelation["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    export class ChildNumRelation extends IdentedPredicate {
        public __parent: any;
        size: number;

        nodeVar: string;

        prog: Program;

        isReflexive: boolean;

        isGT: boolean;

        public constructor(size: number, node: string, isReflexive: boolean, isGT: boolean, prog: Program) {
            super();
            if (this.size === undefined) { this.size = 0; }
            if (this.nodeVar === undefined) { this.nodeVar = null; }
            if (this.prog === undefined) { this.prog = null; }
            if (this.isReflexive === undefined) { this.isReflexive = false; }
            if (this.isGT === undefined) { this.isGT = false; }
            this.size = size;
            this.nodeVar = node;
            this.isReflexive = isReflexive;
            this.isGT = isGT;
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            const n: ParseNode = this.getNode(this.nodeVar, attributePositions, tuple, varDefs);
            if (this.isReflexive && this.isGT)return this.size <= /* size */(<number>n.children().length); else if (this.isReflexive && !this.isGT)return this.size === /* size */(<number>n.children().length); else if (!this.isReflexive && this.isGT)return this.size < /* size */(<number>n.children().length); else throw Object.defineProperty(new Error("!isReflexive && !isGT"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
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
            return this.size + " <" + (this.isReflexive ? "=" : "") + " #" + this.nodeVar;
        }

        public variables(ret: Array<string>, optimizeEqs: boolean) {
            IdentedPredicate.variables(this.nodeVar, ret);
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            this.variables(ret, false);
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            return null;
        }

        /**
         * 
         * @return {*}
         */
        public dependencies(): any {
            const ret: any = <any>({});
            const pos: number = this.nodeVar.indexOf('.');
            if (0 < pos)/* put */(ret[this.nodeVar.substring(0, pos)] = true);
            return ret;
        }
    }
    ChildNumRelation["__class"] = "oracle.dbtools.arbori.ChildNumRelation";
    ChildNumRelation["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    /**
     * Often, one have node variable or expression, and would like to specify it matching the same node
     * as the other variable or expression.
     * For example, the predicate  x^ = y^  asserts that nodes x and y are siblings.
     * 
     * Optimization: x = expr qualifies x as dependent variable and trivializes the predicate
     * (x is functionally dependent on vars in the expr)
     * @param {string} a
     * @param {string} b
     * @class
     * @extends IdentedPredicate
     */
    export class SameNodes extends IdentedPredicate {
        public __parent: any;
        a: string;

        b: string;

        isFunctional: boolean;

        public constructor(a: string, b: string) {
            super();
            if (this.a === undefined) { this.a = null; }
            if (this.b === undefined) { this.b = null; }
            this.isFunctional = false;
            this.a = a;
            this.b = b;
            let ref: string = Attribute.referredTo(a);
            if (ref == null){
                this.isFunctional = true;
                return;
            }
            ref = Attribute.referredTo(b);
            if (ref == null){
                this.isFunctional = true;
                return;
            }
        }

        public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
            if (this.isFunctional)return true;
            const nodeA: ParseNode = this.getNode(this.a, attributePositions, tuple, varDefs);
            if (nodeA == null)return false;
            const nodeB: ParseNode = this.getNode(this.b, attributePositions, tuple, varDefs);
            if (nodeB == null)return false;
            return nodeA.from === nodeB.from && nodeA.to === nodeB.to;
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
            return this.a + " = " + this.b;
        }

        public variables(ret: Array<string>, optimizeEqs: boolean) {
            if (optimizeEqs)IdentedPredicate.variables(this.a + "=" + this.b, ret); else {
                this.isFunctional = false;
                IdentedPredicate.variables(this.a, ret);
                IdentedPredicate.variables(this.b, ret);
            }
        }

        /**
         * 
         * @param {string[]} ret
         */
        public signature(ret: Array<string>) {
            IdentedPredicate.variables(this.a, ret);
            IdentedPredicate.variables(this.b, ret);
        }

        /**
         * 
         * @param {string} nodeVar
         * @param {*} attributePositions
         * @param {oracle.dbtools.parser.ParseNode[]} tuple
         * @param {*} varDefs
         * @return {ParseNode}
         */
        getNode(nodeVar: string, attributePositions: any, tuple: ParseNode[], varDefs: any): ParseNode {
            try {
                return super.getNode(nodeVar, attributePositions, tuple, varDefs);
            } catch(e) {
                if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(e.message, Predicate.UNASSIGNED_VAR)){
                    if (/* contains */(this.a.indexOf("^") != -1) || /* contains */(this.a.indexOf("+1") != -1) || /* contains */(this.a.indexOf("-1") != -1) || /* contains */(this.b.indexOf("^") != -1) || /* contains */(this.b.indexOf("+1") != -1) || /* contains */(this.b.indexOf("-1") != -1))return null;
                }
                throw e;
            }
        }

        /**
         * 
         * @param {string} var1
         * @param {string} var2
         * @param {*} varDefs
         * @return {*}
         */
        public isRelated(var1: string, var2: string, varDefs: any): Predicate {
            const attr1: Attribute = getAttributeDefinition(varDefs, this.a);
            const attr2: Attribute = getAttributeDefinition(varDefs, this.b);
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
            pos = this.b.indexOf('.');
            if (0 < pos)/* put */(ret[this.b.substring(0, pos)] = true);
            return ret;
        }

        /**
         * 
         * @param {string[]} independentVars
         */
        public adjustIsFunFlag(independentVars: Array<string>) {
            if (!this.isFunctional)return;
            if (!/* contains */(independentVars.indexOf(<any>(this.a)) >= 0) && !/* contains */(independentVars.indexOf(<any>(this.b)) >= 0))this.isFunctional = false;
        }
    }
    SameNodes["__class"] = "oracle.dbtools.arbori.SameNodes";
    SameNodes["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



    export class Head extends Position {
        public __parent: any;
        constructor(name: string) {
            super(name);
        }

        /**
         * 
         * @param {*} attributePositions
         * @param {oracle.dbtools.parser.ParseNode[]} tuple
         * @param {*} varDefs
         * @return {number}
         */
        public eval(attributePositions: any, tuple: ParseNode[], varDefs: any): number {
            const nodeA: ParseNode = this.master.getNode(this.name, attributePositions, tuple, varDefs);
            if (nodeA == null)return -1;
            return nodeA.from;
        }

        /**
         * 
         * @return {string}
         */
        public toString(): string {
            return "[" + this.name;
        }
    }
    Head["__class"] = "oracle.dbtools.arbori.Head";


    export class Tail extends Position {
        public __parent: any;
        constructor(name: string) {
            super(name);
        }

        /**
         * 
         * @param {*} attributePositions
         * @param {oracle.dbtools.parser.ParseNode[]} tuple
         * @param {*} varDefs
         * @return {number}
         */
        public eval(attributePositions: any, tuple: ParseNode[], varDefs: any): number {
            const nodeA: ParseNode = this.master.getNode(this.name, attributePositions, tuple, varDefs);
            if (nodeA == null)return -2;
            return nodeA.to;
        }

        /**
         * 
         * @return {string}
         */
        public toString(): string {
            return this.name + ")";
        }
    }
    Tail["__class"] = "oracle.dbtools.arbori.Tail";


    export class BindVar extends Position {
        public __parent: any;
        constructor(name: string) {
            super(name);
        }

        /**
         * 
         * @param {*} attributePositions
         * @param {oracle.dbtools.parser.ParseNode[]} tuple
         * @param {*} varDefs
         * @return {number}
         */
        public eval(attributePositions: any, tuple: ParseNode[], varDefs: any): number {
            const program = this.master.prog as any;
            const globals = program.getGlobals?.();
            const globalValue = globals?.get?.(this.name);
            if (typeof globalValue === "number" && Number.isInteger(globalValue)) return globalValue;
            if (typeof globalValue === "string") {
                const parsed = ParseInt.parseInt(globalValue);
                if (parsed !== null) return parsed;
            }

            for (const owner of [program, program.struct]) {
                const value = owner?.[this.name];
                if (typeof value === "number" && Number.isInteger(value)) return value;
                if (typeof value === "string") {
                    const parsed = ParseInt.parseInt(value);
                    if (parsed !== null) return parsed;
                }
            }
            throw new Error(`Bind var '${this.name}' not found`);
        }

        public toString(): string {
            return ":" + this.name;
        }
    }
        BindVar["__class"] = "oracle.dbtools.arbori.BindVar";





