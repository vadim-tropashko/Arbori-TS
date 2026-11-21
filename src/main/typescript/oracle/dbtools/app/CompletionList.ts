/* Generated from Java with JSweet 4.0.0-SNAPSHOT - http://www.jsweet.org */
import { LexerToken } from '../parser/LexerToken';
import { Jsonable } from '../parser/json/Jsonable';

export class CompletionList implements Jsonable {
    public entries: Array<CompletionItem>;

    public pos: number;

    public prefix: LexerToken;

    public alias: string;

    public add(item: CompletionItem) {
        if ("..." === item.entry){
            /* addLast */(this.entries.push(item)>0);
            return;
        }
        let index: number = 0;
        for(let index1 = 0; index1 < this.entries.length; index1++) {
            let cmp = this.entries[index1];
            {
                index++;
                if (cmp.entry === item.entry)return;
                if (this.prefix != null && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(item.entry.toLowerCase(), this.prefix.content.toLowerCase()) && !/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(cmp.entry.toLowerCase(), this.prefix.content.toLowerCase())){
                    index--;
                    break;
                }
            }
        }
        /* add */this.entries.splice(index, 0, item);
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return /* toString */('['+this.entries.join(', ')+']') + "\npos=" + this.pos + "\nprefix=" + (this.prefix == null ? "null" : this.prefix.content);
    }

    public size(): number {
        return /* size */(<number>this.entries.length);
    }

    public first(): CompletionItem {
        return /* get */this.entries[0];
    }

    /**
     * 
     * @return {string}
     */
    public toJson(): string {
        const ret: { str: string, toString: Function } = { str: "[", toString: function() { return this.str; } };
        let pos: number = 0;
        for(let index = 0; index < this.entries.length; index++) {
            let entry = this.entries[index];
            {
                if (0 < pos++)/* append */(sb => { sb.str += <any>','; return sb; })(ret);
                /* append */(sb => { sb.str += <any>entry.toJson(); return sb; })(ret);
            }
        }
        /* append */(sb => { sb.str += <any>"]"; return sb; })(ret);
        return /* toString */ret.str;
    }

    constructor() {
        this.entries = <any>([]);
        if (this.pos === undefined) { this.pos = 0; }
        if (this.prefix === undefined) { this.prefix = null; }
        this.alias = null;
    }
}
CompletionList["__class"] = "oracle.dbtools.app.CompletionList";
CompletionList["__interfaces"] = ["oracle.dbtools.parser.json.Jsonable"];





import { CompletionItem } from './CompletionItem';

