
import path from 'path';
import fs from 'fs/promises';

export async function safeReadFile(fileName: string): Promise<string> {
    if (fileName.includes('..')) {
        throw new Error('Directory traversal is not allowed.');
    }
    const baseDir = path.resolve(process.cwd(), 'data');
    const filePath = path.resolve(baseDir, fileName);
    if (!filePath.startsWith(baseDir)) {
        throw new Error('Access denied: File must remain inside the data directory.');
    }
    return fs.readFile(filePath, 'utf-8');
}