import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const test1Result = '- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true';
test('Test1: 2 JSON files', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(genDiff(path1, path2)).toEqual(test1Result);
});

test('Test2: 2 YAML files', () => {
  const path1 = '__fixtures__/file1.yaml';
  const path2 = '__fixtures__/file2.yml';
  expect(genDiff(path1, path2)).toEqual(test1Result);
});
