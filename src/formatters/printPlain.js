import _ from 'lodash';

const toStringValue = (value) => {
  const complexValue = '[complex value]';
  if (_.isPlainObject(value)) return complexValue;
  return typeof value === 'string' ? `'${value}'` : value;
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
        return `Property '${currentPath}' was updated. From ${toStringValue(
          currentChild.value[0],
        )} to ${toStringValue(currentChild.value[1])}`;
      }
      if (keyType === 'added') {
        return `Property '${currentPath}' was added with value: ${toStringValue(
          currentChild.value,
        )}`;
      }
      return keyType === 'removed'
        ? `Property '${currentPath}' was removed`
        : null;
    });
    return _.flattenDeep(diffLines.filter((line) => line)).join('\n');
  };
  return buildPrint(diffs);
};
