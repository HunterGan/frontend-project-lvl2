import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../index.js';

const testStylish = fs.readFileSync('__fixtures__/resultStylish.txt', 'utf-8');
const testPlain = fs.readFileSync('__fixtures__/resultPlain.txt', 'utf-8');
const testJson = fs.readFileSync('__fixtures__/resultJson.txt', 'utf-8');
const path1json = '__fixtures__/file1.json';
const path2json = '__fixtures__/file2.json';
const path3yaml = '__fixtures__/file1.yaml';
const path4yml = '__fixtures__/file2.yml';

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
