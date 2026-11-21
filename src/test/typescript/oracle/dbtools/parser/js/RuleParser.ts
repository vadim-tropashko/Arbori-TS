/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Cell } from '../Cell';
import { Earley } from '../Earley';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { Visual } from '../Visual';

export class RuleParser extends Earley {
    public constructor(reducedRules: Array<RuleTuple>) {
        super(reducedRules);
        this.isCaseSensitive = true;
        let ex1: string = "Expression:  SequenceExpression;";
        let ex2: string = "Expression:  UnaryExpression;";
        this.swapRules(ex1, ex2);
        ex1 = "Expression:  SequenceExpression;";
        ex2 = "Expression:  UpdateExpression;";
        this.swapRules(ex1, ex2);
        ex1 = "Expression:  SequenceExpression;";
        ex2 = "Expression:  YieldExpression;";
        this.swapRules(ex1, ex2);
        ex1 = "Expression_List2:  Expression;";
        ex2 = "Expression_List2:  Expression_List2  \',\'  Expression;";
        this.swapRules(ex1, ex2);
        ex1 = "SequenceExpression_List2:  SequenceExpression;";
        ex2 = "SequenceExpression_List2:  SequenceExpression_List2  \',\'  SequenceExpression;";
        this.swapRules(ex1, ex2);
    }

    /**
     * 
     * @param {number} y
     * @param {LexerToken[]} src
     * @param {number} pos
     * @param {Parser.Tuple} t
     * @param {number} suspect
     * @return {boolean}
     */
    isScannedSymbol(y: number, src: Array<LexerToken>, pos: number, t: Parser.Tuple, suspect: number): boolean {
        const symbol: number = t.content(pos);
        const token: LexerToken = /* get */src[y];
        if (token.content === (this.allSymbols[symbol]))return true;
        return false;
    }

    /**
     * 
     * @param {Matrix} m
     * @param {number} x
     * @param {number} y
     */
    diagnose(m: Matrix, x: number, y: number) {
        if (Thread.currentThread().getStackTrace().length === 1000){
            const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
            const output: Cell = m.get(x, y);
            if (output == null){
                /* append */(sb => { sb.str += <any>"null"; return sb; })(ret);
            } else {
                /* append */(sb => { sb.str += <any>"[" + x + "," + y + ")\n"; return sb; })(ret);
                const cutover: number = 50;
                if (cutover < output.size())/* append */(sb => { sb.str += <any>" ... " + output.size() + " more symbols"; return sb; })(ret); else for(let i: number = 0; i < output.size() && i < cutover + 1; i++) {{
                    this.toString(output.getRule(i), output.getPosition(i), ret);
                    /* append */(sb => { sb.str += <any>'\n'; return sb; })(ret);
                };}
            }
            JOptionPane.showMessageDialog(null, /* toString */ret.str);
        }
    }

    public static inline$oracle_dbtools_parser_RuleTuple$java_util_Set(input: RuleTuple, rules: Array<RuleTuple>): RuleTuple {
        const rules1: Array<RuleTuple> = <any>([]);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules1, rules);
        /* remove */(a => { let index = a.indexOf(input); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(rules1);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules1, new RuleTuple("identifier", ["dummy"]));
        const earley: RuleParser = new RuleParser(rules1);
        const matrix: Matrix = new Matrix(earley);
        const src: Array<LexerToken> = <any>([]);
        let len: number = 0;
        for(let index = 0; index < input.rhs.length; index++) {
            let s = input.rhs[index];
            {
                /* add */(src.push(new LexerToken(s, len, len + s.length + 1, Token.IDENTIFIER))>0);
                len += s.length + 1;
            }
        }
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        try {
            const out: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
            if (!out.contains$java_lang_String(input.head) || out.topLevel != null)return null;
            const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>out.children().length));
            let i: number = 0;
            {
                let array = out.children();
                for(let index = 0; index < array.length; index++) {
                    let node = array[index];
                    rhs[i++] = node.content$int(0)
                }
            }
            return new RuleTuple(input.head, rhs);
        } catch(e) {
            console.error(input.toString());
            return null;
        }
    }

    /**
     * Parses a rule e.g.
     * BlockStatement: '{' Statement VariableDeclaration_List1 Statement_List1 VariableDeclaration Statement_List1 '}'
     * and inlines productions, e.g.
     * Statement_List1 : Statement_List1 VariableDeclaration
     * 
     * @param {RuleTuple} input
     * @param {RuleTuple[]} rules
     * @return {RuleTuple}
     */
    public static inline(input?: any, rules?: any): any {
        if (((input != null && input instanceof <any>RuleTuple) || input === null) && ((rules != null && (rules instanceof Array)) || rules === null)) {
            return <any>RuleParser.inline$oracle_dbtools_parser_RuleTuple$java_util_Set(input, rules);
        } else if (((input != null && (input instanceof Array)) || input === null) && rules === undefined) {
            return <any>RuleParser.inline$java_util_Set(input);
        } else throw new Error('invalid overload');
    }

    public static inline$java_util_Set(rules: Array<RuleTuple>): boolean {
        const __delete: Array<RuleTuple> = <any>([]);
        const add: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                if (r.rhs.length < 4)continue;
                const out: RuleTuple = RuleParser.inline$oracle_dbtools_parser_RuleTuple$java_util_Set(r, rules);
                if (out != null && !out.equals(r)){
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, out);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, r);
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(rules,__delete);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules, add);
        return 0 < /* size */(<number>__delete.length);
    }

    public static main(args: string[]) {
        const input: string = "VariableDeclaration    : \'const\' VariableDeclarator \',\' VariableDeclarator \',\' VariableDeclarator \';\'";
        const colonPos: number = input.indexOf(": ");
        const head: string = input.substring(0, colonPos).trim();
        const st1: StringTokenizer = new StringTokenizer(input.substring(colonPos + ": ".length), " ");
        const rhs: Array<string> = <any>([]);
        const src: Array<LexerToken> = <any>([]);
        let len: number = 0;
        while((st1.hasMoreTokens())) {{
            const nextToken: string = st1.nextToken();
            const token: string = nextToken.trim();
            /* add */(src.push(new LexerToken(token, len, len + token.length + 1, Token.IDENTIFIER))>0);
            len += token.length + 1;
            /* add */(rhs.push(nextToken.trim())>0);
        }};
        const rule: RuleTuple = new RuleTuple(head, rhs);
        const rules: Array<RuleTuple> = Rules.read("src/oracle/dbtools/parser/js/aggregate.rules");
        const rules2: Array<RuleTuple> = <any>([]);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(rules2, rules);
        /* remove */(a => { let index = a.indexOf(rule); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(rules);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("identifier", ["dummy"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("Statement_List1", ["Statement_List1", "Statement_List1"]));
        const earley: RuleParser = new RuleParser(rules);
        const matrix: Matrix = new Matrix(earley);
        let visual: Visual = null;
        visual = new Visual(src, earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const out: ParseNode = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        out.printTree$();
        console.info(RuleParser.inline$oracle_dbtools_parser_RuleTuple$java_util_Set(rule, rules2).toString());
    }
}
RuleParser["__class"] = "oracle.dbtools.parser.js.RuleParser";




import { Rules } from './Rules';


import { Parser } from '../Parser';


RuleParser.main(null);
