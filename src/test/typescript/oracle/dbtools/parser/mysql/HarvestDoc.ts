/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Array } from '../../../arbori/util/Array';
import { Service } from '../../../arbori/util/Service';
import { MysqlEarley } from './MysqlEarley';

/**
 * 
 * @author Dim
 * @class
 */
export class HarvestDoc {
    static __static_initialized: boolean = false;
    static __static_initialize() { if (!HarvestDoc.__static_initialized) { HarvestDoc.__static_initialized = true; HarvestDoc.__static_initializer_0(); } }

    static err: number = 0;

    static succ: number = 0;

    /**
     * Gather templates and code fragments frequencies
     * @param {java.lang.String[]} args
     * @throws Exception
     */
    public static main(args: string[]) {
        HarvestDoc.crawlDocWebsite();
        HarvestDoc.saveFrequencies();
        console.info("succ=" + HarvestDoc.succ + ", err=" + HarvestDoc.err);
        const filePath: string = "/Users/VTROPASH/Documents/parseFailures.sql";
        const file: File = new File(filePath);
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        bw.write(/* toString */HarvestDoc.failures_$LI$().str);
        bw.close();
    }

    static baseUrl: string = "https://dev.mysql.com/doc/refman/5.6/en/";

    static sqlTest: { str: string, toString: Function }; public static sqlTest_$LI$(): { str: string, toString: Function } { HarvestDoc.__static_initialize(); if (HarvestDoc.sqlTest == null) { HarvestDoc.sqlTest = { str: "/* test generated from doc website */\n", toString: function() { return this.str; } }; }  return HarvestDoc.sqlTest; }

    static failures: { str: string, toString: Function }; public static failures_$LI$(): { str: string, toString: Function } { HarvestDoc.__static_initialize(); if (HarvestDoc.failures == null) { HarvestDoc.failures = { str: "/* failures */\n", toString: function() { return this.str; } }; }  return HarvestDoc.failures; }

    static testNo: number = 0;

    static processed: Array<string>; public static processed_$LI$(): Array<string> { HarvestDoc.__static_initialize(); if (HarvestDoc.processed == null) { HarvestDoc.processed = <any>([]); }  return HarvestDoc.processed; }

