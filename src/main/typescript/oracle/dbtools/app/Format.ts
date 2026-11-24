/* Generated from Java with JSweet 3.1.3 - http://www.jsweet.org */
import { DBUtil } from '../db/DBUtil.js';
import { MessageLogging } from '../raptor/utils/MessageLogging.js';
import { Service } from '../../arbori/util/Service.js';
import { Lexer } from '../parser/Lexer.js';
import { LexerToken } from '../parser/LexerToken.js';
import { Token } from '../parser/Token.js';
import { ParseNode } from '../parser/ParseNode.js';
import { Parsed } from '../parser/Parsed.js';
import { SqlEarley } from '../parser/plsql/SqlEarley.js';
import { SyntaxError } from '../parser/plsql/SyntaxError.js';
import { Yelrae } from '../parser/Yelrae.js';
import { SqlProgram } from '../arbori/SqlProgram.js';

export class Format {
    public formatWhenSyntaxError: string;

    public parseForwardAndBackward: string;

    public singleLineComments: string;

    public kwCase: string;

    public idCase: string;

    public adjustCaseOnly: string;

    public removeDoubleQuotes: string;

    public formatThreshold: string;

    public alignTabColAliases: string;

    public alignTypeDecl: string;

    public alignNamedArgs: string;

    public alignAssignments: string;

    public alignEquality: string;

    public alignRight: string;

    public identSpaces: string;

    public useTab: string;

    public breaksComma: string;

    public __breaksProcArgs: string;

    public breaksConcat: string;

    public breaksAroundLogicalConjunctions: string;

    public breaksAfterSelect: string;

    public commasPerLine: string;

    public breakOnSubqueries: string;

    public breakAnsiiJoin: string;

    public breakParenCondition: string;

    public maxCharLineSize: string;

    public forceLinebreaksBeforeComment: string;

    public extraLinesAfterSignificantStatements: string;

    public flowControl: string;

    public spaceAroundOperators: string;

    public spaceAfterCommas: string;

    public spaceAroundBrackets: string;

    public formatProgramURL: string;

    public options: any;

    public constructor() {
        this.formatWhenSyntaxError = "formatWhenSyntaxError";
        this.parseForwardAndBackward = "parseForwardAndBackward";
        this.singleLineComments = "singleLineComments";
        this.kwCase = "kwCase";
        this.idCase = "idCase";
        this.adjustCaseOnly = "adjustCaseOnly";
        this.removeDoubleQuotes = "removeDoubleQuotes";
        this.formatThreshold = "formatThreshold";
        this.alignTabColAliases = "alignTabColAliases";
        this.alignTypeDecl = "alignTypeDecl";
        this.alignNamedArgs = "alignNamedArgs";
        this.alignAssignments = "alignAssignments";
        this.alignEquality = "alignEquality";
        this.alignRight = "alignRight";
        this.identSpaces = "identSpaces";
        this.useTab = "useTab";
        this.breaksComma = "breaksComma";
        this.__breaksProcArgs = "breaksProcArgs";
        this.breaksConcat = "breaksConcat";
        this.breaksAroundLogicalConjunctions = "breaksAroundLogicalConjunctions";
        this.breaksAfterSelect = "breaksAfterSelect";
        this.commasPerLine = "commasPerLine";
        this.breakOnSubqueries = "breakOnSubqueries";
        this.breakAnsiiJoin = "breakAnsiiJoin";
        this.breakParenCondition = "breakParenCondition";
        this.maxCharLineSize = "maxCharLineSize";
        this.forceLinebreaksBeforeComment = "forceLinebreaksBeforeComment";
        this.extraLinesAfterSignificantStatements = "extraLinesAfterSignificantStatements";
        this.flowControl = "flowControl";
        this.spaceAroundOperators = "spaceAroundOperators";
        this.spaceAfterCommas = "spaceAfterCommas";
        this.spaceAroundBrackets = "spaceAroundBrackets";
        this.formatProgramURL = "formatProgramURL";
        this.options = new Format.Format$0(this);
        this.inputPos = -1;
        this.outputPos = -1;
        this.path = "/oracle/dbtools/app/";
        this.programInstance = null;
        this.unary_add_op = SqlEarley.getInstance().getSymbol("unary_add_op");
        this.sql_statement = SqlEarley.getInstance().getSymbol("sql_statement");
        this.numeric_literal = SqlEarley.getInstance().getSymbol("numeric_literal");
        this.exp = SqlEarley.getInstance().getSymbol("\".exp.\"");
        this.posDepths = <any>({});
        this.newlinePositions = <any>({});
        this.casedIds = <any>({});
        this.maxIdLengthInScope = <any>({});
        this.ids2scope = <any>({});
        this.ids2interval = <any>({});
        this.ids2adjustments = <any>({});
        this.scopeFrequency = new Map<string, number>();
        this.skipWSPositions = <any>([]);
        this.unformattedPositions = <any>([]);
        this.spaceSequenceCache = null;
        this.spaceSequenceUseTab = false;
        this.spaceSequenceIdentSpaces = -1;
        if (this.priorProc === undefined) { this.priorProc = null; }
        this.argNum = 1;
        if (this.priorScope === undefined) { this.priorScope = null; }
        this.cNum = 1;
        this.setDefaultOptions();
    }

