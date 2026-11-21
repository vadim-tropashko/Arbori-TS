/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Array as JArray } from '../../arbori/util/Array.js';
import { IntegerMap } from '../../arbori/util/IntegerMap.js';
import { Parser } from './Parser.js';
import { Token } from './Token.js';
import { Cell } from './Cell.js';
import { ParseNode } from './ParseNode.js';
import { ParsingCancelled } from './ParsingCancelled.js';
import { Matrix } from './Matrix.js';
import { LexerToken } from './LexerToken.js';
import { Yelrae } from './Yelrae.js';
import { BitSet } from './BitSet.js';

const PAIR_BASE = 0x1_0000_0000;
const encodePair = (x: number, y: number): number => y * PAIR_BASE + (x >>> 0);
const pairY = (pair: number): number => Math.floor(pair / PAIR_BASE);
const pairX = (pair: number): number => pair >>> 0;
const addPairY = (pair: number, y: number): number => pair + y * PAIR_BASE;

/**
 * Instantiate parser
 * @param {RuleTuple[]} originalRules -- grammar
 * @class
 * @extends Parser
 * @author Dim
 */
export class Earley extends Parser {
    public static readonly __class = "oracle.dbtools.parser.Earley";
    public identifier: number;

    string_literal: number;

    digits: number;

    public isCaseSensitive: boolean;

    /*private*/ yelrae: Yelrae | null;

