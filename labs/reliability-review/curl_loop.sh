#!/bin/bash
#
ROUTE_HOST=$(oc get route longload -o jsonpath='{.spec.host}' 2>/dev/null)
I=1

while :
do
    echo -n "$I "
    let I=I+1
    curl http://${ROUTE_HOST}/health
    sleep 0.5
done
