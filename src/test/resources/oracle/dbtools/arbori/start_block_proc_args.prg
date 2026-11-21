declarations: [decl_id) decl_id &
type = decl_id+1
;

initializations: [assignment_stmt) assignment_stmt &
[name) name &
name^ = assignment_stmt &
[col) ':' &
name+1 = col &
expr = col+1+1
;


params: ?declarations.decl_id = ?initializations.name &
declarations.type = declarations.type & 
initializations.expr = initializations.expr

;
