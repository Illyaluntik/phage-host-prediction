import argparse
from scripts.svm_kernel import kernel
from scripts.model import read_test_data, read_train_data, read_model, predict

parser = argparse.ArgumentParser()
parser.add_argument('--test_name', type=str, required=True)
# parser.add_argument('--train_name', type=str, required=True)
parser.add_argument('--target', type=str, required=False)
parser.add_argument('-p', '--print', action='store_true')
args = parser.parse_args()

TARGET_VALUES = ['genus', 'species']

def read_data(test_name, train_name):
  sequences = read_test_data(test_name)
  test_data = list(filter(lambda s: len(s) > 0, sequences))

  train_data = read_train_data(train_name)
  train_data = train_data.sequence

  return test_data, train_data

def write_output_data(file_name, data):
  with open(file_name, 'w') as f:
    f.write('\n'.join(data))

def print_output_data(data):
  for d in data:
    print(d)

def main(test_name, train_name, target, print_output):
  if target not in TARGET_VALUES:
    print(f"Incorrect target specified. Possible values: {', '.join(TARGET_VALUES)}")
    return

  test_data, train_data = read_data(test_name, train_name)

  model = read_model(f'models/model_{target}.pickle')

  output_data = predict(model, test_data, train_data)

  if print_output:
    print_output_data(output_data)

  write_output_data('output.txt', output_data)

if __name__ == '__main__':
  target = 'genus' if args.target is None else args.target

  if target == 'genus':
    train_name = './data/genus_train.csv'
  if target == 'species':
    train_name = './data/species_train.csv'

  main(args.test_name, train_name, target, args.print)
