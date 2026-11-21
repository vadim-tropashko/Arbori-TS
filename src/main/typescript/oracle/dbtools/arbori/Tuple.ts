/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParseNode } from '../parser/ParseNode';

export class Tuple {
    values: ParseNode[];

    public constructor(attributes: ParseNode[]) {
        if (this.values === undefined) { this.values = null; }
        this.values = attributes;
    }

    /**
     * 
     * @param {Tuple} o
     * @return {number}
     */
    public compareTo(o: Tuple): number {
        for(let i: number = 0; i < this.values.length; i++) {{
            if (this.values[i] == null && o.values[i] == null)continue;
            if (this.values[i] == null)return -1;
            if (o.values[i] == null)return 1;
            const cmp: number = this.values[i].compareTo(o.values[i]);
            if (cmp !== 0)return cmp;
        };}
        return 0;
    }

    /**
     * 
     * @param {*} obj
     * @return {boolean}
     */
    public equals(obj: any): boolean {
        if (this === obj)return true;
        if (!(obj != null && obj instanceof <any>Tuple))return false;
        const other: Tuple = <Tuple>obj;
        if (this.values.length !== other.values.length)return false;
        for(let i: number = 0; i < this.values.length; i++) {{
            const left: ParseNode = this.values[i];
            const right: ParseNode = other.values[i];
            if (left == null && right == null)continue;
            if (left == null || right == null)return false;
            if (left.from !== right.from || left.to !== right.to)return false;
        };}
        return true;
    }

    /**
     * 
     * @return {number}
     */
    public hashCode(): number {
        let result: number = 1;
        for(let index = 0; index < this.values.length; index++) {
            let node = this.values[index];
            {
                const h: number = (node == null) ? 0 : /* hash */0;
                result = 31 * result + h;
            }
        }
        return result;
    }

    /**
     * Utility method to convert a object representtion into a map
     * This is useful because arbori callback methods represent tuple as Map<String,ParseNode>
     * While explicit iteration MaterializedPredicate.getTuples() returns collection of Tuples
     * @param {MaterializedPredicate} container
     * @return
     * @return {*}
     */
    public decode(container: MaterializedPredicate): any {
        const tuple: any = <any>({});
        for(let j: number = 0; j < container.arity(); j++) {{
            const colName: string = container.getAttribute$int(j);
            const node: ParseNode = container.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(this, colName);
            /* put */(tuple[colName] = node);
        };}
        return tuple;
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        const ret: { str: string, toString: Function } = { str: "<", toString: function() { return this.str; } };
        for(let i: number = 0; i < this.values.length; i++) {{
            if (i > 0)/* append */(sb => { sb.str += <any>","; return sb; })(ret);
            /* append */(sb => { sb.str += <any>this.values[i].interval(); return sb; })(ret);
        };}
        return /* toString */ret.str + ">";
    }
}
Tuple["__class"] = "oracle.dbtools.arbori.Tuple";




import { MaterializedPredicate } from './MaterializedPredicate';

