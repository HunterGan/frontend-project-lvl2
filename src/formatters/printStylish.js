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
      const buildString = (operation, value) => `${currentIndent}${operation}${currentChild.key}: ${buildPrint(value, depth + 2)}`;
      const currentValue = currentChild.value;
      const keyType = currentChild.type;
      if (keyType === 'updated') {
        return [buildString(operationType.removed, currentValue[0]),
          buildString(operationType.added, currentValue[1])]
          .join('\n');
      }
      return buildString(operationType[keyType], currentValue);
    });
    return [
      '{',
      ...diffLines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};
