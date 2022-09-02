import path from 'path';
import fs from 'fs';
import printOut from './formatters/index.js';
import parseData from './parsers.js';
import buildDiff from './buildDiff.js';

const getFileType = (pathToFile) => path.extname(pathToFile).toLowerCase().slice(1);

const getFullPath = (pathTofile) => path.resolve(process.cwd(), pathTofile);

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export default (initPath1, initPath2, formatType) => {
  const path1 = getFullPath(initPath1);
  const path2 = getFullPath(initPath2);
  const inputData1 = parseData(readFile(path1), getFileType(initPath1));
  const inputData2 = parseData(readFile(path2), getFileType(initPath2));
  const diffs = buildDiff(inputData1, inputData2);
  return printOut(diffs, formatType);
};
