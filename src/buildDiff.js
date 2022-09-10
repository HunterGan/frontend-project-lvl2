import _ from 'lodash';

const buildDiff = (data1, data2) => {
  if (!_.isObject(data1)) return data1;
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.sortBy(_.uniq([...keys1, ...keys2]));
  return commonKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { type: 'nested', key, children: buildDiff(data1[key], data2[key]) };
    }
    if (data1[key] !== data2[key]) {
      return { type: 'updated', key, value: [data1[key], data2[key]] };
    }
    return { type: 'unchanged', key, value: data1[key] };
  });
};
export default buildDiff;
