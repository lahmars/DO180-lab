#!/bin/bash

HOST={{ CHANGE ME }} #put cluster node
PORT=$(oc get service longload -o jsonpath='{.spec.ports[0].nodePort}')

curl http://${HOST}:${PORT}/unleak
