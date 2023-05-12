import subprocess
from nodejs import node, npm, npx

def writeSet(sequences, file_name):
  with open(file_name, 'w') as f:
    for s in sequences:
      f.write('%s\n' % s)

def readKernel(file_name):
  with open(file_name, 'r') as f:
    return [[int(num) for num in line.split(' ')] for line in f]

def kernel(X, Y):
  # fit uses for X and Y same training set
  # predict uses for X testing set and for Y training set
  x_name = 'X.txt'
  y_name = 'Y.txt'
  writeSet(X, x_name)
  writeSet(Y, y_name)

  # p = subprocess.Popen(['/usr/local/bin/node', './kernel/main.js', x_name, y_name], stdout=subprocess.PIPE, universal_newlines=True)

  node.call(['./kernel/main.js', x_name, y_name])

  # while True:
  #   line = p.stdout.readline()
  #   if not line:
  #     break
  #   print(line.rstrip())

  return readKernel('kernel.txt')
