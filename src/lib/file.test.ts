import test from 'node:test';
import assert from 'node:assert';
import { safeReadFile } from './file.js';

test('safeReadFile blocks directory traversal attacks', async () => {
    await assert.rejects(async () => {
        await safeReadFile('../../etc/passwd');
    }, /Directory traversal is not allowed/);
});