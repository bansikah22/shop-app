### Downloading kubectl
```
curl -LO "https://dl.k8s.io/release/v1.28.3/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl
## upgrading version
minikube start --kubernetes-version=v1.31.1

###Deployment of dev environment under the dev namespace
helm install shop-app-dev . -f values-dev.yaml --namespace dev
#check pods status
kubectl get pods -n dev
#check services status
kubectl get services -n dev
#check deployment status
kubectl get deployments -n dev
#check ingress status
kubectl get ingress -n dev
#see more about release status
helm status shop-app-dev -n dev

helm uninstall shop-app-dev -n dev

kubectl delete namespace dev

kubectl create namespace dev 

kubectl get pods -n dev --watch

helm uninstall shop-app-dev -n dev

helm install shop-app-dev . -f values-dev.yaml --namespace dev

kgp --namespace dev

##Testing dev environment
 minikube service shop-app-dev-frontend -n dev --url
kubectl get ingress -n dev
sudo echo "$(minikube ip) shop-app-dev.local" | sudo tee -a /etc/hosts

##Test with curl
curl -H "Host: shop-app-dev.local" http://$(minikube ip)
curl -H "Host: shop-app-dev.local" http://$(minikube ip)/api


helm upgrade --install shop-app-dev . -f values-dev.yaml -n dev


```
