/** A TypeScript implementation of the java.util.StringTokenizer API used here. */
export class StringTokenizer {
    public static readonly __class = "oracle.arbori.util.StringTokenizer";

    private readonly value: string;
    private delimiters: string;
    private readonly returnDelimiters: boolean;
    private position = 0;

    public constructor(value: string, delimiters = " \t\n\r\f", returnDelimiters = false) {
        if (value == null) throw new TypeError("StringTokenizer input cannot be null");
        this.value = value;
        this.delimiters = delimiters;
        this.returnDelimiters = returnDelimiters;
    }

    public countTokens(): number {
        let count = 0;
        let inToken = false;
        for (let i = this.position; i < this.value.length; i++) {
            if (this.isDelimiter(this.value[i])) {
                if (this.returnDelimiters) count++;
                if (inToken) { count++; inToken = false; }
            } else inToken = true;
        }
        if (inToken) count++;
        return count;
    }

    public hasMoreElements(): boolean { return this.hasMoreTokens(); }

    public hasMoreTokens(): boolean {
        if (this.returnDelimiters) return this.position < this.value.length;
        for (let i = this.position; i < this.value.length; i++) {
            if (!this.isDelimiter(this.value[i])) return true;
        }
        return false;
    }

    public nextElement(): string { return this.nextToken$(); }

    public nextToken$(): string {
        const length = this.value.length;
        let i = this.position;
        if (this.returnDelimiters) {
            if (i < length && this.isDelimiter(this.value[i])) {
                this.position++;
                return this.value[i];
            }
            while (i < length && !this.isDelimiter(this.value[i])) i++;
            const token = this.value.substring(this.position, i);
            this.position = i;
            if (token.length) return token;
        } else {
            while (i < length && this.isDelimiter(this.value[i])) i++;
            const start = i;
            while (i < length && !this.isDelimiter(this.value[i])) i++;
            if (start < i) {
                this.position = i;
                return this.value.substring(start, i);
            }
        }
        throw new Error("NoSuchElementException");
    }

    public nextToken$java_lang_String(delims: string): string {
        this.delimiters = delims;
        return this.nextToken$();
    }

    public nextToken(delims?: string): string {
        return delims === undefined ? this.nextToken$() : this.nextToken$java_lang_String(delims);
    }

    private isDelimiter(ch: string): boolean { return this.delimiters.indexOf(ch) >= 0; }
}
