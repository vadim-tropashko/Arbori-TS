/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../arbori/util/Service';
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { VisualImpl } from '../VisualImpl';
import { SyntaxError } from '../plsql/SyntaxError';

/**
 * Runs the APEX Earley parser against an APEX source file.
 * @class
 */
export class ApexEarleyExample {
    static DEPRECATION_MESSAGE: string = "Deprecated in favor of APEXLangSecurityAnalyzer";

    constructor() {
    }

    /**
     * Parses the source file supplied as the only argument.
     * 
     * @param {java.lang.String[]} args one APEX source-file path
     * @throws Exception when the source or grammar cannot be read or parsed
     */
    public static main(args: string[]) {
        let earley: Earley;
        try {
            earley = ApexEarley.getInstance();
        } catch(error) {
            if (ApexEarleyExample.DEPRECATION_MESSAGE === error.message){
                return;
            }
            throw error;
        }
        let input: string;
        const input1: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.apx");
        input = input1;
        const src: Array<LexerToken> = ApexLexer1.parse$java_lang_String(input);
        if (/* size */(<number>src.length) <= 1000){
            LexerToken.print$java_util_List(src);
        }
        const matrix: Matrix = new Matrix(earley);
        if (/* size */(<number>src.length) < 1000){
            matrix.visual = new VisualImpl(src, earley);
        }
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        if (matrix.visual != null){
            matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
        }
        const top: Cell = matrix.get(0, /* size */(<number>src.length));
        if (top != null){
            console.info(/* size */(<number>src.length) + " tokens, top = " + top);
            const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src, matrix, true, input);
            if (/* size */(<number>src.length) < 1000){
                root.printTree$();
            } else {
                root.printTree$int(10);
            }
        } else {
            console.info(SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["apex", "app", "component", "program", "page"], src, earley, matrix));
        }
    }
}
ApexEarleyExample["__class"] = "oracle.dbtools.parser.apex.ApexEarleyExample";




import { ApexLexer1 } from './ApexLexer1';


import { ApexEarley } from './ApexEarley';


ApexEarleyExample.main(null);
