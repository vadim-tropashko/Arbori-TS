/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { SyntaxError } from '../plsql/SyntaxError';

/**
 * Parses the Oracle APEX sample-apps APEXlang corpus until a syntax error is
 * found.
 * @class
 */
export class ApexVolumeTest {
    static DEPRECATION_MESSAGE: string = "Deprecated in favor of APEXLangSecurityAnalyzer";

    static PAGE_DIRECTORY: Path; public static PAGE_DIRECTORY_$LI$(): Path { if (ApexVolumeTest.PAGE_DIRECTORY == null) { ApexVolumeTest.PAGE_DIRECTORY = Path.of("/Users/VTROPASH/Documents/GitHub/oracle-apex-26.1/sample-apps"); }  return ApexVolumeTest.PAGE_DIRECTORY; }

    static TIME_LIMIT: Duration; public static TIME_LIMIT_$LI$(): Duration { if (ApexVolumeTest.TIME_LIMIT == null) { ApexVolumeTest.TIME_LIMIT = Duration.ofMinutes(30); }  return ApexVolumeTest.TIME_LIMIT; }

    constructor() {
    }

    /**
     * Parses every non-excluded APEXlang page in filename order, stopping at
     * the first syntax error or when the time limit is reached.
     * 
     * @param {java.lang.String[]} args ignored
     * @throws Exception when the corpus cannot be read
     */
    public static main(args: string[]) {
        const deadline: Instant = Instant.now().plus(ApexVolumeTest.TIME_LIMIT_$LI$());
        let earley: Earley;
        try {
            earley = ApexEarley.getInstance();
        } catch(error) {
            if (ApexVolumeTest.DEPRECATION_MESSAGE === error.message){
                return;
            }
            throw error;
        }
        let parsed: number = 0;
        let errors: number = 0;
        let totalParseNanos: number = 0;
        let maxParseNanos: number = 0;
        let slowestPage: Path = null;
        const paths: Stream<Path> = Files.walk(ApexVolumeTest.PAGE_DIRECTORY_$LI$());
        try {
            const pages: Array<Path> = <any>(paths.filter((path) => /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(path.getFileName().toString(), ".apx")).sorted().collect<any, any>(Collectors.toList<any>()));
            for(let index = 0; index < pages.length; index++) {
                let page = pages[index];
                {
                    if (Instant.now().isAfter(deadline)){
                        console.info("Stopped after " + ApexVolumeTest.TIME_LIMIT_$LI$() + ": " + parsed + " pages parsed");
                        ApexVolumeTest.printTiming(totalParseNanos, maxParseNanos, slowestPage);
                        return;
                    }
                    const result: ApexVolumeTest.ParseResult = ApexVolumeTest.parse(page, earley);
                    totalParseNanos += result.parseNanos;
                    if (maxParseNanos < result.parseNanos){
                        maxParseNanos = result.parseNanos;
                        slowestPage = page;
                    }
                    if (result.parsed){
                        parsed++;
                    } else {
                        errors++;
                    }
                }
            }
        } finally {
            paths.close();
        }
        console.info("Parsed " + parsed + " pages without errors");
        console.info("Errors " + errors);
        ApexVolumeTest.printTiming(totalParseNanos, maxParseNanos, slowestPage);
    }

    /**
     * Parses one page and prints its syntax error when it cannot be parsed.
     * 
     * @param {*} page source file to parse
     * @param {Earley} earley APEX Earley parser
     * @return {ApexVolumeTest.ParseResult} parse completion and parser time for the page
     * @throws IOException when the source file cannot be read
     * @private
     */
    static parse(page: Path, earley: Earley): ApexVolumeTest.ParseResult {
        const input: string = Files.readString(page);
        const source: Array<LexerToken> = ApexLexer1.parse$java_lang_String(input);
        const matrix: Matrix = new Matrix(earley);
        const started: number = /* nanoTime */(Date.now() * 1000000);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(source, matrix);
        const parseNanos: number = /* nanoTime */(Date.now() * 1000000) - started;
        const top: Cell = matrix.get(0, /* size */(<number>source.length));
        if (top != null){
            return new ApexVolumeTest.ParseResult(true, parseNanos);
        }
        console.info(page);
        console.info(SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["apex", "app", "component", "program", "page"], source, earley, matrix));
        return new ApexVolumeTest.ParseResult(false, parseNanos);
    }

    /**
     * Prints cumulative and worst-case Earley recognition time for the corpus.
     * @param {number} totalParseNanos
     * @param {number} maxParseNanos
     * @param {*} slowestPage
     * @private
     */
    static printTiming(totalParseNanos: number, maxParseNanos: number, slowestPage: Path) {
        console.info("Aggregate parse time: %.3f s%n");
        if (slowestPage != null){
            console.info("Max parse time: %.3f s %s%n");
        }
    }

    /**
     * Converts a parser duration from nanoseconds to seconds.
     * @param {number} nanos
     * @return {number}
     * @private
     */
    static seconds(nanos: number): number {
        return nanos / 1.0E9;
    }
}
ApexVolumeTest["__class"] = "oracle.dbtools.parser.apex.ApexVolumeTest";


export namespace ApexVolumeTest {

    /**
     * Holds the recognition result and duration for one corpus source.
     * @class
     */
    export class ParseResult {
        parsed: boolean;

        parseNanos: number;

        constructor(parsed: boolean, parseNanos: number) {
            if (this.parsed === undefined) { this.parsed = false; }
            if (this.parseNanos === undefined) { this.parseNanos = 0; }
            this.parsed = parsed;
            this.parseNanos = parseNanos;
        }
    }
    ParseResult["__class"] = "oracle.dbtools.parser.apex.ApexVolumeTest.ParseResult";

}




import { ApexLexer1 } from './ApexLexer1';


import { ApexEarley } from './ApexEarley';


ApexVolumeTest.main(null);
