## Setting up Argocd on you local minikube cluster
### download minikube 
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

### install argo
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

kgp -n argocd

###obtain password for admin
kubectl get secret -n argocd argocd-initial-admin-secret -o yaml

##Access ui
kubectl port-forward svc/argocd-server -n argocd 8082:443
```


**Step 1: Add Argocd Helm Repo**
```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update


helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace


kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

``` 
**Step 2: Create a namespace for argocd**
```bash
kubectl create namespace argocd
```
**Step 3: Install Argo CD with Helm**
```bash
helm install argocd argo/argo-cd --namespace argocd --set server.service.type=LoadBalancer
###for local deployment
helm install argocd argo/argo-cd --namespace argocd --set server.service.type=NodePort
```
**Step 4: Accessing the application UI**
```bash
## Enable ingress
minikube addons enable ingress
##getting secret for argocd
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

##configure /etc/hosts
echo "$(minikube ip) <ingress-name>" | sudo tee -a /etc/hosts
## ingress configuration
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: argocd-ingress
  namespace: argocd
spec:
  rules:
    - host: argocd.local # Change this to your desired hostname.
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: argocd-server
                port:
                  number: 80
```
#### Apply file
```bash
kubectl apply -f argocd-ingress.yaml
```
Now you should be able to access Argo CD at http://argocd.local.
