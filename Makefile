# Variables
FRONTEND_DIR = shop-frontend
BACKEND_DIR = shop-backend
FRONTEND_IMAGE = bansikah/shop-frontend:latest
BACKEND_IMAGE = bansikah/shop-backend:latest

# Frontend
frontend-install:
	cd $(FRONTEND_DIR) && npm install

frontend-test:
	cd $(FRONTEND_DIR) && npm run test -- --coverage --watch=false --detectOpenHandles

frontend-build:
	cd $(FRONTEND_DIR) && npm run build

# Backend
backend-test:
	cd $(BACKEND_DIR) && mvn clean test

backend-package:
	cd $(BACKEND_DIR) && mvn clean package -DskipTests

# Docker lint test using hadolint
lint-docker-frontend:
	hadolint $(FRONTEND_DIR)/Dockerfile

lint-docker-backend:
	hadolint $(BACKEND_DIR)/Dockerfile

# Combined lint target
lint-docker: lint-docker-frontend lint-docker-backend

# Docker build and push for frontend
docker-build-frontend:
	cd $(FRONTEND_DIR) && docker build -t $(FRONTEND_IMAGE) .

docker-push-frontend:
	docker push $(FRONTEND_IMAGE)

# Docker build and push for backend
docker-build-backend:
	cd $(BACKEND_DIR) && docker build -t $(BACKEND_IMAGE) .

docker-push-backend:
	docker push $(BACKEND_IMAGE)

# Combined Docker build
docker-build: docker-build-frontend docker-build-backend

# Combined Docker push
docker-push: docker-push-frontend docker-push-backend

# Combined targets
test: frontend-test backend-test
build: frontend-build backend-package
lint: lint-docker
docker: docker-build docker-push
