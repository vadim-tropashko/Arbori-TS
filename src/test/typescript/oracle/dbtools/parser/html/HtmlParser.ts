/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';
import { Parser } from '../Parser';
import { Token } from '../Token';

export class HtmlParser extends Parser {
    public debug: boolean;

    src: Array<LexerToken>;

    processed: Array<LexerToken>;

    /**
     * 
     * @param {LexerToken[]} src
     * @return {ParseNode}
     */
    public parse(src: Array<LexerToken>): ParseNode {
        this.src = src;
        this.processed = <any>([]);
        for(let index = 0; index < src.length; index++) {
            let t = src[index];
            /* add */(this.processed.push(t)>0)
        }
        return this.nodes(0, /* size */(<number>this.processed.length));
    }

    nodes(from: number, to: number): ParseNode {
        const node: ParseNode = this.node(from, to);
        if (node == null)return null;
        if (node.to === to){
            node.addContent$int(this.processGrammarSymbol("nodes"));
            return node;
        }
        const ret: ParseNode = new ParseNode(from, to, this.processGrammarSymbol("nodes"), this);
        ret.addTopLevel(node);
        const nodes: ParseNode = this.nodes(node.to, to);
        if (nodes != null){
            ret.addTopLevel(nodes);
            ret.to = nodes.to;
        } else {
            node.addContent$int(this.processGrammarSymbol("nodes"));
            return node;
        }
        return ret;
    }

    node(from: number, to: number): ParseNode {
        const ret: ParseNode = new ParseNode(from, to, this.processGrammarSymbol("node"), this);
        const openTag: ParseNode = this.openTag(from, to);
        if (openTag == null){
            return null;
        }
        ret.addTopLevel(openTag);
        let tag: ParseNode = null;
        {
            let array = openTag.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                if (child.contains$java_lang_String("dashedId")){
                    tag = child;
                    break;
                }
            }
        }
        from = openTag.to;
        const nodes: ParseNode = this.nodes(from, to);
        if (nodes != null){
            ret.addTopLevel(nodes);
            from = nodes.to;
        }
        const closeTag: ParseNode = this.closeTag(from, to, tag.content$java_util_List(this.src));
        ret.addTopLevel(closeTag);
        ret.to = closeTag.to;
        return ret;
    }

    openTag(from: number, to: number): ParseNode {
        const did: HtmlParser.Sequence = new HtmlParser.Sequence(this, "openTag", true);
        did.addForward(new HtmlParser.Keyword(this, "<"));
        did.addForward(this.dashedId());
        did.addForward(this.equalities());
        did.addForward(new HtmlParser.Optional(this, new HtmlParser.Identifier(this)));
        did.addForward(new HtmlParser.Keyword(this, ">"));
        const ret: ParseNode = did.apply(from, to);
        return ret;
    }

    closeTag(from: number, to: number, match: string): ParseNode {
        const did: HtmlParser.Sequence = new HtmlParser.Sequence(this, "closeTag", true);
        did.addForward(new HtmlParser.Keyword(this, "<"));
        did.addForward(new HtmlParser.Keyword(this, "/"));
        did.addForward(this.dashedId());
        did.addForward(new HtmlParser.Keyword(this, ">"));
        const ret: ParseNode = did.apply(from, to);
        let tag: ParseNode = null;
        {
            let array = ret.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                if (child.contains$java_lang_String("dashedId")){
                    tag = child;
                    break;
                }
            }
        }
        if (!(match === tag.content$java_util_List(this.src)))throw Object.defineProperty(new Error("openTag:" + match + "!= closedTag:" + tag.content$java_util_List(this.src)), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        return ret;
    }

    equalities(): HtmlParser.Sequence {
        const did: HtmlParser.Sequence = new HtmlParser.Sequence(this, "equalities", false);
        const repeat: number = 10;
        did.addForward(this.equality());
        for(let i: number = 0; i < repeat; i++) {{
            did.addForward(this.equality());
        };}
        return did;
    }

    equality(): HtmlParser.Sequence {
        const did: HtmlParser.Sequence = new HtmlParser.Sequence(this, "equality", true);
        did.addForward(this.dashedId());
        did.addForward(new HtmlParser.Keyword(this, "="));
        did.addForward(new HtmlParser.Identifier(this));
        return did;
    }

    dashedId(): HtmlParser.Sequence {
        const did: HtmlParser.Sequence = new HtmlParser.Sequence(this, "dashedId", false);
        const repeat: number = 5;
        did.addForward(new HtmlParser.Identifier(this));
        for(let i: number = 0; i < repeat; i++) {{
            did.addForward(new HtmlParser.Keyword(this, "-"));
            did.addForward(new HtmlParser.Identifier(this));
        };}
        return did;
    }

    public processGrammarSymbol(symbol: string): number {
        let ii: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, symbol);
        if (ii == null){
            ii = this.allSymbols.length;
            this.allSymbols = /* copyOf */this.allSymbols.slice(0,this.allSymbols.length + 1);
            /* put */(this.symbolIndexes[symbol] = ii);
            this.allSymbols[ii] = symbol;
        }
        return ii;
    }

    constructor() {
        super();
        this.debug = false;
        if (this.src === undefined) { this.src = null; }
        if (this.processed === undefined) { this.processed = null; }
    }
}
HtmlParser["__class"] = "oracle.dbtools.parser.html.HtmlParser";


export namespace HtmlParser {

    export abstract class ParsedGrammarSymbol {
        public __parent: any;
        symbol: string;

