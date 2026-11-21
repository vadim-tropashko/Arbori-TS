
------------------------ join graph ---------------------------

"query_blocks_at_offset": [query_block) query_block &
[query_block <= :offset & :offset <= query_block)
; 

"narrowest qb" : /\query_block("query_blocks_at_offset");

-- SELECT *
--   FROM 
--       ORAPERF.S_PARTY T1, <-- full table ref
--       S_EVT_ACT T18,      <-- full table ref
--       T20                 <-- "simple table ref"
"simple table ref": 
[query_block) query_block &
query_block <= alias &
[alias) table_reference &
[alias) identifier 
;
"full table ref": 
[query_block) query_block &
query_block <= alias &
[alias-1) query_table_expression &
[alias) identifier 
;


"table aliases in blocks" : "full table ref" | "simple table ref"
; 

--"[alias queryblock]": ?alias='false' & ?query_block='false';

"table_alias in narrowest qb" : /\query_block("table aliases in blocks" /*| "[alias queryblock]"*/ ) 
                                & "narrowest qb"
  -- new syntax;                              
;
--old syntax: "table_alias in narrowest qb";

"column_expr" :
[binary_condition) simple_comparison_condition &
cexpr^ = binary_condition & -- redundant
[cexpr^) simple_comparison_condition &
[cexpr) expr &
cexpr <= talias &
[talias) identifier &
[talias+1) '.' &
(cname^ = cexpr | cname^^ = cexpr) &
--([cname^) expr | [cname^^) expr)& 
[cname) identifier &
--! [cname+1) '.' &
"narrowest qb".query_block <= cexpr 
;

ce1 : "column_expr";
ce2 : "column_expr";

"join_condition" :
ce1.binary_condition = ce2.binary_condition &
ce1.cexpr) <= [ce2.cexpr 
--!ce1.talias = ce2.talias

;


----------------------select list----------------------

CTEs: [cte) colmapped_query_name  & [cte) identifier
|     [cte^) colmapped_query_name & [cte) identifier
 
;

"all tables": [table) query_table_expression 
             & table) < [table+4

;

"* in qb" : [select_list) '*' 
   &  [select_list^) select_clause
   & [query_block) query_block
   & query_block <= select_list
;

"*": /\query_block("* in qb")

;

----------------------mismatched gby------------------- 

"all aggregates": ( [aggr) aggregate_function 
                --| [aggr) count - included into aggregate_function
                  | [aggr) listagg)
;
aggr_nullifier:  "all aggregates" | [] -- artificial positive dependencies 
;

"gby clause":   [group_by_list) group_by_list
              & [group_by_list^) group_by_clause
;
-- if empty then skip

"subquery in select term": 
  [scalar_subquery_expression) scalar_subquery_expression
  & ([column) select_term | [column) column)
  & column = scalar_subquery_expression^
;

select_terms: [column) select_term
     & [query_block) query_block 
     & query_block < column
;


"columns&select_list&top_select_list":
     [top_select_list) select_list 
   & [top_select_list^) select_clause   
   & [column) select_term
   & top_select_list <= column
   & [select_list) select_list 
   & column^ = select_list
;

plsvars:
     [column) select_term
     & ([block) block_stmt | [block) subprg_body)  
     & [did) decl_id
     & [id) identifier
     & ([did^) basic_d | [did^) prm_spec)
     & ?did = ?id
     & column << id
     & block << column
     & block << did
;

"columns - subqueries - plsvars":
"columns&select_list&top_select_list"
-
"subquery in select term"
-
plsvars
;

--problematic although formally legit: there are no unary predicates!
--"[column top_select_list]" : column)<[column  & top_select_list)<[top_select_list;
--
--"[column top_select_list]": ?column='false' & ?top_select_list='false';
--have direct syntax now:
--"[column top_select_list]": [column top_select_list];

"columns&top_select_list": "columns - subqueries - plsvars" | [column top_select_list];

/* doesn't work anymore TODO: fix, or better yet introduce empty predicate syntax
"columns&top_select_list": -- do projection here with vacuous predicate
    "columns&select_list&top_select_list".top_select_list <= "columns&select_list&top_select_list".column 
;
*/

"select columns": /\top_select_list("columns&top_select_list");


"aggr subquery in select term": 
  "subquery in select term".column <= "all aggregates".aggr
;

over_clauses:
  [OVER) 'OVER' 
;

"window functions":
  "all aggregates".aggr < over_clauses.OVER
;

"aggregates":
("all aggregates"
-
"aggr subquery in select term")
-
"window functions"
;

"aggr&top_select_list" : 
   "select columns".top_select_list <= "aggregates".aggr 
;

"aggregate expr": /\top_select_list("aggr&top_select_list") & aggr_nullifier

;


"matching gby": 
   "select columns".top_select_list^^ = "gby clause".group_by_list^^

;


--"select columns";

"matching from": --  insertion point in case of missing gby
   [insertion_point) from_clause
   & "select columns".top_select_list^^ = insertion_point^
;
"matching where": -- alternative insertion point in case of missing gby
   [insertion_point) where_clause
   & "select columns".top_select_list^^ = insertion_point^
;
"insertion point": --/./  -- "//" is aggr (not to confuse with C-style comment) 
[)[*)
insertion_point("matching from"|"matching where") & aggr_nullifier

;


"aggregate columns":
   "select columns".column <= "aggregates".aggr
;

columns:
   ("select columns"   
   -   
   "aggregate columns") & aggr_nullifier
 
;


"gby columns":
   [column) expr --group_by_col doesn't work for grouping sets
   & "matching gby".group_by_list <= column

;

----------------------------------

selectWithoutInto: [block) block_stmt
                 & [select) select_list
                 & [select^) select_clause
                 & ![select+1) into_list
                 & block < select
; 


----------------------------------
"sql statement":
    [sql_stmt) select

;


