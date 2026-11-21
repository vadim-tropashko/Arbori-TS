/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Grammar } from '../Grammar';
import { EarleyPredictionCache } from '../EarleyPredictionCache';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';
import { Resource } from '../Resource';
import { RuleTransforms } from '../RuleTransforms';
import { RuleTuple } from '../RuleTuple';
import { GQLParser } from '../graphql/GQLParser';
import { GQLParserTest } from '../graphql/GQLParserTest';
import { JavaEarley } from '../java/JavaEarley';
import { Service } from '../../../arbori/util/Service';

/**
 * Combined SQL+PL/SQL grammar
 * @author Dim
 * @class
 */
export class UnifiedRules {
    public static main(args: string[]) {
        const t1: number = /* currentTimeMillis */Date.now();
        UnifiedRules.memorizeRules();
        UnifiedRules.memorizePredictionCache();
        const t2: number = /* currentTimeMillis */Date.now();
        console.info("SQL grammar and parser image building time = " + (t2 - t1));
    }

    static fname: string = "allRules.txt";

    static path: string = "/oracle/dbtools/parser/plsql/";

    static filePath: string; public static filePath_$LI$(): string { if (UnifiedRules.filePath == null) { UnifiedRules.filePath = "dbtools-libraries/dbtools-arbori/src/main/resources" + UnifiedRules.path + UnifiedRules.fname; }  return UnifiedRules.filePath; }

    /*private*/ static memorizeRules() {
        const rules: Array<RuleTuple> = UnifiedRules.extractRules();
        const file: File = new File(UnifiedRules.filePath_$LI$());
        const fw: FileWriter = new FileWriter(file.getAbsoluteFile());
        const bw: BufferedWriter = new BufferedWriter(fw);
        for(let index = 0; index < rules.length; index++) {
            let rule = rules[index];
            {
                bw.write(rule.toString() + "\n");
            }
        }
        bw.close();
    }

    /*private*/ static memorizePredictionCache() {
        EarleyPredictionCache.save(SqlEarley.fromSourceGrammar(), EarleyPredictionCache.CACHE_FILE_$LI$());
    }

