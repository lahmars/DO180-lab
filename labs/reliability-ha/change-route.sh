#!/bin/bash

# 1. Récupère automatiquement le domaine .apps actuel (ex: apps.lab-irrr.linuxlabapp.com)
APPS_DOMAIN=$(oc get ingress.config.openshift.io cluster -o jsonpath='{.spec.domain}' 2>/dev/null)

# Sécurité : Si tu n'es pas connecté au cluster, on extrait la valeur depuis l'API connue
if [ -z "$APPS_DOMAIN" ]; then
    API_URL="api.lab-irrr.linuxlabapp.com"
    APPS_DOMAIN=$(echo "$API_URL" | sed 's/^api\./apps./')
fi

# 2. Remplacement à la volée dans ton fichier deploy.toml
sed -i "s/router-default\.apps\.ocp4\.example\.com/router-default.${APPS_DOMAIN}/g" long-load-deploy.yaml

echo "Le fichier deploy.tml a été mis à jour avec : router-default.${APPS_DOMAIN}"
