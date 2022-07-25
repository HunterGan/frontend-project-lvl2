#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import genDiff from '../src/index.js';
import path from 'path';
import process from 'process';
//import { readFileSync } from 'node:fs';
const program = new Command();


program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
        const fileData1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));
        const fileData2 = JSON.parse(fs.readFileSync(filepath2));
        console.log(genDiff(fileData1, fileData2));
    });
program.parse();