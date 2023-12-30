/* eslint-disable no-console */
import { exec } from 'child_process';
import fs from 'fs';

// Function to execute the npm script
function runScript() {
  const { version, name } = getInfoPackageJson();
  const npmScriptCommand = `npm run build && npm pack && mv ${name}-${version}.tgz convenience-core-1.5.0.tgz`;
  const child = exec(npmScriptCommand);

  child.stdout.on('data', (data) => {
    console.log(`Received chunk ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`Received stderr chunk ${data}`);
  });

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
}

function getInfoPackageJson() {
  try {
    const packageJsonPath = 'package.json';
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    return {
      version: packageJson.version,
      name: packageJson.name,
    };
  } catch (error) {
    console.error('Error reading or parsing package.json:', error.message);
    process.exit(1);
  }
}

// Call the function to execute the script
runScript();
