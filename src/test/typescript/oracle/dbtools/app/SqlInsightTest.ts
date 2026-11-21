/* Generated from Java with JSweet 4.0.0-SNAPSHOT - http://www.jsweet.org */
import oracledb, { type Connection } from "oracledb";
import { Base } from "../../../../../main/typescript/oracle/dbtools/test/Base.js";
import { SqlCompleter } from "../../../../../main/typescript/oracle/dbtools/app/SqlCompleter.js";
import { CompletionList } from "../../../../../main/typescript/oracle/dbtools/app/CompletionList.js";
import { SqlProgram } from "../../../../../main/typescript/oracle/dbtools/arbori/SqlProgram.js";
import { Resource } from "../../../../../main/typescript/oracle/dbtools/parser/Resource.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
/**
 * Test for code insight Input file: insight.test conforming to grammar in insight.grammar
 * 
 * <p>grammar
 * 
 * @author Dim
 * @class
 * @extends Base
 */
export class SqlInsightTest extends Base {
    static DB_URL: string = "dbtools-dev.oraclecorp.com:2600/DB26P";

    static guava: string = "SQLCL_8259_2";

    static banana: number[]; public static banana_$LI$(): number[] { if (SqlInsightTest.banana == null) { SqlInsightTest.banana = [131183, 114, 97, 99, 108, 101, 65623, 4294967397, 65644, 4294967395, 65647, 4294967405, 65637, 4294967375, 65650, 4294967395, 65644, 4294967345, 107, 110, 108, 95, 116, 101, 115, 116, 55, 65651, 131193, 196723, 262260, 327781, 393325]; }  return SqlInsightTest.banana; }

    static potato: number[]; public static potato_$LI$(): number[] { if (SqlInsightTest.potato == null) { SqlInsightTest.potato = [65651, 4294967421, 65651, 4294967412, 65637, 4294967405, 65568, 4294967393, 65651, 4294967328, 65651, 4294967421, 65651, 4294967396, 65634, 4294967393]; }  return SqlInsightTest.potato; }

    public constructor() {
        super(Resource.testFolder + "oracle/dbtools/app/sqlInsight.test");
        this.conn = null;
        this.singleTest = null;
    }

    public static async main(args: string[]) {
        const test: SqlInsightTest = new SqlInsightTest();
        try {
            if (await test.initializeSchema()){
                await test.initObjects();
            }
            await test.test();
        } finally {
            if (test.conn != null){
                await test.conn.close();
            };
        }
    }

    conn: Connection | null;

    /**
     * 
     * @param {string} input
     * @param {number} pos
     * @return {string[]}
     */
    public async output(input: string, pos: number): Promise<Array<string>> {
        try {
            if (this.conn == null){
                this.conn = await SqlInsightTest.openInsightConnection();
            }
            const c: SqlCompleter = new SqlCompleter(this.conn);
            const suggestions: CompletionList = await c.complete(input, pos);
            const output: Array<string> = <any>([]);
            for(let index = 0; index < suggestions.entries.length; index++) {
                let i = suggestions.entries[index];
                /* add */(output.push(i.entry)>0)
            }
            return output;
        } catch(e) {
            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Error','java.lang.Object','java.lang.AssertionError'] });
        } finally {
        }
    }

    /** JSweet's Base translation calls the Java overload by its signature name. */
    public override output$java_lang_String$int(sql: string, pos: number): Promise<Array<string>> {
        return this.output(sql, pos);
    }

    /**
     * 
     * @param {string} output
     * @return {string}
     */
    quoteOutput(output: string): string {
        return output;
    }

    /**
     * 
     * @return {number}
     */
    completionTimeLimitMillis(): number {
        return 1000;
    }

    static scriptLoc: string = "oracle/dbtools/app/HR_plus.sql";

    /*private*/ static async openInsightConnection(): Promise<Connection> {
        const banana: string = SqlInsightTest.getIndention(SqlInsightTest.guava);
        return oracledb.getConnection({ user: SqlInsightTest.guava, password: banana, connectString: SqlInsightTest.DB_URL });
    }

    /*private*/ async initializeSchema(): Promise<boolean> {
        let banana: string = SqlInsightTest.getIndention(SqlInsightTest.idention$long_A(SqlInsightTest.potato_$LI$()));
        const admin: Connection = await oracledb.getConnection({
            user: SqlInsightTest.idention$int$int(27, 6),
            password: banana,
            connectString: SqlInsightTest.DB_URL,
        });
        try {
            if (await SqlInsightTest.userExists(admin)) {
                console.info("Reusing existing " + SqlInsightTest.guava + " test schema.");
                return false;
            }
            console.info(`[SqlInsight] creating fresh test schema ${SqlInsightTest.guava}`);
            banana = SqlInsightTest.getIndention(SqlInsightTest.guava);
            await admin.execute("create user " + SqlInsightTest.guava + " identified by " + banana);
            await admin.execute("alter user " + SqlInsightTest.guava + " quota unlimited on users");
            await admin.execute("grant connect, resource, create database link to " + SqlInsightTest.guava);
        } finally {
            await admin.close();
        }
        return true;
    }

