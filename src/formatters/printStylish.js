import _ from 'lodash';

const operationType = { removed: '  - ', added: '  + ', unchanged: '    ' };

const buildIndent = (depth) => operationType.unchanged.repeat(depth);

const getValue = (initValue, depth) => {
  if (!_.isObject(initValue)) return `${initValue}`;
  const sortedKeys = _.sortBy(Object.keys(initValue));
  const result = sortedKeys.map((key) => `${buildIndent(depth + 1)}${key}: ${getValue(initValue[key], depth + 1)}`).join('\n');
  return ['{', result, `${buildIndent(depth)}}`].join('\n');
};

export default (diffs) => {
  const buildPrint = (current, depth = 0) => {
    const currentIndent = buildIndent(depth);
    const bracketIndent = buildIndent(depth);
    const diffLines = current.flatMap((currentChild) => {
      const keyType = currentChild.type;
      if (keyType === 'nested') {
        return `${currentIndent}${operationType.unchanged}${currentChild.key}: ${buildPrint(currentChild.children, depth + 1)}`;
      }
      if (keyType === 'updated') {
        return [`${currentIndent}${operationType.removed}${currentChild.key}: ${getValue(currentChild.value[0], depth + 1)}`,
          `${currentIndent}${operationType.added}${currentChild.key}: ${getValue(currentChild.value[1], depth + 1)}`];
      }
      return `${currentIndent}${operationType[keyType]}${currentChild.key}: ${getValue(currentChild.value, depth + 1)}`;
    });
    return [
      '{',
      ...diffLines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};
