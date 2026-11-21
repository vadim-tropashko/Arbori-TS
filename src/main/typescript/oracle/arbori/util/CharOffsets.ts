/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../../dbtools/parser/Lexer.js';
import { LexerToken } from '../../dbtools/parser/LexerToken.js';

export interface CharOffsets {}

export namespace CharOffsets {

    /**
     * Translate character position into line number
     * Legacy; not efficient
     * @param {string} txt
     * @param {number} pos
     * @return      {number} 1 based line numbers
     */
    export function charPos2LineNo(txt: string, pos: number): number {
        let ret: number = 1;
        for(let i: number = 0; i < pos; i++) {{
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(txt.charAt(i)) == '\n'.charCodeAt(0))ret++;
        };}
        return ret;
    }

    export function lineNo2CharPos(txt: string, line: number): number {
        let l: number = 1;
        for(let i: number = 0; i < txt.length; i++) {{
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(txt.charAt(i)) == '\r'.charCodeAt(0))i++;
            if (l === line)return i;
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(txt.charAt(i)) == '\n'.charCodeAt(0)){
                l++;
            }
        };}
        return -1;
    }

    /**
     * Fixed long processing time in LSP
     * Build line map once, then query it efficiently
     * @return  {int[]} 0 based
     * @param {string} txt
     */
    export function lineMap(txt: string): number[] {
        const tmp: Array<number> = <any>([]);
        for(let i: number = 0; i < txt.length; i++) {{
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(txt.charAt(i)) == '\n'.charCodeAt(0)){
                /* add */(tmp.push(i)>0);
            }
        };}
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(/* size */(<number>tmp.length));
        let i: number = 0;
        for(let index = 0; index < tmp.length; index++) {
            let x = tmp[index];
            ret[i++] = x
        }
        return ret;
    }

    export function lineNo2CharPos0(lineMap: number[], line: number): number {
        if (line === 0)return 0;
        if (lineMap.length <= line)return lineMap[lineMap.length - 1] + 1;
        return lineMap[line - 1] + 1;
    }

    export function lineNo2CharPos1(lineMap: number[], line: number): number {
        return CharOffsets.lineNo2CharPos0(lineMap, line - 1);
    }

    export function charPos2LineNo0(lineMap: number[], pos: number): number {
        if (lineMap.length === 0)return 0;
        if (lineMap[lineMap.length - 1] < pos)return lineMap.length;
        return JArray.indexOf$int_A$int(lineMap, pos);
    }

    export function charPos2LineNo1(lineMap: number[], pos: number): number {
        return CharOffsets.charPos2LineNo0(lineMap, pos) + 1;
    }

    export function lineDiff(content1: string, content2: string): number {
        const src1: Array<LexerToken> = Lexer.parse$java_lang_String(content1);
        const src2: Array<LexerToken> = Lexer.parse$java_lang_String(content2);
        const size: number = Math.min(src1.length, src2.length);
        for(let i: number = 0; i < size; i++) {{
            const t1: LexerToken = /* get */src1[i];
            if (!(t1.content === /* get */src2[i].content))return CharOffsets.charPos2LineNo(content1, t1.begin);
        };}
        if (/* size */(<number>src1.length) < /* size */(<number>src2.length)){
            if (/* size */(<number>src1.length) === 0)return 1;
            return CharOffsets.charPos2LineNo(content1, /* get */src1[/* size */(<number>src1.length) - 1].end);
        }
        if (/* size */(<number>src2.length) < /* size */(<number>src1.length)){
            if (/* size */(<number>src2.length) === 0)return 1;
            return CharOffsets.charPos2LineNo(content2, /* get */src2[/* size */(<number>src2.length) - 1].end);
        }
        return -1;
    }
}




import { Array as JArray } from './Array.js';

