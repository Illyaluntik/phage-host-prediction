#!/bin/bash

export TAXONKIT_DB=$(realpath ./taxonkit_db)

# Correct order of attributes is required:
# 1. Accession
# 2. GenBank Title
# 3. Host

seqkit fx2tab ../data/sequences.fasta \
  | grep -v "UNVERIFIED"  \
  | sed -e "s/ |/\t/g"  \
  | sed -e "s/|/\t/g" \
  | grep -v "\t\t"  \
  | taxonkit name2taxid -i 3  \
  | taxonkit lineage -R -i 6  \
  | awk -F "\t" '{ print $8 "," $7, "," $4}'  \
  | grep "Bacteria" -A 2 -B 1 \
  | grep "genus"  \
  > ../data/clean.txt

cat ../data/clean.txt \
  | awk -F "," '
    {n=split($1,fields,";")}
    {for(i=1;i<=n;i++) if(fields[i]=="genus") genus=i}
    {for(i=1;i<=n;i++) if(fields[i]=="species") species=i}
    {split($2,values,";")}
    {print values[genus] "," values[species] "," $3}
  ' \
  | sed -e "s/ ,/,/g" \
  > ../data/clean.csv

rm ../data/clean.txt
echo 'genus,species,sequence' | cat - ../data/clean.csv > temp && mv temp ../data/clean.csv
