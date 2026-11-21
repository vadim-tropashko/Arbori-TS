/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Resource } from './Resource.js';
import { readFileSync } from 'node:fs';
import { writeFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

type CachePath = string | URL | { toString(): string };

interface CacheDataInput {
    readInt(): number;
    readLong(): bigint;
    readUnsignedByte(): number;
    readUTF(): string;
}

interface CacheDataOutput {
    writeInt(value: number): void;
    writeLong(value: bigint): void;
    writeByte(value: number): void;
    writeUTF(value: string): void;
}

class BufferDataInput implements CacheDataInput {
    private offset = 0;

    constructor(private readonly data: Buffer) {}

    readInt(): number {
        const value = this.data.readInt32BE(this.offset);
        this.offset += 4;
        return value;
    }

    readLong(): bigint {
        const value = this.data.readBigInt64BE(this.offset);
        this.offset += 8;
        return value;
    }

    readUnsignedByte(): number {
        return this.data[this.offset++];
    }

    readUTF(): string {
        const length = this.data.readUInt16BE(this.offset);
        this.offset += 2;
        const value = this.data.toString('utf8', this.offset, this.offset + length);
        this.offset += length;
        return value;
    }

    close(): void {}
}

class BufferDataOutput implements CacheDataOutput {
    private readonly chunks: Buffer[] = [];

    writeInt(value: number): void {
        const bytes = Buffer.allocUnsafe(4);
        bytes.writeInt32BE(value);
        this.chunks.push(bytes);
    }

    writeLong(value: bigint): void {
        const bytes = Buffer.allocUnsafe(8);
        bytes.writeBigInt64BE(value);
        this.chunks.push(bytes);
    }

    writeByte(value: number): void {
        this.chunks.push(Buffer.from([value & 0xff]));
    }

    writeUTF(value: string): void {
        const bytes = Buffer.from(value, 'utf8');
        if (bytes.length > 0xffff) throw new Error('Prediction cache string is too long');
        const length = Buffer.allocUnsafe(2);
        length.writeUInt16BE(bytes.length);
        this.chunks.push(length, bytes);
    }

    toBuffer(): Buffer {
        return Buffer.concat(this.chunks);
    }
}

/**
 * Reads, writes, and installs precomputed Earley parser images.
 * @class
 */
export class EarleyPredictionCache {
    static MAGIC: number = 1397051474;

    static VERSION: number = 1;

    static CACHE_RESOURCE: string = "/oracle/dbtools/parser/plsql/SqlEarley.predictions.cache";

    public static CACHE_FILE: string = join(Resource.mainFolder, EarleyPredictionCache.CACHE_RESOURCE.substring(1));
    public static CACHE_FILE_$LI$(): string { return EarleyPredictionCache.CACHE_FILE; }

    constructor() {
    }

    /**
     * Saves the parser's prediction tables for reuse by another parser instance or JVM.
     * @param {Earley} parser
     * @param {*} file
     */
    public static save(parser: Earley, file: CachePath) {
        parser.precomputePredictions();
        const ruleHeads: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(parser.rules.length);
        const ruleRightHandSides: number[][] = new Array(parser.rules.length);
        for(let i: number = 0; i < parser.rules.length; i++) {{
            ruleHeads[i] = parser.rules[i].head;
            ruleRightHandSides[i] = parser.rules[i].rhs;
        };}
        const cache: EarleyPredictionCache.CacheData = new EarleyPredictionCache.CacheData(parser.allSymbols, ruleHeads, ruleRightHandSides, parser.predicts!, parser.terminalPredictions);
        const out = new BufferDataOutput();
        EarleyPredictionCache.write(out, cache);
        writeFileSync(EarleyPredictionCache.pathString(file), gzipSync(out.toBuffer()));
    }

    /**
     * Loads prediction tables from a binary cache file.
     * @param {Earley} parser
     * @param {*} file
     */
    public static load(parser: Earley, file: CachePath) {
        const __in = new BufferDataInput(gunzipSync(readFileSync(EarleyPredictionCache.pathString(file))));
        EarleyPredictionCache.install(parser, EarleyPredictionCache.read(__in));
    }

    /**
     * Loads the parser's packaged grammar and prediction tables.
     * @param {Earley} parser
     */
    public static loadPackagedParser(parser: Earley) {
        const path = join(process.cwd(), EarleyPredictionCache.CACHE_FILE);
        try {
            const input = new BufferDataInput(gunzipSync(readFileSync(path)));
            EarleyPredictionCache.install(parser, EarleyPredictionCache.read(input as any));
            input.close();
        } catch(e) {
            throw new Error(`Unable to load packaged parser image ${path}: ${(e as Error).message}`, { cause: e });
        }
    }

    static install(parser: Earley, cache: EarleyPredictionCache.CacheData) {
        EarleyPredictionCache.installGrammar(parser, cache);
        EarleyPredictionCache.installPredictions(parser, cache);
        parser.initializeGrammarSymbols();
    }

    private static pathString(file: CachePath): string {
        return file instanceof URL ? fileURLToPath(file) : String(file);
    }

    static write(out: CacheDataOutput, cache: EarleyPredictionCache.CacheData) {
        out.writeInt(EarleyPredictionCache.MAGIC);
        out.writeInt(EarleyPredictionCache.VERSION);
        out.writeInt(cache.allSymbols.length);
        for(let index = 0; index < cache.allSymbols.length; index++) {
            let symbol = cache.allSymbols[index];
            {
                out.writeUTF(symbol);
            }
        }
        out.writeInt(cache.ruleHeads.length);
        for(let i: number = 0; i < cache.ruleHeads.length; i++) {{
            out.writeInt(cache.ruleHeads[i]);
            const rightHandSide: number[] = cache.ruleRightHandSides[i];
            out.writeInt(rightHandSide.length);
            for(let index = 0; index < rightHandSide.length; index++) {
                let symbol = rightHandSide[index];
                {
                    out.writeInt(symbol);
                }
            }
        };}
        out.writeInt(cache.predicts.length);
        for(let index = 0; index < cache.predicts.length; index++) {
            let prediction = cache.predicts[index];
            {
                if (prediction == null){
                    out.writeInt(-1);
                    continue;
                }
                out.writeInt(prediction.length);
                for(let index1 = 0; index1 < prediction.length; index1++) {
                    let value = prediction[index1];
                    {
                        const rule = Parser.ruleFromEarleyCell(value);
                        const pos = Parser.posFromEarleyCell(value);
                        const active = Parser.activeVarFromEarleyCell(value);
                        out.writeLong((BigInt(active) << 48n) | (BigInt(rule) << 16n) | BigInt(pos));
                    }
                }
            }
        }
        out.writeInt(cache.terminalPredictions.length);
        for(let index = 0; index < cache.terminalPredictions.length; index++) {
            let terminal = cache.terminalPredictions[index];
            {
                if (terminal == null){
                    out.writeByte(0);
                    continue;
                }
                out.writeByte(terminal.isValid ? 1 : 2);
                if (terminal.symbols == null){
                    out.writeInt(-1);
                    continue;
                }
                out.writeInt(terminal.symbols.length);
                for(let index1 = 0; index1 < terminal.symbols.length; index1++) {
                    let symbol = terminal.symbols[index1];
                    {
                        out.writeInt(symbol);
                    }
                }
            }
        }
    }

    static read(__in: CacheDataInput): EarleyPredictionCache.CacheData {
        if (__in.readInt() !== EarleyPredictionCache.MAGIC || __in.readInt() !== EarleyPredictionCache.VERSION)throw Object.defineProperty(new Error("Invalid prediction cache header"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
        const symbolCount: number = __in.readInt();
        if (symbolCount < 0)throw Object.defineProperty(new Error("Invalid prediction cache symbol count"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
        const allSymbols: string[] = new Array(symbolCount);
        for(let i: number = 0; i < symbolCount; i++) {{
            allSymbols[i] = __in.readUTF();
        };}
        const ruleCount: number = __in.readInt();
        if (ruleCount < 0)throw Object.defineProperty(new Error("Invalid prediction cache rule count"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
        const ruleHeads: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(ruleCount);
        const ruleRightHandSides: number[][] = new Array(ruleCount);
        for(let i: number = 0; i < ruleCount; i++) {{
            ruleHeads[i] = __in.readInt();
            const length: number = __in.readInt();
            if (length < 0)throw Object.defineProperty(new Error("Invalid prediction cache rule length"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
            const rightHandSide: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(length);
            for(let j: number = 0; j < length; j++) {{
                rightHandSide[j] = __in.readInt();
            };}
            ruleRightHandSides[i] = rightHandSide;
        };}
        const predictionCount: number = __in.readInt();
        if (predictionCount < 0)throw Object.defineProperty(new Error("Invalid prediction cache prediction count"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
        const predicts: number[][] = Array.from({ length: predictionCount }, () => null as unknown as number[]);
        for(let i: number = 0; i < predictionCount; i++) {{
            const length: number = __in.readInt();
            if (length < -1)throw Object.defineProperty(new Error("Invalid prediction cache prediction length"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
            if (length < 0){
                continue;
            }
            const prediction: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(length);
            for(let j: number = 0; j < length; j++) {{
                const javaCode = __in.readLong() as bigint;
                // Java stores chart items in a signed 64-bit long with the
                // active symbol in bits 48..63. Such values exceed the exact
                // integer range of JS number, so decode the fields before
                // converting and repack in Parser's exact-number layout.
                const rule = Number((javaCode & 0xffffffffffffn) >> 16n);
                const pos = Number(javaCode & 0xffffn);
                const activeVar = pos < ruleRightHandSides[rule].length
                    ? ruleRightHandSides[rule][pos]
                    : 0;
                prediction[j] = activeVar * 0x1_0000_0000 + rule * 0x1_0000 + pos;
            };}
            predicts[i] = prediction;
        };}
        const terminalCount: number = __in.readInt();
        if (terminalCount < 0)throw Object.defineProperty(new Error("Invalid prediction cache terminal count"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
        const terminals: Earley.PredictedTerminals[] = Array.from({ length: terminalCount }, () => null as unknown as Earley.PredictedTerminals);
        for(let i: number = 0; i < terminalCount; i++) {{
            const type: number = __in.readUnsignedByte();
            if (type === 0){
                continue;
            }
            if (type !== 1 && type !== 2)throw Object.defineProperty(new Error("Invalid prediction cache terminal type"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
            const terminal: Earley.PredictedTerminals = new Earley.PredictedTerminals();
            terminal.isValid = type === 1;
            const length: number = __in.readInt();
            if (length < -1)throw Object.defineProperty(new Error("Invalid prediction cache terminal length"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.io.IOException','java.lang.Object','java.lang.Exception'] });
            if (length >= 0){
                terminal.symbols = (s => { let a=[]; while(s-->0) a.push(0); return a; })(length);
                for(let j: number = 0; j < length; j++) {{
                    terminal.symbols[j] = __in.readInt();
                };}
            }
            terminals[i] = terminal;
        };}
        return new EarleyPredictionCache.CacheData(allSymbols, ruleHeads, ruleRightHandSides, predicts, terminals);
    }

    static installPredictions(parser: Earley, cache: EarleyPredictionCache.CacheData) {
        parser.predicts = cache.predicts;
        parser.terminalPredictions = cache.terminalPredictions;
        for(let index = 0; index < parser.terminalPredictions.length; index++) {
            let terminal = parser.terminalPredictions[index];
            {
                if (terminal != null){
                    terminal.symbolNames = parser.allSymbols;
                }
            }
        }
    }

    static installGrammar(parser: Earley, cache: EarleyPredictionCache.CacheData) {
        parser.allSymbols = cache.allSymbols;
        parser.symbolIndexes = <any>({});
        for(let i: number = 0; i < parser.allSymbols.length; i++) {{
            /* put */(parser.symbolIndexes[parser.allSymbols[i]] = i);
        };}
        parser.rules = new Array(cache.ruleHeads.length);
        for(let i: number = 0; i < parser.rules.length; i++) {{
            parser.rules[i] = new Parser.Tuple(parser, cache.ruleHeads[i], cache.ruleRightHandSides[i]);
        };}
    }
}
(EarleyPredictionCache as any)["__class"] = "oracle.dbtools.parser.EarleyPredictionCache";


export namespace EarleyPredictionCache {

    export class CacheData {
        allSymbols: string[];

        ruleHeads: number[];

        ruleRightHandSides: number[][];

        predicts: number[][];

        terminalPredictions: Earley.PredictedTerminals[];

        constructor(allSymbols: string[], ruleHeads: number[], ruleRightHandSides: number[][], predicts: number[][], terminalPredictions: Earley.PredictedTerminals[]) {
            this.allSymbols = allSymbols;
            this.ruleHeads = ruleHeads;
            this.ruleRightHandSides = ruleRightHandSides;
            this.predicts = predicts;
            this.terminalPredictions = terminalPredictions;
        }
    }
    (CacheData as any)["__class"] = "oracle.dbtools.parser.EarleyPredictionCache.CacheData";

}




import { Parser } from './Parser.js';


import { Earley } from './Earley.js';

