# Shop Application

This is a full-stack e-commerce application with a React frontend and Spring Boot backend.

## Prerequisites

- Java JDK 17 or later
- Node.js and npm
- Maven

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bansikah22/shop-app.git
cd shop-app
```

### 2. 2. Run the Frontend (React)
Navigate to the backend directory:
```bash
cd shop-frontend
npm install
npm start
```
Acess application  http://localhost:3000

### 2. 2. Run the Backend (Spring Boot)
```bash
cd shop-backend
mvn clean install
mvn clean package
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`

## CONTRIBUTIONS
Contributions are welcome! Please create a pull request for any improvements or bug fixes.


License
---
This project is licensed under the [MIT License.](./LICENSE)


