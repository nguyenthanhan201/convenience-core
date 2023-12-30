import * as fs from 'fs';
import glob from 'glob';

function generateIndex() {
  const pathToSearch = 'src/package';
  // const pathToSearch2 = 'src/package/hooks';

  // Find all directories in the components directory
  const directories = glob.sync(`${pathToSearch}/*`, { onlyDirectories: true });
  // const directories2 = glob.sync(`${pathToSearch2}/*`, { onlyDirectories: true });

  // Generate the index.ts file contents
  const indexContent = directories
    .filter((dir) => {
      return !dir.includes('utils');
    })
    .concat('src/package/utils')
    .map((dir) => {
      const export_path = dir.replace('src/', '');
      return `export * from './${export_path}';`;
    })
    .join('\n');

  // Write the index.ts file to disk
  fs.writeFileSync('src/index.ts', indexContent);
}

generateIndex();
