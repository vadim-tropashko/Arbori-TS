/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Array as JArray } from '../../arbori/util/Array.js';

/**
 * Common stuff for both Earley and CYK parsers
 * @author Dim
 * @param {RuleTuple[]} originalRules
 * @class
 */
export abstract class Parser {
    /**
     * bijective map from String to int encoding of grammar symbols
     */
    public allSymbols: string[];

    public symbolIndexes: any;

    public rules: Parser.Tuple[];

    public constructor(originalRules?: any) {
        if (((originalRules != null && (originalRules instanceof Array)) || originalRules === null)) {
            let __args = arguments;
            if (this.rules === undefined) { this.rules = null; } 
            this.allSymbols = [];
            this.symbolIndexes = <any>({});
            this.__replaceLeaves = false;
            this.initializeParser(originalRules);
        } else if (originalRules === undefined) {
            let __args = arguments;
            if (this.rules === undefined) { this.rules = null; } 
            this.allSymbols = [];
            this.symbolIndexes = <any>({});
            this.__replaceLeaves = false;
        } else throw new Error('invalid overload');
    }

    initializeParser(originalRules: Array<RuleTuple>) {
        this.extractSymbols(originalRules);
        this.rules = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>originalRules.length));
        let p: number = 0;
        for(let index = 0; index < originalRules.length; index++) {
            let t = originalRules[index];
            {
                if (t.rhs.length === 0)throw Object.defineProperty(new Error("empty production " + t.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                const h: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, t.head);
                const rhs: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(t.rhs.length);
                for(let i: number = 0; i < rhs.length; i++) {{
                    rhs[i] = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, t.rhs[i]);
                };}
                this.rules[p++] = new Parser.Tuple(this, h, rhs);
            }
        }
    }

    extractSymbols(symbolicRules: Array<RuleTuple>) {
        const tmpSymbols: Array<string> = <any>([]);
        const nnil: string = "!nil";
        if (!/* containsKey */this.symbolIndexes.hasOwnProperty(nnil))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmpSymbols, nnil);
        for(let index = 0; index < symbolicRules.length; index++) {
            let ct = symbolicRules[index];
            {
                if (ct.head == null || ct.rhs.length === 0 || ct.rhs[0] == null || ct.rhs.length > 1 && ct.rhs[1] == null)throw Object.defineProperty(new Error("grammar has null symbols (or empty productions): " + ct.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                if (!/* containsKey */this.symbolIndexes.hasOwnProperty(ct.head))/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmpSymbols, ct.head);
                for(let index1 = 0; index1 < ct.rhs.length; index1++) {
                    let s = ct.rhs[index1];
                    if (!/* containsKey */this.symbolIndexes.hasOwnProperty(s)){
                        if (s.length < 2 && this.constructor.name === "SqlEarley")throw Object.defineProperty(new Error("ct=" + ct.toString()), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmpSymbols, s);
                    }
                }
            }
        }
        let k: number = this.allSymbols.length;
        this.allSymbols = /* copyOf */this.allSymbols.slice(0,this.allSymbols.length + /* size */(<number>tmpSymbols.length));
        for(let index = 0; index < tmpSymbols.length; index++) {
            let s = tmpSymbols[index];
            {
                /* put */(this.symbolIndexes[s] = k);
                this.allSymbols[k] = s;
                k++;
            }
        }
    }

    extractSymbolsOld(originalRules: Array<RuleTuple>) {
        const tmpSymbols: Array<string> = <any>([]);
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmpSymbols, "!nil");
        for(let index = 0; index < originalRules.length; index++) {
            let ct = originalRules[index];
            {
                if (ct.head == null || ct.rhs.length === 0 || ct.rhs[0] == null || ct.rhs.length > 1 && ct.rhs[1] == null)throw Object.defineProperty(new Error("grammar has null symbols (or empty productions)"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmpSymbols, ct.head);
                for(let index1 = 0; index1 < ct.rhs.length; index1++) {
                    let s = ct.rhs[index1];
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmpSymbols, s)
                }
            }
        }
        this.allSymbols = (s => { let a=[]; while(s-->0) a.push(null); return a; })(/* size */(<number>tmpSymbols.length));
        this.symbolIndexes = <any>({});
        let k: number = 0;
        for(let index = 0; index < tmpSymbols.length; index++) {
            let s = tmpSymbols[index];
            {
                /* put */(this.symbolIndexes[s] = k);
                this.allSymbols[k] = s;
                k++;
            }
        }
    }

    public isTerminal(terminal: number): boolean {
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.allSymbols[terminal].charAt(0)) == '\''.charCodeAt(0);
    }

    public forest$java_util_List$oracle_dbtools_parser_Matrix(src: Array<LexerToken>, matrix: Matrix): ParseNode {
        return this.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src, matrix, false);
    }

    public forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src: Array<LexerToken>, matrix: Matrix, full: boolean): ParseNode {
        return this.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src, matrix, false, null);
    }

    /**
     * switch the order to descending for embedded languages such as JS in SQL
     * @param {number} ruleHead
     * @return
     * @return {boolean}
     */
    isAsc(ruleHead: number): boolean {
        return false;
    }

    public forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src: Array<LexerToken>, matrix: Matrix, full: boolean, input: string): ParseNode {
        let explored: any = <any>({});
        try {
            const len: number = /* size */(<number>src.length);
            if (len === 0)return new ParseNode(0, len, -1, this);
            let cell: Parser.EarleyCell = matrix.get(0, len);
            if (cell != null && 0 < cell.size()){
                let root: ParseNode = this.treeForACell(src, matrix, cell, 0, len);
                root = this.replaceLeaves(root, input, src);
                if (root != null)return root;
            }
            let pseudoRoot: ParseNode = new ParseNode(0, len, -1, this);
            const X: number = 0;
            const Y: number = matrix.lastY();
            for(let offset: number = 0; offset < Y; offset++) {for(let t: number = 0; t < offset + 1; t++) {{
                let x: number = X + t;
                let y: number = Y + t - offset;
                let coverX: ParseNode = pseudoRoot.coveredByOnTopLevel(x);
                let coverY: ParseNode = pseudoRoot.coveredByOnTopLevel(y);
                while((coverX != null || coverY != null)) {{
                    let delta: number = 0;
                    if (coverX != null)delta = coverX.to - y + 1;
                    if (coverY != null)delta = coverY.to - y + 1;
                    if (delta <= 0)break;
                    t += delta;
                    x = X + t;
                    y = Y + t - offset;
                    coverX = pseudoRoot.coveredByOnTopLevel(x);
                    coverY = pseudoRoot.coveredByOnTopLevel(y);
                }};
                if (offset + 1 <= t)continue;
                cell = matrix.get(x, y);
                if (cell != null){
                    explored = <any>({});
                    const node: ParseNode = this.treeForACell(src, matrix, cell, x, y);
                    if (node != null){
                        pseudoRoot.addTopLevel(node);
                        node.__parent = pseudoRoot;
                        if (!full){
                            pseudoRoot = this.replaceLeaves(pseudoRoot, input, src);
                            return pseudoRoot;
                        }
                    }
                }
            };};}
            if (full){
                pseudoRoot = this.replaceLeaves(pseudoRoot, input, src);
                return pseudoRoot;
            } else return new ParseNode(0, 1, -1, this);
        } catch(e) {
            console.error("Parser.forest(): AssertionError " + e.message);
        }
        return null;
    }

    public forest(src?: any, matrix?: any, full?: any, input?: any): ParseNode {
        if (((src != null && (src instanceof Array)) || src === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof full === 'boolean') || full === null) && ((typeof input === 'string') || input === null)) {
            return <any>this.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(src, matrix, full, input);
        } else if (((src != null && (src instanceof Array)) || src === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof full === 'boolean') || full === null) && input === undefined) {
            return <any>this.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean(src, matrix, full);
        } else if (((src != null && (src instanceof Array)) || src === null) && ((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && full === undefined && input === undefined) {
            return <any>this.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
        } else throw new Error('invalid overload');
    }

    public __replaceLeaves: boolean;

    replaceLeaves(root: ParseNode, input: string, src: Array<LexerToken>): ParseNode {
        if (!this.__replaceLeaves)return root;
        if (input == null)return root;
        for(let node: ParseNode = root; node != null; node = node.next()) {{
            if (node.from + 1 === node.to){
                const parent: ParseNode = node.__parent;
                if (parent == null)continue;
                const leaf: LeafNode = new LeafNode(node.from, node.to, -1, node.parser, src, input);
                leaf.__parent = parent;
                leaf.symbols = node.symbols;
                if (parent.lft === node)parent.lft = leaf; else if (parent.rgt === node)parent.rgt = leaf; else {
                    const newTopLevel: Array<ParseNode> = <any>([]);
                    for(let index = 0; index < parent.topLevel.length; index++) {
                        let child = parent.topLevel[index];
                        if (child === node)/* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(newTopLevel, node); else /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(newTopLevel, child);
                    }
                    parent.topLevel = newTopLevel;
                }
            }
        };}
        return root;
    }

    public abstract parse(src: Array<LexerToken>): ParseNode;

    treeForACell(src: Array<LexerToken>, m: Matrix, cell: Parser.EarleyCell, x: number, y: number): ParseNode {
        throw Object.defineProperty(new Error("Abstract method"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    toHtml(ruleNo: number, pos: number, selected: boolean, x: number, mid: number, y: number, matrix: Matrix, sb: { str: string, toString: Function }) {
        throw Object.defineProperty(new Error("Abstract method"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public getSymbol(string: string): number {
        const symbol = this.symbolIndexes[string];
        return symbol === undefined ? -1 : symbol;
    }

    /**
     * Output rules matching a symbol
     * Rules are printed
     * This is alternative to to traditional way of having grammar text file, and leveraging editor search function
     * @param earley
     * @param {string} symbol      symbol of interest
     * e.g.: search all rules that contain/or match exacly "query" in header or/and right hand side
     * @param {boolean} headOnly    -- rules with header containing/or matching symbol
     * e.g.: "query" substring   query_block: 'SELECT' ...
     * @param {boolean} exactMatch  if false then "query" would match "query_block"
     * else rules with "query_block" wont be printed
     */
    public printOrderedRules(symbol: string, headOnly: boolean, exactMatch: boolean) {
        for(let i: number = 0; i < this.rules.length; i++) {{
            const tuple: Parser.Tuple = this.rules[i];
            if ((!exactMatch && /* contains */(this.allSymbols[tuple.head].indexOf(symbol) != -1) || exactMatch && (this.allSymbols[tuple.head] === symbol)))console.info(i + "     " + tuple.toString$());
            if (!headOnly){
                for(let index = 0; index < tuple.rhs.length; index++) {
                    let rhsi = tuple.rhs[index];
                    {
                        if ((!exactMatch && /* contains */(this.allSymbols[rhsi].indexOf(symbol) != -1) || exactMatch && (this.allSymbols[rhsi] === symbol)))console.info(i + "     " + tuple.toString$());
                    }
                }
            }
        };}
    }

    /**
     * To parse backwards
     * @return
     * @return {oracle.dbtools.parser.Parser.Tuple[]}
     */
    public invertRules(): Parser.Tuple[] {
        const ret: Parser.Tuple[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(this.rules.length);
        for(let i: number = 0; i < this.rules.length; i++) {{
            const rule: Parser.Tuple = this.rules[i];
            const head: number = rule.head;
            const rhs: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(rule.rhs.length);
            for(let j: number = 0; j < rhs.length; j++) {{
                rhs[rhs.length - j - 1] = rule.rhs[j];
            };}
            ret[i] = new Parser.Tuple(this, head, rhs);
        };}
        return ret;
    }

    public swapRules(rule2: string, rule3: string) {
        const rule2Tokens: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(rule2, false, LexerToken.TEST_$LI$());
        const rule3Tokens: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(rule3, false, LexerToken.TEST_$LI$());
        let t2: Parser.Tuple = null;
        let i2: number = -1;
        let t3: Parser.Tuple = null;
        let i3: number = -1;
        for(let i: number = 0; i < this.rules.length; i++) {{
            const t: Parser.Tuple = this.rules[i];
            if (i2 === -1 && this.matchesRule(t, rule2Tokens)){
                t2 = t;
                i2 = i;
            }
            if (i3 === -1 && this.matchesRule(t, rule3Tokens)){
                t3 = t;
                i3 = i;
            }
            if (i2 !== -1 && i3 !== -1)break;
        };}
        if (i2 === -1 || i3 === -1)throw Object.defineProperty(new Error("Cannot swap rules; missing rule: " + (i2 === -1 ? rule2 : rule3)), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        this.rules[i2] = t3;
        this.rules[i3] = t2;
    }

    matchesRule(t: Parser.Tuple, tokens: Array<LexerToken>): boolean {
        if (/* size */(<number>tokens.length) !== t.rhs.length + 3)return false;
        if (!(this.allSymbols[t.head] === /* get */tokens[0].content) || !(":" === /* get */tokens[1].content))return false;
        for(let r: number = 0; r < t.rhs.length; r++) {{
            if (!(this.allSymbols[t.rhs[r]] === /* get */tokens[r + 2].content))return false;
        };}
        return ";" === /* get */tokens[/* size */(<number>tokens.length) - 1].content;
    }

    /**
     * Inline the parse tree nodes with the payload
     * @param {number} symbol   -- node payload
     * @return
     * @return {boolean}
     */
    public isAuxNode(symbol: number): boolean {
        return false;
    }

    /**
     * @param {number} rule
     * @param {number} pos
     * @param {Parser.Tuple} t -- redundant, used to order/index cell context by the active rule variable
     * @return
     * @return {number}
     */
    static makeMatrixCellElem(rule: number, pos: number, t: Parser.Tuple): number {
        let activeVar: number = 0;
        if (pos < t.rhs.length)activeVar = (n => n<0?Math.ceil(n):Math.floor(n))(<number>t.rhs[pos]);
        // Java packs these fields into a signed 64-bit long. JavaScript bitwise
        // operators truncate to 32 bits, so keep the same sortable layout with
        // exact Number arithmetic (grammar symbol, rule, then dot position).
        return activeVar * 0x1_0000_0000 + rule * 0x1_0000 + pos;
    }

    public static ruleFromEarleyCell(code: number): number {
        return Math.floor(code / 0x1_0000) % 0x1_0000;
    }

    public static posFromEarleyCell(code: number): number {
        return code % 0x1_0000;
    }

    public static activeVarFromEarleyCell(code: number): number {
        return Math.floor(code / 0x1_0000_0000);
    }
}
Parser["__class"] = "oracle.dbtools.parser.Parser";


export namespace Parser {

    /**
     * Same as RuleTuple but with more efficient encoding of grammar symbols as int rather than String
     * @param {number} h
     * @param {int[]} r
     * @class
     */
    export class Tuple {
        public __parent: any;
        public head: number;

        public rhs: number[];

        public constructor(__parent: any, h: number, r: number[]) {
            this.__parent = __parent;
            if (this.head === undefined) { this.head = 0; }
            if (this.rhs === undefined) { this.rhs = null; }
            this.head = h;
            this.rhs = r;
        }

        public size(): number {
            return this.rhs.length;
        }

        public content(i: number): number {
            return this.rhs[i];
        }

        public equals(obj: any): boolean {
            return (this === obj) || ((obj != null && obj instanceof <any>Parser.Tuple) && this.compareTo(<Parser.Tuple>obj) === 0);
        }

        public hashCode(): number {
            throw Object.defineProperty(new Error("hashCode inconsistent with equals"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        }

        public compareTo(src: Parser.Tuple): number {
            if (this.head === 0 || src.head === 0)throw Object.defineProperty(new Error("head==0 || src.head==0"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
            let cmp: number = this.head - src.head;
            if (cmp !== 0)return cmp;
            cmp = this.rhs.length - src.rhs.length;
            if (cmp !== 0)return cmp;
            for(let i: number = 0; i < this.rhs.length; i++) {{
                cmp = this.rhs[i] - src.rhs[i];
                if (cmp !== 0)return cmp;
            };}
            return 0;
        }

        public toString$(): string {
            const s: { str: string, toString: Function } = { str: this.__parent.allSymbols[this.head] + ":", toString: function() { return this.str; } };
            for(let index = 0; index < this.rhs.length; index++) {
                let i = this.rhs[index];
                /* append */(sb => { sb.str += <any>"  " + this.__parent.allSymbols[i]; return sb; })(s)
            }
            /* append */(sb => { sb.str += <any>";"; return sb; })(s);
            return /* toString */s.str;
        }

        public toString$int(pos: number): string {
            const s: { str: string, toString: Function } = { str: this.__parent.allSymbols[this.head] + ":", toString: function() { return this.str; } };
            for(let i: number = 0; i < this.rhs.length; i++) {{
                /* append */(sb => { sb.str += <any>' '; return sb; })(s);
                if (pos === i)/* append */(sb => { sb.str += <any>'!'; return sb; })(s);
                /* append */(sb => { sb.str += <any>this.__parent.allSymbols[this.rhs[i]]; return sb; })(s);
            };}
            if (pos === this.rhs.length)/* append */(sb => { sb.str += <any>'!'; return sb; })(s);
            /* append */(sb => { sb.str += <any>";"; return sb; })(s);
            return /* toString */s.str;
        }

        public toString(pos?: any): string {
            if (((typeof pos === 'number') || pos === null)) {
                return <any>this.toString$int(pos);
            } else if (pos === undefined) {
                return <any>this.toString$();
            } else throw new Error('invalid overload');
        }
    }
    Tuple["__class"] = "oracle.dbtools.parser.Parser.Tuple";


    export class EarleyCell implements Cell {
        public __parent: any;
        public content: number[];

        __size: number;

        public constructor(__parent: any, content?: any) {
            if (((content != null && content instanceof <any>Array && (content.length == 0 || content[0] == null ||(typeof content[0] === 'number'))) || content === null)) {
                let __args = Array.prototype.slice.call(arguments, 1);
                this.__parent = __parent;
                this.content = null;
                this.__size = 0;
                this.content = content;
                if (content != null)this.__size = content.length;
            } else if (content === undefined) {
                let __args = Array.prototype.slice.call(arguments, 1);
                this.__parent = __parent;
                this.content = null;
                this.__size = 0;
            } else throw new Error('invalid overload');
        }

        /**
         * 
         * @param {number} index
         * @return {number}
         */
        public getRule(index: number): number {
            return Parser.ruleFromEarleyCell(this.content[index]);
        }

        /**
         * 
         * @param {number} index
         * @return {number}
         */
        public getPosition(index: number): number {
            return Parser.posFromEarleyCell(this.content[index]);
        }

        /**
         * 
         * @return {number}
         */
        public size(): number {
            return this.__size;
        }

        /**
         * 
         * @return {long[]}
         */
        public getContent(): number[] {
            return this.content;
        }

        /**
         * 
         * @param {number} value
         */
        public insertContent(value: number) {
            if (this.content == null || this.__size === 0){
                this.content = [0];
                this.content[0] = value;
                this.__size = 1;
                return;
            }
            const index: number = JArray.indexOf$long_A$int$int$long(this.content, 0, this.__size, value);
            if (index < this.__size && this.content[index] === value)return;
            let ret: number[] = this.content;
            if (this.content.length === this.__size){
                ret = (s => { let a=[]; while(s-->0) a.push(0); return a; })(2 * this.__size);
                for(let i: number = 0; i < index; i++) {{
                    ret[i] = this.content[i];
                };}
            }
            for(let i: number = this.__size; index + 1 <= i; i--) {{
                ret[i] = this.content[i - 1];
            };}
            ret[index] = value;
            this.content = ret;
            this.__size++;
        }

        public merge(addendum: number[]) {
            if (addendum == null)return;
            if (this.content == null){
                this.content = addendum;
                this.__size = addendum.length;
                return;
            }
            const m: number = this.__size;
            const n: number = addendum.length;
            {
                let ci: number = 0;
                let ai: number = 0;
                while((ai < n && ci < m)) {{
                    if (this.content[ci] < addendum[ai])ci++; else if (this.content[ci] === addendum[ai]){
                        ci++;
                        ai++;
                    } else break;
                }};
                if (ai >= n)return;
            };
            const required: number = m + n;
            if (this.content.length >= required)this.__size = this.mergeInPlace(addendum, m, n); else this.__size = this.mergeWithAlloc(addendum, m, n, required);
        }

        mergeInPlace(addendum: number[], m: number, n: number): number {
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(this.content, 0, this.content, n, m);
            let i: number = n;
            let j: number = 0;
            let k: number = 0;
            const iEnd: number = n + m;
            while((i < iEnd && j < n)) {{
                if (this.content[i] === addendum[j]){
                    this.content[k++] = this.content[i++];
                    j++;
                } else if (this.content[i] < addendum[j]){
                    this.content[k++] = this.content[i++];
                } else {
                    this.content[k++] = addendum[j++];
                }
            }};
            if (i < iEnd){
                for(let p: number = i; p < iEnd; p++) {this.content[k++] = this.content[p];}
            } else {
                for(let p: number = j; p < n; p++) {this.content[k++] = addendum[p];}
            }
            return k;
        }

        mergeWithAlloc(addendum: number[], m: number, n: number, required: number): number {
            const tmp: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(Math.max(required, m * 2));
            let i: number = 0;
            let j: number = 0;
            let k: number = 0;
            while((i < m && j < n)) {if (this.content[i] === addendum[j]){
                tmp[k++] = this.content[i++];
                j++;
            } else if (this.content[i] < addendum[j])tmp[k++] = this.content[i++]; else tmp[k++] = addendum[j++];};
            if (i < m){
                for(let p: number = i; p < m; p++) {{
                    tmp[k++] = this.content[p];
                };}
            } else {
                for(let p: number = j; p < n; p++) {{
                    tmp[k++] = addendum[p];
                };}
            }
            this.content = tmp;
            return k;
        }

        /**
         * 
         * @return {string}
         */
        public toString(): string {
            const sb: { str: string, toString: Function } = { str: "{ ", toString: function() { return this.str; } };
            for(let i: number = 0; i < this.size(); i++) {{
                if (0 < i)/* append */(sb => { sb.str += <any>"\n"; return sb; })(sb);
                const t: Parser.Tuple = this.__parent.rules[this.getRule(i)];
                /* append */(sb => { sb.str += <any>t.toString$int(this.getPosition(i)); return sb; })(sb);
            };}
            /* append */(sb => { sb.str += <any>" }"; return sb; })(sb);
            return /* toString */sb.str;
        }
    }
    EarleyCell["__class"] = "oracle.dbtools.parser.Parser.EarleyCell";
    EarleyCell["__interfaces"] = ["oracle.dbtools.parser.Cell"];


}




import { Cell } from './Cell.js';


import { Lexer } from './Lexer.js';


import { LeafNode } from './LeafNode.js';


import { Matrix } from './Matrix.js';


import { LexerToken } from './LexerToken.js';


import { ParseNode } from './ParseNode.js';


import { RuleTuple } from './RuleTuple.js';

