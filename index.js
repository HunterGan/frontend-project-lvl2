import fileParse from './src/parsers.js';
import printOut from './formatters/index.js';
import {
  fileExt, fullPath, fileRead, buildDiff,
} from './src/utils.js';

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
