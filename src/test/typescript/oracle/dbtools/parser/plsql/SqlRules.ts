/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley';
import { Grammar } from '../Grammar';
import { Lexer } from '../Lexer';
import { LexerToken } from '../LexerToken';
import { Matrix } from '../Matrix';
import { ParseNode } from '../ParseNode';
import { Resource } from '../Resource';
import { RuleTransforms } from '../RuleTransforms';
import { RuleTuple } from '../RuleTuple';
import { Substitutions } from '../Substitutions';
import { Token } from '../Token';
import { Visual } from '../Visual';
import { VisualImpl } from '../VisualImpl';
import { HarvestDoc } from './doc/HarvestDoc';
import { Service } from '../../../arbori/util/Service';

/**
 * SQL grammar;
 * Walk through EBNF grammar website maintained by Diana Lorentz
 * http://st-doc.us.oracle.com/database/121/SQLRF/img_text
 * http://st-doc.us.oracle.com/sql_grammar/sqlbnf/bnffiles  -- WIP
 * http://st-doc.us.oracle.com/sql_grammar/sqlbnf112/bnffiles/  -- 11.2
 * starting with "select" and descend down to define all the dependents.
 * Transform each EBNF rule into a set of BNF rules.
 * EBNF to BNF translator is built upon CYK parser engine.
 * @class
 */
export class SqlRules {
    static __static_initialized: boolean = false;
    static __static_initialize() { if (!SqlRules.__static_initialized) { SqlRules.__static_initialized = true; SqlRules.__static_initializer_0(); } }

    /*private*/ static testParseSqlBnf() {
        System.setProperty("sun.java2d.uiScale", "0");
        const input: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.docbnf");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        LexerToken.print$java_util_List(src);
        SqlRules.correctDots(src);
        let visual: Visual = null;
        visual = new Visual(src, SqlRules.earley_$LI$());
        const matrix: Matrix = new Matrix(SqlRules.earley_$LI$());
        SqlRules.earley_$LI$().parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const root: ParseNode = SqlRules.earley_$LI$().forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        root.printTree$();
        if (visual != null)visual.draw$oracle_dbtools_parser_Matrix(matrix);
        const grammar: Array<RuleTuple> = <any>([]);
        const hdr: string = "test";
        SqlRules.bnflist(root, src, grammar);
        console.info("-------------Optimized---------------");
        RuleTuple.printRules(grammar);
        console.info("-------------------------------------");
    }

    static identifiers: string[]; public static identifiers_$LI$(): string[] { SqlRules.__static_initialize(); if (SqlRules.identifiers == null) { SqlRules.identifiers = ['(', ')', '\'', ',', ';', ':', '=', '+', '-', '*', '/', '@', '!', '^', '~', 'e', 'f', 'd', '?']; }  return SqlRules.identifiers; }

    /*private*/ static bnfIdentifiers(rules: Array<RuleTuple>) {
        for(let index = 0; index < SqlRules.identifiers_$LI$().length; index++) {
            let id = SqlRules.identifiers_$LI$()[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple("identifier", ["\'" + id + "\'"]))
        }
    }

    static earley: Earley; public static earley_$LI$(): Earley { SqlRules.__static_initialize();  return SqlRules.earley; }

