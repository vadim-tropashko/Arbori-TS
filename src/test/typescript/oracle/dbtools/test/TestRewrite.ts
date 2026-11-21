/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Program } from '../arbori/Program';
import { SqlProgram } from '../arbori/SqlProgram';
import { Lexer } from '../parser/Lexer';
import { LexerToken } from '../parser/LexerToken';
import { Matrix } from '../parser/Matrix';
import { ParseNode } from '../parser/ParseNode';
import { Parsed } from '../parser/Parsed';
import { Substitutions } from '../parser/Substitutions';
import { Visual } from '../parser/Visual';
import { SyntaxError } from '../parser/plsql/SyntaxError';
import { Service } from '../../arbori/util/Service';

export class TestRewrite {
    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String("dbtools-libraries/dbtools-arbori/src/test/resources/oracle/dbtools/parser/plsql/doc/doc_plsql.test.1");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$java_lang_String(input, "`");
        const visual: Visual = null;
        const matrix: Matrix = new Matrix(ParserTest.testParser);
        ParserTest.testParser.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["atest"], src, ParserTest.testParser, matrix);
        if (s != null){
            if (visual != null)visual.draw$oracle_dbtools_parser_Matrix(matrix);
            console.error("Syntax Error");
            console.error("at line#" + s.line);
            console.error(s.code);
            console.error(s.marker);
            console.error("Expected:  ");
            {
                let array = s.getSuggestions();
                for(let index = 0; index < array.length; index++) {
                    let tmp = array[index];
                    console.info(tmp + ',')
                }
            }
            throw Object.defineProperty(new Error(">>>> syntactically invalid code fragment <<<<"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
        }
        const root: ParseNode = ParserTest.testParser.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const target: 
    }
    TestRewrite["__class"] = "oracle.dbtools.test.TestRewrite";




import { ParserTest } from './ParserTest';


TestRewrite.main(null);
