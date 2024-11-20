#!/bin/bash

# Variables
NAMESPACE="dev" 

# Create the namespace if it doesn't exist
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Create the PostgreSQL Secret
kubectl create secret generic postgres-secret \
  --from-literal=postgres-user=postgresuser \
  --from-literal=postgres-password=postgrespass \
  -n $NAMESPACE

echo "PostgreSQL secret created in namespace '$NAMESPACE'."