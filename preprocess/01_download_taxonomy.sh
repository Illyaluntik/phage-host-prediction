#!/bin/bash

URL=https://ftp.ncbi.nih.gov/pub/taxonomy/taxdump.tar.gz

wget -c $URL
rm -rf taxonkit_db
mkdir taxonkit_db
tar -zxvf taxdump.tar.gz -C taxonkit_db/ names.dmp nodes.dmp delnodes.dmp merged.dmp
export TAXONKIT_DB=taxonkit_db/
