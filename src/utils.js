import fs from 'fs';
import path from 'path';
import process from 'process';

export const fileExt = (pathToFile) => path.extname(pathToFile).toLowerCase();
export const fullPath = (pathTofile) => path.resolve(process.cwd(), pathTofile);
export const fileRead = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');
