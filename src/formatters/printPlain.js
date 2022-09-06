import _ from 'lodash';

const toStringValue = (value) => {
  const complexValue = '[complex value]';
  if (_.isPlainObject(value)) return complexValue;
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (diffs) => {
  const buildPrint = (current, fullPath = []) => current.map((currentChild) => {
    const keyType = currentChild.type;
    const currentPath = [...fullPath, currentChild.key].join('.');
    switch (keyType) {
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
        throw new Error('Something went wrong');
      }
    }
  }).filter((line) => line).join('\n');
  return buildPrint(diffs);
};
