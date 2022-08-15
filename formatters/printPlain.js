import _ from 'lodash';
import buildString from './src/buildPlainString.js';

export default (diffs) => {
  const buildPrint = (current, fullPath = []) => {
    const diffLines = current.map((currentChild) => {
      const keyType = currentChild.type;
      const currentPath = [...fullPath, currentChild.key];
      if (keyType === 'unchanged' && _.isObject(currentChild.value)) {
        return buildPrint(currentChild.value, currentPath);
      }
      if (keyType === 'updated') {
        return buildString(currentPath, keyType, currentChild.value[0], currentChild.value[1]);
      }
      return buildString(currentPath, keyType, currentChild.value);
    });
    return _.flattenDeep(diffLines.filter((line) => line)).join('\n');
  };
  return buildPrint(diffs);
};
