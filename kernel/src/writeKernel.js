import fs from 'fs';

export function writeKernel(arr, name='kernel.txt') {
  const file = fs.createWriteStream(name);
  file.on('error', function(err) { /* error handling */ });
  arr.forEach(function(v) { file.write(v.join(' ') + '\n'); });
  file.end();
}