    /*private*/ static crawlDocWebsite() {
        HarvestDoc.testNo = 0;
        HarvestDoc.processed = <any>([]);
        let input: string = null;
        try {
            const masterBNFurl: string = HarvestDoc.baseUrl + "sql-statements.html";
            input = HarvestDoc.readURL(masterBNFurl);
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.io.FileNotFoundException") >= 0)) {
                const e: Error = <Error>__e;
                console.error("\nFileNotFoundException " + e.message);

            }
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Exception") >= 0) || __e != null && __e instanceof <any>Error) {
                const e: Error = <Error>__e;
                if (/* contains */((<any>e.constructor).getPackage().getName().indexOf("java.net") != -1)){
                    console.error("Failed to connect to " + e.message);
                    System.exit(0);
                }
                console.error(e.message, e);

            }
        }
        HarvestDoc.processInput(input);
    }

    public static processInput(input: string) {
        if ((HarvestDoc.succ + HarvestDoc.err) % 10 === 1)console.info("succ=" + HarvestDoc.succ + ", err=" + HarvestDoc.err);
        const pre: string = "<a href=\"";
        const post: string = "\">";
        for(let iPre: number = input.indexOf(pre); iPre > 0; iPre = input.indexOf(pre, iPre + pre.length)) {{
            const iPost: number = input.indexOf(post, iPre + pre.length);
            const url: string = input.substring(iPre + pre.length, iPost);
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "https://") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "http://") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "..") || /* contains */(url.indexOf("-log-") != -1) || /* contains */(url.indexOf("backup-") != -1) || /* contains */(url.indexOf("charset") != -1) || /* contains */(url.indexOf("config") != -1) || /* contains */(url.indexOf("clone-plugin") != -1) || /* contains */(url.indexOf("gis-class-") != -1) || /* contains */(url.indexOf("innodb-") != -1) || /* contains */(url.indexOf("install") != -1) || /* contains */(url.indexOf("ipv6-") != -1) || /* contains */(url.indexOf("keyring-") != -1) || /* contains */(url.indexOf("multiple-") != -1) || /* contains */(url.indexOf("myisam") != -1) || /* contains */(url.indexOf("mysqlbinlog") != -1) || /* contains */(url.indexOf("mysqldump-") != -1) || /* contains */(url.indexOf("mysqlcluster") != -1) || /* contains */(url.indexOf("mysql-cluster") != -1) || /* contains */(url.indexOf("mysql-shell-") != -1) || /* contains */(url.indexOf("optimizing-") != -1) || /* contains */(url.indexOf("replica") != -1) || /* contains */(url.indexOf("sys-ps-setup") != -1) || /* contains */(url.indexOf("thread-pool") != -1) || /* contains */(url.indexOf("upgrad") != -1) || !/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(url, ".html"))continue;
            try {
                HarvestDoc.processDoc(url);
            } catch(e) {
                console.error(url + " " + e.message + " ");
            }
        };}
    }

    static earley: Earley = null;

    static  __static_initializer_0() {
        try {
            HarvestDoc.earley = new MysqlEarley();
        } catch(e) {
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    /*private*/ static processDoc(page: string) {
        const test: { str: string, toString: Function } = HarvestDoc.sqlTest_$LI$();
        let input: string = null;
        try {
            const fullUrl: string = HarvestDoc.baseUrl + page;
            if (!/* contains */(HarvestDoc.processed_$LI$().indexOf(<any>(fullUrl)) >= 0)){
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(HarvestDoc.processed_$LI$(), fullUrl);
            } else return;
            input = HarvestDoc.readURL(fullUrl);
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.io.FileNotFoundException") >= 0)) {
                const e: Error = <Error>__e;
                console.error("\nFileNotFoundException " + e.message);
                return;

            }
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Exception") >= 0) || __e != null && __e instanceof <any>Error) {
                const e: Error = <Error>__e;
                if (/* contains */((<any>e.constructor).getPackage().getName().indexOf("java.net") != -1)){
                    console.error("URL=" + page);
                    console.error("Failed to connect to " + e.message);
                    System.exit(0);
                }

            }
        }
        HarvestDoc.processInput(input);
        const pre: string = "<code class=\"language-sql\">";
        const post: string = "</code>";
        for(let iPre: number = input.indexOf(pre); iPre > 0; iPre = input.indexOf(pre, iPre + pre.length)) {{
            const iPost: number = input.indexOf(post, iPre + pre.length);
            let code: string = input.substring(iPre + pre.length, iPost);
            code = /* replace */code.split("&gt;").join(">");
            code = /* replace */code.split("&lt;").join("<");
            code = /* replace */code.split("<em>").join("");
            code = /* replace */code.split("<em class=\"replaceable\">").join("");
            code = /* replace */code.split("</em>").join("");
            if (("where-optimization.html" === page) || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(code.toLowerCase(), "select"))console.info(code);
            let outputIndex: number = -1;
            outputIndex = code.indexOf("\nOutput:");
            if (0 < outputIndex)code = code.substring(0, outputIndex);
            let begin: number = 0;
            if (10000 < iPre)begin = iPre - 10000;
            const priorChunk: string = input.substring(begin, iPre);
            const paragraphPre: string = "<a id=\"";
            const iParagraph: number = priorChunk.lastIndexOf(paragraphPre);
            let pageParagraph: string = page;
            if (0 <= iParagraph){
                const iEndOfPar: number = priorChunk.indexOf('\"', iParagraph + paragraphPre.length);
                pageParagraph += "#" + priorChunk.substring(iParagraph + paragraphPre.length, iEndOfPar);
            }
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(code.charAt(0)) == '\n'.charCodeAt(0))code = code.substring(1);
            let dash3index: number = code.indexOf("+---");
            for(let i: number = 0; i < 5; i++) {if (3 < dash3index && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(code.charAt(dash3index - 1)) == ' '.charCodeAt(0))dash3index--;;}
            if (2 < dash3index && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(code.charAt(dash3index - 1)) == '\n'.charCodeAt(0)){
                code = code.substring(0, dash3index);
                let lastNewLineIndex: number = code.lastIndexOf("\n");
                if (lastNewLineIndex < 1)continue;
                code = code.substring(0, lastNewLineIndex);
                lastNewLineIndex = code.lastIndexOf("\n");
                if (lastNewLineIndex < 1)continue;
                code = code.substring(0, lastNewLineIndex);
            }
            if (0 <= code.indexOf("<em class=\"")){
                /* append */(sb => { sb.str += <any>"--<em class=\" ; skipped \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("Hash table size ")){
                /* append */(sb => { sb.str += <any>"--Hash table size   ; skipped \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("atabase pages")){
                /* append */(sb => { sb.str += <any>"--Database pages   ; skipped \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("...")){
                /* append */(sb => { sb.str += <any>"-- ...   ; skipped \n\n"; return sb; })(test);
                continue;
            }
            const skippedPrefixes: string[] = ["mysql&gt;", "WHERE (select WHERE)", "+---", "=  >  <  ", "mysql< ", "========", "             Session A", "MESSAGE_TEXT = "];
            let skip: boolean = false;
            for(let index = 0; index < skippedPrefixes.length; index++) {
                let skipped = skippedPrefixes[index];
                {
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(code, skipped)){
                        skipped = /* replace */skipped.split("/*").join("/+");
                        skipped = /* replace */skipped.split("*/").join("+/");
                        /* append */(sb => { sb.str += <any>"/*skipped " + skipped + " */ \n\n"; return sb; })(test);
                        skip = true;
                        break;
                    }
                }
            }
            if (skip)continue;
            code = /* replaceAll */code.replace(new RegExp("mysql>", 'g'),"");
            skip = true;
            const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(code, false, LexerToken.SQL_$LI$() + LexerToken.PoundComments_$LI$());
            const matrix: Matrix = new Matrix(HarvestDoc.earley);
            HarvestDoc.earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
            const c01: Cell = matrix.get(0, 1);
            for(let i: number = 0; i < c01.size(); i++) {{
                const pos: number = c01.getPosition(i);
                if (0 < pos){
                    const rule: number = c01.getRule(i);
                    const rhs0: number = HarvestDoc.earley.rules[rule].rhs[0];
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(HarvestDoc.earley.allSymbols[rhs0].charAt(0)) == '\''.charCodeAt(0))skip = false;
                }
            };}
            if (skip){
                /* append */(sb => { sb.str += <any>"/* failed scan " + code.substring(0, 20) + " */ \n\n"; return sb; })(test);
                continue;
            } else {
                /* append */(sb => { sb.str += <any>"++"; return sb; })(test);
                /* append */(sb => { sb.str += <any>HarvestDoc.testNo++; return sb; })(test);
                /* append */(sb => { sb.str += <any>";  /*  "; return sb; })(test);
                /* append */(sb => { sb.str += <any>pageParagraph; return sb; })(test);
                /* append */(sb => { sb.str += <any>"  */\n"; return sb; })(test);
                /* append */(sb => { sb.str += <any>'`'; return sb; })(test);
                /* append */(sb => { sb.str += <any>code; return sb; })(test);
                /* append */(sb => { sb.str += <any>"`->\n"; return sb; })(test);
            }
            const top: Cell = matrix.get(0, /* size */(<number>src.length));
            if (top == null){
                HarvestDoc.err++;
                if ((HarvestDoc.succ + HarvestDoc.err) % 10 === 0){
                    console.error("-------vvvvvvvvvvvvv-------");
                    console.error(code);
                }
                /* append */(sb => { sb.str += <any>code + "\n"; return sb; })(HarvestDoc.failures_$LI$());
                /* append */(sb => { sb.str += <any>"-------vvvvvvvvvvvvv-------\n"; return sb; })(HarvestDoc.failures_$LI$());
                continue;
            }
            HarvestDoc.succ++;
            let root: ParseNode = null;
            try {
                root = HarvestDoc.earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
            } catch(e) {
                console.error("AssertionError" + e.message);
                console.error(code);
                /* append */(sb => { sb.str += <any>"[0,0) dummy /***failed***/\n;\n\n"; return sb; })(test);
                continue;
            }
            if (root == null || root.to < 2){
                /* append */(sb => { sb.str += <any>"[0,0) dummy /**failed**/\n;\n\n"; return sb; })(test);
                continue;
            }
            const from: number = 0;
            let to: number = /* size */(<number>src.length);
            if (root.topLevel != null){
                {
                    let array = root.children();
                    for(let index = 0; index < array.length; index++) {
                        let n = array[index];
                        {
                            if (n.from === 0){
                                root = n;
                                to = root.to;
                            }
                        }
                    }
                }
                if (root.topLevel != null){
                    /* append */(sb => { sb.str += <any>"[0,0) dummy /*failed*/\n;\n\n"; return sb; })(test);
                    continue;
                }
            }
            /* append */(sb => { sb.str += <any>root.tree() + "\n;\n\n"; return sb; })(test);
            HarvestDoc.countFrequencies(root, matrix);
        };}
    }

    static readURL(masterBNFurl: string): string {
        if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".pdf") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".mobi") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".epub") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, "preface.html") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, "extensions-to-ansi.html") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, "manual-info.html") || /* contains */(masterBNFurl.indexOf(" ") != -1) || /* contains */(masterBNFurl.indexOf("srjsapi-") != -1))return "";
        const bytes: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(4096);
        let bytesRead: number = 0;
        const url: URL = <URL>new URL(masterBNFurl);
        console.info("opening " + masterBNFurl + "...");
        const bin: BufferedInputStream = new BufferedInputStream(url.openStream());
        console.info("done.");
        bytesRead = bin.read(bytes, 0, bytes.length);
        const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        while((bytesRead !== -1)) {{
            const bytesStr: string = String.fromCharCode.apply(null, bytes);
            let cut: number = bytesRead;
            if (bytesStr.length < cut)cut = bytesStr.length;
            /* append */(sb => { sb.str += <any>bytesStr.substring(0, cut); return sb; })(sb);
            bytesRead = bin.read(bytes, 0, bytes.length);
        }};
        bin.close();
        return /* toString */sb.str;
    }

    static frequencies: any = null;

    /*private*/ static countFrequencies(root: ParseNode, matrix: Matrix) {
        if (HarvestDoc.frequencies == null){
            HarvestDoc.frequencies = <any>({});
        }
        let alreadyProcessed: number[] = null;
        {
            let array = root.descendants();
            for(let index = 0; index < array.length; index++) {
                let descendant = array[index];
                {
                    const cell: Parser.EarleyCell = matrix.get(descendant.from, descendant.to);
                    if (cell == null)continue;
                    for(let i: number = 0; i < cell.size(); i++) {{
                        const rule: number = cell.getRule(i);
                        const tuple: Parser.Tuple = HarvestDoc.earley.rules[rule];
                        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tuple.toString$(), "\"fromClause[2,7)\":"))console.info();
                        for(let index1 = 0; index1 < tuple.rhs.length; index1++) {
                            let s = tuple.rhs[index1];
                            {
                                const key: number = Service.lPair(s, tuple.head);
                                if (alreadyProcessed != null && alreadyProcessed[Array.indexOf$long_A$long(alreadyProcessed, key)] === key)continue;
                                let frequency: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.frequencies, key);
                                if (frequency == null)frequency = 0;
                                /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>HarvestDoc.frequencies, key, frequency + 1);
                                alreadyProcessed = Array.insert$long_A$long(alreadyProcessed, key);
                            }
                        }
                    };}
                }
            }
        }
    }

    public static saveFrequencies() {
        const filePath: string = "dbtools-libraries/dbtools-arbori/src/main/resources/oracle/dbtools/parser/mysql/" + MysqlEarley.frequenciesFN;
        const file: File = new File(filePath);
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>HarvestDoc.frequencies);
            for(let index = 0; index < array.length; index++) {
                let k = array[index];
                {
                    bw.write(k + "=" + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.frequencies, k) + "\n");
                }
            }
        }
        bw.close();
    }
}
HarvestDoc["__class"] = "oracle.dbtools.parser.mysql.HarvestDoc";




HarvestDoc.__static_initialize();

import { Parser } from '../Parser';


HarvestDoc.main(null);
