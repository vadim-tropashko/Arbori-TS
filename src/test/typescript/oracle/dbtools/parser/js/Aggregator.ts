/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Grammar } from '../Grammar';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';
import { Resource } from '../Resource';
import { RuleTransforms } from '../RuleTransforms';
import { RuleTuple } from '../RuleTuple';
import { Service } from '../../../arbori/util/Service';

export class Aggregator {
    public static main(args: string[]) {
        const rules: Array<RuleTuple> = <any>([]);
        const addendum: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/js/addendum.grammar");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(addendum);
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, addendum);
        Grammar.grammar(root, src, rules);
        RuleTransforms.eliminateEmptyProductions(rules);
        const files: Array<File> = Service.filesInDirectory("/Users/VTROPASH/eclipse-workspace/sandbox/src/oracle/dbtools/parser/js/rules", "rules");
        for(let index = 0; index < files.length; index++) {
            let file = files[index];
            {
                let fpath: string = file.getAbsolutePath();
                fpath = "file:///" + /* replace */fpath.split('\\').join('/');
                console.info("processing: " + fpath);
                const text: string = Service.readFile$java_lang_String(fpath);
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules, Rules.read(fpath));
            }
        }
        Compressor.compress(rules);
        Rules.write(rules, Resource.testFolder + "oracle/dbtools/parser/js/aggregate.rules");
    }
}
Aggregator["__class"] = "oracle.dbtools.parser.js.Aggregator";




import { Compressor } from './Compressor';


import { Rules } from './Rules';


Aggregator.main(null);
