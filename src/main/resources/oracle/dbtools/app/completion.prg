"query_blocks_at_offset": ( [query_block) query_block /*| [query_block) subquery*/ ) &
[query_block <= :offset & :offset <= query_block)
-> {
    //print(tuple);
}

"other_insert_or_update": ([stmt) insert  | [stmt) update) &
( stmt) < :offset  |  :offset < [stmt  )
-> {
    //print(tuple);
}

 

"widest qb" : \/query_block("query_blocks_at_offset");

fromClauseInCursorQueryBlock:
"widest qb".query_block <= fromClause &
[fromClause) from_clause
;

selectClauseAtCursor:
"widest qb".query_block <= selectClause &
[selectClause) select_clause &
[selectClause <= :offset & :offset <= selectClause)
;

unfinishedSelectClauseAtCursor:
[selectClause) 'SELECT' &
[selectClause < :offset
;

cursorInSelectClause:
"widest qb".query_block <= selectClause &
[selectClause) select_clause &
[selectClause <= :offset & :offset <= selectClause) &
[qualifier) identifier &
[qualifier+1) '.'
;

qualifiedSelectTermAtCursor:
"widest qb".query_block <= selectClause &
[selectClause) select_clause &
[selectTerm) select_term &
[selectTerm <= :offset & :offset <= selectTerm) &
selectTerm <= qualifier &
[qualifier) identifier &
[qualifier+1) '.'
;


-- SELECT *
--   FROM 
--       ORAPERF.S_PARTY T1, <-- full table ref
--       S_EVT_ACT T18,      <-- full table ref
--       T20,                 <-- "simple table ref"
--       ORAPERF.S_PARTY,     <-- "simple table ref"
"simple table ref": 
"widest qb".query_block <= alias &
[alias) table_reference &
([alias) identifier | [alias) query_table_expression ) &
table = alias
;

"full table ref":
"widest qb".query_block <= alias &
[alias-1) query_table_expression &
[alias) identifier &
table = alias-1 
;

"table ref in update or update":
[alias-1) dml_table_expression_clause &
[alias) identifier &
table = alias-1  
|
([alias) dml_table_expression_clause | [alias-1) 'INSERT') &
[alias) identifier & ![alias+1) identifier &
table = alias 
;

"table ref in other update":
[alias-1) dml_table_expression_clause &
[alias) identifier &
table = alias-1 &
"other_insert_or_update".stmt < alias 
;

"table ref in other insert":
([alias) dml_table_expression_clause | [alias-1) 'INSERT') &
[alias) identifier & ![alias+1) identifier &
table = alias &
"other_insert_or_update".stmt < alias 
;



"table_alias in widest qb" : (("full table ref"
                              | "simple table ref"
                              | "table ref in update or update") - "table ref in other update") -"table ref in other insert"
-> {
    //print(tuple);
}

functions: ([name) name_wo_function_call | [name) dotted_name )
          & name) < :editorOffset
;

lastFunction: /./name(functions)
-> 

include "find_declaration.prg"

localVars: "united scopes" -> {
    //print("localVars: "+tuple);
}
         
         
connect: 
   (     [command) at_connect
       & [command < :editorOffset
       & :editorOffset < command)
       & [command^) connect_str
   )
|  (     ?command = 'TNSPING'
       --& [command < :editorOffset
       --& :editorOffset = command)
   )
;
         
