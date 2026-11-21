/* Generated from Java with JSweet 4.0.0-SNAPSHOT - http://www.jsweet.org */
import { Jsonable } from '../parser/json/Jsonable';
import { Util } from '../parser/json/Util';

export class CompletionItem implements Jsonable {
    public entry: string;

    public constructor(entry?: any, type?: any) {
        if (((typeof entry === 'string') || entry === null) && ((typeof type === 'number') || type === null)) {
            let __args = arguments;
            if (this.entry === undefined) { this.entry = null; } 
            if (this.type === undefined) { this.type = null; } 
            this.entry = entry;
            this.type = type;
        } else if (((typeof entry === 'string') || entry === null) && type === undefined) {
            let __args = arguments;
            {
                let __args = arguments;
                let type: any = CompletionItem.Type.UNKNOWN;
                if (this.entry === undefined) { this.entry = null; } 
                if (this.type === undefined) { this.type = null; } 
                this.entry = entry;
                this.type = type;
            }
        } else throw new Error('invalid overload');
    }

    public type: CompletionItem.Type;

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return this.entry + " " + this.type;
    }

    /**
     * 
     * @param {*} obj
     * @return {boolean}
     */
    public equals(obj: any): boolean {
        const cmp: CompletionItem = <CompletionItem>obj;
        if (!(cmp.entry === this.entry))return false;
        if (cmp.type == null && this.type != null)return false;
        if (cmp.type != null && this.type == null)return false;
        if (cmp.type != null && !/* Enum.equals */(<any>(cmp.type) === <any>(this.type)))return false;
        return true;
    }

    public lspCode(): number {
        switch((this.type)) {
        case CompletionItem.Type.TABLE:
            return 6;
        case CompletionItem.Type.VIEW:
            return 6;
        case CompletionItem.Type.COLUMN:
            return 5;
        case CompletionItem.Type.USER:
            return 1;
        case CompletionItem.Type.KEYWORD:
            return 14;
        case CompletionItem.Type.SYNONYM:
            return 1;
        case CompletionItem.Type.PROCEDURE:
            return 3;
        case CompletionItem.Type.FUNCTION:
            return 3;
        case CompletionItem.Type.PACKAGE:
            return 9;
        case CompletionItem.Type.PACKAGE_BODY:
            return 9;
        case CompletionItem.Type.INDEX:
            return 6;
        case CompletionItem.Type.OTHER_DB_OBJECT:
            return 6;
        case CompletionItem.Type.CONDITION:
            return 15;
        case CompletionItem.Type.JAVA_PACKAGE:
            return 19;
        case CompletionItem.Type.JAVA_CLASS:
            return 3;
        case CompletionItem.Type.JAVA_METHOD:
            return 2;
        case CompletionItem.Type.JAVA_VARIABLE:
            return 6;
        case CompletionItem.Type.SNIPPET:
            return 15;
        default:
            return 1;
        }
    }

    /**
     * 
     * @return {string}
     */
    public toJson(): string {
        return "{\"label\":\"" + Util.sugarcoatText(this.entry) + "\",\"kind\":" + this.lspCode() + "}";
    }
}
CompletionItem["__class"] = "oracle.dbtools.app.CompletionItem";
CompletionItem["__interfaces"] = ["oracle.dbtools.parser.json.Jsonable"];



export namespace CompletionItem {

    export enum Type {
        TABLE, VIEW, COLUMN, USER, KEYWORD, TURLNET, SYNONYM, SEQUENCE, PROCEDURE, FUNCTION, PACKAGE, PACKAGE_BODY, INDEX, OTHER_DB_OBJECT, CONDITION, ARGUMENT, PARTIALLY_RECOGNIZED_SYNTAX, JAVA_PACKAGE, JAVA_CLASS, JAVA_METHOD, JAVA_VARIABLE, SNIPPET, FILE, OPTION, PARAMETER, STRING, BOOLEAN, UNKNOWN
    }
}



