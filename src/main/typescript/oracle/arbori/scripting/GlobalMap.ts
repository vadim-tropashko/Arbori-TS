/** A small Map wrapper retaining the method names used by the Java port. */
export class GlobalMap {
    private readonly values = new Map<string, any>();

    constructor(initial?: GlobalMap | Map<string, any> | Record<string, any>) {
        if (initial instanceof GlobalMap) {
            for (const [key, value] of initial.values) this.values.set(key, value);
        } else if (initial instanceof Map) {
            for (const [key, value] of initial) this.values.set(key, value);
        } else if (initial) {
            for (const [key, value] of Object.entries(initial)) this.values.set(key, value);
        }
    }

    public put(key: string, value: any): any {
        const previous = this.values.get(key);
        this.values.set(key, value);
        return previous;
    }

    public get(key: string): any { return this.values.get(key); }
    public containsKey(key: string): boolean { return this.values.has(key); }
    public remove(key: string): any {
        const previous = this.values.get(key);
        this.values.delete(key);
        return previous;
    }
    public keySet(): string[] { return [...this.values.keys()]; }
    public putAll(other: Record<string, any> | Map<string, any> | GlobalMap): void {
        const entries = other instanceof GlobalMap ? other.values : other instanceof Map ? other : Object.entries(other);
        for (const [key, value] of entries) this.values.set(key, value);
    }
    public close(): void {}
    public toString(): string { return `GlobalMap(${this.values.size})`; }
}
