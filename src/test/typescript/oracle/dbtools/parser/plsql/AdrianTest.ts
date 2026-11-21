/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';
import { Service } from '../../../arbori/util/Service';

export class AdrianTest {
    public static main(args: string[]) {
        let test: string = Service.readFile$java_lang_String("/Users/VTROPASH/Downloads/stmts.txt");
        test = /* replace */test.split("\n\n").join("\n`");
        const st: StringTokenizer = new StringTokenizer(test, "`", false);
        let total: number = 0;
        let errors: number = 0;
        while((st.hasMoreTokens())) {{
            const sql: string = st.nextToken();
            if (/* contains */(sql.toLowerCase().indexOf("unrecoverable") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("delete sales s from customers c") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("jsontoxml(") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("xmltojson(") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("shell(") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("nvarchar") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("etag_matches") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("sys_jsonconvscalar(") != -1)){
                continue;
            }
            if (/* contains */(sql.toLowerCase().indexOf("sys_ctx_contains") != -1)){
                continue;
            }
            if (/* contains */(sql.toUpperCase().indexOf("JSON {KEY:KEY VALUE:KEY}") != -1)){
                continue;
            }
            if (/* contains */(sql.toUpperCase().indexOf("JSON_PATCH(") != -1)){
                continue;
            }
            if (/* contains */(sql.toUpperCase().indexOf("SYS_CTX_MKIVIDX") != -1)){
                continue;
            }
            if (/* contains */(sql.toUpperCase().indexOf("DBSTR2UTF8") != -1)){
                continue;
            }
            total++;
            const src: Array<LexerToken> = Lexer.parse$java_lang_String(sql);
            const root: ParseNode = SqlEarley.getInstance().parse$java_util_List(src);
            if (root.topLevel != null){
                errors++;
                console.info(sql);
                console.info("----------");
            }
        }};
        console.info("total = " + total + " , errors=" + errors);
    }
}
AdrianTest["__class"] = "oracle.dbtools.parser.plsql.AdrianTest";




import { SqlEarley } from './SqlEarley';


AdrianTest.main(null);
