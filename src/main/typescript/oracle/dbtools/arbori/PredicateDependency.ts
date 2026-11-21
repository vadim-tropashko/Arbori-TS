/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
/**
 * Transitively and reflectively closed dependency map
 * If predicate is dependent and reference is empty then skip evaluation of all dependents
 * 
 * Example: symantic_analysis.prg
 * 
 * Suppose "all aggregates" is empty. Then
 * 
 * "all aggregates"                      ----> "aggregate expr"
 * "columns&select_list&top_select_list" ----> "aggregate expr"
 * 
 * Therefore, "aggregate expr" would be empty regardless of "columns&select_list&top_select_list"
 * and "columns&select_list&top_select_list" evaluation can be simplified to endow it with empty content
 * 
 * However, if there is dependency which is not positive, then empty set heuristics doesn't work
 * 
 * 
 * @author Dim
 * @class
 */
export class PredicateDependency {
    forward: any;

    backward: any;

    isDependent(ref: string, def: string): boolean {
        if (ref === def)return true;
        const dependents: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.forward, ref);
        if (dependents == null)return false;
        return /* containsKey */dependents.hasOwnProperty(def);
    }

    isPositivelyDependent(ref: string, def: string): boolean {
        const dependents: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.forward, ref);
        if (dependents == null)return false;
        return true === /* get */((m,k) => m[k]===undefined?null:m[k])(dependents, def);
    }

    addDependency(ref: string, def: string, isPositive: boolean) {
        let bd: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.backward, def);
        if (bd == null){
            bd = <any>({});
            /* put */(this.backward[def] = bd);
        }
        /* put */(bd[def] = true);
        let fr: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.forward, ref);
        if (fr == null){
            fr = <any>({});
            /* put */(this.forward[ref] = fr);
        }
        /* put */(fr[ref] = true);
        let br: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.backward, ref);
        if (br == null){
            br = <any>({});
            /* put */(this.backward[ref] = br);
        }
        /* put */(br[ref] = true);
        let fd: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.forward, def);
        if (fd == null){
            fd = <any>({});
            /* put */(this.forward[def] = fd);
        }
        /* put */(fd[def] = true);
        const newForward: any = <any>({});
        const newBackward: any = <any>({});
        {
            let array = /* keySet */Object.keys(br);
            for(let index = 0; index < array.length; index++) {
                let from = array[index];
                {
                    let array1 = /* keySet */Object.keys(fd);
                    for(let index1 = 0; index1 < array1.length; index1++) {
                        let to = array1[index1];
                        {
                            const p1: boolean = /* get */((m,k) => m[k]===undefined?null:m[k])(br, from);
                            const p2: boolean = /* get */((m,k) => m[k]===undefined?null:m[k])(fd, to);
                            let dependents: any = /* get */((m,k) => m[k]===undefined?null:m[k])(newForward, from);
                            if (dependents == null){
                                dependents = <any>({});
                                /* put */(newForward[from] = dependents);
                            }
                            /* put */(dependents[to] = p1 && isPositive && p2);
                            let referents: any = /* get */((m,k) => m[k]===undefined?null:m[k])(newBackward, to);
                            if (referents == null){
                                referents = <any>({});
                                /* put */(newBackward[to] = referents);
                            }
                            /* put */(referents[from] = p1 && isPositive && p2);
                        }
                    }
                }
            }
        }
        {
            let array = /* keySet */Object.keys(newForward);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const existing: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.forward, key);
                    if (existing == null)/* put */(this.forward[key] = /* get */((m,k) => m[k]===undefined?null:m[k])(newForward, key)); else Object.assign(existing, /* get */((m,k) => m[k]===undefined?null:m[k])(newForward, key));
                }
            }
        }
        {
            let array = /* keySet */Object.keys(newBackward);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const existing: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.backward, key);
                    if (existing == null)/* put */(this.backward[key] = /* get */((m,k) => m[k]===undefined?null:m[k])(newBackward, key)); else Object.assign(existing, /* get */((m,k) => m[k]===undefined?null:m[k])(newBackward, key));
                }
            }
        }
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        {
            let array = /* keySet */Object.keys(this.forward);
            for(let index = 0; index < array.length; index++) {
                let from = array[index];
                {
                    let array1 = /* keySet */Object.keys(/* get */((m,k) => m[k]===undefined?null:m[k])(this.forward, from));
                    for(let index1 = 0; index1 < array1.length; index1++) {
                        let to = array1[index1];
                        /* append */(sb => { sb.str += <any>from + (/* get */((m,k) => m[k]===undefined?null:m[k])(/* get */((m,k) => m[k]===undefined?null:m[k])(this.forward, from), to) ? "+" : "-") + "->" + to + '\n'; return sb; })(sb)
                    }
                }
            }
        }
        return /* toString */sb.str;
    }

    public static main(args: string[]) {
        const pd: PredicateDependency = new PredicateDependency();
        pd.addDependency("1", "2", true);
        pd.addDependency("2", "3", true);
        pd.addDependency("0", "1", true);
        pd.addDependency("2", "4", false);
        console.info(pd);
    }

    constructor() {
        this.forward = <any>({});
        this.backward = <any>({});
    }
}
PredicateDependency["__class"] = "oracle.dbtools.arbori.PredicateDependency";




