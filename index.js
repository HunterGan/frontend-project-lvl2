import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import fileParse from './src/parsers.js';

const toString = (currentObject, key, sign = ' ') => `${sign} ${key}: ${currentObject[key]}`;
const fileExt = (pathToFile) => path.extname(pathToFile).toLowerCase();
const fullPath = (pathTofile) => path.resolve(process.cwd(), pathTofile);
const fileRead = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export default (initPath1, initPath2) => {
  const [missing, extra] = ['-', '+'];
  const file1Ext = fileExt(initPath1);
  const file2Ext = fileExt(initPath2);
  const path1 = fullPath(initPath1);
  const path2 = fullPath(initPath2);
  const fileData1 = fileParse(fileRead(path1), file1Ext);
  const fileData2 = fileParse(fileRead(path2), file2Ext);
  const file1Keys = Object.keys(fileData1);
  const file2Keys = Object.keys(fileData2);
  const commonKeys = _.sortedUniq(file1Keys.concat(file2Keys).sort());
  const diffs = commonKeys.reduce((acc, key) => {
    if (!_.has(fileData2, key)) {
      acc.push(toString(fileData1, key, missing));
      return acc;
    }
    if (!_.has(fileData1, key)) {
      acc.push(toString(fileData2, key, extra));
      return acc;
    }
    if (fileData1[key] === fileData2[key]) {
      acc.push(toString(fileData1, key));
      return acc;
    }
    acc.push(toString(fileData1, key, missing));
    acc.push(toString(fileData2, key, extra));
    return acc;
  }, [])
    .join('\n');
  return diffs;
};
