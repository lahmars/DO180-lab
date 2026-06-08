#!/bin/bash

HOST=$(oc get route version -o jsonpath='{.spec.host}')

while :
do
	curl -m.5 -s -f http://${HOST}
	sleep 0.5
done
