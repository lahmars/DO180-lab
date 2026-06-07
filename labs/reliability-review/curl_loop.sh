#!/bin/bash
#
HOST={{ CHANGE ME }} #put cluster node
PORT=$(oc get service longload -o jsonpath='{.spec.ports[0].nodePort}')
I=1

while :
do
    echo -n "$I "
    let I=I+1
    curl http://${HOST}:${PORT}/health
    sleep 0.5
done
