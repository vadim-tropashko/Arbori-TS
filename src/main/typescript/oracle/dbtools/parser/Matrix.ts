/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { IntegerMap } from '../../arbori/util/IntegerMap.js';

/**
 * Major data structure for both Earley and CYK methods
 * @author Dim
 * @param {Parser} p
 * @class
 */
export class Matrix {
    public visual: Visual;

    public parser: Parser;

    /*private*/ completionQueueArray: number[];

    /*private*/ qHead: number;

    /*private*/ qTail: number;

    /**
     * If matrix cell at pos [x,y) contains a symbol
     * @param {number} x
     * @param {number} y
     * @param {number} symbol
     * @return
     * @return {boolean}
     */
    public contains(x: number, y: number, symbol: number): boolean {
        const cell: Cell = this.get(x, y);
        if (cell == null)return false;
        for(let i: number = 0; i < cell.size(); i++) {{
            const tuple: Parser.Tuple = this.parser.rules[cell.getRule(i)];
            if (tuple.head !== symbol)continue;
            if (tuple.rhs.length === cell.getPosition(i))return true;
        };}
        return false;
    }

    public enqueue(candidate: number) {
        if (this.qTail === this.completionQueueArray.length){
            if (this.qHead > 0){
                /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(this.completionQueueArray, this.qHead, this.completionQueueArray, 0, this.qTail - this.qHead);
                this.qTail -= this.qHead;
                this.qHead = 0;
            } else {
                this.completionQueueArray = /* copyOf */this.completionQueueArray.slice(0,this.completionQueueArray.length * 2);
            }
        }
        this.completionQueueArray[this.qTail++] = candidate;
    }

    public dequeue(): number {
        if (this.qHead >= this.qTail){
            this.qHead = this.qTail = 0;
            return -1;
        }
        return this.completionQueueArray[this.qHead++];
    }

    public getVisual(): Visual {
        return this.visual;
    }

    /*private*/ cells: IntegerMap[];

    /*private*/ __lastY: number;

    public allXs: number[];

    public constructor(p: Parser) {
        this.visual = null;
        this.parser = null;
        this.completionQueueArray = (s => { let a=[]; while(s-->0) a.push(0); return a; })(256);
        this.qHead = 0;
        this.qTail = 0;
        this.cells = null;
        this.__lastY = 0;
        this.allXs = null;
        this.parser = p;
    }

    public get(x: number, y: number): Parser.EarleyCell {
        return <Parser.EarleyCell>this.cells[y].get(x);
    }

    public put(x: number, y: number, content: Parser.EarleyCell) {
        if (this.__lastY < y)this.__lastY = y;
        this.cells[y].put(x, content);
    }

    public initCells(length: number) {
        this.cells = (s => { let a=[]; while(s-->0) a.push(null); return a; })(length + 1);
        for(let i: number = 0; i < this.cells.length; i++) {this.cells[i] = new IntegerMap();}
    }

    public lastY(): number {
        return this.__lastY;
    }

    public getXRange(y: number): IntegerMap {
        return this.cells[y];
    }

    /**
     * Mostly for visualization as debugger variable
     * ASCII alternative to Visual GUI
     * @param {number} x
     * @param {number} y
     * @param {*} cell
     * @param {number} index
     * @return {number[]}
     */
    public getEarleyBackptrs(x: number, y: number, cell: Cell, index: number): Array<number> {
        const ret: Array<number> = <any>([]);
        if (x === y && x === 0){
            /* add */(ret.push(x)>0);
            return ret;
        }
        const rule: number = cell.getRule(index);
        const tuple: Parser.Tuple = (<Earley>this.parser).rules[rule];
        const pos: number = cell.getPosition(index);
        if (x === y){
            const xRange: IntegerMap = this.cells[y];
            {
                let array = xRange.keySet();
                for(let index1 = 0; index1 < array.length; index1++) {
                    let mid = array[index1];
                    {
                        if (x < mid)continue;
                        const candidate: Cell = this.get(mid, x);
                        if (candidate == null)continue;
                        for(let i: number = 0; i < candidate.size(); i++) {{
                            const candTuple: Parser.Tuple = (<Earley>this.parser).rules[candidate.getRule(i)];
                            const candPos: number = candidate.getPosition(i);
                            if (candPos < candTuple.rhs.length && candTuple.rhs[candPos] === tuple.head){
                                if (!/* contains */(ret.indexOf(<any>(mid)) >= 0))/* add */(ret.push(mid)>0);
                                break;
                            }
                        };}
                    }
                }
            }
            return ret;
        }
        const candidate: Cell = this.get(x, y - 1);
        if (candidate != null)for(let i: number = 0; i < candidate.size(); i++) {{
            const candRule: number = candidate.getRule(i);
            if (rule !== candRule)continue;
            const candPos: number = candidate.getPosition(i);
            if (candPos + 1 !== pos)continue;
            const candTuple: Parser.Tuple = (<Earley>this.parser).rules[candRule];
            if (candTuple.rhs[candPos] === (<Earley>this.parser).identifier || candTuple.rhs[candPos] === (<Earley>this.parser).string_literal || candTuple.rhs[candPos] === (<Earley>this.parser).digits || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(this.parser.allSymbols[candTuple.rhs[candPos]].charAt(0)) == '\''.charCodeAt(0)){
                /* add */(ret.push(y + 1)>0);
                break;
            }
        };}
        const xRange: IntegerMap = this.cells[y];
        {
            let array = xRange.keySet();
            for(let index1 = 0; index1 < array.length; index1++) {
                let mid = array[index1];
                {
                    if (mid < x || y < mid)continue;
                    const pre: Cell = this.get(x, mid);
                    if (pre == null)continue;
                    const post: Cell = this.get(mid, y);
                    if (post == null)continue;
                    nextCell: for(let i: number = 0; i < pre.size(); i++) {for(let j: number = 0; j < post.size(); j++) {{
                        const rulePre: number = pre.getRule(i);
                        const rulePost: number = post.getRule(j);
                        const dotPre: number = pre.getPosition(i);
                        const dotPost: number = post.getPosition(j);
                        const tPre: Parser.Tuple = (<Earley>this.parser).rules[rulePre];
                        const tPost: Parser.Tuple = (<Earley>this.parser).rules[rulePost];
                        if (tPost.size() === dotPost){
                            if (rulePre !== rule)continue;
                            if (dotPre + 1 !== pos)continue;
                            const symPre: number = tPre.content(dotPre);
                            if (symPre !== tPost.head)continue;
                            /* add */(ret.push(mid)>0);
                            break nextCell;
                        }
                    };};}
                }
            }
        }
        return ret;
    }

    public recalc(): Matrix {
        const matrix: Matrix = new Matrix(this.parser);
        matrix.visual = this.visual;
        return matrix;
    }

    /**
     * Does matrix cell ["x","y") contain grammar production "rule" recognized up to position "pos"?
     * @param {number} x
     * @param {number} y
     * @param {number} rule
     * @param {number} pos
     * @return
     * @return {boolean}
     */
    public recognized(x: number, y: number, rule: number, pos: number): boolean {
        const cell: Cell = this.get(x, y);
        for(let i: number = 0; i < cell.size(); i++) {{
            const r: number = cell.getRule(i);
            if (r !== rule)continue;
            const p: number = cell.getPosition(i);
            if (p === pos)return true;
        };}
        return false;
    }
}
Matrix["__class"] = "oracle.dbtools.parser.Matrix";




import { Earley } from './Earley.js';


import { Cell } from './Cell.js';


import { Parser } from './Parser.js';


import { Visual } from './Visual.js';

