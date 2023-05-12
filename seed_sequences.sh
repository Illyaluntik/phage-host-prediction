# #!/bin/bash

# Seeds ./data/sequences.txt with x random sequences from ./data/genus_test.csv or ./data/species_test.csv

# Define the input and output files and number of random samples
input_file="./data/genus_test.csv"
output_file="./data/sequences.txt"
count=10

while [ $# -gt 0 ]; do
  if [[ $1 == "--"* ]]; then
    v="${1/--/}"
    declare "$v"="$2"
    shift
  fi
  shift
done

# Clear the output file
truncate -s 0 "$output_file"

# Count the number of data rows in the input file
num_rows=$(tail -n +2 "$input_file" | wc -l)

# Generate x random row indices
indices=($(awk -v n="$num_rows" -v count="$count" 'BEGIN{srand(); for(i=1;i<=count;i++) print int(1 + rand() * n)}'))

# Extract column 1 from the selected rows and write to the output file
for index in "${indices[@]}"; do
  row=$(tail -n +2 "$input_file" | sed -n "${index}p")
  value=$(echo "$row" | cut -d ',' -f 1)
  echo "$row" | cut -d ',' -f 2
  echo "$value" >> "$output_file"
done