    /*private*/ static extractRules(): Array<RuleTuple> {
        const ret: Array<RuleTuple> = PlsqlRules.parseBNFtext(PlsqlRules.readBNFfile());
        {
            const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/SqlPlus.grammar");
            const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
            const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
            Grammar.grammar(root, src, ret);
        };
        {
            const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/DbtoolsExtensions.grammar");
            const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
            const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
            Grammar.grammar(root, src, ret);
        };
        {
            const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/js/aggregate.rules");
            const st: StringTokenizer = new StringTokenizer(input, "\n");
            while((st.hasMoreTokens())) {{
                let token: string = st.nextToken();
                token = token.trim();
                const colonPos: number = token.indexOf(": ");
                if (colonPos < 0)continue;
                const head: string = token.substring(0, colonPos).trim();
                const st1: StringTokenizer = new StringTokenizer(token.substring(colonPos + ": ".length), " ");
                const rhs: Array<string> = <any>([]);
                while((st1.hasMoreTokens())) {{
                    let symbol: string = st1.nextToken().trim();
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(symbol.charAt(0)) == '\''.charCodeAt(0))symbol = symbol.toUpperCase();
                    /* add */(rhs.push(symbol)>0);
                }};
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(head, rhs));
            }};
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("javascript", ["Statement_List1"]));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("javascript", ["\'(\'", "javascript", "\')\'"]));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("javascript", ["\'<\'", "javascript", "\'>\'"]));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("javascript", ["\'[\'", "javascript", "\']\'"]));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("javascript", ["\'{\'", "javascript", "\'}\'"]));
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("javascript", ["\'$\'", "javascript", "\'$\'"]));
        };
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, GQLParser.getRules());
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("directive", ["\'@\'", "\'INSERT\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("directive", ["\'@\'", "\'UPDATE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("argument", ["\'FROM\'", "\':\'", "value"]));
        {
            const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/DataPump.grammar");
            const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
            const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
            Grammar.grammar(root, src, ret);
        };
        {
            const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/PlsqlFixes.grammar");
            const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
            const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
            Grammar.grammar(root, src, ret);
            PlsqlRules.fixIdentifierIsOrAs(ret);
        };
        const T: boolean = true;
        const F: boolean = false;
        UnifiedRules.printOrderedRules("set_arg", T, T, ret);
        const sql: Array<RuleTuple> = SqlRules.extractRules();
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, sql);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple("pls_expr", ["multiset_expression"]));
        for(let index = 0; index < ret.length; index++) {
            let r = ret[index];
            for(let index1 = 0; index1 < r.rhs.length; index1++) {
                let s = r.rhs[index1];
                if (s.length < 2)throw Object.defineProperty(new Error(r.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
        }
        {
            const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/java/java8.grammar");
            const src: Array<LexerToken> = LexerToken.parse$java_lang_String(input);
            const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
            const rules: Array<RuleTuple> = <any>([]);
            Grammar.grammar(root, src, rules);
            SqlRules.renameSymbol(rules, "literal", "javaLiteral");
            for(let index = 0; index < rules.length; index++) {
                let r = rules[index];
                r.toUpperKeywords()
            }
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, rules);
        };
        RuleTransforms.eliminateEmptyProductions(ret);
        RuleTransforms.substituteSingleUnaryProductions(ret);
        RuleTransforms.intervals2Numbers(ret);
        const notReferenced: Array<string> = <any>([]);
        const symbols: Array<string> = <any>([]);
        for(let index = 0; index < ret.length; index++) {
            let t = ret[index];
            RHS: for(let index1 = 0; index1 < t.rhs.length; index1++) {
                let s = t.rhs[index1];
                {
                    if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s.charAt(0)) == '\''.charCodeAt(0))continue;
                    if (/* contains */(s.indexOf("___") != -1))continue;
                    if (/* contains */(symbols.indexOf(<any>(s)) >= 0))continue;
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(symbols, s);
                    for(let index2 = 0; index2 < ret.length; index2++) {
                        let t1 = ret[index2];
                        if (t1.head === s)continue RHS;
                    }
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(notReferenced, s);
                }
            }
        }
        console.info("************* Not Referenced ************");
        for(let index = 0; index < notReferenced.length; index++) {
            let nf = notReferenced[index];
            console.info(nf)
        }
        return ret;
    }

    /**
     * ... identifier '.' identifier ...
     * ... identifier ...
     * -->
     * ... objname ...
     * @param {RuleTuple[]} ret
     * @private
     */
    /*private*/ static consolidateObjNames(ret: Array<RuleTuple>) {
        const __delete: Array<RuleTuple> = <any>([]);
        const insert: Array<RuleTuple> = <any>([]);
        OUTER: for(let index = 0; index < ret.length; index++) {
            let t = ret[index];
            {
                let pos: number = -1;
                for(let i: number = 0; i < t.rhs.length - 3; i++) {{
                    if (!(t.rhs[i] === ("identifier")))continue;
                    if (!(t.rhs[i + 1] === ("\'.\'")))continue;
                    if (!(t.rhs[i + 2] === ("identifier")))continue;
                    if (i + 3 < t.rhs.length && (t.rhs[i + 3] === ("\'.\'")))continue;
                    pos = i;
                    break;
                };}
                if (pos < 0)continue;
                INNER: for(let index1 = 0; index1 < ret.length; index1++) {
                    let tt = ret[index1];
                    {
                        if (!(tt.head === t.head))continue;
                        if (tt.rhs.length + 2 !== t.rhs.length)continue;
                        for(let i: number = 0; i < tt.rhs.length; i++) {{
                            if (i <= pos && !(t.rhs[i] === (tt.rhs[i])))continue INNER;
                            if (!(t.rhs[i + 2] === (tt.rhs[i])))continue INNER;
                        };}
                        const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(tt.rhs.length);
                        for(let i: number = 0; i < tt.rhs.length; i++) {{
                            if (i === pos)rhs[i] = "objname"; else rhs[i] = tt.rhs[i];
                        };}
                        /* add */(insert.push(new RuleTuple(t.head, rhs))>0);
                        /* add */(__delete.push(t)>0);
                        /* add */(__delete.push(tt)>0);
                        continue OUTER;
                    }
                }
            }
        }
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(ret,__delete);
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, insert);
    }

    /*private*/ static printOrderedRules(symbol: string, headOnly: boolean, exactMatch: boolean, ret: Array<RuleTuple>) {
        for(let index = 0; index < ret.length; index++) {
            let t = ret[index];
            {
                if ((!exactMatch && /* contains */(t.head.indexOf(symbol) != -1) || exactMatch && (t.head === symbol)))console.info("     " + t.toString());
                if (!headOnly){
                    for(let index1 = 0; index1 < t.rhs.length; index1++) {
                        let rhsi = t.rhs[index1];
                        {
                            if ((!exactMatch && /* contains */(rhsi.indexOf(symbol) != -1) || exactMatch && (rhsi === symbol)))console.info(t.toString());
                        }
                    }
                }
            }
        }
    }
}
UnifiedRules["__class"] = "oracle.dbtools.parser.plsql.UnifiedRules";




import { SqlRules } from './SqlRules';


import { PlsqlRules } from './PlsqlRules';


import { SqlEarley } from './SqlEarley';


UnifiedRules.main(null);
