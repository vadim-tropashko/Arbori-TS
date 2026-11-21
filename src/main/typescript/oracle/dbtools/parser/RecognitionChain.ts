/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../arbori/util/Service.js';
import { ParseNode } from './ParseNode.js';
import { Parsed } from './Parsed.js';

export class RecognitionChain extends ParseNode {
    deductions: Array<number>;

    exceptions: Array<number>;

    public constructor(src: ParseNode) {
        super(src.from, src.to, -1, src.parser);
        this.deductions = <any>([]);
        this.exceptions = <any>([]);
        if (src.lft != null){
            this.lft = new RecognitionChain(src.lft);
            this.lft.__parent = this;
        }
        if (src.rgt != null){
            this.rgt = new RecognitionChain(src.rgt);
            this.rgt.__parent = this;
        }
        this.symbols = src.symbols;
        const content: Array<number> = <any>([]);
        {
            let array = src.content$();
            for(let index = 0; index < array.length; index++) {
                let c = array[index];
                /* add */(content.push(c)>0)
            }
        }
        let c: number = content.removeLast();
        /* add */(this.deductions.push(c)>0);
        const rules: Parser.Tuple[] = this.parser.rules;
        OUTER: while((0 < /* size */(<number>content.length))) {{
            c = this.deductions.getFirst();
            for(let index = 0; index < rules.length; index++) {
                let t = rules[index];
                {
                    if (1 < t.rhs.length)continue;
                    if (t.rhs[0] === t.head)continue;
                    for(let index1 = 0; index1 < content.length; index1++) {
                        let cmp = content[index1];
                        {
                            if (cmp === c)continue;
                            if (t.head === c && t.rhs[0] === cmp){
                                /* addFirst */this.deductions.unshift(cmp);
                                const o: number = cmp;
                                /* remove */(a => { let index = a.indexOf(o); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(content);
                                continue OUTER;
                            }
                        }
                    }
                }
            }
            c = this.deductions.getLast();
            for(let index = 0; index < rules.length; index++) {
                let t = rules[index];
                {
                    if (1 < t.rhs.length)continue;
                    if (t.rhs[0] === t.head)continue;
                    for(let index1 = 0; index1 < content.length; index1++) {
                        let cmp = content[index1];
                        {
                            if (cmp === c)continue;
                            if (t.head === cmp && t.rhs[0] === c){
                                /* addLast */(this.deductions.push(cmp)>0);
                                const o: number = cmp;
                                /* remove */(a => { let index = a.indexOf(o); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(content);
                                continue OUTER;
                            }
                        }
                    }
                }
            }
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(this.exceptions, content);
            /* clear */(content.length = 0);
        }};
    }

    /**
     * 
     * @return {string}
     */
    public tree(): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        const depthMap: any = this.calculateDepth$();
        {
            let array = this.descendants();
            for(let index = 0; index < array.length; index++) {
                let n = array[index];
                {
                    const depth: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>depthMap, Service.lPair(n.from, n.to));
                    /* append */(sb => { sb.str += <any>new RecognitionChain(n).toString$int$java_lang_String$boolean(depth, "___", false); return sb; })(ret);
                    /* append */(sb => { sb.str += <any>"\n"; return sb; })(ret);
                }
            }
        }
        return /* toString */ret.str;
    }

    public content(src?: any, addWsDividers?: any): any {
        if (((src != null && (src instanceof Array)) || src === null) && ((typeof addWsDividers === 'boolean') || addWsDividers === null)) {
            return super.content(src, addWsDividers);
        } else if (((typeof src === 'string') || src === null) && addWsDividers === undefined) {
            return <any>this.content$java_lang_String(src);
        } else if (((src != null && src instanceof <any>Parsed) || src === null) && addWsDividers === undefined) {
            return <any>this.content$oracle_dbtools_parser_Parsed(src);
        } else if (((src != null && (src instanceof Array)) || src === null) && addWsDividers === undefined) {
            return <any>this.content$java_util_List(src);
        } else if (((typeof src === 'number') || src === null) && addWsDividers === undefined) {
            return <any>this.content$int(src);
        } else if (src === undefined && addWsDividers === undefined) {
            return <any>this.content$();
        } else throw new Error('invalid overload');
    }

    content$java_lang_String(auxMarker: string): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        let pad: string = "  ";
        for(let index = 0; index < this.deductions.length; index++) {
            let s = this.deductions[index];
            {
                if (s === -1)continue;
                /* append */(sb => { sb.str += <any>pad + this.parser.allSymbols[s]; return sb; })(ret);
                pad = " > ";
            }
        }
        /* append */(sb => { sb.str += <any>"  "; return sb; })(ret);
        for(let index = 0; index < this.exceptions.length; index++) {
            let s = this.exceptions[index];
            {
                /* append */(sb => { sb.str += <any>" " + this.parser.allSymbols[s]; return sb; })(ret);
                if (0 < /* size */(<number>this.deductions.length) && 0 < /* size */(<number>this.exceptions.length) || 1 < /* size */(<number>this.exceptions.length))/* append */(sb => { sb.str += <any>"? "; return sb; })(ret);
            }
        }
        return /* toString */ret.str;
    }

    public static main(args: string[]) {
        const x11: number = 11;
        const x22: number = 22;
        const content: Array<number> = <any>([]);
        /* add */(content.push(11)>0);
        /* add */(content.push(22)>0);
        /* remove */(a => { let index = a.indexOf(x22); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(content);
        console.info(content);
    }
}
RecognitionChain["__class"] = "oracle.dbtools.parser.RecognitionChain";




import { Parser } from './Parser.js';
