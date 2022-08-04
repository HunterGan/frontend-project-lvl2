import _ from 'lodash';

export default (diffs) => {
  const spaces = '  ';
  const buildPrint = (current, depth = 1) => {
    if (!_.isObject(current)) {
      return `${current}`;
    }
    const currentIndent = spaces.repeat(depth);
    const bracketIndent = spaces.repeat(depth - 1);
    const diffLines = Object.keys(current)
      .sort((key) => key.slice(2))
      .map((key) => `${currentIndent}${key}: ${buildPrint(current[key], depth + 2)}`);
    return [
      '{',
      ...diffLines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return buildPrint(diffs);
};
