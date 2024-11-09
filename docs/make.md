### Make commands
```bash
##Test build and linting
make lint
make test
make build

# Run frontend tests (with coverage)
make frontend-test
# Run backend tests using Maven
make backend-test
# Run both frontend and backend tests together
make test


# Run the lint checks for both frontend and backend Dockerfiles
make lint-docker
# Run tests for both frontend and backend
make test
# Build both the frontend and backend
make build


###Building and pushing docker files
make docker-push
make docker-build
make docker
```