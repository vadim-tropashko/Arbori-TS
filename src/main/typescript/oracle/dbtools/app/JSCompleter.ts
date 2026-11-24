import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { CompletionItem } from './CompletionItem.js';
import { Earley } from '../parser/Earley.js';
import { LexerToken } from '../parser/LexerToken.js';
import { ParseNode } from '../parser/ParseNode.js';
import { Parsed } from '../parser/Parsed.js';
import { SqlEarley } from '../parser/plsql/SqlEarley.js';

/** TypeScript runtime counterpart to Java's classpath-backed JSCompleter. */
export class JSCompleter {
    public editorOffset = -1;

    constructor(private readonly earley: Earley) {}

    public complete(input: string, pos: number): CompletionItem[] {
        const rootSyntax = this.earley instanceof SqlEarley ? 'sql_statements' : 'javascript';
        const target = new Parsed(input, this.earley, rootSyntax);
        this.editorOffset = LexerToken.char2lex$java_util_List$int(target.getSrc(), pos);

        const src = target.getSrc();
        if (this.editorOffset < 0 || this.editorOffset >= src.length) return [];
        const current = src[this.editorOffset];
        let prefix = '';
        if (current.begin < pos && current.content !== '.') {
            prefix = current.content.substring(0, pos - current.begin);
        }

        const leafAtPos: ParseNode = target.getRoot().leafAtPos(this.editorOffset);
        if (leafAtPos != null && leafAtPos.contains$java_lang_String('Literal')) {
            let packagePrefix = prefix;
            if (packagePrefix.startsWith("'")) packagePrefix = packagePrefix.substring(1);
            packagePrefix = packagePrefix.trim();
            const ret: CompletionItem[] = [];
            for (const name of this.findPackageNamesStartingWith(packagePrefix)) {
                ret.push(new CompletionItem(name, CompletionItem.Type.JAVA_PACKAGE));
            }
            for (const name of this.findClassNamesStartingWith(packagePrefix)) {
                ret.push(new CompletionItem(name, CompletionItem.Type.JAVA_CLASS));
            }
            return ret;
        }

        if (['ja', 'jav', 'java', 'java.', 'java.t', 'java.ty'].some((entry) => entry.toUpperCase() === prefix.toUpperCase())) {
            return [new CompletionItem("Java.type('oracle.')", CompletionItem.Type.SNIPPET)];
        }
        return [];
    }

    private packageRoots(): Array<{ packageName: string; path: string }> {
        const here = resolve(process.cwd(), 'src/main/typescript/oracle/dbtools/app');
        return [
            { packageName: 'oracle.dbtools', path: resolve(here, '..') },
            { packageName: 'oracle.dbtools.app', path: here },
            { packageName: 'oracle.dbtools.parser', path: resolve(here, '../parser') },
            { packageName: 'oracle.dbtools.insight', path: resolve(here, '../insight') },
        ];
    }

    private findPackageNamesStartingWith(prefix: string): string[] {
        const names = new Set<string>();
        for (const root of this.packageRoots()) {
            if (!prefix.startsWith(root.packageName + '.') && !root.packageName.startsWith(prefix)) continue;
            this.collectPackages(root.path, root.packageName, prefix, names);
        }
        return [...names].sort().map((name) => name.substring(prefix.length) + '.');
    }

    private collectPackages(path: string, packageName: string, prefix: string, names: Set<string>): void {
        let entries;
        try {
            entries = readdirSync(path, { withFileTypes: true });
        } catch {
            return;
        }
        const hasModule = entries.some((entry) => entry.isFile() &&
            (entry.name.endsWith('.js') || (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts'))));
        if (hasModule && packageName.startsWith(prefix)) {
            names.add(packageName);
        }
        for (const entry of entries) {
            if (entry.isDirectory() && !entry.name.startsWith('.')) {
                this.collectPackages(resolve(path, entry.name), `${packageName}.${entry.name}`, prefix, names);
            }
        }
    }

    private findClassNamesStartingWith(prefix: string): string[] {
        const dot = prefix.lastIndexOf('.');
        if (dot < 0) return [];
        const packageName = prefix.substring(0, dot);
        const classPrefix = prefix.substring(dot + 1);
        const candidates = new Set<string>();
        for (const root of this.packageRoots()) {
            if (packageName !== root.packageName && !packageName.startsWith(root.packageName + '.')) continue;
            const suffix = packageName === root.packageName ? '' : packageName.substring(root.packageName.length + 1);
            const packagePath = suffix.length === 0 ? root.path : resolve(root.path, ...suffix.split('.'));
            this.collectClassNames(packagePath, packageName, classPrefix, candidates);
        }
        const ret = [...candidates].sort();
        if (20 < ret.length) return [...ret.slice(0, 20), '...'];
        return ret;
    }

    private collectClassNames(path: string, packageName: string, prefix: string, names: Set<string>): void {
        let entries;
        try {
            entries = readdirSync(path, { withFileTypes: true });
        } catch {
            return;
        }
        for (const entry of entries) {
            if (entry.isDirectory() && !entry.name.startsWith('.')) {
                this.collectClassNames(resolve(path, entry.name), `${packageName}.${entry.name}`, prefix, names);
            } else if (entry.isFile()) {
                const extension = entry.name.endsWith('.js') ? '.js' :
                    entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts') ? '.ts' : null;
                if (extension == null) continue;
                const className = entry.name.substring(0, entry.name.length - extension.length);
                if (className.includes('$') || !className.startsWith(prefix)) continue;
                names.add(className);
            }
        }
    }
}