    initCell00(src: Array<LexerToken>, matrix: Matrix) {
        let t1: number = 0;
        if (matrix.visual != null)t1 = /* nanoTime */(Date.now() * 1000000);
        let buffer: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(64);
        let bufSize: number = 0;
        for(let i: number = 0; i < this.rules.length; i++) {{
            const t: Parser.Tuple = this.rules[i];
            const head: string = this.allSymbols[t.head];
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(head.charAt(head.length - 1)) != ')'.charCodeAt(0)){
                if (bufSize === buffer.length)buffer = /* copyOf */buffer.slice(0,buffer.length * 2);
                buffer[bufSize++] = Parser.makeMatrixCellElem(i, 0, t);
            }
        };}
        /* sort */((arr, start, end, f?) => ((arr1, arr2) => arr1.splice.apply(arr1, (<any[]>[start, arr2.length]).concat(arr2)))(buffer, buffer.slice(start, end).sort(f)))(buffer, 0, bufSize, (a, b) => a - b);
        const content: number[] = /* copyOf */buffer.slice(0,bufSize);
        matrix.initCells(/* size */(<number>src.length));
        matrix.put(0, 0, new Parser.EarleyCell(this, content));
        matrix.allXs = JArray.insert$int_A$int(matrix.allXs, 0);
        if (matrix.visual != null){
            const t2: number = /* nanoTime */(Date.now() * 1000000);
            matrix.visual.visited[0][0] += (<number>(t2 - t1)|0);
        }
    }

    public parse$java_util_List$oracle_dbtools_parser_Matrix(src: Array<LexerToken>, m: Matrix) {
        try {
            this.doParse(src, m);
        } catch(e) {
            throw new Error("doParse(...) has been interrupted with earley.stop=true", { cause: e });
        }
    }

    public parse(src?: any, m?: any) {
        if (((src != null && (src instanceof Array)) || src === null) && ((m != null && m instanceof <any>Matrix) || m === null)) {
            return <any>this.parse$java_util_List$oracle_dbtools_parser_Matrix(src, m);
        } else if (((src != null && (src instanceof Array)) || src === null) && m === undefined) {
            return <any>this.parse$java_util_List(src);
        } else throw new Error('invalid overload');
    }

    /**
     * principal recognition phase combining essential Earley parsing steps: scan, complete, predict
     * @param {LexerToken[]} src -- output of lexical analysis
     * @param matrix -- parser output
     * @throws ParsingCancelled
     * @param {Matrix} m
     */
    public doParse(src: Array<LexerToken>, m: Matrix) {
        if (/* size */(<number>src.length) === 0)return;
        this.__stop = false;
        const matrix: Matrix = <Matrix>m;
        this.precomputePredictions();
        this.initCell00(src, matrix);
        this.predict$oracle_dbtools_parser_Matrix$java_util_List(matrix, src);
        while((true)) {{
            if (this.__stop){
                this.__stop = false;
                throw new ParsingCancelled();
            }
            if (!this.scan$oracle_dbtools_parser_Matrix$java_util_List(matrix, src))break;
            let lookahead: string | null = null;
            if (matrix.lastY() < /* size */(<number>src.length) - 2)lookahead = /* get */src[matrix.lastY()].content.toUpperCase();
            this.complete(matrix, src);
            this.predict$oracle_dbtools_parser_Matrix$java_util_List(matrix, src);
        }};
    }

    __stop: boolean;

    public stop() {
        this.__stop = true;
    }

    public parse$java_util_List(src: Array<LexerToken>): ParseNode {
        const matrix: Matrix = new Matrix(this);
        try {
            this.doParse(src, matrix);
        } catch(e) {
            throw new Error("doParse(...) has been interrupted with earley.stop=true", { cause: e });
        }
        return this.forest$java_util_List$oracle_dbtools_parser_Matrix(src, matrix);
    }

    public constructor(originalRules?: any) {
        if (((originalRules != null && (originalRules instanceof Array)) || originalRules === null)) {
            let __args = arguments;
            super(originalRules);
            this.identifier = -1;
            this.string_literal = -1;
            this.digits = -1;
            this.isCaseSensitive = false;
            this.yelrae = null;
            this.__stop = false;
            this.terminalPredictions = null;
            this.predicts = null;
            this.skipRanges = true;
            this.initializeGrammarSymbols();
        } else if (originalRules === undefined) {
            let __args = arguments;
            super();
            this.identifier = -1;
            this.string_literal = -1;
            this.digits = -1;
            this.isCaseSensitive = false;
            this.yelrae = null;
            this.__stop = false;
            this.terminalPredictions = null;
            this.predicts = null;
            this.skipRanges = true;
        } else throw new Error('invalid overload');
    }

    initializeGrammarSymbols() {
        this.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "identifier");
        try {
            this.string_literal = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "string_literal");
        } catch(e) {
        }
        try {
            this.digits = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "digits");
        } catch(e) {
        }
    }

    getYelrae(): Yelrae {
        if (this.yelrae != null)return this.yelrae;
        let copy: Earley = this.copyForYelrae();
        if (copy == null)copy = this.serializedCopyForYelrae();
        copy.predicts = null;
        copy.terminalPredictions = null;
        this.yelrae = new Yelrae(copy);
        return this.yelrae;
    }

    copyForYelrae(): Earley | null {
        return Object.assign(Object.create(Object.getPrototypeOf(this)) as Earley, this);
    }

    serializedCopyForYelrae(): Earley {
        const copy = this.copyForYelrae();
        if (copy == null) throw new Error("Unable to copy parser for reverse recognition");
        return copy;
    }

    terminalPredictions: Earley.PredictedTerminals[];

    public predicts: number[][] | null;

    precomputePredictions() {
        if (this.predicts != null){
            return;
        }
        this.predicts = new Array<number[]>(this.allSymbols.length);
        const ruleEncoding: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.rules.length);
        for(let i: number = 0; i < this.rules.length; i++) {ruleEncoding[i] = Parser.makeMatrixCellElem(i, 0, this.rules[i]);}
        const closureBits: Array<BitSet | null> = new Array(this.allSymbols.length).fill(null);
        const symbolHead2rulesBits: Array<BitSet | null> = new Array(this.allSymbols.length).fill(null);
        for(let i: number = 0; i < this.rules.length; i++) {{
            const head: number = this.rules[i].head;
            if (closureBits[head] == null){
                closureBits[head] = new BitSet(this.allSymbols.length);
                symbolHead2rulesBits[head] = new BitSet(this.rules.length);
            }
            closureBits[head].set(this.rules[i].rhs[0]);
            symbolHead2rulesBits[head].set(i);
        };}
        for(let mid: number = 0; mid < this.allSymbols.length; mid++) {{
            const midBs: BitSet = closureBits[mid];
            if (midBs == null)continue;
            for(let k: number = 0; k < this.allSymbols.length; k++) {{
                const kBs: BitSet = closureBits[k];
                if (kBs != null && kBs.get(mid))kBs.or(midBs);
            };}
        };}
        this.terminalPredictions = new Array<Earley.PredictedTerminals>(this.allSymbols.length);
        for(let k: number = 0; k < this.allSymbols.length; k++) {{
            const kClosure: BitSet = closureBits[k];
            if (kClosure == null)continue;
            const accum: BitSet = new BitSet(this.rules.length);
            accum.or(symbolHead2rulesBits[k]);
            for(let n: number = kClosure.nextSetBit(0); n >= 0; n = kClosure.nextSetBit(n + 1)) {{
                const nRules: BitSet = symbolHead2rulesBits[n];
                if (nRules != null)accum.or(nRules);
                const rhs0: string = this.allSymbols[n];
                if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(rhs0.charAt(0)) == '\''.charCodeAt(0)){
                    if (this.terminalPredictions[k] == null)this.terminalPredictions[k] = new Earley.PredictedTerminals(this.allSymbols);
                    this.terminalPredictions[k].add(n);
                    continue;
                }
                if (n === this.identifier || n === this.digits || n === this.string_literal){
                    if (this.terminalPredictions[k] == null)this.terminalPredictions[k] = new Earley.PredictedTerminals(this.allSymbols);
                    this.terminalPredictions[k].invalidate();
                }
            };}
            const tmp: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(accum.cardinality());
            let idx: number = 0;
            for(let bit: number = accum.nextSetBit(0); bit >= 0; bit = accum.nextSetBit(bit + 1)) {tmp[idx++] = ruleEncoding[bit];}
            /* sort */((l) => {l.sort((a, b) => a - b); })(tmp);
            this.predicts[k] = tmp;
        };}
    }

    scan$oracle_dbtools_parser_Matrix$java_util_List(matrix: Matrix, src: Array<LexerToken>): boolean {
        const y: number = matrix.lastY();
        if (/* size */(<number>src.length) <= y){
            return false;
        }
        const token: LexerToken = /* get */src[y];
        const suspect: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'" + (this.isCaseSensitive ? token.content : token.content.toUpperCase()) + "\'");
        let ret: boolean = false;
        for(let i: number = matrix.allXs.length - 1; 0 <= i; i--) {{
            const x: number = matrix.allXs[i];
            if (this.scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer(matrix, y, src, x, suspect))ret = true;
        };}
        if (this.scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer(matrix, y, src, y, suspect))ret = true;
        return ret;
    }

    public scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer(matrix: Matrix, y: number, src: Array<LexerToken>, x: number, suspect: number): boolean {
        let t1: number = 0;
        if (matrix.visual != null)t1 = /* nanoTime */(Date.now() * 1000000);
        const candidateRules: Cell = matrix.get(x, y);
        if (candidateRules == null)return false;
        let lookahead: string | null = null;
        if (y < /* size */(<number>src.length) - 2)lookahead = /* get */src[y + 1].content.toUpperCase();
        let buffer: number[] | null = null;
        let bufSize: number = 0;
        for(let j: number = 0; j < candidateRules.size(); j++) {{
            const pos: number = candidateRules.getPosition(j);
            const ruleNo: number = candidateRules.getRule(j);
            const t: Parser.Tuple = this.rules[ruleNo];
            if (t.size() - 1 < pos)continue;
            if (this.isScannedSymbol(y, src, pos, t, suspect)){
                if (pos < t.size() - 2 && !this.lookaheadOK(t.rhs[pos + 1], lookahead))continue;
                if (buffer == null)buffer = (s => { let a=[]; while(s-->0) a.push(0); return a; })(16); else if (bufSize === buffer.length)buffer = /* copyOf */buffer.slice(0,buffer.length * 2);
                buffer[bufSize++] = Parser.makeMatrixCellElem(ruleNo, pos + 1, t);
                if (t.rhs.length === pos + 1)matrix.enqueue(encodePair(x, t.head));
            }
        };}
        if (matrix.visual != null){
            const t2: number = /* nanoTime */(Date.now() * 1000000);
            matrix.visual.visited[x][y + 1] += (<number>(t2 - t1)|0);
        }
        if (buffer == null)return false;
        /* sort */((arr, start, end, f?) => ((arr1, arr2) => arr1.splice.apply(arr1, (<any[]>[start, arr2.length]).concat(arr2)))(buffer, buffer.slice(start, end).sort(f)))(buffer, 0, bufSize, (a, b) => a - b);
        const content: number[] = (bufSize === buffer.length) ? buffer : /* copyOf */buffer.slice(0,bufSize);
        matrix.put(x, y + 1, new Parser.EarleyCell(this, content));
        matrix.allXs = JArray.insert$int_A$int(matrix.allXs, x);
        return true;
    }

    public scan(matrix?: any, y?: any, src?: any, x?: any, suspect?: any): boolean {
        if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof y === 'number') || y === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof x === 'number') || x === null) && ((typeof suspect === 'number') || suspect === null)) {
            return <any>this.scan$oracle_dbtools_parser_Matrix$int$java_util_List$int$java_lang_Integer(matrix, y, src, x, suspect);
        } else if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((y != null && (y instanceof Array)) || y === null) && src === undefined && x === undefined && suspect === undefined) {
            return <any>this.scan$oracle_dbtools_parser_Matrix$java_util_List(matrix, y);
        } else throw new Error('invalid overload');
    }

    isScannedSymbol(y: number, src: Array<LexerToken>, pos: number, t: Parser.Tuple, suspect: number): boolean {
        const symbol: number = t.content(pos);
        const token: LexerToken = /* get */src[y];
        if (symbol === this.digits && token.type === Token.DIGITS)return true;
        if (symbol === this.string_literal && token.type === Token.QUOTED_STRING)return true;
        return suspect != null && suspect === symbol || this.isIdentifier(y, src, symbol, suspect);
    }

    isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
        if (symbol !== this.identifier)return false;
        const token: LexerToken = /* get */src[y];
        return token.type === Token.IDENTIFIER;
    }

    notConfusedAsId(symbol: number, head: number, pos: number): boolean {
        return true;
    }

    public predict$oracle_dbtools_parser_Matrix$java_util_List(matrix: Matrix, src: Array<LexerToken>) {
        let t1: number = 0;
        if (matrix.visual != null)t1 = /* nanoTime */(Date.now() * 1000000);
        const y: number = matrix.lastY();
        let lookahead: string | null = null;
        let LAsuspect: number | null = null;
        if (y + 2 < /* size */(<number>src.length)){
            lookahead = /* get */src[y].content.toUpperCase();
            LAsuspect = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'" + lookahead + "\'");
        }
        let cell: Parser.EarleyCell = <Parser.EarleyCell>matrix.get(y, y);
        if (cell == null){
            cell = new Parser.EarleyCell(this);
        }
        const symbolBits: BitSet = new BitSet(this.allSymbols.length);
        const xRange: IntegerMap = matrix.getXRange(y);
        {
            let array = xRange.keySet();
            for(let index = 0; index < array.length; index++) {
                let mid = array[index];
                {
                    const candidateRules: Cell = matrix.get(mid, y);
                    for(let j: number = 0; j < candidateRules.size(); j++) {{
                        const pos: number = candidateRules.getPosition(j);
                        const ruleNo: number = candidateRules.getRule(j);
                        const t: Parser.Tuple = this.rules[ruleNo];
                        if (t.size() <= pos)continue;
                        const symbol: number = t.content(pos);
                        symbolBits.set(symbol);
                    };}
                }
            }
        }
        for(let symbol: number = symbolBits.nextSetBit(0); symbol >= 0; symbol = symbolBits.nextSetBit(symbol + 1)) {{
            if (LAsuspect != null){
                const terminal: Earley.PredictedTerminals = this.terminalPredictions[symbol];
                if (terminal != null)if (!terminal.matches(LAsuspect))continue;
            }
            const ls: number[] = this.predicts[symbol];
            this.merge(cell, ls, matrix, lookahead);
        };}
        if (matrix.visual != null){
            const t2: number = /* nanoTime */(Date.now() * 1000000);
            matrix.visual.visited[y][y] += (<number>(t2 - t1)|0);
        }
        if (cell.size() > 0)matrix.put(y, y, cell); else return;
    }

    public predict(matrix?: any, src?: any) {
        if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((src != null && (src instanceof Array)) || src === null)) {
            return <any>this.predict$oracle_dbtools_parser_Matrix$java_util_List(matrix, src);
        } else if (((typeof matrix === 'number') || matrix === null) && ((src != null && src instanceof <any>Matrix) || src === null)) {
            return <any>this.predict$int$oracle_dbtools_parser_Matrix(matrix, src);
        } else throw new Error('invalid overload');
    }

    merge(cell: Parser.EarleyCell, ls: number[], m: Matrix, lookahead: string) {
        cell.merge(ls);
    }

    public skipRanges: boolean;

    complete(matrix: Matrix, src: Array<LexerToken>) {
        let lookahead: string | null = null;
        if (matrix.lastY() < /* size */(<number>src.length) - 2)lookahead = /* get */src[matrix.lastY()].content.toUpperCase();
        const skipIntervals: any = <any>({});
        while((true)) {{
            const completionCandidate: number = matrix.dequeue();
            if (completionCandidate === -1)break;
            const symbol: number = pairY(completionCandidate);
            const mid: number = pairX(completionCandidate);
            const y: number = matrix.lastY();
            let indexX: number = JArray.indexOf$int_A$int(matrix.allXs, mid);
            if (matrix.allXs.length - 1 < indexX)indexX = matrix.allXs.length - 1;
            // indexOf returns the insertion point. When every retained origin
            // is to the right of this completion's midpoint, there are no
            // predecessor columns to inspect and the loop below should be empty.
            if (indexX >= 0 && mid < matrix.allXs[indexX])indexX--;
            for(let i: number = indexX; 0 <= i; i--) {{
                const x: number = matrix.allXs[i];
                let skipTo: number = y;
                let t1: number = 0;
                if (matrix.visual != null)t1 = /* nanoTime */(Date.now() * 1000000);
                const pres: Parser.EarleyCell = matrix.get(x, mid);
                if (pres == null){
                    if (matrix.visual != null){
                        const t2: number = /* nanoTime */(Date.now() * 1000000);
                        matrix.visual.visited[x][y] = addPairY(matrix.visual.visited[x][y], (<number>(t2 - t1)|0));
                    }
                    continue;
                }
                const mask: number = symbol * 0x1_0000_0000;
                const start: number = JArray.indexOf$long_A$int$int$long(pres.getContent(), 0, pres.size() - 1, mask);
                const stop: number = JArray.indexOf$long_A$int$int$long(pres.getContent(), 0, pres.size() - 1, mask + 0xffff_ffff) + 1;
                let content: Parser.EarleyCell = <Parser.EarleyCell>matrix.get(x, y);
                for(let ii: number = start; ii < stop && ii < pres.size(); ii++) {{
                    const dotPre: number = pres.getPosition(ii);
                    const rulePre: number = pres.getRule(ii);
                    const tPre: Parser.Tuple = this.rules[rulePre];
                    if (tPre.size() === dotPre)continue;
                    const symPre: number = tPre.content(dotPre);
                    if (symPre !== symbol)continue;
                    if (dotPre < tPre.size() - 2 && !this.lookaheadOK(tPre.rhs[dotPre + 1], lookahead))continue;
                    if (content == null)content = new Parser.EarleyCell(this);
                    const promotedRule: number = Parser.makeMatrixCellElem(rulePre, dotPre + 1, tPre);
                    const before: number = content.size();
                    if (this.isCompletable(rulePre, src, x, mid, y))content.insertContent(promotedRule);
                    const after: number = content.size();
                    if (before < after){
                        matrix.put(x, y, content);
                        if (this.skipRanges && x + 3 < y && tPre.rhs.length === dotPre + 1 && x < mid && mid < skipTo && this.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tPre, symPre, mid, y) && this.isOptimizable$java_util_List$int$int$int(src, x, mid, y)){
                            skipTo = mid;
                        }
                    }
                    if (tPre.size() === dotPre + 1 && before < after){
                        matrix.enqueue(encodePair(x, tPre.head));
                    }
                };}
                if (matrix.visual != null){
                    const t2: number = /* nanoTime */(Date.now() * 1000000);
                    matrix.visual.visited[x][y] = addPairY(matrix.visual.visited[x][y], (<number>(t2 - t1)|0));
                }
                if (this.skipRanges && x < skipTo && skipTo < y){
                    const predecessor: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>skipIntervals, x + 1);
                    if (predecessor == null || skipTo < predecessor)/* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>skipIntervals, x + 1, skipTo);
                }
            };}
        }};
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>skipIntervals);
            for(let index = 0; index < array.length; index++) {
                let x = array[index];
                {
                    const y: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>skipIntervals, x);
                    if (x < y)matrix.allXs = JArray.delete$int_A$int$int(matrix.allXs, x, y);
                }
            }
        }
    }

    isCompletable(rulePre: number, src: Array<LexerToken>, x: number, mid: number, y: number): boolean {
        return true;
    }

    public isOptimizable$java_util_List$int$int$int(src: Array<LexerToken>, x: number, mid: number, y: number): boolean {
        return true;
    }

    public isOptimizable(src?: any, x?: any, mid?: any, y?: any): boolean {
        if (((src != null && (src instanceof Array)) || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$java_util_List$int$int$int(src, x, mid, y);
        } else if (((src != null && src instanceof <any>Parser.Tuple) || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(src, x, mid, y);
        } else if (((typeof src === 'number') || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$int$int$int$int(src, x, mid, y);
        } else throw new Error('invalid overload');
    }

    isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple: Parser.Tuple, preSym: number, mid: number, y: number): boolean {
        return this.isOptimizable$int$int$int$int(tuple.head, preSym, mid, y);
    }

    isOptimizable$int$int$int$int(headSym: number, preSym: number, mid: number, y: number): boolean {
        return (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.allSymbols[headSym].charAt(0)) != '\"'.charCodeAt(0) && (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.allSymbols[preSym].charAt(0)) != '\"'.charCodeAt(0);
    }

    lookaheadOK(symbol: number, lookahead: string): boolean {
        return true;
    }

    toHtml(ruleNo: number, pos: number, selected: boolean, x: number, mid: number, y: number, matrix: Matrix, sb: { str: string, toString: Function }) {
        const rule: Parser.Tuple = this.rules[ruleNo];
        let size: string = "+1";
        if (selected){
            /* append */(sb => { sb.str += <any>"<b>"; return sb; })(sb);
            size = "+2";
        }
        /* append */(sb => { sb.str += <any>"<font size=" + size + " color=blue>" + this.allSymbols[rule.head] + ":</font> "; return sb; })(sb);
        const greenish: string = "<font size=" + size + " bgcolor=rgb(150,200,150))>";
        const bluish: string = "<font size=" + size + " bgcolor=rgb(150,150,200))>";
        /* append */(sb => { sb.str += <any>greenish; return sb; })(sb);
        for(let i: number = 0; i < rule.rhs.length; i++) {{
            if (pos === i)/* append */(sb => { sb.str += <any>"</font>" + bluish; return sb; })(sb);
            /* append */(sb => { sb.str += <any>this.allSymbols[rule.rhs[i]] + " "; return sb; })(sb);
        };}
        /* append */(sb => { sb.str += <any>"</font>"; return sb; })(sb);
        if (selected)/* append */(sb => { sb.str += <any>"</b>"; return sb; })(sb);
        if (mid === -1)return;
        if (selected && x + y !== 0){
            if (mid < x || x === y){
                /* append */(sb => { sb.str += <any>"<i> predict from </i>"; return sb; })(sb);
                const bc: Cell = matrix.get(mid, y);
                for(let j: number = 0; j < bc.size(); j++) {{
                    const bp: number = bc.getPosition(j);
                    const br: number = bc.getRule(j);
                    const bt: Parser.Tuple = this.rules[br];
                    if (bp < bt.rhs.length && bt.rhs[bp] === rule.head){
                        this.toHtml(br, bp, false, -1, -1, -1, null, sb);
                        return;
                    }
                };}
            } else if (y < mid){
                /* append */(sb => { sb.str += <any>"<i> scan from </i>"; return sb; })(sb);
                const bc: Cell = matrix.get(x, y - 1);
                for(let j: number = 0; j < bc.size(); j++) {{
                    const bp: number = bc.getPosition(j);
                    const br: number = bc.getRule(j);
                    const bt: Parser.Tuple = this.rules[br];
                    if (br === ruleNo && bp + 1 === pos){
                        this.toHtml(br, bp, false, -1, -1, -1, null, sb);
                        return;
                    }
                };}
            } else {
                /* append */(sb => { sb.str += <any>"<i> complete from </i>"; return sb; })(sb);
                let secondTime: boolean = false;
                const pre: Cell = matrix.get(x, mid);
                const post: Cell = matrix.get(mid, y);
                for(let i: number = 0; i < pre.size(); i++) {for(let j: number = 0; j < post.size(); j++) {{
                    const dotPre: number = pre.getPosition(i);
                    const dotPost: number = post.getPosition(j);
                    const rulePre: number = pre.getRule(i);
                    const rulePost: number = post.getRule(j);
                    const tPre: Parser.Tuple = this.rules[rulePre];
                    const tPost: Parser.Tuple = this.rules[rulePost];
                    if (tPre.size() !== dotPre && tPost.size() !== dotPost)continue;
                    if (tPost.size() === dotPost){
                        if (rulePre !== ruleNo)continue;
                        if (dotPre + 1 !== pos)continue;
                        const symPre: number = tPre.content(dotPre);
                        if (symPre !== tPost.head)continue;
                        if (secondTime)/* append */(sb => { sb.str += <any>"<b> or </b>"; return sb; })(sb);
                        this.toHtml(rulePre, dotPre, false, -1, -1, -1, null, sb);
                        /* append */(sb => { sb.str += <any>"<i> and </i>"; return sb; })(sb);
                        this.toHtml(rulePost, dotPost, false, -1, -1, -1, null, sb);
                        secondTime = true;
                    }
                };};}
            }
        }
    }

    public toString(ruleNo: number, pos: number, sb: { str: string, toString: Function }) {
        const rule: Parser.Tuple = this.rules[ruleNo];
        /* append */(sb => { sb.str += <any>rule.toString$int(pos); return sb; })(sb);
    }

    /**
     * Initialize Earley initial matrix cell with grammar symbols other than "sequence of statements"
     * e.g. when want to recognize SQL fragment such as group by clause
     * @param {Matrix} matrix
     * @param {int[]} heads
     * @param {number} pos
     * @param {string} lookahead
     */
    public initCell(matrix: Matrix, heads: number[], pos: number, lookahead: string) {
        const cell: Parser.EarleyCell = new Parser.EarleyCell(this);
        for(let i: number = 0; i < this.rules.length; i++) {{
            const t: Parser.Tuple = this.rules[i];
            for(let index = 0; index < heads.length; index++) {
                let h = heads[index];
                if (t.head === h){
                    cell.insertContent(Parser.makeMatrixCellElem(i, 0, t));
                    break;
                }
            }
        };}
        matrix.put(pos, pos, cell);
        matrix.allXs = JArray.insert$int_A$int(matrix.allXs, pos);
    }

    /**
     * 
     * @param {LexerToken[]} src
     * @param {Matrix} m
     * @param {Parser.EarleyCell} cell
     * @param {number} x
     * @param {number} y
     * @return {ParseNode}
     */
    public treeForACell(src: Array<LexerToken>, m: Matrix, cell: Parser.EarleyCell, x: number, y: number): ParseNode {
        let rule: number = -1;
        let pos: number = -1;
        for(let i: number = 0; i < cell.size(); i++) {{
            rule = cell.getRule(i);
            pos = cell.getPosition(i);
            if (this.rules[rule].rhs.length === pos)return this.tree(src, m, x, y, rule, pos);
        };}
        if (rule !== -1 && pos !== -1)return this.tree(src, m, x, y, rule, pos);
        return null;
    }

    /**
     * "select 10000 columns from table" (20005 tokens).
     * Recursive tree building method from the super class: 109 ms
     * (It throws StackOverflowException with default stack size).
     * Iterative method: 117-135 ms
     * Total parse time is 1.2 sec, so that regression is insignificant.
     * 
     * MscPreProccessTest (213089 tokens). Even though it is much larger than
     * previous example it doesn't throw StackOverflowException.
     * Recursive method from the super class: 630-664 ms
     * Iterative method: = 714-745 ms
     * Again, the regression is insignificant compared to total parse time (~7 sec).
     * @param {LexerToken[]} src
     * @param {Matrix} m
     * @param {number} X
     * @param {number} Y
     * @param {number} Rule
     * @param {number} Pos
     * @return {ParseNode}
     */
    tree(src: Array<LexerToken>, m: Matrix, X: number, Y: number, Rule: number, Pos: number): ParseNode {
        const invocations: Array<Earley.Invocation> = <any>([]);
        const stack: Array<Earley.Invocation> = <any>([]);
        const first: Earley.Invocation = new Earley.Invocation(this, X, Y, Rule, Pos, null, null);
        /* add */(stack.push(first)>0);
        OUTER: for(; ; ) {{
            if (/* size */(<number>stack.length) === 0)break;
            const current: Earley.Invocation = /* pop */stack.pop();
            /* add */(invocations.push(current)>0);
            const x: number = current.x;
            const y: number = current.y;
            const rule: number = current.rule;
            const pos: number = current.pos;
            const h: number = this.rules[rule].head;
            if (pos !== 0){
                const pre: Parser.EarleyCell = m.get(x, y - 1);
                if (pre != null){
                    const demotedRule: number = Parser.makeMatrixCellElem(rule, pos - 1, this.rules[rule]);
                    const indexOfDemotedRule: number = JArray.indexOf$long_A$int$int$long(pre.getContent(), 0, pre.size() - 1, demotedRule);
                    const ruleAtTheIndex: number = pre.content[indexOfDemotedRule];
                    if (ruleAtTheIndex === demotedRule){
                        const t: Parser.Tuple = this.rules[rule];
                        const token: LexerToken = /* get */src[y - 1];
                        const suspect: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.symbolIndexes, "\'" + (this.isCaseSensitive ? token.content : token.content.toUpperCase()) + "\'");
                        if (this.isScannedSymbol(y - 1, src, pos - 1, t, suspect)){
                            const branch: ParseNode = new ParseNode(y - 1, y, this.rules[rule].rhs[pos - 1], this);
                            if (x + 1 === y){
                                if (this.rules[rule].rhs.length === 1)branch.addContent$int(h);
                                current.node = branch;
                                continue OUTER;
                            }
                            let head: number = h;
                            if (pos !== this.rules[rule].rhs.length){
                                head = -1;
                            }
                            const ret: ParseNode = new ParseNode(x, y, head, this);
                            ret.rgt = branch;
                            ret.rgt.__parent = ret;
                            current.node = ret;
                            /* add */(stack.push(new Earley.Lft(this, x, y - 1, rule, pos - 1, current, null))>0);
                            continue OUTER;
                        }
                    }
                }
            }
            if (pos !== 0){
                const demotedRule: number = Parser.makeMatrixCellElem(rule, pos - 1, this.rules[rule]);
                const cellsAtY: IntegerMap = <IntegerMap>m.getXRange(y);
                {
                    let array = this.isAsc(h) ? cellsAtY.keySet() : cellsAtY.descendingKeySet();
                    for(let index = 0; index < array.length; index++) {
                        let mid = array[index];
                        {
                            const pre: Parser.EarleyCell = m.get(x, mid);
                            if (pre == null)continue;
                            const post: Parser.EarleyCell = m.get(mid, y);
                            if (post == null)continue;
                            if (pre.content[JArray.indexOf$long_A$int$int$long(pre.content, 0, pre.size() - 1, demotedRule)] === demotedRule){
                                for(let j: number = 0; j <= post.size() - 1; j++) {{
                                    const rJ: number = post.getRule(j);
                                    const pJ: number = post.getPosition(j);
                                    if (this.rules[rJ].rhs.length !== pJ)continue;
                                    if (this.rules[rJ].head !== this.rules[rule].rhs[pos - 1])continue;
                                    if (x !== mid){
                                        const ret: ParseNode = new ParseNode(x, y, this.rules[rule].rhs.length !== pos ? -1 : h, this);
                                        current.node = ret;
                                        /* add */(stack.push(new Earley.Lft(this, x, mid, rule, pos - 1, current, m.get(x, mid)))>0);
                                        /* add */(stack.push(new Earley.Rgt(this, mid, y, rJ, pJ, current, m.get(mid, y)))>0);
                                        continue OUTER;
                                    } else if (rJ !== rule || pJ !== pos){
                                        this.diagnose(m, x, y);
                                        /* add */(stack.push(new Earley.Ret(this, mid, y, rJ, pJ, current, m.get(x, y)))>0);
                                        continue OUTER;
                                    }
                                };}
                            }
                        }
                    }
                }
            }
            throw Object.defineProperty(new Error("unwind " + this.rules[rule].toString$int(pos) + " @[" + x + "," + y + ")"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        };}
        let current: Earley.Invocation | null = null;
        for (let i = invocations.length - 1; i >= 0; i--) {
            current = invocations[i];
            current.finish();
        }
        return current!.node;
    }

    diagnose(m: Matrix, x: number, y: number) {
    }

    public predict$int$oracle_dbtools_parser_Matrix(pos: number, matrix: Matrix): Array<number> {
        const predictions: Array<number> = <any>([]);
        for(let x: number = 0; x <= pos; x++) {{
            const cell: Cell = matrix.get(x, pos);
            if (cell != null){
                for(let i: number = 0; i < cell.size(); i++) {{
                    const rule: number = cell.getRule(i);
                    const p: number = cell.getPosition(i);
                    if (p < this.rules[rule].rhs.length){
                        const e: string = this.allSymbols[this.rules[rule].rhs[p]];
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(predictions, encodePair(this.rules[rule].rhs[p], this.rules[rule].head));
                    }
                };}
            }
        };}
        return predictions;
    }

    postprocess(ret: ParseNode, cell: Parser.EarleyCell) {
    }
}


export namespace Earley {

    export class PredictedTerminals {
        static serialVersionUID: number = 1;

        isValid: boolean;

        symbols: number[];

        symbolNames: string[];

        public constructor(symbolNames?: any) {
            if (((symbolNames != null && symbolNames instanceof <any>Array && (symbolNames.length == 0 || symbolNames[0] == null ||(typeof symbolNames[0] === 'string'))) || symbolNames === null)) {
                let __args = arguments;
                if (this.symbolNames === undefined) { this.symbolNames = null; } 
                this.isValid = true;
                this.symbols = null;
                this.symbolNames = symbolNames;
            } else if (symbolNames === undefined) {
                let __args = arguments;
                if (this.symbolNames === undefined) { this.symbolNames = null; } 
                this.isValid = true;
                this.symbols = null;
            } else throw new Error('invalid overload');
        }

        add(sym: number) {
            if (this.isValid)this.symbols = JArray.insert$int_A$int(this.symbols, sym); else this.invalidate();
        }

        invalidate() {
            this.symbols = null;
            this.isValid = false;
        }

        public matches(lookahead: number): boolean {
            if (!this.isValid)return true;
            if (this.symbols == null)return true;
            return lookahead != null && this.symbols[JArray.indexOf$int_A$int(this.symbols, lookahead)] === lookahead;
        }

        /**
         * 
         * @return {string}
         */
        public toString(): string {
            if (!this.isValid)return "*invalid*";
            if (this.symbols == null)return "*symbols == null*";
            const ret: { str: string, toString: Function } = { str: "{", toString: function() { return this.str; } };
            for(let index = 0; index < this.symbols.length; index++) {
                let s = this.symbols[index];
                {
                    /* append */(sb => { sb.str += <any>this.symbolNames == null ? s : this.symbolNames[s]; return sb; })(ret);
                    /* append */(sb => { sb.str += <any>','; return sb; })(ret);
                }
            }
            return /* toString */ret.str;
        }
    }
    PredictedTerminals["__class"] = "oracle.dbtools.parser.Earley.PredictedTerminals";


    export class Invocation {
        public __parent: any;
        x: number;

        y: number;

        rule: number;

        pos: number;

        caller: Earley.Invocation | null;

        node: ParseNode | null;

        cell: Parser.EarleyCell | null;

        public constructor(__parent: any, x: number, y: number, rule: number, pos: number, caller: Earley.Invocation, cell: Parser.EarleyCell) {
            this.__parent = __parent;
            if (this.x === undefined) { this.x = 0; }
            if (this.y === undefined) { this.y = 0; }
            if (this.rule === undefined) { this.rule = 0; }
            if (this.pos === undefined) { this.pos = 0; }
            if (this.caller === undefined) { this.caller = null; }
            if (this.node === undefined) { this.node = null; }
            if (this.cell === undefined) { this.cell = null; }
            this.cell = cell;
            this.rule = rule;
            this.pos = pos;
            this.x = x;
            this.y = y;
            this.caller = caller;
        }

        /**
         * 
         * @return {string}
         */
        public toString(): string {
            const t: Parser.Tuple = this.__parent.rules[this.rule];
            return /* getName */(c => typeof c === 'string' ? c : c["__class"] ? c["__class"] : c["name"])((<any>this.constructor)) + "  [" + this.x + "," + this.y + ")  " + t.toString$int(this.pos);
        }

        finish() {
            if (this.__parent.rules[this.rule].rhs.length === this.pos){
                const h: number = this.__parent.rules[this.rule].head;
                this.node.addContent$int(h);
            }
            this.__parent.postprocess(this.node, this.cell);
        }
    }
    Invocation["__class"] = "oracle.dbtools.parser.Earley.Invocation";


    export class Lft extends Earley.Invocation {
        public constructor(__parent: any, x: number, y: number, rule: number, pos: number, parent: Earley.Invocation, cell: Parser.EarleyCell) {
            super(__parent, x, y, rule, pos, parent, cell);
            this.__parent = __parent;
        }

        /**
         * 
         */
        finish() {
            this.caller.node.lft = this.node;
            this.node.__parent = this.caller.node;
            super.finish();
        }
    }
    Lft["__class"] = "oracle.dbtools.parser.Earley.Lft";


    export class Rgt extends Earley.Invocation {
        public constructor(__parent: any, x: number, y: number, rule: number, pos: number, parent: Earley.Invocation, cell: Parser.EarleyCell) {
            super(__parent, x, y, rule, pos, parent, cell);
            this.__parent = __parent;
        }

        /**
         * 
         */
        finish() {
            this.caller.node.rgt = this.node;
            this.node.__parent = this.caller.node;
            super.finish();
        }
    }
    Rgt["__class"] = "oracle.dbtools.parser.Earley.Rgt";


    export class Ret extends Earley.Invocation {
        public constructor(__parent: any, x: number, y: number, rule: number, pos: number, parent: Earley.Invocation, cell: Parser.EarleyCell) {
            super(__parent, x, y, rule, pos, parent, cell);
            this.__parent = __parent;
        }

        /**
         * 
         */
        finish() {
            this.caller.node = this.node;
            super.finish();
        }
    }
    Ret["__class"] = "oracle.dbtools.parser.Earley.Ret";

}
