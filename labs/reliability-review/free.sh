#!/bin/bash

ROUTE_HOST=$(oc get route longload -o jsonpath='{.spec.host}' 2>/dev/null)

curl http://${ROUTE_HOST}/unleak