    public setDefaultOptions() {
        /* put */(this.options[this.formatWhenSyntaxError] = true);
        /* put */(this.options[this.parseForwardAndBackward] = true);
        /* put */(this.options[this.singleLineComments] = Format.InlineComments.CommentsUnchanged);
        /* put */(this.options[this.kwCase] = Format.Case.UPPER);
        /* put */(this.options[this.idCase] = Format.Case.lower);
        /* put */(this.options[this.adjustCaseOnly] = false);
        /* put */(this.options[this.removeDoubleQuotes] = false);
        /* put */(this.options[this.formatThreshold] = 1);
        /* put */(this.options[this.alignTabColAliases] = true);
        /* put */(this.options[this.alignTypeDecl] = true);
        /* put */(this.options[this.alignNamedArgs] = true);
        /* put */(this.options[this.alignEquality] = false);
        /* put */(this.options[this.alignAssignments] = false);
        /* put */(this.options[this.alignRight] = false);
        /* put */(this.options[this.identSpaces] = 4);
        /* put */(this.options[this.useTab] = false);
        /* put */(this.options[this.breaksComma] = Format.Breaks.After);
        /* put */(this.options[this.__breaksProcArgs] = false);
        /* put */(this.options[this.breaksConcat] = Format.Breaks.Before);
        /* put */(this.options[this.breaksAroundLogicalConjunctions] = Format.Breaks.Before);
        /* put */(this.options[this.breaksAfterSelect] = true);
        /* put */(this.options[this.commasPerLine] = 5);
        /* put */(this.options[this.breakOnSubqueries] = true);
        /* put */(this.options[this.breakAnsiiJoin] = false);
        /* put */(this.options[this.breakParenCondition] = false);
        /* put */(this.options[this.maxCharLineSize] = 128);
        /* put */(this.options[this.forceLinebreaksBeforeComment] = false);
        /* put */(this.options[this.extraLinesAfterSignificantStatements] = Format.BreaksX2.X2);
        /* put */(this.options[this.flowControl] = Format.FlowControl.IndentedActions);
        /* put */(this.options[this.spaceAroundOperators] = true);
        /* put */(this.options[this.spaceAfterCommas] = true);
        /* put */(this.options[this.spaceAroundBrackets] = Format.Space.Default);
        /* put */(this.options[this.formatProgramURL] = "default");
    }

