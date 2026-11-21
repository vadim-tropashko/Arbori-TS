/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
/**
 * Represents a pair of values
 * 
 * @author cdivilly
 * @param <X>
 * first
 * @param <Y>
 * second
 * @param {*} first
 * @param {*} second
 * @class
 */
export class Pair<X, Y> {
    public constructor(first: X, second: Y) {
        if (this.__first === undefined) { this.__first = null; }
        if (this.__second === undefined) { this.__second = null; }
        this.__first = first;
        this.__second = second;
    }

    /**
     * 
     * @param {*} obj
     * @return {boolean}
     */
    public equals(obj: any): boolean {
        if (this === obj){
            return true;
        }
        if (obj == null){
            return false;
        }
        if ((<any>this.constructor) !== (<any>obj.constructor)){
            return false;
        }
        const other: Pair<any, any> = <Pair<any, any>>obj;
        if (this.__first == null){
            if (other.__first != null){
                return false;
            }
        } else if (!/* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(this.__first,other.__first))){
            return false;
        }
        if (this.__second == null){
            if (other.__second != null){
                return false;
            }
        } else if (!/* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(this.__second,other.__second))){
            return false;
        }
        return true;
    }

    public first(): X {
        return this.__first;
    }

    /**
     * 
     * @return {number}
     */
    public hashCode(): number {
        const prime: number = 31;
        let result: number = 1;
        result = prime * result + (this.__first == null ? 0 : /* hashCode */(<any>((o: any) => { if (o.hashCode) { return o.hashCode(); } else { return o.toString().split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0); }})(this.__first)));
        result = prime * result + (this.__second == null ? 0 : /* hashCode */(<any>((o: any) => { if (o.hashCode) { return o.hashCode(); } else { return o.toString().split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0); }})(this.__second)));
        return result;
    }

    public second(): Y {
        return this.__second;
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return "{" + this.__first + ", " + this.__second + "}";
    }

    public static pair<X, Y>(first: X, second: Y): Pair<X, Y> {
        return <any>(new Pair<X, Y>(first, second));
    }

    /*private*/ __first: X;

    /*private*/ __second: Y;
}
Pair["__class"] = "oracle.arbori.util.Pair";



