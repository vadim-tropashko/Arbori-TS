/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../parser/Earley';
import { Lexer } from '../parser/Lexer';
import { LexerToken } from '../parser/LexerToken';
import { ParseNode } from '../parser/ParseNode';
import { Parsed } from '../parser/Parsed';
import { ParsedSql } from '../parser/plsql/ParsedSql';
import { SqlEarley } from '../parser/plsql/SqlEarley';
import { GlobalMap } from '../../arbori/scripting/GlobalMap';
import { Service } from '../../arbori/util/Service';
import { Program } from './Program';

export class SqlProgram extends Program {
    public constructor(programText: string, struct: any = null, globals: GlobalMap = null) {
        super(SqlEarley.getInstance(), struct, globals);
        this.compile$java_lang_String$java_lang_Object(programText, struct);
    }

    public run$java_lang_String$java_util_List$java_lang_Object(input: string, src: Array<LexerToken>, callback: any): any {
        return this.run$java_lang_String$java_util_List$java_lang_String_A$java_lang_Object(input, src, null, callback);
    }

    public run$java_lang_String$java_util_List$java_lang_String_A$java_lang_Object(input: string, src: Array<LexerToken>, rootSyntax: string[], callback: any): any {
        return this.run$java_lang_String$java_util_List$java_lang_String_A$java_lang_Object$oracle_dbtools_parser_Earley(input, src, rootSyntax, callback, SqlEarley.getInstance());
    }

    public run$java_lang_String$java_util_List$java_lang_String_A$java_lang_Object$oracle_dbtools_parser_Earley(input: string, src: Array<LexerToken>, rootSyntax: string[], callback: any, parser: Earley): any {
        if (src == null)src = Lexer.parse$java_lang_String(input);
        const target: Parsed = new Parsed(input, src, parser, rootSyntax);
        const predicateVectors: any = this.eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, callback);
        return predicateVectors;
    }

    public run(input?: any, src?: any, rootSyntax?: any, callback?: any, parser?: any): any {
        if (((typeof input === 'string') || input === null) && ((src != null && (src instanceof Array)) || src === null) && ((rootSyntax != null && rootSyntax instanceof <any>Array && (rootSyntax.length == 0 || rootSyntax[0] == null ||(typeof rootSyntax[0] === 'string'))) || rootSyntax === null) && ((callback != null) || callback === null) && ((parser != null && parser instanceof <any>Earley) || parser === null)) {
            return <any>this.run$java_lang_String$java_util_List$java_lang_String_A$java_lang_Object$oracle_dbtools_parser_Earley(input, src, rootSyntax, callback, parser);
        } else if (((typeof input === 'string') || input === null) && ((src != null && (src instanceof Array)) || src === null) && ((rootSyntax != null && rootSyntax instanceof <any>Array && (rootSyntax.length == 0 || rootSyntax[0] == null ||(typeof rootSyntax[0] === 'string'))) || rootSyntax === null) && ((callback != null) || callback === null) && parser === undefined) {
            return <any>this.run$java_lang_String$java_util_List$java_lang_String_A$java_lang_Object(input, src, rootSyntax, callback);
        } else if (((typeof input === 'string') || input === null) && ((src != null && (src instanceof Array)) || src === null) && ((rootSyntax != null) || rootSyntax === null) && callback === undefined && parser === undefined) {
            return <any>this.run$java_lang_String$java_util_List$java_lang_Object(input, src, rootSyntax);
        } else if (((typeof input === 'string') || input === null) && ((src != null && (src instanceof Array)) || src === null) && rootSyntax === undefined && callback === undefined && parser === undefined) {
            return <any>this.run$java_lang_String$java_util_List(input, src);
        } else if (((typeof input === 'string') || input === null) && ((src != null) || src === null) && rootSyntax === undefined && callback === undefined && parser === undefined) {
            return <any>this.run$java_lang_String$java_lang_Object(input, src);
        } else if (((typeof input === 'string') || input === null) && src === undefined && rootSyntax === undefined && callback === undefined && parser === undefined) {
            return <any>this.run$java_lang_String(input);
        } else throw new Error('invalid overload');
    }

    public run$java_lang_String$java_util_List(input: string, src: Array<LexerToken>): any {
        return this.run$java_lang_String$java_util_List$java_lang_Object(input, src, null);
    }

    public run$java_lang_String$java_lang_Object(input: string, callback: any): any {
        return this.run$java_lang_String$java_util_List$java_lang_Object(input, null, callback);
    }

    public run$java_lang_String(input: string): any {
        return this.run$java_lang_String$java_util_List$java_lang_Object(input, null, null);
    }

    /**
     * https://vadimtropashko.wordpress.com/2024/05/31/visitor-pattern-in-arbori/
     * see main() example usage
     * @param {string} sql   to perform semantic analysis, e.g. select 1,2 from dual
     * @param {string} condition   the visitor condition, e.g [node) select_term
     * @param {*} callback   method called at each ParseNode satisfying the condition
     * @throws Exception
     */
    static visitor(sql: string, condition: string, callback: (p1: Parsed, p2: ParseNode) => any) {
        const target: Parsed = new ParsedSql(sql);
        const prg: string = "visitor: " + condition + " ->";
        const program: Program = new SqlProgram(prg);
        program.compile$java_lang_String(prg);
        program.eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, new SqlProgram.SqlProgram$0(callback));
    }

    public static main(args: string[]) {
        const sql: string = "select 1,2 from dual";
        const condition: string = "[node) select_term";
        const callback: (p1: Parsed, p2: ParseNode) => any = (target, node) => {
            console.info(node.toString$() + " :::: " + node.content$java_util_List(target.getSrc()));
            return null;
        };
        SqlProgram.visitor(sql, condition, <any>(((funcInst: any) => { if (typeof funcInst == 'function') { return funcInst } return (arg0, arg1) =>  (funcInst['apply'] ? funcInst['apply'] : funcInst) .call(funcInst, arg0, arg1)})(callback)));
    }
}
SqlProgram["__class"] = "oracle.dbtools.arbori.SqlProgram";


export namespace SqlProgram {

    export class SqlProgram$0 {
        public visitor(target: Parsed, tuple: any) {
            const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
            if (typeof this.callback === 'function') {
                this.callback(target, node);
            } else {
                this.callback.apply(this.callback, [target, node]);
            }
        }

        constructor(private callback: any) {
        }
    }

}




import { MaterializedPredicate } from './MaterializedPredicate';


