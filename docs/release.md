## Summary of the Process:
- Create a GitHub Release:

- Navigate to your repository's Releases section.
- Draft a new release with a version tag (e.g., v1.0.0).
- This will trigger the pipeline.
### Pipeline Execution:

- The pipeline builds the frontend and backend, runs tests, checks Dockerfiles, tags images with the version, and pushes the images to Docker Hub.
Docker Images:

Your Docker images will be tagged with the release version and pushed to Docker Hub under bansikah/shop-frontend:v1.0.0 and bansikah/shop-backend:v1.0.0.


[Docker push and build with actions](https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images)