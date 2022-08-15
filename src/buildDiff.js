import _ from 'lodash';

const buildDiff = (object1, object2) => {
  const keys1 = Object.keys(object1) ?? [];
  const keys2 = Object.keys(object2) ?? [];
  const commonKeys = _.sortedUniq(_.sortBy([...keys1, ...keys2]));
  const diffs = commonKeys.map((key) => {
    const result = { key };
    if (!_.has(object1, key) || !_.has(object2, key)) {
      result.type = (!_.has(object1, key)) ? 'added' : 'removed';
      const nextIterationElement = (result.type === 'added') ? object2[key] : object1[key];
      result.value = (_.isObject(nextIterationElement))
        ? buildDiff(nextIterationElement, nextIterationElement)
        : nextIterationElement;
    } else
    if (_.isObject(object1[key])) {
      if (_.isObject(object2[key])) {
        result.type = 'unchanged';
        result.value = buildDiff(object1[key], object2[key]);
      } else {
        result.type = 'updated';
        result.value = [buildDiff(object1[key], object1[key]), object2[key]];
      }
    } else if (_.isObject(object2[key])) {
      result.type = 'updated';
      result.value = [object1[key], buildDiff((object2[key]), object2[key])];
    } else {
      result.type = (object1[key] === object2[key]) ? 'unchanged' : 'updated';
      result.value = (result.type === 'unchanged') ? object1[key] : [object1[key], object2[key]];
    }
    return result;
  });
  return diffs;
};
export default buildDiff;