    static  __static_initializer_0() {
        try {
            SqlRules.earley = SqlRules.bnfParser();
            SqlRules.__bnf = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "bnf");
            SqlRules.__rawbnf = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "rawbnf");
            SqlRules.__boldrawbnf = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "boldrawbnf");
            SqlRules.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "identifier");
            SqlRules.__concat = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "concat");
            SqlRules.__block = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "block");
            SqlRules.sqBr = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "\'[\'");
            SqlRules.curlyBr = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "\'{\'");
            SqlRules.dot = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "\'.\'");
            SqlRules.lt = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "lt");
            SqlRules.gt = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "gt");
            SqlRules.lbr = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "lbr");
            SqlRules.rbr = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "rbr");
            SqlRules.lcp = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "lcp");
            SqlRules.rcp = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "rcp");
            SqlRules.dbar = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "dbar");
            SqlRules.sbar = /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.earley.symbolIndexes, "sbar");
        } catch(e) {
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
    }

    static __bnf: number; public static __bnf_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.__bnf; }

    static __rawbnf: number; public static __rawbnf_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.__rawbnf; }

    static __boldrawbnf: number; public static __boldrawbnf_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.__boldrawbnf; }

    static identifier: number; public static identifier_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.identifier; }

    static __concat: number; public static __concat_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.__concat; }

    static __block: number; public static __block_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.__block; }

    static sqBr: number; public static sqBr_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.sqBr; }

    static curlyBr: number; public static curlyBr_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.curlyBr; }

    static dot: number; public static dot_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.dot; }

    static lt: number; public static lt_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.lt; }

    static gt: number; public static gt_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.gt; }

    static lbr: number; public static lbr_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.lbr; }

    static rbr: number; public static rbr_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.rbr; }

    static lcp: number; public static lcp_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.lcp; }

    static rcp: number; public static rcp_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.rcp; }

    static dbar: number; public static dbar_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.dbar; }

    static sbar: number; public static sbar_$LI$(): number { SqlRules.__static_initialize();  return SqlRules.sbar; }

    /**
     * Init parser for BNF grammar (defined in DocBnf.grammar)
     * @return
     * @throws Exception
     * @return {Earley}
     * @private
     */
    /*private*/ static bnfParser(): Earley {
        const rules: Array<RuleTuple> = <any>([]);
        const input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/DocBnf.grammar");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.SqlLineComments_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        Grammar.grammar(root, src, rules);
        return new SqlRules.SqlRules$0(rules);
    }

    static extractRules(): Array<RuleTuple> {
        const sqlRules: Array<RuleTuple> = <any>([]);
        SqlRules.sloppyKeyword("ABSENT");
        SqlRules.missingProduction(sqlRules, "access_driver_type", "identifier");
        SqlRules.missingProduction(sqlRules, "admin_user_name", "identifier");
        SqlRules.sloppyKeyword("ADD");
        SqlRules.missingProduction(sqlRules, "alias", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("affinity_clauses", ["\'DISABLE\'", "\'AFFINITY\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_audit_policy___1", ["action_audit_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_index___2", ["\'PARAMETERS\'", "\'(\'", "string_literal", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_role___0", ["\'ENABLE\'", "\'EDITIONS\'", "\'FOR\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_role___1", ["\'GLOBALLY\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_sequence___0#", ["\'SCALE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_sequence___4", ["\'INCREMENT\'", "\'BY\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_sequence___4", ["\'START\'", "\'WITH\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_session___2", ["alter_session___1", "\'PARALLEL\'", "alter_session___3", "\'PARALLEL\'", "\'(\'", "\'DEGREE\'", "integer", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_table_properties", ["\'NOT\'", "\'WITH\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_table_partitioning", ["modify_table_partition", "update_index_clauses"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("alter_view___1", ["modify_column_clauses"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("analytic_clause", ["rank_clause"]));
        SqlRules.missingProduction(sqlRules, "anydata_column", "column");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("ANSI_supported_datatypes", ["\'NATIONAL\'", "\'CHAR\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("ANSI_supported_datatypes", ["\'NATIONAL\'", "\'CHARACTER\'"]));
        SqlRules.missingProduction(sqlRules, "argument", "expr");
        SqlRules.missingProduction(sqlRules, "attribute", "identifier");
        SqlRules.missingProduction(sqlRules, "attr_dim", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("blockchain_hash_clause", ["\'HASHING\'", "\'USING\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("blockchain_data_format_clause", ["\'VERSION\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("blockchain_table_clauses", ["blockchain_drop_table_clause", "blockchain_row_retention_clause"]));
        SqlRules.missingProduction(sqlRules, "boolean_expr", "condition");
        SqlRules.missingProduction(sqlRules, "c_alias", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("c_alias", ["\'AS\'", "identifier"]));
        SqlRules.missingProduction(sqlRules, "category", "identifier");
        SqlRules.missingProduction(sqlRules, "char", "expr");
        SqlRules.missingProduction(sqlRules, "char1", "expr");
        SqlRules.missingProduction(sqlRules, "char2", "expr");
        SqlRules.missingProduction(sqlRules, "character_set", "identifier");
        SqlRules.missingProduction(sqlRules, "charset", "identifier");
        SqlRules.missingProduction(sqlRules, "child_level", "identifier");
        SqlRules.missingProduction(sqlRules, "child_key_column", "column");
        SqlRules.missingProduction(sqlRules, "cluster", "identifier");
        SqlRules.missingProduction(sqlRules, "class", "expr");
        SqlRules.missingProduction(sqlRules, "class_value", "expr");
        SqlRules.missingProduction(sqlRules, "cluster", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("cluster_id", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("clustering_column_group", ["column"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("coalesce_table_subpartition", ["\'COALESCE\'", "\'SUBPARTITION\'"]));
        SqlRules.missingProduction(sqlRules, "cost_value", "expr");
        SqlRules.missingProduction(sqlRules, "collection_item", "objname");
        SqlRules.missingProduction(sqlRules, "collation_name", "identifier");
        SqlRules.missingProduction(sqlRules, "column_alias", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("column_definition", ["domain_clause"]));
        SqlRules.missingProduction(sqlRules, "column_expression", "expr");
        SqlRules.missingProduction(sqlRules, "column_name", "identifier");
        SqlRules.missingProduction(sqlRules, "comparison_expr", "expr");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("compound_expression", ["vector_expression"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("condition", ["overlaps_condition"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("condition", ["function_expression"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("condition", ["\'(\'", "subquery", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("condition", ["case_expression"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("condition", ["source_destination_predicate"]));
        SqlRules.missingProduction(sqlRules, "condition_spec", "condition");
        SqlRules.missingProduction(sqlRules, "constant", "literal");
        SqlRules.missingProduction(sqlRules, "constraint_name", "identifier");
        SqlRules.missingProduction(sqlRules, "container_name", "identifier");
        SqlRules.missingProduction(sqlRules, "container_data_object", "identifier");
        SqlRules.missingProduction(sqlRules, "cpu_cost", "digits");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("create_edition___1", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("create_mv_refresh", ["\'FOR\'", "\'UPDATE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("create_mv_refresh", ["create_mv_refresh", "\'FOR\'", "\'UPDATE\'"]));
        SqlRules.missingProduction(sqlRules, "create_index_statement", "create_index");
        SqlRules.missingProduction(sqlRules, "create_table_statement", "create_table");
        SqlRules.missingProduction(sqlRules, "create_view_statement", "create_view");
        SqlRules.missingProduction(sqlRules, "cycle_mark_c_alias", "identifier");
        SqlRules.missingProduction(sqlRules, "cycle_value", "expr");
        SqlRules.missingProduction(sqlRules, "database", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("datatype", ["domain_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("datatype", ["datatype", "domain_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("datatype", ["vector_type"]));
        SqlRules.missingProduction(sqlRules, "data_role_list", "identifier_list");
        SqlRules.missingProduction(sqlRules, "date", "expr");
        SqlRules.missingProduction(sqlRules, "datetime_expr", "expr");
        SqlRules.missingProduction(sqlRules, "db_user_proxy", "identifier");
        SqlRules.missingProduction(sqlRules, "default", "expr");
        SqlRules.missingProduction(sqlRules, "default_expression", "expr");
        SqlRules.missingProduction(sqlRules, "default_selectivity", "digits");
        SqlRules.missingProduction(sqlRules, "dependent_column", "column");
        SqlRules.missingProduction(sqlRules, "dimension", "identifier");
        SqlRules.missingProduction(sqlRules, "dimension_column", "column");
        SqlRules.missingProduction(sqlRules, "directory", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("directory_name", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("directory_name", ["identifier", "\'.\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("directory_object_name", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("directory_object_name", ["identifier", "\'.\'", "identifier"]));
        SqlRules.missingProduction(sqlRules, "disk_name", "identifier");
        SqlRules.missingProduction(sqlRules, "diskgroup_name", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("display_expression", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("display_expression", ["comparison_condition"]));
        SqlRules.missingProduction(sqlRules, "domain", "identifier");
        SqlRules.missingProduction(sqlRules, "domain_column", "column");
        SqlRules.sloppyKeyword("DROP");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("drop_external_partition_attrs", ["drop_external_partition_attrs", "\'(\'", "\')\'"]));
        SqlRules.missingProduction(sqlRules, "edition", "identifier");
        SqlRules.missingProduction(sqlRules, "edition_name", "identifier");
        SqlRules.missingProduction(sqlRules, "edge_variable", "identifier");
        SqlRules.missingProduction(sqlRules, "else_expr", "condition");
        SqlRules.missingProduction(sqlRules, "else_expr", "expr");
        SqlRules.missingProduction(sqlRules, "element", "identifier");
        SqlRules.missingProduction(sqlRules, "end_time_column", "column");
        SqlRules.sloppyKeyword("ENABLE");
        SqlRules.sloppyKeyword("EVERY");
        SqlRules.sloppyKeyword("EXTEND");
        SqlRules.sloppyKeyword("EXTERNAL");
        SqlRules.missingProduction(sqlRules, "equijoin_condition", "condition");
        SqlRules.missingProduction(sqlRules, "esc_char", "expr");
        SqlRules.missingProduction(sqlRules, "exposed_fact_column_name", "expr");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("expr#", ["compound_condition"]));
        SqlRules.missingProduction(sqlRules, "expr1", "expr");
        SqlRules.missingProduction(sqlRules, "expr2", "expr");
        SqlRules.missingProduction(sqlRules, "expr3", "expr");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("extent_management_clause", ["\'EXTENT\'", "\'MANAGEMENT\'", "\'DICTIONARY\'"]));
        SqlRules.missingProduction(sqlRules, "failgroup_name", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("file_name", ["filename"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("filename", ["string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("filename", ["string_literal", "\':\'", "string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("filename", ["identifier", "\':\'", "string_literal"]));
        SqlRules.missingProduction(sqlRules, "file_number", "digits");
        SqlRules.missingProduction(sqlRules, "filenumber", "digits");
        SqlRules.missingProduction(sqlRules, "flashback_archive", "identifier");
        SqlRules.missingProduction(sqlRules, "fmt", "expr");
        SqlRules.missingProduction(sqlRules, "fractional_second_precision", "digits");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("function", ["timebucket_function"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("function", ["vector_chunks"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("function", ["vector_function"]));
        SqlRules.missingProduction(sqlRules, "function_name", "identifier");
        SqlRules.missingProduction(sqlRules, "grant_statement", "grant");
        SqlRules.missingProduction(sqlRules, "hash_partition_quantity", "digits");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("hash_subpartition_quantity", ["\'SUBPARTITION\'", "\'TEMPLATE\'", "digits"]));
        SqlRules.missingProduction(sqlRules, "hierarchy", "identifier");
        SqlRules.missingProduction(sqlRules, "hier_id", "column");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("hier_function_name", ["\'HIER_PARENT_LEVEL\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("hier_function_name", ["\'HIER_PARENT_UNIQUE_NAME\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("hier_function_name", ["\'HIER_CHILD_COUNT\'"]));
        SqlRules.sloppyKeyword("HOURS");
        SqlRules.missingProduction(sqlRules, "HSM_auth_string", "identifier");
        SqlRules.missingProduction(sqlRules, "id", "identifier");
        SqlRules.missingProduction(sqlRules, "identifier_string", "string_literal");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("identifier", ["\'$\'", "\'{\'", "identifier", "\'}\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("identifier_list", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("identifier_list", ["identifier_list", "\',\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("ilm_clause", ["\'ILM\'", "\'ADD\'", "\'POLICY\'", "ilm_policy_clause", "\'DISABLE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("ilm_clause", ["\'ILM\'", "\'ADD\'", "identifier", "ilm_policy_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("ilm_clause", ["\'ILM\'", "\'DISABLE\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("implementation_clause", ["implementation_clause", "\'WITHOUT\'", "\'COLUMN\'", "\'DATA\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("implementation_type", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("implementation_type", ["identifier", "\'.\'", "identifier"]));
        SqlRules.missingProduction(sqlRules, "index", "identifier");
        SqlRules.missingProduction(sqlRules, "indextype", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("inline_constraint", ["\'VALIDATE\'", "string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("inline_constraint", ["\'VALIDATE\'", "\'CAST\'", "string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("inline_constraint", ["\'RESERVABLE\'", "inline_constraint"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("inline_constraint___1", ["\'PRIMARY\'", "\'KEY\'", "\'(\'", "column", "\')\'"]));
        SqlRules.missingProduction(sqlRules, "integer", "digits");
        SqlRules.missingProduction(sqlRules, "input_expr", "expr");
        SqlRules.missingProduction(sqlRules, "io_cost", "digits");
        SqlRules.missingProduction(sqlRules, "java_ext_name", "identifier");
        SqlRules.missingProduction(sqlRules, "join_group", "identifier");
        SqlRules.missingProduction(sqlRules, "JSON_object_key", "identifier");
        SqlRules.missingProduction(sqlRules, "JSON_column", "identifier");
        SqlRules.missingProduction(sqlRules, "json_column", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("json_format", ["\'FORMAT\'", "\'OSON\'"]));
        SqlRules.missingProduction(sqlRules, "JSON_agg_returning_clause", "JSON_returning_clause");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("json_non_value_flag", ["json_non_value_flag", "\'UNWRAP\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("JSON_patch_expr", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("JSON_patch_expr", ["expr", "format_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("JSON_target_expr", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("JSON_target_expr", ["expr", "format_clause"]));
        SqlRules.missingProduction(sqlRules, "pathExp", "string_literal");
        SqlRules.missingProduction(sqlRules, "pathExpr", "string_literal");
        SqlRules.missingProduction(sqlRules, "path_expr", "string_literal");
        SqlRules.missingProduction(sqlRules, "keystore_location", "string_literal");
        SqlRules.missingProduction(sqlRules, "keystore_location1", "string_literal");
        SqlRules.missingProduction(sqlRules, "keystore_password", "identifier");
        SqlRules.missingProduction(sqlRules, "keystore1_password", "identifier");
        SqlRules.missingProduction(sqlRules, "keystore2_password", "identifier");
        SqlRules.missingProduction(sqlRules, "keystore3_password", "identifier");
        SqlRules.missingProduction(sqlRules, "leading_field_precision", "digits");
        SqlRules.missingProduction(sqlRules, "len", "digits");
        SqlRules.missingProduction(sqlRules, "level", "identifier");
        SqlRules.missingProduction(sqlRules, "level_ref", "identifier");
        SqlRules.missingProduction(sqlRules, "level_table", "identifier");
        SqlRules.missingProduction(sqlRules, "level_column", "identifier");
        SqlRules.missingProduction(sqlRules, "lib_name", "identifier");
        SqlRules.missingProduction(sqlRules, "library_name", "identifier");
        SqlRules.sloppyKeyword("LIMIT");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("list_subpartition_desc", ["\'SUBPARTITION\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("list_subpartition_desc", ["list_subpartition_desc", "physical_properties"]));
        SqlRules.missingProduction(sqlRules, "LOB_item", "column");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("LOB_parameters#", ["\'CHUNK\'", "integer", "\'K\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("LOB_parameters#", ["integer"]));
        SqlRules.missingProduction(sqlRules, "LOB_segname", "identifier");
        SqlRules.missingProduction(sqlRules, "log_group", "identifier");
        SqlRules.missingProduction(sqlRules, "main_model_name", "identifier");
        SqlRules.sloppyKeyword("MANUAL");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("materialized_view", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("materialized_view", ["identifier", "\'.\'", "identifier"]));
        SqlRules.missingProduction(sqlRules, "match_string", "string_literal");
        SqlRules.missingProduction(sqlRules, "measure_column", "column");
        SqlRules.missingProduction(sqlRules, "member_key_expr", "expr");
        SqlRules.missingProduction(sqlRules, "method", "identifier");
        SqlRules.missingProduction(sqlRules, "mining_model_name", "identifier");
        SqlRules.sloppyKeyword("MINUTES");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("model", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("model", ["\'FOR\'", "identifier"]));
        SqlRules.missingProduction(sqlRules, "model_name", "identifier");
        SqlRules.missingProduction(sqlRules, "n", "digits");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("namespace", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("namespace", ["identifier", "\'.\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("nested_item", ["table_reference"]));
        SqlRules.missingProduction(sqlRules, "nested_table", "expr");
        SqlRules.missingProduction(sqlRules, "nested_table1", "expr");
        SqlRules.missingProduction(sqlRules, "nested_table2", "expr");
        SqlRules.missingProduction(sqlRules, "network_cost", "digits");
        SqlRules.missingProduction(sqlRules, "new_keystore_password", "identifier");
        SqlRules.missingProduction(sqlRules, "new_name", "identifier");
        SqlRules.missingProduction(sqlRules, "new_table_name", "identifier");
        SqlRules.sloppyKeyword("NOEXTEND");
        SqlRules.sloppyKeyword("NULL");
        SqlRules.missingProduction(sqlRules, "no_cycle_value", "expr");
        SqlRules.missingProduction(sqlRules, "number_literal", "numeric_literal");
        SqlRules.missingProduction(sqlRules, "object", "objname");
        SqlRules.missingProduction(sqlRules, "object_name", "objname");
        SqlRules.missingProduction(sqlRules, "object_step", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("objname", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("objname", ["identifier", "\'.\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("object_type_name", ["objname"]));
        SqlRules.missingProduction(sqlRules, "object_table_alias", "identifier");
        SqlRules.missingProduction(sqlRules, "old_name", "identifier");
        SqlRules.missingProduction(sqlRules, "old_password", "identifier");
        SqlRules.missingProduction(sqlRules, "old_keystore_password", "identifier");
        SqlRules.missingProduction(sqlRules, "offset", "expr");
        SqlRules.missingProduction(sqlRules, "offset_expr", "expr");
        SqlRules.sloppyKeyword("ONLY");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("open_statement", ["\'OPEN\'", "identifier", "\'=\'", "expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("open_statement", ["\'OPEN\'", "identifier", "\'=\'", "\'ALL\'"]));
        SqlRules.missingProduction(sqlRules, "operator", "identifier");
        SqlRules.missingProduction(sqlRules, "ordering_column", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("order_expression", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("order_expression", ["comparison_condition"]));
        SqlRules.missingProduction(sqlRules, "operation", "json_oper");
        SqlRules.missingProduction(sqlRules, "outline", "identifier");
        SqlRules.missingProduction(sqlRules, "owner", "identifier");
        SqlRules.missingProduction(sqlRules, "package", "identifier");
        SqlRules.missingProduction(sqlRules, "package_name", "identifier");
        SqlRules.missingProduction(sqlRules, "parameter", "identifier");
        SqlRules.missingProduction(sqlRules, "parameter_name", "identifier");
        SqlRules.missingProduction(sqlRules, "parameter_type", "prm_spec_unconstrained_type");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("parameter_value", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("parameter_value", ["size_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("parameter_value", ["\'ALL\'"]));
        SqlRules.missingProduction(sqlRules, "parent_level", "identifier");
        SqlRules.missingProduction(sqlRules, "parent_edition", "identifier");
        SqlRules.missingProduction(sqlRules, "partition", "identifier");
        SqlRules.missingProduction(sqlRules, "partition_name", "identifier");
        SqlRules.missingProduction(sqlRules, "partition_name_old", "identifier");
        SqlRules.missingProduction(sqlRules, "partition_key_value", "expr");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("password_parameters", ["\'PASSWORD_ROLLOVER_TIME\'", "expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("password_parameters", ["\'PASSWORD_ROLLOVER_TIME\'", "\'DEFAULT\'"]));
        SqlRules.missingProduction(sqlRules, "subpartition_key_value", "expr");
        SqlRules.sloppyKeyword("PARTITION");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("parallel_clause___2", ["\'PARALLEL\'"]));
        SqlRules.missingProduction(sqlRules, "password", "password_value");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("pdb_name", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("pdb_name", ["identifier", "\'FORCE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("pdb_name", ["identifier", "\'TO\'", "string_literal"]));
        SqlRules.missingProduction(sqlRules, "percent", "numeric_literal");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("permanent_tablespace_clause___0", ["logging_clause", "permanent_tablespace_clause___0"]));
        SqlRules.missingProduction(sqlRules, "policy", "identifier");
        SqlRules.missingProduction(sqlRules, "position", "digits");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("precision", ["digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("precision", ["\'*\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("precision", ["bind_var"]));
        SqlRules.missingProduction(sqlRules, "predicate", "condition");
        SqlRules.missingProduction(sqlRules, "primary_name", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("primary_operator", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("primary_operator", ["identifier", "\'.\'", "identifier"]));
        SqlRules.missingProduction(sqlRules, "procedure_name", "identifier");
        SqlRules.missingProduction(sqlRules, "procedure", "identifier");
        SqlRules.missingProduction(sqlRules, "profile", "identifier");
        SqlRules.missingProduction(sqlRules, "property_name", "identifier");
        SqlRules.missingProduction(sqlRules, "query_name", "identifier");
        SqlRules.sloppyKeyword("REJECT");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("rebuild_clause___0#", ["\'COMPUTE\'", "\'STATISTICS\'"]));
        SqlRules.missingProduction(sqlRules, "reference_spreadsheet_name", "identifier");
        SqlRules.missingProduction(sqlRules, "ref_attribute", "column");
        SqlRules.missingProduction(sqlRules, "restore_point", "identifier");
        SqlRules.missingProduction(sqlRules, "return_expr", "expr");
        SqlRules.missingProduction(sqlRules, "return_type", "func_return_prm_spec_unconstrained_type");
        SqlRules.missingProduction(sqlRules, "return_value", "expr");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("revokee_clause", ["\'-\'", "revokee_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("revokee_list", ["identifier_list"]));
        SqlRules.missingProduction(sqlRules, "role", "identifier");
        SqlRules.missingProduction(sqlRules, "role_name", "identifier");
        SqlRules.missingProduction(sqlRules, "rollback_segment", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("rowcount", ["digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("rowcount", ["identifier"]));
        SqlRules.missingProduction(sqlRules, "savepoint", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("scale", ["digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("scale", ["\'-\'", "digits"]));
        SqlRules.missingProduction(sqlRules, "schema", "identifier");
        SqlRules.missingProduction(sqlRules, "schema_name", "identifier");
        SqlRules.missingProduction(sqlRules, "scope_table", "identifier");
        SqlRules.missingProduction(sqlRules, "search_string", "string_literal");
        SqlRules.missingProduction(sqlRules, "secret", "identifier");
        SqlRules.missingProduction(sqlRules, "sequence", "identifier");
        SqlRules.missingProduction(sqlRules, "server_file_name", "string_literal");
        SqlRules.missingProduction(sqlRules, "SERVICE", "\'SERVICE\'");
        SqlRules.missingProduction(sqlRules, "shardspace", "identifier");
        SqlRules.missingProduction(sqlRules, "sha2_512", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("searched_case_expression#", ["\'WHEN\'", "condition", "\'THEN\'", "condition"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("simple_expression", ["bind_var"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("single_row_function", ["embedding_distance"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("single_row_function", ["\'VECTOR_DIMS\'", "paren_expr_list"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("single_row_function", ["\'VECTOR_DIMENSION_COUNT\'", "paren_expr_list"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("single_row_function", ["\'VECTOR_DIMENSION_FORMAT\'", "paren_expr_list"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("single_row_function", ["\'VECTOR_NORM\'", "paren_expr_list"]));
        SqlRules.missingProduction(sqlRules, "size", "digits");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("size", ["digits"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("size", ["bind_var"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("size_clause", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("size_clause", ["identifier", "size_clause___0"]));
        SqlRules.sloppyKeyword("SERVICE");
        SqlRules.sloppyKeyword("SNAPSHOT");
        SqlRules.missingProduction(sqlRules, "software_keystore_password", "identifier");
        SqlRules.missingProduction(sqlRules, "source_outline", "identifier");
        SqlRules.missingProduction(sqlRules, "sql_expr", "expr");
        SqlRules.missingProduction(sqlRules, "src_pdb_name", "identifier");
        SqlRules.missingProduction(sqlRules, "statement", "sql_stmt");
        SqlRules.missingProduction(sqlRules, "statistics_type", "identifier");
        SqlRules.missingProduction(sqlRules, "start_time_column", "identifier");
        SqlRules.missingProduction(sqlRules, "storage_table", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("string_literal", ["string_literal", "bind_var"]));
        SqlRules.missingProduction(sqlRules, "subpartition", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("subpartition_template", ["\'AUTOMATIC\'", "subpartition_template"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("subpartition_template", ["\'SUBPARTITION\'", "\'TEMPLATE\'", "\'(\'", "\')\'"]));
        SqlRules.missingProduction(sqlRules, "subpartition_value", "\"expr_list\"");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("supplemental_id_key_clause___0", ["\'UNIQUE\'", "\'INDEX\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("supplemental_id_key_clause___2", ["\'UNIQUE\'", "\'INDEX\'"]));
        SqlRules.missingProduction(sqlRules, "synonym", "identifier");
        SqlRules.missingProduction(sqlRules, "t_alias", "identifier");
        SqlRules.missingProduction(sqlRules, "table", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("table", ["identifier", "\'@\'", "dblink"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("table", ["identifier", "partition_extension_clause"]));
        SqlRules.missingProduction(sqlRules, "table_alias", "identifier");
        SqlRules.missingProduction(sqlRules, "tablespace", "identifier");
        SqlRules.missingProduction(sqlRules, "tablespace_set", "identifier");
        SqlRules.missingProduction(sqlRules, "template_name", "identifier");
        SqlRules.missingProduction(sqlRules, "topN", "digits");
        SqlRules.sloppyKeyword("TO");
        SqlRules.sloppyKeyword("TOPLEVEL");
        SqlRules.missingProduction(sqlRules, "trigger_name", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("type_name", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("type_name", ["\'INTEGER\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("type_name", ["\'VARCHAR2\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("type", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("type", ["\'INTEGER\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("type", ["\'VARCHAR2\'"]));
        SqlRules.missingProduction(sqlRules, "user", "identifier");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("user_defined_types", ["objname"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("user_defined_types", ["\'REF\'", "objname"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("user_defined_types", ["\'REF\'", "objname", "\'WITH\'", "\'ROWID\'", "\'ALLOW\'", "\'PRIMARY\'", "\'KEY\'"]));
        SqlRules.missingProduction(sqlRules, "user_role", "identifier");
        SqlRules.sloppyKeyword("USING");
        SqlRules.missingProduction(sqlRules, "v1", "identifier");
        SqlRules.missingProduction(sqlRules, "view", "identifier");
        SqlRules.missingProduction(sqlRules, "valid_time_column", "identifier");
        SqlRules.missingProduction(sqlRules, "variable_name", "identifier");
        SqlRules.missingProduction(sqlRules, "varray_type", "identifier");
        SqlRules.missingProduction(sqlRules, "vertex_variable", "identifier");
        SqlRules.missingProduction(sqlRules, "window_name", "identifier");
        SqlRules.sloppyKeyword("VOLUME");
        SqlRules.missingProduction(sqlRules, "xml_encoding_spec", "string_literal");
        SqlRules.missingProduction(sqlRules, "XMLSchema_URL", "string");
        SqlRules.missingProduction(sqlRules, "XMLType", "\'XMLTYPE\'");
        SqlRules.missingProduction(sqlRules, "URIType", "\'URITYPE\'");
        SqlRules.missingProduction(sqlRules, "XQuery_string", "expr");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("zonemap_name", ["objname"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("zonemap_name", ["objname", "annotations_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("zonemap_attributes#", ["\'BUILD\'", "\'IMMEDIATE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("zonemap_attributes#", ["\'ON\'", "\'PREBUILT\'", "\'TABLE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("zonemap_attributes#", ["\'SCALE\'", "\'PARTITION\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("zonemap_attributes#", ["\'(\'", "column_name_list", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("zonemap_attributes#", ["physical_attributes_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("literal", ["string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("literal", ["number"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("literal", ["\'TRUE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("literal", ["\'FALSE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("datetime_literal", ["\'TO_DATE\'", "\'(\'", "string_literal", "\',\'", "string_literal", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("literal", ["datetime_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("value_expr", ["expr"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("bind_var", ["\'DATE\'", "\':\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("bind_var", ["\'TIME\'", "\':\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("not_eq", ["\'<\'", "\'>\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("character_datatypes", ["\'VARCHAR2\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("character_datatypes", ["\'LONG\'", "\'VARCHAR\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("inmemory_table_clause", ["inmemory_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("inmemory_table_clause", ["inmemory_table_clause inmemory_clause"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("pattern", ["string_literal"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("pattern", ["bind_var"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("external_table_clause", ["\'(\'", "\'TYPE\'", "identifier", "external_table_data_props", "external_table_clause___0", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("external_table_clause", ["\'(\'", "external_table_data_props", "external_table_clause___0", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("mining_analytic_clause", ["identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("modify_LOB_parameters___0", ["\'CACHE\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("modify_LOB_parameters___0", ["\'INDEX\'", "\'(\'", "physical_attributes_clause", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("LOB_storage_parameters#", ["\'INDEX\'", "identifier"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("LOB_storage_parameters#", ["\'INDEX\'", "\'(\'", "physical_attributes_clause", "\')\'"]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("LOB_storage_parameters#", ["\'INDEX\'", "identifier", "\'(\'", "physical_attributes_clause", "\')\'"]));
        SqlRules.addToDo("commit");
        SqlRules.addToDo("JSON_table_on_empty_clause");
        SqlRules.addToDo("json_query");
        SqlRules.addToDo("sql_statements");
        SqlRules.addToDo("update");
        while((0 < /* size */(<number>SqlRules.toDo_$LI$().length))) {{
            const candidate: string = SqlRules.nextToDo();
            if ("where_clause" === candidate)console.info();
            SqlRules.recursiveCollectBNF(sqlRules, candidate);
            /* remove */(a => { let index = a.indexOf(candidate); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(SqlRules.toDo_$LI$());
        }};
        for(let index = 0; index < SqlRules.notFound_$LI$().length; index++) {
            let key = SqlRules.notFound_$LI$()[index];
            if (/* contains */(key.indexOf("name") != -1))SqlRules.missingProduction(sqlRules, key, "identifier");
        }
        RuleTransforms.printSelectedRules("embedding_distance", sqlRules);
        RuleTransforms.eliminateEmptyProductions(sqlRules);
        RuleTransforms.injectMissingEmptyProductions(sqlRules);
        RuleTransforms.substituteSingleBinaryProductions(sqlRules);
        RuleTransforms.substituteSingleUnaryProductions(sqlRules);
        SqlRules.appendSemi$java_util_Set(sqlRules);
        SqlRules.straightenSemicolon$java_util_Set(sqlRules);
        SqlRules.addSlash4Semi$java_util_Set(sqlRules);
        SqlRules.renameSymbol(sqlRules, "expression_list", "\"expression_list\"");
        SqlRules.duplicateRules(sqlRules, ["\'MATERIALIZED\'", "\'VIEW\'"], ["\'SNAPSHOT\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'VARCHAR2\'", "\'(\'"], ["\'VARCHAR\'", "\'(\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'JSON\'", "\'(\'"], ["\'OSON\'", "\'(\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'FORMAT\'", "\'JSON\'"], ["\'FORMAT\'", "\'OSON\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'FORMAT\'", "\'JSON\'"], ["\'FORMAT\'", "\'BSON\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'BY\'", "\'REF\'"], ["\'BY\'", "\'REFERENCE\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'MULTISET\'", "scalar_subquery_expression"], ["\'THE\'", "scalar_subquery_expression"]);
        SqlRules.duplicateRules(sqlRules, ["\'PASSING\'", "\'BY\'", "\'VALUE\'"], ["\'PASSING\'", "\'BY\'", "\'REF\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'JSON_MERGEPATCH\'", "\'(\'"], ["\'JSON_PATCH\'", "\'(\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'CASCADE\'", "\'CONSTRAINTS\'"], ["\'CASCADE\'", "\'CONSTRAINT\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'SHARD\'", "\'DDL\'"], ["\'SHARD\'", "\'OPERATIONS\'"]);
        SqlRules.duplicateRules(sqlRules, ["\'REFERENCES\'", "identifier"], ["\'REFERENCING\'", "identifier"]);
        SqlRules.duplicateRules(sqlRules, ["\'REFERENCES\'", "objname"], ["\'REFERENCING\'", "objname"]);
        SqlRules.renameSymbolsInRules(sqlRules, "create_zonemap_as_subquery", ["\'AS\'", "query_block"], ["\'AS\'", "subquery"]);
        SqlRules.renameSymbolsInRules(sqlRules, "list_partitions", ["column"], ["expr"]);
        SqlRules.renameSymbolsInRules(sqlRules, "composite_list_partitions", ["column"], ["expr"]);
        SqlRules.insertIfNotExists(sqlRules, ["\'OPERATOR\'"]);
        PlsqlRules.insertIfNotExists(sqlRules, "permanent_tablespace_clause", 1);
        SqlRules.insertIfNotExists(sqlRules, ["\'ANALYTIC\'", "\'VIEW\'"]);
        SqlRules.insertIfNotExists(sqlRules, ["\'LIBRARY\'"]);
        PlsqlRules.insertIfNotExists(sqlRules, "create_materialized_vw_log", 3);
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int(sqlRules, "drop_operator", 2);
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int(sqlRules, "alter_sequence", 2);
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int(sqlRules, "drop_tablespace", 2);
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int(sqlRules, "alter_tablespace", 2);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("temporary_tablespace_clause___0", ["\'TEMPORARY\'", "\'TABLESPACE\'", "\'IF\'", "\'NOT\'", "\'EXISTS\'"]));
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int(sqlRules, "alter_java", 3);
        PlsqlRules.insertIfExists$java_util_Set$java_lang_String$int(sqlRules, "drop_role", 2);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(sqlRules, new RuleTuple("sim_expr", ["aggregate_function"]));
        console.info("*************CHANGED************");
        {
            let array = /* keySet */Object.keys(SqlRules.changed_$LI$());
            for(let index = 0; index < array.length; index++) {
                let k = array[index];
                console.info(k + "    " + /* get */((m,k) => m[k]===undefined?null:m[k])(SqlRules.changed_$LI$(), k))
            }
        }
        console.info("********************************");
        return sqlRules;
    }

    static insertIfNotExists(sqlRules: Array<RuleTuple>, object: string[]) {
        const addendum: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            {
                if (rule.rhs.length < 1)continue;
                if (!("\'CREATE\'" === (rule.rhs[0])))continue;
                OUTER: for(let i: number = 1; i < rule.rhs.length && i < 3 + object.length; i++) {{
                    for(let j: number = 0; j < object.length; j++) {if (!(object[j] === (rule.rhs[i + j])))continue OUTER;;}
                    const modified: RuleTuple = new RuleTuple(rule.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(rule.rhs.length + 3));
                    for(let j: number = 0; j < i + object.length; j++) {{
                        modified.rhs[j] = rule.rhs[j];
                    };}
                    modified.rhs[i + object.length] = "\'IF\'";
                    modified.rhs[i + object.length + 1] = "\'NOT\'";
                    modified.rhs[i + object.length + 2] = "\'EXISTS\'";
                    for(let j: number = i + object.length; j < rule.rhs.length; j++) {{
                        modified.rhs[j + 3] = rule.rhs[j];
                    };}
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(addendum, modified);
                };}
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(sqlRules, addendum);
    }

    /*private*/ static sloppyKeyword(string: string) {
    }

    /*private*/ static missingProduction(rules: Array<RuleTuple>, head: string, rhs: string) {
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, new RuleTuple(head, [rhs]));
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.toDo_$LI$(), rhs);
    }

    public static replaceSymbol(rule: string, from: string, to: string): string {
        const ret: Substitutions = new Substitutions(rule);
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(rule, false, +LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.SqlPlusComments_$LI$());
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            if (from === t.content)ret.put$int$int$java_lang_String(t.begin, t.end, to);
        }
        return ret.transformInput();
    }

    /*private*/ static appendSemi$java_util_Set(sqlRules: Array<RuleTuple>) {
        const heads: string[] = ["alter_package"];
        for(let index = 0; index < heads.length; index++) {
            let head = heads[index];
            SqlRules.appendSemi$java_util_Set$java_lang_String(sqlRules, head)
        }
    }

    public static appendSemi$java_util_Set$java_lang_String(sqlRules: Array<RuleTuple>, head: string) {
        const add: Array<RuleTuple> = <any>([]);
        const __delete: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            if (head === rule.head){
                if ("\';\'" === (rule.rhs[rule.rhs.length - 1]))throw Object.defineProperty(new Error("\"\';\'\".equals(rule.rhs[rule.rhs.length-1]): " + head), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(rule.rhs.length + 1);
                for(let i: number = 0; i < rhs.length - 1; i++) {rhs[i] = rule.rhs[i];}
                rhs[rhs.length - 1] = "\';\'";
                const modifiedRule: RuleTuple = new RuleTuple(head, rhs);
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(add, modifiedRule);
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(__delete, rule);
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(sqlRules, add);
        /* removeAll */((a, r) => { let b=false; for(let i=0;i<r.length;i++) { let ndx=a.indexOf(r[i]); if(ndx>=0) { a.splice(ndx, 1); b=true; } } return b; })(sqlRules,__delete);
    }

    /**
     * replace rules with added semi colon
     * @param {RuleTuple[]} sqlRules
     * @param {string} head
     * @private
     */
    public static appendSemi(sqlRules?: any, head?: any) {
        if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && ((typeof head === 'string') || head === null)) {
            return <any>SqlRules.appendSemi$java_util_Set$java_lang_String(sqlRules, head);
        } else if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && head === undefined) {
            return <any>SqlRules.appendSemi$java_util_Set(sqlRules);
        } else throw new Error('invalid overload');
    }

    /*private*/ static straightenSemicolon$java_util_Set(sqlRules: Array<RuleTuple>) {
        const heads: string[] = ["analyze", "audit", "comment", "explain_plan", "lock_table", "noaudit", "purge", "revoke", "set_constraints", "set_role", "set_transaction", "truncate_table"];
        for(let index = 0; index < heads.length; index++) {
            let head = heads[index];
            SqlRules.straightenSemicolon$java_util_Set$java_lang_String(sqlRules, head)
        }
    }

    public static straightenSemicolon$java_util_Set$java_lang_String(sqlRules: Array<RuleTuple>, head: string) {
        const rules: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            if (head === rule.head){
                if (!("\';\'" === (rule.rhs[rule.rhs.length - 1])))throw Object.defineProperty(new Error("!\"\';\'\".equals(rule.rhs[rule.rhs.length-1]): " + head), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(rule.rhs.length - 1);
                for(let i: number = 0; i < rhs.length; i++) {rhs[i] = rule.rhs[i];}
                const modifiedRule: RuleTuple = new RuleTuple(head, rhs);
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, modifiedRule);
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(sqlRules, rules);
    }

    /**
     * Optional trailing semicolon; add rules without semi
     * @param {RuleTuple[]} sqlRules
     * @param {string} head
     * @private
     */
    public static straightenSemicolon(sqlRules?: any, head?: any) {
        if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && ((typeof head === 'string') || head === null)) {
            return <any>SqlRules.straightenSemicolon$java_util_Set$java_lang_String(sqlRules, head);
        } else if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && head === undefined) {
            return <any>SqlRules.straightenSemicolon$java_util_Set(sqlRules);
        } else throw new Error('invalid overload');
    }

    /*private*/ static addSlash4Semi$java_util_Set(sqlRules: Array<RuleTuple>) {
        const heads: string[] = ["alter_type", "alter_package", "comment", "create_context"];
        for(let index = 0; index < heads.length; index++) {
            let head = heads[index];
            SqlRules.addSlash4Semi$java_util_Set$java_lang_String(sqlRules, head)
        }
    }

    public static addSlash4Semi$java_util_Set$java_lang_String(sqlRules: Array<RuleTuple>, head: string) {
        const rules: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            if (head === rule.head){
                if (!("\';\'" === (rule.rhs[rule.rhs.length - 1])))continue;
                const rhs: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(rule.rhs.length);
                for(let i: number = 0; i < rhs.length - 1; i++) {rhs[i] = rule.rhs[i];}
                rhs[rhs.length - 1] = "\'/\'";
                const modifiedRule: RuleTuple = new RuleTuple(head, rhs);
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(rules, modifiedRule);
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(sqlRules, rules);
    }

    /**
     * add rules with semi replaced by slash
     * @param {RuleTuple[]} sqlRules
     * @param {string} head
     * @private
     */
    public static addSlash4Semi(sqlRules?: any, head?: any) {
        if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && ((typeof head === 'string') || head === null)) {
            return <any>SqlRules.addSlash4Semi$java_util_Set$java_lang_String(sqlRules, head);
        } else if (((sqlRules != null && (sqlRules instanceof Array)) || sqlRules === null) && head === undefined) {
            return <any>SqlRules.addSlash4Semi$java_util_Set(sqlRules);
        } else throw new Error('invalid overload');
    }

    static renameSymbol(sqlRules: Array<RuleTuple>, from: string, to: string) {
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            {
                if (from === rule.head)rule.head = to;
                for(let i: number = 0; i < rule.rhs.length; i++) {if (from === (rule.rhs[i]))rule.rhs[i] = to;;}
            }
        }
    }

    static duplicateRules(sqlRules: Array<RuleTuple>, from: string[], to: string[]) {
        const addendum: Array<RuleTuple> = <any>([]);
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            {
                if (rule.rhs.length + to.length - from.length < 0)continue;
                const modified: RuleTuple = new RuleTuple(rule.head, (s => { let a=[]; while(s-->0) a.push(null); return a; })(rule.rhs.length + to.length - from.length));
                let add: boolean = false;
                for(let i: number = 0; i < rule.rhs.length - from.length + 1; i++) {{
                    modified.rhs[i] = rule.rhs[i];
                    let matches: boolean = true;
                    for(let j: number = 0; j < from.length && i + j < rule.rhs.length; j++) {{
                        if (!(rule.rhs[i + j] === (from[j]))){
                            matches = false;
                            break;
                        }
                    };}
                    if (!matches)continue;
                    for(let j: number = 0; j < to.length && i + j < modified.rhs.length; j++) {modified.rhs[i + j] = to[j];}
                    i += from.length;
                    for(; i < rule.rhs.length; i++) {modified.rhs[i + to.length - from.length] = rule.rhs[i];}
                    add = true;
                    break;
                };}
                if (add)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(addendum, modified);
            }
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(sqlRules, addendum);
    }

    /*private*/ static renameSymbolsInRules(sqlRules: Array<RuleTuple>, header: string, from: string[], to: string[]) {
        for(let index = 0; index < sqlRules.length; index++) {
            let rule = sqlRules[index];
            {
                if (!(header === rule.head))continue;
                let add: boolean = false;
                for(let i: number = 0; i < rule.rhs.length; i++) {{
                    let matches: boolean = true;
                    for(let j: number = 0; j < from.length && i + j < rule.rhs.length; j++) {{
                        if (!(rule.rhs[i + j] === (from[j]))){
                            matches = false;
                            break;
                        }
                    };}
                    if (!matches)continue;
                    for(let j: number = 0; j < from.length && i + j < rule.rhs.length; j++) {rule.rhs[i + j] = to[j];}
                    i += to.length - 1;
                    add = true;
                };}
            }
        }
    }

    static path: string = "/oracle/dbtools/parser/plsql/";

    public static memorizeRules$() {
        SqlRules.memorizeRules$java_lang_String("isqlBNF.serial");
    }

    public static getRules$(): Array<RuleTuple> {
        return SqlRules.getRules$java_lang_String("sqlBNF.serial");
    }

    public static memorizeRules$java_lang_String(fname: string) {
        const rules: Array<RuleTuple> = SqlRules.extractRules();
        const fos: FileOutputStream = new FileOutputStream("src" + SqlRules.path + fname);
        const out: ObjectOutputStream = new ObjectOutputStream(fos);
        out.writeObject(rules);
        out.close();
    }

    public static memorizeRules(fname?: any) {
        if (((typeof fname === 'string') || fname === null)) {
            return <any>SqlRules.memorizeRules$java_lang_String(fname);
        } else if (fname === undefined) {
            return <any>SqlRules.memorizeRules$();
        } else throw new Error('invalid overload');
    }

    public static getRules$java_lang_String(fname: string): Array<RuleTuple> {
        let u: URL = SqlRules.getResource(SqlRules.path + fname);
        if (u == null)u = Service.fileNameGitResource(HarvestDoc, SqlRules.path + fname);
        const is: { str: string, cursor: number } = u.openStream();
        const __in: ObjectInputStream = new ObjectInputStream(is);
        const rules: Array<RuleTuple> = <Array<RuleTuple>><any>__in.readObject();
        __in.close();
        return rules;
    }

    public static getRules(fname?: any): Array<RuleTuple> {
        if (((typeof fname === 'string') || fname === null)) {
            return <any>SqlRules.getRules$java_lang_String(fname);
        } else if (fname === undefined) {
            return <any>SqlRules.getRules$();
        } else throw new Error('invalid overload');
    }

    static toDo: Array<string>; public static toDo_$LI$(): Array<string> { SqlRules.__static_initialize(); if (SqlRules.toDo == null) { SqlRules.toDo = <any>([]); }  return SqlRules.toDo; }

    /*private*/ static addToDo(s: string) {
        if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(s.charAt(0)) != '\''.charCodeAt(0) && !/* contains */(SqlRules.notFound_$LI$().indexOf(<any>(s)) >= 0))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.toDo_$LI$(), s);
    }

    /*private*/ static nextToDo(): string {
        for(let index = 0; index < SqlRules.toDo_$LI$().length; index++) {
            let candidate = SqlRules.toDo_$LI$()[index];
            return candidate
        }
        throw Object.defineProperty(new Error("Empty toDo"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    static notFound: Array<string>; public static notFound_$LI$(): Array<string> { SqlRules.__static_initialize(); if (SqlRules.notFound == null) { SqlRules.notFound = <any>([]); }  return SqlRules.notFound; }

    /*private*/ static recursiveCollectBNF(output: Array<RuleTuple>, masterRuleName: string) {
        if (/* contains */(SqlRules.notFound_$LI$().indexOf(<any>(masterRuleName)) >= 0))return;
        console.info("searching for...  " + masterRuleName);
        if (1 < masterRuleName.length && /* isUpperCase */(s => s.toUpperCase() === s)(masterRuleName.charAt(0)) && /* isUpperCase */(s => s.toUpperCase() === s)(masterRuleName.charAt(1)))console.info();
        if ("hint" === masterRuleName)return;
        if ("grouping_hint" === masterRuleName)return;
        if (masterRuleName.length === 1 && !/* isLetter *//[a-zA-Z]/.test(masterRuleName.charAt(0)[0]))return;
        if (!SqlRules.fetchFromFixes(output, masterRuleName))SqlRules.fetchFromDocWebsite(output, masterRuleName);
    }

    static masterBNFurl: string; public static masterBNFurl_$LI$(): string { SqlRules.__static_initialize(); if (SqlRules.masterBNFurl == null) { SqlRules.masterBNFurl = DocURL.Manual["_$wrappers"][DocURL.Manual.SQL].getBasePrivateURL() + "/img_text"; }  return SqlRules.masterBNFurl; }

    static cachedBNFdir: string; public static cachedBNFdir_$LI$(): string { SqlRules.__static_initialize(); if (SqlRules.cachedBNFdir == null) { SqlRules.cachedBNFdir = "dbtools-libraries/dbtools-arbori/src/test/resources/oracle/dbtools/parser/plsql" + SqlRules.masterBNFurl_$LI$().substring(SqlRules.masterBNFurl_$LI$().indexOf("/oracle/oracle-database") + "/oracle/oracle-database".length); }  return SqlRules.cachedBNFdir; }

    static cacheExists: boolean = null;

    static changed: any; public static changed_$LI$(): any { SqlRules.__static_initialize(); if (SqlRules.changed == null) { SqlRules.changed = <any>({}); }  return SqlRules.changed; }

    /**
     * @param {RuleTuple[]} output
     * @param {string} masterRuleName
     * @throws Exception
     * @private
     */
    /*private*/ static fetchFromDocWebsite(output: Array<RuleTuple>, masterRuleName: string) {
        const masterrulename: string = masterRuleName.toLowerCase();
        if (/* contains */(SqlRules.notFound_$LI$().indexOf(<any>(masterrulename)) >= 0))return;
        if (SqlRules.cacheExists == null){
            const newDirectory: File = new File(SqlRules.cachedBNFdir_$LI$());
            SqlRules.cacheExists = newDirectory.exists();
            if (SqlRules.cacheExists){
                console.info("Directory exists:" + newDirectory.getCanonicalPath());
            } else {
                const created: boolean = newDirectory.mkdirs();
                if (created){
                    console.info("Created directory:" + newDirectory.getCanonicalPath());
                } else {
                    console.info("1. Unable to create directory");
                    System.exit(1);
                }
            }
        }
        let input: string = null;
        let oldInput: string = null;
        if (SqlRules.cacheExists){
            input = SqlRules.readURL$java_lang_String$java_lang_String(masterrulename, "file:" + SqlRules.cachedBNFdir_$LI$());
            if (input == null){
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.notFound_$LI$(), masterrulename);
                return;
            }
        } else {
            input = SqlRules.readURL$java_lang_String$java_lang_String(masterrulename, SqlRules.masterBNFurl_$LI$());
            if (input == null){
                if (/* contains */(SqlRules.notFound_$LI$().indexOf(<any>(masterrulename)) >= 0))return;
                input = SqlRules.readURL$java_lang_String$java_lang_String(masterrulename, SqlRules.masterBNFurl_$LI$());
                if (input == null)System.exit(1);
            }
            if (/* contains */(input.indexOf("<p>(Required) &lt;Enter a short description here.&gt;</p>") != -1)){
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.notFound_$LI$(), masterrulename);
                return;
            }
            if (/* contains */(input.indexOf("| ... |") != -1)){
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.notFound_$LI$(), masterrulename);
                return;
            }
            const file: File = new File(SqlRules.cachedBNFdir_$LI$() + "/" + masterRuleName + "." + SqlRules.htm);
            file.createNewFile();
            console.info("created:" + file.getName());
            const o: FileOutputStream = new FileOutputStream(file);
            o.write(/* getBytes */(input).split('').map(s => s.charCodeAt(0)));
            o.close();
            const oldFile: string = /* replace */SqlRules.cachedBNFdir_$LI$().split("/sqlrf/").join("_old/sqlrf/");
            oldInput = SqlRules.readURL$java_lang_String$java_lang_String(masterrulename, "file:" + oldFile);
            if (oldInput == null)/* put */(SqlRules.changed_$LI$()[masterrulename] = "new production"); else {
                let ipre: number = input.indexOf("<pre");
                let jpre: number = input.indexOf("</pre>");
                const newInput: string = input.substring(ipre, jpre + "</pre>".length);
                const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(newInput, false, +LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.SqlPlusComments_$LI$());
                ipre = oldInput.indexOf("<pre");
                jpre = oldInput.indexOf("</pre>");
                oldInput = oldInput.substring(ipre, jpre + "</pre>".length);
                const oldSrc: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(oldInput, false, +LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.SqlPlusComments_$LI$());
                let i: number = -1;
                for(let index = 0; index < oldSrc.length; index++) {
                    let ot = oldSrc[index];
                    {
                        i++;
                        if (!(ot.content === /* get */src[i].content)){
                            /* put */(SqlRules.changed_$LI$()[masterrulename] = ot.content + "-->" + /* get */src[i].content);
                            break;
                        }
                    }
                }
            }
        }
        input = /* replace */input.split("<span class=\"bold\">").join("<b>");
        input = /* replace */input.split("</span>").join("</b>");
        const ipre: number = input.indexOf("<pre");
        const jpre: number = input.indexOf("</pre>");
        input = input.substring(ipre, jpre + "</pre>".length);
        input = /* replace */input.split("<pre class=\"oac_no_warn\" dir=\"ltr\">").join("<pre>");
        input = /* replace */input.split("<pre class=\"pre codeblock\">").join("<pre>");
        input = /* replace */input.split("<code>").join("");
        input = /* replace */input.split("</code>").join("");
        input = /* replace */input.split("\",\"").join(",");
        input = /* replace */input.split("\".\"").join(".");
        input = /* replace */input.split("\"(\"").join("(");
        input = /* replace */input.split("\")\"").join(")");
        input = /* replace */input.split("\"=\"").join("=");
        input = /* replace */input.split("( tablespace_set )...").join("( tablespace_set [, tablespace_set]... )");
        input = /* replace */input.split("\' { sql_format | ds_iso_format } \'").join("expr");
        input = /* replace */input.split("<b>ONLINE</b> { { [ tablespace_encryption_spec").join("[<b>ONLINE</b>] { { [ tablespace_encryption_spec");
        input = /* replace */input.split("\'nlsparam\'").join("expr");
        if ("function_association" === masterRuleName)input = SqlRules.replaceSymbol(input, "function", "identifier");
        if ("password_parameters" === masterRuleName)input = SqlRules.replaceSymbol(input, "function", "identifier");
        if ("single_column_for_loop" === masterRuleName)input = SqlRules.replaceSymbol(input, "literal", "expr");
        if ("unpivot_in_clause" === masterRuleName)input = SqlRules.replaceSymbol(input, "literal", "expr");
        if ("lead" === masterRuleName)input = SqlRules.replaceSymbol(input, "order_by_clause", "lead_lag_order");
        if ("lag" === masterRuleName)input = SqlRules.replaceSymbol(input, "order_by_clause", "lead_lag_order");
        if ("windowing_clause" === masterRuleName)input = /* replace */input.split("EXCLUDE GROUPS").join("EXCLUDE GROUP");
        if ("create_cluster" === masterRuleName){
            input = /* replace */input.split("CREATE CLUSTER [").join("CREATE CLUSTER [ [");
            input = /* replace */input.split("[ { physical_attributes_clause").join("][ [ { physical_attributes_clause");
            input = /* replace */input.split("[ cluster_range_partitions ]").join("[ cluster_range_partitions ] ]");
        }
        if ("alter_role" === masterRuleName)input = /* replace */input.split(")}\' ]").join(")} ]\'");
        if ("alter_tablespace_encryption" === masterRuleName)input = /* replace */input.split("{ ENCRYPT | DECRYPT }").join("{ ENCRYPT | DECRYPT }}");
        if ("column_clauses" === masterRuleName){
            input = /* replace */input.split("{ modify_LOB_storage_clause ... | rename_LOB_storage_clause }").join("{ modify_LOB_storage_clause | rename_LOB_storage_clause }...");
            input = /* replace */input.split("modify_collection_retrieval ...").join("{modify_collection_retrieval}...");
            input = /* replace */input.split("alter_varray_col_properties ...").join("{alter_varray_col_properties}...");
        }
        if ("add_external_partition_attrs" === masterRuleName)input = /* replace */input.split("]pre").join("]");
        {
            const pos: number = input.indexOf("\";\"");
            if (0 < pos && pos < input.length - 5)input = input.substring(0, pos);
        };
        if (("move_keys" === masterRuleName) || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(masterRuleName, "create_") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(masterRuleName, "alter_") || /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(masterRuleName, "drop_")){
            const pos: number = input.indexOf(';');
            if (0 < pos)input = input.substring(0, pos);
        }
        if ("alter_materialized_zonemap" === masterRuleName){
            input = /* replace */input.split("{").join("[");
            input = /* replace */input.split("}").join("]");
        }
        if ("assertions_constraint_state" === masterRuleName){
            input = /* replace */input.split("{").join("[");
            input = /* replace */input.split("}").join("]");
        }
        while((true)) {{
            const iQuote: number = input.indexOf("\'");
            if (iQuote < 0)break;
            const literal: string = input.substring(iQuote, input.indexOf("\'", iQuote + 1) + 1);
            input = /* replace */input.split(literal).join("string_literal");
        }};
        let src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, +LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.SqlPlusComments_$LI$());
        SqlRules.correctDots(src);
        input = SqlRules.correctKeywords(input, src);
        src = Lexer.parse$java_lang_String$boolean$int(input, false, +LexerToken.JavaSqlMultilineComments_$LI$() + LexerToken.SqlPlusComments_$LI$());
        SqlRules.correctDots(src);
        console.info(masterRuleName + "...");
        const matrix: Matrix = new Matrix(SqlRules.earley_$LI$());
        matrix.visual = new VisualImpl(src, SqlRules.earley_$LI$());
        SqlRules.earley_$LI$().parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const root: ParseNode = SqlRules.earley_$LI$().forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["bnf"], src, SqlRules.earley_$LI$(), matrix);
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
            console.info("\n\n input =\n" + input);
            throw Object.defineProperty(new Error("failed to parse >>>" + masterRuleName + "<<< to bnf"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
        }
        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(output, SqlRules.bnf(root, src, masterRuleName));
    }

    static htm: string = "html";

    public static readURL$java_lang_String$java_lang_String(masterRuleName: string, sqlBNFfiles: string): string {
        try {
            if ("password_parameters" === masterRuleName)console.info();
            return SqlRules.readURL$java_lang_String(sqlBNFfiles + "/" + masterRuleName + "." + SqlRules.htm);
        } catch(e) {
            if (/* contains */((<any>e.constructor).getPackage().getName().indexOf("java.net") != -1)){
                console.error("Failed to connect to " + e.message);
                return null;
            } else if (!/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(masterRuleName, "s"))try {
                const ret: string = SqlRules.readURL$java_lang_String(sqlBNFfiles + "/" + masterRuleName + "s." + SqlRules.htm);
                console.error("--------->>>" + masterRuleName + "s." + SqlRules.htm);
                return ret;
            } catch(ee) {
                if (/* contains */((<any>e.constructor).getPackage().getName().indexOf("java.net") != -1)){
                    console.error("Failed to connect to " + e.message);
                    return null;
                }
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.notFound_$LI$(), masterRuleName);
                return null;
            }
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.notFound_$LI$(), masterRuleName);
            return null;
        }
    }

    public static readURL(masterRuleName?: any, sqlBNFfiles?: any): string {
        if (((typeof masterRuleName === 'string') || masterRuleName === null) && ((typeof sqlBNFfiles === 'string') || sqlBNFfiles === null)) {
            return <any>SqlRules.readURL$java_lang_String$java_lang_String(masterRuleName, sqlBNFfiles);
        } else if (((typeof masterRuleName === 'string') || masterRuleName === null) && sqlBNFfiles === undefined) {
            return <any>SqlRules.readURL$java_lang_String(masterRuleName);
        } else throw new Error('invalid overload');
    }

    /*private*/ static contains(ret: Array<RuleTuple>, masterRuleName: string): boolean {
        for(let index = 0; index < ret.length; index++) {
            let rule = ret[index];
            if (rule.head === masterRuleName)return true;
        }
        return false;
    }

    /**
     * Doc grammar contains lots of errors; process [parsed] SqlFixes.railroad first
     * @param {LexerToken[]} src
     * @param {string} input
     * @return
     * @throws Exception
     * @return {ParseNode}
     * @private
     */
    /*private*/ static parseFixesFile(src: Array<LexerToken>, input: string): ParseNode {
        SqlRules.correctDots(src);
        const matrix: Matrix = new Matrix(SqlRules.earley_$LI$());
        SqlRules.earley_$LI$().parse$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        const s: SyntaxError = SyntaxError.checkSyntax$java_lang_String$java_lang_String_A$java_util_List$oracle_dbtools_parser_Earley$oracle_dbtools_parser_Matrix(input, ["bnflist"], src, SqlRules.earley_$LI$(), matrix);
        if (s != null){
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
            throw Object.defineProperty(new Error(">>>> Parse error in SqlFixes.railroad <<<<"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
        }
        const root: ParseNode = SqlRules.earley_$LI$().forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        return root;
    }

    static fixes: Array<RuleTuple> = null;

    static fixesHeaders: Array<string>; public static fixesHeaders_$LI$(): Array<string> { SqlRules.__static_initialize(); if (SqlRules.fixesHeaders == null) { SqlRules.fixesHeaders = <any>([]); }  return SqlRules.fixesHeaders; }

    /*private*/ static fetchFromFixes(output: Array<RuleTuple>, masterRuleName: string): boolean {
        if ("password_parameters" === masterRuleName)console.info();
        if (SqlRules.fixes == null){
            let input: string = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/SqlFixes.bnf");
            SqlRules.fixes = Grammar.extractRules$java_lang_String(input);
            SqlRules.capital2keywords(SqlRules.fixes);
            input = Service.readFile$java_lang_String(Resource.testFolder + "oracle/dbtools/parser/plsql/SqlFixes.railroad");
            input = /* replace */input.split("<span class=\"bold\">").join("<b>");
            input = /* replace */input.split("</span>").join("</b>");
            const fixesScan: Array<LexerToken> = Lexer.parse$java_lang_String(input);
            const fixesParseTree: ParseNode = SqlRules.parseFixesFile(fixesScan, input);
            SqlRules.bnflist(fixesParseTree, fixesScan, SqlRules.fixes);
            for(let index = 0; index < SqlRules.fixes.length; index++) {
                let rt = SqlRules.fixes[index];
                {
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(SqlRules.fixesHeaders_$LI$(), rt.head);
                }
            }
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(output, SqlRules.fixes);
        }
        return /* contains */(SqlRules.fixesHeaders_$LI$().indexOf(<any>(masterRuleName)) >= 0);
    }

    static capital2keywords(output: Array<RuleTuple>) {
        for(let index = 0; index < output.length; index++) {
            let t = output[index];
            for(let i: number = 0; i < t.rhs.length; i++) {{
                const symbol: string = t.rhs[i];
                if (/* isUpperCase */(s => s.toUpperCase() === s)(symbol.charAt(0)) && /* isUpperCase */(s => s.toUpperCase() === s)(symbol.charAt(symbol.length - 1)))t.rhs[i] = "\'" + symbol + "\'";
            };}
        }
    }

    /*private*/ static correctDots(src: Array<LexerToken>) {
        let i: number = -1;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                i++;
                if (("." === t.content) && (i === 0 || !("." === /* get */src[i - 1].content)) && (i === /* size */(<number>src.length) - 1 || !("." === /* get */src[i + 1].content))){
                    t.content = "\'.\'";
                    t.type = Token.IDENTIFIER;
                }
            }
        }
    }

    /*private*/ static correctKeywords(input: string, src: Array<LexerToken>): string {
        const s: Substitutions = new Substitutions(input);
        let prior: LexerToken = null;
        let prior2: LexerToken = null;
        let prior3: LexerToken = null;
        let isB: boolean = false;
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            {
                if (t.type === Token.IDENTIFIER && !isB && (prior == null || !("<" === prior.content)) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(Service.addDoubleQuote(t.content).charAt(0)) != '\"'.charCodeAt(0)){
                    s.replace$int$int$java_lang_String(t.begin, t.begin, " <b> ");
                    s.replace$int$int$java_lang_String(t.end, t.end, " </b> ");
                }
                if ((">" === t.content) && prior != null && ("b" === prior.content) && prior2 != null && ("<" === prior2.content))isB = true; else if ((">" === t.content) && prior != null && ("b" === prior.content) && prior2 != null && ("/" === prior2.content) && prior3 != null && ("<" === prior3.content))isB = false;
                prior3 = prior2;
                prior2 = prior;
                prior = t;
            }
        }
        return s.transformInput();
    }

    /*private*/ static bnflist(root: ParseNode, src: Array<LexerToken>, grammar: Array<RuleTuple>) {
        if (root.contains$int(SqlRules.__bnf_$LI$()))/* addAll */((l1, l2) => l1.push.apply(l1, l2))(grammar, SqlRules.bnf(root, src, null)); else {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                SqlRules.bnflist(child, src, grammar)
            }
        }
    }

    static bnfRoot: ParseNode = null;

    /*private*/ static bnf(root: ParseNode, src: Array<LexerToken>, header: string): Array<RuleTuple> {
        SqlRules.bnfRoot = root;
        const grammar: Array<RuleTuple> = <any>([]);
        let cntOpenAnglePar: number = 0;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                if (header == null && child.contains$java_lang_String("\'<\'")){
                    cntOpenAnglePar++;
                } else if (header == null && child.contains$int(SqlRules.identifier_$LI$())){
                    if ("REBALANCE" === /* get */src[child.from].content)console.info();
                    header = child.content$java_util_List(src);
                } else if (child.contains$int(SqlRules.__rawbnf_$LI$())){
                    /* addAll */((l1, l2) => l1.push.apply(l1, l2))(grammar, SqlRules.rawbnf(child, src, header, 1 < cntOpenAnglePar));
                }
            }
        }
        RuleTransforms.eliminateEmptyProductions(grammar);
        RuleTransforms.substituteSingleUnaryProductions(grammar);
        RuleTransforms.substituteSingleBinaryProductions(grammar);
        return grammar;
    }

    /*private*/ static rawbnf(root: ParseNode, src: Array<LexerToken>, header: string, isBold: boolean): Array<RuleTuple> {
        if ("alter_table" === header)console.info();
        if (root.contains$int(SqlRules.__concat_$LI$()))return SqlRules.concat(root, src, header, isBold); else {
            const ret: Array<RuleTuple> = <any>([]);
            {
                let array = root.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        if (child.contains$int(SqlRules.identifier_$LI$()) && child.from + 1 === child.to){
                            if ("REBALANCE" === /* get */src[child.from].content)console.info();
                            const id: string = SqlRules.processId(child, src, isBold);
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, [id]));
                            SqlRules.addToDo(id);
                        } else if (child.contains$int(SqlRules.__rawbnf_$LI$()) || child.contains$int(SqlRules.__concat_$LI$()))/* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, SqlRules.rawbnf(child, src, header, isBold));
                    }
                }
            }
            return ret;
        }
    }

    /**
     * Descend and process rule concatenation operator
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} header
     * @param {boolean} isBold
     * @return
     * @return {RuleTuple[]}
     * @private
     */
    /*private*/ static concat(root: ParseNode, src: Array<LexerToken>, header: string, isBold: boolean): Array<RuleTuple> {
        if (root.contains$int(SqlRules.__block_$LI$()))return SqlRules.block(root, src, header, isBold); else {
            const payload: Array<string> = <any>([]);
            const ret: Array<RuleTuple> = <any>([]);
            {
                let array = root.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    if (child.contains$int(SqlRules.identifier_$LI$()) && child.from + 1 === child.to){
                        if ("REBALANCE" === /* get */src[child.from].content)console.info();
                        const id: string = SqlRules.processId(child, src, isBold);
                        /* add */(payload.push(id)>0);
                        SqlRules.addToDo(id);
                    } else if (child.contains$int(SqlRules.__concat_$LI$())){
                        const intervalPos: number = header.indexOf('[');
                        const childInterval: string = "[" + (child.from - SqlRules.bnfRoot.from) + "," + (child.to - SqlRules.bnfRoot.from) + ")";
                        const childHdr: string = (0 < intervalPos ? header.substring(0, intervalPos) : header) + childInterval;
                        const childRules: Array<RuleTuple> = SqlRules.concat(child, src, childHdr, isBold);
                        const major: Array<RuleTuple> = <any>([]);
                        for(let index1 = 0; index1 < childRules.length; index1++) {
                            let candidate = childRules[index1];
                            if (candidate.head === childHdr){
                                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(major, candidate);
                            }
                        }
                        if (/* size */(<number>major.length) === 1){
                            let singleton: RuleTuple = null;
                            for(let index1 = 0; index1 < major.length; index1++) {
                                let r = major[index1];
                                singleton = r
                            }
                            /* remove */(a => { let index = a.indexOf(singleton); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(childRules);
                            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, childRules);
                            for(let index1 = 0; index1 < singleton.rhs.length; index1++) {
                                let rhs = singleton.rhs[index1];
                                /* add */(payload.push(rhs)>0)
                            }
                        } else {
                            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, childRules);
                            /* add */(payload.push(childHdr)>0);
                        }
                    } else if (child.contains$int(SqlRules.__block_$LI$())){
                        const intervalPos: number = header.indexOf('[');
                        const childInterval: string = "[" + (child.from - SqlRules.bnfRoot.from) + "," + (child.to - SqlRules.bnfRoot.from) + ")";
                        const childHdr: string = (0 < intervalPos ? header.substring(0, intervalPos) : header) + childInterval;
                        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, SqlRules.block(child, src, childHdr, isBold));
                        /* add */(payload.push(childHdr)>0);
                    }
                }
            }
            const ct: RuleTuple = new RuleTuple(header, payload);
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, ct);
            return ret;
        }
    }

    /*private*/ static block(root: ParseNode, src: Array<LexerToken>, header: string, isBold: boolean): Array<RuleTuple> {
        if (root.contains$int(SqlRules.__boldrawbnf_$LI$()))return SqlRules.boldrawbnf(root, src, header); else if (root.contains$int(SqlRules.identifier_$LI$())){
            if ("REBALANCE" === /* get */src[root.from].content)console.info();
            const id: string = SqlRules.processId(root, src, isBold);
            SqlRules.addToDo(id);
            const ct: RuleTuple = new RuleTuple(header, [id]);
            const ret: Array<RuleTuple> = <any>([]);
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, ct);
            return ret;
        } else {
            const ret: Array<RuleTuple> = <any>([]);
            {
                let array = root.children();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        const empty: RuleTuple = new RuleTuple(header, []);
                        if (child.contains$int(SqlRules.sqBr_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, empty); else if (child.contains$int(SqlRules.__rawbnf_$LI$()))/* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, SqlRules.rawbnf(child, src, header, isBold)); else if (child.contains$int(SqlRules.dot_$LI$())){
                            let headPound: string = header + "#";
                            const pos: number = header.lastIndexOf('\"');
                            if (0 < pos)headPound = header.substring(0, pos) + "#" + header.substring(pos);
                            for(let index1 = 0; index1 < ret.length; index1++) {
                                let t = ret[index1];
                                if ((t.head === header) && 0 < t.rhs.length)t.head = headPound;
                            }
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, [headPound]));
                            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, [header, headPound]));
                            break;
                        }
                    }
                }
            }
            return ret;
        }
    }

    /*private*/ static processId(root: ParseNode, src: Array<LexerToken>, isBold: boolean): string {
        let id: string = root.content$java_util_List(src);
        let isPunctuation: boolean = false;
        if (id.length === 1){
            for(let index = 0; index < SqlRules.identifiers_$LI$().length; index++) {
                let bnfId = SqlRules.identifiers_$LI$()[index];
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(id.charAt(0)) == (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(bnfId))isPunctuation = true;
            }
        }
        if ("lt" === id)id = "\'<\'"; else if ("gt" === id)id = "\'>\'"; else if ("lbr" === id)id = "\'[\'"; else if ("rbr" === id)id = "\']\'"; else if ("lcp" === id)id = "\'{\'"; else if ("rcp" === id)id = "\'}\'"; else if ("dbar" === id)id = "\'||\'"; else if ("sbar" === id)id = "\'|\'"; else if ("\"/\"" === id)id = "\'" + id.toUpperCase() + "\'"; else if (id.length === 1 && !/* isLetterOrDigit *//[a-zA-Z\d]/.test(id.charAt(0)[0]))id = "\'" + id.toUpperCase() + "\'"; else if (/* isUpperCase */(s => s.toUpperCase() === s)(id.charAt(0)) && (/* isUpperCase */(s => s.toUpperCase() === s)(id.charAt(id.length - 1)) || /* isDigit *//\d/.test(id.charAt(id.length - 1)[0])) && isBold || isPunctuation)id = "\'" + id.toUpperCase() + "\'";
        return id;
    }

    /**
     * Descend to parse node which is keyword
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} header
     * @return
     * @return {RuleTuple[]}
     * @private
     */
    /*private*/ static boldrawbnf(root: ParseNode, src: Array<LexerToken>, header: string): Array<RuleTuple> {
        const ret: Array<RuleTuple> = <any>([]);
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                if (child.contains$int(SqlRules.__rawbnf_$LI$()))/* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, SqlRules.rawbnf(child, src, header, true)); else if (child.contains$int(SqlRules.lt_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\'<\'"])); else if (child.contains$int(SqlRules.gt_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\'>\'"])); else if (child.contains$int(SqlRules.lbr_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\'[\'"])); else if (child.contains$int(SqlRules.rbr_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\']\'"])); else if (child.contains$int(SqlRules.lcp_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\'{\'"])); else if (child.contains$int(SqlRules.rcp_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\'}\'"])); else if (child.contains$int(SqlRules.dbar_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\'|\'", "\'|\'"])); else if (child.contains$int(SqlRules.sbar_$LI$()))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, new RuleTuple(header, ["\'|\'"]));
            }
        }
        if (/* size */(<number>ret.length) === 0)throw Object.defineProperty(new Error("unexpected ret for " + header), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] }); else return ret;
    }

    static readURL$java_lang_String(masterBNFurl: string): string {
        if (/* contains */(masterBNFurl.indexOf("password_parameters") != -1))console.info();
        const buffer: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(4096);
        const out: ByteArrayOutputStream = new ByteArrayOutputStream();
        const url: URL = <URL>new URL(masterBNFurl);
        const is: { str: string, cursor: number } = new BufferedInputStream(url.openStream());
        while((is.available() > 0)) {{
            const len: number = /* read */(r => r.str.charCodeAt(r.cursor++))(is);
            out.write(buffer, 0, len);
        }};
        let ret: string = out.toString("UTF-8");
        let ind: number = ret.indexOf("<p>Note:");
        if (ind > 0)ret = ret.substring(0, ind);
        ind = ret.indexOf("Note:");
        if (ind > 0)ret = ret.substring(0, ind);
        ind = ret.indexOf("</pre>");
        if (ind < 0)ind = ret.indexOf("</PRE>");
        if (ind < 0)ret = ret + "</pre>";
        return ret;
    }

    public static main(args: string[]) {
        const test: boolean = true;
        if (test)SqlRules.testParseSqlBnf(); else {
            const page: string = SqlRules.readURL$java_lang_String(SqlRules.masterBNFurl_$LI$() + "Calculated-Measure-Expressions.htm");
            const str: string = "<p class=\"subhead2\"><span class=\"italic\">";
            for(let pos: number = page.indexOf(str); 0 < pos; pos = page.indexOf(str, pos + str.length)) {{
                let end: number = page.indexOf("</span>::=</p>", pos + str.length);
                const end1: number = page.indexOf("</span> ::=</p>", pos + str.length);
                if (0 < end1 && end1 < end){
                    end = end1;
                }
                if (end < 0)break;
                if (pos + 100 < end)continue;
                const rule: string = page.substring(pos + str.length, end);
                const hrefPos: number = page.indexOf("<a href=\"", end);
                const hrefEnd: number = page.indexOf("\">", hrefPos);
                const guid: string = page.substring(hrefPos + "<a href=\"".length, hrefEnd);
                let ruleBNF: string = SqlRules.readURL$java_lang_String(SqlRules.masterBNFurl_$LI$() + guid);
                const ruleTag: string = "<pre class=\"oac_no_warn\" dir=\"ltr\">";
                const from: number = ruleBNF.indexOf(ruleTag);
                const to: number = ruleBNF.indexOf("</pre>", from);
                ruleBNF = ruleBNF.substring(from + ruleTag.length, to);
                ruleBNF = /* replace */ruleBNF.split("<span class=\"bold\">").join("<b>");
                ruleBNF = /* replace */ruleBNF.split("</span>").join("</b>");
                console.info("<pre " + rule + ">");
                console.info(ruleBNF);
                console.info("</pre>");
                console.info();
                console.info();
            };}
        }
    }
}
SqlRules["__class"] = "oracle.dbtools.parser.plsql.SqlRules";


export namespace SqlRules {

    export class SqlRules$0 extends Earley {
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




SqlRules.__static_initialize();

import { SyntaxError } from './SyntaxError';


import { DocURL } from './doc/DocURL';


import { PlsqlRules } from './PlsqlRules';


SqlRules.main(null);
