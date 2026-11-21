/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Earley } from '../parser/Earley';
import { Grammar } from '../parser/Grammar';
import { Lexer } from '../parser/Lexer';
import { LexerToken } from '../parser/LexerToken';
import { Matrix } from '../parser/Matrix';
import { ParseNode } from '../parser/ParseNode';
import { Parsed } from '../parser/Parsed';
import { RuleTransforms } from '../parser/RuleTransforms';
import { RuleTuple } from '../parser/RuleTuple';
import { Token } from '../parser/Token';
import { JavaScript } from '../parser/js/JavaScript';
import { SqlEarley } from '../parser/plsql/SqlEarley';
import { SyntaxError } from '../parser/plsql/SyntaxError';
import { GlobalMap } from '../../arbori/scripting/GlobalMap';
import { Scripting } from '../../arbori/scripting/Scripting';
import { Pair } from '../../arbori/util/Pair';
import { ParseInt } from '../../arbori/util/ParseInt';
import { Service } from '../../arbori/util/Service';

/**
 * Arbori engine, see arbori.odt
 * 
 * Version 3.0
 * 
 * @author Dim
 * @param {Earley} parser
 * @param {*} struct
 * @param {GlobalMap} globals
 * @param {boolean} allowJS
 * @class
 * @extends Scripting
 */
export class Program extends Scripting {
    public static debug: boolean = false;

    public static timing: boolean = false;

    public stop: boolean;

    public test: any;

    struct: any;

    public setStruct(struct: any) {
        this.struct = struct;
    }

    parser: Earley;

    /*private*/ objRef: number;

    static objCnt: number = 0;

    public constructor(parser: Earley = null, struct: any = null, globals: GlobalMap = null, allowJS = true) {
        super(globals);
        this.parser = parser;
        this.struct = struct;
        this.stop = false;
        this.test = null;
        this.execOrder = null;
        this.namedPredicates = {};
        this.dependency = new PredicateDependency();
        this.bindsInstance = {};
        this.prg = null;
        this.symbolicPredicates = {};
        this.targetFileName = null;
        this.blockNo = 0;
        this.addWsDividers = null;
        this.allowJS = allowJS;
        this.objRef = Program.objCnt++;
    }

    public static async main(args: string[]) {
        // JavaScript blocks are intentionally ignored in this TypeScript port.
        const { SqlProgram } = await import('./SqlProgram');
        let t1: number = /* currentTimeMillis */Date.now();
        const input: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.sql");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        const arboriProgram: string = Service.readFile$java_lang_String("/Users/VTROPASH/eclipse-workspace/sandbox/src/example.arbori");
        const r = new SqlProgram(arboriProgram);
        Program.debug = true;
        Program.timing = true;
        let output: any = r.run$java_lang_String$java_util_List$java_lang_Object(input, src, "JS action");
        {
            let array = /* keySet */Object.keys(output);
            for(let index = 0; index < array.length; index++) {
                let p = array[index];
                console.info(p + "=" + /* get */((m,k) => m[k]===undefined?null:m[k])(output, p).toString$int(p.length + 1))
            }
        }
        let t2: number = /* currentTimeMillis */Date.now();
        console.info("First time run=" + (t2 - t1));
        System.exit(0);
        t1 = /* currentTimeMillis */Date.now();
        output = r.run$java_lang_String$java_util_List$java_lang_Object(input, src, <any>({}));
        t2 = /* currentTimeMillis */Date.now();
        console.info("Second time run=" + (t2 - t1));
    }

    static attribute: number = -1;

    static backslash: number = -1;

    static closePar: number = -1;

    static closeBr: number = -1;

    static col: number = -1;

    static conj: number = -1;

    static content: number = -1;

    static digits: number = -1;

    static disj: number = -1;

    static dot: number = -1;

    static eq: number = -1;

    static excl: number = -1;

    static identifier: number = -1;

    static __include: number = -1;

    static js_block: number = -1;

    static __header: number = -1;

    static lt: number = -1;

    static minus: number = -1;

    static node_parent: number = -1;

    static node_predecessor: number = -1;

    static node_position: number = -1;

    static node_successor: number = -1;

    static node: number = -1;

    static openBr: number = -1;

    static openPar: number = -1;

    static plus: number = -1;

    static __predicate: number = -1;

    static __program: number = -1;

    static referenced_node: number = -1;

    static __rule: number = -1;

    static srcPtr: number = -1;

    static semicol: number = -1;

    static sharp: number = -1;

    static slash: number = -1;

    static star: number = -1;

    static __statement: number = -1;

    static string_literal: number = -1;

    static value: number = -1;

    static parserInstance: Earley = null;

