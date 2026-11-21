/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Lexer } from '../Lexer.js';
import { LexerToken } from '../LexerToken.js';
import { ParseNode } from '../ParseNode.js';
import { Parseable } from '../Parseable.js';
import { Service } from '../../../arbori/util/Service.js';

/**
 * Latest revision of Stack-based parser -- "simpler" and more performant than CYK and Earley.
 * A theory behind is Dyck language
 * (or in lay terms - language of parenthesis:-)
 * 
 * History: QuickParser was the earlier prototype,
 * followed by worksheet.folding.BlockNode
 * @author vtropash
 * @class
 */
export class StackParser implements Parseable {
    static instance: StackParser = null;

    public static getInstance(): StackParser {
        if (StackParser.instance == null)StackParser.instance = new StackParser();
        return StackParser.instance;
    }

    static debug: boolean = false;

    /**
     * Major function
     * @param {LexerToken[]} src -- output of lexical analysis
     * @return {LazyNode} root of the tree
     */
    public parse(src: Array<LexerToken>): LazyNode {
        const stack: Array<LazyNode> = <any>([]);
        let pseudoRoot: LazyNode = new LazyNode(0, "pseudo root", src);
        pseudoRoot.to = /* size */(<number>src.length);
        /* add */(stack.push(pseudoRoot)>0);
        let prior: LexerToken = null;
        let prior2: LexerToken = null;
        let current: LexerToken = null;
        let pos: number = -1;
        for(let index = 0; index < src.length; index++) {
            let next = src[index];
            {
                if (StackParser.debug){
                    console.info(pos + " level=" + /* size */(<number>stack.length) + "       ");
                    if (current != null)current.print();
                }
                if (/* size */(<number>stack.length) === 0)break;
                if (current != null){
                    const token: string = current.content;
                    if (token == null)break;
                    const n: LazyNode = StackParser.oneIter(src, stack, prior, prior2, next, pos, token);
                    if (n != null)break;
                }
                prior2 = prior;
                prior = current;
                current = next;
                pos++;
            }
        }
        if (current != null){
            const token: string = current.content;
            if (token != null && /* size */(<number>stack.length) !== 0){
                const n: LazyNode = StackParser.oneIter(src, stack, prior, prior2, null, pos, token);
            }
        }
        const declare2plsql: any = <any>({});
        let create: LazyNode = null;
        let end: number = -1;
        {
            let array = pseudoRoot.shallowChildren();
            for(let index = 0; index < array.length; index++) {
                let child = array[index];
                {
                    end = child.to;
                    if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("create", child.startToken)){
                        create = child;
                        continue;
                    }
                    if (create != null && child.isCompilationUnit()){
                        /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>declare2plsql, create, child);
                        create = null;
                        continue;
                    }
                }
            }
        }
        {
            let array = /* keySet */((m) => { let r=[]; if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) r.push(m.entries[i].key); return r; })(<any>declare2plsql);
            for(let index = 0; index < array.length; index++) {
                let declair = array[index];
                {
                    const plsql: LazyNode = /* get */((m,k) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { return m.entries[i].value; } return null; })(<any>declare2plsql, declair);
                    declair.addTopLevel(plsql);
                    declair.to = plsql.to;
                    /* remove */(a => { let index = a.indexOf(plsql); if(index>=0) { a.splice(index, 1); return true; } else { return false; }})(pseudoRoot.topLevel);
                }
            }
        }
        this.processStackLeftover(stack);
        if (/* size */(<number>pseudoRoot.shallowChildren().length) === 0 && pseudoRoot.from < /* size */(<number>src.length)){
            pseudoRoot.startToken = /* get */src[pseudoRoot.from].content;
        }
        if (/* size */(<number>pseudoRoot.shallowChildren().length) === 1){
            {
                let array = pseudoRoot.shallowChildren();
                for(let index = 0; index < array.length; index++) {
                    let child = array[index];
                    {
                        if (child.from === pseudoRoot.from && child.to === pseudoRoot.to)pseudoRoot = child;
                        if (child.to === -1)child.to = pseudoRoot.to;
                    }
                }
            }
        }
        if (-1 < end && end < pseudoRoot.to){
            const label: string = /* get */src[end].content;
            const more: LazyNode = new LazyNode(end, label, src);
            more.to = /* size */(<number>src.length);
            if (more.isDML(null)){
                pseudoRoot.addTopLevel(more);
            }
        }
        return pseudoRoot;
    }

    /*private*/ processStackLeftover(stack: Array<LazyNode>) {
        let above: LazyNode = null;
        for(let index = 0; index < stack.length; index++) {
            let current = stack[index];
            {
                current.isWellFormed = false;
                if (above != null){
                    above.addTopLevel(current);
                    if (current.to === -1)current.to = above.to;
                }
                above = current;
            }
        }
    }

    /*private*/ static oneIter(src: Array<LexerToken>, stack: Array<LazyNode>, prior: LexerToken, prior2: LexerToken, next: LexerToken, pos: number, token: string): LazyNode {
        const candidate: LazyNode = new LazyNode(pos, token, src);
        const top: LazyNode = stack.getLast();
        if (top == null)return new LazyNode(pos, "top==null", src);
        const nextStr: string = next == null ? null : next.content;
        const nextTop: string = null;
        if (candidate.isDDL(nextStr) && (prior == null || (";" === prior.content) || ("/" === prior.content)) && !top.isDDL(nextTop) || candidate.isAs() && top.isCompilationUnit() && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("external", nextStr) || candidate.isCompilationUnit() && !top.isDDL(nextTop) && !top.isDML(nextTop) && !("(" === top.startToken) && (prior == null || !("." === prior.content)) && (!candidate.isProcedure() || !("type" === top.startToken) || prior == null || !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("member", prior.content) && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("static", prior.content)) || candidate.isDML(nextStr) && !top.isDML(nextTop) && !("(" === top.startToken) && !top.isDDL(nextTop) && !top.isAs() && (prior == null || !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("with", token) || (!/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("time", prior.content) && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("timestamp", prior.content))) && (prior == null || !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("update", token) || !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", prior.content)) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("declare", token) && !top.isDDL(nextTop) && !top.isAs() || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("begin", token) && !top.isAs() && !top.isDDL(nextTop) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("if", token) && prior != null && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", prior.content) && !top.isDDL(nextTop) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("case", token) && prior != null && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", prior.content) && !top.isDDL(nextTop) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("loop", token) && !top.isDML(nextTop) && !top.isAs() && !("(" === top.startToken) && prior != null && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", prior.content) && !top.isDDL(nextTop) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("type", token) && top.isDDL(nextTop) && !("replace" === prior.content) && !("create" === prior.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", token) && (prior2 == null || !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("open", prior2.content)) && !StackParser.isPivot(top, src) && !top.isDDL(nextTop) && !top.isAs() && !/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("ORDINALITY", nextStr) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("while", token) && !top.isDDL(nextTop) || ("(" === token)){
            /* add */(stack.push(candidate)>0);
        } else if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("update", token) && prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", prior.content) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", top.startToken)){
            top.to = pos;
            if (StackParser.debug){
                console.info("+level=" + /* size */(<number>stack.length) + "       " + top.startToken + "..." + /* get */src[top.to - 1].content);
            }
            stack.removeLast();
            if (/* size */(<number>stack.length) === 0)return new LazyNode(0, "error", src);
        } else if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("begin", token) && top.isAs() || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("exception", token) && top.isBlock(null) && !(next.content === (";")) || candidate.isCompilationUnit() && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("create", top.startToken)){
            top.to = pos;
            if (StackParser.debug){
                console.info("+level=" + /* size */(<number>stack.length) + "       " + top.startToken + "..." + /* get */src[top.to - 1].content);
            }
            stack.removeLast();
            if (/* size */(<number>stack.length) === 0)return new LazyNode(0, "error", src);
            stack.getLast().addTopLevel(top);
            /* add */(stack.push(candidate)>0);
        } else if (("/" === token) && /* size */(<number>stack.length) === 1){
        } else if ((";" === token) && top.isCompilationUnit() || (";" === token) && top.isDML(nextTop) || (";" === token) && top.isDDL(nextTop) || ("/" === token) && top.isDDL(nextTop) || (";" === token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("if", top.startToken) && prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("if", prior.content) || (";" === token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", top.startToken) && prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("loop", prior.content) || (";" === token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("for", top.startToken) && prior2 != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("loop", prior2.content) || (";" === token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("while", top.startToken) && prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("loop", prior.content) || (";" === token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("while", top.startToken) && prior2 != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("loop", prior2.content) || (";" === token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("declare", top.startToken) && prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", prior.content) || (";" === token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("declare", top.startToken) && prior2 != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", prior2.content) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("case", top.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("begin", top.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("exception", top.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("loop", top.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", token) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("type", top.startToken) || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("end", token) && top.isAs() || (")" === token) || prior != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("language", prior.content) && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("java", token) && top.isAs()){
            top.to = pos + 1;
            if (/* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("begin", top.startToken) && next != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(next.content, ";") || /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("exception", top.startToken) && next != null && /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))(next.content, ";"))top.to = pos + 2;
            if (StackParser.debug){
                console.info("+level=" + /* size */(<number>stack.length) + "       " + top.startToken + "..." + /* get */src[top.to - 1].content);
            }
            stack.removeLast();
            if (/* size */(<number>stack.length) === 0)return new LazyNode(pos, "error", src);
            stack.getLast().addTopLevel(top);
        }
        return null;
    }

    /*private*/ static isPivot(top: LazyNode, src: Array<LexerToken>): boolean {
        const priorPos: number = top.from - 1;
        if (priorPos < 0)return false;
        const priorToTop: string = /* get */src[priorPos].content;
        let isUPivot: boolean = priorToTop != null && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(priorToTop.toLowerCase(), "pivot");
        const isNulls: boolean = /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("nulls", priorToTop);
        if (isNulls && !isUPivot){
            const priorPos2: number = priorPos - 2;
            if (priorPos2 < 0)return false;
            const prior2: string = /* get */src[priorPos2].content;
            isUPivot = prior2 != null && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(prior2.toLowerCase(), "pivot");
        }
        const isXML: boolean = /* equalsIgnoreCase */((o1, o2) => o1.toUpperCase() === (o2===null ? o2 : o2.toUpperCase()))("xml", priorToTop);
        if (isXML && !isUPivot){
            const priorPos1: number = priorPos - 1;
            if (priorPos1 < 0)return false;
            const prior1: string = /* get */src[priorPos1].content;
            isUPivot = prior1 != null && /* endsWith */((str, searchString) => { let pos = str.length - searchString.length; let lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(prior1.toLowerCase(), "pivot");
        }
        return ("(" === top.startToken) && 0 < top.from && isUPivot;
    }

    /**
     * Example usage
     * @param {java.lang.String[]} dummy
     * @throws Exception
     */
    public static main(dummy: string[]) {
        const input: string = Service.readFile$java_lang_Class$java_lang_String(StackParser, "test.sql");
        const main: Thread = Thread.currentThread();
        new StackParser.StackParser$0(main).start();
        let h: number = Runtime.getRuntime().totalMemory();
        let hf: number = Runtime.getRuntime().freeMemory();
        console.info("mem=" + (h - hf));
        let t1: number = /* currentTimeMillis */Date.now();
        const src: Array<LexerToken> = Lexer.parse$java_lang_String(input);
        System.gc();
        h = Runtime.getRuntime().totalMemory();
        hf = Runtime.getRuntime().freeMemory();
        console.info("lex mem=" + (h - hf));
        let t2: number = /* currentTimeMillis */Date.now();
        console.info("lex time = " + (t2 - t1));
        System.gc();
        const root: LazyNode = StackParser.getInstance().parse(src);
        h = Runtime.getRuntime().totalMemory();
        hf = Runtime.getRuntime().freeMemory();
        console.info("parse mem=" + (h - hf));
        const t3: number = /* currentTimeMillis */Date.now();
        console.info("parse time = " + (t3 - t2));
        const tmp: Array<number> = <any>([]);
        {
            let array = root.descendants();
            for(let index = 0; index < array.length; index++) {
                let desc = array[index];
                {
                    for(let index1 = 0; index1 < tmp.length; index1++) {
                        let t = tmp[index1];
                        {
                            const x: number = Service.lX(t);
                            const y: number = Service.lY(t);
                            if (desc.from < x && x < desc.to && desc.to < y || x < desc.from && desc.from < y && y < desc.to){
                                console.info("[x,y)=[" + x + "," + y + ")\n[from,to)=[" + desc.from + "," + desc.to + ")");
                                t2 = /* currentTimeMillis */Date.now();
                                console.info("time = " + (t2 - t1));
                                System.exit(0);
                            }
                        }
                    }
                    /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(tmp, Service.lPair(desc.from, desc.to));
                }
            }
        }
        if (/* size */(<number>src.length) < 1000)root.printTree$();
        t1 = /* currentTimeMillis */Date.now();
        {
            let array = root.descendants();
            for(let index = 0; index < array.length; index++) {
                let desc = array[index];
                {
                    const node: LazyNode = <LazyNode>desc;
                    if (node.isProcedure()){
                        node.expand$();
                    }
                }
            }
        }
        t2 = /* currentTimeMillis */Date.now();
        console.info("expand time = " + (t2 - t1));
    }

    constructor() {
    }
}
StackParser["__class"] = "oracle.dbtools.parser.plsql.StackParser";
StackParser["__interfaces"] = ["oracle.dbtools.parser.Parseable"];



export namespace StackParser {

    export class StackParser$0 {
        /**
         * 
         */
        public run() {
            try {
                Thread.sleep(850);
            } catch(e) {
            }
            this.main.interrupt();
        }

        constructor(private main: any) {
        }
    }

}




import { LazyNode } from './LazyNode.js';
