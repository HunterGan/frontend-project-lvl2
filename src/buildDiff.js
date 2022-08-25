import _ from 'lodash';

const buildDiff = (object1, object2 = object1) => {
  if (!_.isObject(object1)) return object1;
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const commonKeys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return commonKeys.map((key) => {
    if (!_.has(object1, key)) {
      return { type: 'added', key, value: buildDiff(object2[key]) };
    }
    if (!_.has(object2, key)) {
      return { type: 'removed', key, value: buildDiff(object1[key]) };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { type: 'unchanged', key, value: buildDiff(object1[key], object2[key]) };
    }
    if (object1[key] !== object2[key]) {
      return { type: 'updated', key, value: [buildDiff(object1[key]), buildDiff(object2[key])] };
    }
    return { type: 'unchanged', key, value: object1[key] };
  });
};
export default buildDiff;
