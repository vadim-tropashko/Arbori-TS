/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Program } from '../../arbori/Program';
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { Resource } from '../Resource';
import { RuleTransforms } from '../RuleTransforms';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { Service } from '../../../arbori/util/Service';

export class Example {
    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.js");
        const earley: Earley = JavaScript.getInstance();
        const T: boolean = true;
        const F: boolean = false;
        const target: Parsed = new Parsed(input, earley, "javascript");
        const src: Array<LexerToken> = target.getSrc();
        if (/* size */(<number>src.length) < 100)LexerToken.print$java_util_List(src);
        target.debug = true;
        if (target.getSyntaxError() != null){
            console.error(target.getSyntaxError());
        }
        if (target.debug)target.getRoot().printTree$();
    }
}
Example["__class"] = "oracle.dbtools.parser.js.Example";




import { JavaScript } from './JavaScript';


Example.main(null);
