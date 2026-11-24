/***
 * Set of formatting rules  
 * https://vadimtropashko.wordpress.com/2017/01/03/custom-formatting-in-sqldev-4-2/
 * https://www.salvis.com/blog/2020/11/12/formatter-callback-functions/
***/
include "std.arbori"

/**
 * simpleIndentConditions  
 * Parse nodes to be indented with simple conditions, typically parse node payload, e.g.
   [node) select_term                               --<-- all parse nodes with "select_term" payload
   [node) expr  &  [node^) simple_case_expression   --<-- parse nodes with "expr" payload, whose parent (i.e. node^) is labeled "simple_case_expression"
   [node) condition  & [node-1) 'WHEN'              --<-- parse nodes with "condition" payload, whose sibling predecessor (i.e. node-1) is keyword WHEN             --
**/
simpleIndentConditions:  
  [node) ',' & [node+1) cell_assignment
| [node) ',' & [node^) object_properties
| [node) 'ALL' & [node+1) 'ON'
| [node) 'FOR' & [node^) explain_plan
| [node) 'INTO' & [node^) call_statement
| [node) 'PARTITION' & [node^) on_comp_partitioned_table___1# 
| [node) 'UPDATE' & [node-1) 'THEN' & ! [node-1-1) 'MATCHED'
| [node) adt_field_list & [node-1) '('
| [node) aggregate_function  & [node^) pivot_clause
| [node) alias_in_out_constraints & ([node^) create_view1___4  | [node^) create_view1___5)
     | :breaksBeforeComma & [node) create_view1___5 & [node-1) alias_in_out_constraints
