import genDiff from '../index.js';
import { getFullPath, fileRead } from '../src/utils.js';

const testStylish = fileRead(getFullPath('resultStylish.txt'));
const testPlain = fileRead(getFullPath('resultPlain.txt'));
const testJson = fileRead(getFullPath('resultJson.txt'));
const path1json = 'file1.json';
const path2json = 'file2.json';
const path3yaml = 'file1.yaml';
const path4yml = 'file2.yml';

test('Test1: 2 deep JSON files', () => {
  expect(genDiff(path1json, path2json, 'stylish')).toEqual(testStylish);
});

test('Test2: 2 deep YAML files', () => {
  expect(genDiff(path3yaml, path4yml, 'stylish')).toEqual(testStylish);
});

test('Test3: 2 deep JSON and YAML files stylish', () => {
  expect(genDiff(path1json, path4yml, 'stylish')).toEqual(testStylish);
});

test('Test4: 2 deep files plain', () => {
  expect(genDiff(path1json, path2json, 'plain')).toEqual(testPlain);
});

test('Test5: 2 deep files json', () => {
  expect(JSON.parse(genDiff(path1json, path2json, 'json'))).toEqual((JSON.parse(testJson)));
});
