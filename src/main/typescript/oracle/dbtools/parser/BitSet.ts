/** Compact mutable bit set for Earley grammar closure calculations. */
export class BitSet {
    private readonly words: Uint32Array;

    public constructor(size: number) {
        this.words = new Uint32Array(Math.ceil(size / 32));
    }

    public set(bit: number): void {
        const index = bit >>> 5;
        this.words[index] |= 1 << (bit & 31);
    }

    public get(bit: number): boolean {
        const index = bit >>> 5;
        return index < this.words.length && (this.words[index] & (1 << (bit & 31))) !== 0;
    }

    public or(other: BitSet): void {
        const length = Math.min(this.words.length, other.words.length);
        for (let i = 0; i < length; i++) this.words[i] |= other.words[i];
    }

    public cardinality(): number {
        let count = 0;
        for (let word of this.words) {
            word -= (word >>> 1) & 0x55555555;
            word = (word & 0x33333333) + ((word >>> 2) & 0x33333333);
            count += (((word + (word >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
        }
        return count;
    }

    public nextSetBit(from: number): number {
        if (from < 0) throw new RangeError("fromIndex must be nonnegative");
        let wordIndex = from >>> 5;
        if (wordIndex >= this.words.length) return -1;
        let word = this.words[wordIndex] & (0xffffffff << (from & 31));
        while (true) {
            if (word !== 0) return (wordIndex << 5) + 31 - Math.clz32(word & -word);
            if (++wordIndex >= this.words.length) return -1;
            word = this.words[wordIndex];
        }
    }
}
