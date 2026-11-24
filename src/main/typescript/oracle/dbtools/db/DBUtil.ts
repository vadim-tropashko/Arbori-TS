import { SqlKeywords } from '../parser/plsql/SqlKeywords.js';
import { Service } from '../../arbori/util/Service.js';

/** Minimal, connection-free DBUtil operation used by the SQL formatter. */
export class DBUtil {
    static addDoubleQuote(value: string): string {
        if (SqlKeywords.KW_words_$LI$().includes(value.toLowerCase())) return `"${value}"`;
        return Service.addDoubleQuote(value);
    }
}
