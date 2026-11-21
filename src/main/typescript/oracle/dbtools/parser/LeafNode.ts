/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { ParseNode } from './ParseNode.js';

/**
 * Re JDBC team, Douglas Surber: store the original source text in each leaf node along with trailing whitespace
 * @author dim
 * @param {number} begin
 * @param {number} end
 * @param {number} symbol
 * @param {Parser} p
 * @param {LexerToken[]} src
 * @param {string} text
 * @class
 * @extends ParseNode
 */
export class LeafNode extends ParseNode {
    public substance: string;

    public whitespaces: string;

    public constructor(begin: number, end: number, symbol: number, p: Parser, src: Array<LexerToken>, text: string) {
        super(begin, end, symbol, p);
        if (this.substance === undefined) { this.substance = null; }
        if (this.whitespaces === undefined) { this.whitespaces = null; }
        if (begin + 1 !== end)throw Object.defineProperty(new Error("Not a leaf parse node"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        const substanceToken: LexerToken = /* get */src[begin];
        this.substance = substanceToken.content;
        let next: number = substanceToken.end;
        if (end < /* size */(<number>src.length))next = /* get */src[end].begin;
        this.whitespaces = text.substring(substanceToken.end, next);
    }

    public toString(depth?: any, auxMarker?: any, isCut?: any): string {
        if (((typeof depth === 'number') || depth === null) && ((typeof auxMarker === 'string') || auxMarker === null) && ((typeof isCut === 'boolean') || isCut === null)) {
            return super.toString(depth, auxMarker, isCut);
        } else if (((typeof depth === 'number') || depth === null) && ((typeof auxMarker === 'boolean') || auxMarker === null) && isCut === undefined) {
            return <any>this.toString$int$boolean(depth, auxMarker);
        } else if (depth === undefined && auxMarker === undefined && isCut === undefined) {
            return <any>this.toString$();
        } else throw new Error('invalid overload');
    }

    toString$int$boolean(depth: number, dummy: boolean): string {
        return super.toString$int$boolean(depth, dummy);
    }
}
LeafNode["__class"] = "oracle.dbtools.parser.LeafNode";




import { LexerToken } from './LexerToken.js';


import { Parser } from './Parser.js';

