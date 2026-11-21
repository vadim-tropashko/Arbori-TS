/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerToken } from '../parser/LexerToken';
import { ParseNode } from '../parser/ParseNode';
import { Parsed } from '../parser/Parsed';

export class AggregatePredicate implements Predicate {
    /*private*/ type: AggregatePredicate.Type;

    attribute: string;

    predicate: Predicate;

    /*private*/ ancestor: number;

    public constructor(attribute?: any, predicate?: any, type?: any) {
        if (((typeof attribute === 'string') || attribute === null) && ((predicate != null && (predicate.constructor != null && predicate.constructor["__interfaces"] != null && predicate.constructor["__interfaces"].indexOf("oracle.dbtools.arbori.Predicate") >= 0)) || predicate === null) && ((typeof type === 'number') || type === null)) {
            let __args = arguments;
            if (this.type === undefined) { this.type = null; } 
            if (this.attribute === undefined) { this.attribute = null; } 
            if (this.predicate === undefined) { this.predicate = null; } 
            this.ancestor = -1;
            const signature: Array<string> = <any>([]);
            predicate.signature(signature);
            if (!/* contains */(signature.indexOf(<any>(attribute)) >= 0)){
                let found: boolean = false;
                for(let index = 0; index < signature.length; index++) {
                    let attr = signature[index];
                    {
                        const pos: number = attr.indexOf('.');
                        if (0 < pos){
                            attr = attr.substring(pos + 1);
                            if (attr === attribute){
                                found = true;
                                break;
                            }
                        }
                    }
                }
                if (!found)throw Object.defineProperty(new Error("missing " + attribute + " in " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(signature) + ""), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
            this.type = type;
            this.attribute = attribute;
            this.predicate = predicate;
        } else if (((typeof attribute === 'string') || attribute === null) && ((typeof predicate === 'number') || predicate === null) && ((type != null && (type.constructor != null && type.constructor["__interfaces"] != null && type.constructor["__interfaces"].indexOf("oracle.dbtools.arbori.Predicate") >= 0)) || type === null)) {
            let __args = arguments;
            let descendant: any = __args[0];
            let ancestor: any = __args[1];
            let predicate: any = __args[2];
            {
                let __args = arguments;
                let attribute: any = descendant;
                let type: any = AggregatePredicate.Type.DESCENDANT;
                if (this.type === undefined) { this.type = null; } 
                if (this.attribute === undefined) { this.attribute = null; } 
                if (this.predicate === undefined) { this.predicate = null; } 
                this.ancestor = -1;
                const signature: Array<string> = <any>([]);
                predicate.signature(signature);
                if (!/* contains */(signature.indexOf(<any>(attribute)) >= 0)){
                    let found: boolean = false;
                    for(let index = 0; index < signature.length; index++) {
                        let attr = signature[index];
                        {
                            const pos: number = attr.indexOf('.');
                            if (0 < pos){
                                attr = attr.substring(pos + 1);
                                if (attr === attribute){
                                    found = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!found)throw Object.defineProperty(new Error("missing " + attribute + " in " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(signature) + ""), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
                this.type = type;
                this.attribute = attribute;
                this.predicate = predicate;
            }
            if (this.type === undefined) { this.type = null; } 
            if (this.attribute === undefined) { this.attribute = null; } 
            if (this.predicate === undefined) { this.predicate = null; } 
            this.ancestor = -1;
            (() => {
                this.ancestor = ancestor;
            })();
        } else if (((attribute != null && attribute instanceof <any>AggregatePredicate) || attribute === null) && predicate === undefined && type === undefined) {
            let __args = arguments;
            let source: any = __args[0];
            if (this.type === undefined) { this.type = null; } 
            if (this.attribute === undefined) { this.attribute = null; } 
            if (this.predicate === undefined) { this.predicate = null; } 
            this.ancestor = -1;
            this.type = source.type;
            this.attribute = source.attribute;
            this.predicate = source.predicate;
            this.ancestor = source.ancestor;
        } else throw new Error('invalid overload');
    }

    public eval$oracle_dbtools_parser_Parsed(target: Parsed): MaterializedPredicate {
        const table: MaterializedPredicate = this.predicate['eval$oracle_dbtools_parser_Parsed'](target);
        const col: number = table.getAttribute$java_lang_String(this.attribute);
        if (col == null)throw Object.defineProperty(new Error("Predicate " + table.name + " doesn\'t have " + this.attribute + " attribute"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        const ret: MaterializedPredicate = new MaterializedPredicate(table.attributes, target.getSrc(), table.name);
        for(let index = 0; index < table.tuples.length; index++) {
            let tuple = table.tuples[index];
            this.eval$oracle_dbtools_arbori_Tuple$java_util_Set$int(tuple, ret.tuples, col)
        }
        return ret;
    }

    eval$oracle_dbtools_arbori_Tuple$java_util_Set$int(tuple: Tuple, output: Array<Tuple>, col: number) {
        let inferior: Tuple = null;
        let superior: Tuple = null;
        for(let index = 0; index < output.length; index++) {
            let cmp = output[index];
            {
                let sameProjection: boolean = true;
                let inf: Tuple = null;
                let sup: Tuple = null;
                for(let i: number = 0; i < tuple.values.length; i++) {{
                    if (i === col){
                        const isEarlierDOD: boolean = tuple.values[col].to < cmp.values[col].to;
                        const isSameDOD: boolean = tuple.values[col].to === cmp.values[col].to;
                        const isLaterDOD: boolean = cmp.values[col].to < tuple.values[col].to;
                        const isEarlierDOB: boolean = tuple.values[col].from < cmp.values[col].from;
                        const isSameDOB: boolean = tuple.values[col].from === cmp.values[col].from;
                        const isLaterDOB: boolean = cmp.values[col].from < tuple.values[col].from;
                        switch((this.type)) {
                        case AggregatePredicate.Type.ANCESTOR:
                            if (isLaterDOD || isSameDOD && isEarlierDOB)if (isEarlierDOB || isSameDOB && isLaterDOD)inf = cmp;
                            if (isEarlierDOD || isSameDOD && isLaterDOB)if (isLaterDOB || isSameDOB && isEarlierDOD)sup = cmp;
                            break;
                        case AggregatePredicate.Type.DESCENDANT:
                            if (isEarlierDOD || isSameDOD && isLaterDOB)if (isLaterDOB || isSameDOB && isEarlierDOD)inf = cmp;
                            if (isLaterDOD || isSameDOD && isEarlierDOB)if (isEarlierDOB || isSameDOB && isLaterDOD)sup = cmp;
                            break;
                        case AggregatePredicate.Type.OLD:
                            if ((isEarlierDOD || isSameDOD) && (isEarlierDOB || isSameDOB))inf = cmp;
                            if ((isLaterDOD || isSameDOD) && (isLaterDOB || isSameDOB))sup = cmp;
                            break;
                        case AggregatePredicate.Type.YOUNG:
                            if ((isLaterDOD || isSameDOD) && (isLaterDOB || isSameDOB))inf = cmp;
                            if ((isEarlierDOD || isSameDOD) && (isEarlierDOB || isSameDOB))sup = cmp;
                            break;
                        }
                        continue;
                    }
                    if ((this.ancestor === -1 || this.ancestor === i) && (cmp.values[i].from !== tuple.values[i].from || cmp.values[i].to !== tuple.values[i].to)){
                        sameProjection = false;
                        break;
                    }
                };}
                if (sameProjection){
                    if (inferior == null)inferior = inf;
                    if (superior == null)superior = sup;
                }
            }
        }
        if (inferior != null)/* remove */(a => { let index = a.indexOf(inferior); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(output);
        if (superior == null)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(output, tuple);
    }

    /**
     * 
     * @param {number} depth
     * @return {string}
     */
    public toString(depth: number): string {
        const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < depth; i++) {/* append */(sb => { sb.str += <any>"  "; return sb; })(sb);}
        /* append */(sb => { sb.str += <any>this.attribute; return sb; })(sb);
        switch((this.type)) {
        case AggregatePredicate.Type.ANCESTOR:
            /* append */(sb => { sb.str += <any>"\\/"; return sb; })(sb);
            break;
        case AggregatePredicate.Type.DESCENDANT:
            /* append */(sb => { sb.str += <any>"/\\"; return sb; })(sb);
            break;
        case AggregatePredicate.Type.OLD:
            /* append */(sb => { sb.str += <any>"\\\\"; return sb; })(sb);
            break;
        case AggregatePredicate.Type.YOUNG:
            /* append */(sb => { sb.str += <any>"//"; return sb; })(sb);
            break;
        }
        /* append */(sb => { sb.str += <any>this.predicate.toString(depth); return sb; })(sb);
        return /* toString */sb.str;
    }

    public eval$java_util_Map$oracle_dbtools_parser_ParseNode_A$java_util_List$java_util_Map(attributePositions: any, tuple: ParseNode[], src: Array<LexerToken>, varDefs: any): boolean {
        throw Object.defineProperty(new Error("N/A"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
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
        } else if (((attributePositions != null && attributePositions instanceof <any>Tuple) || attributePositions === null) && ((tuple != null && (tuple instanceof Array)) || tuple === null) && ((typeof src === 'number') || src === null) && varDefs === undefined) {
            return <any>this.eval$oracle_dbtools_arbori_Tuple$java_util_Set$int(attributePositions, tuple, src);
        } else if (((attributePositions != null && attributePositions instanceof <any>Parsed) || attributePositions === null) && tuple === undefined && src === undefined && varDefs === undefined) {
            return <any>this.eval$oracle_dbtools_parser_Parsed(attributePositions);
        } else throw new Error('invalid overload');
    }

    /**
     * 
     * @param {string[]} ret
     * @param {boolean} optimizeEqs
     */
    public variables(ret: Array<string>, optimizeEqs: boolean) {
        this.predicate.variables(ret, false);
    }

    /**
     * 
     * @param {string[]} ret
     */
    public signature(ret: Array<string>) {
        this.predicate.signature(ret);
    }

    /**
     * 
     * @param {string} var1
     * @param {string} var2
     * @param {*} varDefs
     * @return {*}
     */
    public isRelated(var1: string, var2: string, varDefs: any): Predicate {
        return this.predicate.isRelated(var1, var2, varDefs);
    }

    /**
     * 
     * @return {*}
     */
    public dependencies(): any {
        return this.predicate.dependencies();
    }

    /**
     * 
     * @param {string[]} independentAttributes
     */
    public adjustIsFunFlag(independentAttributes: Array<string>) {
    }
}
AggregatePredicate["__class"] = "oracle.dbtools.arbori.AggregatePredicate";
AggregatePredicate["__interfaces"] = ["oracle.dbtools.arbori.Predicate"];



export namespace AggregatePredicate {

    export enum Type {
        ANCESTOR, DESCENDANT, OLD, YOUNG
    }
}




import { Attribute } from './Attribute';


import { Tuple } from './Tuple';


import { MaterializedPredicate } from './MaterializedPredicate';


import { Predicate } from './Predicate';

