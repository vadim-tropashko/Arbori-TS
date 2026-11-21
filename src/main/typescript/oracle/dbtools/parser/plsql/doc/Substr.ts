/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../../Lexer.js';
import { LexerToken } from '../../LexerToken.js';
import { ParseNode } from '../../ParseNode.js';
import { Token } from '../../Token.js';
import { SqlEarley } from '../SqlEarley.js';
import { Service } from '../../../../arbori/util/Service.js';

/**
 * Character strings src are interned, thus from and to offsets
 * @param {number} from
 * @param {number} to
 * @param {string} src
 * @param {number} weight -- to emphasize frequently used
 * @param {DocURL} doc -- back pointer to documentation where it occured
 * @class
 * @author Dim
 */
export class Substr {
    static serialVersionUID: number = 3;

    public getFrom(): number {
        return this.from;
    }

    public getTo(): number {
        return this.to;
    }

    public getWeight(): number {
        return this.weight;
    }

    public getSrc(): string {
        return this.src;
    }

    public getDocUrl(): DocURL {
        return this.doc;
    }

    public from: number;

    public to: number;

    public src: string;

    public doc: DocURL;

    public weight: number;

    public constructor(from: number, to: number, src: string, weight: number, doc: DocURL) {
        if (this.from === undefined) { this.from = 0; }
        if (this.to === undefined) { this.to = 0; }
        if (this.src === undefined) { this.src = null; }
        if (this.doc === undefined) { this.doc = null; }
        if (this.weight === undefined) { this.weight = 0; }
        this.from = from;
        this.to = to;
        this.src = src;
        this.weight = weight;
        this.doc = doc;
    }

    public getDoc(): DocURL {
        return this.doc;
    }

    /**
     * ordering
     * @param {Substr} s comparison
     * @return
     * @return {boolean}
     */
    public le(s: Substr): boolean {
        if (this.weight !== s.weight)return this.weight > s.weight;
        return this.to - this.from < s.to - s.from;
    }

    /**
     * @return {string} truncated src
     */
    public cutSrc(): string {
        return this.src.substring(this.from, this.to);
    }

    /**
     * 
     * @param {*} obj
     * @return {boolean}
     */
    public equals(obj: any): boolean {
        if (!(obj != null && obj instanceof <any>Substr))return false;
        const s: Substr = <Substr>obj;
        return this.cutSrc() === s.cutSrc();
    }

