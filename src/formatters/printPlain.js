import _ from 'lodash';

const toStringValue = (value) => {
  const complexValue = '[complex value]';
  if (_.isPlainObject(value)) return complexValue;
  return (typeof (value) === 'string') ? `'${value}'` : value;
};

const getFullString = (path, operation, expression = '') => {
  const result = `Property '${path}' was ${operation}${expression}`;
  return result;
};

export default (diffs) => {
  const buildPrint = (current, fullPath = []) => {
    const diffLines = current.map((currentChild) => {
      const keyType = currentChild.type;
      const currentPath = [...fullPath, currentChild.key].join('.');
      if (keyType === 'nested') {
        return buildPrint(currentChild.children, [currentPath]);
      }
      if (keyType === 'updated') {
        return getFullString(currentPath, keyType, `. From ${toStringValue(currentChild.value[0])} to ${toStringValue(currentChild.value[1])}`);
      }
      if (keyType === 'added') {
        return getFullString(currentPath, keyType, ` with value: ${toStringValue(currentChild.value)}`);
      }
      return (keyType === 'removed') ? getFullString(currentPath, keyType) : null;
    });
    return _.flattenDeep(diffLines.filter((line) => line)).join('\n');
  };
  return buildPrint(diffs);
};
