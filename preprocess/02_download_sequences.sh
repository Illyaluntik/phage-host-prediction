#!/bin/bash

URL="https://www.ncbi.nlm.nih.gov/labs/virus/vssi/#/virus?VirusLineage_ss=Bacteriophage,%20all%20taxids&SeqType_s=Nucleotide"

bold=$(tput bold)
normal=$(tput sgr0)
underline=$(tput smul)

echo Please, download sequences manually from ${underline}${bold}$URL${normal} and save them to ./data/sequences.fasta.
echo Make sure to select correct order of attributes:
echo '1. Accession'
echo '2. GenBank Title'
echo '3. Host'
