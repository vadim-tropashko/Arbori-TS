/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Base } from '../../../../../../main/typescript/oracle/dbtools/test/Base.js';
import { ParseNode } from '../../../../../../main/typescript/oracle/dbtools/parser/ParseNode.js';
import { SyntaxError } from '../../../../../../main/typescript/oracle/dbtools/parser/plsql/SyntaxError.js';

export class SyntaxErrorTest extends Base {
    public constructor() {
        super("src/test/resources/oracle/dbtools/parser/plsql/syntax_error.test");
    }

    public output(root?: any, src?: any, input?: any, testNum?: any) {
        if (((root != null && root instanceof <any>ParseNode) || root === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof input === 'string') || input === null) && ((typeof testNum === 'number') || testNum === null)) {
            super.output(root, src, input, testNum);
        } else if (((typeof root === 'string') || root === null) && ((typeof src === 'number') || src === null) && input === undefined && testNum === undefined) {
            return <any>this.output$java_lang_String$int(root, src);
        } else throw new Error('invalid overload');
    }

    public output$java_lang_String$int(sql: string, pos: number): Array<string> {
        const err: SyntaxError = SyntaxError.checkSQLStatementSyntax$java_lang_String(sql);
        const ret: Array<string> = <any>([]);
        /* add */(ret.push(err.getDetailedMessage())>0);
        return ret;
    }

    /**
     * 
     * @param {string} output
     * @param {string} cmp
     * @return {boolean}
     */
    cmp(output: string, cmp: string): boolean {
        return 0 <= output.indexOf(cmp);
    }

    public static main(args: string[]) {
        const success: boolean = new SyntaxErrorTest().test();
        if (!success)process.exitCode = 1;
    }
}
SyntaxErrorTest["__class"] = "oracle.dbtools.parser.plsql.SyntaxErrorTest";




if (process.argv[1]?.endsWith("/SyntaxErrorTest.ts") || process.argv[1]?.endsWith("/SyntaxErrorTest.js")) {
    SyntaxErrorTest.main([]);
}
