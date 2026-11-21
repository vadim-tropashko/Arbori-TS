/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
export class ParseInt {
    public static readonly __class = "oracle.arbori.util.ParseInt";
    /**
     * Determine if the specified text represents an integer
     * 
     * @param {string} text The text to examine
     * @return {boolean} true if the value represents an integer, false otherwise
     */
    public static isInt(text: string): boolean {
        if (text == null || /* isEmpty */(text.length === 0)){
            return false;
        }
        let start = 0;
        if (text[0] === '+' || text[0] === '-') start = 1;
        if (start === text.length) return false;
        for (let i = start; i < text.length; i++) {
            const digit = text.charCodeAt(i);
            if (digit < 48 || digit > 57) return false;
        }
        return true;
    }

    /**
     * Parse text into an Integer
     * 
     * @param {string} text The text to parse
     * @return {Optional} {@code Optional<Integer>} of the integer value, or {@code Optional.empty()} if the
     * text is not an integer
     */
    public static parseInt(text: string): number | null {
        if (ParseInt.isInt(text)){
            return Number.parseInt(text, 10);
        } else {
            return null;
        }
    }

    /**
     * Parse text into an integer and performs the provided action. If the text is not an integer no
     * action is performed.
     * 
     * @param {string} text The text to be parsed
     * @param {(number) => void} action The action to be performed IFF the text represents an integer
     * @return {Optional} {@code Optional<Integer>} of the integer value, or {@code Optional.empty()} if the
     * text is not an integer
     */
    public static whenInt(text: string, action: any): number | null {
        const value = ParseInt.parseInt(text);
        if (/* isPresent */(value != null)){
            (target => (typeof target === 'function') ? target(/* get */(v => { if (v == null) throw new Error('value is null'); return v; })(value)) : (<any>target).accept(/* get */(v => { if (v == null) throw new Error('value is null'); return v; })(value)))(action);
        }
        return value;
    }
}



