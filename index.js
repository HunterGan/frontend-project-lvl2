import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';
import fileParse from './src/parsers.js';

const fileExt = (pathToFile) => path.extname(pathToFile).toLowerCase();
const fullPath = (pathTofile) => path.resolve(process.cwd(), pathTofile);
const fileRead = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

const printStylish = (diffs) => {
  const spaces = '  ';
  const buildPrint = (current, depth = 1) => {
    if (!_.isObject(current)) {
      return `${current}`;
    }
    const currentIndent = spaces.repeat(depth);
    const bracketIndent = spaces.repeat(depth - 1);
    const diffLines = Object.keys(current)
      .sort((key1, key2) => key1[2] < key2[2])
      .map((key) => `${currentIndent}${key}: ${buildPrint(current[key], depth + 2)}`);
    return [
      '{',
      ...diffLines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};

const printOut = (diffs, printStyle = 'stylish') => {
  switch (printStyle) {
    case ('stylish'): {
      return printStylish(diffs);
    }
    default: {
      return 'aaaaa';
    }
  }
};

const buildDiff = (object1, object2) => {
  const keys1 = Object.keys(object1) ?? [];
  const keys2 = Object.keys(object2) ?? [];
  const commonKeys = _.sortedUniq([...keys1, ...keys2].sort());
  const diffs = commonKeys.reduce((acc, key) => {
    if (!_.has(object2, key)) {
      acc[`- ${key}`] = (_.isObject(object1[key])) ? buildDiff(object1[key], object1[key]) : object1[key];
      return acc;
    }
    if (!_.has(object1, key)) {
      acc[`+ ${key}`] = (_.isObject(object2[key])) ? buildDiff(object2[key], object2[key]) : object2[key];
      return acc;
    }
    if (_.isObject(object1[key])) {
      if (_.isObject(object2[key])) {
        acc[`  ${key}`] = buildDiff(object1[key], object2[key]);
        return acc;
      }
      acc[`- ${key}`] = buildDiff(object1[key], object1[key]);
      acc[`+ ${key}`] = object2[key];
      return acc;
    }
    if (_.isObject(object2[key])) {
      acc[`  ${key}`] = `- ${object1[key]}\n${buildDiff({}, object2[key])}`;
      return acc;
    }
    if (object1[key] === object2[key]) {
      acc[`  ${key}`] = object1[key];
      return acc;
    }
    acc[`- ${key}`] = object1[key];
    acc[`+ ${key}`] = object2[key];
    return acc;
  }, {});
  return diffs;
};

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
