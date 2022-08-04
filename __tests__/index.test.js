import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../index.js';

const testResult = fs.readFileSync('__fixtures__/resultJSON.txt', 'utf-8');
test('Test1: 2 deep JSON files', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(genDiff(path1, path2, 'stylish')).toEqual(testResult);
});

test('Test2: 2 deep YAML files', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.yml';
  expect(genDiff(path1, path2, 'stylish')).toEqual(testResult);
});

test('Test3: 2 deep JSON and YAML files', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.json';
  expect(genDiff(path1, path2, 'stylish')).toEqual(testResult);
});
