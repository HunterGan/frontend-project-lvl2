import fs from 'fs';
import path from 'path';
import process from 'process';
import printOut from './formatters/index.js';
import fileParse from './parsers.js';
import buildDiff from './buildDiff.js';

export const fileExt = (pathToFile) => path.extname(pathToFile).toLowerCase();
export const fullPath = (pathTofile) => path.resolve(process.cwd(), pathTofile);
export const fileRead = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export default (initPath1, initPath2, formatType) => {
  const file1Ext = fileExt(initPath1);
  const file2Ext = fileExt(initPath2);
  const path1 = fullPath(initPath1);
  const path2 = fullPath(initPath2);
  const fileData1 = fileParse(fileRead(path1), file1Ext);
  const fileData2 = fileParse(fileRead(path2), file2Ext);
  const diffs = buildDiff(fileData1, fileData2);
  return printOut(diffs, formatType);
};
