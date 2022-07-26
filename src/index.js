import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

const toString = (currentObject, key, sign = ' ') => `${sign} ${key}: ${currentObject[key]}`;

export default (initPath1, initPath2) => {
  const path1 = path.resolve(process.cwd(), initPath1);
  const path2 = path.resolve(process.cwd(), initPath2);
  const fileData1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
  const fileData2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));
  const file1Keys = Object.keys(fileData1);
  const file2Keys = Object.keys(fileData2);
  const commonKeys = _.sortedUniq(file1Keys.concat(file2Keys).sort());
  const diffs = commonKeys.reduce((acc, key) => {
    if (!Object.hasOwn(fileData2, key)) {
      acc.push(toString(fileData1, key, '-'));
      return acc;
    }
    if (!Object.hasOwn(fileData1, key)) {
      acc.push(toString(fileData2, key, '+'));
      return acc;
    }
    if (fileData1[key] === fileData2[key]) {
      acc.push(toString(fileData1, key));
      return acc;
    }
    acc.push(toString(fileData1, key, '-'));
    acc.push(toString(fileData2, key, '+'));
    return acc;
  }, [])
    .join('\n');
  return diffs;
};
