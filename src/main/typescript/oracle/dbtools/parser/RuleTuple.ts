/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
/**
 * class RuleTuple, example:
 * 
 * expr : expr '+' expr
 * expr : expr '*' expr
 * 
 * head rhs
 * ---- -----------------------
 * expr {"expr", "'+'", "expr"}
 * expr {"expr", "'*'", "expr"}
 * @param {string} h
 * @param {string[]} r
 * @class
 */
export class RuleTuple {
    public static readonly __class = "oracle.dbtools.parser.RuleTuple";
    static serialVersionUID: number = 1;

    public head: string;

    public rhs: string[];

    public constructor(h?: any, r?: any) {
        if (((typeof h === 'string') || h === null) && ((r != null && (r instanceof Array)) || r === null)) {
            let __args = arguments;
            if (this.head === undefined) { this.head = null; } 
            if (this.rhs === undefined) { this.rhs = null; } 
            this.head = h;
            if (r === null) {
                this.rhs = null;
                return;
            }
            this.rhs = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>r.length));
            let i: number = 0;
            for(let index = 0; index < r.length; index++) {
                let t = r[index];
                this.rhs[i++] = t
            }
        } else if (((typeof h === 'string') || h === null) && ((r != null && r instanceof <any>Array && (r.length == 0 || r[0] == null ||(typeof r[0] === 'string'))) || r === null)) {
            let __args = arguments;
            if (this.head === undefined) { this.head = null; } 
            if (this.rhs === undefined) { this.rhs = null; } 
            this.head = h;
            this.rhs = r;
        } else throw new Error('invalid overload');
    }

    public equals(obj: any): boolean {
        return this.compareTo(obj) === 0;
    }

    public hashCode(): number {
        throw Object.defineProperty(new Error("hashCode inconsistent with equals"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
    }

    /**
     * 
     * @param {*} obj
     * @return {number}
     */
    public compareTo(obj: any): number {
        const src = obj as RuleTuple;
        let cmp = this.head == null ? 0 : this.head < src.head ? -1 : this.head > src.head ? 1 : 0;
        if (cmp !== 0) return cmp;

        const length = Math.min(this.rhs.length, src.rhs.length);
        for (let i = 0; i < length; i++) {
            cmp = this.rhs[i] < src.rhs[i] ? -1 : this.rhs[i] > src.rhs[i] ? 1 : 0;
            if (cmp !== 0) return cmp;
        }
        return this.rhs.length - src.rhs.length;
    }

    public ignore(keyword: string, bra: string, ket: string): boolean {
        let enteredBrackets = false;
        for (const token of this.rhs) {
            if (token === bra) enteredBrackets = true;
            if (enteredBrackets && token === keyword) return true;
            if (token === ket) return false;
        }
        return false;
    }

    public renameSymbols(from: string, to: string): void {
        if (this.head === from) this.head = to;
        for (let i = 0; i < this.rhs.length; i++) {
            if (this.rhs[i] === from) this.rhs[i] = to;
        }
    }

    public toUpperKeywords(): void {
        for (let i = 0; i < this.rhs.length; i++) {
            if (this.rhs[i].startsWith("'")) this.rhs[i] = this.rhs[i].toUpperCase();
        }
    }

    public toString(): string {
        return (this.head == null ? "" : `${this.head}:`) + this.rhs.map(token => ` ${token}`).join("");
    }

    public toHTML(predecessor: RuleTuple | null): string {
        const head = predecessor == null || predecessor.head !== this.head
            ? `${this.head}:${RuleTuple.identln(12 - this.head.length - 2, " ")}`
            : RuleTuple.identln(10, "| ");
        return head + this.rhs.map(token => ` ${token}`).join("");
    }

    public static identln(level: number, text: string): string {
        return " ".repeat(Math.max(0, level)) + text;
    }

    public static printRules(rules: Iterable<RuleTuple>): void {
        let predecessor: RuleTuple | null = null;
        for (const rule of rules) {
            console.log(rule.toHTML(predecessor));
            predecessor = rule;
        }
    }
}
