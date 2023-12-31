#!/usr/bin/env zx

// Idea là khi build ra dist folder --> copy 1 file package.json vào đó --> move executor(terminal) vào dist --> Nó sẽ publish nguyên cả folder dist.

import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { echo } from 'zx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();
const buildPath = path.join(root, './dist');

async function publishPkgNah() {
  try {
    await cpBasePkgJson();
    await Promise.all(['./CHANGELOG.md', './README.md'].map(cpBaseFiles));
    await Promise.all(['./plugin'].map(cpBaseFolder));
    // cd(buildPath);
    // echo('Publishing...');
    // await $`npm publish`;
    // echo('Published!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

publishPkgNah();

async function cpBasePkgJson() {
  const basePkgData = await fse.readFile(path.resolve(root, './package.json'), 'utf8');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scripts, devDependencies, files, exports, ...rest } = JSON.parse(basePkgData);
  // const { devDependencies, exports, ...rest } = JSON.parse(basePkgData);

  const newPkgData = {
    ...rest,
    // types: './index.d.ts',
    // typings: './index.d.ts',
    // main: './index.js',
    // module: './index.mjs',
    main: 'index.js',
    module: 'index.cjs',
    types: 'index.d.ts',
  };

  const destination = path.resolve(buildPath, './package.json');
  await fse.writeFile(destination, JSON.stringify(newPkgData, null, 2), 'utf8');
  echo(`Created package.json in ${destination}`);
}

async function cpBaseFiles(file) {
  const sourcePath = path.resolve(root, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  const sourceFile = await fse.readFile(sourcePath, 'utf8');
  // Currently, bun not support copy file --> use writeFile instead
  await fse.writeFile(targetPath, sourceFile, 'utf8');
  echo(`Copied ${humanizePathname(sourcePath)} to ${humanizePathname(targetPath)}`);
}

async function cpBaseFolder(folder) {
  const sourcePath = path.resolve(root, folder);
  const targetPath = path.resolve(buildPath, path.basename(folder));
  await fse.copy(sourcePath, targetPath);
  echo(`Copied ${humanizePathname(sourcePath)} to ${humanizePathname(targetPath)}`);
}

function humanizePathname(_path) {
  const projectDir = __dirname.replace(/\/scripts$/, '');
  return _path.replace(projectDir, '');
}
