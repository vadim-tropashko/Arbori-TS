/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../Earley.js';
import { LexerToken } from '../LexerToken.js';
import { RuleTuple } from '../RuleTuple.js';
import { Service } from '../../../arbori/util/Service.js';
import { Parser } from '../Parser.js';
import { LongHelper } from '../../../../javaemul/internal/LongHelper.js';
import { IntegerHelper } from '../../../../javaemul/internal/IntegerHelper.js';

/**
 * MySQL Earley parser with classloader-local grammar and prediction state.
 * 
 * <p>Each instance has local parse state and shares initialized grammar and
 * prediction data.
 * @class
 * @extends Earley
 */
export class MysqlEarley extends Earley {
    public static visualize: boolean = false;

    static frequencies: any = null;

    static TEMPLATE: MysqlEarley; public static TEMPLATE_$LI$(): MysqlEarley { if (MysqlEarley.TEMPLATE == null) { MysqlEarley.TEMPLATE = MysqlEarley.createTemplate(); }  return MysqlEarley.TEMPLATE; }

    public constructor(rules?: any) {
        if (((rules != null && (rules instanceof Array)) || rules === null)) {
            let __args = arguments;
            super(rules);
            this.tableSourceItem = this.getSymbol("tableSourceItem");
            this.keywords = ["\'WITH\'", "\'SELECT\'", "\'FROM\'", "\'WHERE\'", "\'AND\'", "\'OR\'", "\'NOT\'", "\'DISTINCT\'", "\'UNION\'", "\'ALL\'", "\'INNER\'", "\'LEFT\'", "\'FULL\'", "\'ON\'", "\'INSERT\'", "\'UPDATE\'", "\'CREATE\'", "\'ALTER\'", "\'TABLE\'", "\'VALUES\'", "\'CASE\'", "\'WHEN\'", "\'AS\'", "\'BEGIN\'", "\'END\'", "\'IN\'"];
            this._keywords = <any>([]);
            this.initKeywords();
        } else if (((rules != null && rules instanceof <any>MysqlEarley) || rules === null)) {
            let __args = arguments;
            let source: any = __args[0];
            super();
            this.tableSourceItem = this.getSymbol("tableSourceItem");
            this.keywords = ["\'WITH\'", "\'SELECT\'", "\'FROM\'", "\'WHERE\'", "\'AND\'", "\'OR\'", "\'NOT\'", "\'DISTINCT\'", "\'UNION\'", "\'ALL\'", "\'INNER\'", "\'LEFT\'", "\'FULL\'", "\'ON\'", "\'INSERT\'", "\'UPDATE\'", "\'CREATE\'", "\'ALTER\'", "\'TABLE\'", "\'VALUES\'", "\'CASE\'", "\'WHEN\'", "\'AS\'", "\'BEGIN\'", "\'END\'", "\'IN\'"];
            this._keywords = <any>([]);
            this.allSymbols = source.allSymbols;
            this.symbolIndexes = source.symbolIndexes;
            this.rules = source.rules;
            this.identifier = source.identifier;
            this.string_literal = source.string_literal;
            this.digits = source.digits;
            this.isCaseSensitive = source.isCaseSensitive;
            this.predicts = source.predicts;
            this.terminalPredictions = source.terminalPredictions;
            this.skipRanges = source.skipRanges;
            this.tableSourceItem = source.tableSourceItem;
            this.keywords = source.keywords;
            this._keywords = source._keywords;
        } else if (rules === undefined) {
            let __args = arguments;
            {
                let __args = arguments;
                let source: any = MysqlEarley.TEMPLATE_$LI$();
                super();
                this.tableSourceItem = this.getSymbol("tableSourceItem");
                this.keywords = ["\'WITH\'", "\'SELECT\'", "\'FROM\'", "\'WHERE\'", "\'AND\'", "\'OR\'", "\'NOT\'", "\'DISTINCT\'", "\'UNION\'", "\'ALL\'", "\'INNER\'", "\'LEFT\'", "\'FULL\'", "\'ON\'", "\'INSERT\'", "\'UPDATE\'", "\'CREATE\'", "\'ALTER\'", "\'TABLE\'", "\'VALUES\'", "\'CASE\'", "\'WHEN\'", "\'AS\'", "\'BEGIN\'", "\'END\'", "\'IN\'"];
                this._keywords = <any>([]);
                this.allSymbols = source.allSymbols;
                this.symbolIndexes = source.symbolIndexes;
                this.rules = source.rules;
                this.identifier = source.identifier;
                this.string_literal = source.string_literal;
                this.digits = source.digits;
                this.isCaseSensitive = source.isCaseSensitive;
                this.predicts = source.predicts;
                this.terminalPredictions = source.terminalPredictions;
                this.skipRanges = source.skipRanges;
                this.tableSourceItem = source.tableSourceItem;
                this.keywords = source.keywords;
                this._keywords = source._keywords;
            }
            this.tableSourceItem = this.getSymbol("tableSourceItem");
            this.keywords = ["\'WITH\'", "\'SELECT\'", "\'FROM\'", "\'WHERE\'", "\'AND\'", "\'OR\'", "\'NOT\'", "\'DISTINCT\'", "\'UNION\'", "\'ALL\'", "\'INNER\'", "\'LEFT\'", "\'FULL\'", "\'ON\'", "\'INSERT\'", "\'UPDATE\'", "\'CREATE\'", "\'ALTER\'", "\'TABLE\'", "\'VALUES\'", "\'CASE\'", "\'WHEN\'", "\'AS\'", "\'BEGIN\'", "\'END\'", "\'IN\'"];
            this._keywords = <any>([]);
        } else throw new Error('invalid overload');
    }

