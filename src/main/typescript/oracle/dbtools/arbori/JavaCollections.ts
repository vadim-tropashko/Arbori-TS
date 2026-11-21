/**
 * Iteration order for the default-capacity java.util.HashMap/HashSet used by
 * Arbori. TS Map/Set preserve insertion order, while Java iterates string keys
 * by HashMap bucket. Keep this at observable Arbori collection boundaries.
 */
export function javaStringHashOrder(values: Iterable<string>): string[] {
    const unique: string[] = [];
    const seen = new Set<string>();
    for (const value of values) {
        if (!seen.has(value)) {
            seen.add(value);
            unique.push(value);
        }
    }

    let capacity = 16;
    while (unique.length > Math.floor(capacity * 0.75)) capacity <<= 1;

    const bucket = (value: string): number => {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = (Math.imul(hash, 31) + value.charCodeAt(i)) | 0;
        }
        const spread = (hash ^ (hash >>> 16)) >>> 0;
        return spread & (capacity - 1);
    };

    return unique
        .map((value, insertionIndex) => ({ value, insertionIndex, bucket: bucket(value) }))
        .sort((a, b) => a.bucket - b.bucket || a.insertionIndex - b.insertionIndex)
        .map(entry => entry.value);
}
