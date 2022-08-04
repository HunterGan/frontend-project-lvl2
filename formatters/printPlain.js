import _ from 'lodash';

const keyType = (key) => key.slice(0, 1);

const buildString = (path, operation, obj1, obj2 = '') => {
  let value1 = (_.isString(obj1)) ? `'${obj1}'` : obj1;
  let value2 = (_.isString(obj2)) ? `'${obj2}'` : obj2;
  const complex = '[complex value]';
  value1 = (_.isObject(value1)) ? complex : value1;
  value2 = (_.isObject(value2)) ? complex : value2;

  const fullPath = path.join('.');
  let result = '';
  switch (operation) {
    case 'added': {
      result = ` with value: ${value1}`;
      break;
    }
    case 'removed': {
      break;
    }
    case 'updated': {
      result = `. From ${value1} to ${value2}`;
      break;
    }
    default: break;
  }
  return `Property '${fullPath}' was ${operation}${result}`;
};

export default (diffs) => {
  const buildPrint = (current, fullKey = []) => {
    const diffLines = Object.entries(current)
      .sort(([key]) => key.slice(2))
      .map(([longkey, value], keyIndex, arr) => {
        const key = longkey.slice(2);
        const currentKey = [...fullKey, key];
        const result = [];
        switch (keyType(longkey)) {
          case ' ': {
            if (_.isObject(value)) {
              return buildPrint(value, currentKey);
            }
            break;
          }
          case '-': {
            if (arr[keyIndex + 1]) {
              const [nextKey, nextValue] = arr[keyIndex + 1];
              if (key === nextKey.slice(2)) {
                result.push(buildString(currentKey, 'updated', value, nextValue));
              } else {
                result.push(buildString(currentKey, 'removed', value));
              }
            } else {
              result.push(buildString(currentKey, 'removed', value));
            }
            break;
          }
          case '+': {
            if (keyIndex >= 1) {
              const [prevKey] = arr[keyIndex - 1];
              if (key === prevKey.slice(2)) {
                return null;
              }
            }
            result.push(buildString(currentKey, 'added', value));
            break;
          }
          default: {
            break;
          }
        }
        return [...result];
      }, []);
    return _.flattenDeep(diffLines).filter((elem) => elem !== null).join('\n');
  };
  return buildPrint(diffs);
};
