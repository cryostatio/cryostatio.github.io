#!/bin/sh

find . -type f -name '*.dot' -exec dot -Tsvg {} -o  {}.svg \;