| [node) alter_method_spec 
| [node) and_expr &  [node) pls_expr & ![node) rel 
| (.breaksProcArgs | [node) function_call) & [node) arg & [node^) paren_expr_list & [node+1) arg_list
| (.breaksProcArgs | [node-1) function_call ) & [node) arg_list & [node^) paren_expr_list & [node-1) arg
| (.breaksProcArgs | [node+1) function_call ) & [node) ',' & [node^) arg_list & [node+1) arg
| [node) assoc_arg & [node^) paren_expr_list & [node+1) arg_list
| [node) arg_list & [node^) paren_expr_list & [node-1) assoc_arg
| [node) ',' & [node^) arg_list & [node+1) assoc_arg
| [node) annotations_clause & [node^) column_definition
| [node) annotated_column_properties_clause
| [node) array_ty_def
| [node) attribute_clause 
--| [node) autoextend_clause               -- salvisberg (#26)
| [node) permanent_tablespace_clause___0 -- salvisberg (#26)
| [node) extent_management_clause           -- salvisberg (#26)
| [node) undo_tablespace_clause___0      -- salvisberg (#26)
| [node) tablespace_retention_clause        -- salvisberg (#26)
| [node) temporary_tablespace_clause___2 -- salvisberg (#26)
| [node) tablespace_group_clause            -- salvisberg (#26)
--| [node) 'AUTOEXTEND'                     -- extra brk
| [node) file_specification & ![node-1) 'DATAFILE' & ![node-1) 'TEMPFILE' -- salvisberg (#26)
| [node) basic_decl_item   -- individual declarations glued together 
                           -- same effect as: [node) basic_decl_item_list & [node^) decl_list
                           -- with additional line breaks
| [node) binding_clause
| [node) bitmap_join_index_clause
| [node) blockchain_drop_table_clause
| [node) blockchain_row_retention_clause
| [node) blockchain_hash_clause
| [node) blockchain_row_version_user_chain_clause
| [node) blockchain_data_format_clause
--| [node) build_clause
| [node) bulk_executable_stmt
| [node) call_specification
| :breaksAfterSelectFromWhere & [node) cartesian_product  &  [node^) from_clause 
| [node) case_expr & ![node^) pls_expr     -- e.g. IF CASE a WHEN 3 THEN 4 ELSE a END > 7 THEN ...
                                           --         ^^^^^^^^^ case_expr ^^^^^^^^^^^
                                           --         ^^^^^^^^^^^^^^ pls_expr ^^^^^^^^^^^        TODO: indent this pls_expr
| [node) case_expr_alt
| [node) case_expression & ![node) select_term & ![node^) "aliased_expr" & ![node^) comparison_condition
                           -- Causes awkward alignment:
                           -- select    
                           --         CASE
                           --            WHEN e.salary > 10000 THEN e.salary
                           --            ELSE 2000
                           --         END 
                           --     salary,
                           --     ...
| [node) case_stmt_alt
| [node) cast___2
--| [node) cast___3
| [node^) cast___4 & [node) string_literal
| [node) cell_reference_options 
| [node) cluster_range_partitions 
| [node^) comment & [node) string_literal
| [node) comparison_condition & [node^) bitmap_join_index_clause
| :indentConditions &  [node) condition  &  [node-1) 'WHEN'
| [node) column   & [node+1) insert_into_clause___1
--| [node) compound_condition  &  [node-1) '(' & ![node^^) on_using_condition
--| :breaksBeforeLogicalConjunction & :breaksAfterLogicalConjunction &  [node) condition  & ( [node-1) AND_OR | [node+1) AND_OR ) 
-- ^^^^^^^ nests conditions; indent keywords instead
| :breaksBeforeLogicalConjunction & :breaksAfterLogicalConjunction &  ( [node) 'AND' | [node) 'OR' ) /* more general than [node) AND_OR */ & ( [node-1) condition | [node+1) condition )
--excessive nesting for compound conditions: | :breaksAfterSelectFromWhere &  [node) condition  &  [node^)  compound_condition & ![node) compound_condition & [node^ = [node
| :breaksAfterSelectFromWhere  & [node) condition  &  [node^) having_clause & ![node) compound_condition
| [node) condition  &  [node^) hierarchical_query_clause & ![node) compound_condition
| :breaksAfterSelectFromWhere   & [node) condition  &  [node^) where_clause 
| [node) conditional_insert_clause
| [node) conditional_insert_clause___2#
| [node) constraint_clause
| [node) constraint_clauses & [node+10 < node) 
| [node) constraint_clause___0 & [node+10 < node) 
| [node) constraint_state & [node+1 < node) & ![node) constraint_state#
| [node) create_cluster___1#
| [node) create_controlfile___0#
| [node) create_database___0# 
| [node) create_index & ![node^) sql_statement
| [node) create_materialized_view3___7 & ![node^) create_materialized_view3___7
| [node) create_pdb_from_seed 
| [node) cycle_clause
| [node) database_logging_clauses
| [node) database_logging_clauses___1 
--| [node) datafile_tempfile_spec -- salvisberg (#26)
| [node) dblink_authentication 
| [node) "db_link_auth" 
| [node) default_tablespace
| [node) dependent_handling_clause 
| [node) dimension_join_clause 
| [node) dml_event_clause
--| [node) else_clause
| [node) element_pattern
| [node) else_clause_opt & ![node^) if_stmt
| [node) ELSE_expr_opt
| [node) enable_pluggable_database 
| [node) error_logging_clause
| [node) et_field_spk
| [node) excptn_handler
| [node) export_keys___0
| .breaksProcArgs &  [node) "expr_list" & [node^) "(x,y,z)" & ![node) compound_expression & ![node) identifier
--| [node) expression_list  & ![node) grouping_expression_list 
| [node) external_name_ops
| [node) external_parm_list_entry
| [node) external_table_data_props 
| [node) fields_def
| [node) field_list & [node-1) '('
| [node) file_name_convert
--| [node) file_specification    -- salvisberg (#26)
| :breaksAfterSelectFromWhere &  [node) group_by_list
| [node) hier_ref  
| [node) hierarchy_clause 
| [node) hierarchy_clause___0#
| [node) identifier & [node+1) colmapped_query_name___1 
| [node) identifier  & [node^) colmapped_query_name___1 
       | [node) ','  & [node^) colmapped_query_name___1 
| [node) identifier & [node^) create_materialized_view2___0 
| [node) identifier & [node^) create_materialized_view2___0# 
--| [node) identity_clause
| [node) index_properties & [node^) table_index_clause
| [node) index_subpartition_clause___0# 
| [node) inline_constraint & ![node) inline_constraint___0
| [node) inline_ref_constraint
| [node) insert & ![node^) sql_statement & ![node^) stmt                         -- insert without trailing semicolon
| [node) insert_into_clause & ![node^) single_table_insert & ![node^) multi_table_insert___0#
| [node) insert_into_clause___1 & [node-1) column
| [node) java_call_specification
| [node) join_clause & [node-1) '('
| [node) JSON_column_definition
| [node) JSON_columns_clause 
| [node) JSON_value_column 
| [node) json_name_value_pair
| [node) json_object
| [node) json_table 
| [node) key_management_clauses 
| [node) keystore_management_clauses 
| [node) level_clause 
| [node) list_partitions___0#
| [node) list_subpartition_desc
| [node) listagg & ![node^) select_term
| [node) LOB_storage_clause
| [node) LOB_storage_parameters#
| [node) local_partitioned_index
| [node) logfile_clause
| [node) model_column_clauses 
| [node) model_rules_clause
| [node) model_rules_clause___1
| [node) merge_into_new_keystore___1
-- no indent, brk only: | [node) merge_insert_clause
| [node) merge_insert_clause___2
| [node) column & [node+1) merge_insert_clause___1
-- no indent, brk only: | [node) merge_update_clause
| [node) mining_attribute_clause & [node+2 < node) 
| [node) modify_col_properties
| [node) modify_col_visibility
| [node) "mv_log_details"
| [node) name & [node^) name_list & ![node+1) '.'
| [node) nested_table_col_properties  & ![node)column_properties#  --  nested_table_col_properties->column_properties#->column_properties 
| [node) column_properties  & [node^) nested_table_col_properties___2 
| [node) new_values_clause 
| [node) object_privilege & [node+1) 'ON'
| [node) object_properties & ![node^) object_properties
| [node) object_view_clause
| [node) order_by_clause & 
             ([node^) aggregate_function | [node^) analytic_function | [node^) analytic_clause | [node^^) analytic_clause) --<-- not to ident order by in the main query block 
| :breaksAfterSelectFromWhere & [node) "ord_by_1desc" & [node^) order_by_clause 
| :breaksAfterSelectFromWhere & [node) order_by_clause___0 & [node^) order_by_clause
| [node) original_method_body_specification
| [node) out_of_line_constraint___0 & [node+10 < node) 
| [node) parallel_clause 
| [node) par_expr_list
| [node) password_parameters
| [node) pdb_storage_clause
| [node) pivot_for_clause 
| [node) pivot_in_clause
| :indentConditions & [node) pls_expr &  [node-1) 'IF'
| :indentConditions & [node) pls_expr &  [node-1) 'ELSIF'
| :indentConditions & [node) pls_expr &  [node-1) 'WHEN'
| :indentActions    & [node) pls_expr &  [node-1) 'THEN'
| [node) privilege_audit_clause 
| [node) proc_fun_arg_spec
| [node) parm_list_opt &  [node^) fml_part  
| [node) prm_spec &       [node^) fml_part  
--| [node) query_partition_clause --& [node^) analytic_clause
| [node) range_values_clause 
| [node) record_format 
| [node) record_format2
| [node) relational_properties
| [node) ref_cls
| [node) references_clause 
| [node) references_clause___2
| [node) referencing_clause
| :breaksBeforeLogicalConjunction & :breaksAfterLogicalConjunction & [node) rel  & ( [node-1) AND_OR | [node+1) AND_OR ) 
| [node) resource_parameters 
| [node) role_audit_clause
| [node) rowOpt
| [node) row_pattern_definition 
| [node) row_pattern_measure_column 
| [node) row_pattern_measures 
| [node) row_pattern_order_by 
| [node) row_pattern_partition_by 
| [node) row_pattern_rows_per_match 
| [node) row_pattern_skip_to
| [node) search_clause
| [node) security_clauses
| :breaksAfterSelectFromWhere & [node) select_list & [node^) select_clause 
--| [node) simple_case_expression 4,27) & [node^) simple_case_expression
| [node) single_column_for_loop
| [node) source_file_name_convert 
| [node) split_table_partition___3 
| [node) split_table_partition___5 
| [node) standard_actions 
| [node) stmt & [node-1) 'BEGIN'
| [node) stmt & [node-1) 'LOOP'
| [node) stmt & [node^) seq_of_stmts
| [node) stmt & [node^) stmt_list_opt & ![node^) stmt
| :indentActions & [node) stmt &  [node-1) 'THEN'
| :indentActions & [node) stmt &  [node-1) 'ELSE'
| [node) storage_clause 
| [node) subpartition_by_hash
| [node) subpartition_template
| [node) subpartition_template___2
| [node) subprg_body & ![node^) create_plsql & ![node^) original_method_body_specification  --&  ! [node^) create    ++683(684?)
| [node) subprg_property
| [node) subprogram_spec 
| :breakOnSubqueries &  [node) subquery &  [node-1) '(' &  [node+1) ')'
| [node) subquery  & [node-1) 'AS'                -- sql_statement+create_view
| [node) query_block  & [node-1) 'AS'                -- create_materialized_zonemap
| [node) query_block  & [node^) merge___2                
| [node) subquery  & [node-1) insert_into_clause
| [node) system_privilege & [node-1) ',' 
| [node) system_privilege & [node+1) grant_system_privileges___0#
| [node) system_trigger
| [node) table_index_clause 
| [node) table_partitioning_clauses
| [node) table_properties  & ![node) column_properties          --?or relational_table  extra ident for ++1222  
                                                                -- &! [node) nested_table_col_properties
| [node) table_stmt -- for compound trigger
| [node) tablespace_clauses 
| [node) tablespace_datafile_clauses 
| [node) tempfile_reuse_clause
| [node) trigger_body & ![node) block_stmt
| [node) type_constructor_expression &  ! [node^) create
| [node) type_name &  [node^) conversion_function
| :breaksAfterSelectFromWhere & [node) update_set_clause_expr & [node^^) update_set_clause
| [node) update_set_clause_expr & ![node^^) update_set_clause
| [node) update_all_indexes_clause
| [node) user_aux
| [node) using_clause_opt
| [node) using_index_clause  & ![node^) constraint_state & ![node) constraint_state
| [node) values_clause & ([node^) conditional_insert_clause___2# | [node^) conditional_insert_clause)
| [node) virtual_column_definition & [node-1) 'ADD'
| [node) when_condition
| [node) where_clause_w_boolean
| [node) windowing_clause /*can be up 2 levels: & [node^) analytic_clause*/
| [node) aux_xml_value_expr           & [node^) XML_attributes_clause
| [node) XML_attributes_clause___3 & [node^) XML_attributes_clause
| [node) xmlelement___1     & [node^) XML_function
| [node) ','                   & [node^) XML_function
| [node) XML_attributes_clause & [node^) XML_function
| [node) xmlelement___2 & [node^) XML_function
| [node) XMLTABLE_options
| [node) XML_passing_clause
| [node) XML_table_column
| :breaksAfterComma & .breaks4JSON & [node) regular_entry

| [node) Statement
| [node) FunctionDeclaration

| [node) field

| [node) flexible_domain_when_expr
| [node) flexible_domain_when_condition
| [node) flexible_domain_choose_clause

| [node) gqlField
| [node) directive 

| [node) implementation_clause

| [node) create_indextype___1#
| [node) using_type_clause

| [node) entry
| [node) duality_subquery
;

/**
 * More elaborate condition on parse nodes to be indented.
 * It specifies a constraint upon the node itself together with condition upon some ancestor.
 * For example, 
   [node) column  &  [ancestor) insert_into_clause  --<-- parse nodes with "column" payload, whose ancestor is labeled "insert_into_clause"  
**/ 
closestAncestorDescendent:
ancestor < node & ![node^) "(x,y,z)" & [node) column  & (
   [ancestor) attribute_clause                  & ![node^) compound_expression
 | [ancestor) dimension_join_clause             & ![node^) compound_expression
 | [ancestor) extended_attribute_clause         & ![node^) compound_expression
 | [ancestor) table_index_clause                & ![node^) compound_expression
 | [ancestor) range_partitions 
 | [ancestor) range_values_clause 
);


indentedNodes1: simpleIndentConditions | closestAncestorDescendent
->
;

/**
 * This is the same set of nodes as indentedNodes1
 * This duplicate relation is warranted for second callback 
**/ 
indentedNodes2: indentedNodes1
->
;


/**
 * The skipWhiteSpaceBeforeNode and skipWhiteSpaceBeforeNode are
 * generalizations of the former "notPaddedParenthesis" rule.
 * The _skipWSBeforeNode is a simple condition upon the node.
 * The _skipWSBeforeAncNode is a condition involving the node's ancestor.
 */
_skipWSBeforeNode:
    [node) '[' & ![node+1) subquery
  | [node) ']'
  | [node) '{' & ![node-1) 'JSON'
  | [node) '}'
  | [node) '^'
  | !:spaceAroundOperators & [node) '-'
  | !:spaceAroundOperators & [node) '|'
  | [node-1) '|'          & [node) '|'
  | !:spaceAroundOperators & [node) '*'
  | !:spaceAroundOperators & [node) '+'
  | [node-1) '('  & [node) '+'  & [node+1) ')'
  | [node) '.'
  | !:spaceAroundOperators & [node) '<'
  | !:spaceAroundOperators & [node) '>'
  | !:spaceAroundOperators & [node) '='
  | [node) ','
  | [node) ';'
  | !:spaceAroundOperators & [node) ':'
  | [node) '%'
  | [node) '@'
  | !:spaceAroundOperators & [node) '/'
  --| [node) '#'
  | !:spaceAroundOperators    & [node) '~'
  | :noSpaceBeforeOpenParen   & [node) '('
  | :noSpaceBeforeCloseParen  & [node) ')'
  | :spaceParenDefault        & [node) '('  &  [node^)  array_ty_def
  | :spaceParenDefault        & [node) ')'  &  [node^)  array_ty_def
  | :spaceParenDefault        & [node) '('  &  [node^)  function_call
  | :spaceParenDefault        & [node) ')'  &  [node^)  function_call
  | [node) ext_tbl_string_literal___0
;

_skipWSBeforeAncNode: 
 :spaceParenDefault &
 ancestor < node & 
 (   [ancestor) constraint  & [ancestor) paren_expr_list 
   | [ancestor) constraint & [ancestor^) constrained_type
   | [ancestor) paren_expr_list & [ancestor^) function_call
   | [ancestor) function_expression
   | [ancestor) model_iterate_clause
   | [ancestor) datetime_literal
   | [ancestor) rollup_cube_clause
   | [ancestor) datatype 
 ) & ( [node) '(' | [node) ')' )
;

skipWhiteSpaceBeforeNode:
  _skipWSBeforeNode | _skipWSBeforeAncNode
->
;

_skipWSAfterNode:
    [node) '['  
  | [node) ']'
  | [node) '{'
  | [node) '}'
  | [node) '^'
  | !:spaceAroundOperators & [node) '-'
  | [node) '-'  & [node) unary_add_op
  | !:spaceAroundOperators & [node) '|'
  | [node+1) '|'           & [node) '|'
  | [node) '!'  & [node+1) '='
  | !:spaceAroundOperators & [node) '*'
  | !:spaceAroundOperators & [node) '+'
  | [node-1) '('  & [node) '+'  & [node+1) ')'
  | [node) '.'
  | !:spaceAroundOperators & [node) '<'
  | [node) '<' & [node+1) '='
  | [node) '<' & [node+1) '>'
  | [node) '>' & [node+1) '>'
  | [node) '<' & [node+1) '<'
  | !:spaceAroundOperators & [node) '>'
  | [node) '>' & [node+1) '='
  | !:spaceAroundOperators & [node) '='
  | [node) '=' & [node+1) '>'
  | !:spaceAfterCommas     & [node) ','
  | [node) ';'
  | !:spaceAroundOperators & [node) ':'
  | [node) ':' & [node+1) '='
  | [node) ':' & [node^) bind_var
  | [node) '%'
  | [node) '@'
  | !:spaceAroundOperators & [node) '/'
  --| [node) '#'
  | !:spaceAroundOperators & [node) '~'
  | :noSpaceAfterOpenParen   & [node) '('
  | :noSpaceAfterCloseParen  & [node) ')'
  | :spaceParenDefault       & [node) '('  &  [node^)  array_ty_def
  | :spaceParenDefault       & [node) '('  &  [node^)  function_call
  | [node) ext_tbl_string_literal___0
  | [node) integer & [node^) size_clause
;

_skipWSAfterAncNode: 
 :spaceParenDefault &
 ancestor < node & 
 (   [ancestor) constraint  & [ancestor) paren_expr_list 
   | [ancestor) constraint & [ancestor^) constrained_type
   | [ancestor) paren_expr_list & [ancestor^) function_call
   | [ancestor) function_expression
   | [ancestor) model_iterate_clause
   | [ancestor) datetime_literal
   | [ancestor) rollup_cube_clause
   | [ancestor) datatype 
 ) &  [node) '('  
;

skipWhiteSpaceAfterNode:
  _skipWSAfterNode | _skipWSAfterAncNode
->
;



"analytics":
    [identifier) identifier 
  & [call) analytic_function
  & [call = [identifier
;
"directives":
    [identifier) identifier 
  & [identifier^) directive
;
"ids": --node) <= [node + 1
   [identifier) identifier 
;
identifiers: ("ids" - "analytics") - "directives"
-> 
;

quotedSchedulerAndAQsObjectNameLiterals:
    [node) string_literal &
    [attr) identifier &
    node-3 = attr &
    (
     ?attr = 'queue_table' |
     ?attr = 'queue_name' |
     ?attr = 'queue_payload_type' |
     ?attr = 'program_name' |
     ?attr = 'schedule_name' |
     ?attr = 'job_name' |
     ?attr = 'chain_name' |
     ?attr = 'job_class_name' |
     ?attr = 'group_name' |
     ?attr = 'rule_name' |
     ?attr = 'step_name' |
     ?attr = 'member' |
     ?attr = 'name'
    )
;

quotedSchedulerEnabledObjectNameLiterals:
    [node) string_literal &
    [call) dotted_expr &
    node^-1 = call &
    [pkg) identifier &
    [fct) identifier &
    pkg+2 = fct &
    ?pkg = 'dbms_scheduler' &
    ?fct = 'enable' &
    pkg^^ < node 
;

quotedObjectNameLiterals:
    quotedSchedulerAndAQsObjectNameLiterals |
    quotedSchedulerEnabledObjectNameLiterals
->
;

/**
 * Formal condition when to insert extra line breaks.
 * This condition is for those line breaks which are not part of indentation 
 * Not to be confused with condition when to insert double breaks (AKA "brkX2").
 * The extra break is inserted _before_ the "node"
**/
_extraBrkBefore: 
  [node) physical_properties 
| [node) sql_statement & ![node^) identifier  -- if there is a parent of sql_statement with any payload (identifiers are always leaf nodes) 
| [node) from_clause 
| [node) from_using_clause 
| [node) where_clause 
| [node) into_list
| [node) group_by_clause 
| [node) having_clause 
| [node) order_by_clause 
| [node) 'OVER'
| [node) BULK_COLLECT_opt           -- salvisberg: (#82)
| [node) cross_outer_apply_clause   -- salvisberg: (#82)
| [node) row_limiting_clause
| [node) model_clause 
| [node) searched_case_expression#
| [node) segment_attributes_clause & ![node^) segment_attributes_clause
| :breaksBeforeComma &  [node+1) alias_in_out_constraints           & [node) ','
| :breaksBeforeComma &  [node+1) select_term           & [node) ','
| :breaksBeforeComma &  [node+1) table_reference       & [node) ','
| :breaksBeforeComma &  [node^) order_by_clause___0 & [node) ','
| :breaksBeforeComma &  [node^) group_by_list___0    & [node) ','
| :breaksBeforeComma &  [node+1) expr                  & [node) ','
| :breaksBeforeComma &  [node+1) column                & [node) ',' 
                                                       & ![node^) aggregate_function & ![node^) analytic_function
                                                       & ![node^^) model_expression
                                                       & ![node^) result_expr___0
| :breaksBeforeComma &  [node+1) col_properties        & [node) ','
--| [node) column & [node+1) insert_into_clause___1
--| [node) column_properties & ! [node^) column_properties --?++5 & ! [node^) relational_table
| :breaksBeforeComma &  [node^) colmapped_query_name___1        & [node) ','
| :breaksBeforeComma &  [node+1) field                 & [node) ','
| :breaksBeforeComma &  [node+1) prm_spec              & [node) ','
| :breaksBeforeComma &  [node+1) XML_attributes_clause        & [node) ','
| :breaksBeforeComma &  [node+1) flexible_domain_expr_result_expr & [node) ','
| :breaksBeforeConcat &  [node+1) '|'                  & [node) '|'               
                      &  ( [node^^^) compound_expression | [node^^^) arith_add_expr | [(node^^)+10 < (node^^)) | [(node^-1)+3 < (node^-1)) ) 
                      --^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
                      -- break long concatenation lists like this:
                      --     dbms_output.put_line(emp_first_name
                      --                            || ' '
                      --                            || emp_last_name);
                      -- while keeping short ones inline:
                      --     dbms_output.put_line('hello' || 'world');
                      & ![node^^+1) ')'
| :breaksBeforeLogicalConjunction &  [node+1) condition  & ( [node) 'AND' | [node) 'OR' ) /* more general than [node) AND_OR */  
| :breaksBeforeLogicalConjunction &  [node+1) rel        & ( [node) 'AND' | [node) 'OR' ) /* more general than [node) AND_OR */
| :breaksBeforeLogicalConjunction &  [node+1) rel        & [node) 'AND' 
| :breaksBeforeLogicalConjunction &  [node+1) arith_add_expr & [node) 'AND' 
| [node) "inner_cross_join_clause"
| [node) "outer_join_clause"
| :breakAnsiiJoin &  [node) on_using_condition
| [node) merge_insert_clause  
| [node) merge_update_clause
| [node) 'BEGIN'  & [node^) subprg_body 
| [node) 'NESTED' & [node^) column_properties
| [node) 'MEASURES' --& [node^) model_column_clauses
| [node) '(' & [node+1) cell_assignment --& [node^) model_rules_clause
| [node) update_set_clause
| [node) 'ELSIF'
| [node) 'ELSE'
| [node) 'USING' & [node^^) merge
| [node) 'INSERT' & [node^) merge_insert_clause 
| [node) 'VALUES' & [node^) merge_insert_clause 
| [node) 'SET'    & [node^) merge_update_clause 
| [node) 'END'    & [node^) case_expression
| [node) case_stmt_alt
| [node) simple_case_expression___0#
| :breakAfterConditions & [node) 'THEN'
| :indentActions &  [node) expr  &  [node-1) 'ELSE'
| :indentActions &  [node) expr  &  [node-1) 'THEN'
| :indentConditions &  [node) expr  &  [node-1) 'WHEN'
| [node) 'AUTOEXTEND'                       -- salvisberg (#26)
| [node) flexible_domain_from_clause                       
;

_extraBrkAfter: 
   [node) sql_statement & [node^) sql_statements
|  [node) basic_decl_item
| [node) 'IS' & [node-1) cursor_d
|  [node) stmt & ![node^) sqlplus_command 
| :breaksAfterComma &  [node+1) alias_in_out_constraints           & [node) ','
| :breaksAfterComma &  [node+1) select_term           & [node) ','
| :breaksAfterComma &  [node+1) table_reference       & [node) ','
| :breaksAfterComma &  [node^) order_by_clause___0 & [node) ','
| :breaksAfterComma &  [node^) group_by_list___0    & [node) ','
| :breaksAfterComma &  ([node+1) expr  | [node+1) column)               & [node) ',' 
                             & ![node^) aggregate_function & ![node^) analytic_function
                             & ![node^^) model_expression
                             & ![node^) result_expr___0
                             -- & ... -- unable to keep (x,y) inline without referring to ancestor    
| :breaksAfterComma &  [node+1) col_properties        & [node) ','
| :breaksAfterComma &  [node^) colmapped_query_name___1        & [node) ','
| :breaksAfterComma &  [node+1) field                 & [node) ','
| :breaksAfterComma &  [node+1) prm_spec              & [node) ','
| :breaksAfterComma &  [node+1) XML_attributes_clause        & [node) ','
| :breaksAfterComma &  [node+1) 'PARTITION'           & [node) ','
| :breaksAfterComma &  [node+1) flexible_domain_expr_result_expr & [node) ','
| :breaksAfterConcat &  [node-1) '|'                  & [node) '|'
                      &  ( [node^^^) compound_expression | [node^^^) arith_add_expr | [(node^^)+10 < (node^^)) )  -- don't break short expressions like this 'hello'||'world'
| :breaksAfterLogicalConjunction &  [node+1) condition  & ( [node) 'AND' | [node) 'OR' ) /* more general than [node) AND_OR */  
| :breaksAfterLogicalConjunction &  [node+1) rel        & ( [node) 'AND' | [node) 'OR' ) /* more general than [node) AND_OR */
| [node) subquery 
| [node) SET_OPER
| [node) ')' & [node+1) '(' & [node^) range_partitions
| [node) nested_table_col_properties
| [node) with_clause
| [node) pivot_clause 
--| [node) level_clause 
--| [node) hierarchy_clause___0#
| :breaksAfterComma & .breaks4XML /*& .logTuple*/ & [node+1) aux_xml_value_expr           & [node) ','
| [node) create_mv_refresh 
| [node) create_mv_refresh___0# 
| [node) create_materialized_view3___1#
;


/**
 * Auxiliary conditions to indent procedure arguments 
 *
 * Rigorous definition:
 * args:  procedureCall < arg 
 *        & ([arg) expr & [arg^) "expr_list"  | [arg) arg & [arg^) arg_list   )
 *        & ([procedureCall) function_call | [procedureCall) function | [procedureCall) procedure_call)
 * ; -- eval time = 7880       (cardinality=9819)
 * commasInProc: [node) ',' 
 *             & (node+1 = args.arg | node-1 = args.arg) 
 * ; -- eval time = 22800       (cardinality=9655)
 * dumbed down/optimized to just commas within procedure scope:
**/
commasInProc: [node) ',' 
       & procedureCall < node 
       & (   [procedureCall) function_call 
           | [procedureCall) function &  (!.breaks4XML | ![procedureCall) XML_function  /*implication .breaks4XML -> ![procedureCall) XML_function */ )
           | [procedureCall) procedure_call 
           | [procedureCall) in_condition  
           )
; -- ??? eval time = 5305       (cardinality=9655)
  -- eval time = 261       (cardinality=24040)

extraBrkBefore: 
  ( _extraBrkBefore - commasInProc)
| :breaksBeforeComma & .breaksProcArgs & commasInProc 
->;

extraBrkAfter: 
  ( _extraBrkAfter - commasInProc)
| :breaksAfterComma & .breaksProcArgs & commasInProc 
->;


breakLongProcArgLists: commasInProc 
-> 


functionInFunction: ([node) function | [node) procedure_call | [node) function_call ) 
       & [node+3 < node)
       & procedureCall < node 
       & ([procedureCall) function | [procedureCall) procedure_call | [procedureCall) function_call) 
       & [procedureCall+3 < procedureCall)
;


complexFunctions: [commasInProc.node < commasInProc.node)
               & commasInProc.procedureCall = functionInFunction.procedureCall
;


breakComplexProcArgLists: complexFunctions 
-> 

breakLongConcatenationLists: 
        !:breaksBeforeConcat & !:breaksAfterConcat
     &  [scope) and_expr 
     & [node) binary_add_op
     & scope < node
->

/**
 * Formal condition when to insert additional line breaks.
 * This is useful to separate sql_statements, or long pl/sql declarations, e.g.
 * 
 *  select 1 from dual;
 *  --<-- additional line break here 
 *  select 2 from dual;
 * 
 * The extra break is inserted _after_ the "node"
 *
 * You can either fine tune the rules below, or
 * just set Options->Advanced Format->Break->After statement to Single Break
 * to disable double line breaks altogether.
**/
brkX2_1: 
  [node) sql_statement
| [node) full_cursor_body
| [node) stmt & ![node^) loop_stmt & ([node^) seq_of_stmts | [node^) stmt_list_opt) & [node+18 < node)  
| [node) ',' & [node+1) method_specification 
| [node) original_method_body_specification
| [node) subprg_body & ![node^) create_plsql
| [node) basic_decl_item_list & [node+1) subprg_body
| [node) is_or_as & [node+1) decl_list & [(node+1)+20 < (node+1)) -- long declarations
;
brkX2_2: child^=node & (
   [node) stmt & [child) sql_query_or_dml_stmt  
 | [node) stmt & [child) open_cursor_reference_statement
 | [node) basic_decl_item & [child) subprg_spec
) ;
brkX2: 
  brkX2_1 | brkX2_2
->
;

rightAlignments: :alignRight & (
    [node) 'SELECT' &  [node^) select_clause
  | [node) 'INTO'  
  | [node) 'FROM'   &  [node^) from_clause
  | [node) 'USING'   &  [node^) from_using_clause
  --| [node) 'JOIN'   &  [node^) "inner_cross_join_clause" handled by "inner_cross_join_clause" alignment
  --| [node) 'RIGHT'         &  [node^)  "outer_join_clause"
  | [node) 'WHERE'  &  [node^) where_clause 
  | [node) 'OR'     &  [node^) condition
  | [node) 'AND'    &  [node^) condition
  | [node) 'GROUP'  &  [node^) group_by_clause
  | [node) 'HAVING' &  [node^) having_clause 
  | [node) 'ORDER'  &  [node^) order_by_clause
  | [node) 'UPDATE'  
  | [node) 'SET'   &  ![node^) merge_update_clause 
  | [node) 'FETCH' &  [node^) row_limiting_clause
  | [node) "inner_cross_join_clause"
  | [node) outer_join_type
) ->  
;



/**
 * All alignments (paddings)
 * This is binary relation: we want all grammar symbols matched by their scope.
 * For example, in  
   [id) identifier & [id+1) datatype & [scope) relational_properties 
 * we are interested in all parse tree nodes named "id" with "identifier" grammar payload.
 * Then, the node following the "id" (i.e. id+1) has to be labeled with "datatype" grammar symbol.
 * Finally, we require the node named "scope" to be labeled with "relational_properties".
 * The condition "scope < id" requires the node named "scope" to be ancestor and the "id" to be descendant.
 * When parse tree nodes are represented as nested intervals, this condition informally stipulates that ancestor's 
 * (i.e. "scope") Date Of Birth precedes that of descendant ("id").
**/
_paddedIdsInScope1: (
-- types
  :alignTypeDecl & [id) identifier & [id+1) datatype & [scope) relational_properties
| :alignTypeDecl & ( :breaksAfterComma | :breaksBeforeComma ) & [id) decl_id & ([id+1) prm_spec_unconstrained_type | [id+1) mode /*30067569:*/| [id+1) 'OUT' | [id+1) 'IN' ) & [scope) fml_part 
| :alignTypeDecl & ( :breaksAfterComma | :breaksBeforeComma ) & [id) decl_id & ([id+1) constrained_type | [id+1) object_d_rhs) & [scope) adt_definition
| :alignTypeDecl & ( :breaksAfterComma | :breaksBeforeComma ) & [id) decl_id & ([id+1) constrained_type | [id+1) object_d_rhs) & [scope) decl_list
| :alignTypeDecl & ( :breaksAfterComma | :breaksBeforeComma ) & [id) decl_id & ([id+1) constrained_type | [id+1) object_d_rhs) & [scope) rec_ty_def
| :alignTypeDecl & ( :breaksAfterComma | :breaksBeforeComma ) & [id) mode & [id+1) unconstrained_type  & [scope) subprg_spec
-- =>
| :alignNamedArgs & [id) sim_expr & [id+1) '=' & [id+2) '>' & [scope) paren_expr_list
-- :=
| :alignAssignments & [id) name & [id+1) ':' & [id+2) '=' & [scope) seq_of_stmts
-- =
| :alignEquality & :breaksAfterLogicalConjunction & [id) column & [id+1) '=' & [id+2) expr & [scope) on_using_condition
| :alignEquality & :breaksAfterLogicalConjunction & [id) expr & [id+1) '=' & [id+2) expr & [scope) where_clause
| [id) comparison_condition  & [id+1) 'THEN' & [id+2) expr & [scope) case_expression
| [id) expr                  & [id+1) 'THEN' & [id+2) expr & [scope) case_expression
| [id) pls_expr              & [id+1) 'THEN' & [id+2) expr & [scope) case_expression
| :alignTabColAliases  & [id) expr & [id^) select_term & [id+1) as_alias & [scope) select_clause
| :alignTabColAliases  & [id) query_table_expression & [id+1) identifier & [scope) from_clause
          & ![id^+1) "inner_cross_join_clause"
--| :alignTabColAliases  & [id) table_reference & .logTuple & [id+1) on_using_condition & [scope) "inner_cross_join_clause"
--
--| [id) constrained_type & [id+1) default_expr_opt & [scope) decl_list
) & scope < id & predecessor = id & follower = id+1
;

_paddedIdsInScope2: (
 :alignEquality & !:breaksAfterLogicalConjunction & 
      [predecessor) AND_OR & [follower) '=' & [follower+1) expr & predecessor = follower^-1 & [scope) where_clause
) & scope < follower
;

paddedIdsInScope: _paddedIdsInScope1 | _paddedIdsInScope2
->
;

/**
 * incrementalAlignments to shift the entire subquery
 * (formerly was done via laborious specifications of pairwise alignments 
 * of from_clause to select_clause, etc.) e.g.
WITH apms_xml AS ( SELECT
                       amps_armo_id,
           -- adjusted ^
                       amps_polarity_xml
           -- adjusted ^                       
                   FROM
       -- adjusted ^
                       ( SELECT
           -- adjusted ^
... 

incrementalAlignments:  [node) subquery
                     |  [node) json_object
disabled -> see test 56
;*/

/**
 * Align node to predecessor (if there is a break before the node)
 */ 
pairwiseAlignments0: predecessor = node^ & (  
    [predecessor) case_expression      & [node)   'END'
  | [predecessor) else_clause          & [node)   expr
  | [predecessor) over_clause          & [node)   ')'
  | [predecessor) function             & [node)   over_clause
  | [predecessor) function             & [node)   'OVER'
);
pairwiseAlignments00: predecessor = node^^ & (  
    [predecessor) function             & [node)   'OVER'
);
pairwiseAlignments01: predecessor = node^-1 & (  
      [predecessor) flexible_domain_expr_result_expr             
    & [node)        flexible_domain_expr_result_expr
);
pairwiseAlignments001: predecessor = node^^-1 & (  
      [predecessor) flexible_domain_expr_result_expr             
    & [node)        flexible_domain_expr_result_expr
);
pairwiseAlignments1: predecessor = node-1 & (  
    [predecessor) group_by_list___0             & [node) ','
  | [predecessor) order_by_clause___0           & [node) ','
  | [predecessor) select_list                   & [node) ',' 
  | [predecessor) cartesian_product             & [node) ',' 
  | [predecessor) merge_insert_clause___1       & [node) ',' 
  | [predecessor) column                        & [node) merge_insert_clause___1 
  | [predecessor) "expr_list"                   & [node) ','           -- leading commas
  | [predecessor) merge_update_clause___0#      & [node) ',' 
  | !:alignRight & [predecessor) condition      & ( [node) 'AND' | [node) 'OR' ) /* more general than [node) AND_OR */ 
  | [predecessor) expr                   & [node) compound_expression___0
  | [predecessor) '>'                    & [node) expr  & [node^) arg 
  | [predecessor) arith_add_expr             & [node)   binary_add_op
  | [predecessor) 'CASE'                 & [node)   searched_case_expression#
  | [predecessor) searched_case_expression      & [node)   else_clause
  | [predecessor) query_partition_clause        & [node)   order_by_clause
);
pairwiseAlignments2: predecessor=node-1-1  & (
    [predecessor) select_list    & [node) select_term & [node-1) ',' 
  | [predecessor) cartesian_product      & [node) table_reference   & [node-1) ',' 
  | [predecessor) condition      & [node) condition   & [node-1) AND_OR 
  | [predecessor) adt_field_list & [node) adt_field   & [node-1) ',' 
  | [predecessor) adt_field      & [node) adt_field   & [node-1) ',' 
  | [predecessor) "expr_list"    & [node) expr        & [node-1) ',' 
  | [predecessor) expr           & [node) expr        & [node-1) ',' 
  | [predecessor) expr           & [node) expr        & [node-1) compound_expression___0 
  | [predecessor) expr           & [node) flexible_domain_expr_result_expr        & [node-1) ',' 
  | !:breakOnSubqueries  & [predecessor) '('    & [node) ')'  & [node-1) query_block & ![node^) par_subquery
);
pairwiseAlignments30: predecessor=node-1-1-1  & (
    [predecessor) 'OVER'           & [node) ')' 
);
pairwiseAlignments3: 
  [predecessor) group_by_list
& [predecessor-1) 'BY' 
& (
      [node) ',' 
   |  [node) group_by_col  
)
&  
     predecessor < node
; 
pairwiseAlignments4: 
   [ob_clause) order_by_clause
&  predecessor^ = ob_clause
&  ob_clause < node
& [predecessor-1) 'BY' 
& [predecessor) "ord_by_1desc"
& (
      [node) ',' 
   |  [node) "ord_by_1desc" 
);
pairwiseAlignments5: 
  [predecessor) prm_spec
& [node) prm_spec
& predecessor=ancestor-1
& ancestor < node
;
pairwiseAlignments6: 
  [predecessor) update_set_clause_expr
& [node) update_set_clause_expr
& predecessor=ancestor-1
& ancestor < node
;
-- https://community.oracle.com/thread/4119671
-- WHEN NOT MATCHED THEN INSERT (
--     crew_seqno,
--     inoutdte,
--     cardtype,
pairwiseAlignments7: 
  [predecessor) column
& ![predecessor-1) '='
& [node) column
& [node-1) ','
& predecessor=ancestor-1 
& ancestor < node
;
-- https://community.oracle.com/thread/4202758
/*SET some_long_column_name = source_column3,
target_column4 = source_column4,  <--align
target_column4 = source_column4,
    target_column5 = source_column5;*/
pairwiseAlignments7_3: 
  [predecessor) column
& ![predecessor-1) '='
& [node) column
& [node-1) ','
& predecessor=ancestor-3 
& ancestor < node
;
-- https://community.oracle.com/thread/4119671
--e.g. WHEN MATCHED THEN UPDATE SET tgt.inoutdte = src.inoutdte,
--                                  tgt.cardtype = src.cardtype,
--                                  tgt.tfirstnm = src.tfirstnm;
pairwiseAlignments8: 
  [predecessor) column
& [node) column
& predecessor=node^^-3 
;

pairwiseAlignments9: -- https://community.oracle.com/thread/4210584
  [predecessor) arg
& [node) ',' & [node+1) arg
& predecessor=ancestor-1
& ancestor < node
;

pairwiseAlignments9_1: -- https://community.oracle.com/message/15540233#15540233
  [predecessor) column
& [node) ',' & [node+1) column
& predecessor=ancestor-3
& ancestor < node
;

/*
pairwiseAlignments10: 
  [predecessor) function_call
& [node) ')'
& predecessor=node^^
;*/

pairwiseAlignments11: 
  [arg_list) arg_list
& [node) arg 
& arg_list < node
& predecessor = arg_list-1
;

pairwiseAlignments12: 
  [predecessor) query_partition_clause___0
& [node) ',' 
& predecessor < node
;

 
pairwiseAlignments: 
    pairwiseAlignments0
  | pairwiseAlignments00 
  | pairwiseAlignments01 
  | pairwiseAlignments001 
  | pairwiseAlignments1 
  | pairwiseAlignments2 
  | pairwiseAlignments30 
  | pairwiseAlignments3 
  | pairwiseAlignments4 
  | pairwiseAlignments5 
  | pairwiseAlignments6 
  | pairwiseAlignments7 
  | pairwiseAlignments7_3 
  | pairwiseAlignments8 
  | pairwiseAlignments9 
  | pairwiseAlignments9_1 
  --| pairwiseAlignments10 
  | pairwiseAlignments11 
  | pairwiseAlignments12
->
;


less2Spaces:   :breaksBeforeComma & (
    [node+1) arg & [node) ',' 
  | [node+1) prm_spec & [node) ',' 
  | [node+1) select_term & [node) ',' 
  | [node+1) group_by_col & [node) ','               
  | [node+1) "ord_by_1desc" & [node) ','             
  | [node+1) table_reference & [node) ',' 
  | [node-1) "expr_list" & [node) ','           -- in insert clause
  | [node^) query_partition_clause___1 & [node) ','
  | [node+1) alias_in_out_constraints & [node) ','  
  | [node+1) column & [node+2) '=' & [node) ','  
) -> 

extraIndent:
   [node) searched_case_expression# 
 | [node) else_clause 
 | [node) expr & [node^) searched_case_expression#
 | [node) expr & [node^) else_clause
 | [node) expr & [node^) simple_case_expression___0#
 | [node) simple_comparison_condition & [node+1) 'AND' 
 | [node) simple_case_expression___0# 
-> 

extra5Spaces: /* 5 = "JOIN ".length */
   [node) table_reference & [node+1) "inner_cross_join_clause" 
-> 


/**
 * Extra condition to satisfy requirement of no breaks before parenthesis 
 * https://community.oracle.com/thread/4075004
 */
ignoreLineBreaksBeforeNode:
   !:breaksBeforeComma &    [node) ','
|  [node) ';'
->
;
ignoreLineBreaksAfterNode:
   !:breaksAfterComma &    [node) ','
|                          [node) 'PARTITION' &    [node+1) identifier
->
;

dontFormatNode: [node) numeric_literal
             |  [node) sqlplus_command
             |  [node) path
             |  [node) EXP_pri_opt
             |  [node) javascript
             |  [node) identifier & [node) JSON_value_column
             |  [node) identifier & [node^) JSON_value_column

      /*       |  [node) jModifier
             |  [node) 'IF' & [node^) ifStatement
             |  [node) 'ELSE' & [node+1) jsStatement
             |  [node) 'DO' & [node^) iterationStatement
             |  [node) 'WHILE' & [node^) iterationStatement
             |  [node) 'FOR' & [node^) iterationStatement
             |  [node) 'VAR'
             |  [node) continueStatement
             |  [node) breakStatement
             |  [node) returnStatement
             |  [node) 'WITH' & [node^) withStatement
             |  [node) 'SWITCH' & [node^) switchStatement
             |  [node) 'CASE' & [node^) caseClause
             |  [node) 'DEFAULT' & [node^) defaultClause
             |  [node) throwStatement
             |  [node) 'TRY' & [node^) tryStatement
             |  [node) 'CATCH' & [node^) catchProduction
             |  [node) 'FINALLY' & [node^) finallyProduction
             |  [node) 'DEBUGGER'
             |  [node) 'FUNCTION' & [node^) functionDeclaration
             |  [node) jLiteral
             |  [node) 'NEW' & [node^) "singleExpression"
             
             |  [node) identifier & [node^) variableDeclaration
             |  [node) identifier & [node^) continueStatement
             |  [node) identifier & [node^) breakStatement
             |  [node) identifier & [node^) labelledStatement
             |  [node) identifier & [node^) catchProduction
             |  [node) identifier & [node^) functionDeclaration
             |  [node) identifier & [node^) formalParameterList
             |  [node) identifier & [node^) getter
             |  [node) identifier & [node^) setter
             |  [node) propertyName
             |  [node) identifier & [node^) propertyAssignment  -- inlined propertySetParameterList
             |  [node) identifier & [node^) "singleExpression"*/
->
;


timestamp: runOnce & false -> {
    var date = new java.util.Date();    
    var formatted = "/* Formatted by SqlDev on ";
    var index = target.input.indexOf(formatted);
    if( index != 0 )
        struct.putNewline(0, formatted+date+" */\n");  
    else {
        var timestampEnd = target.input.indexOf(" */");
        target.input = formatted+date+target.input.substring(timestampEnd);
    }   
}
