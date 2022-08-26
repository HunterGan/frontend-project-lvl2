import printOut from './formatters/index.js';
import fileParse from './parsers.js';
import buildDiff from './buildDiff.js';
import { getFullPath, fileRead, getFileType } from './utils.js';

export default (initPath1, initPath2, formatType) => {
  const path1 = getFullPath(initPath1);
  const path2 = getFullPath(initPath2);
  const fileData1 = fileParse(fileRead(path1), getFileType(initPath1));
  const fileData2 = fileParse(fileRead(path2), getFileType(initPath2));
  const diffs = buildDiff(fileData1, fileData2);
  return printOut(diffs, formatType);
};
