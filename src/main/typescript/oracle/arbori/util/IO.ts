import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Node-backed equivalents for the small set of java.io helpers used by the project. */
export class IO {
    public static readFile$java_lang_Class$java_lang_String(c: any, file: string): string {
        const normalized = file.replace(/^\//, '');
        const packagePath = String(c?.__class ?? c?.name ?? '').replaceAll('.', '/');
        const resourcePackagePath = packagePath.includes('/') ? packagePath.slice(0, packagePath.lastIndexOf('/')) : '';
        const candidates = [
            resolve(file),
            resolve(process.cwd(), file),
            resolve(process.cwd(), 'src/main/resources', packagePath, normalized),
            resolve(process.cwd(), 'src/main/resources', resourcePackagePath, normalized),
            resolve(process.cwd(), 'src/test/resources', packagePath, normalized),
            resolve(process.cwd(), 'src/test/resources', resourcePackagePath, normalized),
            resolve(process.cwd(), 'src/main/resources', normalized),
            resolve(process.cwd(), 'src/test/resources', normalized),
        ];
        const path = candidates.find(existsSync);
        if (!path) throw new Error(`File ${file} not found (searched ${candidates.join(', ')})`);
        return readFileSync(path, 'utf8');
    }

    public static readFile(c?: any, file?: any): string {
        if (typeof c === 'string' && file === undefined) return IO.readFile$java_lang_String(c);
        if (file !== undefined) return IO.readFile$java_lang_Class$java_lang_String(c, String(file));
        return IO.readFile$java_io_InputStream(c);
    }

    public static fileNameGitResource(c: any, file: string): URL {
        const resolved = IO.findResourcePath(c, file);
        return resolved == null ? null : new URL(`file://${resolved}`);
    }

    private static findResourcePath(c: any, file: string): string | null {
        const normalized = file.replace(/^\//, '');
        const packagePath = String(c?.__class ?? c?.name ?? '').replaceAll('.', '/');
        const resourcePackagePath = packagePath.includes('/') ? packagePath.slice(0, packagePath.lastIndexOf('/')) : '';
        const candidates = [
            resolve(process.cwd(), 'src/main/resources', packagePath, normalized),
            resolve(process.cwd(), 'src/main/resources', resourcePackagePath, normalized),
            resolve(process.cwd(), 'src/test/resources', packagePath, normalized),
            resolve(process.cwd(), 'src/test/resources', resourcePackagePath, normalized),
            resolve(process.cwd(), 'src/main/resources', normalized),
            resolve(process.cwd(), 'src/test/resources', normalized),
            resolve(process.cwd(), file),
        ];
        return candidates.find(existsSync) ?? null;
    }

    public static readFile$java_lang_String(file: string): string {
        if (file.startsWith('file:')) return readFileSync(fileURLToPath(new URL(file)), 'utf8');
        return readFileSync(file, 'utf8');
    }

    public static readFile$java_io_InputStream(input: any): string {
        if (typeof input === 'string') return input;
        if (Buffer.isBuffer(input)) return input.toString('utf8');
        if (input instanceof Uint8Array) return Buffer.from(input).toString('utf8');
        if (input instanceof URL) return readFileSync(fileURLToPath(input), 'utf8');
        if (input && typeof input.read === 'function') {
            const chunks: Buffer[] = [];
            let chunk: any;
            while ((chunk = input.read()) != null) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            return Buffer.concat(chunks).toString('utf8');
        }
        throw new TypeError('Unsupported input stream');
    }

    public static filesInDirectory(location: string, ext: string): any[] {
        return readdirSync(location).map(name => join(location, name))
            .filter(path => statSync(path).isFile() && extname(path) === `.${ext}`);
    }

    public static fileNamesInDirectory(location: string, ext: string): string[] {
        return IO.filesInDirectory(location, ext).map(path => resolve(path));
    }

    public static dirsInDirectory(location: string): string[] {
        return readdirSync(location).filter(name => statSync(join(location, name)).isDirectory());
    }

    public static visitor4Directory(location: string, exts: string[]): any[] {
        const result: string[] = [];
        for (const name of readdirSync(location)) {
            const path = join(location, name);
            if (statSync(path).isDirectory()) result.push(...IO.visitor4Directory(path, exts));
            else if (exts.some(ext => extname(path) === `.${ext}`)) result.push(path);
        }
        return result;
    }

    public static save(path: string, relPath: string, ext: string, content: string): any {
        const file = IO.createFileWDir(path, relPath, ext);
        writeFileSync(file.path, content, 'utf8');
        return file;
    }

    public static createFileWDir(path: string, relPath: string, ext: string): any {
        const target = resolve(path, `${relPath}${ext.startsWith('.') ? '' : '.'}${ext}`);
        mkdirSync(dirname(target), { recursive: true });
        return { path: target, getAbsolutePath: () => target, getName: () => basename(target) };
    }

    public static copy$java_lang_String$java_lang_String$java_lang_String$java_lang_String(fromPath: string, _fromEncoding: string, toPath: string, _toEncoding: string): void {
        mkdirSync(dirname(resolve(toPath)), { recursive: true });
        copyFileSync(fromPath, toPath);
    }

    public static copy(fromPath?: any, fromEncoding?: any, toPath?: any, toEncoding?: any): any {
        if (fromPath instanceof URL) return IO.copy$java_net_URL$java_lang_String(fromPath, String(fromEncoding));
        return IO.copy$java_lang_String$java_lang_String$java_lang_String$java_lang_String(String(fromPath), String(fromEncoding), String(toPath), String(toEncoding));
    }

    public static copy$java_net_URL$java_lang_String(url: URL, dstdir: string): void {
        const source = fileURLToPath(url);
        const target = join(dstdir, basename(source));
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(source, target);
    }
}
