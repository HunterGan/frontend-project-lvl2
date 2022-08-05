import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

const fileExt = (pathToFile) => path.extname(pathToFile).toLowerCase();
const fullPath = (pathTofile) => path.resolve(process.cwd(), pathTofile);
const fileRead = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');
const [minus, plus, space] = ['- ', '+ ', '  '];

const buildDiff = (object1, object2) => {
  const keys1 = Object.keys(object1) ?? [];
  const keys2 = Object.keys(object2) ?? [];
  const commonKeys = _.sortedUniq([...keys1, ...keys2].sort());
  const diffs = commonKeys.reduce((acc, key) => {
    if (!_.has(object2, key)) {
      acc[`${minus}${key}`] = (_.isObject(object1[key])) ? buildDiff(object1[key], object1[key]) : object1[key];
      return acc;
    } 
    if (!_.has(object1, key)) {
      acc[`${plus}${key}`] = (_.isObject(object2[key])) ? buildDiff(object2[key], object2[key]) : object2[key];
      return acc;
    }
    if (_.isObject(object1[key])) {
      if (_.isObject(object2[key])) {
        acc[`${space}${key}`] = buildDiff(object1[key], object2[key]);
      } else {
        acc[`${minus}${key}`] = buildDiff(object1[key], object1[key]);
        acc[`${plus}${key}`] = object2[key];
      }
      return acc;
    } else if (_.isObject(object2[key])) {
      acc[`${minus}${key}`] = object1[key];
      acc[`${plus}${key}`] = buildDiff((object2[key]), object2[key]);
      return acc;
    }
    if (object1[key] === object2[key]) {
      acc[`${space}${key}`] = object1[key];
      return acc;
    }
    acc[`${minus}${key}`] = object1[key];
    acc[`${plus}${key}`] = object2[key];
    return acc;
  }, {});
  return diffs;
};
export {
  fileExt,
  fullPath,
  fileRead,
  buildDiff,
};
