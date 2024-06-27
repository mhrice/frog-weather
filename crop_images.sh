#!/bin/bash

# Create the cropped directory if it doesn't exist
mkdir -p cropped

# Find all .jpg files in the current directory and subdirectories
find . -type f -name '*.jpg' | while read file; do
  # Create the corresponding directory structure in the cropped directory
  mkdir -p "cropped/$(dirname "$file")"
  # Crop the image and save it to the new directory
  convert "$file" -gravity South -crop 1080x1080+0+0 +repage "cropped/$file"
done

