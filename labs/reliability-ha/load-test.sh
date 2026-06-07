#!/bin/sh

# 1. Récupère automatiquement le domaine de base des apps (ex: apps.lab-irrr.linuxlabapp.com)
APPS_DOMAIN=$(oc get ingress.config.openshift.io cluster -o jsonpath='{.spec.domain}' 2>/dev/null)

# Sécurité : Si la commande 'oc' échoue ou n'est pas connectée, on met une valeur par défaut
if [ -z "$APPS_DOMAIN" ]; then
    echo "⚠️ Impossible de détecter le domaine via 'oc'. Connexion au cluster manquante ?"
    echo "Utilisation du domaine par défaut..."
    APPS_DOMAIN="apps.ocp4.example.com"
fi

echo "🚀 Démarrage des requêtes de santé sur : long-load-reliability-ha.${APPS_DOMAIN}/health"

# 2. Boucle infinie avec la variable automatique
while true
do
  curl "long-load-reliability-ha.${APPS_DOMAIN}/health"
  echo "" # Ajoute un retour à la ligne pour la clarté du terminal
  sleep 2s
done
