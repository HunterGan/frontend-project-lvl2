import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFullPath = (filename) => path.resolve(process.cwd(), __dirname, '..', '__fixtures__', filename);

export const fileRead = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export const getFileType = (pathToFile) => {
  const fileExt = path.extname(pathToFile).toLowerCase().slice(1);
  if (fileExt === 'yaml' || fileExt === 'yml') return 'yaml';
  return 'json';
};
