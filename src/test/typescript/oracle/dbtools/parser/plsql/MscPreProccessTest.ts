import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { LexerToken } from "../../../../../../main/typescript/oracle/dbtools/parser/LexerToken.js";
import { Matrix } from "../../../../../../main/typescript/oracle/dbtools/parser/Matrix.js";
import { Resource } from "../../../../../../main/typescript/oracle/dbtools/parser/Resource.js";
import { SqlEarley } from "../../../../../../main/typescript/oracle/dbtools/parser/plsql/SqlEarley.js";

const fixture = "oracle/dbtools/parser/plsql/MSC_CL_PRE_PROCESS.pkgbdy";

export class MscPreProccessTest {
  public static main(_args: string[] = []): void {
    const input = readFileSync(resolve(Resource.testFolder, fixture), "utf8");

    const initStarted = Date.now();
    const earley = SqlEarley.getInstance();
    console.info(`Earley init time = ${Date.now() - initStarted}`);

    const lexStarted = Date.now();
    const tokens = LexerToken.parse$java_lang_String(input);
    console.info(`Lex time = ${Date.now() - lexStarted}`);

    const matrix = new Matrix(earley);
    const parseStarted = Date.now();
    earley.parse$java_util_List$oracle_dbtools_parser_Matrix(tokens, matrix);
    console.info(`Earley parse time = ${Date.now() - parseStarted}`);

    const top = matrix.get(0, tokens.length);
    if (top) {
      console.info(`${tokens.length} tokens, top = ${top.toString()}`);
    } else {
      console.info(`No full [0,${tokens.length}) cell; matrix reached token ${matrix.lastY()}.`);
    }

    const reductionStarted = Date.now();
    const root = earley.forest$java_util_List$oracle_dbtools_parser_Matrix$boolean$java_lang_String(
      tokens,
      matrix,
      true,
      input,
    );
    console.info(`Reduction time = ${Date.now() - reductionStarted}`);
    if (root) root.printTree$int(3);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  MscPreProccessTest.main();
}