    public static getArboriParser(): Earley {
        if (Program.parserInstance != null)return Program.parserInstance;
        const rules: Array<RuleTuple> = Program.getRules();
        Program.parserInstance = new Program.Program$1(rules);
        Program.parserInstance.isCaseSensitive = true;
        Program.attribute = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "attribute");
        Program.backslash = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'\\\'");
        Program.closePar = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\')\'");
        Program.closeBr = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\']\'");
        Program.col = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\':\'");
        Program.conj = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'&\'");
        Program.content = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "content");
        Program.digits = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "digits");
        Program.disj = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'|\'");
        Program.dot = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'.\'");
        Program.eq = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'=\'");
        Program.excl = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'!\'");
        Program.identifier = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "identifier");
        Program.__include = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "include");
        Program.js_block = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "js_block");
        Program.__header = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "header");
        Program.lt = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'<\'");
        Program.minus = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'-\'");
        Program.node_parent = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "node_parent");
        Program.node_position = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "node_position");
        Program.node_predecessor = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "node_predecessor");
        Program.node_successor = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "node_successor");
        Program.node = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "node");
        Program.openBr = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'[\'");
        Program.openPar = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'(\'");
        Program.plus = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'+\'");
        Program.__predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "predicate");
        Program.__program = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "program");
        Program.referenced_node = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "referenced_node");
        Program.__rule = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "rule");
        Program.semicol = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\';\'");
        Program.sharp = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'#\'");
        Program.slash = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'/\'");
        Program.srcPtr = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'?\'");
        Program.star = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "\'*\'");
        Program.__statement = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "statement");
        Program.string_literal = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "string_literal");
        Program.value = /* get */((m,k) => m[k]===undefined?null:m[k])(Program.parserInstance.symbolIndexes, "value");
        Program.prioritizeRules(Program.parserInstance);
        return Program.parserInstance;
    }

    static prioritizeRules(testParser: Earley) {
        const rule2: string = "program:  statement;";
        const rule3: string = "program:  program  statement;";
        testParser.swapRules(rule2, rule3);
    }

    static getRules(): Array<RuleTuple> {
        let input: string = Service.readFile$java_lang_Class$java_lang_String(Program, "arbori.grammar");
        input += Service.readFile$java_lang_Class$java_lang_String(JavaScript, "js.grammar");
        const src: Array<LexerToken> = Lexer.parse$java_lang_String$boolean$int(input, false, Lexer.ARBORI_$LI$());
        const root: ParseNode = Grammar.parseGrammarFile$java_util_List$java_lang_String(src, input);
        const ret: Array<RuleTuple> = <any>([]);
        Grammar.grammar(root, src, ret);
        RuleTransforms.eliminateEmptyProductions(ret);
        return ret;
    }

    /*private*/ execOrder: any;

    /**
     * @return {string[]} List of predicates/queries in the order they are written in arbori program
     * Useful in situation when there is no callback marker identifying the latest query
     */
    public querySequence(): Array<string> {
        const ret: Array<string> = <any>([]);
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.execOrder);
            for(let index = 0; index < array.length; index++) {
                let pos = array[index];
                {
                    const inc: any = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.execOrder, pos);
                    if (inc != null && inc instanceof <any>Program.PredicateCmd){
                        /* add */(ret.push((<Program.PredicateCmd>inc).__name)>0);
                    }
                }
            }
        }
        return ret;
    }

    public namedPredicates: any;

    /*private*/ dependency: PredicateDependency;

    public static resetCompiledPrograms() {
    }

    /*private*/ bindsInstance: any;

    public compile$java_lang_String(programText: string) {
        this.compile$java_lang_String$java_lang_Object(programText, null);
    }

    public compile$java_lang_String$java_lang_Object(programText: string, struct: any) {
        this.compile$java_lang_String$java_lang_Object$boolean(programText, struct, false);
    }

    /*private*/ prg: Parsed;

    /*private*/ symbolicPredicates: any;

    public compile$java_lang_String$java_lang_Object$boolean(programText: string, struct: any, force: boolean) {
        if (this.prg == null)this.prg = new Parsed(programText, Program.getArboriParser(), "program");
        const bindVars: Array<string> = this.listBindVariables(this.prg.getRoot(), this.prg.getSrc());
        if (this.execOrder == null || force || 0 < /* size */(<number>bindVars.length)){
            this.execOrder = <any>({});
            const error: SyntaxError = this.prg.getSyntaxError();
            if (error != null)throw error;
            this.namedPredicates = <any>({});
            this.program(this.prg.getRoot(), this.prg.getSrc(), this.prg.getInput());
            for(let index = 0; index < bindVars.length; index++) {
                let bindVar = bindVars[index];
                {
                    /* put */(this.bindsInstance[bindVar] = this.getBoolBindVar(bindVar));
                }
            }
            Object.assign(this.symbolicPredicates, this.namedPredicates);
        }
    }

    public compile(programText?: any, struct?: any, force?: any) {
        if (((typeof programText === 'string') || programText === null) && ((struct != null) || struct === null) && ((typeof force === 'boolean') || force === null)) {
            return <any>this.compile$java_lang_String$java_lang_Object$boolean(programText, struct, force);
        } else if (((typeof programText === 'string') || programText === null) && ((struct != null) || struct === null) && force === undefined) {
            return <any>this.compile$java_lang_String$java_lang_Object(programText, struct);
        } else if (((typeof programText === 'string') || programText === null) && struct === undefined && force === undefined) {
            return <any>this.compile$java_lang_String(programText);
        } else throw new Error('invalid overload');
    }

    program(root: ParseNode, src: Array<LexerToken>, input: string) {
        if (root.contains$int(Program.__statement)){
            this.statement(root, src, input);
            return;
        }
        if (root.contains$int(Program.js_block)){
            this.jsBlock(root, src, input);
            return;
        }
        if (root.contains$int(Program.__include)){
            this.include(root, src, input);
            return;
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                this.program(child, src, input)
            }
        }
    }

    statement(root: ParseNode, src: Array<LexerToken>, input: string) {
        if (root.contains$int(Program.__rule))this.rule(root, src, input); else if (root.contains$int(Program.__include))this.include(root, src, input); else if (root.contains$int(Program.js_block))this.jsBlock(root, src, input);
    }

    include(root: ParseNode, src: Array<LexerToken>, input: string) {
        const _globals: GlobalMap = this.getGlobals();
        if (_globals != null){
            _globals.put("struct", this.struct);
            _globals.put("program", this);
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (child.contains$java_lang_String("\'include\'"))continue;
                    let filename: string = child.content$java_util_List(src);
                    if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(filename, "\""))filename = filename.substring(1, filename.length - 1);
                    const includeContent: string = Program.getContent(filename);
                    const begin: number = /* get */src[child.from].begin;
                    try {
                        const incPrg: Program = new Program(this.parser, this.struct, _globals, this.allowJS);
                        incPrg.compile$java_lang_String$java_lang_Object$boolean(includeContent, this.struct, true);
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.execOrder, begin, new Program.IncludedPrg(this, incPrg));
                    } catch(__e) {
                        if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.io.IOException") >= 0)) {
                            const e: Error = <Error>__e;
                            console.error(e.message, e);

                        }
                        if(__e != null && __e instanceof <any>SyntaxError) {
                            const e: SyntaxError = <SyntaxError>__e;
                            if (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(filename.trim(), ".js"))try {
                                if (_globals == null)continue;
                                /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.execOrder, begin, new Program.JavaScriptBlock(this, includeContent, begin));
                                continue;
                            } catch(e1) {
                                console.error(e1.message, e1);
                                continue;
                            } else throw e;

                        }
                    }
                }
            }
        }
    }

    public static getContent(filename: string): string {
        if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(filename, "file:")){
            try {
                filename = /* replace */filename.split(" ").join("%20");
                filename = /* replace */filename.split("\\").join("/");
                const url: URI = new URI(filename);
                const file: File = new File(url);
                return Service.readFile$java_lang_String(file.getAbsolutePath());
            } catch(e) {
                throw Object.defineProperty(new Error(filename + " not found"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
        }
        let content: string = null;
        try {
            let sysSource: string = filename;
            const downOneLevel: string = "../";
            if (/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(sysSource, downOneLevel))sysSource = "/oracle/dbtools/" + sysSource.substring(downOneLevel.length);
            content = Service.readFile$java_lang_Class$java_lang_String(Program, sysSource);
        } catch(e) {
            try {
                const pr: any = System.getProperties();
                let m: string = <string>/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>pr, "dbtools.arbori.home");
                if (m != null && (/* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(m, "/") || /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(m, "\\")))m = m.substring(0, m.length - 1);
                if (m == null)content = Service.readFile$java_lang_String(filename); else content = Service.readFile$java_lang_String(m.toString() + "/" + filename);
            } catch(e1) {
                try {
                    content = Service.readFile$java_lang_String(filename);
                } catch(e2) {
                    throw Object.defineProperty(new Error(filename + " not found"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        return content;
    }

    /*private*/ targetFileName: string;

    public setTargetFileName(tfn: string) {
        this.targetFileName = tfn;
    }

    public getTargetFileName(): string {
        return this.targetFileName;
    }

    blockNo: number;

    jsBlock(root: ParseNode, src: Array<LexerToken>, input: string) {
        const begin: number = /* get */src[root.from].begin;
        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.execOrder, begin, new Program.JavaScriptBlock(this, input.substring(begin, /* get */src[root.to - 1].end), begin));
    }

    /**
     * Processes arbori syntax:
     * 
     * rule:
     * identifier ':' predicate ';'
     * ;
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @private
     */
    rule(root: ParseNode, src: Array<LexerToken>, input: string) {
        let first: string = null;
        let legitimateOper: boolean = false;
        let name: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (first == null){
                        if (child.from + 1 === child.to)first = child.content$java_util_List(src); else return;
                        continue;
                    }
                    if (!legitimateOper){
                        if (child.contains$int(Program.col))legitimateOper = true; else return;
                        continue;
                    }
                    if (child.contains$int(Program.__predicate)){
                        const p: Predicate = this.predicate(child, src, input, false);
                        const dependencies: any = p.dependencies();
                        {
                            let array1 = /* keySet */Object.keys(dependencies);
                            for(let index1 = 0; index1 < array1.length; index1++) {
                                let s = array1[index1];
                                this.dependency.addDependency(s, first, /* get */((m,k) => m[k]===undefined?null:m[k])(dependencies, s))
                            }
                        }
                        if (/* containsKey */this.namedPredicates.hasOwnProperty(first))throw Object.defineProperty(new Error("Duplicate defintion of predicate " + first), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>this.execOrder, /* get */src[root.from].begin, new Program.PredicateCmd(this, first, p));
                        /* put */(this.namedPredicates[first] = p);
                        continue;
                    }
                    if (child.contains$int(Program.minus)){
                        name = first;
                    }
                    if (child.contains$java_lang_String("js_block")){
                        const parent: Program.PredicateCmd = <Program.PredicateCmd><any>/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.execOrder, /* get */src[root.from].begin);
                        parent.action = input.substring(/* get */src[child.from].begin + 1, /* get */src[child.to - 2].end);
                        return;
                    }
                    if (name != null){
                        const parent: Program.PredicateCmd = <Program.PredicateCmd><any>/* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.execOrder, /* get */src[root.from].begin);
                        parent.action = Program.javaCallbackCode;
                    }
                }
            }
        }
    }

    static javaCallbackCode: string = "this is java callback (not JS)";

    predicate(root: ParseNode, src: Array<LexerToken>, input: string, sawDisj: boolean): Predicate {
        if (root.contains$int(Program.identifier))return new PredRef(root.content$java_util_List(src), this);
        let ret: Predicate = this.isBrackets(root, src, input);
        if (ret != null)return ret;
        ret = this.isParenthesis(root, src, input, sawDisj);
        if (ret != null)return ret;
        ret = this.isConjunction(root, src, input, sawDisj);
        if (ret != null)return ret;
        ret = this.isDisjunction(root, src, input);
        if (ret != null)return ret;
        ret = this.isDifference(root, src, input, sawDisj);
        if (ret != null)return ret;
        ret = this.isAtomicPredicate(root, src, input, sawDisj);
        if (ret != null)return ret;
        throw Object.defineProperty(new Error("unexpected case for: " + root.content$java_util_List(src)), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    /**
     * Processes arbori syntax: predicate & predicate
     * @param {boolean} sawDisj
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @return {*}
     * @private
     */
    isConjunction(root: ParseNode, src: Array<LexerToken>, input: string, sawDisj: boolean): Predicate {
        let first: ParseNode = null;
        let legitimateOper: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (first == null){
                        first = child;
                        continue;
                    }
                    if (!legitimateOper){
                        if (child.contains$int(Program.conj))legitimateOper = true; else return null;
                        continue;
                    }
                    const lft: Predicate = this.predicate(first, src, input, sawDisj);
                    const rgt: Predicate = this.predicate(child, src, input, sawDisj);
                    return new CompositeExpr(lft, rgt, Oper.CONJUNCTION);
                }
            }
        }
        return null;
    }

    /**
     * Processes arbori syntax: predicate | predicate
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @return {*}
     * @private
     */
    isDisjunction(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let first: ParseNode = null;
        let legitimateOper: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (first == null){
                        first = child;
                        continue;
                    }
                    if (!legitimateOper){
                        if (child.contains$int(Program.disj))legitimateOper = true; else return null;
                        continue;
                    }
                    const lft: Predicate = this.predicate(first, src, input, true);
                    const rgt: Predicate = this.predicate(child, src, input, true);
                    return new CompositeExpr(lft, rgt, Oper.DISJUNCTION);
                }
            }
        }
        return null;
    }

    isDifference(root: ParseNode, src: Array<LexerToken>, input: string, sawDisj: boolean): Predicate {
        let first: ParseNode = null;
        let isLegit: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (first == null){
                        first = child;
                        continue;
                    }
                    if (!isLegit){
                        if (child.contains$int(Program.minus))isLegit = true; else return null;
                        continue;
                    }
                    const lft: Predicate = this.predicate(first, src, input, sawDisj);
                    const rgt: Predicate = this.predicate(child, src, input, sawDisj);
                    return new CompositeExpr(lft, rgt, Oper.DIFFERENCE);
                }
            }
        }
        return null;
    }

    /**
     * Processes arbori syntax: ( predicate )
     * @param {boolean} sawDisj
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @return {*}
     * @private
     */
    isParenthesis(root: ParseNode, src: Array<LexerToken>, input: string, sawDisj: boolean): Predicate {
        let isOpenParen: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (!isOpenParen){
                        if (child.contains$int(Program.openPar))isOpenParen = true; else return null;
                        continue;
                    }
                    if (isOpenParen && child.contains$int(Program.__predicate)){
                        return this.predicate(child, src, input, sawDisj);
                    } else return null;
                }
            }
        }
        return null;
    }

    /**
     * Processes arbori syntax: ( predicate )
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @return {*}
     * @private
     */
    isBrackets(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let isOpenBr: boolean = false;
        let hdr: Header = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (!isOpenBr){
                        if (child.contains$int(Program.openBr))isOpenBr = true; else return null;
                        continue;
                    }
                    if (isOpenBr){
                        if (child.contains$int(Program.__header))hdr = this.header(child, src, input); else if (child.contains$int(Program.closeBr) && hdr == null)hdr = new Header(<any>([])); else if (child.contains$int(Program.content)){
                            const ret: MaterializedPredicate = new MaterializedPredicate(hdr.attributes, null, hdr.toString$());
                            Program.addContent(ret, child, src);
                            return ret;
                        }
                    } else return hdr;
                }
            }
        }
        return hdr;
    }

    static addContent(ret: MaterializedPredicate, root: ParseNode, src: Array<LexerToken>) {
        let i: number = 0;
        let t: ParseNode[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(ret.arity());
        {
            let array = Program.values(root, src);
            for(let index = 0; index < array.length; index++) {
                let elem = array[index];
                {
                    const comma: number = elem.indexOf(',');
                    const clPar: number = elem.indexOf(')');
                    const from: number = /* parseInt */parseInt(elem.substring(1, comma));
                    const to: number = /* parseInt */parseInt(elem.substring(comma + 1, clPar));
                    t[i % ret.arity()] = new ParseNode(from, to, -1, -1, null);
                    if (i % ret.arity() === ret.arity() - 1){
                        ret.addContent(t);
                        t = (s => { let a=[]; while(s-->0) a.push(null); return a; })(ret.arity());
                    }
                    i++;
                }
            }
        }
    }

    static values(root: ParseNode, src: Array<LexerToken>): Array<string> {
        const ret: Array<string> = <any>([]);
        if (root.from + 1 === root.to && (/* get */src[root.from].type === Token.IDENTIFIER || /* get */src[root.from].type === Token.DQUOTED_STRING) || root.contains$int(Program.value) || root.contains$int(Program.attribute))/* add */(ret.push(root.content$java_util_List(src))>0); else {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, Program.values(child, src))
            }
        }
        return ret;
    }

    header(root: ParseNode, src: Array<LexerToken>, input: string): Header {
        if (root.contains$int(Program.attribute)){
            const hdr: Array<string> = <any>([]);
            /* add */(hdr.push(root.content$java_util_List(src))>0);
            return new Header(hdr);
        }
        let ret: Header = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (ret == null)ret = this.header(child, src, input); else {
                        const tmp: Header = this.header(child, src, input);
                        /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret.attributes, tmp.attributes);
                    }
                }
            }
        }
        return ret;
    }

    isAtomicPredicate(root: ParseNode, src: Array<LexerToken>, input: string, sawDisj: boolean): Predicate {
        let ret: Predicate = this.isExclamation(root, src, input);
        if (ret != null)return ret;
        ret = this.isAggregate(root, src, input);
        if (ret != null)return ret;
        ret = this.isNodeContent(root, src, input);
        if (ret != null)return ret;
        ret = this.isNodeMatchingSrc(root, src, input);
        if (ret != null)return ret;
        if (!sawDisj){
            ret = this.isNodeParentChild(root, src, input);
            if (ret != null)return ret;
        }
        ret = this.isSameNode(root, src, input);
        if (ret != null)return ret;
        ret = this.isNodeAncestorDescendant(root, src, input);
        if (ret != null)return ret;
        ret = this.isBoolBindVar(root, src, input);
        if (ret != null)return ret;
        ret = this.isJSFunc(root, src, input);
        if (ret != null)return ret;
        ret = this.isChildNumRelation(root, src, input);
        if (ret != null)return ret;
        ret = this.isPositionalRelation(root, src, input);
        if (ret != null)return ret;
        return null;
    }

    isAggregate(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        try {
            const first: ParseNode = root.children()[0];
            if (first.contains$int(Program.slash) || first.contains$int(Program.backslash))return this.isLegacyAggrSyntax(root, src, input); else if (first.contains$int(Program.openBr) && 5 < /* size */(<number>root.children().length))return this.isNewAggrSyntax(root, src, input);
        } catch(e) {
            console.error(`[Arbori] isAggregate saw empty/malformed node [${root.from},${root.to}) content=${root.content$java_util_List(src)} input=${input}`);
            root.printTree$int(5);
            throw Object.defineProperty(new Error("root.children.size() == 0?? "), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }
        return null;
    }

    isLegacyAggrSyntax(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let slash1: boolean = null;
        let slash2: boolean = null;
        let attribute: ParseNode = null;
        let seenOpenParen: boolean = false;
        let p: ParseNode = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (slash1 == null){
                        if (child.contains$int(Program.slash))slash1 = true; else if (child.contains$int(Program.backslash))slash1 = false; else return null;
                        continue;
                    }
                    if (slash2 == null){
                        if (child.contains$int(Program.slash))slash2 = true; else if (child.contains$int(Program.backslash))slash2 = false; else if (!child.contains$int(Program.dot))return null;
                        continue;
                    }
                    if (attribute == null){
                        attribute = child;
                        continue;
                    }
                    if (!seenOpenParen){
                        if (child.contains$int(Program.openPar)){
                            seenOpenParen = true;
                            continue;
                        } else throw Object.defineProperty(new Error("Syntax error not caught by parsing?"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    }
                    p = child;
                    break;
                }
            }
        }
        const predicate: Predicate = this.predicate(p, src, input, false);
        let type: AggregatePredicate.Type = null;
        if (!slash1 && !slash2)type = AggregatePredicate.Type.OLD; else if (!slash1 && slash2)type = AggregatePredicate.Type.ANCESTOR; else if (slash1 && !slash2)type = AggregatePredicate.Type.DESCENDANT; else if (slash1 && slash2)type = AggregatePredicate.Type.YOUNG;
        return new AggregatePredicate(attribute.content$java_util_List(src), predicate, type);
    }

    isNewAggrSyntax(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let c0: ParseNode = null;
        let c1: ParseNode = null;
        let c2: ParseNode = null;
        let c3: ParseNode = null;
        let c4: ParseNode = null;
        let attribute: ParseNode = null;
        let seenOpenParen: boolean = false;
        let p: ParseNode = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (c0 == null){
                        c0 = child;
                        continue;
                    }
                    if (c1 == null){
                        c1 = child;
                        continue;
                    }
                    if (c2 == null){
                        c2 = child;
                        continue;
                    }
                    if (c3 == null){
                        c3 = child;
                        continue;
                    }
                    if (c4 == null){
                        c4 = child;
                        continue;
                    }
                    if (attribute == null){
                        attribute = child;
                        continue;
                    }
                    if (!seenOpenParen){
                        if (child.contains$int(Program.openPar)){
                            seenOpenParen = true;
                            continue;
                        } else throw Object.defineProperty(new Error("Syntax error not caught by parsing?"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    }
                    p = child;
                    break;
                }
            }
        }
        const predicate: Predicate = this.predicate(p, src, input, false);
        let type: AggregatePredicate.Type = null;
        if (c1.contains$int(Program.star) && c2.contains$int(Program.closePar))type = AggregatePredicate.Type.OLD; else if (c1.contains$int(Program.star) && c2.contains$int(Program.openBr) || c1.contains$int(Program.openBr) && c2.contains$int(Program.closePar))type = AggregatePredicate.Type.ANCESTOR; else if (c1.contains$int(Program.openBr) && c2.contains$int(Program.star))type = AggregatePredicate.Type.DESCENDANT; else if (c1.contains$int(Program.closePar) && c2.contains$int(Program.openBr))type = AggregatePredicate.Type.YOUNG;
        return new AggregatePredicate(attribute.content$java_util_List(src), predicate, type);
    }

    /**
     * Processes arbori syntax: ! predicate
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @return {*}
     * @private
     */
    isExclamation(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let isExcl: boolean = false;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (!isExcl){
                        if (child.contains$int(Program.excl))isExcl = true; else return null;
                        continue;
                    }
                    if (isExcl){
                        return new CompositeExpr(this.predicate(child, src, input, false), null, Oper.NEGATION);
                    }
                }
            }
        }
        return null;
    }

    /**
     * Processes arbori syntax: [ node ) content
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @return {*}
     * @private
     */
    isNodeContent(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let openBrace: boolean = false;
        let first: string = null;
        let legitimateOper: boolean = false;
        let second: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (!openBrace){
                        if (child.contains$int(Program.openBr))openBrace = true; else return null;
                        continue;
                    }
                    if (first == null && child.contains$int(Program.node)){
                        if (child.from + 1 === child.to || child.contains$int(Program.node_parent) || child.contains$int(Program.node_predecessor) || child.contains$int(Program.node_successor) || child.contains$int(Program.referenced_node))first = child.content$java_util_List(src); else return null;
                        continue;
                    }
                    if (!legitimateOper){
                        if (child.contains$int(Program.closePar))legitimateOper = true; else return null;
                        continue;
                    }
                    if (second == null){
                        second = child.content$java_util_List(src);
                        continue;
                    }
                    throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        const symbol: number = /* get */((m,k) => m[k]===undefined?null:m[k])(this.parser.symbolIndexes, second);
        if (symbol == null){
            console.error("Symbol \'" + second + "\' not found");
            return new False();
        }
        return new NodeContent(first, symbol);
    }

    public addWsDividers: boolean;

    /**
     * Processes arbori syntax: ?node = ?node
     * @param {ParseNode} root
     * @param {LexerToken[]} src
     * @param {string} input
     * @return {*}
     * @private
     */
    isNodeMatchingSrc(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let legitimateAt1: boolean = false;
        let first: string = null;
        let legitimateOper: boolean = false;
        let legitimateAt2: boolean = false;
        let second: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (!legitimateAt1){
                        if (child.contains$int(Program.srcPtr))legitimateAt1 = true; else return null;
                        continue;
                    }
                    if (first == null){
                        if (child.contains$int(Program.node))first = child.content$java_util_List(src); else return null;
                        continue;
                    }
                    if (!legitimateOper){
                        if (child.contains$int(Program.eq))legitimateOper = true; else return null;
                        continue;
                    }
                    if (!legitimateAt2){
                        if (child.contains$int(Program.srcPtr))legitimateAt2 = true; else if (child.contains$int(Program.string_literal)){
                            return new NodeMatchingSrc(first, child.content$java_util_List(src), this.addWsDividers);
                        } else return null;
                        continue;
                    }
                    if (second == null){
                        if (child.contains$int(Program.node))second = child.content$java_util_List(src); else return null;
                        continue;
                    }
                    throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        return new NodesWMatchingSrc(first, second);
    }

    isNodeParentChild(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        const p: Pair<string, string> = this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int(root, src, Program.eq);
        if (p == null)return null;
        const prefix: string = p.first();
        const postfix: string = p.second();
        const prefSrc: Array<LexerToken> = LexerToken.parse$java_lang_String(prefix);
        const postSrc: Array<LexerToken> = LexerToken.parse$java_lang_String(postfix);
        if (1 < /* size */(<number>postSrc.length) && /* size */(<number>prefSrc.length) === 1){
            if (!("^" === /* get */postSrc[1].content))return null;
            if (/* size */(<number>postSrc.length) === 2)return new ParentChildNodes(prefix, /* get */postSrc[0].content, 1, this);
            if (!("^" === /* get */postSrc[2].content))return null;
            if (/* size */(<number>postSrc.length) === 3)return new ParentChildNodes(prefix, /* get */postSrc[0].content, 2, this);
        }
        return null;
    }

    isNodeAncestorDescendant(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let type: AncestorDescendantNodes.Type = AncestorDescendantNodes.Type.CLOSEST;
        let p: Pair<string, string> = this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int(root, src, Program.lt);
        if (p == null){
            p = this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int$int(root, src, Program.lt, Program.eq);
            type = AncestorDescendantNodes.Type.TRANSITIVE;
            if (p == null){
                p = this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int$int(root, src, Program.lt, Program.lt);
                type = AncestorDescendantNodes.Type.TRANSITIVE;
                if (p == null)return null;
            }
        }
        return new AncestorDescendantNodes(p.first(), p.second(), type);
    }

    isSameNode(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        const p: Pair<string, string> = this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int(root, src, Program.eq);
        if (p == null)return null;
        return new SameNodes(p.first(), p.second());
    }

    binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int(root: ParseNode, src: Array<LexerToken>, oper: number): Pair<string, string> {
        return this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int$int(root, src, oper, -1);
    }

    public binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int$int(root: ParseNode, src: Array<LexerToken>, oper1: number, oper2: number): Pair<string, string> {
        let first: string = null;
        let legitimateOper1: boolean = false;
        let legitimateOper2: boolean = (-1 === oper2);
        let second: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (first == null){
                        if (child.contains$int(Program.node)){
                            first = child.content$java_util_List(src);
                            if (/* containsKey */this.namedPredicates.hasOwnProperty(first))throw Object.defineProperty(new Error("Error: " + first + " is a predicate, not predicate attribute within binary operation"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                        } else return null;
                        continue;
                    }
                    if (!legitimateOper1){
                        if (child.contains$int(oper1))legitimateOper1 = true; else return null;
                        continue;
                    }
                    if (!legitimateOper2){
                        if (child.contains$int(oper2))legitimateOper2 = true; else return null;
                        continue;
                    }
                    if (second == null){
                        if (child.contains$int(Program.node)){
                            second = child.content$java_util_List(src);
                            if (/* containsKey */this.namedPredicates.hasOwnProperty(second))throw Object.defineProperty(new Error("Error: " + second + " is a predicate, not predicate attribute within binary operation"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                        } else return null;
                        continue;
                    }
                    if (!child.contains$int(Program.semicol))throw Object.defineProperty(new Error("unexpected case for: " + root.content$java_util_List(src)), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        return <any>(new Pair<string, string>(first, second));
    }

    public binaryPredicateNames(root?: any, src?: any, oper1?: any, oper2?: any): Pair<string, string> {
        if (((root != null && root instanceof <any>ParseNode) || root === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof oper1 === 'number') || oper1 === null) && ((typeof oper2 === 'number') || oper2 === null)) {
            return <any>this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int$int(root, src, oper1, oper2);
        } else if (((root != null && root instanceof <any>ParseNode) || root === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof oper1 === 'number') || oper1 === null) && oper2 === undefined) {
            return <any>this.binaryPredicateNames$oracle_dbtools_parser_ParseNode$java_util_List$int(root, src, oper1);
        } else throw new Error('invalid overload');
    }

    isPositionalRelation(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let first: Position = null;
        let isGT: boolean = false;
        let isReflexive: boolean = false;
        let second: Position = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (first == null){
                        first = this.nodeRelativePosition(child, src, input);
                        if (first == null)return null;
                        continue;
                    }
                    if (child.contains$int(Program.lt)){
                        isGT = true;
                        continue;
                    }
                    if (child.contains$int(Program.eq)){
                        isReflexive = true;
                        continue;
                    }
                    if (second == null){
                        second = this.nodeRelativePosition(child, src, input);
                        if (second == null)return null;
                        continue;
                    }
                    throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        return new PositionalRelation(first, second, isReflexive, isGT, this);
    }

    nodeRelativePosition(root: ParseNode, src: Array<LexerToken>, input: string): Position {
        let name: string = null;
        let t: Position = null;
        let num: number = -1;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    if (name == null && child.contains$int(Program.attribute) || (t != null && t instanceof <any>BindVar)){
                        name = child.content$java_util_List(src);
                        continue;
                    } else if (child.contains$int(Program.digits)){
                        num = Number.parseInt(child.content$java_util_List(src), 10);
                        if (t != null)(<Composite>t).addendum = num;
                        continue;
                    } else if (t == null){
                        if (child.contains$int(Program.openBr)){
                            t = new Head(name);
                            continue;
                        } else if (child.contains$int(Program.closePar)){
                            t = new Tail(name);
                            continue;
                        } else if (child.contains$int(Program.col)){
                            t = new BindVar(name);
                            continue;
                        } else if (child.contains$int(Program.plus)){
                            continue;
                        } else if (child.contains$int(Program.node_position)){
                            const tmp: Position = this.nodeRelativePosition(child, src, input);
                            name = tmp.name;
                            t = new Composite(tmp, num);
                            continue;
                        } else throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    }
                }
            }
        }
        if (name == null)throw Object.defineProperty(new Error("name == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        if (t == null)throw Object.defineProperty(new Error("t == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        t.setName(name);
        return t;
    }

    isChildNumRelation(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        let first: number = null;
        let isGT: boolean = false;
        let isReflexive: boolean = false;
        let second: string = null;
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    const srcContent: string = /* get */src[child.from].content;
                    if (first == null){
                        const value: number = ParseInt.parseInt(srcContent);
                        if (/* isPresent */(value != null)){
                            first = /* get */(v => { if (v == null) throw new Error('value is null'); return v; })(value);
                        } else {
                            return null;
                        }
                        if (first == null)return null;
                        continue;
                    }
                    if (child.contains$int(Program.lt)){
                        isGT = true;
                        continue;
                    }
                    if (child.contains$int(Program.eq)){
                        isReflexive = true;
                        continue;
                    }
                    if (child.contains$int(Program.sharp)){
                        continue;
                    }
                    if (second == null){
                        second = srcContent;
                        if (second == null)return null;
                        continue;
                    }
                    throw Object.defineProperty(new Error("unexpected case"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
        }
        return new ChildNumRelation(first, second, isReflexive, isGT, this);
    }

    public getBoolBindVar(name: string): boolean {
        if (this.struct == null)throw Object.defineProperty(new Error("_getBoolBindVar(" + name + ") failed, struct == null"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        try {
            const field: any = /* getField */((c,p) => { return {owner:c,name:p}; })((<any>this.struct.constructor),name);
            if (field.getType() === Boolean)return field.getBoolean(this.struct);
        } catch(__e) {
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.NoSuchFieldException") >= 0)) {
                const e: Error = <Error>__e;

            }
            if(__e != null && (__e["__classes"] && __e["__classes"].indexOf("java.lang.Exception") >= 0) || __e != null && __e instanceof <any>Error) {
                const e: Error = <Error>__e;
                throw Object.defineProperty(new Error("field.getBoolean failed due to " + e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });

            }
        }
        try {
            const method: { owner: any, name: string, fn : Function } = /* getMethod */((c,p) => { if(c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function') return {owner:c,name:p,fn:c.prototype[p]}; else return null; })((<any>this.struct.constructor),name);
            if (method.getReturnType() === Boolean)try {
                return <boolean>/* invoke */method.fn.apply(this.struct);
            } catch(e) {
                throw Object.defineProperty(new Error("method.invoke failed due to " + e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
            }
        } catch(e1) {
        }
        throw Object.defineProperty(new Error("_getBoolBindVar(" + name + ") failed"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
    }

    isBoolBindVar(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        if (!root.contains$java_lang_String("bind_var"))return null;
        const name: string = /* get */src[root.from + 1].content;
        const b: boolean = this.getBoolBindVar(name);
        if (b == null)throw Object.defineProperty(new Error("Bind var \'" + name + "\' not found."), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        if (b)return True.INSTANCE_$LI$(); else return new False();
    }

    listBindVariables(root: ParseNode, src: Array<LexerToken>): Array<string> {
        const ret: Array<string> = <any>([]);
        if (root.contains$java_lang_String("bind_var") && root.contains$java_lang_String("atomic_predicate")){
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(ret, /* get */src[root.from + 1].content);
            return ret;
        }
        {
            let array = root.children();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                /* addAll */((l1, l2) => l1.push.apply(l1, l2))(ret, this.listBindVariables(child, src))
            }
        }
        return ret;
    }

    isJSFunc(root: ParseNode, src: Array<LexerToken>, input: string): Predicate {
        if (!root.contains$java_lang_String("js_condition"))return null;
        const name: string = /* get */src[root.from + 1].content;
        const args: Array<string> = <any>([]);
        for(let i: number = root.from + 2; i < root.to; i++) {{
            const t: LexerToken = /* get */src[i];
            if (t.type === Token.QUOTED_STRING)/* add */(args.push(t.content.substring(1, t.content.length - 1))>0);
        };}
        return new JSFunc(name, this, args);
    }

    public eval$(): any {
        if (this.targetFileName == null){
            {
                let array = /* values */(obj => Object.keys(obj).map(key => obj[key]))(this.namedPredicates);
                for(let index = 0; index < array.length; index++) {
                    let value = array[index];
                    if (!(value != null && value instanceof <any>True))throw Object.defineProperty(new Error("Not connected to parsed source file"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                }
            }
            const target: Parsed = new Parsed("connect", SqlEarley.partialRecognizer(), "sql_statement");
            return this.eval$oracle_dbtools_parser_Parsed(target);
        }
        const input: string = Program.getContent(this.targetFileName);
        const target: Parsed = new Parsed(input, SqlEarley.partialRecognizer(), "sql_statement");
        return this.eval$oracle_dbtools_parser_Parsed(target);
    }

    public eval$oracle_dbtools_parser_Parsed(target: Parsed): any {
        return this.eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, this.struct);
    }

    public eval$oracle_dbtools_parser_Parsed$java_lang_Object(target: Parsed, action: any): any {
        this.struct = action;
        {
            let array = /* values */(obj => Object.keys(obj).map(key => obj[key]))(this.namedPredicates);
            for(let index = 0; index < array.length; index++) {
                let p = array[index];
                {
                    if (p != null && p instanceof <any>MaterializedPredicate)(<MaterializedPredicate><any>p).src = target.getSrc();
                }
            }
        }
        const ret: any = <any>({});
        const _globals: GlobalMap = this.getGlobals();
        if (_globals != null){
            _globals.put("struct", this.struct);
            _globals.put("program", this);
        }
        const root: ParseNode = target.getRoot();
        if (Program.timing){
            console.info("tree depth =" + root.treeDepth());
            console.info("#tokens =" + /* size */(<number>target.getSrc().length));
        }
        const t1: number = /* currentTimeMillis */Date.now();
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>this.execOrder);
            for(let index = 0; index < array.length; index++) {
                let offset = array[index];
                {
                    const t11: number = /* currentTimeMillis */Date.now();
                    const cmd: Program.Command = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>this.execOrder, offset);
                    if (Program.debug)console.info(">=================================<     " + cmd.name());
                    const predicates: any = cmd.eval(target, action);
                    if (Program.timing){
                        console.info(cmd.name() + " eval time = " + (/* currentTimeMillis */Date.now() - t11));
                    }
                    Object.assign(ret, predicates);
                    Object.assign(this.namedPredicates, predicates);
                }
            }
        }
        this.namedPredicates = <any>({});
        Object.assign(this.namedPredicates, this.symbolicPredicates);
        const t2: number = /* currentTimeMillis */Date.now();
        if (Program.debug || Program.timing)console.info("eval time = " + (t2 - t1));
        return ret;
    }

    /**
     * Legacy API
     * @param {Parsed} target
     * @param {*} action -- callback object
     * @return
     * @return {*}
     */
    public eval(target?: any, action?: any): any {
        if (((target != null && target instanceof <any>Parsed) || target === null) && ((action != null) || action === null)) {
            return <any>this.eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, action);
        } else if (((target != null && target instanceof <any>Parsed) || target === null) && action === undefined) {
            return <any>this.eval$oracle_dbtools_parser_Parsed(target);
        } else if (target === undefined && action === undefined) {
            return <any>this.eval$();
        } else throw new Error('invalid overload');
    }

    public allowJS: boolean;

    jsCallback(_target: Parsed, _ret: any, _predVar: string, _action: string, _offset: number): void {
        // JavaScript action blocks are intentionally not interpreted in this port.
    }

    javaCallback(target: Parsed, action: any, ret: any, predVar: string) {
        if (Program.debug)console.info("-------->>>   " + predVar);
        const c: any = (<any>action.constructor);
        try {
            let callback: { owner: any, name: string, fn : Function } = null;
            try {
                callback = /* getDeclaredMethod */((c,p) => { if(c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function') return {owner:c,name:p,fn:c.prototype[p]}; else return null; })(c,predVar);
            } catch(e) {
                callback = /* getMethod */((c,p) => { if(c.prototype.hasOwnProperty(p) && typeof c.prototype[p] == 'function') return {owner:c,name:p,fn:c.prototype[p]}; else return null; })(c,predVar);
            }
            const mp: MaterializedPredicate = /* get */((m,k) => m[k]===undefined?null:m[k])(ret, predVar);
            for(let index = 0; index < mp.tuples.length; index++) {
                let t = mp.tuples[index];
                {
                    const tuple: any = <any>({});
                    for(let j: number = 0; j < mp.arity(); j++) {{
                        const colName: string = mp.getAttribute$int(j);
                        const node: ParseNode = mp.getAttribute$oracle_dbtools_arbori_Tuple$java_lang_String(t, colName);
                        /* put */(tuple[colName] = node);
                    };}
                    /* invoke */callback.fn.apply(action, [target, tuple]);
                }
            }
        } catch(e) {
            console.error(predVar + " callback: " + e.message);
            console.error(e.message, e);
        }
    }

    static isEvaluatedOnTupleLevel(predicate: Predicate): boolean {
        if (predicate != null && predicate instanceof <any>IdentedPredicate)return true;
        if (predicate != null && predicate instanceof <any>CompositeExpr){
            const ce: CompositeExpr = <CompositeExpr><any>predicate;
            const ret: boolean = Program.isEvaluatedOnTupleLevel(ce.lft);
            if (ret)return ret;
            if (ce.rgt != null)return Program.isEvaluatedOnTupleLevel(ce.rgt);
        }
        return false;
    }

    public static EvalSpace: string = "EvalSpace";

    public evalDimensions(predVar: string, target: Parsed, debug: boolean): AttributeDefinitions {
        let varDefs: AttributeDefinitions = new AttributeDefinitions(predVar, this.namedPredicates, true);
        const origDim: number = /* size */(<number>varDefs.listDimensions().length);
        const origPred: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.namedPredicates, predVar);
        const modPred: Predicate = origPred;
        /* put */(this.namedPredicates[predVar] = modPred);
        const modVarDefs: AttributeDefinitions = new AttributeDefinitions(predVar, this.namedPredicates, false);
        const modDim: number = /* size */(<number>modVarDefs.listDimensions().length);
        if (modDim <= origDim)varDefs = modVarDefs; else /* put */(this.namedPredicates[predVar] = origPred);
        varDefs.evalDimensions(target, false);
        if (debug || Program.timing && 1 < /* size */(<number>varDefs.listDimensions().length)){
            console.info(predVar + " dimensions: ");
            {
                let array = varDefs.listDimensions();
                for(let index = 0; index < array.length; index++) {
                    let varDef = array[index];
                    {
                        console.info(" " + varDef);
                    }
                }
            }
            console.info();
            console.info("Eval space = ");
            console.info(this.dimensions(varDefs));
            console.info();
        }
        if (this.test != null){
            /* put */(this.test['\"' + predVar + "." + Program.EvalSpace + '\"'] = '\"' + this.dimensions(varDefs) + '\"');
        }
        return varDefs;
    }

    dimensions(varDefs: AttributeDefinitions): string {
        const ret: { str: string, toString: Function } = { str: "", toString: function() { return this.str; } };
        let firstTime: boolean = true;
        {
            let array = varDefs.listDimensions();
            for(let index = 0; index < array.length; index++) {
                let varDef = array[index];
                {
                    /* append */(sb => { sb.str += <any>(firstTime ? "" : "x") + varDefs.getDimensionContent(varDef).cardinality(); return sb; })(ret);
                    firstTime = false;
                }
            }
        }
        return /* toString */ret.str;
    }

    public logDimensions(predVar: string, target: Parsed) {
        this.evalDimensions(predVar, target, true);
    }

    /**
     * 
     * @return {string}
     */
    public toString(): string {
        return /* getName */(c => typeof c === 'string' ? c : c["__class"] ? c["__class"] : c["name"])((<any>this.constructor)) + "@" + this.objRef;
    }
}
Program["__class"] = "oracle.dbtools.arbori.Program";


export namespace Program {

    export interface Command {
        eval(target: Parsed, action: any): any;

        name(): string;
    }

    export class PredicateCmd implements Program.Command {
        public __parent: any;
        __name: string;

        action: string;

        offset: number;

        public constructor(__parent: any, name: string, p: Predicate) {
            this.__parent = __parent;
            if (this.__name === undefined) { this.__name = null; }
            this.action = null;
            this.offset = 0;
            this.__name = name;
        }

        /**
         * 
         * @param {Parsed} target
         * @param {*} struct
         * @return {*}
         */
        public eval(target: Parsed, struct: any): any {
            const unnamed: MaterializedPredicate = this._eval(target, this.__name);
            const table: MaterializedPredicate = new MaterializedPredicate(this.__name, unnamed);
            table.trimAttributes();
            const ret: any = <any>({});
            /* put */(ret[this.__name] = table);
            if (Program.timing){
                console.info("       (cardinality=" + table.cardinality() + ")");
            }
            if (Program.debug)console.info(this.__name + "=" + table);
            if (this.action != null){
                const t2: number = /* currentTimeMillis */Date.now();
                if (Program.javaCallbackCode === this.action)this.__parent.javaCallback(target, struct, ret, this.__name); else this.__parent.jsCallback(target, ret, this.__name, this.action, this.offset);
                if (Program.debug || Program.timing)console.info("callback time = " + (/* currentTimeMillis */Date.now() - t2));
            }
            return ret;
        }

        _eval(target: Parsed, predVar: string): MaterializedPredicate {
            const evaluatedPredicate: Predicate = /* get */((m,k) => m[k]===undefined?null:m[k])(this.__parent.namedPredicates, predVar);
            if (!Program.isEvaluatedOnTupleLevel(evaluatedPredicate))return evaluatedPredicate['eval$oracle_dbtools_parser_Parsed'](target);
            const varDefs: AttributeDefinitions = this.__parent.evalDimensions(predVar, target, Program.debug);
            let firstDimension: string = null;
            {
                let array = varDefs.listDimensions();
                for(let index = 0; index < array.length; index++) {
                    let dim = array[index];
                    {
                        if (firstDimension == null || varDefs.getDimensionContent(dim).cardinality() < varDefs.getDimensionContent(firstDimension).cardinality()){
                            firstDimension = dim;
                        }
                    }
                }
            }
            const joined: Array<string> = <any>([]);
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(joined, firstDimension);
            const firstAttr: Attribute = varDefs.get(firstDimension);
            let ret: MaterializedPredicate = (<IndependentAttribute>firstAttr).getContent();
            ret.program = this.__parent;
            while((/* size */(<number>joined.length) < /* size */(<number>varDefs.listDimensions().length))) {{
                const current: string = varDefs.minimalRelatedDimension(joined, ret.cardinality());
                if (current == null)throw Object.defineProperty(new Error("Cartesian product evaluation: failed to find attribute joined to " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(joined) + ".\n Independent Attributes: " + /* implicit toString */ (a => a?'['+a.join(', ')+']':'null')(varDefs.listDimensions())), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(joined, current);
                const second: Attribute = varDefs.get(current);
                const pred2: MaterializedPredicate = (<IndependentAttribute>second).getContent();
                let filter: Predicate = True.INSTANCE_$LI$();
                if (/* size */(<number>joined.length) !== /* size */(<number>varDefs.listDimensions().length)){
                    for(let index = 0; index < ret.attributes.length; index++) {
                        let a = ret.attributes[index];
                        {
                            if (ret.name != null)a = ret.name + "." + a;
                            for(let index1 = 0; index1 < pred2.attributes.length; index1++) {
                                let b = pred2.attributes[index1];
                                {
                                    if (pred2.name != null)b = pred2.name + "." + b;
                                    const rel: Predicate = evaluatedPredicate.isRelated(a, b, varDefs);
                                    if (rel != null){
                                        if (filter != null && filter instanceof <any>True)filter = rel; else {
                                            if (filter !== rel)filter = new CompositeExpr(filter, rel, Oper.CONJUNCTION);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (filter != null && filter instanceof <any>True){
                        if (1 < varDefs.getDimensionContent(current).cardinality() && 1 < ret.cardinality())throw Object.defineProperty(new Error("Cartesian product evaluation; check for missing binary predicates"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
                    }
                } else filter = evaluatedPredicate;
                ret = MaterializedPredicate.filteredCartesianProduct(ret, pred2, filter, varDefs, target.getRoot(), target.getSrc());
                if (Program.debug)console.info("dim#" + /* size */(<number>joined.length) + ",cardinality=" + ret.cardinality());
            }};
            ret = MaterializedPredicate.filter(ret, evaluatedPredicate, varDefs, target.getRoot());
            if (/* size */(<number>joined.length) === /* size */(<number>varDefs.listDimensions().length))return ret;
            throw Object.defineProperty(new Error("Missing dyadic predicate in predvar " + predVar + "; won\'t evaluate cartesian product"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        }

        /**
         * 
         * @return {string}
         */
        public name(): string {
            return "Predicate " + this.__name;
        }
    }
    PredicateCmd["__class"] = "oracle.dbtools.arbori.Program.PredicateCmd";
    PredicateCmd["__interfaces"] = ["oracle.dbtools.arbori.Program.Command"];



    export class JavaScriptBlock implements Program.Command {
        public __parent: any;
        content: string;

        pos: number;

        public constructor(__parent: any, content: string, pos: number) {
            this.__parent = __parent;
            if (this.content === undefined) { this.content = null; }
            if (this.pos === undefined) { this.pos = 0; }
            this.content = content;
            this.pos = pos;
        }

        /**
         * 
         * @param {Parsed} target
         * @param {*} action
         * @return {*}
         */
        public eval(target: Parsed, action: any): any {
            return {};
        }

        /**
         * 
         * @return {string}
         */
        public name(): string {
            return "JS @offset " + this.pos;
        }
    }
    JavaScriptBlock["__class"] = "oracle.dbtools.arbori.Program.JavaScriptBlock";
    JavaScriptBlock["__interfaces"] = ["oracle.dbtools.arbori.Program.Command"];



    export class IncludedPrg implements Program.Command {
        public __parent: any;
        program: Program;

        public constructor(__parent: any, program: Program) {
            this.__parent = __parent;
            if (this.program === undefined) { this.program = null; }
            this.program = program;
        }

        /**
         * 
         * @param {Parsed} target
         * @param {*} action
         * @return {*}
         */
        public eval(target: Parsed, action: any): any {
            const includedPredicates: any = this.program.eval$oracle_dbtools_parser_Parsed$java_lang_Object(target, action);
            return includedPredicates;
        }

        /**
         * 
         * @return {string}
         */
        public name(): string {
            return "Included program.";
        }
    }
    IncludedPrg["__class"] = "oracle.dbtools.arbori.Program.IncludedPrg";
    IncludedPrg["__interfaces"] = ["oracle.dbtools.arbori.Program.Command"];



    export class Program$1 extends Earley {
        /**
         * 
         * @param {number} y
         * @param {LexerToken[]} src
         * @param {number} symbol
         * @param {number} suspect
         * @return {boolean}
         */
        isIdentifier(y: number, src: Array<LexerToken>, symbol: number, suspect: number): boolean {
            const token: LexerToken = /* get */src[y];
            return symbol === this.identifier && token.type === Token.IDENTIFIER || symbol === this.identifier && token.type === Token.DQUOTED_STRING;
        }

        public scan(matrix?: any, y?: any, src?: any, x?: any, suspect?: any): boolean {
            if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((typeof y === 'number') || y === null) && ((src != null && (src instanceof Array)) || src === null) && ((typeof x === 'number') || x === null) && ((typeof suspect === 'number') || suspect === null)) {
                return super.scan(matrix, y, src, x, suspect);
            } else if (((matrix != null && matrix instanceof <any>Matrix) || matrix === null) && ((y != null && (y instanceof Array)) || y === null) && src === undefined && x === undefined && suspect === undefined) {
                return <any>this.scan$oracle_dbtools_parser_Matrix$java_util_List(matrix, y);
            } else throw new Error('invalid overload');
        }

        scan$oracle_dbtools_parser_Matrix$java_util_List(matrix: Matrix, src: Array<LexerToken>): boolean {
            const ret: boolean = super.scan$oracle_dbtools_parser_Matrix$java_util_List(matrix, src);
            return ret;
        }

        /**
         * 
         * @param {number} ruleHead
         * @return {boolean}
         */
        isAsc(ruleHead: number): boolean {
            return true;
        }

        constructor(__arg0: any) {
            super(__arg0);
        }
    }

}




import { IndependentAttribute } from './IndependentAttribute';


import { Attribute } from './Attribute';


import { AttributeDefinitions } from './AttributeDefinitions';


import { IdentedPredicate } from './Predicate';


import { Tuple } from './Tuple';


import { JSFunc } from './Predicate';


import { True } from './Predicate';


import { ChildNumRelation } from './Predicate';


import { Tail } from './Predicate';


import { Head } from './Predicate';


import { Composite } from './Predicate';


import { BindVar } from './Predicate';


import { PositionalRelation } from './Predicate';


import { Position } from './Predicate';


import { SameNodes } from './Predicate';


import { AncestorDescendantNodes } from './AncestorDescendantNodes';


import { ParentChildNodes } from './Predicate';


import { NodesWMatchingSrc } from './Predicate';


import { NodeMatchingSrc } from './Predicate';


import { NodeContent } from './Predicate';


import { False } from './Predicate';


import { AggregatePredicate } from './AggregatePredicate';


import { Header } from './Predicate';


import { Oper } from './Predicate';


import { CompositeExpr } from './Predicate';


import { PredRef } from './Predicate';


import { PredicateDependency } from './PredicateDependency';


import { Predicate } from './Predicate';


import { MaterializedPredicate } from './MaterializedPredicate';


