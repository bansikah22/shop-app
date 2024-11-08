# Variables
FRONTEND_DIR = shop-frontend
BACKEND_DIR = shop-backend
DOCKER_IMAGE_FRONTEND = bansikah/shop-frontend:latest
DOCKER_IMAGE_BACKEND = bansikah/shop-backend:latest

# Frontend
frontend-install:
	cd $(FRONTEND_DIR) && npm install

frontend-test:
	cd $(FRONTEND_DIR) && npm run test -- --coverage --watch=false

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

# Docker build (frontend)
docker-build-frontend:
	docker build -t $(DOCKER_IMAGE_FRONTEND) $(FRONTEND_DIR)

# Docker build (backend)
docker-build-backend:
	docker build -t $(DOCKER_IMAGE_BACKEND) $(BACKEND_DIR)

# Combined lint target
lint-docker: lint-docker-frontend lint-docker-backend

# Combined targets
test: frontend-test backend-test
build: frontend-build backend-package
lint: lint-docker
