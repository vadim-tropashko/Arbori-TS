/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Program } from '../arbori/Program';
import { JavaEarley } from './java/JavaEarley';
import { Service } from '../../arbori/util/Service';

export class Tree {
    public static example: string = "/Users/VTROPASH/eclipse-workspace/sandbox/src/example.java.txt";

    public static main(args: string[]) {
        const input: string = Service.readFile$java_lang_String(Tree.example);
        const src: Array<LexerToken> = JavaEarley.lex(input);
        const earley: JavaEarley = JavaEarley.getInstance();
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const root: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const target: Parsed = new Parsed(input, src, root);
        const prg: string = "statements: [node) blockStatement \n->\n";
        try {
            const tmp: Array<ParseNode> = <any>([]);
            const program: Program = new Program(earley);
            program.compile$java_lang_String(prg);
            program.eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, new Tree.Tree$0(tmp));
            const consequentiveStatements: Array<Array<ParseNode>> = Tree.consequtiveStatements(tmp);
            for(let i: number = 0; i < /* size */(<number>consequentiveStatements.length); i++) {for(let j: number = i + 1; j < /* size */(<number>consequentiveStatements.length); j++) {{
                const stmtsI: Array<ParseNode> = /* get */consequentiveStatements[i];
                const stmtsJ: Array<ParseNode> = /* get */consequentiveStatements[j];
                const match: boolean = Tree.match$java_util_List$java_util_List(stmtsI, stmtsJ);
                if (match){
                    console.info("---------------");
                    const fromI: number = /* get */stmtsI[0].from;
                    const toI: number = /* get */stmtsI[/* size */(<number>stmtsI.length) - 1].to;
                    console.info(input.substring(/* get */src[fromI].begin, /* get */src[toI - 1].end));
                    const fromJ: number = /* get */stmtsJ[0].from;
                    const toJ: number = /* get */stmtsJ[/* size */(<number>stmtsJ.length) - 1].to;
                    console.info(input.substring(/* get */src[fromJ].begin, /* get */src[toJ - 1].end));
                }
            };};}
        } catch(e) {
        }
    }

    public static consequtiveStatements(statements: Array<ParseNode>): Array<Array<ParseNode>> {
        const ret: Array<Array<ParseNode>> = <any>([]);
        for(let i: number = 0; i < /* size */(<number>statements.length); i++) {{
            const tmp: Array<ParseNode> = <any>([]);
            const nodeI: ParseNode = /* get */statements[i];
            if (0 < /* size */(<number>ret.length)){
                const lastList: Array<ParseNode> = /* get */ret[/* size */(<number>ret.length) - 1];
                const last: ParseNode = /* get */lastList[/* size */(<number>lastList.length) - 1];
                if (nodeI.from < last.to)continue;
            }
            /* add */(tmp.push(nodeI)>0);
            let j: number = i + 1;
            for(; j < /* size */(<number>statements.length); j++) {{
                const nodeJ: ParseNode = /* get */statements[j];
                const nodeJminus1: ParseNode = /* get */statements[j - 1];
                if (nodeJ.from !== nodeJminus1.to)break;
                /* add */(tmp.push(nodeJ)>0);
            };}
            if (1 < /* size */(<number>tmp.length) || nodeI.from + 20 < nodeI.to)/* add */(ret.push(tmp)>0);
            i = j - 1;
        };}
        return ret;
    }

    public static match$java_util_List$java_util_List(list1: Array<ParseNode>, list2: Array<ParseNode>): boolean {
        if (/* size */(<number>list1.length) !== /* size */(<number>list2.length))return false;
        const from1: number = /* get */list1[0].from;
        const to1: number = /* get */list1[/* size */(<number>list1.length) - 1].from;
        const from2: number = /* get */list2[0].from;
        const to2: number = /* get */list2[/* size */(<number>list2.length) - 1].from;
        if (to1 - from1 !== to2 - from2)return false;
        for(let i: number = 0; i < /* size */(<number>list1.length); i++) {{
            const node1: ParseNode = /* get */list1[i];
            const node2: ParseNode = /* get */list2[i];
            const tmp: boolean = Tree.match$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_ParseNode(node1, node2);
            if (!tmp)return false;
        };}
        return true;
    }

    public static match(list1?: any, list2?: any): boolean {
        if (((list1 != null && (list1 instanceof Array)) || list1 === null) && ((list2 != null && (list2 instanceof Array)) || list2 === null)) {
            return <any>Tree.match$java_util_List$java_util_List(list1, list2);
        } else if (((list1 != null && list1 instanceof <any>ParseNode) || list1 === null) && ((list2 != null && list2 instanceof <any>ParseNode) || list2 === null)) {
            return <any>Tree.match$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_ParseNode(list1, list2);
        } else throw new Error('invalid overload');
    }

    static match$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_ParseNode(node1: ParseNode, node2: ParseNode): boolean {
        if (node1.to - node1.from !== node1.to - node1.from)return false;
        for(let index = 0; index < node1.symbols.length; index++) {
            let symbol = node1.symbols[index];
            {
                if (!node2.contains$int(symbol))return false;
            }
        }
        for(let index = 0; index < node2.symbols.length; index++) {
            let symbol = node2.symbols[index];
            {
                if (!node1.contains$int(symbol))return false;
            }
        }
        const children1: Array<ParseNode> = node1.childList();
        const children2: Array<ParseNode> = node2.childList();
        if (/* size */(<number>children1.length) !== /* size */(<number>children2.length))return false;
        for(let i: number = 0; i < /* size */(<number>children1.length); i++) {{
            const tmp: boolean = Tree.match$oracle_dbtools_parser_ParseNode$oracle_dbtools_parser_ParseNode(/* get */children1[i], /* get */children2[i]);
            if (!tmp)return false;
        };}
        return true;
    }
}
Tree["__class"] = "oracle.dbtools.parser.Tree";


export namespace Tree {

    export class Tree$0 {
        public statements(target: Parsed, tuple: any) {
            /* add */(this.tmp.push(/* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node"))>0);
        }

        constructor(private tmp: any) {
        }
    }

}




import { Parsed } from './Parsed';


import { ParseNode } from './ParseNode';


import { Matrix } from './Matrix';


import { LexerToken } from './LexerToken';


Tree.main(null);
