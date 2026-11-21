/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from './Earley.js';
import { LexerToken } from './LexerToken.js';
import { Token } from './Token.js';

/**
 * To process files containing BNF grammar definition
 * @author Dim
 * @class
 */
export class EBNF {
    static __static_initialized: boolean = false;
    static __static_initialize() { if (!EBNF.__static_initialized) { EBNF.__static_initialized = true; EBNF.__static_initializer_0(); } }

    static earley: Earley; public static earley_$LI$(): Earley { EBNF.__static_initialize(); if (EBNF.earley == null) { EBNF.earley = new EBNF.EBNF$0(this, EBNF.getRules()); }  return EBNF.earley; }

    static  __static_initializer_0() {
        EBNF.__expr = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "expr");
        EBNF.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "identifier");
        EBNF.string_literal = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "string_literal");
        EBNF.__rule = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "rule");
        EBNF.__grammar = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "grammar");
        EBNF.__disjunct = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "disjunct");
        EBNF.__concat = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "concat");
        EBNF.or = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "\'|\'");
        EBNF.sqOpen = /* get */((m,k) => m[k]===undefined?null:m[k])(EBNF.earley.symbolIndexes, "\'[\'");
    }

    static bnfParser(): Earley {
        return EBNF.earley_$LI$();
    }

    /*private*/ static getRules(): Array<RuleTuple> {
        const rules: Array<RuleTuple> = <any>([]);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("concat", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("concat", ["concat", "expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("disjunct", ["concat"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("disjunct", ["disjunct", "\'|\'", "concat"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("expr", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("expr", ["string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("expr", ["disjunct"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("expr", ["\'{\'", "disjunct", "\'}\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("expr", ["\'[\'", "disjunct", "\']\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("expr", ["\'{\'", "disjunct", "\'}\'", "\'*\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("expr", ["\'[\'", "disjunct", "\']\'", "\'*\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("rule", ["identifier", "\':\'", "expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("grammar", ["rule"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("grammar", ["grammar", "rule"]));
        const nonEmptyRules: Array<RuleTuple> = rules;
        return nonEmptyRules;
    }

    static __expr: number; public static __expr_$LI$(): number { EBNF.__static_initialize();  return EBNF.__expr; }

    static identifier: number; public static identifier_$LI$(): number { EBNF.__static_initialize();  return EBNF.identifier; }

    static string_literal: number; public static string_literal_$LI$(): number { EBNF.__static_initialize();  return EBNF.string_literal; }

    static __rule: number; public static __rule_$LI$(): number { EBNF.__static_initialize();  return EBNF.__rule; }

    static __grammar: number; public static __grammar_$LI$(): number { EBNF.__static_initialize();  return EBNF.__grammar; }

    static __disjunct: number; public static __disjunct_$LI$(): number { EBNF.__static_initialize();  return EBNF.__disjunct; }

    static __concat: number; public static __concat_$LI$(): number { EBNF.__static_initialize();  return EBNF.__concat; }

    static or: number; public static or_$LI$(): number { EBNF.__static_initialize();  return EBNF.or; }

    static sqOpen: number; public static sqOpen_$LI$(): number { EBNF.__static_initialize();  return EBNF.sqOpen; }

    public static grammar(root: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>) {
        if (root.contains$int(EBNF.__rule_$LI$()))EBNF.rule(root, src, grammar); else {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                EBNF.grammar(child, src, grammar)
            }
        }
    }

    /*private*/ static rule(node: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>) {
        let header: string = null;
        const expr: Array<RuleTuple> = <any>([]);
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (header == null && child.contains$int(EBNF.identifier_$LI$())){
                        header = child.content$java_util_List(src);
                    } else if (child.contains$int(EBNF.__expr_$LI$())){
                        EBNF.expr(header, child, src, expr);
                        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(grammar, expr);
                    }
                }
            }
        }
    }

    /*private*/ static expr(header: string, node: ParseNode, src: Array<LexerToken>, ret: Array<RuleTuple>) {
        if (node.from + 1 === node.to && (node.contains$int(EBNF.identifier_$LI$()) || node.contains$int(EBNF.string_literal_$LI$()))){
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, [node.content$java_util_List(src)]));
        } else if (node.contains$int(EBNF.__disjunct_$LI$())){
            EBNF.disjunct(header, node, src, ret);
        } else {
            let first: number = null;
            let disjunct: ParseNode = null;
            let third: number = null;
            let last: number = null;
            {
                let array = node.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        if (first == null)first = child.content$()[0]; else if (disjunct == null)disjunct = child; else if (third == null)third = child.content$()[0]; else if (last == null)last = child.content$()[0];
                    }
                }
            }
            const aux: string = header + "[" + disjunct.from + "," + disjunct.to + ")";
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, [aux]));
            if (first === EBNF.sqOpen_$LI$())/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, []));
            if (last != null)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, [header, aux]));
            const expr: Array<RuleTuple> = <any>([]);
            EBNF.expr(aux, disjunct, src, expr);
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, expr);
        }
    }

    /*private*/ static disjunct(header: string, node: ParseNode, src: Array<LexerToken>, ret: Array<RuleTuple>) {
        if (node.contains$int(EBNF.__concat_$LI$())){
            const payload: Array<string> = <any>([]);
            EBNF.concat(header, node, src, ret, payload);
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, payload));
        } else {
            {
                let array = node.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        if (child.contains$int(EBNF.__disjunct_$LI$()) || child.contains$int(EBNF.__concat_$LI$()))EBNF.disjunct(header, child, src, ret);
                    }
                }
            }
        }
    }

    /*private*/ static concat(header: string, node: ParseNode, src: Array<LexerToken>, ret: Array<RuleTuple>, payload: Array<string>) {
        if (node.contains$int(EBNF.identifier_$LI$()) || node.contains$int(EBNF.string_literal_$LI$()))/* add */(payload.push(node.content$java_util_List(src))>0); else {
            {
                let array = node.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        if (child.contains$int(EBNF.identifier_$LI$()) || node.contains$int(EBNF.string_literal_$LI$()))/* add */(payload.push(child.content$java_util_List(src))>0); else if (child.contains$int(EBNF.__expr_$LI$())){
                            const aux: string = header + "[" + child.from + "," + child.to + ")";
                            /* add */(payload.push(aux)>0);
                            const expr: Array<RuleTuple> = <any>([]);
                            EBNF.expr(aux, child, src, expr);
                            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, expr);
                        } else if (child.contains$int(EBNF.__concat_$LI$()))EBNF.concat(header, child, src, ret, payload);
                    }
                }
            }
        }
    }

    public static main(args: string[]) {
        const input: string = "qon: [namequal] name";
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        const root: ParseNode = EBNF.parseGrammarFile(src, input);
        root.printTree$();
        const rules: Array<RuleTuple> = <any>([]);
        EBNF.grammar(root, src, rules);
        RuleTuple.printRules(rules);
    }

    public static parseGrammarFile(src: Array<LexerToken>, input: string): ParseNode {
        return Grammar.parseGrammarFile$java_util_List$java_lang_String$oracle_dbtools_parser_Earley(src, input, EBNF.earley_$LI$());
    }
}
EBNF["__class"] = "oracle.dbtools.parser.EBNF";


export namespace EBNF {

    export class EBNF$0 extends Earley {
        public __parent: any;
        /**
         * 
         * @param {number} y
         * @param {LexerToken[]} src
         * @param {number} symbol
         * @param {number} suspect
         * @return {boolean}
         */
        isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
            const token: LexerToken = /* get */src[y];
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING;
        }

        constructor(__parent: any, __arg0: any) {
            super(__arg0);
            this.__parent = __parent;
        }
    }

}




EBNF.__static_initialize();

import { Grammar } from './Grammar.js';


import { Lexer } from './Lexer.js';


import { ParseNode } from './ParseNode.js';


import { RuleTuple } from './RuleTuple.js';
