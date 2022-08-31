import _ from 'lodash';

const operationType = { removed: '- ', added: '+ ', unchanged: '  ' };

const buildIndent = (depth) => operationType.unchanged.repeat(depth);

const getValue = (initValue, depth) => {
  if (!_.isObject(initValue)) return `${initValue}`;
  const sortedKeys = _.sortBy(Object.keys(initValue));
  const result = sortedKeys.map((key) => `${buildIndent(depth + 1)}${key}: ${getValue(initValue[key], depth + 2)}`).join('\n');
  return [
    '{',
    result,
    `${buildIndent(depth - 1)}}`,
  ].join('\n');
};

export default (diffs) => {
  const buildPrint = (current, depth = 1) => {
    const currentIndent = buildIndent(depth);
    const bracketIndent = buildIndent(depth - 1);
    const diffLines = current.map((currentChild) => {
      const keyType = currentChild.type;
      if (keyType === 'nested') {
        return `${currentIndent}${operationType.unchanged}${currentChild.key}: ${buildPrint(currentChild.children, depth + 2)}`;
      }
      if (keyType === 'updated') {
        return [`${currentIndent}${operationType.removed}${currentChild.key}: ${getValue(currentChild.value[0], depth + 2)}`,
          `${currentIndent}${operationType.added}${currentChild.key}: ${getValue(currentChild.value[1], depth + 2)}`]
          .join('\n');
      }
      return `${currentIndent}${operationType[keyType]}${currentChild.key}: ${getValue(currentChild.value, depth + 2)}`;
    });
    return [
      '{',
      ...diffLines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};
