/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { RuleTransforms } from '../RuleTransforms';
import { RuleTuple } from '../RuleTuple';
import { Token } from '../Token';
import { Visual } from '../Visual';
import { MysqlRules } from '../mysql/MysqlRules';
import { Service } from '../../../arbori/util/Service';

export class TsqlRules {
    public static main(args: string[]) {
        const rules4: Array<RuleTuple> = TsqlRules.getRules("TsqlParser.g4");
        const rules2: Array<RuleTuple> = TsqlRules.getRules("TSQLRecognizer.g");
        console.info("g4 full size = " + /* size */(<number>rules4.length));
        console.info("g2 full size = " + /* size */(<number>rules2.length));
        console.info("g4 EBNF rules = " + TsqlRules.countDistinct(rules4));
        console.info("g2 EBNF rules = " + TsqlRules.countDistinct(rules2));
        const matched: Array<string> = <any>([]);
        const mismatched: Array<string> = <any>([]);
        for(let index = 0; index < rules4.length; index++) {
            let r4 = rules4[index];
            {
                let foundMatch: boolean = false;
                let head4: string = r4.head;
                if (/* contains */(head4.indexOf("[") != -1))continue;
                head4 = /* replace */head4.split("_").join("");
                for(let index1 = 0; index1 < rules2.length; index1++) {
                    let r2 = rules2[index1];
                    {
                        const head2: string = r2.head;
                        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(head4, head2) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))((head4 + "statement"), head2)){
                            foundMatch = true;
                            break;
                        }
                    }
                }
                if (foundMatch){
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(matched, r4.head);
                } else /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(mismatched, r4.head);
            }
        }
        for(let index = 0; index < mismatched.length; index++) {
            let head = mismatched[index];
            console.info(head)
        }
        console.info("match count = " + /* size */(<number>matched.length));
        console.info("mismatch count = " + /* size */(<number>mismatched.length));
        return;
    }

    static countDistinct(rules: Array<RuleTuple>): number {
        const unique: Array<string> = <any>([]);
        for(let index = 0; index < rules.length; index++) {
            let r = rules[index];
            {
                if (/* contains */(r.head.indexOf("[") != -1))continue;
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(unique, r.head);
            }
        }
        return /* size */(<number>unique.length);
    }

    static getRules(file: string): Array<RuleTuple> {
        const rules: Array<RuleTuple> = TsqlRules.parseBNFtext(TsqlRules.readBNFfile(file));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("simpleId", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("simpleId", ["\'?\'"]));
        TsqlRules.substitute(rules, "\'STRING_USER_NAME\'", "STRING_USER_NAME");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["string_literal", "\'@\'", "string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["identifier", "\'@\'", "string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["string_literal", "\'@\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("STRING_USER_NAME", ["identifier", "\'@\'", "identifier"]));
        TsqlRules.substitute(rules, "\'LOCAL_ID\'", "LOCAL_ID");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("LOCAL_ID", ["\'@\'", "identifier"]));
        TsqlRules.substitute(rules, "\'GLOBAL_ID\'", "GLOBAL_ID");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("GLOBAL_ID", ["\'@\'", "\'@\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("GLOBAL_ID", ["\'@\'", "\'@\'", "identifier", "\'.\'", "identifier"]));
        TsqlRules.substitute(rules, "\'ID\'", "ID");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("ID", ["identifier"]));
        TsqlRules.substitute(rules, "\'DECIMAL_LITERAL\'", "DECIMAL_LITERAL");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["digits", "\'.\'", "digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["\'.\'", "digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("DECIMAL_LITERAL", ["DECIMAL_LITERAL", "\'E\'", "digits"]));
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
        const src: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
        LexerToken.print$java_util_List(src);
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

    static readBNFfile(file: string): string {
        let rulesTxt: string = Service.readFile$java_lang_Class$java_lang_String(TsqlRules, file);
        const startPattern: string = "// starting rule";
        rulesTxt = rulesTxt.substring(rulesTxt.indexOf(startPattern) + startPattern.length);
        rulesTxt = TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "/*", "*/");
        rulesTxt = TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}?");
        rulesTxt = TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "{", "}");
        rulesTxt = TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(rulesTxt, "#", "\r\n");
        rulesTxt = /* replace */rulesTxt.split("DOT").join("\'.\'");
        rulesTxt = /* replace */rulesTxt.split("SEMICOLON").join("\';\'");
        rulesTxt = /* replace */rulesTxt.split(" SEMI").join(" \';\'");
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
        return TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String$java_lang_String(src, br1, br2, "");
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
            return <any>TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String$java_lang_String(src, br1, br2, replacement);
        } else if (((typeof src === 'string') || src === null) && ((typeof br1 === 'string') || br1 === null) && ((typeof br2 === 'string') || br2 === null) && replacement === undefined) {
            return <any>TsqlRules.removeNestedBlock$java_lang_String$java_lang_String$java_lang_String(src, br1, br2);
        } else throw new Error('invalid overload');
    }
}
TsqlRules["__class"] = "oracle.dbtools.parser.tsql.TsqlRules";




TsqlRules.main(null);
