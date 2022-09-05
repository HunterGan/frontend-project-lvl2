import _ from 'lodash';

const operationType = { removed: '  - ', added: '  + ', unchanged: '    ' };

const indent = '    ';

const buildIndent = (depth) => indent.repeat(depth);

const getValue = (initValue, depth) => {
  if (!_.isObject(initValue)) return `${initValue}`;
  const sortedKeys = _.sortBy(Object.keys(initValue));
  const result = sortedKeys.map((key) => `${buildIndent(depth + 1)}${key}: ${getValue(initValue[key], depth + 1)}`).join('\n');
  return ['{', result, `${buildIndent(depth)}}`].join('\n');
};

export default (diffs) => {
  const buildPrint = (current, depth = 0) => {
    const currentIndent = buildIndent(depth);
    const diffLines = current.flatMap((currentChild) => {
      const { key, type } = currentChild;
      if (type === 'nested') {
        return `${currentIndent}${operationType.unchanged}${key}: ${buildPrint(currentChild.children, depth + 1)}`;
      }
      if (type === 'updated') {
        return [`${currentIndent}${operationType.removed}${key}: ${getValue(currentChild.value[0], depth + 1)}`,
          `${currentIndent}${operationType.added}${key}: ${getValue(currentChild.value[1], depth + 1)}`];
      }
      return `${currentIndent}${operationType[type]}${key}: ${getValue(currentChild.value, depth + 1)}`;
    });
    return [
      '{',
      ...diffLines,
      `${currentIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};
