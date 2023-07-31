/* eslint-disable no-console */
import { exec } from 'child_process';
import fs from 'fs';

// Function to execute the npm script
function runScript() {
  const version = getVersionFromPackageJson();
  const npmScriptCommand = `npm run build && npm pack && mv convenience-core-${version}.tgz convenience-core-1.0.0.tgz`;
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

function getVersionFromPackageJson() {
  try {
    const packageJsonPath = 'package.json';
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.version;
  } catch (error) {
    console.error('Error reading or parsing package.json:', error.message);
    return null;
  }
}

// Call the function to execute the script
runScript();
