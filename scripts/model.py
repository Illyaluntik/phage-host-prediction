import pickle
import pandas as pd
from sklearn import svm
from sklearn.model_selection import train_test_split
from .svm_kernel import kernel

def read_train_data(file_name):
  return pd.read_csv(file_name)

def read_test_data(file_name):
  with open(file_name) as f:
    sequences = f.read().splitlines()

  return sequences

def read_model(model_name):
  return pickle.load(open(model_name, 'rb'))

def save_model(model, model_name):
  pickle.dump(model, open(model_name, 'wb'))

def train_model(file_name=None, x_train=None, y_train=None):
  if (x_train is None or y_train is None):
    df = read_train_data(file_name)
    x_train, y_train = df.sequence, df.genus

  model = svm.SVC(kernel = 'precomputed')
  model.fit(kernel(x_train, x_train), y_train)

  return model

def evaluate_model(model, x_test, x_train):
  y_pred = model.predict(kernel(x_test, x_train))

  return y_pred

def predict(model, x_test, x_train):
  y_pred = evaluate_model(model, x_test, x_train)

  return y_pred