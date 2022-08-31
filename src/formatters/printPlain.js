import _ from 'lodash';

const getFullString = (fullPath, operation, expression = '') => `Property '${fullPath}' was ${operation}${expression}`;

const buildString = (path, operation, firstValue, secondValue = '') => {
  const node1 = (_.isString(firstValue)) ? `'${firstValue}'` : firstValue;
  const node2 = (_.isString(secondValue)) ? `'${secondValue}'` : secondValue;
  const complexValue = '[complex value]';
  const value1 = (_.isObject(node1)) ? complexValue : node1;
  const value2 = (_.isObject(node2)) ? complexValue : node2;
  const fullPath = path.join('.');
  switch (operation) {
    case 'added': {
      return getFullString(fullPath, operation, ` with value: ${value1}`);
    }
    case 'removed': {
      return getFullString(fullPath, operation);
    }
    case 'updated': {
      return getFullString(fullPath, operation, `. From ${value1} to ${value2}`);
    }
    default: break;
  }
  return null;
};

export default (diffs) => {
  const buildPrint = (current, fullPath = []) => {
    const diffLines = current.map((currentChild) => {
      const keyType = currentChild.type;
      const currentPath = [...fullPath, currentChild.key];
      if (keyType === 'nested') {
        return buildPrint(currentChild.children, currentPath);
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
