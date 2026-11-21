/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { SqlEarley } from './plsql/SqlEarley';

/**
 * Verifies that ParseNode.children() correctly reflects mutations made by
 * addTopLevel(), i.e. the cachedChildren cache is invalidated on mutation.
 * @class
 */
export class CachedChildrenTest {
    static earley: SqlEarley = null;

    static setUp() {
        CachedChildrenTest.earley = SqlEarley.getInstance();
    }

    /**
     * addTopLevel() must invalidate cachedChildren so that a subsequent
     * children() call reflects the mutation.
     */
    public childrenReflectsAddTopLevelAfterCacheIsPopulated() {
        const nonAuxSymbol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(CachedChildrenTest.earley.symbolIndexes, "query_block");
        const root: ParseNode = new ParseNode(0, 10, -1, CachedChildrenTest.earley);
        const child1: ParseNode = new ParseNode(0, 5, nonAuxSymbol, CachedChildrenTest.earley);
        root.addTopLevel(child1);
        const firstCall: Array<ParseNode> = root.children();
        assertEquals(1, /* size */(<number>firstCall.length), "should see 1 child");
        const child2: ParseNode = new ParseNode(5, 10, nonAuxSymbol, CachedChildrenTest.earley);
        root.addTopLevel(child2);
        assertEquals(2, /* size */(<number>root.topLevel.length), "topLevel should contain 2 children");
        const secondCall: Array<ParseNode> = root.children();
        assertEquals(2, /* size */(<number>secondCall.length), "children() must return 2 after addTopLevel");
    }

    /**
     * Replicates the duplexParse() flow (Yelrae class) on a real
     * forward-parsed tree: children() is called, then addTopLevel() appends
     * an addendum node. children() must include the addendum.
     */
    public childrenReflectsAddTopLevelOnRealForwardParseTree() {
        const candidates: string[] = ["SELECT 1 FROM dual;\nSELECT", "SELECT 1 FROM dual;\nUPDATE", "SELECT 1;\nSELECT 2 FROM", "BEGIN NULL; END;\nSELECT"];
        const parser: SqlEarley = SqlEarley.getInstance();
        let root: ParseNode = null;
        let src: Array<LexerToken> = null;
        for(let index = 0; index < candidates.length; index++) {
            let sql = candidates[index];
            {
                src = new Lexer().doParse$java_lang_String$boolean$int(sql, false, Lexer.SQL_$LI$());
                const matrix: Matrix = new Matrix(parser);
                parser.doParse(src, matrix);
                const candidate: ParseNode = parser.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src, matrix, true, sql);
                if (candidate.topLevel != null && /* size */(<number>candidate.topLevel.length) > 0){
                    root = candidate;
                    break;
                }
            }
        }
        assertNotNull(root, "Precondition: need a partial forward parse with topLevel");
        const topLevelBefore: number = /* size */(<number>root.topLevel.length);
        const beforeAdd: Array<ParseNode> = root.children();
        const sizeBefore: number = /* size */(<number>beforeAdd.length);
        assertTrue(sizeBefore > 0, "Forward parse should produce at least one child");
        const nonAuxSymbol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(CachedChildrenTest.earley.symbolIndexes, "query_block");
        const addendumFrom: number = /* size */(<number>src.length);
        const addendum: ParseNode = new ParseNode(addendumFrom, addendumFrom + 1, nonAuxSymbol, parser);
        root.addTopLevel(addendum);
        assertEquals(topLevelBefore + 1, /* size */(<number>root.topLevel.length), "topLevel should have one more child after addTopLevel");
        const afterAdd: Array<ParseNode> = root.children();
        assertEquals(sizeBefore + 1, /* size */(<number>afterAdd.length), "children() must reflect the addendum node added via addTopLevel");
    }
}
CachedChildrenTest["__class"] = "oracle.dbtools.parser.CachedChildrenTest";




import { Matrix } from './Matrix';


import { Lexer } from './Lexer';


import { LexerToken } from './LexerToken';


import { ParseNode } from './ParseNode';

