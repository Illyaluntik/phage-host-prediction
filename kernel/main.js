import fs from 'fs';
import { getKernel } from './src/kernel.js';
import { writeKernel } from './src/writeKernel.js';

function readFileSync(fileName) {
  const file = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
  return file.split('\n').filter((s) => s.length > 0);
}

const xName = process.argv[2];
const yName = process.argv[3];

const X = readFileSync(xName)
const Y = readFileSync(yName)

// console.log(`Computing kernel ${X.length}x${Y.length}`);
// console.log(`m = ${X.length}`);
// console.log(`n = ${X.reduce((a, b) => a + b.length, 0)}`);

// const kernelStart = Date.now();
const kernel = getKernel(X, Y);
// const kernelEnd = Date.now();
// console.log('kernel:', (kernelEnd - kernelStart) / 1000);
writeKernel(kernel);