    /**
     * 
     * @return {number}
     */
    public hashCode(): number {
        return /* hashCode */(<any>((o: any) => { if (o.hashCode) { return o.hashCode(); } else { return o.toString().split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0); }})(this.cutSrc()));
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return this.cutSrc();
    }

    static add(target: Array<Substr>, elem: Substr) {
        const els: string = elem.cutSrc();
        const elemSrc: Array<LexerToken> = Lexer.parse$java_lang_String(els);
        let match: Substr = null;
        for(let index = 0; index < target.length; index++) {
            let s = target[index];
            {
                const ss: string = s.cutSrc();
                const sSrc: Array<LexerToken> = Lexer.parse$java_lang_String(ss);
                let pos: number = -1;
                const elemSize: number = /* size */(<number>elemSrc.length);
                const sSize: number = /* size */(<number>sSrc.length);
                const maxLength: number = elem.weight === 0 ? 16 : 32;
                if (elemSize === sSize || elemSize === sSize + 1 && (/* get */elemSrc[elemSize - 1].content === (";")) || sSize === elemSize + 1 && (/* get */sSrc[sSize - 1].content === (";")) || elemSize === sSize + 1 && (/* get */elemSrc[elemSize - 1].content === ("/")) || sSize === elemSize + 1 && (/* get */sSrc[sSize - 1].content === ("/")) || elemSize > maxLength && sSize > maxLength){
                    match = s;
                    for(let index1 = 0; index1 < sSrc.length; index1++) {
                        let t = sSrc[index1];
                        {
                            pos++;
                            if (pos >= maxLength || elemSize <= pos)break;
                            const type: Token = /* get */elemSrc[pos].type;
                            const content: string = /* get */elemSrc[pos].content;
                            let matches: boolean = type === t.type;
                            if (matches){
                                if (type === Token.IDENTIFIER && 2 < content.length && /* containsKey */SqlEarley.getInstance().symbolIndexes.hasOwnProperty("\'" + content + "\'"))matches = /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(content, t.content); else if (type === Token.OPERATION)matches = /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(content, t.content) || ("/" === content) && (";" === t.content) || (";" === content) && ("/" === t.content);
                            }
                            if (!matches){
                                match = null;
                                break;
                            }
                        }
                    }
                }
                if (match != null)break;
            }
        }
        if (match == null){
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(target, elem);
        } else {
            if (elem.le(match)){
                /* remove */(a => { let index = a.indexOf(match); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(target);
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(target, elem);
            }
        }
    }

    public static generateTemplate(root: ParseNode, src: Array<LexerToken>, fragment: string, templates: any, weight: number, man: DocURL.Manual, pageParagraph: string) {
        {
            let array = root.descendants();
            for(let index = 0; index < array.length; index++) {
                let n = array[index];
                {
                    if (n.to - n.from < 3)continue;
                    if (n.to - n.from === 3 && ("." === /* get */src[n.from + 1].content))continue;
                    {
                        let array1 = n.content$();
                        for(let index1 = 0; index1 < array1.length; index1++) {
                            let s = array1[index1];
                            {
                                const symb: string = SqlEarley.getInstance().allSymbols[s];
                                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symb.charAt(0)) == '\''.charCodeAt(0) || /* contains */(symb.indexOf("[") != -1) || (symb === ("iteration_scheme")) || (symb === ("select_clause")) || (symb === ("DECLARE_decls_opt")) || (symb === ("subprg_spec")) || (symb === ("with_clause")) || (symb === ("table_reference")))continue;
                                const parent: ParseNode = n.parent$();
                                if (parent != null){
                                    {
                                        let array2 = parent.content$();
                                        for(let index2 = 0; index2 < array2.length; index2++) {
                                            let j = array2[index2];
                                            {
                                                const key: number = Service.lPair(s, j);
                                                let tmp: Array<Substr> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>templates, key);
                                                if (tmp == null){
                                                    tmp = <any>([]);
                                                    /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>templates, key, tmp);
                                                }
                                                let url: DocURL = null;
                                                if (man != null)url = new DocURL(man, pageParagraph);
                                                if (symb === ("aggregate_function"))weight = -1;
                                                Substr.add(tmp, new Substr(/* get */src[n.from].begin, /* get */src[n.to - 1].end, fragment, weight, url));
                                            }
                                        }
                                    }
                                } else {
                                    const key: number = Service.lPair(s, 0);
                                    let tmp: Array<Substr> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>templates, key);
                                    if (tmp == null){
                                        tmp = <any>([]);
                                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>templates, key, tmp);
                                    }
                                    let url: DocURL = null;
                                    if (man != null)url = new DocURL(man, pageParagraph);
                                    if (symb === ("aggregate_function"))weight = -1;
                                    Substr.add(tmp, new Substr(/* get */src[n.from].begin, /* get */src[n.to - 1].end, fragment, weight, url));
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public static listSuggestions(symbols: Array<number>, prEfIx: string, follower: string, templates: any, topSuggestions: Array<Substr>, limit: number) {
        for(let index = 0; index < symbols.length; index++) {
            let ls = symbols[index];
            {
                const set: Array<Substr> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>templates, ls);
                if (set == null)continue;
                for(let index1 = 0; index1 < set.length; index1++) {
                    let ts = set[index1];
                    {
                        const tsl: string = ts.cutSrc().toLowerCase();
                        let tsc: Substr = ts;
                        if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tsl, prEfIx.toLowerCase()))continue;
                        if (follower != null){
                            const src: Array<LexerToken> = Lexer.parse$java_lang_String(tsl);
                            if (/* size */(<number>src.length) < 2)continue;
                            if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(/* get */src[1].content, follower))continue; else tsc = new Substr(ts.from + /* get */src[1].begin, ts.to, ts.src, ts.weight, ts.doc);
                        }
                        let max: Substr = null;
                        for(let index2 = 0; index2 < topSuggestions.length; index2++) {
                            let tmp = topSuggestions[index2];
                            {
                                if (max == null || max.le(tmp))max = tmp;
                            }
                        }
                        if (/* size */(<number>topSuggestions.length) < limit || tsc.le(max)){
                            Substr.add(topSuggestions, tsc);
                            if (limit < /* size */(<number>topSuggestions.length))/* remove */(a => { let index = a.indexOf(max); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(topSuggestions);
                        }
                    }
                }
            }
        }
    }

    public static main(args: string[]) {
        const templates: any = HarvestDoc.getTemplates();
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>templates);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    const ts: Array<Substr> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>templates, key);
                    for(let index1 = 0; index1 < ts.length; index1++) {
                        let s = ts[index1];
                        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(s.toString(), "WHI")){
                            console.info(Service.lX(key) + "=" + SqlEarley.getInstance().allSymbols[Service.lX(key)]);
                            console.info(Service.lY(key) + "=" + SqlEarley.getInstance().allSymbols[Service.lY(key)]);
                            console.info(" " + s.toString());
                        }
                    }
                }
            }
        }
    }
}
Substr["__class"] = "oracle.dbtools.parser.plsql.doc.Substr";




import { HarvestDoc } from './HarvestDoc.js';


import { DocURL } from './DocURL.js';
