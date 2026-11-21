/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley.js';
import { Grammar } from '../Grammar.js';
import { LexerToken } from '../LexerToken.js';
import { Matrix } from '../Matrix.js';
import { ParseNode } from '../ParseNode.js';
import { RuleTransforms } from '../RuleTransforms.js';
import { RuleTuple } from '../RuleTuple.js';
import { Token } from '../Token.js';
import { Visual } from '../Visual.js';
import { Service } from '../../../arbori/util/Service.js';

/**
 * Generates PL/SQL grammar from plsql.y
 * @author Dim
 * @class
 */
export class MysqlRules {
    public static main(args: string[]) {
        const T: boolean = true;
        const F: boolean = false;
        if (T){
            const rules: Array<RuleTuple> = MysqlRules.getRules();
            console.info(/* size */(<number>rules.length));
            return;
        }
        const input: string = "scheduleExpression\r\n    : AT timestampValue intervalExpr*                                   | EVERY (decimalLiteral | expression) intervalType\r\n        (\r\n          STARTS startTimestamp=timestampValue\r\n          (startIntervals+=intervalExpr)*\r\n        )?\r\n        (\r\n          ENDS endTimestamp=timestampValue\r\n          (endIntervals+=intervalExpr)*\r\n        )?                                                              ;\r\n";
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String(input);
        const parser: Earley = Grammar.bnfParser();
        const matrix: Matrix = new Matrix(parser);
        matrix.visual = new Visual(src, parser);
        parser.parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        matrix.visual.draw$oracle_dbtools_parser_Matrix(matrix);
    }

