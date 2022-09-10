import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(process.cwd(), __dirname, '..', '__fixtures__', filename);

const testStylish = readFile(getFixturePath('resultStylish.txt'));
const testPlain = readFile(getFixturePath('resultPlain.txt'));
const testJson = readFile(getFixturePath('resultJson.txt'));
const path1json = getFixturePath('file1.json');
const path2json = getFixturePath('file2.json');
const path3yaml = getFixturePath('file1.yaml');
const path4yml = getFixturePath('file2.yml');

test('Test1: 2 deep JSON files => Output "Stylish"', () => {
  expect(genDiff(path1json, path2json, 'stylish')).toEqual(testStylish);
});

test('Test2: 2 deep YAML files => Output "Plain"', () => {
  expect(genDiff(path3yaml, path4yml, 'plain')).toEqual(testPlain);
});

test('Test3: 2 deep JSON and YAML files => Output "JSON"', () => {
  expect(genDiff(path1json, path4yml, 'json')).toEqual(testJson);
});

test('Test4: 2 deep files without param=> Output default "Stylish"', () => {
  expect(genDiff(path1json, path2json)).toEqual(testStylish);
});
