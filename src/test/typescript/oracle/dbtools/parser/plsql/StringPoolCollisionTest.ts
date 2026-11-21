/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { LongHelper } from '../../../../javaemul/internal/LongHelper';
import { StringHelper } from '../../../../javaemul/internal/StringHelper';

/**
 * Verifies that the FNV-1a hash used by {@link SqlEarley}'s RULES_STRING_POOL
 * produces no collisions for any of the strings found in allRules.txt.
 * <p>
 * Because the pool uses {@code computeIfAbsent(hash, ...)}, a collision would
 * silently return the wrong string.  This cannot be cheaply validated at
 * runtime, so we catch it here at test time.
 * @class
 */
export class StringPoolCollisionTest {
    public testNoHashCollisionsInRulesStringPool() {
        const data: number[] = SqlEarley.loadRulesData();
        const uniqueStrings: Array<string> = StringPoolCollisionTest.extractUniqueStrings(data);
        StringPoolCollisionTest.assertNoHashCollisions(uniqueStrings);
    }

    /**
     * Extracts every unique token from the rules data by splitting each line
     * on {@code ": "} (head) and spaces (rhs tokens).
     * <p>
     * This intentionally bypasses the string pool so that the raw, true
     * strings are collected — if we used {@code extractRules()} the pool
     * would silently mask any collision.
     * @param {byte[]} data
     * @return {string[]}
     * @private
     */
    /*private*/ static extractUniqueStrings(data: number[]): Array<string> {
        const delimiters: Array<number> = <any>([]);
        /* add */(delimiters.push(-1)>0);
        for(let i: number = 0; i < data.length; i++) {{
            if (data[i] == '\n'.charCodeAt(0))/* add */(delimiters.push(i)>0);
        };}
        /* add */(delimiters.push(data.length)>0);
        const strings: Array<string> = <any>([]);
        for(let line: number = 0; line < /* size */(<number>delimiters.length) - 1; line++) {{
            const lineStart: number = /* get */delimiters[line] + 1;
            const nextDelimiter: number = /* get */delimiters[line + 1];
            if (lineStart >= nextDelimiter)continue;
            let colonPos: number = -1;
            for(let pos: number = lineStart; pos < nextDelimiter - 1; pos++) {{
                if (data[pos] == ':'.charCodeAt(0) && data[pos + 1] == ' '.charCodeAt(0)){
                    colonPos = pos;
                    break;
                }
            };}
            if (colonPos < 0)continue;
            /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(strings, String.fromCharCode.apply(null, data).substr(lineStart, colonPos - lineStart));
            let tokenStart: number = colonPos + 2;
            for(let pos: number = tokenStart; pos <= nextDelimiter; pos++) {{
                if (pos === nextDelimiter || data[pos] == ' '.charCodeAt(0)){
                    if (pos > tokenStart){
                        /* add */((s, e) => { if(s.indexOf(e)==-1) { s.push(e); return true; } else { return false; } })(strings, String.fromCharCode.apply(null, data).substr(tokenStart, pos - tokenStart));
                    }
                    tokenStart = pos + 1;
                }
            };}
        };}
        return strings;
    }

    /*private*/ static assertNoHashCollisions(uniqueStrings: Array<string>) {
        const hashToString: any = <any>({});
        const collisions: Array<string> = <any>([]);
        for(let index = 0; index < uniqueStrings.length; index++) {
            let s = uniqueStrings[index];
            {
                const bytes: number[] = /* getBytes */(s).split('').map(s => s.charCodeAt(0));
                const hash: number = SqlEarley.hashBytes(bytes, 0, bytes.length);
                const existing: string = /* put */((m,k,v) => { if(m.entries==null) m.entries=[]; for(let i=0;i<m.entries.length;i++) if(m.entries[i].key==null && k==null || m.entries[i].key.equals!=null && m.entries[i].key.equals(k) || m.entries[i].key===k) { m.entries[i].value=v; return; } m.entries.push({key:k,value:v,getKey: function() { return this.key }, getValue: function() { return this.value }}); })(<any>hashToString, hash, s);
                if (existing != null && !(existing === s)){
                    /* add */(collisions.push("hash 0x" + LongHelper.toHexString(hash) + " collides: \"" + existing + "\" vs \"" + s + "\"")>0);
                }
            }
        }
        if (!/* isEmpty */(collisions.length == 0)){
            Assertions.fail("RULES_STRING_POOL hash collisions detected (" + /* size */(<number>collisions.length) + "):\n" + StringHelper.join("\n", collisions));
        }
    }
}
StringPoolCollisionTest["__class"] = "oracle.dbtools.parser.plsql.StringPoolCollisionTest";




import { SqlEarley } from './SqlEarley';

