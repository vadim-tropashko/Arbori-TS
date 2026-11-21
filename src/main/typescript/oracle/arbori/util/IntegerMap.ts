/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
/**
 * Sorted parallel-array map with int keys and Object values.
 * Replacement for the former red-black tree (IntegerMapImpl) that
 * halves lookup cost on the small maps typical of Earley parser matrix columns.
 * 
 * Typical map size is 5-10 entries, so linear scan
 * beats binary search.
 * @class
 */
export class IntegerMap {
    /*private*/ keys: number[];

    /*private*/ values: any[];

    /*private*/ __size: number;

    /*private*/ cachedKeySet: number[];

    static INITIAL_CAPACITY: number = 8;

    public constructor() {
        if (this.keys === undefined) { this.keys = null; }
        if (this.values === undefined) { this.values = null; }
        if (this.__size === undefined) { this.__size = 0; }
        if (this.cachedKeySet === undefined) { this.cachedKeySet = null; }
        this.keys = (s => { let a=[]; while(s-->0) a.push(0); return a; })(IntegerMap.INITIAL_CAPACITY + 1);
        this.keys[0] = 2147483647;
        this.values = (s => { let a=[]; while(s-->0) a.push(null); return a; })(IntegerMap.INITIAL_CAPACITY);
        this.__size = 0;
    }

    public size(): number {
        return this.__size;
    }

    public get(key: number): any {
        const k: number[] = this.keys;
        for(let i: number = 0; ; i++) {{
            if (k[i] === key)return this.values[i];
            if (k[i] > key)return null;
        };}
    }

    public put(key: number, value: any): any {
        let idx: number = 0;
        const k: number[] = this.keys;
        const n: number = this.__size;
        while((idx < n && k[idx] < key)) {idx++};
        if (idx < n && k[idx] === key){
            const old: any = this.values[idx];
            this.values[idx] = value;
            return old;
        }
        if (n === this.values.length){
            const newCap: number = this.values.length * 2;
            const newKeys: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(newCap + 1);
            const newValues: any[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(newCap);
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(k, 0, newKeys, 0, idx);
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(this.values, 0, newValues, 0, idx);
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(k, idx, newKeys, idx + 1, n - idx);
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(this.values, idx, newValues, idx + 1, n - idx);
            this.keys = newKeys;
            this.values = newValues;
        } else {
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(k, idx, k, idx + 1, n - idx);
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(this.values, idx, this.values, idx + 1, n - idx);
        }
        this.keys[idx] = key;
        this.values[idx] = value;
        this.__size++;
        this.keys[this.__size] = 2147483647;
        this.cachedKeySet = null;
        return null;
    }

    /**
     * Returns the internal sorted keys array truncated to size.
     * Callers iterate with for-each so a correctly-sized copy is needed.
     * @return {int[]}
     */
    public keySet(): number[] {
        const cached: number[] = this.cachedKeySet;
        if (cached != null){
            return cached;
        }
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.__size);
        /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(this.keys, 0, ret, 0, this.__size);
        this.cachedKeySet = ret;
        return ret;
    }

    public descendingKeySet(): number[] {
        const asc: number[] = this.keySet();
        const n: number = asc.length;
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(n);
        for(let i: number = 0; i < n; i++) {{
            ret[i] = asc[n - 1 - i];
        };}
        return ret;
    }
}
IntegerMap["__class"] = "oracle.arbori.util.IntegerMap";



