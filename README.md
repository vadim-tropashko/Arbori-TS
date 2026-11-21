# Arbori-TS

TypeScript port of the production sources in `dbtools-arbori`.

The Kotlin Multiplatform reference port is checked out under
`reference/Arbori_kotlin` from `https://github.com/vadim-tropashko/Arbori_kotlin`
at commit `60756f0`. Its common parser implementation and `jsMain` sources are
available locally for comparison; the repository is an independent nested Git
checkout, so its history and remote remain separate from this project.

The Java module's test sources are intentionally excluded. Grammar and other
runtime resources are preserved under `src/main/resources`.

The Java module uses Jackson only in `oracle.dbtools.parser.json.Util` to
escape and unescape JSON string contents. The TypeScript port uses the standard
`JSON.stringify` and `JSON.parse` functions for those operations, so no JSON
package is needed. Oracle database access is provided by Oracle's
`node-oracledb` package.

The SQL workbench is an Electron desktop application. Run `npm install` and
then `npm run start:electron`; that command typechecks the parser and Electron
entry point, packages the local renderer and Node main-process completer, then
opens the app. The renderer files in `electron/renderer` are part of the desktop
application; there is no separate browser application. The **Parse** button
runs the lexer and Earley parser together and fills the Lexed, Matrix, and Parse
tree tabs.

SQL Insight sends the editor text and cursor offset to the Electron main process
over local IPC. `SqlCompleter` and `node-oracledb` run in that Node process; no
browser database connection or HTTP completer service is used. The driver
defaults to its JavaScript Thin mode, which does not require Oracle Client
libraries. Enter the Oracle username and password and a Node-oracledb connection
string. The default is user `hr`, password `oracle`, and
`dbtools-dev.oraclecorp.com:2600/DB26P`. The connection string is passed
unchanged to `oracledb.getConnection`, and connection or dictionary errors are
shown in the SQL Insight tab. Dictionary SQL and bind values are logged there
as the completer issues its metadata queries.

The Oracle-backed completer suite mirrors `SqlInsightTest.main()`. Run
`npm run test:sql-insight`. Override the connection and credentials with
`SQL_INSIGHT_TEST_CONNECT_STRING`, `SQL_INSIGHT_TEST_USER`,
`SQL_INSIGHT_TEST_PASSWORD`, `SQL_INSIGHT_TEST_ADMIN_USER`, and
`SQL_INSIGHT_TEST_ADMIN_PASSWORD`. `SQL_INSIGHT_TEST_NUMBERS` can limit a run
to comma-separated fixture numbers. The default test user is `SQLCL_8259_3`.
If that user does not exist, the runner executes the single `HR_plus.sql`
script, split into SQL statements by the Arbori SQL splitter. It skips schema
initialization when the user already exists and applies the fixture's DBA
grant changes without dropping the user or objects afterward.

The original `lexerRegression.test` fixture and `lexerTest.grammar` are copied
verbatim under `src/test/resources`. The TypeScript runner parses the DSL with
the Earley engine and executes its assertions against the lexer. Run it with
`npm run test:lexer-regression`. In VS Code, open **Run and Debug** and select
**Lexer regression (TypeScript)**. The runner requires Node.js 22.12 or newer;
typechecking it separately is available with `npm run typecheck:lexer-regression`.

The SQL parser regression fixtures `regression.test`, `doc/doc_sql.test`, and
`doc/doc_plsql.test`, along with `regrTest.grammar`, are also copied verbatim.
Run the SQL parse-tree comparisons with `npm run test:sql-regression` (optionally
pass a fixture path such as `doc/doc_sql.test`), or run the combined ported suite
with `npm run test:doc-statements`. That runner also runs the lexer DSL and the
grammar-extension case. The generic Earley engine currently differs from the
Java `SqlEarley` implementation for some parse-tree cases; the comparison
reports those mismatches rather than treating a parse as successful.

The Java `DocStatementsTest.main()` also invokes GraphQL, APEX, Arbori DSL, and
syntax-error regression suites. Those test harnesses are not included yet; they
depend on parser/runtime features beyond the SQL and lexer harnesses currently
ported here.

The MSC PL/SQL package used by Java's `MscPreProccessTest` is copied under the
same SQL/PLSQL test resources. Run the parser performance evaluation with
`npm run benchmark:msc-preprocess`. It reports lexing and Earley recognition
times, the top matrix cell, a trimmed tree, and memory use. It retains compact
integer derivation links so recognition and tree reduction can be measured
without replaying into the object-based parser. It uses range pruning and
releases completed chart rows while retaining only waiting states needed for
future completions. It has no chart-item limit by default; set
`MSC_MAX_CHART_ITEMS` only when you want an early diagnostic stop. You can pass
a different input path after the script name (relative to the PL/SQL fixtures
or absolute). Set `MSC_BUILD_TREE=false` to measure recognition without keeping
derivation links. The same runner is available in VS Code as **MSC parser
performance (TypeScript)**.
