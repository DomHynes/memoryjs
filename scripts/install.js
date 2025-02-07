/**
 * [npm install script]
 * Purpose is to automatically detect Node process architecture and run the
 * corresponding script to build the library to target the appropriate architecture.
 * Defaults to `node-gyp rebuild` if unable to detect the architecture.
 */

/* eslint-disable no-console */
const { execSync } = require('child_process');

function run(script) {
  console.log(`Node architecture is ${process.arch}: running "${script}"`);

  execSync(script)
}

const buildScripts = {
  x64: 'run build64',
  ia32: 'run build32',
};

if (Object.prototype.hasOwnProperty.call(buildScripts, process.arch)) {
  // on Windows, npm is actually `npm.cmd`
  const npm = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
  run(`${npm} ${buildScripts[process.arch]}`);
} else {
  console.log('Unfamiliar architecture detected, this library is probably not compatible with your OS.');
  run('node-gyp rebuild');
}
