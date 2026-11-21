/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
export class Visual {
    public visited: number[][];

    public matrix: Matrix;

    public constructor(s: Array<LexerToken>, c: Parser) {
        this.visited = null;
        if (this.matrix === undefined) { this.matrix = null; }
    }

    public draw$() {
    }

    public draw$oracle_dbtools_parser_Matrix(m: Matrix) {
    }

    public draw(m?: any) {
        if (((m != null && m instanceof <any>Matrix) || m === null)) {
            return <any>this.draw$oracle_dbtools_parser_Matrix(m);
        } else if (m === undefined) {
            return <any>this.draw$();
        } else throw new Error('invalid overload');
    }
}
Visual["__class"] = "oracle.dbtools.parser.Visual";




import { Parser } from './Parser.js';


import { LexerToken } from './LexerToken.js';


import { Matrix } from './Matrix.js';

