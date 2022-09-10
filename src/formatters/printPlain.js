import _ from 'lodash';

const toStringValue = (value) => {
  const complexValue = '[complex value]';
  if (_.isPlainObject(value)) return complexValue;
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (diffs) => {
  const buildPrint = (current, fullPath = []) => current.map((currentChild) => {
    const { key, type } = currentChild;
    const currentPath = [...fullPath, key].join('.');
    switch (type) {
      case 'nested':
        return buildPrint(currentChild.children, [currentPath]);
      case 'updated':
        return `Property '${currentPath}' was updated. From ${toStringValue(currentChild.value[0])} to ${toStringValue(currentChild.value[1])}`;
      case 'added':
        return `Property '${currentPath}' was added with value: ${toStringValue(currentChild.value)}`;
      case 'removed':
        return `Property '${currentPath}' was removed`;
      case 'unchanged':
        return null;
      default: {
        throw new Error(`Unknown type of key ${type}`);
      }
    }
  }).filter((line) => line).join('\n');
  return buildPrint(diffs);
};
