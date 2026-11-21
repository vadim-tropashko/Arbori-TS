/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../parser/Earley';
import { Lexer } from '../parser/Lexer';
import { LexerToken } from '../parser/LexerToken';
import { Matrix } from '../parser/Matrix';
import { ParseNode } from '../parser/ParseNode';
import { Resource } from '../parser/Resource';
import { Visual } from '../parser/Visual';
import { SyntaxError } from '../parser/plsql/SyntaxError';
import { Service } from '../../arbori/util/Service';

export class ParseTest {
    public static main(args: string[]) {
        const arboriProgram: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.arbori");
        const arboriParser: Earley = Program.getArboriParser();
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(arboriProgram, false, LexerToken.ARBORI_$LI$());
        if (/* size */(<number>src.length) < 300)LexerToken.print$java_util_List(src);
        const matrix: Matrix = new Matrix(arboriParser);
        matrix.visual = new Visual(src, arboriParser);
        arboriParser.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (/* size */(<number>src.length) < 300)matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const root: ParseNode = arboriParser.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src, matrix, true);
        root.printTree$int(3);
        const err: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(arboriProgram, ["program"], src, Program.getArboriParser(), matrix);
        if (err != null)console.error(err.getDetailedMessage());
        return;
    }
}
ParseTest["__class"] = "oracle.dbtools.arbori.ParseTest";




import { Program } from './Program';


ParseTest.main(null);
