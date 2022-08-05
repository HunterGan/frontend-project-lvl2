import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../index.js';

const testStylish = fs.readFileSync('__fixtures__/resultStylish.txt', 'utf-8');
const testPlain = fs.readFileSync('__fixtures__/resultPlain.txt', 'utf-8');
const testJson = fs.readFileSync('__fixtures__/resultJson.txt', 'utf-8');

test('Test1: 2 deep JSON files', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(genDiff(path1, path2, 'stylish')).toEqual(testStylish);
});

test('Test2: 2 deep YAML files', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.yml';
  expect(genDiff(path1, path2, 'stylish')).toEqual(testStylish);
});

test('Test3: 2 deep JSON and YAML files stylish', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.json';
  expect(genDiff(path1, path2, 'stylish')).toEqual(testStylish);
});

test('Test4: 2 deep files plain', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(genDiff(path1, path2, 'plain')).toEqual(testPlain);
});

test('Test5: 2 deep files json', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(JSON.parse(genDiff(path1, path2, 'json'))).toEqual((JSON.parse(testJson)));
});