    public setOptions(changed: any) {
        {
            let array = /* keySet */Object.keys(changed);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                /* put */(this.options[key] = /* get */((m,k) => m[k]===undefined?null:m[k])(changed, key))
            }
        }
    }

    public verifyOptions(changed: any, isVerifyCommand: boolean) {
        let errorFound: boolean = false;
        const resultMessage: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        {
            let array = /* keySet */Object.keys(changed);
            for(let index = 0; index < array.length; index++) {
                let key = array[index];
                {
                    if (!/* containsKey */this.options.hasOwnProperty(key)){
                        /* append */(sb => { sb.str += <any>" is not listed in Format.options"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    const value: any = /* get */((m,k) => m[k]===undefined?null:m[k])(changed, key);
                    if ((this.formatWhenSyntaxError === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.parseForwardAndBackward === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.singleLineComments === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not InlineComments"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.kwCase === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not Case"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.idCase === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not Case"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.adjustCaseOnly === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.removeDoubleQuotes === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.alignTabColAliases === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.alignTypeDecl === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.alignNamedArgs === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.alignEquality === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.alignAssignments === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.alignRight === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.useTab === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.breaksComma === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not Breaks"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.__breaksProcArgs === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.breaksConcat === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not Breaks"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.breaksAroundLogicalConjunctions === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not Breaks"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.breaksAfterSelect === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.breakOnSubqueries === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.breakAnsiiJoin === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.breakParenCondition === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.forceLinebreaksBeforeComment === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.extraLinesAfterSignificantStatements === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not BreaksX2"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.flowControl === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not FlowControl"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.spaceAroundOperators === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.spaceAfterCommas === key) && !(typeof value === 'boolean')){
                        /* append */(sb => { sb.str += <any>" value is not Boolean"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                    if ((this.spaceAroundBrackets === key) && !(typeof value === 'number')){
                        /* append */(sb => { sb.str += <any>" value is not Space"; return sb; })(/* append */(sb => { sb.str += <any>key; return sb; })(/* append */(sb => { sb.str += <any>errorFound ? "\n" : ""; return sb; })(resultMessage)));
                        errorFound = true;
                    }
                }
            }
        }
        if (errorFound && !isVerifyCommand)throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    public getIntOption(name: string): number {
        return <number>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, name);
    }

    public getCommasPerLine(): number {
        return this.getIntOption("commasPerLine");
    }

    public indentLength(): number {
        return this.getIntOption("identSpaces");
    }

    public getBoolBind(name: string): boolean {
        return this.programInstance.getBoolBindVar(name);
    }

    public breaksAfterComma(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksComma) === Format.Breaks.After;
    }

    public breaksBeforeComma(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksComma) === Format.Breaks.Before;
    }

    public breaksAfterLogicalConjunction(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksAroundLogicalConjunctions) === Format.Breaks.After || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksAroundLogicalConjunctions) === Format.Breaks.BeforeAndAfter;
    }

    public breaksBeforeLogicalConjunction(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksAroundLogicalConjunctions) === Format.Breaks.Before || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksAroundLogicalConjunctions) === Format.Breaks.BeforeAndAfter;
    }

    public breaksAfterConcat(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksConcat) === Format.Breaks.After || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksConcat) === Format.Breaks.BeforeAndAfter;
    }

    public breaksBeforeConcat(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksConcat) === Format.Breaks.Before || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksConcat) === Format.Breaks.BeforeAndAfter;
    }

    public breaksAfterSelectFromWhere(): boolean {
        return <boolean>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.breaksAfterSelect);
    }

    public spaceParenDefault(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.Default;
    }

    public noSpaceBeforeOpenParen(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.Inside || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.NoSpace;
    }

    public noSpaceBeforeCloseParen(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.Outside || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.NoSpace;
    }

    public noSpaceAfterOpenParen(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.Outside || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.NoSpace;
    }

    public noSpaceAfterCloseParen(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.Inside || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.spaceAroundBrackets) === Format.Space.NoSpace;
    }

    public indentConditions(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.flowControl) === Format.FlowControl.IndentedConditionsActions;
    }

    public indentActions(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.flowControl) === Format.FlowControl.IndentedConditionsActions || /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.flowControl) === Format.FlowControl.IndentedActions;
    }

    public breakAfterConditions(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.flowControl) === Format.FlowControl.SeparateConditionsActions;
    }

    public breakAfterThen(): boolean {
        return /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.flowControl) === Format.FlowControl.IndentedActions;
    }

    public inputPos: number;

    public outputPos: number;

    path: string;

    programInstance: SqlProgram;

    public resetProgramInstance$java_lang_String(prg: string) {
        /* put */(this.options[this.formatProgramURL] = prg);
        this.programInstance = null;
    }

    public resetProgramInstance(prg?: any) {
        if (((typeof prg === 'string') || prg === null)) {
            return <any>this.resetProgramInstance$java_lang_String(prg);
        } else if (prg === undefined) {
            return <any>this.resetProgramInstance$();
        } else throw new Error('invalid overload');
    }

    public resetProgramInstance$() {
        this.programInstance = null;
    }

    public getActiveFormatProgram(): string {
        let ret: string = Service.readFile$java_lang_Class$java_lang_String(Format, this.path + "format.prg");
        const tmp: any = /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.formatProgramURL);
        if (tmp != null){
            try {
                const customURL: string = <string>tmp;
                if (!/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("default", customURL))ret = Service.readFile$java_lang_String(customURL);
            } catch(e) {
                console.info("Failed to read custom formatting program " + tmp.toString());
                console.info(e.message);
            }
        }
        return ret;
    }

    unary_add_op: number;

    sql_statement: number;

    numeric_literal: number;

    exp: number;

    public getRethrowSyntaxError(): boolean {
        return !<boolean>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.formatWhenSyntaxError);
    }

    public setRethrowSyntaxError(rethrow: boolean) {
        /* put */(this.options[this.formatWhenSyntaxError] = !rethrow);
    }

    /**
     * Preprocess input and delegate work to formatFragment
     * @param {string} input
     * @return
     * @throws IOException
     * @return {string}
     */
    public format(input: string): string {
        this.checkValidity();
        this.initCallbackScaffolds();
        const output: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        this.outputPos = -1;
        let target: Parsed = null;
        if (this.programInstance == null){
            const formaterArboriCode: string = this.getActiveFormatProgram();
            this.programInstance = new Format.Format$1(this, formaterArboriCode, this);
        } else this.programInstance.setStruct(this);
        try {
            const src: Array<LexerToken> = Lexer.parse(input);
            let i: number = 0;
            for(let index = 0; index < src.length; index++) {
                let t = src[index];
                {
                    if (20 < i++)break;
                    if (t.type === Token.WRAP)return input;
                }
            }
            let rootPayload: string = "sql_statements";
            if (!this.getRethrowSyntaxError())if (<boolean>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.parseForwardAndBackward))rootPayload = Yelrae.PARSE_WITH_ERRORS;
            target = new Parsed(input, src, SqlEarley.getInstance(), [rootPayload]);
            if (this.getRethrowSyntaxError() && target.getSyntaxError() != null)throw target.getSyntaxError();
            this.programInstance.eval(target, this);
            if (this.inputPos < 1)this.outputPos = /* length */output.str.length;
        } catch(__e) {
            if(__e != null && __e instanceof <any>SyntaxError) {
                const e: SyntaxError = <SyntaxError>__e;
                this.outputPos = e.end;
                if (this.getRethrowSyntaxError())throw e;
                return input;

            }
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Exception") >= 0) || __e != null && __e instanceof <any>Error) {
                const e: Error = <Error>__e;
                if (this.getRethrowSyntaxError())throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                return input;

            }
        }
        const fullCode: Array<LexerToken> = Lexer.parse(target.getInput(), true);
        let pos: number = -1;
        let priorIdent: string = null;
        let prior: LexerToken = null;
        let lastNewLine: number = -1;
        let lastNewLineOutputPos: number = -1;
        const root: ParseNode = target.getRoot();
        if (/* size */(<number>root.children().length) === 0)return input;
        for(let index = 0; index < fullCode.length; index++) {
            let t = fullCode[index];
            {
                if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(t.content, "JSON"))t = t;
                if (/* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.adjustCaseOnly),true))){
                    if (t.type !== Token.COMMENT && t.type !== Token.LINE_COMMENT && t.type !== Token.WS && t.type !== Token.INCOMPLETE)pos++;
                    let word: string = t.content;
                    if (t.type === Token.IDENTIFIER && !/* contains */(this.unformattedPositions.indexOf(<any>(pos)) >= 0)){
                        word = this.adjustCase(word, /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.kwCase));
                        const node: ParseNode = target.getRoot().leafAtPos(pos);
                        if (node != null && /* containsKey */this.casedIds.hasOwnProperty(node.interval()))word = /* get */((m,k) => m[k]===undefined?null:m[k])(this.casedIds, node.interval());
                    }
                    lastNewLineOutputPos = this.appendAndTrack(output, word, lastNewLineOutputPos);
                    continue;
                }
                if (this.outputPos < 0 && this.inputPos <= t.begin)this.outputPos = t.begin;
                if (/* contains */(this.unformattedPositions.indexOf(<any>(pos)) >= 0) && /* contains */(this.unformattedPositions.indexOf(<any>(pos + 1)) >= 0) || root.topLevel != null && root.coveredByOnTopLevel(pos + 1) == null){
                    lastNewLineOutputPos = this.appendAndTrack(output, t.content, lastNewLineOutputPos);
                    if (t.type !== Token.WS && t.type !== Token.INCOMPLETE && t.type !== Token.COMMENT && t.type !== Token.LINE_COMMENT && t.type !== Token.MACRO_SKIP && t.type !== Token.SQLPLUSLINECONTINUE_SKIP)pos++;
                    prior = t;
                    continue;
                }
                if (t.type === Token.WS){
                    if ("\n" === t.content){
                        lastNewLine = t.end;
                    }
                    continue;
                }
                let prior_end2t_begin: string = "";
                if (prior != null)prior_end2t_begin = target.getInput().substring(prior.end, t.begin);
                if (t.type === Token.COMMENT || t.type === Token.LINE_COMMENT || t.type === Token.MACRO_SKIP || t.type === Token.SQLPLUSLINECONTINUE_SKIP || t.type === Token.INCOMPLETE){
                    if (<boolean>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.forceLinebreaksBeforeComment) && (t.type === Token.COMMENT || t.type === Token.LINE_COMMENT)){
                        const pad: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, pos + 1);
                        if (pad != null){
                            if (prior != null && (prior.type === Token.COMMENT || prior.type === Token.LINE_COMMENT)){
                                const hasMultipleNewlines: boolean = (prior_end2t_begin.match(/\n/g) ?? []).length > 1;
                                if (hasMultipleNewlines)lastNewLineOutputPos = this.appendAndTrack(output, "\n", lastNewLineOutputPos);
                                lastNewLineOutputPos = this.appendAndTrack(output, "\n", lastNewLineOutputPos);
                            } else {
                                lastNewLineOutputPos = this.appendAndTrack(output, /* replace */pad.split(" ").join(""), lastNewLineOutputPos);
                            }
                            lastNewLineOutputPos = this.appendAndTrack(output, " ".repeat(this.indentLength()), lastNewLineOutputPos);
                        } else if (prior != null && lastNewLine < prior.end){
                            lastNewLineOutputPos = this.appendAndTrack(output, priorIdent, lastNewLineOutputPos);
                            lastNewLineOutputPos = this.appendAndTrack(output, " ".repeat(this.indentLength()), lastNewLineOutputPos);
                        }
                    } else lastNewLineOutputPos = this.appendAndTrack(output, prior_end2t_begin, lastNewLineOutputPos);
                    if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(t.content, "\r"))t.content = t.content.substring(0, t.content.length - 1) + '\n';
                    let pureContent: string = t.content;
                    let endsWNL: boolean = false;
                    if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(pureContent, "\n")){
                        pureContent = pureContent.substring(0, pureContent.length - 1);
                        endsWNL = true;
                    }
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(pureContent, "--"))pureContent = pureContent.substring(2); else if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(pureContent, "/*") && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(pureContent, "*/"))pureContent = pureContent.substring(2, pureContent.length - 2);
                    if (!/* contains */(pureContent.indexOf("\n") != -1)){
                        if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.singleLineComments) === Format.InlineComments.MultiLine){
                            lastNewLineOutputPos = this.appendAndTrack(output, "/*", lastNewLineOutputPos);
                            lastNewLineOutputPos = this.appendAndTrack(output, pureContent, lastNewLineOutputPos);
                            lastNewLineOutputPos = this.appendAndTrack(output, "*/", lastNewLineOutputPos);
                            if (endsWNL){
                                lastNewLineOutputPos = this.appendAndTrack(output, "\n", lastNewLineOutputPos);
                            }
                        } else if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.singleLineComments) === Format.InlineComments.SingleLine){
                            lastNewLineOutputPos = this.appendAndTrack(output, "--", lastNewLineOutputPos);
                            lastNewLineOutputPos = this.appendAndTrack(output, pureContent, lastNewLineOutputPos);
                        } else lastNewLineOutputPos = this.appendAndTrack(output, t.content, lastNewLineOutputPos);
                    } else lastNewLineOutputPos = this.appendAndTrack(output, t.content, lastNewLineOutputPos);
                    prior = t;
                    continue;
                }
                pos++;
                const node: ParseNode = target.getRoot().leafAtPos(pos);
                let ident: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, pos);
                if (ident != null){
                    if (prior != null && (/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.extraLinesAfterSignificantStatements) === Format.BreaksX2.Keep && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ident, "\n\n") || prior.type === Token.LINE_COMMENT || prior.type === Token.COMMENT)){
                        if (prior != null){
                            const spacing: string = /* replace *//* replace */ident.split("\n").join("").split("\r").join("");
                            const lineBreaks: string = /* replace *//* replace */prior_end2t_begin.split(" ").join("").split("\t").join("");
                            if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.extraLinesAfterSignificantStatements) !== Format.BreaksX2.Keep && priorIdent != null && ident.length < priorIdent.length){
                                ident = "\n" + spacing;
                            } else if (prior.type === Token.LINE_COMMENT || prior.type === Token.COMMENT){
                                ident = "\n";
                                const hasMultipleNewlines: boolean = (prior_end2t_begin.match(/\n/g) ?? []).length > 1;
                                if (hasMultipleNewlines)ident += "\n";
                                ident += spacing;
                            } else {
                                ident = lineBreaks + spacing;
                            }
                        }
                    }
                    lastNewLineOutputPos = this.appendAndTrack(output, ident, lastNewLineOutputPos);
                    priorIdent = ident;
                } else {
                    if (prior != null && prior.type === Token.LINE_COMMENT){
                        if (priorIdent != null)lastNewLineOutputPos = this.appendAndTrack(output, priorIdent, lastNewLineOutputPos); else lastNewLineOutputPos = this.appendAndTrack(output, "\n", lastNewLineOutputPos);
                    }
                    let scope: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.ids2scope, pos);
                    if (null != scope)scope = this.nullifySingletonIds(scope);
                    if (null != scope){
                        let maxLen: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.maxIdLengthInScope, scope);
                        if (<number>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.maxCharLineSize) + 10 < maxLen)maxLen = <number>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.maxCharLineSize) + 10;
                        const adj: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.ids2adjustments, pos);
                        let idLen: number = 0;
                        for(let i: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.ids2interval, pos); i < pos; i++) {{
                            idLen += /* get */target.getSrc()[i].content.length;
                            if (1 === this.decideSpace(target, i + 1).length)idLen++;
                        };}
                        let pad: number = maxLen + 1 - idLen;
                        if (adj != null)pad -= adj;
                        if (pad < 1)pad = 1;
                        lastNewLineOutputPos = this.appendAndTrack(output, Service.padln("", pad), lastNewLineOutputPos);
                    } else {
                        let separator: string = this.decideSpace(target, pos);
                        if (("/" === t.content) && node.parent() != null && node.parent().contains(this.sql_statement)){
                            separator = "\n";
                        }
                        const currentOffset: number = /* length */output.str.length - lastNewLineOutputPos;
                        if (<number>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.maxCharLineSize) + 5 < currentOffset && this.isBreakable(t) && prior != null && this.isBreakable(prior)){
                            if (priorIdent != null)separator = priorIdent;
                            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(separator, "\n\n"))separator = separator.substring(1);
                            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(separator, "\n\r\n"))separator = separator.substring(2);
                            if (!/* contains */(separator.indexOf("\n") != -1))separator = "\n" + separator;
                        }
                        lastNewLineOutputPos = this.appendAndTrack(output, separator, lastNewLineOutputPos);
                    }
                }
                let word: string = t.content;
                if (t.type === Token.IDENTIFIER && !/* contains */(this.unformattedPositions.indexOf(<any>(pos)) >= 0)){
                    word = this.adjustCase(word, /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.kwCase));
                }
                if (node != null && /* containsKey */this.casedIds.hasOwnProperty(node.interval()) && !/* contains */(this.unformattedPositions.indexOf(<any>(pos)) >= 0))word = /* get */((m,k) => m[k]===undefined?null:m[k])(this.casedIds, node.interval());
                lastNewLineOutputPos = this.appendAndTrack(output, word, lastNewLineOutputPos);
                prior = t;
            }
        }
        if (pos < <number>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.formatThreshold))return input;
        let ret: string = /* toString */output.str;
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(ret, "\n"))ret = ret.substring(1);
        if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.extraLinesAfterSignificantStatements) !== Format.BreaksX2.Keep)ret = /* replace */ret.split("\n\n\n").join("\n\n");
        let index: number = -1;
        while((true)) {{
            index = ret.indexOf(";/", index + 1);
            if (index < 0)break;
            if (ret.indexOf("*", index + 1) === index + 2)continue;
            try {
                const t: LexerToken = LexerToken.getTokenAtCharOffset(fullCode, index);
                if (t.type === Token.DQUOTED_STRING || t.type === Token.QUOTED_STRING || t.type === Token.COMMENT || t.type === Token.LINE_COMMENT)continue;
            } catch(e) {
            }
            ret = ret.substring(0, index) + ";\n/" + ret.substring(index + 2);
        }};
        this.inputPos = -1;
        return ret;
    }

    isBreakable(t: LexerToken): boolean {
        if ("," === t.content)return true;
        if (";" === t.content)return true;
        if ("(" === t.content)return true;
        if (")" === t.content)return true;
        if ("+" === t.content)return true;
        if (t.type === Token.OPERATION)return false;
        return true;
    }

    public static reportedNoJSEngineAvailable: boolean = false;

    checkValidity() {
        const formaterArboriCode: string = this.getActiveFormatProgram();
        const oK: boolean = this.checkIfContains(formaterArboriCode, "order_by_clause___0");
    }

    checkIfContains(formaterArboriCode: string, substr: string): boolean {
        let oK: boolean = true;
        if (formaterArboriCode.indexOf(substr) < 0)oK = false;
        if (!oK){
            MessageLogging.getInstance().log("Mising " + substr + "; had to reset format program");
            this.resetProgramInstance$();
            /* put */(this.options[this.formatProgramURL] = "default");
        }
        return oK;
    }

    nullifySingletonIds(scope: string): string {
        const cnt: number = this.scopeFrequency.get(scope);
        if (cnt == null || cnt < 2)return null;
        return scope;
    }

    decideSpace(target: Parsed, pos: number): string {
        if (pos === 0)return "";
        if (/* contains */(this.skipWSPositions.indexOf(<any>(pos)) >= 0))return "";
        return " ";
    }

    public adjustCase(word: string, changeCase: any): string {
        if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(word, "\"") && changeCase === Format.Case.lower)word = word.toLowerCase();
        if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(word, "\"") && changeCase === Format.Case.UPPER)word = word.toUpperCase();
        if (!/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(word, "\"") && changeCase === Format.Case.InitCap){
            const converted: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(word.length);
            let prior1: string = '%';
            for(let i: number = 0; i < converted.length; i++) {{
                const current: string = word.charAt(i);
                if (i === 0 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(prior1) == '_'.charCodeAt(0))converted[i] = /* toUpperCase */current.toUpperCase(); else converted[i] = /* toLowerCase */current.toLowerCase();
                prior1 = current;
            };}
            word = converted.join('');
        }
        return word;
    }

    /**
     * utility to indent a formatted line
     * @param {number} level
     * @return {string}
     */
    spaceSequence(level: number): string {
        if (level <= 0)return "";
        const useTabs: boolean = /* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(true,/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.useTab)));
        const identSpacesValue: number = <number>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.identSpaces);
        if (this.spaceSequenceCache == null || this.spaceSequenceUseTab !== useTabs || this.spaceSequenceIdentSpaces !== identSpacesValue){
            this.spaceSequenceCache = (s => { let a=[]; while(s-->0) a.push(null); return a; })(Math.max(1, level + 1));
            this.spaceSequenceCache[0] = "";
            this.spaceSequenceUseTab = useTabs;
            this.spaceSequenceIdentSpaces = identSpacesValue;
        } else if (this.spaceSequenceCache.length <= level)this.spaceSequenceCache = /* copyOf */this.spaceSequenceCache.slice(0,level + 1);
        for(let i: number = 1; i <= level; i++) {{
            if (this.spaceSequenceCache[i] == null){
                if (useTabs)this.spaceSequenceCache[i] = this.spaceSequenceCache[i - 1] + "\t"; else this.spaceSequenceCache[i] = this.spaceSequenceCache[i - 1] + " ".repeat(identSpacesValue);
            }
        };}
        return this.spaceSequenceCache[level];
    }

    appendAndTrack(output: { str: string, toString: Function }, value: string, lastNewLineOutputPos: number): number {
        if (value == null || /* isEmpty */(value.length === 0))return lastNewLineOutputPos;
        const priorLength: number = /* length */output.str.length;
        /* append */(sb => { sb.str += <any>value; return sb; })(output);
        const lastNewlineIndex: number = value.lastIndexOf('\n');
        if (lastNewlineIndex >= 0)return priorLength + lastNewlineIndex;
        return lastNewLineOutputPos;
    }

    posDepths: any;

    newlinePositions: any;

    public putNewline(pos: number, newline: string) {
        if (pos === 7)pos = pos;
        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.newlinePositions, pos, newline);
    }

    public getNewline(pos: number): string {
        return /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, pos);
    }

    public casedIds: any;

    public maxIdLengthInScope: any;

    public ids2scope: any;

    public ids2interval: any;

    public ids2adjustments: any;

    /*private*/ scopeFrequency: any;

    public skipWSPositions: Array<number>;

    public unformattedPositions: Array<number>;

    /*private*/ spaceSequenceCache: string[];

    /*private*/ spaceSequenceUseTab: boolean;

    /*private*/ spaceSequenceIdentSpaces: number;

    initCallbackScaffolds() {
        this.posDepths = <any>({});
        this.newlinePositions = <any>({});
        this.casedIds = <any>({});
        this.maxIdLengthInScope = <any>({});
        this.ids2scope = <any>({});
        this.ids2interval = <any>({});
        this.ids2adjustments = <any>({});
        this.scopeFrequency = new Map<string, number>();
        this.skipWSPositions = <any>([]);
        this.unformattedPositions = <any>([]);
        this.spaceSequenceCache = null;
    }

    public closestPrecursorDescendant(target: Parsed, tuple: any) {
        const m: string = /* getName */(<any>((target:Object) => {
            return target;

        })(new Object()).constructor).getEnclosingMethod().name;
        console.info(m + ".  " + MaterializedPredicate.tupleMnemonics(tuple, target.getSrc()));
    }

    public ancestorDescendant(target: Parsed, tuple: any) {
        const m: string = /* getName */(<any>((target:Object) => {
            return target;

        })(new Object()).constructor).getEnclosingMethod().name;
        console.info(m + ".  " + MaterializedPredicate.tupleMnemonics(tuple, target.getSrc()));
    }

    public indentedNodes1(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        if (node == null)throw Object.defineProperty(new Error("node == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        for(let i: number = node.from; i < node.to; i++) {{
            let posDepth: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.posDepths, i);
            if (posDepth == null)posDepth = 0;
            posDepth++;
            /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.posDepths, i, posDepth);
        };}
    }

    /**
     * Called after nodeDepths have been calculated
     * Sets positions with corresponding indentations strings
     * @param {Parsed} target
     * @param {*} tuple
     */
    public indentedNodes2(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        let pos: number = node.from;
        const depth: number = this.depth(pos);
        let priorDepth: number = -1;
        if (0 < pos)priorDepth = this.depth(pos - 1);
        if (priorDepth !== depth)this.putNewline(pos, "\n" + this.spaceSequence(depth));
        if (/* size */(<number>target.getSrc().length) <= node.to)return;
        pos = node.to;
        this.putNewline(pos, "\n" + this.spaceSequence(this.depth(pos)));
    }

    depth(pos: number): number {
        const ret: number = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.posDepths, pos);
        if (ret == null)return 0;
        return ret;
    }

    /**
     * Finds all identifiers (which are not keywords) and case them
     * @param {Parsed} target
     * @param {*} tuple
     */
    public identifiers(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "identifier");
        const t: LexerToken = /* get */target.getSrc()[node.from];
        if (t.type === Token.DQUOTED_STRING && /* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.removeDoubleQuotes),true))){
            const unquoted: string = t.content.substring(1, t.content.length - 1);
            const possiblyQuoted: string = DBUtil.addDoubleQuote(unquoted);
            if (unquoted === possiblyQuoted){
                t.content = unquoted;
                t.type = Token.IDENTIFIER;
            }
        }
        t.content = this.adjustCase(t.content, /* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.idCase));
        /* put */(this.casedIds[node.interval()] = t.content);
    }

    /**
     * Remove double quotes from quoted qualified object names
     * @param {Parsed} target
     * @param {*} tuple
     */
    public quotedObjectNameLiterals(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const t: LexerToken = /* get */target.getSrc()[node.from];
        if (t.type === Token.QUOTED_STRING && /* equals */(<any>((o1: any, o2: any) => o1 && o1.equals ? o1.equals(o2) : o1 === o2)(/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.removeDoubleQuotes),true))){
            const unquoted: string = t.content.substring(1, t.content.length - 1);
            t.content = "\'" + this.removePossiblyQuotedObjectNames(unquoted) + "\'";
            /* put */(this.casedIds[node.interval()] = t.content);
        }
    }

    removePossiblyQuotedObjectNames(content: string): string {
        const tokens: Array<LexerToken> = Lexer.parse(content, true);
        const result: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let index = 0; index < tokens.length; index++) {
            let token = tokens[index];
            {
                if (token.type === Token.DQUOTED_STRING){
                    /* append */(sb => { sb.str += <any>this.removePossiblyQuotedIdentifier(token.content); return sb; })(result);
                } else {
                    /* append */(sb => { sb.str += <any>token.content; return sb; })(result);
                }
            }
        }
        return /* toString */result.str;
    }

    removePossiblyQuotedIdentifier(possiblyQuotedIdentifier: string): string {
        if (possiblyQuotedIdentifier == null || possiblyQuotedIdentifier.length < 2 || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(possiblyQuotedIdentifier.charAt(0)) != '\"'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(possiblyQuotedIdentifier.charAt(possiblyQuotedIdentifier.length - 1)) != '\"'.charCodeAt(0)){
            return possiblyQuotedIdentifier;
        }
        const unquoted: string = possiblyQuotedIdentifier.substring(1, possiblyQuotedIdentifier.length - 1);
        const possiblyQuoted: string = DBUtil.addDoubleQuote(unquoted);
        if (unquoted === possiblyQuoted){
            return unquoted;
        }
        return possiblyQuotedIdentifier;
    }

    /**
     * processing paddedIdsInScope[scope id]
     * @param {Parsed} target
     * @param {*} tuple
     */
    public paddedIdsInScope(target: Parsed, tuple: any) {
        const scope: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "scope");
        let maxLen: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.maxIdLengthInScope, scope.interval());
        if (maxLen == null)maxLen = 0;
        const id: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "predecessor");
        const id1: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "follower");
        let from: number = id.from;
        let indentOffset: number = 0;
        const indent0: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, id.from);
        for(let i: number = id.to - 1; id.from <= i; i--) {{
            const indent: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, i);
            if (indent == null)continue;
            from = i;
            if (indent0 != null && indent0.length < indent.length)indentOffset += indent.length - indent0.length;
            break;
        };}
        let idLen: number = 0;
        for(let i: number = from; i < id1.from; i++) {{
            idLen += /* get */target.getSrc()[i].content.length;
            if (1 === this.decideSpace(target, i + 1).length)idLen++;
        };}
        idLen += indentOffset;
        if (maxLen < idLen)maxLen = idLen;
        /* put */(this.maxIdLengthInScope[scope.interval()] = maxLen);
        const previousScope: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.ids2scope, id1.from);
        if (previousScope == null)this.scopeFrequency.set(scope.interval(), (this.scopeFrequency.get(scope.interval()) ?? 0) + 1);
        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.ids2scope, id1.from, scope.interval());
        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.ids2interval, id1.from, from);
        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.ids2adjustments, id1.from, indentOffset);
    }

    public incrementalAlignments(target: Parsed, tuple: any) {
        let node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        if (node.from === 6 || node.from === 7)node = node;
        const ident: string = this.offset(node.from, target);
        for(let i: number = node.from + 1; i < node.to; i++) {{
            const oldOffset: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, i);
            if (oldOffset == null)continue;
            this.putNewline(i, oldOffset + Service.padln("", ident.length - this.indent(node.from, target)));
        };}
    }

    /**
     * Number of character positions before beginning of the line @ pos
     * (One extra for /n)
     * @param {number} pos
     * @param {Parsed} target
     * @return
     * @return {number}
     * @private
     */
    indent(pos: number, target: Parsed): number {
        for(let i: number = pos; ((lhs, rhs) => lhs && rhs)(pos - 50 < i, 0 <= i); i--) {{
            const tmp: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, i);
            if (tmp != null)return tmp.length;
        };}
        return 1;
    }

    public pairwiseAlignments(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const predecessor: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "predecessor");
        const nodeIndent: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, node.from);
        if (nodeIndent == null)return;
        const ident: string = this.offset(predecessor.from, target);
        const delta: number = ident.length - nodeIndent.length;
        this.putNewline(node.from, ident);
        if (0 < delta){
            for(let i: number = node.from + 1; i < node.to; i++) {{
                const oldOffset: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, i);
                if (oldOffset == null)continue;
                const newOffset: string = oldOffset + Service.padln("", delta);
                this.putNewline(i, newOffset);
            };}
        }
    }

    /**
     * Genuine offset of a node within already formatted code
     * WHERE r.last_name IN ( SELECT c.last_name
     * -----------------------^ offset of the node 'SELECT' from the beginning of the line
     * @param {number} pos
     * @param {Parsed} target
     * @return {string}
     * @private
     */
    offset(pos: number, target: Parsed): string {
        let ret: string = "\n";
        for(let i: number = pos; ((lhs, rhs) => lhs && rhs)(pos - 50 < i, 0 <= i); i--) {{
            let tmp: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, i);
            if (tmp != null && /* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(tmp, "\n\n"))tmp = tmp.substring(1);
            if (i === 0)tmp = "\n";
            if (tmp != null){
                ret = tmp;
                for(let j: number = i; j < pos; j++) {{
                    for(let k: number = 0; k < (/* get */target.getSrc()[j].content).length; k++) {{
                        ret += ' ';
                    };}
                    ret += this.decideSpace(target, j + 1);
                    if (<number>/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.maxCharLineSize) < ret.length)return ret;
                };}
                break;
            }
        };}
        return ret;
    }

    public rightAlignments(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const kw: string = /* get */target.getSrc()[node.from].content;
        const delta: number = "select".length - kw.length;
        const nodeIndent: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, node.from);
        if (nodeIndent == null)return;
        this.putNewline(node.from, nodeIndent + Service.padln("", delta));
    }

    /**
     * Line breaks which are not part of indentations
     * @param {Parsed} target
     * @param {*} tuple
     */
    public extraBrkBefore(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const padding: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, node.from);
        if (padding == null){
            const depth: number = this.depth(node.from);
            this.putNewline(node.from, "\n" + this.spaceSequence(depth));
        }
    }

    public extraBrkAfter(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const padding: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, node.to);
        if (padding == null){
            const depth: number = this.depth(node.to);
            this.putNewline(node.to, "\n" + this.spaceSequence(depth));
        }
    }

    /**
     * Separate sql_statements with blank line
     * @param {Parsed} target
     * @param {*} tuple
     */
    public brkX2(target: Parsed, tuple: any) {
        if (/* get */((m,k) => m[k]===undefined?null:m[k])(this.options, this.extraLinesAfterSignificantStatements) === Format.BreaksX2.X1)return;
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const padding: string = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.newlinePositions, node.to);
        if (padding == null)this.putNewline(node.to, "\n\n"); else this.putNewline(node.to, "\n" + padding);
    }

    public ignoreLineBreaksBeforeNode(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        /* remove */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries.splice(i,1)[0]; } })(<any>this.newlinePositions, node.from);
    }

    public ignoreLineBreaksAfterNode(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        /* remove */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries.splice(i,1)[0]; } })(<any>this.newlinePositions, node.to);
    }

    public dontFormatNode(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        for(let i: number = node.from; i < node.to; i++) {{
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this.unformattedPositions, i);
        };}
    }

    public skipWhiteSpaceBeforeNode(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this.skipWSPositions, node.from);
    }

    public skipWhiteSpaceAfterNode(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(this.skipWSPositions, node.to);
    }

    public breaksProcArgs(attributePositions: any, t: ParseNode[], src: Array<LexerToken>): boolean {
        return this.getCommasPerLine() === 1;
    }

    public breaks4JSON(attributePositions: any, t: ParseNode[], src: Array<LexerToken>): boolean {
        return true;
    }

    public breaks4XML(attributePositions: any, t: ParseNode[], src: Array<LexerToken>): boolean {
        return true;
    }

    priorProc: ParseNode;

    argNum: number;

    public breakLongProcArgLists(target: Parsed, tuple: any) {
        this.argNum++;
        const proc: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "procedureCall");
        let name: string = /* get */target.getSrc()[proc.from].content;
        const dot: string = /* get */target.getSrc()[proc.from + 1].content;
        if ("." === dot)name = name + '.' + /* get */target.getSrc()[proc.from + 2].content;
        if (proc !== this.priorProc){
            this.argNum = 1;
            this.priorProc = proc;
        }
        const breakEvery5thArg: number = this.getCommasPerLine();
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        let procIndent: string = this.getNewline(proc.from);
        if (procIndent == null)procIndent = "\n";
        const pad: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i <= name.length; i++) {/* append */(sb => { sb.str += <any>" "; return sb; })(pad);}
        const argAfterComma: ParseNode = target.getRoot().leafAtPos(node.to);
        if (this.argNum % breakEvery5thArg === 0){
            if (this.getBoolBind("breaksAfterComma"))this.putNewline(node.to, procIndent + /* toString */pad.str);
            if (this.getBoolBind("breaksBeforeComma"))this.putNewline(node.from, procIndent + /* toString */pad.str);
        }
    }

    public breakComplexProcArgLists(target: Parsed, tuple: any) {
        const proc: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "functionInFunction.procedureCall");
        const name: string = /* get */target.getSrc()[proc.from].content;
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        let procIndent: string = this.getNewline(proc.from);
        if (procIndent == null)procIndent = "\n";
        const pad: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i <= name.length; i++) {/* append */(sb => { sb.str += <any>" "; return sb; })(pad);}
        const argAfterComma: ParseNode = target.getRoot().leafAtPos(node.to);
        if (this.getBoolBind("breaksAfterComma"))this.putNewline(node.to, procIndent + /* toString */pad.str);
        if (this.getBoolBind("breaksBeforeComma"))this.putNewline(node.from, procIndent + /* toString */pad.str);
    }

    public extraIndent(target: Parsed, tuple: any) {
        const root: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const indent: number = this.indentLength();
        const desc: Array<ParseNode> = root.descendants();
        const processed: Array<number> = <any>([]);
        for(let index = 0; index < desc.length; index++) {
            let node = desc[index];
            {
                if (!/* contains */(processed.indexOf(<any>(node.from)) >= 0)){
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(processed, node.from);
                    this.padNode(node, indent);
                }
            }
        }
    }

    padNode(node: ParseNode, len: number) {
        let nodeIndent: string = this.getNewline(node.from);
        if (nodeIndent == null)return;
        for(let i: number = 0; i < len; i++) {nodeIndent = nodeIndent + " ";}
        this.putNewline(node.from, nodeIndent);
    }

    public extra5Spaces(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        this.padNode(node, 5);
    }

    public less2Spaces(target: Parsed, tuple: any) {
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const nodeIndent: string = this.getNewline(node.from);
        let offset: number = 2;
        if (!this.getBoolBind("spaceAfterCommas"))offset = 1;
        if (nodeIndent != null)this.putNewline(node.from, nodeIndent.substring(0, nodeIndent.length - offset));
    }

    priorScope: ParseNode;

    cNum: number;

    public breakLongConcatenationLists(target: Parsed, tuple: any) {
        this.cNum++;
        const scope: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "scope");
        if (scope !== this.priorScope){
            this.cNum = 1;
            this.priorScope = scope;
        }
        const breakEvery5thArg: number = this.getCommasPerLine();
        const node: ParseNode = /* get */((m,k) => m[k]===undefined?null:m[k])(tuple, "node");
        const indent: number = 20;
        const pad: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        for(let i: number = 0; i <= indent; i++) {/* append */(sb => { sb.str += <any>" "; return sb; })(pad);}
        const cAfter: ParseNode = target.getRoot().leafAtPos(node.to);
        if (this.cNum % breakEvery5thArg === 0){
            let procIndent: string = this.getNewline(scope.from);
            if (procIndent == null)procIndent = "\n";
            this.putNewline(node.from, procIndent + /* toString */pad.str);
            this.cNum = 1;
        }
    }
}
Format["__class"] = "oracle.dbtools.app.Format";


