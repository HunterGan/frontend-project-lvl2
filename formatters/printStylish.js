import _ from 'lodash';

export default (diffs) => {
  const operationType = { removed: '- ', added: '+ ', unchanged: '  ' };
  const buildPrint = (current, depth = 1) => {
    if (!_.isObject(current)) {
      return `${current}`;
    }
    const currentIndent = operationType.unchanged.repeat(depth);
    const bracketIndent = operationType.unchanged.repeat(depth - 1);
    const diffLines = current.map((currentChild) => {
      const keyType = currentChild.type;
      if (keyType === 'updated') {
        return [`${currentIndent}${operationType.removed}${currentChild.key}: ${buildPrint(currentChild.value[0], depth + 2)}`,
          `${currentIndent}${operationType.added}${currentChild.key}: ${buildPrint(currentChild.value[1], depth + 2)}`]
          .join('\n');
      }
      return `${currentIndent}${operationType[keyType]}${currentChild.key}: ${buildPrint(currentChild.value, depth + 2)}`;
    });
    return [
      '{',
      ...diffLines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};
