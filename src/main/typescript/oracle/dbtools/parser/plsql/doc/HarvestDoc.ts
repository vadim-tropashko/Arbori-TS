/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../../arbori/util/Service.js';
import { IO } from '../../../../arbori/util/IO.js';
import { StringTokenizer } from '../../../../arbori/util/StringTokenizer.js';

/**
 * 
 * @author Dim
 * @class
 */
export class HarvestDoc {
    public static common: string = "common/";

    /**
     * Gather templates and code fragments frequencies
     * @param args
     * @throws Exception
     */
    static templatesFN: string = "templates.txt";

    static frequenciesFN: string = "frequencies.txt";

    static railroadsFN: string = "railroad.txt";

    static path: string = "/oracle/dbtools/parser/plsql/doc/";

    static templates: any; public static templates_$LI$(): any { if (HarvestDoc.templates == null) { HarvestDoc.templates = <any>({}); }  return HarvestDoc.templates; }

    public static getTemplates(): any {
        if (/* size */((m) => { if(m.entries==null) m.entries=[]; return m.entries.length; })(<any>HarvestDoc.templates_$LI$()) === 0){
            const u: URL = Service.fileNameGitResource(HarvestDoc, HarvestDoc.path + HarvestDoc.templatesFN);
            try {
                const is = u;
                const st: StringTokenizer = new StringTokenizer(IO.readFile$java_io_InputStream(is), "\n", true);
                let pos: number = 0;
                const refs: any = <any>({});
                let sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
                while((st.hasMoreTokens())) {{
                    let token: string = st.nextToken();
                    token = /* replace */token.split("\r").join("");
                    if (token === ("===")){
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>refs, pos - 1, /* toString */sb.str);
                        break;
                    }
                    const prefix: string = "" + pos + '=';
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token, prefix)){
                        if (pos !== 0){
                            /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>refs, pos - 1, /* toString */sb.str);
                            sb = { str: "", toString: function() { return this.str; } };
                        }
                        pos++;
                        /* append */(sb => { sb.str += <any>token.substring(prefix.length); return sb; })(sb);
                    } else /* append */(sb => { sb.str += <any>token; return sb; })(sb);
                }};
                let num: number = -1;
                while((st.hasMoreTokens())) {{
                    let token: string = st.nextToken();
                    token = token.trim();
                    if (("\n" === token) || ("" === token))continue;
                    if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(token, "=")){
                        num = /* parseLong */parseInt(token.substring(0, token.length - 1));
                        const substrs: Array<Substr> = <any>([]);
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>HarvestDoc.templates_$LI$(), num, substrs);
                        continue;
                    }
                    let from: number = -1;
                    let to: number = -1;
                    let ref: number = -1;
                    let man: string = null;
                    let doc: string = null;
                    let weight: number = -1;
                    const st1: StringTokenizer = new StringTokenizer(token, " ");
                    while((st1.hasMoreTokens())) {{
                        const s: string = st1.nextToken();
                        if (from === -1){
                            from = /* parseInt */parseInt(s);
                            continue;
                        }
                        if (to === -1){
                            to = /* parseInt */parseInt(s);
                            continue;
                        }
                        if (ref === -1){
                            ref = /* parseInt */parseInt(s);
                            continue;
                        }
                        if (man == null){
                            man = s;
                            continue;
                        }
                        if (doc == null){
                            doc = s;
                            continue;
                        }
                        if (weight === -1){
                            weight = /* parseLong */parseInt(s);
                            continue;
                        }
                    }};
                    if (from === -1 || man == null)continue;
                    const substr: Substr = new Substr(from, to, /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>refs, ref), weight, new DocURL(man, doc));
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.templates_$LI$(), num), substr);
                }};
                /* close */;
            } catch(e) {
                console.error("Failed to read templates: " + e.message);
            }
        }
        return HarvestDoc.templates_$LI$();
    }

    static frequencies: any = null;

    public static getFrequencies(): any {
        if (HarvestDoc.frequencies == null){
            HarvestDoc.frequencies = <any>({});
            let u: URL = Service.fileNameGitResource(HarvestDoc, HarvestDoc.path + HarvestDoc.frequenciesFN);
            try {
                if (u == null)u = Service.fileNameGitResource(HarvestDoc, HarvestDoc.path + HarvestDoc.frequenciesFN);
                const is = u;
                const st: StringTokenizer = new StringTokenizer(IO.readFile$java_io_InputStream(is), "\n");
                while((st.hasMoreTokens())) {{
                    let token: string = st.nextToken();
                    token = token.trim();
                    const pos: number = token.indexOf('=');
                    const head: string = token.substring(0, pos);
                    const tail: string = token.substring(pos + 1);
                    /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>HarvestDoc.frequencies, Number(head), Number.parseInt(tail, 10));
                }};
                /* close */;
            } catch(e) {
                console.error("Failed to read frequnecies: " + e.message);
            }
        }
        return HarvestDoc.frequencies;
    }

    static railroads: any; public static railroads_$LI$(): any { if (HarvestDoc.railroads == null) { HarvestDoc.railroads = <any>({}); }  return HarvestDoc.railroads; }

    public static getRailroads(): any {
        if (/* size */((m) => { if(m.entries==null) m.entries=[]; return m.entries.length; })(<any>HarvestDoc.railroads_$LI$()) === 0){
            const u: URL = Service.fileNameGitResource(HarvestDoc, HarvestDoc.path + HarvestDoc.railroadsFN);
            try {
                const is = u;
                const st: StringTokenizer = new StringTokenizer(IO.readFile$java_io_InputStream(is), "\n");
                while((st.hasMoreTokens())) {{
                    let token: string = st.nextToken();
                    token = token.trim();
                    const pos: number = token.indexOf('=');
                    const head: string = token.substring(0, pos);
                    const tail: string = token.substring(pos + 1);
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tail, "SQL"))/* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>HarvestDoc.railroads_$LI$(), Number.parseInt(head, 10), new DocURL(DocURL.Manual.SQL, tail.substring(4))); else if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tail, "PLSQL"))/* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>HarvestDoc.railroads_$LI$(), Number.parseInt(head, 10), new DocURL(DocURL.Manual.PLSQL, tail.substring(6))); else if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tail, "SQLPLUS"))/* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>HarvestDoc.railroads_$LI$(), Number.parseInt(head, 10), new DocURL(DocURL.Manual.SQLPLUS, tail.substring("SQLPLUS".length + 1))); else console.error("Unknown doc url: " + tail);
                }};
                /* close */;
            } catch(e) {
                console.error("Failed to read railroad diagram URLs: " + e.message);
            }
        }
        return HarvestDoc.railroads_$LI$();
    }

    static readURL(masterBNFurl: string): string {
        if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".pdf") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".mobi") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".epub"))return "";
        const url = new URL(masterBNFurl);
        if (url.protocol !== "file:") throw new Error(`Synchronous resource reads require a file URL: ${masterBNFurl}`);
        return IO.readFile$java_io_InputStream(url);

    }
}
HarvestDoc["__class"] = "oracle.dbtools.parser.plsql.doc.HarvestDoc";




import { DocURL } from './DocURL.js';


import { Substr } from './Substr.js';

