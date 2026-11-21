/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerToken } from '../LexerToken.js';
import { Matrix } from '../Matrix.js';
import { ParseNode } from '../ParseNode.js';

/**
 * Compile node on demand: if client code wants to drill down to children
 * Deprected as it is really cumbersome to use
 * StackParser artifact
 * @author vtropash
 * @param {number} begin
 * @param {string} start
 * @param {LexerToken[]} src
 * @class
 * @extends ParseNode
 */
export class LazyNode extends ParseNode {
    public startToken: string;

    src: Array<LexerToken>;

    public isWellFormed: boolean;

    public constructor(begin: number, start: string, src: Array<LexerToken>) {
        super(begin, -1, -1, -1, null);
        if (this.startToken === undefined) { this.startToken = null; }
        if (this.src === undefined) { this.src = null; }
        this.isWellFormed = true;
        this.branch = null;
        this.startToken = start;
        this.src = src;
    }

    /*private*/ branch: ParseNode;

    public getBranch(): ParseNode {
        return this.branch;
    }

    /**
     * 
     * @return {ParseNode[]}
     */
    public children(): Array<ParseNode> {
        if (this.branch == null)return super.children(); else {
            const ret: Array<ParseNode> = <any>([]);
            /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, super.children());
            /* add */(ret.push(this.branch)>0);
            return ret;
        }
    }

    public childAt(head: number, tail: number): ParseNode {
        if (this.branch == null)return super.childAt(head, tail); else return this.branch.childAt(head, tail);
    }

    public shallowChildren(): Array<LazyNode> {
        const ret: Array<LazyNode> = <any>([]);
        {
            let array = super.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                if (child != null && child instanceof <any>LazyNode)/* add */(ret.push(<LazyNode>child)>0);
            }
        }
        return ret;
    }

    public shallowDescendants(): Array<LazyNode> {
        const ret: Array<LazyNode> = <any>([]);
        /* add */(ret.push(this)>0);
        {
            let array = this.shallowChildren();
            for(let index = 0; index < array.length; index++) {
                let n = array[index];
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, (<LazyNode>n).shallowDescendants())
            }
        }
        return ret;
    }

    public shallowIntermediates(head: number, tail: number): Array<LazyNode> {
        const ret: Array<LazyNode> = <any>([]);
        if (this.from <= head && tail <= this.to)/* add */(ret.push(this)>0);
        {
            let array = this.shallowChildren();
            for(let index = 0; index < array.length; index++) {
                let n = array[index];
                if (n.from <= head && tail <= n.to)/* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, n.shallowIntermediates(head, tail));
            }
        }
        return ret;
    }

    public shallowParent(head: number, tail: number): LazyNode {
        {
            let array = this.shallowIntermediates(head, tail);
            for(let index = 0; index < array.length; index++) {
                let descendant = array[index];
                {
                    let array1 = descendant.shallowChildren();
                    for(let index1 = 0; index1 < array1.length; index1++) {
                        let child = array1[index1];
                        if (child.from === head && child.to === tail)return descendant;
                    }
                }
            }
        }
        return null;
    }

    public shallowLeaf(head: number, tail: number): LazyNode {
        {
            let array = this.shallowIntermediates(head, tail);
            for(let index = 0; index < array.length; index++) {
                let descendant = array[index];
                {
                    if (/* size */(<number>descendant.shallowChildren().length) === 0 && descendant.from <= head && tail <= descendant.to)return descendant;
                }
            }
        }
        return null;
    }

    public ancestor(head?: any, tail?: any, content?: any): any {
        if (((typeof head === 'number') || head === null) && ((typeof tail === 'number') || tail === null) && ((typeof content === 'number') || content === null)) {
            return super.ancestor(head, tail, content);
        } else if (((typeof head === 'number') || head === null) && ((typeof tail === 'number') || tail === null) && content === undefined) {
            return <any>this.ancestor$int$int(head, tail);
        } else if (((typeof head === 'number') || head === null) && tail === undefined && content === undefined) {
            return <any>this.ancestor$int(head);
        } else throw new Error('invalid overload');
    }

    public ancestor$int$int(head: number, tail: number): LazyNode {
        const candidates: Array<LazyNode> = this.shallowChildren();
        if (/* size */(<number>candidates.length) === 0)return this;
        for(let index = 0; index < candidates.length; index++) {
            let child = candidates[index];
            if (child.from <= head && tail <= child.to)return child.ancestor$int$int(head, tail);
        }
        return this;
    }

    public isAuxiliary(): boolean {
        return false;
    }

    public toString(depth?: any, auxMarker?: any, isCut?: any): string {
        if (((typeof depth === 'number') || depth === null) && ((typeof auxMarker === 'string') || auxMarker === null) && ((typeof isCut === 'boolean') || isCut === null)) {
            return super.toString(depth, auxMarker, isCut);
        } else if (((typeof depth === 'number') || depth === null) && ((typeof auxMarker === 'boolean') || auxMarker === null) && isCut === undefined) {
            return <any>this.toString$int$boolean(depth, auxMarker);
        } else if (((typeof depth === 'number') || depth === null) && auxMarker === undefined && isCut === undefined) {
            return <any>this.toString$int(depth);
        } else if (depth === undefined && auxMarker === undefined && isCut === undefined) {
            return <any>this.toString$();
        } else throw new Error('invalid overload');
    }

    toString$int(depth: number): string {
        const sb: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i < depth; i++) {/* append */(sb => { sb.str += <any>"  "; return sb; })(sb);}
        /* append */(sb => { sb.str += <any>"[" + this.from + "," + this.to + ") "; return sb; })(sb);
        /* append */(sb => { sb.str += <any>"  " + this.startToken; return sb; })(sb);
        if (!this.isWellFormed)/* append */(sb => { sb.str += <any>"  *** incomplete!"; return sb; })(sb);
        return /* toString */sb.str;
    }

    public isAs(): boolean {
        return /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("is", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("as", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("before", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("after", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("of", this.startToken);
    }

    public isCompilationUnit(): boolean {
        return /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("package", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("trigger", this.startToken) || this.isProcedure();
    }

    public isProcedure(): boolean {
        return /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("function", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("procedure", this.startToken);
    }

    public isDML(next: string = null): boolean {
        return !("(" === next) && !(";" === next) && (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("insert", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("update", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("delete", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("select", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("with", this.startToken) && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("context", next) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("cursor", this.startToken) && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("is", next) && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("as", next) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("merge", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("fetch", this.startToken));
    }

    public isDDL(next: string): boolean {
        return /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("alter", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("create", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("grant", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("drop", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("comment", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("administer", this.startToken) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("key", next);
    }

    isControlStmt(root: LazyNode): boolean {
        let parentStartToken: string = "N/A";
        const parent: LazyNode = root.shallowParent(this.from, this.to);
        if (parent != null)parentStartToken = (<LazyNode>parent).startToken;
        return /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("if", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("case", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("while", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("loop", this.startToken) && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", parentStartToken) && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("while", parentStartToken);
    }

    public isBlock(root: LazyNode): boolean {
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("declare", this.startToken))return true;
        if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("begin", this.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("exception", this.startToken)){
            if (root == null)return true;
            const parent: LazyNode = root.shallowParent(this.from, this.to);
            if (parent == null)return true;
            if (!/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("declare", parent.startToken) && !parent.isProcedure())return true;
        }
        return false;
    }

    public isStmt(root: LazyNode): boolean {
        return this.isBlock(root) || this.isControlStmt(root) || this.isDML(null) || this.isDDL(null);
    }

    public expandInterruptably() {
        this.expand$boolean(true);
    }

    public expand$() {
        try {
            this.expand$boolean(false);
        } catch(e) {
        }
    }

    public expand$boolean(interrupt: boolean) {
        if (this.branch != null)return;
        const fragment: Array<LexerToken> = <any>([]);
        let k: number = -1;
        for(let index = 0; index < this.src.length; index++) {
            let tok = this.src[index];
            {
                k++;
                if (interrupt && Thread.interrupted())throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.InterruptedException','java.lang.Object','java.lang.Exception'] });
                if (this.from <= k && k < this.to){
                    /* add */(fragment.push(tok)>0);
                }
            }
        }
        const earley: SqlEarley = SqlEarley.getInstance();
        const matrix: Matrix = new Matrix(earley);
        earley.parse$java_util_List$oracle_dbtools_parser_Matrix(fragment, matrix);
        this.branch = earley.forest$java_util_List$oracle_dbtools_parser_Matrix(fragment, matrix);
        this.branch.moveInterval(this.from);
    }

    public expand(interrupt?: any) {
        if (((typeof interrupt === 'boolean') || interrupt === null)) {
            return <any>this.expand$boolean(interrupt);
        } else if (interrupt === undefined) {
            return <any>this.expand$();
        } else throw new Error('invalid overload');
    }

    /**
     * https://community.oracle.com/thread/3521866 LinkedList -> ArrayList
     * @return
     * @return {LexerToken[]}
     */
    public getSrcFragment(): Array<LexerToken> {
        const fragment: Array<LexerToken> = <any>([]);
        let k: number = -1;
        let offset: number = 0;
        for(let index = 0; index < this.src.length; index++) {
            let tok = this.src[index];
            {
                k++;
                if (this.to <= k)break;
                if (this.from === k)offset = tok.begin;
                if (this.from <= k)/* add */(fragment.push(new LexerToken(tok.content, tok.begin - offset, tok.end - offset, tok.type))>0);
            }
        }
        return fragment;
    }

    public addContent$java_lang_String(symbol: string) {
        this.startToken = symbol;
    }

    /**
     * 
     * @param {string} symbol
     */
    public addContent(symbol?: any) {
        if (((typeof symbol === 'string') || symbol === null)) {
            return <any>this.addContent$java_lang_String(symbol);
        } else if (((typeof symbol === 'number') || symbol === null)) {
            return <any>this.addContent$int(symbol);
        } else throw new Error('invalid overload');
    }
}
LazyNode["__class"] = "oracle.dbtools.parser.plsql.LazyNode";




import { SqlEarley } from './SqlEarley.js';

