#!/bin/bash

cd builds
old=$(ls --sort t -1 | tail -1) &&  echo ${old}
tar -czf ${old}.tgz ${old} && rm -rf ${old}
