import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const keys1 = Object.keys(object1) ?? [];
  const keys2 = Object.keys(object2) ?? [];
  const commonKeys = _.sortedUniq(_.sortBy([...keys1, ...keys2]));
  const diffs = commonKeys.map((key) => {
    if (!_.has(object1, key) || !_.has(object2, key)) {
      const operationType = (!_.has(object1, key)) ? 'added' : 'removed';
      const nextValue = (operationType === 'added') ? object2[key] : object1[key];
      return {
        type: operationType,
        key,
        value: (_.isObject(nextValue)) ? buildDiff(nextValue, nextValue) : nextValue,
      };
    } if (_.isObject(object1[key])) {
      return (_.isObject(object2[key])) ? { type: 'unchanged', key, value: buildDiff(object1[key], object2[key]) }
        : { type: 'updated', key, value: [buildDiff(object1[key], object1[key]), object2[key]] };
    } if (_.isObject(object2[key])) {
      return { type: 'updated', key, value: [object1[key], buildDiff((object2[key]), object2[key])] };
    }
    return {
      type: (object1[key] === object2[key]) ? 'unchanged' : 'updated',
      key,
      value: (object1[key] === object2[key]) ? object1[key] : [object1[key], object2[key]],
    };
  });
  return diffs;
};
export default buildDiff;
