/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Grammar } from '../Grammar';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';
import { Resource } from '../Resource';
import { RuleTuple } from '../RuleTuple';
import { Service } from '../../../arbori/util/Service';

/**
 * Generates PL/SQL grammar
 * @author Dim
 * @class
 */
export class PlsqlRules {
    public static main(args: string[]) {
        throw Object.defineProperty(new Error("VT: broken"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    /**
     * Digests bnfFile into rules
     * @param {string} input
     * @return {RuleTuple[]}
     */
    public static parseBNFtext(input: string): Array<RuleTuple> {
        const ret: Array<RuleTuple> = <any>([]);
        const src1: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
        const src: Array<LexerToken> = <any>([]);
        for(let index = 0; index < src1.length; index++) {
            let t = src1[index];
            {
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(t.content.charAt(0)) != '.'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(t.content.charAt(0)) != '_'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(t.content.charAt(t.content.length - 1)) == '_'.charCodeAt(0) && (t.content.toUpperCase() === t.content))t.content = "\'" + t.content.substring(0, t.content.length - 1).toUpperCase() + "\'";
                /* add */(src.push(t)>0);
            }
        }
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        Grammar.grammar(root, src, ret);
        PlsqlRules.substitute(ret, "expr", "pls_expr");
        PlsqlRules.insertIfNotExists(ret, "pkg_spec", 1);
        PlsqlRules.insertIfNotExists(ret, "pkg_body", 2);
        PlsqlRules.insertIfNotExists(ret, "adt_body", 2);
        PlsqlRules.insertIfNotExists(ret, "subprg_spec", 1);
        PlsqlRules.insertIfNotExists(ret, "trigger", 1);
        PlsqlRules.insertIfNotExists(ret, "adt_type_header", 1);
        SqlRules.duplicateRules(ret, ["\'PROCEDURE\'", "decl_id"], ["\'PROCEDURE\'", "designator", "sharing_clause"]);
        SqlRules.duplicateRules(ret, ["\'FUNCTION\'", "designator"], ["\'FUNCTION\'", "designator", "sharing_clause"]);
        return ret;
    }

    static insertIfNotExists(sqlRules: Array<RuleTuple>, head: string, pos: number) {
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int$boolean(sqlRules, head, pos, true);
    }

    static insertIfExists$java_util_Set$java_lang_String$int(sqlRules: Array<RuleTuple>, head: string, pos: number) {
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int$boolean(sqlRules, head, pos, false);
    }

    public static insertIfExists$java_util_Set$java_lang_String$int$boolean(sqlRules: Array<RuleTuple>, head: string, pos: number, not: boolean) {
        const addendum: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            {
                if (head === rule.head){
                    let extra: number = 2;
                    if (not)extra = 3;
                    const modified: RuleTuple = new RuleTuple(rule.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(rule.rhs.length + extra));
                    for(let i: number = 0; i < pos; i++) {{
                        modified.rhs[i] = rule.rhs[i];
                    };}
                    let incr: number = 0;
                    modified.rhs[pos + incr++] = "\'IF\'";
                    if (not)modified.rhs[pos + incr++] = "\'NOT\'";
                    modified.rhs[pos + incr++] = "\'EXISTS\'";
                    for(let i: number = pos; i < rule.rhs.length; i++) {{
                        modified.rhs[i + extra] = rule.rhs[i];
                    };}
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(addendum, modified);
                }
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(sqlRules, addendum);
    }

    public static insertIfExists(sqlRules?: any, head?: any, pos?: any, not?: any) {
        if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && ((typeof head === 'string') || head === null) && ((typeof pos === 'number') || pos === null) && ((typeof not === 'boolean') || not === null)) {
            return <any>PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int$boolean(sqlRules, head, pos, not);
        } else if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && ((typeof head === 'string') || head === null) && ((typeof pos === 'number') || pos === null) && not === undefined) {
            return <any>PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int(sqlRules, head, pos);
        } else throw new Error('invalid overload');
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

    static fixIdentifierIsOrAs(ret: Array<RuleTuple>) {
        const more: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < ret.length; index++) {
            let t = ret[index];
            {
                if (3 <= t.rhs.length){
                    if ((("\'PACKAGE\'" === (t.rhs[0])) || ("\'TYPE\'" === (t.rhs[0])) || ("\'PROCEDURE\'" === (t.rhs[0])) || ("\'FUNCTION\'" === (t.rhs[0])) || ("\'TRIGGER\'" === (t.rhs[0]))) && ("identifier" === (t.rhs[1]))){
                        const t1: RuleTuple = new RuleTuple(t.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(t.rhs.length + 2));
                        t1.rhs[0] = t.rhs[0];
                        t1.rhs[1] = "identifier";
                        t1.rhs[2] = "\'.\'";
                        for(let i: number = 1; i < t.rhs.length; i++) {t1.rhs[i + 2] = t.rhs[i];}
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(more, t1);
                        continue;
                    }
                }
                if (4 <= t.rhs.length){
                    if (("\'BODY\'" === (t.rhs[1])) && ("identifier" === (t.rhs[2]))){
                        const t1: RuleTuple = new RuleTuple(t.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(t.rhs.length + 2));
                        t1.rhs[0] = t.rhs[0];
                        t1.rhs[1] = t.rhs[1];
                        t1.rhs[2] = "identifier";
                        t1.rhs[3] = "\'.\'";
                        for(let i: number = 2; i < t.rhs.length; i++) {t1.rhs[i + 2] = t.rhs[i];}
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(more, t1);
                        continue;
                    }
                }
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, more);
    }

    /**
     * @param ret
     * @param {RuleTuple[]} rules
     * @return {string[]}
     */
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
        let rulesTxt: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/plsql.y");
        const startPattern: string = "/*---------------------------- Start of Rules -------------------------------*/";
        rulesTxt = rulesTxt.substring(rulesTxt.indexOf(startPattern) + startPattern.length);
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "/*", "*/");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "{", "}");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "{", "}");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "{", "}");
        rulesTxt = Grammar.removeNestedBlock(rulesTxt, "{", "}");
        rulesTxt = /* replace */rulesTxt.split("ASSIGN_").join("\':\' \'=\'");
        rulesTxt = /* replace */rulesTxt.split("LTEQ_").join("\'<\' \'=\'");
        rulesTxt = /* replace */rulesTxt.split("GTEQL_").join("\'>\' \'=\'");
        rulesTxt = /* replace */rulesTxt.split("NOTEQL_").join("\'!\' \'=\'");
        rulesTxt = /* replace */rulesTxt.split("BOX_").join("\'<\' \'>\'");
        rulesTxt = /* replace */rulesTxt.split("CAT_").join("\'|\' \'|\'");
        rulesTxt = /* replace */rulesTxt.split(" DBLDOT_ ").join(" \'.\' \'.\' ");
        rulesTxt = /* replace */rulesTxt.split("ARROW_").join("\'=\' \'>\'");
        rulesTxt = /* replace */rulesTxt.split("EXP_ pri").join("\'*\' \'*\' pri");
        rulesTxt = /* replace */rulesTxt.split("L_LBL_").join("\'<\' \'<\'");
        rulesTxt = /* replace */rulesTxt.split("R_LBL_").join("\'>\' \'>\'");
        rulesTxt = /* replace */rulesTxt.split("bind_var INDICATOR_ id").join("bind_var INDICATOR_ identifier");
        rulesTxt = /* replace */rulesTxt.split("\')\'").join(" \')\' ");
        rulesTxt = /* replace */rulesTxt.split("\'(\'").join(" \'(\' ");
        rulesTxt = /* replace */rulesTxt.split("%%").join("");
        rulesTxt = /* replace */rulesTxt.split("bind_var.INDICATOR_id.").join("\"bind_var.INDICATOR_id.\"");
        rulesTxt = /* replace */rulesTxt.split("...from_table_reference_or_subquery..").join("\"...from_table_reference_or_subquery..\"");
        return rulesTxt;
    }
}
PlsqlRules["__class"] = "oracle.dbtools.parser.plsql.PlsqlRules";




import { SqlRules } from './SqlRules';


PlsqlRules.main(null);
