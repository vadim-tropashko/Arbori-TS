"query_blocks_at_offset":  [query_block) querySpecification   &
[query_block <= :offset & :offset <= query_block)
-> {
    //print(tuple);
}
 

"widest qb" : \/query_block("query_blocks_at_offset");


-- SELECT *
--   FROM 
--       ORAPERF.S_PARTY T1, <-- full table ref
--       S_EVT_ACT T18,      <-- full table ref
--       T20,                 <-- "simple table ref"
--       ORAPERF.S_PARTY,     <-- "simple table ref"
"simple table ref": 
"widest qb".query_block <= alias &
[alias) tableSource &
([alias) identifier | [alias) tableName ) &
table = alias
;

"full table ref":
"widest qb".query_block <= alias &
[alias-1) tableName &
[alias) identifier &
table = alias-1 
;

"table ref in update":
[alias-1) tableName &
[alias) identifier &
table = alias-1
;

"table ref in insert":
[table) tableName & ![table^) tableSource
& table = alias
;


"table_alias in widest qb" : "full table ref"
                              | "simple table ref"
                              | "table ref in update"
                              | "table ref in insert"
-> {
    //print(tuple);
}



functions: [name]
;

--include "find_declaration.prg"


localVars: [id]
;
         
         
connect: [command]
;
      

