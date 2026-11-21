/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { RuleTuple } from '../RuleTuple';

/**
 * Output grammar to various applications (for .Net team, JS parser, etc).
 * @author Dim
 * @class
 */
export class ExportGrammar {
    public static main(args: string[]) {
        const isJS: boolean = true;
        if (isJS){
            ExportGrammar.copyGrammar(isJS, "/Users/VTROPASH/Documents/Grammar.js");
        } else ExportGrammar.copyGrammar(isJS, "C:\\Temp\\sqlgrammar.txt");
    }

    /*private*/ static copyGrammar(isJS: boolean, fname: string) {
        const file: File = new File(fname);
        if (!file.exists()){
            file.createNewFile();
        }
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        if (isJS){
            const prelude: string = "/*\r\n * Copyright (c) 2015-22, Oracle and/or its affiliates. All rights reserved.\r\n\r\nThis is generated file \r\nhttps://confluence.oraclecorp.com/confluence/display/DBTools/SQL+Grammar+Amendments+Process \r\n */\r\n\r\ndefine(\r\n    [],\r\n    function(){\r\n        var rules = [\r\n            // Added by Andres\r\n            {head:\"sqldev_block\",rhs:[\"sql_query_or_dml_stmt\"]},\r\n            {head:\"sqldev_blocks\",rhs:[\"sqldev_block\"]},\r\n            {head:\"sqldev_blocks\",rhs:[\"sqldev_block\",\"\'/\'\"]},\r\n            {head:\"sqldev_blocks\",rhs:[\"sqldev_block\",\"\'/\'\",\"sqldev_blocks\"]},\r\n            // End added\r\n";
            bw.write(prelude);
        }
        {
            let array = SqlEarley.getRules();
            for(let index = 0; index < array.length; index++) {
                let rule = array[index];
                {
                    if (isJS){
                        bw.write("            {head:\"");
                        bw.write(/* replace */rule.head.split("\"").join("\\\""));
                        bw.write("\",rhs:[\"");
                        let pos: number = -1;
                        for(let index1 = 0; index1 < rule.rhs.length; index1++) {
                            let t = rule.rhs[index1];
                            {
                                if (0 < ++pos)bw.write("\",\"");
                                bw.write(/* replace */t.split("\"").join("\\\""));
                            }
                        }
                        bw.write("\"]},\n");
                    } else {
                        bw.write(rule.toString() + "\n");
                    }
                }
            }
        }
        if (isJS){
            const finale: string = "        ];\r\n\r\n        return {\r\n            Rules : rules,\r\n            StartRule : \'sqldev_blocks\'\r\n        };\r\n    }\r\n)";
            bw.write(finale);
        }
        bw.close();
    }

    /*private*/ static saveGrammar() {
        /* forName */eval("oracle.jdbc.OracleDriver".split('.').slice(-1)[0]);
        const conn: Connection = DriverManager.getConnection("jdbc:oracle:thin:@llg00hon.uk.oracle.com:1521/DB12201", "hr", "hr");
        const stmt: PreparedStatement = conn.prepareStatement("insert into sql122_grammar values(?,?)");
        {
            let array = SqlEarley.getRules();
            for(let index = 0; index < array.length; index++) {
                let rule = array[index];
                {
                    const r: string = rule.toString();
                    const semiColPos: number = r.indexOf(':');
                    const rhs: string = r.substring(semiColPos + 1);
                    stmt.setString(1, rule.head);
                    stmt.setString(2, rhs);
                    stmt.execute();
                    console.info(r);
                }
            }
        }
    }
}
ExportGrammar["__class"] = "oracle.dbtools.parser.plsql.ExportGrammar";




import { SqlEarley } from './SqlEarley';


ExportGrammar.main(null);
