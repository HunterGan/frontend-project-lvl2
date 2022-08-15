import _ from 'lodash';

const fullString = (fullPath, operation, expression = '') => `Property '${fullPath}' was ${operation}${expression}`;

export default (path, operation, firstValue, secondValue = '') => {
  const node1 = (_.isString(firstValue)) ? `'${firstValue}'` : firstValue;
  const node2 = (_.isString(secondValue)) ? `'${secondValue}'` : secondValue;
  const complexValue = '[complex value]';
  const value1 = (_.isObject(node1)) ? complexValue : node1;
  const value2 = (_.isObject(node2)) ? complexValue : node2;
  const fullPath = path.join('.');
  switch (operation) {
    case 'added': {
      return fullString(fullPath, operation, ` with value: ${value1}`);
    }
    case 'removed': {
      return fullString(fullPath, operation);
    }
    case 'updated': {
      return fullString(fullPath, operation, `. From ${value1} to ${value2}`);
    }
    default: break;
  }
  return null;
};
