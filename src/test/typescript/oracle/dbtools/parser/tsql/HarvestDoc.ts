/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { MaterializedPredicate } from '../../arbori/MaterializedPredicate';
import { Program } from '../../arbori/Program';
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { SqlEarley } from '../plsql/SqlEarley';
import { SyntaxError } from '../plsql/SyntaxError';
import { Service } from '../../../arbori/util/Service';

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
        HarvestDoc.crawlDocWebsite("https://docs.microsoft.com/en-us/previous-versions/sql/sql-server-2008/ms181080(v=sql.100)");
        const filePath: string = "/Temp/allCode08.txt";
        const file: File = new File(filePath);
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        bw.write(/* toString */HarvestDoc.allCode_$LI$().str);
        bw.close();
    }

    static sqlTest: { str: string, toString: Function }; public static sqlTest_$LI$(): { str: string, toString: Function } { HarvestDoc.__static_initialize(); if (HarvestDoc.sqlTest == null) { HarvestDoc.sqlTest = { str: "/* test generated from doc website */\n", toString: function() { return this.str; } }; }  return HarvestDoc.sqlTest; }

    static failures: { str: string, toString: Function }; public static failures_$LI$(): { str: string, toString: Function } { HarvestDoc.__static_initialize(); if (HarvestDoc.failures == null) { HarvestDoc.failures = { str: "/* failures */\n", toString: function() { return this.str; } }; }  return HarvestDoc.failures; }

    static testNo: number = 0;

    static processed: Array<string>; public static processed_$LI$(): Array<string> { HarvestDoc.__static_initialize(); if (HarvestDoc.processed == null) { HarvestDoc.processed = <any>([]); }  return HarvestDoc.processed; }

    /*private*/ static crawlDocWebsite(masterBNFurl: string) {
        const cut: number = masterBNFurl.lastIndexOf("/") + 1;
        const baseUrl: string = masterBNFurl.substring(0, cut);
        HarvestDoc.testNo = 0;
        HarvestDoc.processed = <any>([]);
        let input: string = null;
        try {
            input = HarvestDoc.readURL(masterBNFurl);
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.io.FileNotFoundException") >= 0)) {
                const e: Error = <Error>__e;
                console.error("\nFileNotFoundException " + e.message);
                System.exit(0);

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
        HarvestDoc.processInput(baseUrl, input);
    }

    public static processInput(baseUrl: string, input: string) {
        const pre: string = "<a href=\"";
        const post: string = "\">";
        for(let iPre: number = input.indexOf(pre); iPre > 0; iPre = input.indexOf(pre, iPre + pre.length)) {{
            const iPost: number = input.indexOf(post, iPre + pre.length);
            const url: string = input.substring(iPre + pre.length, iPost);
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "https://") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "http://") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "#main") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "..") || /* contains */(url.indexOf("blogs") != -1) || /* contains */(url.indexOf("dotnet") != -1) || /* contains */(url.indexOf("troubleshoot") != -1) || /* contains */(url.indexOf("runtime") != -1) || /* contains */(url.indexOf("azure") != -1) || /* contains */(url.indexOf("previous-versions") != -1) || /* contains */(url.indexOf("view=aps-pdw") != -1) || /* contains */(url.indexOf("view=sql-server-linux") != -1) || /* contains */(url.indexOf("en-us/") != -1) || !/* contains */(url.indexOf("ms") != -1))continue;
            try {
                HarvestDoc.processDoc(baseUrl, url);
            } catch(e) {
                console.error(url + " " + e.message + " ");
            }
        };}
    }

    static earley: Earley = null;

    static  __static_initializer_0() {
        try {
            HarvestDoc.earley = SqlEarley.getInstance();
        } catch(e) {
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    /*private*/ static processDoc(baseUrl: string, page: string) {
        page = /* replace */page.split("view=sql-server-ver15").join("view=sql-server-ver19");
        page = /* replace */page.split("view=sql-server-2017").join("view=sql-server-ver19");
        const test: { str: string, toString: Function } = HarvestDoc.sqlTest_$LI$();
        let input: string = null;
        try {
            let fullUrl: string = baseUrl + page;
            if (!/* contains */(HarvestDoc.processed_$LI$().indexOf(<any>(fullUrl)) >= 0)){
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(HarvestDoc.processed_$LI$(), fullUrl);
            } else return;
            const cut: number = fullUrl.indexOf("\" data-");
            if (0 < cut)fullUrl = fullUrl.substring(0, cut).trim();
            input = HarvestDoc.readURL(fullUrl);
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.io.FileNotFoundException") >= 0)) {
                const e: Error = <Error>__e;
                console.error("\nFileNotFoundException " + e.message);
                System.exit(0);

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
        if (/* contains */(input.indexOf("XMLA") != -1) || /* contains */(input.indexOf("OLE DB") != -1) || /* contains */(input.indexOf("C/C++") != -1) || /* contains */(input.indexOf("C#") != -1))return;
        const examplesPos: number = input.indexOf("<h2 id=\"examples\">Examples</h2>");
        if (0 < examplesPos)input = input.substring(0, examplesPos);
        HarvestDoc.processInput(baseUrl, input);
        const pre: string = "<code>";
        const post: string = "</code>";
        let lastIPost: number = 0;
        for(let iPre: number = input.indexOf(pre); iPre > 0; iPre = input.indexOf(pre, iPre + pre.length)) {{
            const iPost: number = input.indexOf(post, iPre + pre.length);
            let code: string = input.substring(iPre + pre.length, iPost);
            code = /* replace */code.split("&gt;").join(">");
            code = /* replace */code.split("&lt;").join("<");
            code = /* replace */code.split("<em>").join("");
            code = /* replace */code.split("</em>").join("");
            let outputIndex: number = -1;
            outputIndex = code.indexOf("\nOutput:");
            if (0 < outputIndex)code = code.substring(0, outputIndex);
            const priorChunk: string = input.substring(lastIPost, iPre);
            lastIPost = iPost;
            const syntax: string = "<h2 id=\"syntax\">Syntax</h2>";
            const syntaxIndex: number = priorChunk.lastIndexOf(syntax);
            if (code.indexOf("::=") < 0 && syntaxIndex < 0)continue;
            try {
                const transact_sql: string = "-transact-sql\">";
                let chop: number = priorChunk.lastIndexOf(transact_sql);
                const chopped: string = priorChunk.substring(0, chop);
                chop = chopped.lastIndexOf("<h1 id=\"");
                page = chopped.substring(chop + "<h1 id=\"".length) + "-transact-sql";
            } catch(e) {
            }
            if (0 <= code.indexOf("<em class=\"")){
                /* append */(sb => { sb.str += <any>"--<em class=\" ; skipped \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("Azure Synapse Analytics")){
                /* append */(sb => { sb.str += <any>"--Azure Synapse Analytics   ; skipped \n\n"; return sb; })(test);
                continue;
            }
            HarvestDoc.extractRules(page, code);
        };}
    }

    static allRules: Array<RuleTuple>; public static allRules_$LI$(): Array<RuleTuple> { HarvestDoc.__static_initialize(); if (HarvestDoc.allRules == null) { HarvestDoc.allRules = <any>([]); }  return HarvestDoc.allRules; }

    static allCode: { str: string, toString: Function }; public static allCode_$LI$(): { str: string, toString: Function } { HarvestDoc.__static_initialize(); if (HarvestDoc.allCode == null) { HarvestDoc.allCode = { str: "", toString: function() { return this.str; } }; }  return HarvestDoc.allCode; }

    /*private*/ static extractRules(head: string, code: string) {
        const cut: number = head.indexOf("?view=");
        if (0 < cut)head = head.substring(0, cut);
        console.info(code);
        /* append */(sb => { sb.str += <any>code + "\n\n"; return sb; })(HarvestDoc.allCode_$LI$());
    }

    static path: string = "/oracle/dbtools/parser/plsql/doc/";

    static readURL(masterBNFurl: string): string {
        if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".pdf") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".mobi") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".epub"))return "";
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
}
HarvestDoc["__class"] = "oracle.dbtools.parser.tsql.HarvestDoc";




HarvestDoc.__static_initialize();

HarvestDoc.main(null);
