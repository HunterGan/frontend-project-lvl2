import _ from 'lodash';

const operationIndent = { removed: '  - ', added: '  + ', unchanged: '    ' };

const indentFiller = ' ';
const indentCount = 4;
const indent = indentFiller.repeat(indentCount);

const buildIndent = (depth) => indent.repeat(depth);

const getValue = (initValue, depth) => {
  if (!_.isObject(initValue)) return `${initValue}`;
  const keys = Object.keys(initValue);
  const result = keys.map((key) => `${buildIndent(depth + 1)}${key}: ${getValue(initValue[key], depth + 1)}`).join('\n');
  return ['{', result, `${buildIndent(depth)}}`].join('\n');
};

export default (diffs) => {
  const buildPrint = (current, depth = 0) => {
    const currentIndent = buildIndent(depth);
    const diffLines = current.flatMap((currentChild) => {
      const { key, type } = currentChild;
      switch (type) {
        case 'nested': {
          return `${currentIndent}${operationIndent.unchanged}${key}: ${buildPrint(currentChild.children, depth + 1)}`;
        }
        case 'updated': {
          return [`${currentIndent}${operationIndent.removed}${key}: ${getValue(currentChild.value[0], depth + 1)}`,
            `${currentIndent}${operationIndent.added}${key}: ${getValue(currentChild.value[1], depth + 1)}`];
        }
        case 'removed':
        case 'added':
        case 'unchanged': {
          return `${currentIndent}${operationIndent[type]}${key}: ${getValue(currentChild.value, depth + 1)}`;
        }
        default: throw new Error('Something went wrong');
      }
    });
    return [
      '{',
      ...diffLines,
      `${currentIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};
