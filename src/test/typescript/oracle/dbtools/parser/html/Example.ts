/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../../arbori/util/Service';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';

export class Example {
    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String("src/test/resources/oracle/dbtools/parser/html/example.html");
        const limit: number = 1000;
        const t1: number = /* currentTimeMillis */Date.now();
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.HtmlComments_$LI$());
        if (/* size */(<number>src.length) < 100)LexerToken.print$java_util_List(src);
        const lineMap: number[] = Service.lineMap(input);
        const tags: Array<string> = <any>([]);
        let prior: string = null;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                if ((("<" === prior) || ("/" === prior)) && !/* contains */(tags.indexOf(<any>(t.content)) >= 0)){
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tags, t.content);
                }
                prior = t.content;
            }
        }
        for(let index = 0; index < tags.length; index++) {
            let tag = tags[index];
            {
                let balance: number = 0;
                prior = null;
                let prior2: string = null;
                for(let index1 = 0; index1 < src.length; index1++) {
                    let t = src[index1];
                    {
                        const lineNo: number = Service.charPos2LineNo1(lineMap, t.begin);
                        if ((tag === t.content) && ("<" === prior))balance++; else if ((tag === t.content) && ("/" === prior) && ("<" === prior2)){
                            balance--;
                        }
                        prior2 = prior;
                        prior = t.content;
                    }
                }
                if (balance !== 0)console.info(tag + " " + balance);
            }
        }
        const parser: HtmlParser = new HtmlParser();
        parser.debug = true;
        const root: ParseNode = parser.parse(src);
        const t2: number = /* currentTimeMillis */Date.now();
        console.info("time = " + (t2 - t1));
        if (/* size */(<number>src.length) < limit)root.printTree$(); else root.printTree$int(5);
    }
}
Example["__class"] = "oracle.dbtools.parser.html.Example";




import { HtmlParser } from './HtmlParser';


Example.main(null);