    /*private*/ static createTemplate(): MysqlEarley {
        try {
            const parser: MysqlEarley = new MysqlEarley(MysqlRules.getRules());
            parser.precomputePredictions();
            MysqlEarley.getFrequencies();
            return parser;
        } catch(e) {
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.LinkageError','java.lang.Error','java.lang.Object','java.lang.ExceptionInInitializerError'] });
        }
    }

    tableSourceItem: number;

    public keywords: string[];

    /*private*/ _keywords: Array<number>;

    initKeywords() {
        for(let index = 0; index < this.keywords.length; index++) {
            let k = this.keywords[index];
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this._keywords, this.getSymbol(k))
        }
    }

    /**
     * 
     * @param {number} y
     * @param {LexerToken[]} src
     * @param {number} symbol
     * @param {number} suspect
     * @return {boolean}
     */
    isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
        if (suspect != null && /* contains */(this._keywords.indexOf(<any>(suspect)) >= 0))return false;
        return super.isIdentifier(y, src, symbol, suspect);
    }

    public isOptimizable(src?: any, x?: any, mid?: any, y?: any): boolean {
        if (((src != null && (src instanceof Array)) || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return super.isOptimizable(src, x, mid, y);
        } else if (((src != null && src instanceof <any>Parser.Tuple) || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(src, x, mid, y);
        } else if (((typeof src === 'number') || src === null) && ((typeof x === 'number') || x === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$int$int$int$int(src, x, mid, y);
        } else throw new Error('invalid overload');
    }

    isOptimizable$int$int$int$int(headSym: number, preSym: number, mid: number, y: number): boolean {
        if (headSym === this.tableSourceItem)return false;
        return super.isOptimizable$int$int$int$int(headSym, preSym, mid, y);
    }

    public static frequenciesFN: string = "frequencies.txt";

    public static path: string = "/oracle/dbtools/parser/mysql/";

    public static getFrequencies(): any {
        if (MysqlEarley.frequencies == null){
            MysqlEarley.frequencies = <any>({});
            let u: URL = MysqlEarley.getResource(MysqlEarley.path + MysqlEarley.frequenciesFN);
            try {
                if (u == null)u = Service.fileNameGitResource(MysqlEarley, MysqlEarley.path + MysqlEarley.frequenciesFN);
                const is: { str: string, cursor: number } = u.openStream();
                const st: StringTokenizer = new StringTokenizer(Service.readFile$java_io_InputStream(is), "\n");
                while((st.hasMoreTokens())) {{
                    let token: string = st.nextToken();
                    token = token.trim();
                    const pos: number = token.indexOf('=');
                    const head: string = token.substring(0, pos);
                    const tail: string = token.substring(pos + 1);
                    /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>MysqlEarley.frequencies, LongHelper.decode(head), IntegerHelper.decode(tail));
                }};
                /* close */;
            } catch(e) {
                console.error("Failed to read frequencies: " + e.message);
            }
        }
        return MysqlEarley.frequencies;
    }
}
MysqlEarley["__class"] = "oracle.dbtools.parser.mysql.MysqlEarley";




import { MysqlRules } from './MysqlRules.js';

