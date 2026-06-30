import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadTestData() {
  const filePath = path.join(__dirname, '..', 'data', 'test-data.json');
  return JSON.parse(readFileSync(filePath, 'utf8'));
}