export namespace Format {

    export enum Case {
        UPPER, lower, InitCap, NoCaseChange
    }

    export enum Space {
        Default, Inside, Outside, NoSpace
    }

    export enum Breaks {
        Before, After, None, BeforeAndAfter
    }

    export enum BreaksX2 {
        X1, X2, Keep
    }

    export enum InlineComments {
        CommentsUnchanged, SingleLine, MultiLine
    }

    export enum FlowControl {
        IndentedActions, Terse, SeparateConditionsActions, IndentedConditionsActions
    }

    export class Format$0 {
        public __parent: any;
        /**
         * Advanced format via custom program change
         * @param {string} key
         * @param {*} value
         * @return {*}
         */
        public put(key: string, value: any): any {
            this.__parent.programInstance = null;
            const previous = this[key];
            this[key] = value;
            return previous;
        }

        constructor(__parent: any) {
            this.__parent = __parent;
        }
    }


    export class Format$1 extends SqlProgram {
        public __parent: any;
        /**
         * 
         * @param {string} name
         * @return {boolean}
         */
        public getBoolBindVar(name: string): boolean {
            // The Java implementation is an anonymous SqlProgram subclass that
            // captures Format.this. SqlProgram compiles from its constructor,
            // before JSweet can assign the translated __parent field. `struct`
            // is initialized by Program's constructor before that compilation
            // starts and is the same Format instance passed to SqlProgram.
            const format: any = this.struct != null ? this.struct : this.__parent;
            const value: any = format == null ? null : /* get */((m,k) => m[k]===undefined?null:m[k])(format.options, name);
            if (value != null && (typeof value === 'boolean'))return <boolean>value;
            return super.getBoolBindVar(name);
        }

        constructor(__parent: any, __arg0: any, __arg1: any) {
            super(__arg0, __arg1);
            this.__parent = __parent;
        }
    }

}



