import fs from 'fs/promises';
import path from 'path';

const dataDir = path.resolve(process.cwd(), 'data');

export async function loadDocuments() {
    const files = await fs.readdir(dataDir);
    return files.filter((f: string) => f.endsWith('.md'));
}
export async function readDocument(fileName: string) {
    const filePath = path.join(dataDir, fileName);
    return await fs.readFile(filePath, 'utf-8');
}


export async function searchNotes(query: string) {
    const files = await loadDocuments();
    const results: any[] = [];

    for (const file of files) {
        const content = await readDocument(file);
        if (content.toLowerCase().includes(query.toLowerCase())) {
            results.push({
                fileName: file,
                snippet: content.substring(0, 150) + "..."
            });
        }
    }
     return results.slice(0, 10);
}

export async function getFaq(questionKey: string) {
    const faqPath = path.join(dataDir, 'faq.json');
    const rawData = await fs.readFile(faqPath, 'utf-8');
    const faqData = JSON.parse(rawData);
    return faqData[questionKey] || null;
}

export async function getMetadata(fileName: string) {
    const metaPath = path.join(dataDir, 'metadata.json');
    const rawData = await fs.readFile(metaPath, 'utf-8');
    const metaData = JSON.parse(rawData);
    return metaData[fileName] || null;
}