        public constructor(__parent: any, symbol: string) {
            this.__parent = __parent;
            if (this.symbol === undefined) { this.symbol = null; }
            this.symbol = symbol;
        }

        abstract apply(from: number, to: number): ParseNode;

        /**
         * 
         * @return {string}
         */
        public toString(): string {
            return "symbol=" + this.symbol;
        }
    }
    ParsedGrammarSymbol["__class"] = "oracle.dbtools.parser.html.HtmlParser.ParsedGrammarSymbol";


    export class Identifier extends HtmlParser.ParsedGrammarSymbol {
        public __parent: any;
        public constructor(__parent: any) {
            super(__parent, "identifier");
            this.__parent = __parent;
        }

        /**
         * 
         * @param {number} from
         * @param {number} to
         * @return {ParseNode}
         */
        apply(from: number, to: number): ParseNode {
            let id: LexerToken = null;
            id = /* peekFirst */(a => a.length==0 ? null : a[0])(this.__parent.processed);
            if (id.type !== Token.IDENTIFIER && id.type !== Token.DQUOTED_STRING)return null;
            to = from + 1;
            /* removeFirst */this.__parent.processed.splice(0, 1)[0];
            return new ParseNode(from, to, this.__parent.processGrammarSymbol("identifier"), this.__parent);
        }
    }
    Identifier["__class"] = "oracle.dbtools.parser.html.HtmlParser.Identifier";


    export class Keyword extends HtmlParser.ParsedGrammarSymbol {
        public __parent: any;
        public constructor(__parent: any, operation: string) {
            super(__parent, operation);
            this.__parent = __parent;
        }

        /**
         * 
         * @param {number} from
         * @param {number} to
         * @return {ParseNode}
         */
        apply(from: number, to: number): ParseNode {
            let op: LexerToken = null;
            op = /* peekFirst */(a => a.length==0 ? null : a[0])(this.__parent.processed);
            if (op.type !== Token.OPERATION)return null;
            if (!(op.content === this.symbol))return null;
            to = from + 1;
            /* removeFirst */this.__parent.processed.splice(0, 1)[0];
            return new ParseNode(from, to, this.__parent.processGrammarSymbol("\'" + this.symbol + "\'"), this.__parent);
        }
    }
    Keyword["__class"] = "oracle.dbtools.parser.html.HtmlParser.Keyword";


    export class Sequence extends HtmlParser.ParsedGrammarSymbol {
        public __parent: any;
        knownLength: boolean;

        public constructor(__parent: any, operation: string, knownLength: boolean) {
            super(__parent, operation);
            this.__parent = __parent;
            if (this.knownLength === undefined) { this.knownLength = false; }
            this.forward = <any>([]);
            this.knownLength = knownLength;
        }

        forward: Array<HtmlParser.ParsedGrammarSymbol>;

        public addForward(o: HtmlParser.ParsedGrammarSymbol) {
            /* add */(this.forward.push(o)>0);
        }

        /**
         * 
         * @param {number} from
         * @param {number} to
         * @return {ParseNode}
         */
        public apply(from: number, to: number): ParseNode {
            if ("equality" === this.symbol)console.info();
            const ret: ParseNode = new ParseNode(from, to, this.__parent.processGrammarSymbol(this.symbol), this.__parent);
            let prior: ParseNode = null;
            let pos: number = from;
            for(let index = 0; index < this.forward.length; index++) {
                let o = this.forward[index];
                {
                    const p: ParseNode = o.apply(pos, to);
                    if (p == null){
                        if (o != null && o instanceof <any>HtmlParser.Optional)continue;
                        if (this.knownLength){
                            this.restoreProcessed(from);
                            return null;
                        }
                        break;
                    }
                    ret.addTopLevel(p);
                    pos = p.to;
                    prior = p;
                }
            }
            if (prior == null){
                this.restoreProcessed(from);
                return null;
            }
            ret.to = prior.to;
            if (this.__parent.debug)console.info("ret=" + ret.toString$());
            return ret;
        }

        restoreProcessed(from: number) {
            const p1: LexerToken = /* peekFirst */(a => a.length==0 ? null : a[0])(this.__parent.processed);
            let ii: number = 0;
            for(; ii < /* size */(<number>this.__parent.src.length); ii++) {{
                if (p1 === /* get */this.__parent.src[ii])break;
            };}
            for(let i: number = ii - 1; from <= i; i--) {{
                /* addFirst */this.__parent.processed.unshift(/* get */this.__parent.src[i]);
            };}
        }

        /**
         * 
         * @return {string}
         */
        public toString(): string {
            return super.toString() + ((this.knownLength) ? " known length" : "");
        }
    }
    Sequence["__class"] = "oracle.dbtools.parser.html.HtmlParser.Sequence";


    export class Optional extends HtmlParser.ParsedGrammarSymbol {
        public __parent: any;
        payload: HtmlParser.ParsedGrammarSymbol;

        public constructor(__parent: any, payload: HtmlParser.ParsedGrammarSymbol) {
            super(__parent, payload.symbol);
            this.__parent = __parent;
            if (this.payload === undefined) { this.payload = null; }
            this.payload = payload;
        }

        /**
         * 
         * @param {number} from
         * @param {number} to
         * @return {ParseNode}
         */
        apply(from: number, to: number): ParseNode {
            const ret: ParseNode = this.payload.apply(from, to);
            return ret;
        }
    }
    Optional["__class"] = "oracle.dbtools.parser.html.HtmlParser.Optional";

}



