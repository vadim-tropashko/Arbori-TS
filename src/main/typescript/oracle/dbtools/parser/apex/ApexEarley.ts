/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Array as JArray } from '../../../arbori/util/Array.js';
import { Service } from '../../../arbori/util/Service.js';
import { Earley } from '../Earley.js';
import { Grammar } from '../Grammar.js';
import { LexerToken } from '../LexerToken.js';
import { Parseable } from '../Parseable.js';
import { ParseNode } from '../ParseNode.js';
import { RuleTransforms } from '../RuleTransforms.js';
import { RuleTuple } from '../RuleTuple.js';
import { Token } from '../Token.js';

/**
 * Creates the Earley parser backed by the APEX grammar resource.
 * @extends Earley
 * @class
 */
export class ApexEarley extends Earley implements Parseable {
    static GENERATED_RULE: Pattern; public static GENERATED_RULE_$LI$(): Pattern { if (ApexEarley.GENERATED_RULE == null) { ApexEarley.GENERATED_RULE = Pattern.compile(".*_[0-9]+$"); }  return ApexEarley.GENERATED_RULE; }

    static instance: ApexEarley = null;

    /*private*/ notOptimizableHeadSymbols: number[];

    /*private*/ arrayValues: number;

    /*private*/ number: number;

    /*private*/ scalar: number;

    constructor(rules: Array<RuleTuple>) {
        super(rules);
        if (this.notOptimizableHeadSymbols === undefined) { this.notOptimizableHeadSymbols = null; }
        if (this.arrayValues === undefined) { this.arrayValues = 0; }
        if (this.number === undefined) { this.number = 0; }
        if (this.scalar === undefined) { this.scalar = 0; }
        this.arrayValues = this.getSymbol("array_values");
        this.number = this.getSymbol("number");
        this.scalar = this.getSymbol("scalar");
    }

    /**
     * 
     * @param {number} index
     * @param {LexerToken[]} tokens
     * @param {number} symbol
     * @param {number} suspect
     * @return {boolean}
     */
    isIdentifier(index: number, tokens: Array<LexerToken>, symbol: number, suspect: number): boolean {
        const token: LexerToken = /* get */tokens[index];
        return symbol === this.identifier && ApexEarley.isValueToken(token) || symbol === this.digits && token.type === Token.DIGITS || symbol === this.number && token.type === Token.DIGITS;
    }

    /*private*/ static isValueToken(token: LexerToken): boolean {
        return token.type === Token.IDENTIFIER || token.type === Token.DQUOTED_STRING || token.type === Token.QUOTED_STRING || token.type === Token.HTML_CODE || token.type === Token.UNKNOWN;
    }

    public isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple: Parser.Tuple, preSym: number, mid: number, y: number): boolean {
        if (this.notOptimizableHeadSymbols == null){
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.arrayValues);
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.scalar);
            this.notOptimizableHeadSymbols = JArray.insert$int_A$int(this.notOptimizableHeadSymbols, this.getSymbol("scalar_value"));
        }
        const index: number = JArray.indexOf$int_A$int(this.notOptimizableHeadSymbols, tuple.head);
        if (this.notOptimizableHeadSymbols[index] === tuple.head){
            return false;
        }
        if (ApexEarley.GENERATED_RULE_$LI$().matcher(this.allSymbols[tuple.head]).matches()){
            return false;
        }
        return super.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple, preSym, mid, y);
    }

    /**
     * 
     * @param {Parser.Tuple} tuple
     * @param {number} preSym
     * @param {number} mid
     * @param {number} y
     * @return {boolean}
     */
    public isOptimizable(tuple?: any, preSym?: any, mid?: any, y?: any): boolean {
        if (((tuple != null && tuple instanceof <any>Parser.Tuple) || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$oracle_dbtools_parser_Parser_Tuple$int$int$int(tuple, preSym, mid, y);
        } else if (((tuple != null && (tuple instanceof Array)) || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return super.isOptimizable(tuple, preSym, mid, y);
        } else if (((typeof tuple === 'number') || tuple === null) && ((typeof preSym === 'number') || preSym === null) && ((typeof mid === 'number') || mid === null) && ((typeof y === 'number') || y === null)) {
            return <any>this.isOptimizable$int$int$int$int(tuple, preSym, mid, y);
        } else throw new Error('invalid overload');
    }

    /**
     * Returns the shared APEX parser instance.
     * 
     * @return {ApexEarley} the APEX parser
     * @throws IOException when the grammar resource cannot be read
     */
    public static getInstance(): ApexEarley {
        if (true)throw Object.defineProperty(new Error("Deprecated in favor of APEXLangSecurityAnalyzer"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        if (ApexEarley.instance != null){
            return ApexEarley.instance;
        }
        const rules: Array<RuleTuple> = <any>([]);
        const input: string = Service.readFile$java_lang_Class$java_lang_String(ApexEarley, "apex.grammar");
        const source: Array<LexerToken> = LexerToken.parse$java_lang_String$boolean$int(input, false, LexerToken.QuotedStrings_$LI$() + LexerToken.JavaSqlMultilineComments_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(source, input);
        Grammar.grammar(root, source, rules);
        RuleTransforms.eliminateEmptyProductions(rules);
        ApexEarley.instance = new ApexEarley(rules);
        ApexEarley.instance.isCaseSensitive = true;
        return ApexEarley.instance;
    }
}
ApexEarley["__class"] = "oracle.dbtools.parser.apex.ApexEarley";
ApexEarley["__interfaces"] = ["oracle.dbtools.parser.Parseable"];





import { Parser } from '../Parser.js';

