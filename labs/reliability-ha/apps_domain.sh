#!/bin/bash

# 1. Récupère le domaine .apps actuel (ex: apps.lab-irrr.linuxlabapp.com)
APPS_DOMAIN=$(oc get ingress.config.openshift.io cluster -o jsonpath='{.spec.domain}' 2>/dev/null)

echo "router-default.${APPS_DOMAIN}"
