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
import { Resource } from '../Resource';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { DocURL } from './doc/DocURL';
import { Substr } from './doc/Substr';
import { Array } from '../../../arbori/util/Array';
import { Service } from '../../../arbori/util/Service';

/**
 * 
 * @author Dim
 * @class
 */
export class GenerateFrequencies {
    public static module: string = "dbtools-libraries/dbtools-arbori/";

    static diagnosticCounts: any; public static diagnosticCounts_$LI$(): any { if (GenerateFrequencies.diagnosticCounts == null) { GenerateFrequencies.diagnosticCounts = <any>({}); }  return GenerateFrequencies.diagnosticCounts; }

    /**
     * Gather templates and code fragments frequencies
     * @param {java.lang.String[]} args
     * @throws Exception
     */
    public static main(args: string[]) {
        {
            let array = GenerateFrequencies.regressionTestSqls();
            for(let index = 0; index < array.length; index++) {
                let sql = array[index];
                GenerateFrequencies.countFrequencies$java_lang_String$boolean(sql, false)
            }
        }
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>GenerateFrequencies.frequencies);
            for(let index = 0; index < array.length; index++) {
                let s = array[index];
                {
                    const parent: number = Service.lY(s);
                    const child: number = Service.lX(s);
                    if (parent < 0 && child < 0){
                        console.error("parent<0 (" + parent + ")");
                        console.error("child<0 (" + child + ")");
                        continue;
                    }
                    if (parent < 0){
                        console.error(SqlEarley.getInstance().allSymbols[child]);
                        console.error("parent<0 (" + parent + ")");
                        continue;
                    }
                    if (SqlEarley.getInstance().allSymbols.length - 1 < parent){
                        console.error("len<parent (" + parent + ")");
                        continue;
                    }
                    if (child < 0){
                        console.error("child<0 (" + child + ")");
                        continue;
                    }
                    if (SqlEarley.getInstance().allSymbols.length - 1 < child){
                        console.error("len<child (" + child + ")");
                        continue;
                    }
                }
            }
        }
        GenerateFrequencies.saveFrequencies();
        GenerateFrequencies.printDiagnosticSummary();
        if (false){
        }
    }

    static dbtoolsTestSqls(): Array<string> {
        const files: Array<File> = Service.filesInDirectory("datapump/test/scripts", "sql");
        const ret: Array<string> = <any>([]);
        for(let index = 0; index < files.length; index++) {
            let file = files[index];
            {
                let fpath: string = file.getAbsolutePath();
                fpath = "file:///" + /* replace */fpath.split('\\').join('/');
                console.info("processing: " + fpath);
                let text: string = Service.readFile$java_lang_String(fpath);
                text = /* replace */text.split("\\\\").join("\\");
                text = /* replace */text.split("-cc egg").join("-cc true");
                text = /* replace */text.split("-debug true").join("/*-debug true*/");
                text = /* replace */text.split("-rf false").join("/*-rf false*/");
                text = /* replace */text.split("-remapschemas busted").join("-remapschemas a=b ");
                const st: StringTokenizer = new StringTokenizer(text, "\n", false);
                const skippedPrefixes: string[] = ["dbcc", "cs dbc", "connect ", "datapump export -noexec  -filesize b", "set datapump default", "set datapump -u", "datapump export -noexec  -oec", "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"];
                while((st.hasMoreTokens())) {{
                    let skip: boolean = false;
                    const token: string = st.nextToken();
                    for(let index1 = 0; index1 < skippedPrefixes.length; index1++) {
                        let prefix = skippedPrefixes[index1];
                        {
                            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token.toLowerCase(), prefix)){
                                skip = true;
                                break;
                            }
                        }
                    }
                    if (/* contains */(token.toLowerCase().indexOf("bad") != -1))skip = true;
                    if (/* contains */(token.toLowerCase().indexOf("omitencryptionclause") != -1))skip = true;
                    if (!skip)/* add */(ret.push(token)>0);
                }};
            }
        }
        return ret;
    }

    static getRules(): Array<RuleTuple> {
        const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/regrTest.grammar");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.TEST_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        const ret: Array<RuleTuple> = <any>([]);
        Grammar.grammar(root, src, ret);
        return ret;
    }

    static regressionTestSqls(): Array<string> {
        let input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/regression.test");
        input += Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/doc/doc_plsql.test");
        input += Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/doc/doc_sql.test");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$java_lang_String(input, "`");
        const prg: string = "sqls: [node) query;";
        const earley: Earley = new GenerateFrequencies.GenerateFrequencies$0(GenerateFrequencies.getRules());
        const program: Program = new Program(earley, null);
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const target: Parsed = new Parsed(input, src, earley, "atest");
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["atest"], src, earley, matrix);
        if (s != null){
            console.error(s);
            throw s;
        }
        program.compile$java_lang_String(prg);
        const predicates: any = program.eval$oracle_dbtools_parser_Parsed(target);
        const p: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(predicates, "sqls");
        const ret: Array<string> = <any>([]);
        {
            let array = p.getTuples();
            for(let index = 0; index < array.length; index++) {
                let t = array[index];
                {
                    const node: ParseNode = p.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t, "node");
                    let sql: string = input.substring(/* get */src[node.from].begin, /* get */src[node.to - 1].end).trim();
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(sql, "`") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(sql, "\""))sql = sql.substring(1, sql.length - 1);
                    /* add */(ret.push(sql)>0);
                }
            }
        }
        return ret;
    }

    static plsqlTest: { str: string, toString: Function }; public static plsqlTest_$LI$(): { str: string, toString: Function } { if (GenerateFrequencies.plsqlTest == null) { GenerateFrequencies.plsqlTest = { str: "/* test generated from doc website */\n", toString: function() { return this.str; } }; }  return GenerateFrequencies.plsqlTest; }

    static sqlTest: { str: string, toString: Function }; public static sqlTest_$LI$(): { str: string, toString: Function } { if (GenerateFrequencies.sqlTest == null) { GenerateFrequencies.sqlTest = { str: "/* test generated from doc website */\n", toString: function() { return this.str; } }; }  return GenerateFrequencies.sqlTest; }

    static sqlPlusTest: { str: string, toString: Function }; public static sqlPlusTest_$LI$(): { str: string, toString: Function } { if (GenerateFrequencies.sqlPlusTest == null) { GenerateFrequencies.sqlPlusTest = { str: "/* test generated from doc website */\n", toString: function() { return this.str; } }; }  return GenerateFrequencies.sqlPlusTest; }

    static testNo: number = 0;

    static processed: Array<string>; public static processed_$LI$(): Array<string> { if (GenerateFrequencies.processed == null) { GenerateFrequencies.processed = <any>([]); }  return GenerateFrequencies.processed; }

    static crawlDocWebsite(man: DocURL.Manual) {
        GenerateFrequencies.testNo = 0;
        GenerateFrequencies.processed = <any>([]);
        let input: string = null;
        let masterBNFurl: string = DocURL.Manual["_$wrappers"][man].getBasePrivateURL() + "toc.htm";
        try {
            if (man === DocURL.Manual.PLSQL)masterBNFurl = DocURL.Manual["_$wrappers"][man].getBasePrivateURL() + "loe.html";
            input = GenerateFrequencies.readURL(masterBNFurl);
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.io.FileNotFoundException") >= 0)) {
                const e: Error = <Error>__e;
                console.error("\nFileNotFoundException " + e.message);
                System.exit(0);

            }
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Exception") >= 0) || __e != null && __e instanceof <any>Error) {
                const e: Error = <Error>__e;
                if (/* contains */((<any>e.constructor).getPackage().getName().indexOf("java.net") != -1)){
                    GenerateFrequencies.logDiagnostic(GenerateFrequencies.Diagnostic.FETCH_REDIRECT, masterBNFurl, e.message);
                    System.exit(0);
                }
                console.error(e.message, e);

            }
        }
        const pre: string = "<a href=\"";
        const post: string = "\">";
        for(let iPre: number = input.indexOf(pre); iPre > 0; iPre = input.indexOf(pre, iPre + pre.length)) {{
            const iPost: number = input.indexOf(post, iPre + pre.length);
            const url: string = input.substring(iPre + pre.length, iPost);
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, "http://") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(url, ".."))continue;
            try {
                let index: number = url.indexOf('#');
                if (index === 0)continue;
                let page: string = url;
                if (index > 0)page = page.substring(0, index);
                if (/* contains */(page.indexOf("plsql-predefined-data-types") != -1))continue;
                index = page.indexOf("\" class=");
                if (0 < index)page = page.substring(0, index);
                GenerateFrequencies.processDoc(man, page);
            } catch(e) {
                GenerateFrequencies.logDiagnostic(GenerateFrequencies.Diagnostic.PAGE_ERROR, url, e.message);
            }
        };}
    }

    static processDoc(man: DocURL.Manual, page: string) {
        let test: { str: string, toString: Function } = GenerateFrequencies.plsqlTest_$LI$();
        if (/* Enum.equals */(<any>(DocURL.Manual.SQL) === <any>(man)))test = GenerateFrequencies.sqlTest_$LI$();
        if (/* Enum.equals */(<any>(DocURL.Manual.SQLPLUS) === <any>(man)))test = GenerateFrequencies.sqlPlusTest_$LI$();
        let input: string = null;
        const earley: SqlEarley = SqlEarley.getInstance();
        try {
            const fullUrl: string = DocURL.Manual["_$wrappers"][man].getBasePrivateURL() + page;
            if (!/* contains */(GenerateFrequencies.processed_$LI$().indexOf(<any>(fullUrl)) >= 0)){
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(GenerateFrequencies.processed_$LI$(), fullUrl);
            } else return;
            input = GenerateFrequencies.readURL(fullUrl);
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.io.FileNotFoundException") >= 0)) {
                const e: Error = <Error>__e;
                console.error("\nFileNotFoundException " + e.message);
                System.exit(0);

            }
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Exception") >= 0) || __e != null && __e instanceof <any>Error) {
                const e: Error = <Error>__e;
                if (/* contains */((<any>e.constructor).getPackage().getName().indexOf("java.net") != -1)){
                    GenerateFrequencies.logDiagnostic(GenerateFrequencies.Diagnostic.FETCH_REDIRECT, page, e.message);
                    return;
                }
                GenerateFrequencies.logDiagnostic(GenerateFrequencies.Diagnostic.PAGE_ERROR, page, e.message);
                return;

            }
        }
        const pre1: string = "<div class=\"section\" id=\"";
        const post1: string = "\"";
        const pre2: string = "<span class=\"italic\">";
        const post2: string = "::=";
        for(let iPre1: number = input.indexOf(pre1); iPre1 > 0; iPre1 = input.indexOf(pre1, iPre1 + pre1.length)) {{
            const iPost1: number = input.indexOf(post1, iPre1 + pre1.length);
            const id: string = input.substring(iPre1 + pre1.length, iPost1);
            const iPre2: number = input.indexOf(pre2, iPost1);
            const iPost2: number = input.indexOf(post2, iPre2 + pre2.length);
            if (iPost2 < 0)continue;
            let symbol: string = input.substring(iPre2 + pre2.length, iPost2);
            if (60 < symbol.length)continue;
            const iSpan: number = symbol.indexOf("</span>");
            if (iSpan < 0)continue;
            symbol = symbol.substring(0, iSpan);
            const s: number = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlEarley.getInstance().symbolIndexes, symbol);
            if (s == null)continue;
            /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>GenerateFrequencies.railroads_$LI$(), s, new DocURL(man, page + "#" + id));
        };}
        const pre: string = "<pre class=\"oac_no_warn\" dir=\"ltr\">";
        const post: string = "</pre>";
        for(let iPre: number = input.indexOf(pre); iPre > 0; iPre = input.indexOf(pre, iPre + pre.length)) {{
            const iPost: number = input.indexOf(post, iPre + pre.length);
            let code: string = input.substring(iPre + pre.length, iPost);
            code = /* replace */code.split("&gt;").join(">");
            code = /* replace */code.split("&lt;").join("<");
            code = /* replace */code.split("<span class=\"italic\">").join("");
            code = /* replace */code.split("<span class=\"bold\">").join("");
            code = /* replace */code.split("</span>").join("");
            code = /* replace */code.split("Call completed.").join("");
            code = /* replace */code.split("1 row created.").join("");
            code = /* replace */code.split("1 row created").join("");
            code = /* replace */code.split("1 row updated.").join("");
            code = /* replace */code.split("Commit complete.").join("");
            code = /* replace */code.split("Enter password: password").join("");
            code = /* replace */code.split("C    F_RATIO    P_VALUE").join("");
            code = /* replace */code.split("- ---------- ----------").join("");
            code = /* replace */code.split("F 5.59536943 4.7840E-09").join("");
            code = /* replace */code.split("M  9.2865001 6.7139E-17").join("");
            code = /* replace */code.split("CAST(POWERMULTISET_BY_CARDINALITY(CUST_ADDRESS_NTAB,2) AS CUST_ADDRESS_TAB_TAB_TYP)").join("");
            code = /* replace */code.split("YP)").join("");
            code = /* replace */code.split("LASVALUE(quantity").join("LAST_VALUE(quantity");
            code = /* replace */code.split("CREATE INDEX index ON table").join("CREATE INDEX index ON tbl");
            code = /* replace */code.split("ALTER TABLE table").join("ALTER TABLE tbl");
            code = /* replace */code.split("operator t_alias2.column").join("= t_alias2.column");
            code = /* replace */code.split("WHERE expr operator").join("WHERE expr IN");
            code = /* replace */code.split("WHERE column operator").join("WHERE column IN");
            code = /* replace */code.split("       salary + NVL(commission_pct, 0),").join("      , salary + NVL(commission_pct, 0),");
            code = /* replace */code.split("employee_id                              -- and employee id.").join(",employee_id                              -- and employee id.");
            code = /* replace */code.split("<span class=\"codeinlineitalic\"").join("<span class=dqt codeinlineitalic dqt");
            code = /* replace */code.split(". . .").join("i integer);");
            code = /* replace */code.split("Grant succeeded.").join("");
            code = /* replace */code.split("User altered.").join("");
            code = /* replace */code.split("Session altered.").join("");
            code = /* replace */code.split("View created.").join("");
            code = /* replace */code.split("View dropped.").join("");
            code = /* replace */code.split("Procedure created.").join("");
            code = /* replace */code.split("5 rows updated.").join("");
            code = /* replace */code.split("CAST(POWERMULTISET(CUST_ADDRESS_NTAB) AS CUST_ADDRESS_TAB_TAB_T").join("");
            code = /* replace */code.split("no rows selected").join("");
            code = /* replace */code.split("statement;").join("NULL;");
            code = /* replace */code.split("&rsquo;").join("\'");
            code = /* replace */code.split("......").join("");
            code = /* replace */code.split("....").join("NULL;");
            code = /* replace */code.split("PROCEDURE inner").join("PROCEDURE inner1");
            code = /* replace */code.split("<input table>").join("tbl1");
            code = /* replace */code.split("&amp;").join("&");
            code = /* replace */code.split("Enter value for ").join("--");
            code = /* replace */code.split("WHERE JOB_ID=\'SA_MAN\'").join("WHERE JOB_ID=\'SA_MAN\';");
            code = /* replace */code.split("WHERE JOB_ID=\'SA_MAN\';;").join("WHERE JOB_ID=\'SA_MAN\';");
            code = /* replace */code.split("WHERE JOB_ID=\'SA_MAN\'; ;").join("WHERE JOB_ID=\'SA_MAN\';");
            code = /* replace */code.split(":port/").join(":10/");
            code = /* replace */code.split("MAP MEMBER FUNCTION rational_order -").join("MAP MEMBER FUNCTION rational_order ");
            code = /* replace */code.split("END;\n\nUSD ").join("END;");
            code = /* replace */code.split("<code class=\"codeph\">").join("");
            code = /* replace */code.split("</code>").join("");
            code = /* replace */code.split("DATAFILE <data_file_name>").join("DATAFILE \'data_file_name\'");
            code = /* replace */code.split("DATAFILE <datafile_name>").join("DATAFILE \'datafile_name\'");
            code = /* replace */code.split("TABLESPACE <shadow_tablespace_name>").join("TABLESPACE shadow_tablespace_name");
            code = /* replace */code.split("&nbsp;").join(" ");
            code = /* replace */code.split("&#x;").join("--");
            code = /* replace */code.split("{\"a").join("--");
            code = /* replace */code.split("&#x2013;").join("-");
            code = /* replace */code.split("newcol(i) := col(i)").join("newcol(i) := col(i);");
            code = /* replace */code.split("<subquery from product>").join("\'<subquery from product>\',");
            code = /* replace */code.split("<subquery from shipments>)").join("\'<subquery from shipments>\'");
            code = /* replace */code.split("FOR j IN de\"spts.FIRST..depts.LAST LOOP").join("FOR j IN depts.FIRST..depts.LAST LOOP");
            code = /* replace */code.split("n  ame     VARCHAR2(20),  -- parameter NAME").join("name     VARCHAR2(20),  -- parameter NAME");
            code = /* replace */code.split(" er   ELSE NULL;").join("   ELSE NULL;");
            code = /* replace */code.split(");time").join(");");
            code = /* replace */code.split("VAR;<RAY(").join("VARRAY(");
            code = /* replace */code.split("employee_id, d  epartment_id").join("employee_id, department_id");
            code = /* replace */code.split("employee_id, de  partment_id").join("employee_id, department_id");
            code = /* replace */code.split("IS TABLE OF employees.lashat t_name%TYPE;").join("IS TABLE OF employees.last_name%TYPE;");
            code = /* replace */code.split("The result is:").join("/*The result is:*/");
            code = /* replace */code.split("\'{\"type\" : \"object\"}\u2019").join("\'{\"type\" : \"object\"}\'");
            code = /* replace */code.split("(jd IS JSON VALIDATE \'{\"type\" : \"object\"})").join("(jd IS JSON VALIDATE \'{\"type\" : \"object\"}\')");
            code = /* replace */code.split("Table altered.").join("");
            code = /* replace */code.split("Table created.").join("");
            code = /* replace */code.split("Table PRODUCT created.").join("");
            code = /* replace */code.split("amount        AS NUMBER(10, 2)").join("amount        AS NUMBER(10, 2),");
            code = /* replace */code.split("\'OrderTime\'.  : ord.order_datetime,").join("\'OrderTime\'  : ord.order_datetime,");
            code = /* replace */code.split("one_si  ded_p_value").join("one_sided_p_value");
            code = /* replace */code.split("The output of above SELECT query is:").join("");
            code = GenerateFrequencies.trimDocumentationOutput(code);
            code = GenerateFrequencies.normalizeMalformedDocSnippet(code);
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
            if (code.length === 0){
                GenerateFrequencies.appendSkip(test, GenerateFrequencies.Diagnostic.SKIP_MALFORMED_DOC, "empty code block");
                continue;
            }
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(code.charAt(0)) == '\n'.charCodeAt(0))code = code.substring(1);
            let dash3index: number = code.indexOf("---");
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
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(code.toUpperCase(), "EXECUTE IMMEDIATE ")){
                if (!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(code.trim(), ";"))code = code + ";";
                code = "begin\n" + code + "\n end; \n";
            }
            if (0 <= code.indexOf("version=\"1.0\"")){
                /* append */(sb => { sb.str += <any>"--version=\"1.0\" ; skipped \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("CREATE USER scott_global IDENTIFIED GLOBALLY") && 0 <= code.indexOf("cn=scott taylor,ou=sales,dc=abccorp")){
                /* append */(sb => { sb.str += <any>"--CREATE USER scott_global IDENTIFIED GLOBALLY AS \u2018cn=scott taylor,ou=sales,dc=abccorp,dc=com\u2019  ; skipped \n\n"; return sb; })(test);
                continue;
            } else if ("controlstatements.html#LNPLS431" === pageParagraph){
                /* append */(sb => { sb.str += <any>"/*controlstatements.html#LNPLS431 ; skipped*/ \n\n"; return sb; })(test);
                continue;
            }
            if (0 <= code.indexOf("ORA-")){
                /* append */(sb => { sb.str += <any>"/*ORA- ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("...")){
                if (code.length < 300){
                    /* append */(sb => { sb.str += <any>"/*incomplete ... ; skipped*/ \n\n"; return sb; })(test);
                    continue;
                } else {
                    code = /* replace */code.split("...").join("/*...*/");
                }
            } else if (0 <= code.indexOf("ORACLE exception")){
                /* append */(sb => { sb.str += <any>"/*ORACLE exception ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("PL/SQL procedure successfully completed")){
                /* append */(sb => { sb.str += <any>"/*PL/SQL procedure successfully completed <-- skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("SQL>")){
                /* append */(sb => { sb.str += <any>"/*SQL>  ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("field_name")){
                /* append */(sb => { sb.str += <any>"/*  field_name    ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("WHEN condition_n THEN statements_n")){
                /* append */(sb => { sb.str += <any>"/*  WHEN condition_n THEN statements_n    ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("------------------------------------------------------------------------")){
                /* append */(sb => { sb.str += <any>"/*  ------------------------------------------------------------------------  ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("_________________________________________")){
                /* append */(sb => { sb.str += <any>"/*  _________________________________________  ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("\"sthref809\"")){
                /* append */(sb => { sb.str += <any>"/*  \"sthref809\"    ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("<<end_loop>>")){
                /* append */(sb => { sb.str += <any>"/*  <<end_loop>>    ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("hr.tb1.col1.x")){
                /* append */(sb => { sb.str += <any>"/*  hr.tb1.col1.x    ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("We expect this THEN to always be performed")){
                /* append */(sb => { sb.str += <any>"/*  We expect this THEN to always be performed    ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 === code.indexOf("Cursor is closed")){
                /* append */(sb => { sb.str += <any>"/*  Cursor is closed...    ; skipped*/ \n\n"; return sb; })(test);
                continue;
            } else if (code.length < 30 && !/* Enum.equals */(<any>(DocURL.Manual.SQLPLUS) === <any>(man))){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (code.length < 20 && /* Enum.equals */(<any>(DocURL.Manual.SQLPLUS) === <any>(man))){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("<a id=\"d10")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("  2") && 0 <= code.indexOf("  3")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("  3") && 0 <= code.indexOf("  4")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("[") && code.indexOf("[") <= 10 && 0 <= code.indexOf("]") && code.indexOf("]") <= 10){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("xquery for")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("SELECT JSON_OBJECT(\'key1\' VALUE NULL)") && 0 <= code.indexOf("evaluates to  {\"key1\" :")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("CRYPT USING transport_secret")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("CREATE PLUGGABLE DATABASE") && 0 <= code.indexOf("ADMIN USER IDENTIFIED BY manager")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("EXTERNAL MODIFY (LOCATION")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("CONTAINERS HOST")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("CONTAINERS PORT")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("PASSWORD_ROLLOVER_TIME")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("FIRST_VALUE(sal) OVER w AS \'first\'")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("\"currency\" : \"\\u20AC\",")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("VALUES (\'Bob\', 1.75, to_date(\'11/03/1966\', \'DD/MM/YYYY\'), \'{\"department\":\"IT\",\"role\":\"Technical Consultant\"}\');")){
                /* append */(sb => { sb.str += <any>"/*incomplete, skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("\'{\"type\" : \"object\"};")){
                /* append */(sb => { sb.str += <any>"/*incomplete literal, skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("DOMAIN co.currency(amount, currency_code)")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("DOMAIN currency(amount, currency_code)")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("DAY_OF_WEEK_ABBR DOMAIN_COLUMN NONDOMAIN_COLUMN DOMAIN_VALUE NONDOMAIN_VALUE")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("[schema]")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("[PUBLIC]")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("\u201c") || 0 <= code.indexOf("\u201d") || 0 <= code.indexOf("\u2019")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("DELETE FROM t") && 0 <= code.indexOf("FROM s")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("[owner.]")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("Old password:")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("3 rows created .")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("1 ROW UPDATED.")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            } else if (0 <= code.indexOf("FETCH [APPROX]")){
                /* append */(sb => { sb.str += <any>"/*skipped: " + code + "*/ \n\n"; return sb; })(test);
                continue;
            }
            const skippedPrefixes: string[] = ["IF ", "SUBTYPE subtype_name IS base_type", ":host_variable", "LOOP", "SUBTYPE INTEGER IS NUMBER(38,0)", "FUNCTION TO_CHAR (right DATE) RETURN VARCHAR2;", "ALTER SESSION SET NLS_DATE_FORMAT=\'\"\'\' OR service_type=\'\'Merger\"\';", "-- Second %s in \"Expected %s, found %s\":", "BEFORE", "-- Retrieve ora_sql_txt into  sql_text variable", "ALTER TRIGGER [schema.]trigger_name { ENABLE | DISABLE };", "ALTER TABLE table_name { ENABLE | DISABLE } ALL TRIGGERS;", "declare type VARCHAR2", "declare type DATE", "declare type NUMBER", "--- Original order data ---", "First", "Before", "--- Processing all results simultaneously ---", "------- Results from One Bulk Fetch --------", "EXCEPTION", "-- To save the output of the query to a file:", "Delete succeeded", "CURSOR cursor_name [", "Raise for employee", "declare TYPE type_name IS REF CURSOR [ RETURN return_type ]", "EXEC SQL", "Sum of", "<< label >> (optional)", "With first name first, email is: John.Doe@AcmeCorp", "Table updated?", "INSERT INTO TABLE (", "(SUM", "SUM((", "SELECT TO_CHAR(number, \'fmt\')", "SELECT /*+ PARALLEL_INDEX(table1, index1, 3) */", "TIMESTAMP [(fractional_seconds_precision)]", "INTERVAL YEAR [(year_precision)]", "INTERVAL DAY [(day_precision)]", "SELECT CHR (196 USING NCHAR_CS)", "SELECT COMPOSE( \'o\' || UNISTR(", "(\'CLARK\' || \'SMITH\')", "MIN([table.]column), MAX([table.]column)", "INTERVAL \'5-3\' YEAR TO MONTH + INTERVAL\'20\' MONTH =", "INTERVAL\'20\' DAY - INTERVAL\'240\' HOUR = INTERVAL\'10-0\' DAY TO SECOND", "(10, 20, 40)", ":employee_name INDICATOR :employee_name_indicator_var", "SELECT feature_id, value", "  If (CRN = FRN = RN) then the result is", "                     NULL if VAR_POP(expr2)  = 0", "   if (CRN = FRN = RN) then", "SELECT NCHR(187)", "SELECT TO_SINGLE_BYTE( CHR(15711393)) FROM DUAL;", "PROCEDURE top_protected_proc", "CREATE OR REPLACE PACKAGE protected_pkg", "CREATE trigger FOR dml_event_clause", "Table name", "PROCEDURE protected_proc2", "ALTER TABLE tbl_name {", "PRAGMA COVERAGE (\'NOT_FEASIBLE_START\');", "type VARCHAR2 is new CHAR_BASE;", "EXEC DBMS_OUTPUT.PUT_LINE(ORA_MAX_NAME_LEN_SUPPORTED);", "   a NATURAL LEFT ", "DEF[INE]", "DEFINE DEPARTMENT_ID = \"20\" (", "DEFINE _DATE = \"\" (", "DEFINE _SQLPLUS_RELEASE = \"1201000100\" (", "DEFINE L_NAME = \"SMITH\" (", "EDIT SALES<a id=\"", "SELECT &GROUP_COL, MAX(&NUMBER_COL) MAXIMUM", "MIN (&&", "SUM(&&", "AVG(&&", "CREATE OR REPLACE FUNCTION EmpInfo_fn RETURN -", "FUNCTION afunc RETURNS NUMBER", "ALTER SESSION SET <a", "SELECT HIRE_DATEFROM", "(DESCRIPTION=", "CONNECT hr[", "SELECT CITY, COUNTRY_NAMEFROM", "Table SALESMAN created.", "SELECT FIRST_NAME, LAST_NAME, JOB_ID, SALARYFROM EMP_DETAILS_VIEWWHERE", "COLUMN column_name HEADING column_heading", "LAST                         MONTHLY", "COLUMN<a id=", "BREAK<a", "BREAK ON break_column ON REPORT", "APPEND , COMMISSION_PCT;", "                    A C M E  W I D G E T", "                         A C M E  W I D G E T", "TTITLE<a", "COLUMN column_name NEW_VALUE<a", "SPOOL<a", "DEL [n", "SHUTDOWN [ABORT", "NUMBER CHAR CHAR (n [CHAR", "SAV[E]", "SPO[OL]", "create table D2_t2 (unique1 number) parallel -", "create table D2_t1 (unique1 number) parallel -", "RECOVER {", "COL n S[", "CREATE OR REPLACE TYPE BODY rational AS OBJECT", "DESCRIBE DEPTH 2 LINENUM OFF INDENT ON", "PASSWORD", "STARTUP db_options", "STORE SET file_name[", "Number of employees deleted:", "TYPE type_name IS REF CURSOR [", "SET MARKUP HTML ON SPOOL ON PREFORMAT OFF ENTMAP ON -", "CAST (<table subquery>", "SELECT JSON_OBJECT (\'name\' value \'Foo\' FORMAT JSON STRICT ", "-10   -ten", "SELECT JSON_TRANSFORM (jcol, REMOVE \'$.ssn\') FROM t WHERE", "ADMINISTER KEY MANAGEMENT", "ALTER DISKGROUP", "ALTER TABLE employee RESULT_CACHE (MODE DEFAULT)", "ALTER TABLE <", "CREATE AUDIT POLICY", "CREATE INDEX [schema.]empno_idx ILM_POLICY", "True", "(X IS Person WHERE X.Name = \u2019Fred\')", "(P IS Person WHERE P.firstName = \u2019Fred\u2019)", "ALTER MLE ENV scott.\"myenv\" SET LANGUAGE OPTIONS \u2019js.strict=", "ALTER TABLE  [owner.]name", "-1*INNER_PRODUCT(expr1, expr2);", "NOT ", "(NOT ", "(2 ", "(1 ", "OPEN c FOR SELECT id, data FROM T;", "VECTOR_DISTANCE", "COSINE_DISTANCE", "HAMMING_DISTANCE", "JACCARD_DISTANCE", "INSERT INTO JOBS_Temp(JOB_ID, JOB_TITLE, DUMMY1, DUMMY2) VALUES (\'D\',\'DUMMY\',10,20);", "CREATE TABLE print_media_part (;", "CREATE PROPERTY GRAPH", "[(instance id % 100) ] || [session id % 1000]", "[(instance id % 100) ] || [session id % 1000]", "[(instance id % 100) ] || [session id % 1000]", "[(instance id % 100) ] || [session id % 1000]"];
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
            if (GenerateFrequencies.looksLikeOutput(code)){
                GenerateFrequencies.appendSkip(test, GenerateFrequencies.Diagnostic.SKIP_OUTPUT, "output block " + GenerateFrequencies.prefix(code, 20));
                continue;
            }
            const malformedDocDetail: string = GenerateFrequencies.malformedDocSnippetDetail(code);
            if (malformedDocDetail != null){
                GenerateFrequencies.appendSkip(test, GenerateFrequencies.Diagnostic.SKIP_MALFORMED_DOC, malformedDocDetail);
                continue;
            }
            skip = true;
            const src: Array<LexerToken> = Lexer.parse$java_lang_String(code);
            if (/* size */(<number>src.length) === 0){
                GenerateFrequencies.appendSkip(test, GenerateFrequencies.skipDiagnostic(code), "empty token stream");
                continue;
            }
            const matrix: Matrix = new Matrix(earley);
            try {
                earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
            } catch(e) {
                GenerateFrequencies.logCodeDiagnostic(GenerateFrequencies.Diagnostic.PARSE_EXCEPTION, pageParagraph, e.message, code);
                /* append */(sb => { sb.str += <any>"[0,0) dummy /***parse exception***/\n;\n\n"; return sb; })(test);
                continue;
            }
            const c01: Cell = GenerateFrequencies.cell(matrix, 0, 1);
            if (c01 == null){
                GenerateFrequencies.appendSkip(test, GenerateFrequencies.skipDiagnostic(code), "failed scan " + GenerateFrequencies.prefix(code, 20));
                continue;
            }
            for(let i: number = 0; i < c01.size(); i++) {{
                const pos: number = c01.getPosition(i);
                if (0 < pos){
                    const rule: number = c01.getRule(i);
                    const rhs0: number = earley.rules[rule].rhs[0];
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(earley.allSymbols[rhs0].charAt(0)) == '\''.charCodeAt(0))skip = false;
                }
            };}
            if (skip){
                GenerateFrequencies.appendSkip(test, GenerateFrequencies.skipDiagnostic(code), "failed scan " + GenerateFrequencies.prefix(code, 20));
                continue;
            } else {
                const top: Cell = GenerateFrequencies.cell(matrix, 0, /* size */(<number>src.length));
                if (top == null){
                    GenerateFrequencies.logCodeDiagnostic(GenerateFrequencies.Diagnostic.PARSE_MISS, pageParagraph, "missing full parse cell", code);
                    continue;
                }
                /* append */(sb => { sb.str += <any>"++"; return sb; })(test);
                /* append */(sb => { sb.str += <any>GenerateFrequencies.testNo++; return sb; })(test);
                /* append */(sb => { sb.str += <any>";  /*  "; return sb; })(test);
                /* append */(sb => { sb.str += <any>pageParagraph; return sb; })(test);
                /* append */(sb => { sb.str += <any>"  */\n"; return sb; })(test);
                /* append */(sb => { sb.str += <any>'`'; return sb; })(test);
                /* append */(sb => { sb.str += <any>code; return sb; })(test);
                /* append */(sb => { sb.str += <any>"`->\n"; return sb; })(test);
            }
            let root: ParseNode = null;
            try {
                root = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
            } catch(__e) {
                if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.AssertionError") >= 0)) {
                    const e: Error = <Error>__e;
                    GenerateFrequencies.logCodeDiagnostic(GenerateFrequencies.Diagnostic.PARSE_EXCEPTION, pageParagraph, "AssertionError " + e.message, code);
                    /* append */(sb => { sb.str += <any>"[0,0) dummy /***failed***/\n;\n\n"; return sb; })(test);
                    continue;

                }
                if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.RuntimeException") >= 0) || __e != null && __e instanceof <any>Error) {
                    const e: Error = <Error>__e;
                    GenerateFrequencies.logCodeDiagnostic(GenerateFrequencies.Diagnostic.PARSE_EXCEPTION, pageParagraph, e.message, code);
                    /* append */(sb => { sb.str += <any>"[0,0) dummy /***failed***/\n;\n\n"; return sb; })(test);
                    continue;

                }
            }
            if (root == null || root.to < 2){
                GenerateFrequencies.logCodeDiagnostic(GenerateFrequencies.Diagnostic.PARSE_MISS, pageParagraph, "empty parse forest", code);
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
                    GenerateFrequencies.logCodeDiagnostic(GenerateFrequencies.Diagnostic.PARSE_MISS, pageParagraph, "ambiguous top-level parse forest", code);
                    /* append */(sb => { sb.str += <any>"[0,0) dummy /*failed*/\n;\n\n"; return sb; })(test);
                    continue;
                }
            }
            /* append */(sb => { sb.str += <any>root.tree() + "\n;\n\n"; return sb; })(test);
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(code, "FUNCTION f (x BOOLEAN, y PLS_INTEGER)"))console.error(code);
            try {
                GenerateFrequencies.countFrequencies$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_Matrix(root, matrix);
            } catch(e) {
                GenerateFrequencies.logCodeDiagnostic(GenerateFrequencies.Diagnostic.PARSE_EXCEPTION, pageParagraph, e.message, code);
            }
        };}
    }

    static cell(matrix: Matrix, from: number, to: number): Cell {
        try {
            return matrix.get(from, to);
        } catch(e) {
            return null;
        }
    }

    static skipDiagnostic(code: string): GenerateFrequencies.Diagnostic {
        let diagnostic: GenerateFrequencies.Diagnostic = GenerateFrequencies.Diagnostic.SKIP_MALFORMED_DOC;
        if (GenerateFrequencies.looksLikeOutput(code))diagnostic = GenerateFrequencies.Diagnostic.SKIP_OUTPUT;
        return diagnostic;
    }

    static appendSkip(test: { str: string, toString: Function }, diagnostic: GenerateFrequencies.Diagnostic, detail: string) {
        GenerateFrequencies.countDiagnostic(diagnostic);
        /* append */(sb => { sb.str += <any>"/* "; return sb; })(test);
        /* append */(sb => { sb.str += <any>diagnostic; return sb; })(test);
        /* append */(sb => { sb.str += <any>' '; return sb; })(test);
        /* append */(sb => { sb.str += <any>detail; return sb; })(test);
        /* append */(sb => { sb.str += <any>" */ \n\n"; return sb; })(test);
    }

    static looksLikeOutput(code: string): boolean {
        const trimmed: string = code.trim();
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(trimmed, "{"))return true;
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(trimmed, "The results are:"))return true;
        if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(trimmed, "\nNAME") || (trimmed === ("NAME")))return true;
        if (/* contains */(trimmed.indexOf("\nThe results are:") != -1))return true;
        return false;
    }

    static malformedDocSnippetDetail(code: string): string {
        const compact: string = /* replaceAll */code.trim().replace(new RegExp("\\s+", 'g')," ").toUpperCase();
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(compact, "CREATE OR REPLACE JSON COLLECTION VIEW AS "))return "missing JSON collection view name";
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(compact, "CREATE JSON COLLECTION VIEW AS "))return "missing JSON collection view name";
        return null;
    }

    static trimDocumentationOutput(code: string): string {
        code = GenerateFrequencies.trimFromOutputMarker(code, "\nOutput:");
        code = GenerateFrequencies.trimFromOutputMarker(code, "\nThe results are:");
        return GenerateFrequencies.trimTrailingOutputLine(code, "NAME");
    }

    static trimFromOutputMarker(code: string, marker: string): string {
        const outputIndex: number = code.indexOf(marker);
        if (outputIndex <= 0)return code;
        return code.substring(0, outputIndex);
    }

    static trimTrailingOutputLine(code: string, line: string): string {
        const trimmed: string = code.trim();
        const lastSemicolon: number = trimmed.lastIndexOf(';');
        if (lastSemicolon < 0)return code;
        const tail: string = trimmed.substring(lastSemicolon + 1).trim();
        if (line === tail)return trimmed.substring(0, lastSemicolon + 1);
        return code;
    }

    static normalizeMalformedDocSnippet(code: string): string {
        code = /* replace */code.split("UPDATE table \n  SET date_column = TO_DATE(char, \'fmt\');").join("UPDATE tbl \n  SET date_column = TO_DATE(char_value, \'fmt\');");
        code = /* replace */code.split("ad_header          ADHEADER_T\n  NESTED TABLE").join("ad_header          ADHEADER_T)\n  NESTED TABLE");
        return /* replace */code.split("ALTER SESSION SET _ORACLE_SCRIPT\"=true ;").join("ALTER SESSION SET _ORACLE_SCRIPT=true ;");
    }

    static prefix(code: string, length: number): string {
        if (code.length <= length)return code;
        return code.substring(0, length);
    }

    static logDiagnostic(diagnostic: GenerateFrequencies.Diagnostic, pageParagraph: string, detail: string) {
        GenerateFrequencies.countDiagnostic(diagnostic);
        if (detail == null)detail = "";
        console.error(diagnostic + " " + pageParagraph + " " + detail);
    }

    static logCodeDiagnostic(diagnostic: GenerateFrequencies.Diagnostic, pageParagraph: string, detail: string, code: string) {
        GenerateFrequencies.logDiagnostic(diagnostic, pageParagraph, detail);
        console.error("-------vvvvvvvvvvvvv-------");
        console.error(code);
    }

    static countDiagnostic(diagnostic: GenerateFrequencies.Diagnostic) {
        let count: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.diagnosticCounts_$LI$(), diagnostic);
        if (count == null)count = 0;
        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>GenerateFrequencies.diagnosticCounts_$LI$(), diagnostic, count + 1);
    }

    static printDiagnosticSummary() {
        const summary: { str: string, toString: Function } = { str: "DIAGNOSTIC_SUMMARY", toString: function() { return this.str; } };
        {
            let array = /* Enum.values */function() { let result: GenerateFrequencies.Diagnostic[] = []; for(let val in GenerateFrequencies.Diagnostic) { if (!isNaN(<any>val)) { result.push(parseInt(val,10)); } } return result; }();
            for(let index = 0; index < array.length; index++) {
                let diagnostic = array[index];
                {
                    let count: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.diagnosticCounts_$LI$(), diagnostic);
                    if (count == null)count = 0;
                    /* append */(sb => { sb.str += <any>' '; return sb; })(summary);
                    /* append */(sb => { sb.str += <any>diagnostic; return sb; })(summary);
                    /* append */(sb => { sb.str += <any>'='; return sb; })(summary);
                    /* append */(sb => { sb.str += <any>count; return sb; })(summary);
                }
            }
        }
        console.error(summary);
    }

    static templatesFN: string = "templates.txt";

    static frequenciesFN: string = "frequencies.txt";

    static railroadsFN: string = "railroad.txt";

    static path: string = "/oracle/dbtools/parser/plsql/doc/";

    static templates: any; public static templates_$LI$(): any { if (GenerateFrequencies.templates == null) { GenerateFrequencies.templates = <any>({}); }  return GenerateFrequencies.templates; }

    public static saveTemplates() {
        const filePath: string = GenerateFrequencies.module + "src/main/resources" + GenerateFrequencies.path + GenerateFrequencies.templatesFN;
        const file: File = new File(filePath);
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        let pos: number = 0;
        const refs: any = <any>({});
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>GenerateFrequencies.templates_$LI$());
            for(let index = 0; index < array.length; index++) {
                let k = array[index];
                {
                    const substrs: Array<Substr> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.templates_$LI$(), k);
                    for(let index1 = 0; index1 < substrs.length; index1++) {
                        let substr = substrs[index1];
                        {
                            if (!/* containsKey */refs.hasOwnProperty(substr.getSrc())){
                                bw.write(pos + "=" + substr.getSrc() + "\n");
                                /* put */(refs[substr.getSrc()] = pos);
                                pos++;
                            }
                        }
                    }
                }
            }
        }
        bw.write("===\n");
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>GenerateFrequencies.templates_$LI$());
            for(let index = 0; index < array.length; index++) {
                let k = array[index];
                {
                    bw.write(k + "=\n");
                    const substrs: Array<Substr> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.templates_$LI$(), k);
                    for(let index1 = 0; index1 < substrs.length; index1++) {
                        let substr = substrs[index1];
                        {
                            const str: string = substr.getSrc();
                            const strRef: number = /* get */((m,k) => m[k]===undefined?null:m[k])(refs, str);
                            bw.write(substr.getFrom() + " " + substr.getTo() + " " + strRef + " " + substr.getDocUrl().getMan().toString() + " " + substr.getDocUrl().getPageParagraph() + " " + substr.getWeight() + "\n");
                        }
                    }
                }
            }
        }
        bw.close();
    }

    static frequencies: any = null;

    static countFrequencies$java_lang_String$boolean(input: string, checkSyntax: boolean) {
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String(input);
        if (/* size */(<number>src.length) === 0)return;
        const earley: SqlEarley = /* clone *//* clone */((o: any) => { if (o.clone != undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(SqlEarley.getInstance());
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src, matrix, true, input);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["sql_statements", "subprg_body", "expr", "select", "subquery", "sql_statement"], src, earley, matrix);
        if (s != null){
            console.error(s);
            if (checkSyntax)throw s;
        }
        GenerateFrequencies.countFrequencies$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_Matrix(root, matrix);
    }

    public static countFrequencies$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_Matrix(root: ParseNode, matrix: Matrix) {
        if (GenerateFrequencies.frequencies == null){
            GenerateFrequencies.frequencies = <any>({});
        }
        let alreadyProcessed: number[] = null;
        {
            let array = root.descendants();
            for(let index = 0; index < array.length; index++) {
                let descendant = array[index];
                {
                    const parent: ParseNode = descendant.parent$();
                    if (parent != null){
                        {
                            let array1 = descendant.content$();
                            for(let index1 = 0; index1 < array1.length; index1++) {
                                let i = array1[index1];
                                {
                                    let array2 = parent.content$();
                                    for(let index2 = 0; index2 < array2.length; index2++) {
                                        let j = array2[index2];
                                        {
                                            const key: number = Service.lPair(i, j);
                                            let frequency: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.frequencies, key);
                                            if (frequency == null)frequency = 0;
                                            /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>GenerateFrequencies.frequencies, key, frequency + 1);
                                            alreadyProcessed = Array.insert$long_A$long(alreadyProcessed, key);
                                        }
                                    }
                                }
                            }
                        }
                        {
                            let array1 = descendant.content$();
                            for(let index1 = 0; index1 < array1.length; index1++) {
                                let c = array1[index1];
                                {
                                    let array2 = descendant.content$();
                                    for(let index2 = 0; index2 < array2.length; index2++) {
                                        let p = array2[index2];
                                        {
                                            if (c === p)continue;
                                            for(let index3 = 0; index3 < SqlEarley.getInstance().rules.length; index3++) {
                                                let t = SqlEarley.getInstance().rules[index3];
                                                {
                                                    if (t.head === p && t.rhs.length === 1){
                                                        if (t.rhs[0] === c){
                                                            const key: number = Service.lPair(c, p);
                                                            let frequency: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.frequencies, key);
                                                            if (frequency == null)frequency = 0;
                                                            /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>GenerateFrequencies.frequencies, key, frequency + 1);
                                                            alreadyProcessed = Array.insert$long_A$long(alreadyProcessed, key);
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        {
                            let array1 = descendant.content$();
                            for(let index1 = 0; index1 < array1.length; index1++) {
                                let i = array1[index1];
                                {
                                    const key: number = Service.lPair(i, 0);
                                    let frequency: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.frequencies, key);
                                    if (frequency == null)frequency = 0;
                                    /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>GenerateFrequencies.frequencies, key, frequency + 1);
                                    alreadyProcessed = Array.insert$long_A$long(alreadyProcessed, key);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public static countFrequencies(root?: any, matrix?: any) {
        if (((root != null && root instanceof <any>ParseNode) || root === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null)) {
            return <any>GenerateFrequencies.countFrequencies$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_Matrix(root, matrix);
        } else if (((typeof root === 'string') || root === null) && ((typeof matrix === 'boolean') || matrix === null)) {
            return <any>GenerateFrequencies.countFrequencies$java_lang_String$boolean(root, matrix);
        } else throw new Error('invalid overload');
    }

    public static saveFrequencies() {
        const filePath: string = GenerateFrequencies.module + "src/main/resources" + GenerateFrequencies.path + GenerateFrequencies.frequenciesFN;
        const file: File = new File(filePath);
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>GenerateFrequencies.frequencies);
            for(let index = 0; index < array.length; index++) {
                let k = array[index];
                {
                    bw.write(k + "=" + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.frequencies, k) + "\n");
                }
            }
        }
        bw.close();
    }

    static railroads: any; public static railroads_$LI$(): any { if (GenerateFrequencies.railroads == null) { GenerateFrequencies.railroads = <any>({}); }  return GenerateFrequencies.railroads; }

    public static saveRailroads() {
        const filePath: string = GenerateFrequencies.module + "src/main/resources" + GenerateFrequencies.path + GenerateFrequencies.railroadsFN;
        const file: File = new File(filePath);
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>GenerateFrequencies.railroads_$LI$());
            for(let index = 0; index < array.length; index++) {
                let k = array[index];
                {
                    bw.write(k + "=" + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.railroads_$LI$(), k).man + " " + /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>GenerateFrequencies.railroads_$LI$(), k).pageParagraph + "\n");
                }
            }
        }
        bw.close();
    }

    static readURL(masterBNFurl: string): string {
        if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".pdf") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".mobi") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterBNFurl, ".epub"))return "";
        const bytes: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(4096);
        let bytesRead: number = 0;
        const url: URL = <URL>new URL(masterBNFurl);
        console.info('.');
        const bin: BufferedInputStream = new BufferedInputStream(url.openStream());
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
GenerateFrequencies["__class"] = "oracle.dbtools.parser.plsql.GenerateFrequencies";


export namespace GenerateFrequencies {

    /**
     * Labels used by this documentation harvester when a documentation example
     * cannot be used as parser input.
     * @enum
     * @property {GenerateFrequencies.Diagnostic} FETCH_REDIRECT
     * @property {GenerateFrequencies.Diagnostic} PAGE_ERROR
     * @property {GenerateFrequencies.Diagnostic} SKIP_OUTPUT
     * @property {GenerateFrequencies.Diagnostic} SKIP_MALFORMED_DOC
     * @property {GenerateFrequencies.Diagnostic} PARSE_MISS
     * @property {GenerateFrequencies.Diagnostic} PARSE_EXCEPTION
     * @class
     */
    export enum Diagnostic {
        FETCH_REDIRECT, PAGE_ERROR, SKIP_OUTPUT, SKIP_MALFORMED_DOC, PARSE_MISS, PARSE_EXCEPTION
    }

    export class GenerateFrequencies$0 extends Earley {
        /**
         * 
         * @param {number} y
         * @param {LexerToken[]} src
         * @param {number} symbol
         * @param {number} suspect
         * @return {boolean}
         */
        isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
            const token: LexerToken = /* get */src[y];
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING || symbol === this.identifier && token.type === Token.BQUOTED_STRING;
        }

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}




import { Parser } from '../Parser';


import { SyntaxError } from './SyntaxError';


import { SqlEarley } from './SqlEarley';


GenerateFrequencies.main(null);
