/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
/**
 * Ordered array of integers/longs
 * 
 * Primary usage in parser
 * 
 * Reported high memory usage on 1M character long SQL query
 * long[]    1,437,302,024 B (63.8%)
 * 
 * Optimized it for this case
 * 
 * @author Dim
 * @class
 */
export class Array {
    public static indexOf$int_A$int(array: number[], value: number): number {
        return Array.indexOf$int_A$int$int$int(array, 0, array.length - 1, value);
    }

    public static indexOf$long_A$long(array: number[], value: number): number {
        return Array.indexOf$long_A$int$int$long(array, 0, array.length - 1, value);
    }

    public static indexOf$int_A$int$int$int(array: number[], xx: number, yy: number, value: number): number {
        if (xx >= yy)return xx;
        while((xx + 1 < yy)) {{
            const mid: number = ((xx + yy) / 2|0);
            if (value < array[mid]){
                yy = mid;
            } else {
                xx = mid;
            }
        }};
        return (array[xx] < value) ? yy : xx;
    }

    /**
     * Find insertion point within a sorted array in the half-open interval [xx, yy).
     * Returns an index in [xx, yy] where 'value' can be inserted to keep order.
     * @param {int[]} array
     * @param {number} xx
     * @param {number} yy
     * @param {number} value
     * @return {number}
     * @private
     */
    public static indexOf(array?: any, xx?: any, yy?: any, value?: any): number {
        if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof xx === 'number') || xx === null) && ((typeof yy === 'number') || yy === null) && ((typeof value === 'number') || value === null)) {
            return <any>Array.indexOf$int_A$int$int$int(array, xx, yy, value);
        } else if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof xx === 'number') || xx === null) && ((typeof yy === 'number') || yy === null) && ((typeof value === 'number') || value === null)) {
            return <any>Array.indexOf$long_A$int$int$long(array, xx, yy, value);
        } else if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof xx === 'number') || xx === null) && yy === undefined && value === undefined) {
            return <any>Array.indexOf$int_A$int(array, xx);
        } else if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof xx === 'number') || xx === null) && yy === undefined && value === undefined) {
            return <any>Array.indexOf$long_A$long(array, xx);
        } else throw new Error('invalid overload');
    }

    public static indexOf$long_A$int$int$long(array: number[], xx: number, yy: number, value: number): number {
        if (xx >= yy)return xx;
        while((xx + 1 < yy)) {{
            const mid: number = ((xx + yy) / 2|0);
            if (value < array[mid]){
                yy = mid;
            } else {
                xx = mid;
            }
        }};
        return (array[xx] < value) ? yy : xx;
    }

    public static insert$int_A$int(array: number[], value: number): number[] {
        if (array == null || array.length === 0){
            array = [0];
            array[0] = value;
            return array;
        }
        const index: number = Array.indexOf$int_A$int$int$int(array, 0, array.length, value);
        if (index < array.length && array[index] === value)return array;
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(array.length + 1);
        /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(array, 0, ret, 0, index);
        ret[index] = value;
        /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(array, index, ret, index + 1, array.length - index);
        return ret;
    }

    public static insert(array?: any, value?: any): any {
        if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof value === 'number') || value === null)) {
            return <any>Array.insert$int_A$int(array, value);
        } else if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof value === 'number') || value === null)) {
            return <any>Array.insert$long_A$long(array, value);
        } else throw new Error('invalid overload');
    }

    public static insert$long_A$long(array: number[], value: number): number[] {
        if (array == null || array.length === 0){
            array = [0];
            array[0] = value;
            return array;
        }
        const index: number = Array.indexOf$long_A$int$int$long(array, 0, array.length, value);
        if (index < array.length && array[index] === value)return array;
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(array.length + 1);
        /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(array, 0, ret, 0, index);
        ret[index] = value;
        /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(array, index, ret, index + 1, array.length - index);
        return ret;
    }

    public static delete$int_A$int(array: number[], value: number): number[] {
        const index: number = Array.indexOf$int_A$int$int$int(array, 0, array.length, value);
        if (index === array.length || array[index] !== value)return array;
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(array.length - 1);
        for(let i: number = 0; i < index; i++) {{
            ret[i] = array[i];
        };}
        for(let i: number = index; i < ret.length; i++) {{
            ret[i] = array[i + 1];
        };}
        return ret;
    }

    public static delete$int_A$int$int(array: number[], minVal: number, maxVal: number): number[] {
        if (minVal + 1 === maxVal)return Array.delete$int_A$int(array, minVal);
        let iMin: number = Array.indexOf$int_A$int$int$int(array, 0, array.length, minVal);
        if (array.length <= iMin)return array;
        if (array[iMin] < minVal)iMin++;
        let iMax: number = Array.indexOf$int_A$int$int$int(array, 0, array.length, maxVal);
        if (array[iMax] > maxVal)iMax--;
        if (iMin === iMax)return array;
        const ret: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(array.length - (iMax - iMin));
        for(let i: number = 0; i < iMin; i++) {{
            ret[i] = array[i];
        };}
        for(let i: number = iMax; i < array.length; i++) {{
            ret[i - (iMax - iMin)] = array[i];
        };}
        return ret;
    }

    public static delete(array?: any, minVal?: any, maxVal?: any): number[] {
        if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof minVal === 'number') || minVal === null) && ((typeof maxVal === 'number') || maxVal === null)) {
            return <any>Array.delete$int_A$int$int(array, minVal, maxVal);
        } else if (((array != null && array instanceof <any>Array && (array.length == 0 || array[0] == null ||(typeof array[0] === 'number'))) || array === null) && ((typeof minVal === 'number') || minVal === null) && maxVal === undefined) {
            return <any>Array.delete$int_A$int(array, minVal);
        } else throw new Error('invalid overload');
    }

    public static merge$int_A$int_A(x: number[], y: number[]): number[] {
        if (x == null)return y;
        if (y == null)return x;
        if (x.length === 0)return y;
        if (y.length === 0)return x;
        const m: number = x.length;
        const n: number = y.length;
        const tmp: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(m + n);
        let i: number = 0;
        let j: number = 0;
        let k: number = 0;
        while((i < m && j < n)) {if (x[i] === y[j]){
            tmp[k++] = x[i++];
            j++;
        } else if (x[i] < y[j])tmp[k++] = x[i++]; else tmp[k++] = y[j++];};
        if (i < m){
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(x, i, tmp, k, m - i);
            k += m - i;
        } else {
            /* arraycopy */((srcPts, srcOff, dstPts, dstOff, size) => { if(srcPts !== dstPts || dstOff >= srcOff + size) { while (--size >= 0) dstPts[dstOff++] = srcPts[srcOff++];} else { let tmp = srcPts.slice(srcOff, srcOff + size); for (let i = 0; i < size; i++) dstPts[dstOff++] = tmp[i]; }})(y, j, tmp, k, n - j);
            k += n - j;
        }
        return /* copyOf */tmp.slice(0,k);
    }

    public static merge(x?: any, y?: any): any {
        if (((x != null && x instanceof <any>Array && (x.length == 0 || x[0] == null ||(typeof x[0] === 'number'))) || x === null) && ((y != null && y instanceof <any>Array && (y.length == 0 || y[0] == null ||(typeof y[0] === 'number'))) || y === null)) {
            return <any>Array.merge$int_A$int_A(x, y);
        } else if (((x != null && x instanceof <any>Array && (x.length == 0 || x[0] == null ||(typeof x[0] === 'number'))) || x === null) && ((y != null && y instanceof <any>Array && (y.length == 0 || y[0] == null ||(typeof y[0] === 'number'))) || y === null)) {
            return <any>Array.merge$long_A$long_A(x, y);
        } else throw new Error('invalid overload');
    }

    public static merge$long_A$long_A(x: number[], y: number[]): number[] {
        if (x == null)return y;
        if (y == null)return x;
        if (x.length === 0)return y;
        if (y.length === 0)return x;
        const m: number = x.length;
        const n: number = y.length;
        const tmp: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(m + n);
        let i: number = 0;
        let j: number = 0;
        let k: number = 0;
        while((i < m && j < n)) {if (x[i] === y[j]){
            tmp[k++] = x[i++];
            j++;
        } else if (x[i] < y[j])tmp[k++] = x[i++]; else tmp[k++] = y[j++];};
        if (i < m)for(let p: number = i; p < m; p++) {tmp[k++] = x[p];} else for(let p: number = j; p < n; p++) {tmp[k++] = y[p];}
        return /* copyOf */tmp.slice(0,k);
    }

    public static next$int_A$int_A(state: number[], limit: number[]): boolean {
        return Array.next$int_A$int_A$int(state, limit, 0);
    }

    public static next$int_A$int_A$int(state: number[], limit: number[], init: number): boolean {
        for(let pos: number = 0; pos < state.length; pos++) {{
            if (state[pos] < limit[pos] - 1){
                state[pos]++;
                return true;
            }
            state[pos] = init;
        };}
        return false;
    }

    public static next(state?: any, limit?: any, init?: any): boolean {
        if (((state != null && state instanceof <any>Array && (state.length == 0 || state[0] == null ||(typeof state[0] === 'number'))) || state === null) && ((limit != null && limit instanceof <any>Array && (limit.length == 0 || limit[0] == null ||(typeof limit[0] === 'number'))) || limit === null) && ((typeof init === 'number') || init === null)) {
            return <any>Array.next$int_A$int_A$int(state, limit, init);
        } else if (((state != null && state instanceof <any>Array && (state.length == 0 || state[0] == null ||(typeof state[0] === 'number'))) || state === null) && ((limit != null && limit instanceof <any>Array && (limit.length == 0 || limit[0] == null ||(typeof limit[0] === 'number'))) || limit === null) && init === undefined) {
            return <any>Array.next$int_A$int_A(state, limit);
        } else throw new Error('invalid overload');
    }
}
Array["__class"] = "oracle.arbori.util.Array";



