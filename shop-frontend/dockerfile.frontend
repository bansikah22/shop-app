# Dockerfile
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

# Use build argument for environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy all other files and build the project
COPY . .

RUN npm run build

# Use nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
