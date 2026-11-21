"proc scope" : 
([decl) basic_decl_item | [decl) prm_spec) &
[id) decl_id &
decl <= id &
[scope <= :editorOffset & :editorOffset < scope) &
scope <= decl &
[scope) subprg_body 
;

"block scope" : 
[decl) basic_decl_item &
[id) decl_id &
decl <= id &
[scope <= :editorOffset & :editorOffset < scope) &
scope <= decl &
[scope) block_stmt
;

"loop scope" : 
[decl) iteration_scheme &
[id) identifier &
[id+1) 'IN' &
decl <= id &
[scope <= :editorOffset & :editorOffset < scope) &
scope <= decl &
[scope) loop_stmt
;

"united scopes" : "proc scope" | "block scope" | "loop scope";

"vars" :
[entry <= :editorOffset & :editorOffset < entry) &
[entry) identifier &
?entry = ?"united scopes".id &
"united scopes".scope <= entry 
--!entry = sc.id
;

"[entry scope]" : [entry scope];

"var entry in scope" : /\scope("vars" | "[entry scope]");



"findLocalDecl" : "var entry in scope" & "vars";


