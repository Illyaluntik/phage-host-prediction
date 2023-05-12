# Phage Host Prediction Tool

## Installation guide

Required tools:
- [Node.js](https://nodejs.org/en/download/package-manager#debian-and-ubuntu-based-linux-distributions)
- [Python](https://www.python.org/downloads/)
- [TaxonKit](https://bioinf.shenwei.me/taxonkit/)
- [SeqKit](https://bioinf.shenwei.me/seqkit/)

After installation:

Create virtual env
```
python3 -m venv venv/{name}
source venv/{name}/bin/activate
```

Install python dependencies
```
pip install -r requirements.txt
```

Install node dependencies
```
cd kernel
npm install
cd ..
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

Add sequences to `./data/sequences.txt`. Each sequence should be placed on a new line. Or use the following script which will seed `./data/sequences.txt` with 20 sequences from `./data/genus_test.csv`.

```
./seed_sequences.sh --input_file ./data/genus_test.csv --count 20
```

`seed_sequences.sh` has following arguments:

- `--count` – number of random sequences to be taken from input file
- `--input_file` – csv file with columns: `sequence` and `genus` or `species`.

Then you can run prediction script

```
python3 predict.py --p --test_name="./data/sequences.txt"
```

where:

- `--p` or `--print` – print prediction result to console
- `--test_name` – path to the `.txt` file where sequences are stored
- `--target` – either genus or specis, default is genus

Prediction results will be stored in `./output.txt`.