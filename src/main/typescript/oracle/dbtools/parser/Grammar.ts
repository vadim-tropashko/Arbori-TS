/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { SyntaxError } from './plsql/SyntaxError.js';
import { Service } from '../../arbori/util/Service.js';
import { LexerToken } from './LexerToken.js';
import { Earley } from './Earley.js';
import { Token } from './Token.js';

/**
 * To process files containing BNF grammar definition
 * @author Dim
 * @class
 */
export class Grammar {
    public static main(args: string[]) {
        const rules: Array<RuleTuple> = Grammar.extractRules$java_lang_Class$java_lang_String(Grammar, "json.ebnf");
        RuleTuple.printRules(rules);
    }

    public static extractRules$java_lang_Class$java_lang_String(c: any, file: string): Array<RuleTuple> {
        const input: string = Service.readFile$java_lang_Class$java_lang_String(c, file);
        return Grammar.extractRules$java_lang_String(input);
    }

    public static extractRules(c?: any, file?: any): Array<RuleTuple> {
        if (((c != null && (c["__class"] != null || ((t) => { try { new t; return true; } catch { return false; } })(c))) || c === null) && ((typeof file === 'string') || file === null)) {
            return <any>Grammar.extractRules$java_lang_Class$java_lang_String(c, file);
        } else if (((typeof c === 'string') || c === null) && file === undefined) {
            return <any>Grammar.extractRules$java_lang_String(c);
        } else throw new Error('invalid overload');
    }

    public static extractRules$java_lang_String(input: string): Array<RuleTuple> {
        input = /* replace */input.split("\"").join("\'");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        const rules: Array<RuleTuple> = <any>([]);
        Grammar.grammar(root, src, rules);
        RuleTransforms.eliminateEmptyProductions(rules);
        RuleTransforms.substituteSingleUnaryProductions(rules);
        return rules;
    }

    static earley: Earley; public static earley_$LI$(): Earley { if (Grammar.earley == null) { Grammar.earley = new Grammar.Grammar$0(this, Grammar.getRules()); }  return Grammar.earley; }

    public static bnfParser(): Earley {
        return Grammar.earley_$LI$();
    }

