/* Generated from Java with JSweet 4.0.0-SNAPSHOT - http://www.jsweet.org */
export abstract class Completer {
    public prefixWildcard: string;

    public abstract complete(input: string, pos: number): Promise<CompletionList>;

    constructor() {
        this.prefixWildcard = "%";
    }
}
Completer["__class"] = "oracle.dbtools.app.Completer";




import { CompletionList } from './CompletionList';

