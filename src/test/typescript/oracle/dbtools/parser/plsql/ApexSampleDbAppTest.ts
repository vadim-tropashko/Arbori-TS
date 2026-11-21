/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { MaterializedPredicate } from '../../arbori/MaterializedPredicate';
import { Program } from '../../arbori/Program';
import { SqlProgram } from '../../arbori/SqlProgram';
import { Service } from '../../../arbori/util/Service';

export class ApexSampleDbAppTest {
    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String("..\\sqlcl\\test\\regression\\testcases\\apex_exit\\source\\x_Sample_DB_Application.sql");
        SqlExample.main([input]);
        Program.debug = false;
        const include: string = "include \"std.arbori\"\r\n\r\n{\r\n\r\n    function resetReport() {\r\n    }\r\n    \r\n    function logString(str) {\r\n        print(str)\r\n    }\r\n    \r\n    \r\n    \r\n    function report(node, msg) {\r\n        if( 0 == cnt++ )\r\n            logString(msg+\':\');\r\n        \r\n        var pos = target.src.get(tuple.get(node).from).begin; \r\n        var line = Service.charPos2LineNo(target.input,pos);\r\n        //var offset = pos - Service.lineNo2CharPos(target.input,line);\r\n        //if( offset < 0 )\r\n            //offset = 0;\r\n        //logString(\'#\'+line);\r\n    \r\n        //struct.diagnostics.put(pos,msg);\r\n    }\r\n    \r\n    function ruleBrk() {\r\n        cnt = 0;\r\n        logString(\'\');\r\n    }\r\n    \r\n    \r\n    \r\n    var Service= Java.type(\'oracle.arbori.util.Service\');\r\n    \r\n    var cnt = 0;\r\n    \r\n}\r\n";
        let prg: string = Program.getContent("../app/psr/smallchecks.arbori");
        prg = prg + Program.getContent("../app/psr/mediumchecks.arbori");
        prg = /* replace */prg.split("include \"../app/psr/queryUtil.js\"").join(include);
        prg = /* replace */prg.split("include \"..\\app\\psr\\queryUtil.js\"").join(include);
        const program: SqlProgram = new SqlProgram(include + prg);
        Program.debug = true;
        Program.timing = true;
        const predicateVectors: any = program.run$java_lang_String(input);
    }
}
ApexSampleDbAppTest["__class"] = "oracle.dbtools.parser.plsql.ApexSampleDbAppTest";




import { SqlExample } from './SqlExample';


ApexSampleDbAppTest.main(null);