    /**
     * A grammar for BNF grammar. Chicken-and-egg problem: Have to create this manually:-)
     * @return
     * @return {RuleTuple[]}
     */
    public static getRules(): Array<RuleTuple> {
        const rules: Array<RuleTuple> = <any>([]);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("variable", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("variable", ["identifier", "\'[\'", "identifier", "\']\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("variable", ["string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("variable", ["identifier", "\'[\'", "digits", "\',\'", "digits", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["variable"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["variable", "\'*\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["variable", "\'+\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["variable", "\'?\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["\'(\'", "disjunct", "\')\'", "\'*\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["\'(\'", "disjunct", "\')\'", "\'+\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["\'(\'", "disjunct", "\')\'", "\'?\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["\'(\'", "disjunct", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["\'(\'", "disjunct", "\')\'", "\'=\'", "\'>\'", "disjunct"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["identifier", "\'=\'", "postfix"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("postfix", ["identifier", "\'+\'", "\'=\'", "postfix"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("concat", ["postfix"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("concat", ["concat", "postfix"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("disjunct", ["concat"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("disjunct", ["\'|\'", "concat"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("disjunct", ["disjunct", "\'|\'", "concat"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("disjunct", ["disjunct", "\'|\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("rule", ["variable", "\':\'", "disjunct", "\';\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("rule", ["variable", "\':\'", "\';\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("rule", ["variable", "\':\'", "\':\'", "\'=\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("rule", ["variable", "\':\'", "\':\'", "\'=\'", "disjunct"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("rule", ["variable", "\':\'", "\':\'", "\'=\'", "disjunct", "\';\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("rule", ["\'-\'", "variable", "\';\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("grammar", ["rule"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("grammar", ["grammar", "rule"]));
        const nonEmptyRules: Array<RuleTuple> = rules;
        return nonEmptyRules;
    }

    public static parseGrammarFile$java_util_List$java_lang_String(src: Array<LexerToken>, input: string): ParseNode {
        return Grammar.parseGrammarFile$java_util_List$java_lang_String$oracle_dbtools_parser_Earley(src, input, Grammar.earley_$LI$());
    }

    public static parseGrammarFile$java_util_List$java_lang_String$oracle_dbtools_parser_Earley(src: Array<LexerToken>, input: string, parser: Earley): ParseNode {
        const matrix: Matrix = new Matrix(parser);
        parser.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["grammar"], src, parser, matrix);
        if (s != null){
            if (matrix.visual != null)matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
            console.info("Syntax Error");
            console.info("at line#" + s.line);
            console.info(s.code);
            console.info(s.marker);
            console.info("Expected:  ");
            {
                let array = s.getSuggestions();
                for(let index = 0; index < array.length; index++) {
                    let tmp = array[index];
                    console.info(tmp + ',')
                }
            }
            throw Object.defineProperty(new Error(s.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        const root: ParseNode = parser.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        return root;
    }

    /**
     * 
     * @param {LexerToken[]} src
     * @param {string} input
     * @param {Earley} parser
     * @return
     * @return {ParseNode}
     */
    public static parseGrammarFile(src?: any, input?: any, parser?: any): ParseNode {
        if (((src != null && (src instanceof Array)) || src === null) && ((typeof input === 'string') || input === null) && ((parser != null && parser instanceof <any>Earley) || parser === null)) {
            return <any>Grammar.parseGrammarFile$java_util_List$java_lang_String$oracle_dbtools_parser_Earley(src, input, parser);
        } else if (((src != null && (src instanceof Array)) || src === null) && ((typeof input === 'string') || input === null) && parser === undefined) {
            return <any>Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        } else throw new Error('invalid overload');
    }

    /**
     * Processes grammar-rule nodes in source order without recursion.
     * 
     * The grammar-file parse tree is left-recursive and can contain thousands
     * of rule nodes, so recursive descent exhausts a small parser thread stack.
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {RuleTuple[]} grammar
     */
    public static grammar(root: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>) {
        const pending: ParseNode[] = [];
        /* push */(pending.push(root)>0);
        while((!/* isEmpty */(pending.length == 0))) {{
            const node: ParseNode = /* pop */pending.pop();
            if (node.contains$java_lang_String("rule")){
                Grammar.rule(node, src, grammar);
                continue;
            }
            const children: Array<ParseNode> = <any>(node.children().slice(0));
            for(let index: number = /* size */(<number>children.length) - 1; index >= 0; index--) {{
                /* push */(pending.push(/* get */children[index])>0);
            };}
        }};
    }

    static ruleRoot: ParseNode = null;

    /**
     * Descend more
     * @param {ParseNode} node
     * @param {LexerToken[]} src
     * @param {RuleTuple[]} grammar
     */
    public static rule(node: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>) {
        Grammar.ruleRoot = node;
        let header: string = null;
        let isEmpty: boolean = true;
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (header == null && child.contains$java_lang_String("\'-\'")){
                        Grammar.delete(node, src, grammar);
                        return;
                    }
                    if (header == null && child.contains$java_lang_String("variable")){
                        header = child.content$java_util_List(src);
                    } else if (child.contains$java_lang_String("disjunct")){
                        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(grammar, Grammar.disjunct(header, child, src));
                        isEmpty = false;
                    } else if (child.contains$java_lang_String("\':\'")){
                        continue;
                    } else if (child.contains$java_lang_String("\'=\'")){
                        continue;
                    } else if (child.contains$java_lang_String("\';\'")){
                        if (isEmpty)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(header, []));
                        continue;
                    } else {
                        console.info("***node***");
                        node.printTree$();
                        console.info("***child***");
                        child.printTree$();
                        throw Object.defineProperty(new Error("not expr?"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    }
                }
            }
        }
    }

    /**
     * Descend further down
     * @param {ParseNode} node
     * @param {LexerToken[]} src
     * @param {RuleTuple[]} grammar
     * @private
     */
    /*private*/ static delete(node: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>) {
        let __var: string = null;
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                if (__var == null && child.contains$java_lang_String("variable")){
                    __var = child.content$java_util_List(src);
                    break;
                }
            }
        }
        const deletions: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < grammar.length; index++) {
            let t = grammar[index];
            if (t.head === __var)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(deletions, t); else for(let index1 = 0; index1 < t.rhs.length; index1++) {
                let rhs = t.rhs[index1];
                if (rhs === __var){
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(deletions, t);
                    break;
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(grammar,deletions);
    }

    /**
     * Descend one more step
     * @param {string} header
     * @param {ParseNode} node
     * @param {LexerToken[]} src
     * @return
     * @return {RuleTuple[]}
     * @private
     */
    /*private*/ static disjunct(header: string, node: ParseNode, src: Array<LexerToken>): Array<RuleTuple> {
        const ret: Array<RuleTuple> = <any>([]);
        if (node.contains$java_lang_String("concat")){
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, Grammar.concat(header, node, src, ret)));
        } else {
            let cnt: number = -1;
            let lastOrPos: number = -1;
            {
                let array = node.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        cnt++;
                        if (child.contains$java_lang_String("disjunct"))/* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, Grammar.disjunct(header, child, src)); else if (child.contains$java_lang_String("concat")){
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, Grammar.concat(header, child, src, ret)));
                        }
                        if (lastOrPos + 1 === cnt && child.contains$java_lang_String("\'|\'"))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, []));
                        if (child.contains$java_lang_String("\'|\'")){
                            lastOrPos = cnt;
                            if (cnt === /* size */(<number>node.children().length) - 1)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, []));
                        }
                    }
                }
            }
        }
        return ret;
    }

    /*private*/ static concat(header: string, node: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>): Array<string> {
        const payload: Array<string> = <any>([]);
        if (node.contains$java_lang_String("postfix")){
            /* add */(payload.push(Grammar.postfix(header, node, src, grammar))>0);
        } else {
            {
                let array = node.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        if (child.contains$java_lang_String("postfix")){
                            /* add */(payload.push(Grammar.postfix(header, child, src, grammar))>0);
                            continue;
                        }
                        if (child.contains$java_lang_String("concat")){
                            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(payload, Grammar.concat(header, child, src, grammar));
                            continue;
                        }
                        node.printTree$();
                        console.info("***child***");
                        child.printTree$();
                        throw Object.defineProperty(new Error("!concat & !postfix?"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    }
                }
            }
        }
        return payload;
    }

    /*private*/ static postfix(header: string, node: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>): string {
        if (node.contains$java_lang_String("variable"))return Grammar.variable(node, src, grammar);
        let head: string = null;
        let rhs: string = null;
        {
            let array = node.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$java_lang_String("\'(\'") || child.contains$java_lang_String("\')\'"))continue;
                    if (child.contains$java_lang_String("variable")){
                        rhs = Grammar.variable(child, src, grammar);
                        continue;
                    }
                    if (child.contains$java_lang_String("disjunct")){
                        rhs = Grammar.auxiliarySymbol(header, node);
                        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(grammar, Grammar.disjunct(rhs, child, src));
                        continue;
                    }
                    if (rhs != null){
                        if (child.contains$java_lang_String("\'*\'")){
                            head = Grammar.auxiliarySymbol(header, node);
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(head, []));
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(head, [head, rhs]));
                        } else if (child.contains$java_lang_String("\'+\'")){
                            head = Grammar.auxiliarySymbol(header, node);
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(head, [rhs]));
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(head, [head, rhs]));
                        } else if (child.contains$java_lang_String("\'?\'")){
                            head = Grammar.auxiliarySymbol(header, node);
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(head, []));
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(head, [rhs]));
                        }
                        continue;
                    }
                    if (child.contains$java_lang_String("identifier"))continue;
                    if (child.contains$java_lang_String("\'=\'"))continue;
                    if (child.contains$java_lang_String("\'+\'"))continue;
                    if (child.contains$java_lang_String("postfix")){
                        return Grammar.postfix(header, child, src, grammar);
                    }
                    throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        if (head != null)return head;
        return rhs;
    }

    /*private*/ static auxiliarySymbol(head: string, node: ParseNode): string {
        let tmp: string = head;
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(tmp.charAt(0)) == '\"'.charCodeAt(0))tmp = tmp.substring(1, tmp.length - 1);
        if (0 < tmp.indexOf('['))tmp = tmp.substring(0, tmp.indexOf('['));
        return "\"" + tmp + "[" + (node.from - Grammar.ruleRoot.from) + "," + (node.to - Grammar.ruleRoot.from) + ")\"";
    }

    /**
     * 
     * @param {ParseNode} node
     * @param {LexerToken[]} src
     * @param {RuleTuple[]} grammar
     * @return
     * @return {string}
     * @private
     */
    /*private*/ static variable(node: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>): string {
        const prefix: string = /* get */src[node.from].content;
        if (node.from + 1 === node.to)return prefix;
        if (node.from + 6 === node.to && (")" === /* get */src[node.to - 1].content)){
            return /* get */src[node.from].content + /* get */src[node.from + 1].content + /* get */src[node.from + 2].content + /* get */src[node.from + 3].content + /* get */src[node.from + 4].content + /* get */src[node.from + 5].content;
        }
        const postfix: string = /* get */src[node.from + 2].content;
        const header: string = prefix + "[" + postfix + "]";
        const quotetedHdr: string = "\"" + header + "\"";
        for(let i: number = 0; i < postfix.length + 1; i++) {/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(grammar, new RuleTuple(quotetedHdr, ["\'" + prefix + postfix.substring(0, i) + "\'"]));}
        return quotetedHdr;
    }

    /**
     * Parser from BNF rules
     * @return
     * @throws IOException
     * @param {*} location
     * @param {string} grammarFile
     * @return {Earley}
     */
    public static constructParser(location: any, grammarFile: string): Earley {
        const input: string = Service.readFile$java_lang_Class$java_lang_String(location, grammarFile);
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, Lexer.QuotedStrings);
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        const rules: Array<RuleTuple> = <any>([]);
        Grammar.grammar(root, src, rules);
        const ret: Earley = new Grammar.Grammar$1(rules);
        return ret;
    }

    /**
     * Removes one level of nesting for a block delimited between br1 and br2
     * @param {string} src
     * @param {string} br1 - opening block delimiter; e.g. {*
     * @param {string} br2 - closing block delimiter; e.g. *}
     * @return
     * @return {string}
     */
    public static removeNestedBlock(src: string, br1: string, br2: string): string {
        const len1: number = br1.length;
        const len2: number = br2.length;
        let beg: number = 0;
        let end: number = 0;
        const out: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        while((beg < src.length)) {{
            beg = src.indexOf(br1, end);
            const beg1: number = src.indexOf(br1, beg + len1);
            const end1: number = src.indexOf(br2, beg + len1) + len2;
            if (beg > 0 && beg < beg1 && beg1 < end1){
                /* append */(sb => { sb.str += <any>src.substring(end, beg + len1); return sb; })(out);
                end = beg + len1;
                continue;
            }
            if (beg < 0)beg = src.length;
            /* append */(sb => { sb.str += <any>src.substring(end, beg); return sb; })(out);
            end = src.indexOf(br2, beg + len1) + len2;
            if (end < len2){
                /* append */(sb => { sb.str += <any>src.substring(beg); return sb; })(out);
                break;
            }
        }};
        return /* toString */out.str;
    }
}
Grammar["__class"] = "oracle.dbtools.parser.Grammar";


export namespace Grammar {

    export class Grammar$0 extends Earley {
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


    export class Grammar$1 extends Earley {
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

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}




import { Matrix } from './Matrix.js';


import { RuleTransforms } from './RuleTransforms.js';


import { ParseNode } from './ParseNode.js';


import { Lexer } from './Lexer.js';


import { RuleTuple } from './RuleTuple.js';


