import path from 'path';
import fs from 'fs';
import printOut from './formatters/index.js';
import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';

const getFileType = (pathToFile) => path.extname(pathToFile).toLowerCase().slice(1);

const getFullPath = (pathTofile) => path.resolve(process.cwd(), pathTofile);

export const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export default (initPath1, initPath2, formatType) => {
  const path1 = getFullPath(initPath1);
  const path2 = getFullPath(initPath2);
  const fileData1 = parseFile(readFile(path1), getFileType(initPath1));
  const fileData2 = parseFile(readFile(path2), getFileType(initPath2));
  const diffs = buildDiff(fileData1, fileData2);
  return printOut(diffs, formatType);
};
