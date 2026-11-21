/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { SyntaxError } from './plsql/SyntaxError';

export class WrappedPlsqlTest {
    acceptsWrappedPayloadWhoseLineStartsWithSlash() {
        const sql: string = "CREATE OR REPLACE NONEDITIONABLE PACKAGE BODY MDSYS.PRVT_IDX wrapped\na000000\n1\nabcd\nabcd\nb\n45e1 f8a\n/cWx/Ke7ePH054PjJxh081oXvV4rQYQjQZVlnXyZQJVu99pYjd+3eq9GLP2x1pLgmodsAeOJ\nHPR+MxNKoLqL5xO3TdDfl1LGqviWxYGxSg==\n/\n";
        const tokens: Array<LexerToken> = Lexer.parse$java_lang_String(sql);
        Assertions.assertEquals(1, tokens.stream().filter((token) => token.type === Token.WRAP).count());
        Assertions.assertNull(SyntaxError.checkSQLStatementSyntax$java_lang_String(sql));
    }
}
WrappedPlsqlTest["__class"] = "oracle.dbtools.parser.WrappedPlsqlTest";




import { Token } from './Token';


import { Lexer } from './Lexer';


import { LexerToken } from './LexerToken';

