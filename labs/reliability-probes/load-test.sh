#!/bin/sh
while true
do
  curl long-load-reliability-probes.apps.{{ CHANGE ME }}/health
  sleep 2s
done
