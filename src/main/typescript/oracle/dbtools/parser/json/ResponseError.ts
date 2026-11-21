/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
export class ResponseError implements Jsonable {
    code: number;

    public message: string;

    data: any;

    public constructor(code: number, message: string, data: any) {
        this.code = 0;
        this.message = null;
        this.data = null;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return "code=" + this.code + ",message=" + this.message + ",data=" + this.data;
    }

    /**
     * 
     * @return {string}
     */
    public toJson(): string {
        let d: string = "";
        if (this.data != null && (this.data.constructor != null && this.data.constructor["__interfaces"] != null && this.data.constructor["__interfaces"].indexOf("oracle.dbtools.parser.json.Jsonable") >= 0))d = (<Jsonable><any>this.data).toJson(); else if (typeof this.data === 'string')d = "\"" + Util.sugarcoatText(<string>this.data) + "\"";
        if (0 < d.length)d = " , \"data\": " + d;
        return "{ \"code\": " + this.code + ", \"message\": \"" + this.message + "\"" + d + " }";
    }
}
ResponseError["__class"] = "oracle.dbtools.parser.json.ResponseError";
ResponseError["__interfaces"] = ["oracle.dbtools.parser.json.Jsonable"];





import { Util } from './Util.js';


import { Jsonable } from './Jsonable.js';

