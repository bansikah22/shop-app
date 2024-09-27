# Monitoring Setup with Grafana, Prometheus, and Discord Notifications

This document outlines the steps to set up Grafana and Prometheus for monitoring your application in a local Kubernetes cluster, along with Discord notifications for alerts.

## Prerequisites

- A Kubernetes cluster running locally (e.g., Minikube).
- Helm installed on your machine.
- kubectl installed and configured to communicate with your Kubernetes cluster.

## Step 1: Install Prometheus and Grafana

1. **Add the Prometheus Community Helm repository**:

    ```bash
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo update
    ```

2. **Install the kube-prometheus-stack**:

    ```bash
    helm install my-monitoring prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
    ```

3. **Check the status of your installation**:

    ```bash
    kubectl get pods -n monitoring
    ```

## Step 2: Access Grafana

You can access Grafana either via port-forwarding or through an Ingress.

### Option A: Port-Forwarding

```bash
kubectl port-forward svc/my-monitoring-grafana -n monitoring 3000:80