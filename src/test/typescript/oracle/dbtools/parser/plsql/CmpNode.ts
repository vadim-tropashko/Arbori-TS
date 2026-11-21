/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParseNode } from '../../../../../../main/typescript/oracle/dbtools/parser/ParseNode.js';
import { Parser } from '../../../../../../main/typescript/oracle/dbtools/parser/Parser.js';

export class CmpNode extends ParseNode {
    public constructor(begin: number, end: number, p: Parser) {
        super(begin, end, -1, p);
        this.isCollapsed = false;
        this.isExactPayload = false;
    }

    public isCollapsed: boolean;

    public isExactPayload: boolean;

    /**
     * 
     * @return {boolean}
     */
    public isAuxiliary(): boolean {
        return false;
    }

    /**
     * Check if payload of this node is subset of b
     * @param this -- node structure read from test file
     * @param {ParseNode} b    -- node returned  by test output
     * @return
     * @return {boolean}
     */
    public isSubtree(b: ParseNode): boolean {
        if (this.from !== b.from || this.to !== b.to){
            console.info("Mismatching intervals: [" + this.from + "," + this.to + ") and [" + b.from + "," + b.to + ")");
            console.info("Expected node: " + this);
            console.info("Actual node:   " + b);
            return false;
        }
        {
            const mismatch: number = this.isExactPayload ? CmpNode.contentIsEqualWithOneExc(this, b) : CmpNode.contentIsSubsetUpToMinus1(this, b);
            if (mismatch != null){
                console.info("Different content at nodes [" + this.from + "," + this.to + ") ");
                console.info("Not found:" + (<Parser>this.parser).allSymbols[mismatch]);
                console.info("Expected node: " + this);
                console.info("Actual node:   " + b);
                return false;
            }
            if (this.topLevel == null && /* size */(<number>b.children().length) === 0)return true;
            if (this.isCollapsed)return true;
            if (this.topLevel == null){
                this.printTree$();
                console.info("--not subtree of--");
                b.printTree$();
                return false;
            }
            if (/* size */(<number>this.topLevel.length) !== /* size */(<number>b.children().length)){
                console.info("Children count mismatch at nodes [" + this.from + "," + this.to + ")");
                console.info("a.topLevel.size()=" + /* size */(<number>this.topLevel.length) + ", b.children().size()=" + /* size */(<number>b.children().length));
                for(let index = 0; index < this.topLevel.length; index++) {
                    let n = this.topLevel[index];
                    console.info(n.toString$())
                }
                {
                    let array = b.children();
                    for(let index = 0; index < array.length; index++) {
                        let n = array[index];
                        console.info(n.toString$())
                    }
                }
                return false;
            }
        };
        if (this.topLevel != null)for(let index = 0; index < this.topLevel.length; index++) {
            let ca = this.topLevel[index];
            {
                let matched: boolean = false;
                let intervalFound: boolean = false;
                {
                    let array = b.children();
                    for(let index1 = 0; index1 < array.length; index1++) {
                        let cb = array[index1];
                        {
                            if (ca.from === cb.from && ca.to === cb.to){
                                intervalFound = true;
                                if ((<CmpNode>ca).isSubtree(cb)){
                                    matched = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!matched){
                    if (!intervalFound){
                        console.info("Expected child interval [" + ca.from + "," + ca.to + ") not found under node [" + this.from + "," + this.to + ")");
                        console.info("Expected child: " + ca);
                        console.info("Actual children:");
                        {
                            let array = b.children();
                            for(let index1 = 0; index1 < array.length; index1++) {
                                let cb = array[index1];
                                console.info(cb)
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    /*private*/ static contentIsSubsetUpToMinus1(a: ParseNode, b: ParseNode): number {
        let j: number = 0;
        for(let i: number = 0; i < a.content$().length; i++) {{
            const expected: number = a.content$()[i];
            if (expected === -1)continue;
            while((j < b.content$().length && expected !== b.content$()[j])) {j++};
            if (j === b.content$().length)return expected;
            j++;
        };}
        return null;
    }

    /*private*/ static contentIsEqualWithOneExc(a: ParseNode, b: ParseNode): number {
        let i: number = 0;
        if (a.content$()[0] === -1)i++;
        for(let j: number = 0; i < a.content$().length && j < b.content$().length; i++, j++) {{
            if (a.content$()[i] !== b.content$()[j])return a.content$()[i];
        };}
        return null;
    }
}
CmpNode["__class"] = "oracle.dbtools.parser.plsql.CmpNode";



