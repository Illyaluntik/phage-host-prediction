# Phage Host Prediction Tool

## Installation guide

Required tools:
- node.js and npm
- python3 and pip
- taxonkit
- seqkit

After installation:

```
cd kernel
npm install
```

```
cd ..
```


```
pip install -r requirements.txt
```

## Setup

```
cd preprocess
```

```
./01_download_taxonomy.sh
```

```
./02_download_sequences.sh
```

```
./03_clean_sequences.sh
```

```
cd ..
```

## Prediction

Add sequences to `./data/sequences.txt`. Each sequence should be placed on a new line.

```
python3 predict.py --p --test_name="./data/sequences.txt"
```

where:

- `--p` or `--print` – print prediction result to console
- `--test_name` – path to the `.txt` file where sequences are stored
- `--target` – either genus or specis, default is genus

Prediction results will be stored in `./output.txt`.