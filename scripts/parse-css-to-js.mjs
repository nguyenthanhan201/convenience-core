import fs from 'fs';
import readDir from 'fs-readdir-recursive';
import outputFileSync from 'output-file-sync';
import path from 'path';
import postcss from 'postcss';
import postcssJs from 'postcss-js';

const tailwindCSS = fs.readFileSync('tailwind.config.cjs', 'utf8');

async function parseTailwindThemeToJS() {
  const themeContent = await postcss().process(tailwindCSS, { from: undefined });

  const cleanedTheme = parseTheme(themeContent.css);

  let output = 'module.exports = ' + JSON.stringify(cleanedTheme, null, 0) + ';';

  await outputFileSync('plugin/theme.cjs', output);
}

const PARSE_CSS = [
  { source: path.join('styles', 'base.css'), outDir: 'plugin' },
  { source: path.join('styles', 'utilities.css'), outDir: 'plugin' },
  { source: path.join('styles', 'components'), outDir: path.join('plugin', 'components') },
];

parseTailwindThemeToJS().then(() => {
  doParse(PARSE_CSS);
});

function isDirectory(_path) {
  const stat = fs.statSync(_path);
  return stat.isDirectory();
}

function isCssFile(filename) {
  return filename.split('.').pop() === 'css';
}

function getFileNameWithoutExt(filename) {
  return filename.replace(/\.(\w*?)$/, '');
}

function processParse(file, { outDir }) {
  const cssContent = fs.readFileSync(file, 'utf-8');

  const source = file.split(path.sep);
  const name = getFileNameWithoutExt(source.pop());
  const root = postcss.parse(cssContent);
  const parsed = postcssJs.objectify(root);
  const outExt = 'cjs';
  const outName = `${name}.${outExt}`;

  let output = 'module.exports = ' + JSON.stringify(parsed, null, 0) + ';';

  const finalFile = path.join(outDir, outName);
  outputFileSync(finalFile, output);
}

function parseTheme(content) {
  return JSON.parse(
    content
      // Function to remove JavaScript comments from the string
      .replace(/(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, '')
      // Extract the object part of the string by removing "module.exports = "
      .replace(/module.exports\s*=\s*/, '')
      // Replace the '-10' keys with strings (e.g., 'minus-10') to make it valid JSON
      .replace(/(['"])?([a-z0-9A-Z_-]+)(['"])?:/g, '"$2":')
      // Remove newlines and spaces
      .replace(/\n\s*/g, '')
      // Remove trailing commas
      .replace(/,\s*}/g, '}')
      // Remove single quotes
      .replace(/'/g, '"')
      // Remove semicolons
      .replace(/;/g, '')
      .replace('const plugin = require("./plugin/index.cjs")', '')
      .replace(',"plugins": [plugin]', ''),
  ).theme;
}

function doParse(sources) {
  sources.forEach(({ source: fileOrFolder, outDir }) => {
    if (isDirectory(fileOrFolder)) {
      readDir(fileOrFolder).forEach((fileInDir) => {
        const finalPath = path.join(fileOrFolder, fileInDir);
        if (isCssFile(finalPath)) {
          processParse(finalPath, { outDir });
        }
      });
    } else {
      if (isCssFile(fileOrFolder)) {
        processParse(fileOrFolder, { outDir });
      }
    }
  });
}