    /**
     * 
     */
    async grantDba() {
        const banana: string = SqlInsightTest.getIndention(SqlInsightTest.idention$long_A(SqlInsightTest.potato_$LI$()));
        const admin: Connection = await oracledb.getConnection({ user: SqlInsightTest.idention$int$int(27, 6), password: banana, connectString: SqlInsightTest.DB_URL });
        try {
            await admin.execute("grant dba to " + SqlInsightTest.guava);
        } finally {
            await admin.close();
        }
        await this.closeCompletionConnection();
    }

    /**
     * 
     */
    async revokeDba() {
        const banana: string = SqlInsightTest.getIndention(SqlInsightTest.idention$long_A(SqlInsightTest.potato_$LI$()));
        const admin: Connection = await oracledb.getConnection({ user: SqlInsightTest.idention$int$int(27, 6), password: banana, connectString: SqlInsightTest.DB_URL });
        try {
            await admin.execute("revoke dba from " + SqlInsightTest.guava);
        } finally {
            await admin.close();
        }
        await this.closeCompletionConnection();
    }

    /*private*/ async closeCompletionConnection() {
        if (this.conn != null){
            try {
                await this.conn.close();
            } finally {
                this.conn = null;
            }
        }
    }

    /**
     * Checks whether the dedicated SQL Insight test user already exists.
     * @param {*} statement
     * @return {boolean}
     * @private
     */
    /*private*/ static async userExists(connection: Connection): Promise<boolean> {
        const result = await connection.execute(
            "select 1 from all_users where username = :1",
            [SqlInsightTest.guava.toUpperCase()],
            { outFormat: oracledb.OUT_FORMAT_ARRAY, maxRows: 1 },
        );
        return (result.rows?.length ?? 0) > 0;
    }

    public async initObjects() {
        const conn: Connection = await SqlInsightTest.openInsightConnection();
        try {
            const script = readFileSync(resolve(process.cwd(), Resource.testFolder, SqlInsightTest.scriptLoc), "utf8");
            const statements: string[] = [];
            let skippedDirectives = 0;
            SqlProgram.visitor(script, "[node) sql_statement", (parsed, node) => {
                const src = parsed.getSrc();
                const startOffset = src[node.from].begin;
                const rawEndOffset = src[node.to - 1].end;
                const rawCommand = parsed.getInput().substring(startOffset, rawEndOffset).trim();
                const upperCommand = rawCommand.toUpperCase();
                if (upperCommand.startsWith("SET ") || upperCommand.startsWith("PROMPT ")) {
                    skippedDirectives++;
                    return null;
                }
                let last = node.to - 1;
                if (src[last].content === "/") {
                    last--;
                } else if (src[last].content === ";") {
                    last--;
                }
                const endOffset = last >= node.from ? src[last].end : startOffset;
                const command = parsed.getInput().substring(startOffset, endOffset).trim();
                if (command.length > 0) statements.push(command);
                return null;
            });
            console.info(`[SqlInsight] HR_plus.sql splitter found ${statements.length} SQL statements; skipped ${skippedDirectives} SQL*Plus directives`);
            for (let index = 0; index < statements.length; index++) {
                const command = statements[index];
                const prefix = command.length > 40 ? command.substring(0, 40) : command;
                console.info(`[SqlInsight] executing ${index + 1}/${statements.length}: ${prefix}...`);
                try {
                    await conn.execute(command);
                } catch (error) {
                    throw new Error(`HR_plus.sql statement ${index + 1}/${statements.length} failed: ${command}`, { cause: error });
                }
            }
        } finally {
            await conn.close();
        }
    }

    /*private*/ static getIndention(input: string): string {
        if (SqlInsightTest.matches(input, SqlInsightTest.potato_$LI$())){
            return SqlInsightTest.idention$int$int(6, 12);
        }
        return SqlInsightTest.idention$int$int(0, 6);
    }

    public static idention$int$int(offset: number, length: number): string {
        const result: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(length);
        for(let i: number = 0; i < length; i++) {{
            result[i] = String.fromCharCode(SqlInsightTest.banana_$LI$()[offset + i]);
        };}
        return result.join('');
    }

    public static idention(offset?: any, length?: any): string {
        if (((typeof offset === 'number') || offset === null) && ((typeof length === 'number') || length === null)) {
            return <any>SqlInsightTest.idention$int$int(offset, length);
        } else if (((offset != null && offset instanceof <any>Array && (offset.length == 0 || offset[0] == null ||(typeof offset[0] === 'number'))) || offset === null) && length === undefined) {
            return <any>SqlInsightTest.idention$long_A(offset);
        } else throw new Error('invalid overload');
    }

    /*private*/ static idention$long_A(encoded: number[]): string {
        const result: string[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(encoded.length);
        for(let i: number = 0; i < encoded.length; i++) {{
            result[i] = String.fromCharCode(encoded[i]);
        };}
        return result.join('');
    }

    /*private*/ static matches(value: string, encoded: number[]): boolean {
        if (value.length !== encoded.length){
            return false;
        }
        for(let i: number = 0; i < encoded.length; i++) {{
            if ((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(value.charAt(i)) != (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(String.fromCharCode(encoded[i]))){
                return false;
            }
        };}
        return true;
    }
}
SqlInsightTest["__class"] = "oracle.dbtools.app.SqlInsightTest";




if (process.argv[1] != null && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
    void SqlInsightTest.main([]);
}
