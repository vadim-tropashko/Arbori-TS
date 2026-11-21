/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { IO } from '../../../arbori/util/IO';
import { Service } from '../../../arbori/util/Service';
import { Program } from '../../arbori/Program';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { Tree } from '../Tree';
import { JavaEarley } from './JavaEarley';

export class Scan {
    static crossCheckSameFile: boolean = true;

    static earley: JavaEarley; public static earley_$LI$(): JavaEarley { if (Scan.earley == null) { Scan.earley = JavaEarley.getInstance(); }  return Scan.earley; }

    public static main(args: string[]) {
        const diffs: Array<Diff> = <any>([]);
        const t1: number = /* currentTimeMillis */Date.now();
        let total: number = -1;
        let errors: number = 0;
        let totalParseTime: number = 0;
        let maxParseTime: number = 0;
        let maxParseTimeFile: string = null;
        const file2parsed: any = <any>({});
        const file2consequtiveStmts: any = <any>({});
        const prg: string = "statements: [node) blockStatement \n->\n";
        const program: Program = new Program(Scan.earley_$LI$());
        program.compile$java_lang_String(prg);
        const files: Array<string> = <any>([]);
        const locations: string[] = ["/Users/VTROPASH/git/dbtools-commons/"];
        for(let index = 0; index < locations.length; index++) {
            let location = locations[index];
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(files, IO.fileNamesInDirectory(location, "java"))
        }
        console.info("Processing " + /* size */(<number>files.length) + " files...");
        for(let index = 0; index < files.length; index++) {
            let file = files[index];
            try {
                total++;
                if (total % 100 === 0){
                    console.info("------------");
                    console.info("total=" + total);
                    console.info("errors=" + errors);
                }
                const input: string = Service.readFile$java_lang_String(file);
                const start: number = /* currentTimeMillis */Date.now();
                const parsed: Parsed = Scan.earley_$LI$().parse$java_lang_String(input);
                const time: number = /* currentTimeMillis */Date.now() - start;
                totalParseTime += time;
                if (maxParseTime < time){
                    maxParseTime = time;
                    maxParseTimeFile = file;
                }
                if (parsed == null){
                    errors++;
                    continue;
                }
                /* put */(file2parsed[file] = parsed);
                const tmp: Array<ParseNode> = <any>([]);
                program.compile$java_lang_String(prg);
                program.eval$oracle_dbtools_parser_Parsed$java_lang_Object(parsed, new Scan.Scan$0(tmp));
                /* put */(file2consequtiveStmts[file] = Tree.consequtiveStatements(tmp));
            } catch(e) {
                console.error(e.message, e);
            }
        }
        const t2: number = /* currentTimeMillis */Date.now();
        console.info("total=" + total);
        console.info("errors=" + errors);
        console.info("Time=" + (n => n<0?Math.ceil(n):Math.floor(n))((t2 - t1) / 1000) + "s");
        console.info("Parse Time=" + totalParseTime + "ms");
        console.info("Max Parse Time=" + maxParseTime + "ms");
        console.info(maxParseTimeFile);
        {
            let array = /* keySet */Object.keys(file2parsed);
            for(let index = 0; index < array.length; index++) {
                let file1 = array[index];
                {
                    let array1 = /* keySet */Object.keys(file2parsed);
                    for(let index1 = 0; index1 < array1.length; index1++) {
                        let file2 = array1[index1];
                        {
                            if (/* compareTo */file2.localeCompare(file1) < 0)continue;
                            if (!Scan.crossCheckSameFile && /* compareTo */file2.localeCompare(file1) === 0)continue;
                            const consStmts1: Array<Array<ParseNode>> = /* get */((m,k) => m[k]===undefined?null:m[k])(file2consequtiveStmts, file1);
                            const consStmts2: Array<Array<ParseNode>> = /* get */((m,k) => m[k]===undefined?null:m[k])(file2consequtiveStmts, file2);
                            for(let i: number = 0; i < /* size */(<number>consStmts1.length); i++) {for(let j: number = i + 1; j < /* size */(<number>consStmts2.length); j++) {{
                                const stmtsI: Array<ParseNode> = /* get */consStmts1[i];
                                const stmtsJ: Array<ParseNode> = /* get */consStmts2[j];
                                const match: boolean = Tree.match$java_util_List$java_util_List(stmtsI, stmtsJ);
                                if (match){
                                    const diff: Diff = new Diff(file1, /* get */((m,k) => m[k]===undefined?null:m[k])(file2parsed, file1), stmtsI, file2, /* get */((m,k) => m[k]===undefined?null:m[k])(file2parsed, file2), stmtsJ);
                                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(diffs, diff);
                                }
                            };};}
                        }
                    }
                }
            }
        }
        let i: number = 0;
        for(let index = 0; index < diffs.length; index++) {
            let diff = diffs[index];
            {
                i++;
                console.info("-------- " + i + " --------");
                console.info(diff.report());
            }
        }
    }
}
Scan["__class"] = "oracle.dbtools.parser.java.Scan";


export namespace Scan {

    export class Scan$0 {
        public statements(target: Parsed, tuple: any) {
            /* add */(this.tmp.push(/* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node"))>0);
        }

        constructor(private tmp: any) {
        }
    }

}




import { Diff } from './Diff';


Scan.main(null);
