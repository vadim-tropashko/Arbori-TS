/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { SqlEarley } from './plsql/SqlEarley.js';
import { DocURL } from './plsql/doc/DocURL.js';
import { HarvestDoc } from './plsql/doc/HarvestDoc.js';
import { Service } from '../../arbori/util/Service.js';
import { RuleTuple } from './RuleTuple.js';

/**
 * *Partially* recognized tuple
 * @author Dim
 * @param {string} head
 * @param {java.lang.String[]} rhs
 * @param {number} pos
 * @param {number} x
 * @param {number} y
 * @param {number} factor
 * @class
 * @extends RuleTuple
 */
export class RecognizedRule extends RuleTuple {
    public X: number;

    public Y: number;

    public weight: number;

    public pos: number;

    public constructor(head?: any, rhs?: any, pos?: any, x?: any, y?: any, factor?: any) {
        if (((typeof head === 'string') || head === null) && ((rhs != null && rhs instanceof <any>Array && (rhs.length == 0 || rhs[0] == null ||(typeof rhs[0] === 'string'))) || rhs === null) && ((typeof pos === 'number') || pos === null) && ((typeof x === 'number') || x === null) && ((typeof y === 'number') || y === null) && ((typeof factor === 'number') || factor === null)) {
            let __args = arguments;
            super(head, <string[]>null);
            if (this.pos === undefined) { this.pos = 0; } 
            this.X = -1;
            this.Y = -1;
            this.weight = 0;
            this.pos = pos;
            let len: number = rhs.length;
            if (pos + 2 <= len){
                len = pos + 2;
                this.rhs = (s => { let a=[]; while(s-->0) a.push(null); return a; })(len);
                for(let i: number = 0; i < pos + 1; i++) {this.rhs[i] = rhs[i];}
                this.rhs[pos + 1] = "...";
            } else this.rhs = rhs;
            this.X = x;
            this.Y = y;
            this.weight = 1 * factor;
            try {
                const h: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, head);
                const s: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, rhs[pos]);
                const w: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.getFrequencies(), Service.lPair(s, h));
                if (w != null)this.weight += w * factor;
            } catch(e) {
            }
        } else if (((head != null && head instanceof <any>RecognizedRule) || head === null) && ((typeof rhs === 'number') || rhs === null) && ((pos != null && pos instanceof <any>Array && (pos.length == 0 || pos[0] == null ||(typeof pos[0] === 'number'))) || pos === null) && ((typeof x === 'number') || x === null) && y === undefined && factor === undefined) {
            let __args = arguments;
            let src: any = __args[0];
            let at: any = __args[1];
            let replacement: any = __args[2];
            let parent: any = __args[3];
            super(src.head, <string[]>null);
            if (this.pos === undefined) { this.pos = 0; } 
            this.X = -1;
            this.Y = -1;
            this.weight = 0;
            if (at < src.pos)this.pos = src.pos + replacement.length - 1; else this.pos = src.pos;
            let len: number = src.rhs.length + replacement.length - 1;
            if (this.pos + 2 <= len)len = this.pos + 2;
            this.rhs = (s => { let a=[]; while(s-->0) a.push(null); return a; })(len);
            for(let i: number = 0; i < at; i++) {this.rhs[i] = src.rhs[i];}
            for(let i: number = 0; i < replacement.length && at + i < len; i++) {this.rhs[at + i] = SqlEarley.getInstance().allSymbols[replacement[i]];}
            for(let i: number = at + 1; i < src.rhs.length && i + replacement.length - 1 < len; i++) {this.rhs[i + replacement.length - 1] = src.rhs[i];}
            if (len === this.pos + 2)this.rhs[len - 1] = "...";
            this.X = src.X;
            this.Y = src.Y;
            this.weight = (n => n<0?Math.ceil(n):Math.floor(n))(src.weight / 2);
            try {
                if (0 < parent){
                    const w: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.getFrequencies(), Service.lPair(replacement[0], parent));
                    if (w != null)this.weight += w;
                }
            } catch(e) {
            }
        } else if (((head != null && head instanceof <any>RecognizedRule) || head === null) && ((rhs != null && rhs instanceof <any>Array && (rhs.length == 0 || rhs[0] == null ||(typeof rhs[0] === 'string'))) || rhs === null) && ((typeof pos === 'string') || pos === null) && x === undefined && y === undefined && factor === undefined) {
            let __args = arguments;
            let src: any = __args[0];
            let replacement: any = __args[1];
            let head: any = __args[2];
            super(src.head, <string[]>null);
            if (this.pos === undefined) { this.pos = 0; } 
            this.X = -1;
            this.Y = -1;
            this.weight = 0;
            let len: number = src.rhs.length - src.pos + replacement.length;
            this.pos = replacement.length;
            if (this.pos + 2 <= len)len = this.pos + 2;
            this.rhs = (s => { let a=[]; while(s-->0) a.push(null); return a; })(len);
            for(let i: number = 0; i < this.pos; i++) {this.rhs[i] = replacement[i];}
            for(let i: number = this.pos; i < this.rhs.length; i++) {this.rhs[i] = src.rhs[i - this.pos + src.pos];}
            if (len === this.pos + 2)this.rhs[len - 1] = "...";
            this.X = src.X;
            this.Y = src.Y;
            this.weight = (n => n<0?Math.ceil(n):Math.floor(n))(src.weight / 2);
            try {
                if (head != null){
                    const h: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, head);
                    const s: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, this.rhs[this.pos]);
                    const w: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.getFrequencies(), Service.lPair(s, h));
                    if (w != null)this.weight += w;
                }
            } catch(e) {
            }
        } else if (((head != null && head instanceof <any>RecognizedRule) || head === null) && ((typeof rhs === 'number') || rhs === null) && ((pos != null && pos instanceof <any>Array && (pos.length == 0 || pos[0] == null ||(typeof pos[0] === 'number'))) || pos === null) && x === undefined && y === undefined && factor === undefined) {
            let __args = arguments;
            let src: any = __args[0];
            let at: any = __args[1];
            let replacement: any = __args[2];
            {
                let __args = arguments;
                let parent: any = -1;
                super(src.head, <string[]>null);
                if (this.pos === undefined) { this.pos = 0; } 
                this.X = -1;
                this.Y = -1;
                this.weight = 0;
                if (at < src.pos)this.pos = src.pos + replacement.length - 1; else this.pos = src.pos;
                let len: number = src.rhs.length + replacement.length - 1;
                if (this.pos + 2 <= len)len = this.pos + 2;
                this.rhs = (s => { let a=[]; while(s-->0) a.push(null); return a; })(len);
                for(let i: number = 0; i < at; i++) {this.rhs[i] = src.rhs[i];}
                for(let i: number = 0; i < replacement.length && at + i < len; i++) {this.rhs[at + i] = SqlEarley.getInstance().allSymbols[replacement[i]];}
                for(let i: number = at + 1; i < src.rhs.length && i + replacement.length - 1 < len; i++) {this.rhs[i + replacement.length - 1] = src.rhs[i];}
                if (len === this.pos + 2)this.rhs[len - 1] = "...";
                this.X = src.X;
                this.Y = src.Y;
                this.weight = (n => n<0?Math.ceil(n):Math.floor(n))(src.weight / 2);
                try {
                    if (0 < parent){
                        const w: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.getFrequencies(), Service.lPair(replacement[0], parent));
                        if (w != null)this.weight += w;
                    }
                } catch(e) {
                }
            }
            if (this.pos === undefined) { this.pos = 0; } 
            this.X = -1;
            this.Y = -1;
            this.weight = 0;
        } else if (((head != null && head instanceof <any>RecognizedRule) || head === null) && ((rhs != null && rhs instanceof <any>Array && (rhs.length == 0 || rhs[0] == null ||(typeof rhs[0] === 'string'))) || rhs === null) && pos === undefined && x === undefined && y === undefined && factor === undefined) {
            let __args = arguments;
            let src: any = __args[0];
            let replacement: any = __args[1];
            {
                let __args = arguments;
                let head: any = null;
                super(src.head, <string[]>null);
                if (this.pos === undefined) { this.pos = 0; } 
                this.X = -1;
                this.Y = -1;
                this.weight = 0;
                let len: number = src.rhs.length - src.pos + replacement.length;
                this.pos = replacement.length;
                if (this.pos + 2 <= len)len = this.pos + 2;
                this.rhs = (s => { let a=[]; while(s-->0) a.push(null); return a; })(len);
                for(let i: number = 0; i < this.pos; i++) {this.rhs[i] = replacement[i];}
                for(let i: number = this.pos; i < this.rhs.length; i++) {this.rhs[i] = src.rhs[i - this.pos + src.pos];}
                if (len === this.pos + 2)this.rhs[len - 1] = "...";
                this.X = src.X;
                this.Y = src.Y;
                this.weight = (n => n<0?Math.ceil(n):Math.floor(n))(src.weight / 2);
                try {
                    if (head != null){
                        const h: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, head);
                        const s: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, this.rhs[this.pos]);
                        const w: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.getFrequencies(), Service.lPair(s, h));
                        if (w != null)this.weight += w;
                    }
                } catch(e) {
                }
            }
            if (this.pos === undefined) { this.pos = 0; } 
            this.X = -1;
            this.Y = -1;
            this.weight = 0;
        } else throw new Error('invalid overload');
    }

    public isTruncated(): boolean {
        return this.pos === this.rhs.length - 2 && ("..." === (this.rhs[this.rhs.length - 1]));
    }

    /**
     * 'CREATE' 'TABLE' >!< identifier ... -- is presentable
     * 'CREATE' 'TABLE' >!< colmapped_query_name -- is not
     * @return
     * @return {boolean}
     */
    public isPresentable(): boolean {
        for(let i: number = 0; i < this.rhs.length; i++) {{
            if ("..." === (this.rhs[i]))continue;
            const code: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, this.rhs[i]);
            const railroads: any = HarvestDoc.getRailroads();
            const tdoc: DocURL = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>railroads, code);
            if (tdoc == null && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.rhs[i].charAt(0)) != '\''.charCodeAt(0) && !("identifier" === (this.rhs[i]))){
                const tuples: Parser.Tuple[] = SqlEarley.getInstance().rules;
                for(let j: number = 0; j < tuples.length; j++) {{
                    const candidate: Parser.Tuple = tuples[j];
                    if (candidate.head === code)return false;
                };}
            }
        };}
        return true;
    }

    /**
     * head: 'CREATE' 'TABLE' >!< identifier  <-- redundant
     * head: 'CREATE' 'TABLE' >!< identifier ...
     * @return
     * @param {RecognizedRule[]} rules
     * @return {boolean}
     */
    public isRedundant(rules: Array<RecognizedRule>): boolean {
        let ret: boolean = false;
        for(let index = 0; index < rules.length; index++) {
            let candidate = rules[index];
            {
                if (this === candidate)continue;
                if (this.pos !== candidate.pos)continue;
                if (!candidate.isTruncated())continue;
                if (this.rhs.length + 1 === candidate.rhs.length){
                    ret = true;
                    for(let i: number = 0; i < this.rhs.length; i++) {{
                        if (!(this.rhs[i] === (candidate.rhs[i]))){
                            ret = false;
                            break;
                        }
                    };}
                    if (ret)return ret;
                }
                if (this.rhs.length === candidate.rhs.length){
                    ret = true;
                    for(let i: number = 0; i < this.rhs.length; i++) {{
                        if (!(this.rhs[i] === (candidate.rhs[i]))){
                            ret = false;
                            break;
                        }
                    };}
                    if (ret && this.weight <= candidate.weight)return ret;
                }
            }
        }
        return ret;
    }

    public isKeyword(): boolean {
        const s: string = this.rhs[this.pos];
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s.charAt(0)) == '\''.charCodeAt(0);
    }

    public static merge(rules: Array<RecognizedRule>, addendum: Array<RecognizedRule>) {
        for(let index = 0; index < addendum.length; index++) {
            let candidate = addendum[index];
            {
                let matches: boolean = false;
                for(let index1 = 0; index1 < rules.length; index1++) {
                    let cmp = rules[index1];
                    if (cmp.equals(candidate)){
                        matches = true;
                        cmp.weight += candidate.weight;
                        break;
                    }
                }
                if (!matches)/* add */(rules.push(candidate)>0);
            }
        }
    }

    /**
     * 
     * @param {*} obj
     * @return {number}
     */
    public compareTo(obj: any): number {
        const src: RuleTuple = <RuleTuple>obj;
        let cmp: number = 0;
        if (cmp !== 0)return cmp;
        for(let i: number = 0; i < this.rhs.length && i < src.rhs.length; i++) {if (/* compareTo */this.rhs[i].localeCompare(src.rhs[i]) !== 0)return /* compareTo */this.rhs[i].localeCompare(src.rhs[i]);;}
        cmp = this.rhs.length - src.rhs.length;
        if (cmp !== 0)return cmp;
        const posDelta: number = this.pos - (<RecognizedRule>obj).pos;
        if (posDelta !== 0)return posDelta;
        const xDelta: number = this.X - (<RecognizedRule>obj).X;
        if (xDelta !== 0)return xDelta;
        const yDelta: number = this.Y - (<RecognizedRule>obj).Y;
        if (yDelta !== 0)return yDelta;
        return this.compareWeight(obj);
    }

    public compareWeight(obj: any): number {
        const o: RecognizedRule = <RecognizedRule>obj;
        return (this.weight - o.weight > 0) ? 1 : (this.weight - o.weight < 0) ? -1 : 0;
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        const b: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        if (this.head != null)/* append */(sb => { sb.str += <any>this.head + ":"; return sb; })(b);
        let i: number = -1;
        for(let index = 0; index < this.rhs.length; index++) {
            let t = this.rhs[index];
            {
                i++;
                if (i === this.pos)/* append */(sb => { sb.str += <any>" >!<"; return sb; })(b);
                /* append */(sb => { sb.str += <any>" " + t; return sb; })(b);
            }
        }
        return /* toString */b.str;
    }
}
(RecognizedRule as any)["__class"] = "oracle.dbtools.parser.RecognizedRule";




import { Parser } from './Parser.js';

