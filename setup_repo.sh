#!/bin/bash

# Set default values for command line arguments
old_string="@nestjs-starter"

# Parse command line arguments
while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in
    -old|--old_string)
      old_string="$2"
      shift
      shift
      ;;
    -new|--new_string)
      new_string="$2"
      shift
      shift
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
done

# Check if the new string is provided
if [ -z "$new_string" ]
then
  echo "Usage: ./script -new \"new_string\""
  exit 1
fi

# Search for files containing the old string in the current directory and its subdirectories, excluding some dirs
files=$(grep -rlw --exclude-dir={node_modules,tmp,dist} --exclude={setup_repo.sh,README.md} "$old_string" .)

# Loop through the files and replace the old string with the new string
for file in $files
do
	echo "processing file $file"
  sed -i "" "s|$old_string|$new_string|g" "$file"
done

echo "Done"
