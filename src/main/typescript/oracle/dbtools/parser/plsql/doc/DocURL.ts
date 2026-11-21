/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { SqlEarley } from '../SqlEarley.js';
import { Service } from '../../../../arbori/util/Service.js';

export class DocURL {
    static serialVersionUID: number = 1;

    static docRoot: string = "https://docs.oracle.com/";

    public pageParagraph: string;

    public man: DocURL.Manual;

    public constructor(man?: any, doc?: any) {
        if (((typeof man === 'number') || man === null) && ((typeof doc === 'string') || doc === null)) {
            let __args = arguments;
            if (this.pageParagraph === undefined) { this.pageParagraph = null; } 
            if (this.man === undefined) { this.man = null; } 
            this.pageParagraph = doc;
            this.man = man;
        } else if (((typeof man === 'string') || man === null) && ((typeof doc === 'string') || doc === null)) {
            let __args = arguments;
            if (this.pageParagraph === undefined) { this.pageParagraph = null; } 
            if (this.man === undefined) { this.man = null; } 
            this.pageParagraph = doc;
            if (DocURL.Manual["_$wrappers"][DocURL.Manual.SQL].toString() === man)this.man = DocURL.Manual.SQL; else if (DocURL.Manual["_$wrappers"][DocURL.Manual.PLSQL].toString() === man)this.man = DocURL.Manual.PLSQL; else if (DocURL.Manual["_$wrappers"][DocURL.Manual.SQLPLUS].toString() === man)this.man = DocURL.Manual.SQLPLUS; else throw Object.defineProperty(new Error(man + "??"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        } else throw new Error('invalid overload');
    }

    public getPublicURL(): string {
        return DocURL.Manual["_$wrappers"][this.man].getBasePublicURL() + this.pageParagraph;
    }

    public getPrivateURL(): string {
        return DocURL.Manual["_$wrappers"][this.man].getBasePrivateURL() + this.pageParagraph;
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return this.getPublicURL();
    }

    public static main(args: string[]) {
        const regexp_like_condition: number = SqlEarley.getInstance().getSymbol("regexp_like_condition");
        const where_clause: number = SqlEarley.getInstance().getSymbol("where_clause");
        const templates: Array<Substr> = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>HarvestDoc.getTemplates(), Service.lPair(regexp_like_condition, where_clause));
        for(let index = 0; index < templates.length; index++) {
            let t = templates[index];
            console.info(t.toString())
        }
    }

    public getMan(): any {
        return this.man;
    }

    public getPageParagraph(): string {
        return this.pageParagraph;
    }
}
DocURL["__class"] = "oracle.dbtools.parser.plsql.doc.DocURL";


export namespace DocURL {

    export enum Manual {
        SQL, PLSQL, SQLPLUS
    }

    /** @ignore */
    export class Manual_$WRAPPER {
        constructor(protected _$ordinal: number, protected _$name: string) {
        }

        public getBasePrivateURL(): string {
            return this.getBasePublicURL();
        }

        public getBasePublicURL(): string {
            switch((this._$ordinal)) {
            case DocURL.Manual.SQL:
                return DocURL.docRoot + "en/database/oracle/oracle-database/26/sqlrf/";
            case DocURL.Manual.PLSQL:
                return DocURL.docRoot + "en/database/oracle/oracle-database/26/lnpls/";
            case DocURL.Manual.SQLPLUS:
                return DocURL.docRoot + "en/database/oracle/oracle-database/19/sqpqr/";
            }
            throw Object.defineProperty(new Error("VT:impossible"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        public name(): string { return this._$name; }
        public ordinal(): number { return this._$ordinal; }
        public compareTo(other: any): number { return this._$ordinal - (isNaN(other)?other._$ordinal:other); }
    }
    Manual["__class"] = "oracle.dbtools.parser.plsql.doc.DocURL.Manual";
    Manual["_$wrappers"] = {0: new Manual_$WRAPPER(0, "SQL"), 1: new Manual_$WRAPPER(1, "PLSQL"), 2: new Manual_$WRAPPER(2, "SQLPLUS")};

}




import { HarvestDoc } from './HarvestDoc.js';


import { Substr } from './Substr.js';
