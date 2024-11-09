### ArgoCD Development with Ingress

**Prerequisites**
Before we start, make sure you have the following tools installed:

1. [Helm](https://helm.sh/docs/intro/install/)
2. [Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download) or you can use Kind, or Civo any one of your choice
3. [Kubectl](https://pwittrock.github.io/docs/tasks/tools/install-kubectl/)

#### Install ArgoCD on Minikube 
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
### Install Ingress controller if not installed already
If you haven't already installed an Ingress controller in your Minikube cluster, you'll need one. You can install Nginx Ingress or Traefik. Here’s how to install the Nginx Ingress controller:
```bash
minikube addons enable ingress
```
verify that the nginx ingress controller is running
```bash
kubectl get pods -n kube-system | grep nginx
```

### Create ingress controller resouce for Argo CD
create `argocd-ingress.yaml` file
```bash
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: argocd-ingress
  namespace: argocd
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
spec:
  rules:
  - host: argocd.minikube.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: argocd-server
            port:
              number: 443
```
Apply file
```bash
kubectl apply -f argocd-ingress.yaml
```

### Add argocd.minikube.local to /etc/hosts
Since Minikube uses a local cluster, you’ll need to map `argocd.minikube.local` to your Minikube IP in your /etc/hosts file.

- Get minikube ip
```bash
minikube ip
```

### open this file and edit 
```bash
sudo nano /etc/hosts
```
add this to your /etc/hosts
```bash
192.168.49.2  argocd.minikube.local
```

### 5. Access Argo CD via the Ingress
Now you should be able to access Argo CD by navigating to https://argocd.minikube.local in your browser.

### 6. Retrieve Initial Argo CD Credentials
To get the initial admin password for Argo CD, run the following:
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
##Retrieve admin user
 kubectl -n argocd get secret argocd-secret -o jsonpath="{.data.admin.password}" | base64 -d
```

##Debugging
TOD0: fix admin password for argocd

```bash
echo "$(minikube ip) argocd.minikube.local" | sudo tee -a /etc/hosts
kubectl get ingress -n argocd
kubectl port-forward svc/argocd-server -n argocd 8080:443
```


