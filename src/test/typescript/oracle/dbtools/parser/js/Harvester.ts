/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Token } from '../Token';
import { Visual } from '../Visual';
import { JavaScript } from './JavaScript';
import { SyntaxError } from '../plsql/SyntaxError';
import { Service } from '../../../arbori/util/Service';

export class Harvester {
    static T: boolean = true;

    static F: boolean = false;

    static run2Error: boolean; public static run2Error_$LI$(): boolean { if (Harvester.run2Error == null) { Harvester.run2Error = Harvester.F; }  return Harvester.run2Error; }

    public static main(args: string[]) {
        const location: string = "/Users/VTROPASH/VSCODE-workspace/vscode-sql-lang-svr-client";
        const earley: Earley = Parser.getInstance();
        const earley1: Earley = JavaScript.getInstance();
        let cnt: number = 1;
        let errors: number = 0;
        const optimErrors: number = 0;
        let severe: number = 0;
        let minified: number = 0;
        const errors1: number = 0;
        let time: number = 0;
        const time1: number = 0;
        const regexp: number = 0;
        const div: number = 0;
        {
            let array = Service.visitor4Directory(location, ["js"]);
            for(let index = 0; index < array.length; index++) {
                let f = array[index];
                try {
                    console.info(cnt++ + " >>>>> " + f.getAbsolutePath().substring(location.length) + "");
                    if (Harvester.run2Error_$LI$() && cnt < 1200)continue;
                    const input: string = Service.readFile$java_lang_String(f.getAbsolutePath());
                    const map: number[] = Service.lineMap(input);
                    if (map.length < 5 && 1000 < input.length || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(f.getAbsolutePath(), "min.js")){
                        minified++;
                        console.info('*');
                        continue;
                    }
                    const src: Array<LexerToken> = LexerToken.parse$java_lang_String$java_lang_String$int(input, "&`", LexerToken.JS_$LI$());
                    const matrix: Matrix = new Matrix(earley);
                    const matrix1: Matrix = new Matrix(earley1);
                    const t1: number = /* currentTimeMillis */Date.now();
                    earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
                    const top: Cell = matrix.get(0, /* size */(<number>src.length));
                    if (top == null){
                        errors++;
                        if (Harvester.run2Error_$LI$()){
                            const err: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["Statement_List1"], src, earley, matrix);
                            console.info(err.getDetailedMessage());
                            return;
                        }
                    }
                    const t2: number = /* currentTimeMillis */Date.now();
                    time += t2 - t1;
                    if (Harvester.run2Error_$LI$())continue;
                    if (cnt % 100 === 0){
                        console.info("errors=" + errors + ",time=" + time);
                        console.info("Optimization errors=" + optimErrors);
                        console.info("severe=" + severe);
                        console.info("minified=" + minified);
                        console.info("errors1=" + errors1 + ",time1=" + time1);
                        console.info("regexp=" + regexp + ",div=" + div);
                    }
                } catch(e) {
                    console.error(e.message);
                    severe++;
                }
            }
        }
        console.info("errors=" + errors + ",time=" + time);
        console.info("Optimization errors=" + optimErrors);
        console.info("severe=" + severe);
        console.info("minified=" + minified);
        console.info("errors1=" + errors1 + ",time1=" + time1);
    }
}
Harvester["__class"] = "oracle.dbtools.parser.js.Harvester";




import { Parser } from './Parser';


Harvester.main(null);
