# First stage: Build the application
FROM openjdk:17-slim as builder

# Set the working directory
WORKDIR /app

# Copy Maven wrapper files
COPY mvnw .
COPY .mvn .mvn

# Copy the pom.xml file and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Second stage: Create a smaller image for the application
FROM openjdk:17-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