    static getRules(): Array<RuleTuple> {
        const rules: Array<RuleTuple> = MysqlRules.parseBNFtext(MysqlRules.readBNFfile());
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("simpleId", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("simpleId", ["\'?\'"]));
        MysqlRules.substitute(rules, "\'STRING_USER_NAME\'", "STRING_USER_NAME");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["string_literal", "\'@\'", "string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["identifier", "\'@\'", "string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["string_literal", "\'@\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["identifier", "\'@\'", "identifier"]));
        MysqlRules.substitute(rules, "\'LOCAL_ID\'", "LOCAL_ID");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("LOCAL_ID", ["\'@\'", "identifier"]));
        MysqlRules.substitute(rules, "\'GLOBAL_ID\'", "GLOBAL_ID");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("GLOBAL_ID", ["\'@\'", "\'@\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("GLOBAL_ID", ["\'@\'", "\'@\'", "identifier", "\'.\'", "identifier"]));
        MysqlRules.substitute(rules, "\'ID\'", "ID");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("ID", ["identifier"]));
        MysqlRules.substitute(rules, "\'DECIMAL_LITERAL\'", "DECIMAL_LITERAL");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["DECIMAL_LITERAL", "\'K\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["DECIMAL_LITERAL", "\'M\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["digits", "\'.\'", "digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["\'.\'", "digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["DECIMAL_LITERAL", "\'E\'", "digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("utilityStatement", ["\'DELIMITER\'", "delimiter"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("delimiter", ["\';\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("delimiter", ["\'/\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("delimiter", ["\'$\'"]));
        RuleTransforms.eliminateEmptyProductions(rules);
        return rules;
    }

    /**
     * Digests bnfFile into rules
     * @param {string} input
     * @return {RuleTuple[]}
     */
    public static parseBNFtext(input: string): Array<RuleTuple> {
        const ret: Array<RuleTuple> = <any>([]);
        const src1: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, true, LexerToken.QuotedStrings_$LI$() + LexerToken.JavaLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.PoundComments_$LI$());
        const src: Array<LexerToken> = <any>([]);
        for(let i: number = 0; i < /* size */(<number>src1.length); i++) {{
            const current: LexerToken = /* get */src1[i];
            if (current.type === Token.WS || current.type === Token.LINE_COMMENT || current.type === Token.COMMENT)continue;
            try {
                const next: LexerToken = /* get */src1[i + 1];
                const secondNext: LexerToken = /* get */src1[i + 2];
                if ((":" === next.content) && secondNext.type !== Token.WS)continue;
                if ((":" === current.content) && next.type !== Token.WS)continue;
            } catch(e) {
            }
            if (current.type === Token.IDENTIFIER && (current.content.toUpperCase() === current.content))current.content = "\'" + current.content.toUpperCase() + "\'";
            /* add */(src.push(current)>0);
        };}
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        Grammar.grammar(root, src, ret);
        return ret;
    }

    /*private*/ static substitute(ret: Array<RuleTuple>, expr: string, subst: string) {
        const __delete: Array<RuleTuple> = <any>([]);
        const add: Array<RuleTuple> = <any>([]);
        let replace: boolean = false;
        for(let index = 0; index < ret.length; index++) {
            let r = ret[index];
            {
                const clone: RuleTuple = new RuleTuple(r.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(r.rhs.length));
                if (r.head === expr){
                    clone.head = subst;
                    replace = true;
                }
                for(let i: number = 0; i < r.rhs.length; i++) {if (r.rhs[i] === expr){
                    clone.rhs[i] = subst;
                    replace = true;
                } else clone.rhs[i] = r.rhs[i];;}
                if (replace){
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, r);
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, clone);
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(ret,__delete);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, add);
    }

    public static getKeywords(rules: Array<RuleTuple>): Array<string> {
        const ret: Array<string> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[index];
            for(let index1 = 0; index1 < rule.rhs.length; index1++) {
                let token = rule.rhs[index1];
                if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(token, "\'"))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, token);
            }
        }
        return ret;
    }

    static readBNFfile(): string {
        let rulesTxt: string = Service.readFile$java_lang_Class$java_lang_String(MysqlRules, "MySQLParser.g");
        const startPattern: string = "// Top Level Description";
        rulesTxt = rulesTxt.substring(rulesTxt.indexOf(startPattern) + startPattern.length);
        rulesTxt = MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "/*", "*/");
        rulesTxt = MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}?");
        rulesTxt = MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "#", "\r\n");
        rulesTxt = /* replace */rulesTxt.split("DOT").join("\'.\'");
        rulesTxt = /* replace */rulesTxt.split("SEMICOLON").join("\';\'");
        rulesTxt = /* replace */rulesTxt.split(" SEMI").join(" delimiter");
        rulesTxt = /* replace */rulesTxt.split("COLON").join("\':\'");
        rulesTxt = /* replace */rulesTxt.split("COMMA").join("\',\'");
        rulesTxt = /* replace */rulesTxt.split("LPAREN").join("\'(\'");
        rulesTxt = /* replace */rulesTxt.split("RPAREN").join("\')\'");
        rulesTxt = /* replace */rulesTxt.split("PLUS").join("\'+\'");
        rulesTxt = /* replace */rulesTxt.split("MINUS").join("\'-\'");
        rulesTxt = /* replace */rulesTxt.split("TILDE").join("\'~\'");
        rulesTxt = /* replace */rulesTxt.split("!").join("");
        rulesTxt = /* replace */rulesTxt.split("^").join("");
        rulesTxt = /* replace */rulesTxt.split("NULL_LITERAL").join("\'NULL\'");
        rulesTxt = /* replace */rulesTxt.split("FILESIZE_LITERAL").join("( digits+ (\'K\'|\'M\'|\'G\'|\'T\'))");
        rulesTxt = /* replace */rulesTxt.split("START_NATIONAL_STRING_LITERAL").join("\'N\' string_literal");
        rulesTxt = /* replace */rulesTxt.split("STRING_LITERAL").join("string_literal");
        rulesTxt = /* replace */rulesTxt.split("HEXADECIMAL_LITERAL").join("\'x\' digits");
        rulesTxt = /* replace */rulesTxt.split("REAL_LITERAL").join("digits");
        rulesTxt = /* replace */rulesTxt.split("NULL_SPEC_LITERAL").join("\'\\\' \'N\'");
        rulesTxt = /* replace */rulesTxt.split("ID_LITERAL").join("identifier");
        return rulesTxt;
    }

    static removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(src: string, br1: string, br2: string): string {
        return MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String$java_lang_String(src, br1, br2, "");
    }

    public static removeNestedBlock$java_lang_String$java_lang_String$java_lang_String$java_lang_String(src: string, br1: string, br2: string, replacement: string): string {
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
                /* append */(sb => { sb.str += <any>replacement; return sb; })(out);
                end = beg + len1 + replacement.length;
                continue;
            }
            if (beg < 0)beg = src.length;
            /* append */(sb => { sb.str += <any>src.substring(end, beg); return sb; })(out);
            /* append */(sb => { sb.str += <any>replacement; return sb; })(out);
            end = src.indexOf(br2, beg + len1) + len2 + replacement.length;
            if (end < len2){
                /* append */(sb => { sb.str += <any>src.substring(beg); return sb; })(out);
                break;
            }
        }};
        return /* toString */out.str;
    }

    public static removeNestedBlock(src?: any, br1?: any, br2?: any, replacement?: any): string {
        if (((typeof src === 'string') || src === null) && ((typeof br1 === 'string') || br1 === null) && ((typeof br2 === 'string') || br2 === null) && ((typeof replacement === 'string') || replacement === null)) {
            return <any>MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String$java_lang_String(src, br1, br2, replacement);
        } else if (((typeof src === 'string') || src === null) && ((typeof br1 === 'string') || br1 === null) && ((typeof br2 === 'string') || br2 === null) && replacement === undefined) {
            return <any>MysqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(src, br1, br2);
        } else throw new Error('invalid overload');
    }
}
MysqlRules["__class"] = "oracle.dbtools.parser.mysql.MysqlRules";
