/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { CharOffsets } from '../../../arbori/util/CharOffsets';
import { LexerToken } from '../LexerToken';
import { ParseNode } from '../ParseNode';
import { Parsed } from '../Parsed';
import { RuleTuple } from '../RuleTuple';

export class Diff {
    file1: string;

    parsed1: Parsed;

    fragment1: Array<ParseNode>;

    file2: string;

    parsed2: Parsed;

    fragment2: Array<ParseNode>;

    public constructor(file1: string, parsed1: Parsed, fragment1: Array<ParseNode>, file2: string, parsed2: Parsed, fragment2: Array<ParseNode>) {
        if (this.file1 === undefined) { this.file1 = null; }
        if (this.parsed1 === undefined) { this.parsed1 = null; }
        if (this.fragment1 === undefined) { this.fragment1 = null; }
        if (this.file2 === undefined) { this.file2 = null; }
        if (this.parsed2 === undefined) { this.parsed2 = null; }
        if (this.fragment2 === undefined) { this.fragment2 = null; }
        this.file1 = file1;
        this.parsed1 = parsed1;
        this.fragment1 = fragment1;
        this.file2 = file2;
        this.parsed2 = parsed2;
        this.fragment2 = fragment2;
    }

    public report(): string {
        const inputI: string = this.parsed1.input;
        const inputJ: string = this.parsed2.input;
        const srcI: Array<LexerToken> = this.parsed1.getSrc();
        const srcJ: Array<LexerToken> = this.parsed2.getSrc();
        const fromI: number = /* get */this.fragment1[0].from;
        const toI: number = /* get */this.fragment1[/* size */(<number>this.fragment1.length) - 1].to;
        let beginI: number = /* get */srcI[fromI].begin;
        const beginLineI: number = CharOffsets.charPos2LineNo0(this.parsed1.lineMap, beginI);
        const endLineI: number = CharOffsets.charPos2LineNo0(this.parsed1.lineMap, /* get */srcI[toI - 1].end);
        beginI = CharOffsets.lineNo2CharPos0(this.parsed1.lineMap, beginLineI);
        const slash1: number = this.file1.lastIndexOf('/') + 1;
        let ret: string = (endLineI - beginLineI) + " matching lines\n" + (toI - fromI) + " matching tokens\n";
        ret += this.file1.substring(slash1) + " line " + (beginLineI + 1) + ": \n";
        ret += inputI.substring(beginI, /* get */srcI[toI - 1].end) + "\n";
        const fromJ: number = /* get */this.fragment2[0].from;
        const toJ: number = /* get */this.fragment2[/* size */(<number>this.fragment2.length) - 1].to;
        let beginJ: number = /* get */srcJ[fromJ].begin;
        const beginLineJ: number = CharOffsets.charPos2LineNo0(this.parsed2.lineMap, beginJ);
        beginJ = CharOffsets.lineNo2CharPos0(this.parsed2.lineMap, beginLineJ);
        const slash2: number = this.file2.lastIndexOf('/') + 1;
        ret += this.file2.substring(slash2) + " line " + (beginLineJ + 1) + ": \n";
        ret += inputJ.substring(beginJ, /* get */srcJ[toJ - 1].end) + "\n";
        return ret;
    }

    /**
     * 
     * @param {*} obj
     * @return {number}
     */
    public compareTo(obj: any): number {
        const cmp: Diff = <Diff>obj;
        let tmp: number = 0;
        const thisLen: number = /* get */this.fragment1[/* size */(<number>this.fragment1.length) - 1].to - /* get */this.fragment1[0].from;
        const cmpLen: number = /* get */cmp.fragment1[/* size */(<number>cmp.fragment1.length) - 1].to - /* get */cmp.fragment1[0].from;
        tmp = cmpLen - thisLen;
        if (tmp !== 0)return tmp;
        const begin: number = /* get */this.parsed1.getSrc()[/* get */this.fragment1[0].from].begin;
        const end: number = /* get */this.parsed1.getSrc()[/* get */this.fragment1[/* size */(<number>this.fragment1.length) - 1].to].end;
        const cmpBegin: number = /* get */cmp.parsed1.getSrc()[/* get */cmp.fragment1[0].from].begin;
        const cmpEnd: number = /* get */cmp.parsed1.getSrc()[/* get */cmp.fragment1[/* size */(<number>cmp.fragment1.length) - 1].to].end;
        tmp = (cmpEnd - cmpBegin) - (end - begin);
        if (tmp !== 0)return tmp;
        return tmp;
    }
}
Diff["__class"] = "oracle.dbtools.parser.java.Diff";



