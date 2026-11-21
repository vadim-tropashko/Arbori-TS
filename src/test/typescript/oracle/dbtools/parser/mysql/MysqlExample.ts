/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../arbori/util/Service';
import { SyntaxError } from '../plsql/SyntaxError';

export class MysqlExample {
    public static main(args: string[]) {
        MysqlEarley.visualize = true;
        const input: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.sql");
        const earley: Earley = new MysqlEarley();
        const T: boolean = true;
        const F: boolean = false;
        earley.printOrderedRules("separator", F, F);
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, Lexer.QuotedStrings + Lexer.SqlPlusComments + Lexer.SqlLineComments + Lexer.JavaSqlMultilineComments + Lexer.PoundComments);
        if (/* size */(<number>src.length) < 100)LexerToken.print$java_util_List(src);
        const matrix: Matrix = new Matrix(earley);
        if (MysqlEarley.visualize && /* size */(<number>src.length) < 1000)matrix.visual = new VisualImpl(src, earley);
        if (!MysqlEarley.visualize)matrix.visual = null;
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (matrix.visual != null)matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const top: Cell = matrix.get(0, /* size */(<number>src.length));
        if (top != null)console.info(/* size */(<number>src.length) + " tokens, top = " + top.toString()); else {
            console.info(SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["sqlStatements"], src, earley, matrix));
        }
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src, matrix, true, input);
        if (/* size */(<number>src.length) < 1000)root.printTree$(); else root.printTree$int(10);
    }
}
MysqlExample["__class"] = "oracle.dbtools.parser.mysql.MysqlExample";




import { ParseNode } from '../ParseNode';


import { Cell } from '../Cell';


import { VisualImpl } from '../VisualImpl';


import { Matrix } from '../Matrix';


import { Lexer } from '../Lexer';


import { LexerToken } from '../LexerToken';


import { Earley } from '../Earley';


import { MysqlEarley } from './MysqlEarley';


MysqlExample.main(null);
