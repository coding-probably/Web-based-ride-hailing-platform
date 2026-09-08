# 🚗 Web-Based Ride-Hailing Platform

## Overview

This project is a full-stack **web-based ride-hailing platform** that provides separate workflows for passengers and captains. The application allows users to register and authenticate, select pickup and destination locations, calculate estimated fares, request rides, and follow the ride lifecycle. Captains can create their accounts with vehicle information, authenticate themselves, receive ride requests, confirm rides, start rides using an OTP, and complete rides.

The application is designed using a client-server architecture. The frontend provides the user interface and communicates with the backend through HTTP requests, while the backend handles authentication, ride management, map-related operations, database interactions, and real-time communication. MongoDB is used for persistent data storage through Mongoose, while Socket.IO is used to support real-time communication between users and captains.

The backend is implemented using Node.js and Express.js and is organized into routes, controllers, middleware, services, models, and configuration modules. The frontend is implemented using React and Vite and contains separate pages and components for user and captain workflows.

---

## 🎯 Project Objective

The primary objective of this project is to implement the core workflow of a ride-hailing application in which passengers and captains interact through a common backend platform.

From the passenger's perspective, the system provides functionality for account creation, authentication, location selection, fare estimation, and ride creation. From the captain's perspective, the application provides vehicle registration information, authentication, ride confirmation, ride initiation, and ride completion.

The project also demonstrates how several backend concepts work together in a real-world application, including JWT authentication, password hashing, request validation, MongoDB data modeling, REST API design, middleware-based authorization, map services, and real-time communication.

---

## ✨ Key Features

### 👤 User Features

The user side of the application provides a complete authentication and ride-request workflow. A new user can register by providing the required account information and can subsequently log in to obtain an authenticated session.

Authenticated users can access their profile and logout functionality through protected routes. The user interface also allows passengers to enter pickup and destination addresses, obtain location-related information, calculate an estimated fare, and create a ride request by selecting a supported vehicle type.

The ride workflow is designed around three supported vehicle types: **car, motorcycle, and auto**. These vehicle types are also validated by the backend when a ride is created.

---

### 🚕 Captain Features

Captains have a separate authentication and application workflow. During registration, a captain provides personal information along with vehicle details such as vehicle type, color, license plate, and seating capacity.

The backend validates captain registration data before creating the account. Vehicle types are restricted to `car`, `motorcycle`, and `auto`, while basic validation is also applied to email, password, vehicle color, plate number, and capacity.

After authentication, captains can access their profile and logout functionality. Captains can also interact with ride requests and manage the ride lifecycle through dedicated ride APIs.

---

### 🚗 Ride Management

Ride management is the central functionality of the application. A user can create a ride by providing a pickup location, destination, and vehicle type. The backend validates the request before creating the ride.

Once a ride request is available, a captain can confirm the ride using its ride ID. The captain can then start the ride after providing the required six-digit OTP and can eventually end the ride.

This creates a structured ride lifecycle:

```text
User Requests Ride
        │
        ▼
   Ride Created
        │
        ▼
Captain Confirms Ride
        │
        ▼
   Ride Accepted
        │
        ▼
Captain Starts Ride
      + OTP
        │
        ▼
    Ride Active
        │
        ▼
Captain Ends Ride
        │
        ▼
   Ride Completed
```

The ride routes currently expose endpoints for ride creation, fare calculation, confirmation, starting a ride, and ending a ride.

---

## 🗺️ Maps and Location Services

Location functionality is implemented through a dedicated maps route module. The backend provides APIs for converting an address into coordinates, calculating distance and travel time between two locations, and generating autocomplete suggestions for user-entered location data.

These services allow the ride workflow to work with actual pickup and destination addresses instead of treating them only as plain text. The map routes are protected by user authentication middleware.

The frontend integrates map functionality to provide an interactive location-based experience for users.

---

## ⚡ Real-Time Communication

The application uses **Socket.IO** to support real-time communication between different participants in the ride workflow.

Real-time communication is particularly useful in a ride-hailing system because ride requests and status changes need to be communicated without requiring users to continuously refresh the page.

The backend includes a dedicated Socket.IO setup alongside the Express server, while the backend dependencies include `socket.io` and the frontend uses the corresponding Socket.IO client library.

---

## 🔐 Authentication and Security

Authentication is implemented using **JSON Web Tokens (JWT)**. The backend uses authentication middleware to protect routes that require a logged-in user or captain.

Passwords are hashed using **bcrypt** before being stored. The application also uses `cookie-parser` for handling cookies and `express-validator` for validating incoming request data.

The backend distinguishes between user and captain authentication middleware. This allows certain operations, such as starting or confirming a ride, to be restricted to authenticated captains, while ride creation and map operations can be restricted to authenticated users.

Sensitive configuration is loaded through environment variables using `dotenv`. No actual passwords, database credentials, JWT secrets, or API keys should be included in the repository or README. The backend package configuration confirms the use of JWT, bcrypt, dotenv, Express Validator, Mongoose, and Socket.IO.

---

# 🏗️ System Architecture

The application follows a client-server architecture consisting of a React frontend, Express backend, MongoDB database, and Socket.IO real-time communication layer.

The frontend is responsible for rendering the user and captain interfaces and communicating with the backend. The backend acts as the central application layer and handles authentication, validation, ride management, map services, and database operations.

MongoDB stores persistent application data, while Mongoose provides the object modeling layer used by the Node.js backend.

```text
                         ┌──────────────────────┐
                         │     React Frontend   │
                         │        + Vite        │
                         └───────────┬──────────┘
                                     │
                              HTTP / REST API
                                     │
                                     ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │       Node.js        │
                         └───────────┬──────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
              ▼                      ▼                      ▼
       ┌─────────────┐        ┌─────────────┐       ┌─────────────┐
       │   MongoDB   │        │  Socket.IO  │       │ Map Service │
       │  + Mongoose │        │ Real-Time   │       │    APIs     │
       └─────────────┘        └─────────────┘       └─────────────┘
```

The Express application registers the main route groups under `/users`, `/captains`, `/maps`, and `/rides`.

---

# 🛠️ Technology Stack

## Frontend

The frontend is built using **React** and **Vite**, providing a component-based interface with fast development and build tooling. The application uses React Router for navigation and Axios for communicating with backend APIs.

Map functionality is supported through Leaflet and React Leaflet, while Socket.IO Client is used for real-time communication. The frontend also uses Tailwind CSS, GSAP, and React Icons for styling, animations, and interface elements.

**Main technologies:**

* React
* Vite
* JavaScript
* React Router
* Axios
* Tailwind CSS
* Leaflet
* React Leaflet
* Socket.IO Client
* GSAP
* React Icons

---

## Backend

The backend is built using **Node.js and Express.js**. It provides the REST API consumed by the frontend and contains separate route modules for users, captains, maps, and rides.

MongoDB is used as the database and Mongoose is used for data modeling. Authentication uses JWT and bcrypt, while Express Validator is used to validate incoming request data.

**Main technologies:**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Socket.IO
* Axios
* Express Validator
* CORS
* Cookie Parser
* dotenv
* Nodemon

The current backend dependency configuration confirms these technologies.

---

# 📁 Project Structure

The repository separates the frontend and backend into two independent applications.

```text
Web-based-ride-hailing-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   │   ├── captain.routes.js
│   │   ├── maps.routes.js
│   │   ├── ride.routes.js
│   │   └── user.routes.js
│   ├── services/
│   ├── app.js
│   ├── server.js
│   ├── socket.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

The backend route directory currently contains four route modules: `user.routes.js`, `captain.routes.js`, `maps.routes.js`, and `ride.routes.js`.

---

# ⚙️ Backend Architecture

The backend is divided into several layers so that different responsibilities remain separated.

The **routes** layer defines API endpoints and connects them with the appropriate controllers. The **controllers** contain the application logic responsible for processing requests and generating responses. The **models** represent MongoDB data structures through Mongoose, while the **middlewares** provide authentication and request-processing functionality.

The **services** layer contains reusable backend functionality, while the configuration directory contains database and application configuration. The `app.js` file initializes Express, configures middleware, connects the route modules, and loads environment configuration.

---

# 🎨 Frontend Architecture

The frontend follows a React-based component architecture. Pages represent major user and captain screens, while reusable components provide common interface functionality.

Application context is used for shared frontend state and functionality, while routing allows the application to switch between authentication, user, captain, map, and ride-related screens.

The frontend communicates with the backend using HTTP requests and interacts with the real-time communication layer when ride-related events need to be propagated between users and captains.

---

# 📡 API Documentation

The backend exposes four main API groups:

```text
/users
/captains
/maps
/rides
```

These prefixes are registered directly in `backend/app.js`.

The following endpoints represent the current API routes in the repository.

---

## 👤 User API

### Register User

```http
POST /users/register
```

Creates a new user account.

### Login User

```http
POST /users/login
```

Authenticates an existing user.

### Get User Profile

```http
GET /users/profile
```

Returns the authenticated user's profile.

**Authentication:** Required.

### Logout User

```http
GET /users/logout
```

Logs out the authenticated user.

**Authentication:** Required.

The user route module currently defines these four endpoints.

---

## 🚕 Captain API

### Register Captain

```http
POST /captains/register
```

Creates a new captain account.

Captain registration includes vehicle information such as:

* Vehicle color
* Vehicle plate
* Vehicle capacity
* Vehicle type

Supported vehicle types are:

```text
car
motorcycle
auto
```

### Login Captain

```http
POST /captains/login
```

Authenticates a captain.

### Get Captain Profile

```http
GET /captains/profile
```

Returns the authenticated captain's profile.

**Authentication:** Required.

### Logout Captain

```http
GET /captains/logout
```

Logs out the authenticated captain.

**Authentication:** Required.

These endpoints are defined in `captain.routes.js`, which also applies request validation to captain registration and login.

---

# 🗺️ Maps API

### Get Coordinates

```http
GET /maps/get-coordinates?address=<address>
```

Converts an address into geographical coordinates.

**Authentication:** Required.

### Get Distance and Time

```http
GET /maps/get-distance-time?origin=<origin>&destination=<destination>
```

Calculates distance and travel-time information between an origin and destination.

**Authentication:** Required.

### Get Location Suggestions

```http
GET /maps/get-suggestions?input=<search_text>
```

Returns autocomplete suggestions based on the provided location input.

**Authentication:** Required.

These map endpoints are implemented in `maps.routes.js` and validate the relevant query parameters before passing requests to the map controller.

---

# 🚗 Ride API

### Create Ride

```http
POST /rides/create
```

Creates a new ride request for an authenticated user.

The request contains:

```json
{
  "pickup": "Pickup location",
  "destination": "Destination location",
  "vehicleType": "car"
}
```

The supported vehicle types are:

```text
auto
car
motorcycle
```

**Authentication:** User required.

---

### Get Fare

```http
GET /rides/get-fare?pickup=<pickup>&destination=<destination>
```

Calculates the estimated fare for a ride based on the pickup and destination locations.

**Authentication:** User required.

---

### Confirm Ride

```http
POST /rides/confirm
```

Allows an authenticated captain to confirm a ride.

Example request:

```json
{
  "rideId": "ride_id"
}
```

**Authentication:** Captain required.

---

### Start Ride

```http
GET /rides/start-ride?rideId=<ride_id>&otp=<otp>
```

Starts a ride after the captain provides the corresponding ride ID and six-digit OTP.

**Authentication:** Captain required.

---

### End Ride

```http
POST /rides/end-ride
```

Ends an active ride.

Example request:

```json
{
  "rideId": "ride_id"
}
```

**Authentication:** Captain required.

The ride route module validates pickup, destination, vehicle type, ride IDs, and OTP values before passing requests to the corresponding controller methods.

---

# 📊 API Summary

| Method | Endpoint                  | Purpose                        | Authentication |
| ------ | ------------------------- | ------------------------------ | -------------- |
| POST   | `/users/register`         | Register user                  | No             |
| POST   | `/users/login`            | Login user                     | No             |
| GET    | `/users/profile`          | Get user profile               | User           |
| GET    | `/users/logout`           | Logout user                    | User           |
| POST   | `/captains/register`      | Register captain               | No             |
| POST   | `/captains/login`         | Login captain                  | No             |
| GET    | `/captains/profile`       | Get captain profile            | Captain        |
| GET    | `/captains/logout`        | Logout captain                 | Captain        |
| GET    | `/maps/get-coordinates`   | Convert address to coordinates | User           |
| GET    | `/maps/get-distance-time` | Get distance and travel time   | User           |
| GET    | `/maps/get-suggestions`   | Get location suggestions       | User           |
| POST   | `/rides/create`           | Create ride                    | User           |
| GET    | `/rides/get-fare`         | Calculate ride fare            | User           |
| POST   | `/rides/confirm`          | Confirm ride                   | Captain        |
| GET    | `/rides/start-ride`       | Start ride with OTP            | Captain        |
| POST   | `/rides/end-ride`         | End ride                       | Captain        |

The table reflects the routes currently defined in the backend route files.

---

# 🔄 Complete Ride Workflow

The application combines the APIs above into a complete ride lifecycle.

A passenger first registers or logs into the application. After authentication, the user can search for locations using the maps API and obtain coordinate, distance, travel-time, and autocomplete information.

The user then selects a pickup location, destination, and vehicle type. The frontend can request a fare estimate before creating the ride. Once the ride is created, a captain can receive the request and confirm it.

After confirmation, the captain starts the ride using the ride ID and OTP. Once the journey is completed, the captain can end the ride through the corresponding API.

```text
┌────────────────────┐
│    User Register   │
│      / Login       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│  Location Search   │
│   /maps endpoints  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    Get Fare        │
│ /rides/get-fare    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    Create Ride     │
│   /rides/create    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Captain Confirms   │
│  /rides/confirm    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Start Ride       │
│ /rides/start-ride  │
│      + OTP         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    Active Ride     │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    End Ride        │
│  /rides/end-ride   │
└────────────────────┘
```

---

# 🗄️ Database

The application uses **MongoDB** as its persistent database and **Mongoose** as the object modeling layer.

The database stores information associated with users, captains, rides, and authentication-related data. Mongoose models provide the structure used by the backend when creating, reading, and updating MongoDB documents.

MongoDB is particularly suitable for this application because user, captain, vehicle, and ride information can be represented as related document structures while still allowing the application to evolve as new ride attributes are introduced.

---

# 🔒 Environment Variables

The backend uses `dotenv` to load configuration from environment variables. Sensitive values should always remain outside the source code.

Create a local environment file such as:

```text
backend/.env
```

Use placeholder variables according to the configuration required by your local setup.

For example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

If map services or other external services require credentials, those values should also be stored in environment variables.

**Never commit the real `.env` file to GitHub.**

A suitable `.gitignore` should include:

```gitignore
node_modules/
.env
.env.*
dist/
build/
```

For other developers, an `.env.example` file containing only placeholder values can be provided.

---

# 🚀 Installation and Setup

## Prerequisites

Before running the project, install:

* Node.js
* npm
* MongoDB or access to a MongoDB database
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/coding-probably/Web-based-ride-hailing-platform.git
cd Web-based-ride-hailing-platform
```

---

## 2. Setup the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

Create the local `.env` file and configure your MongoDB connection, JWT configuration, and any other required environment variables.

Start the backend:

```bash
npm start
```

The backend's package configuration currently uses:

```text
nodemon server.js
```

as its start command.

---

## 3. Setup the Frontend

Open a **new terminal** while keeping the backend running.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

---

# 🖥️ Running the Complete Application

The backend and frontend should run simultaneously.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

The communication architecture is:

```text
                   Browser
                      │
                      ▼
              React Frontend
                      │
                Axios / HTTP
                      │
                      ▼
              Express Backend
                /    |    \
               /     |     \
              ▼      ▼      ▼
           Users   Rides   Maps
                      │
                      ▼
                   MongoDB

              ┌──────────────┐
              │   Socket.IO  │
              │ Real-Time    │
              └──────────────┘
```

---

# 🧪 Input Validation

The application uses **Express Validator** to validate incoming requests before they reach the controllers.

For example, captain registration validates email format, minimum password length, vehicle color, vehicle plate, vehicle capacity, and supported vehicle type.

Ride creation validates pickup and destination strings as well as the selected vehicle type. Ride confirmation, ride start, and ride end operations validate the ride ID, while the start-ride operation additionally validates the OTP format.

This validation layer helps prevent malformed requests from reaching the core application logic.

---

# 📸 Screenshots

Screenshots can be added to demonstrate the application's major workflows.

Recommended screenshots include:

```text
screenshots/
├── home.png
├── user-login.png
├── user-dashboard.png
├── location-search.png
├── fare-estimation.png
├── captain-login.png
├── captain-dashboard.png
├── ride-request.png
└── active-ride.png
```

For a portfolio repository, screenshots of the **user dashboard, map/location selection, captain dashboard, and active ride interface** would provide a good visual overview of the project.

---

# 📌 Technical Highlights

This project demonstrates practical full-stack development through the integration of a React frontend with a Node.js and Express backend. The application uses a modular backend structure with separate routes, controllers, middleware, services, and models rather than implementing all functionality inside a single server file.

The authentication system demonstrates JWT-based authentication and password hashing with bcrypt. Protected routes are implemented through authentication middleware, with separate authorization handling for users and captains.

The ride workflow demonstrates a multi-step state transition from ride creation to captain confirmation, ride initiation through OTP verification, and ride completion. The map APIs add location-related functionality such as coordinate lookup, distance and time calculation, and autocomplete suggestions.

The project also incorporates Socket.IO to support real-time communication, making it possible to build a more responsive interaction between passengers and captains.

---

# 🔮 Future Improvements

The current application can be extended with several features to move it closer to a production-level ride-hailing platform.

Potential improvements include online payment integration, ride history, cancellation handling, driver-passenger matching based on distance, improved fare calculation, live location tracking, estimated time of arrival, push notifications, trip ratings and reviews, and more detailed captain analytics.

From an engineering perspective, the project could also be extended with automated unit and integration testing, centralized error handling, API documentation using OpenAPI/Swagger, improved logging and monitoring, rate limiting, stronger security configuration, and deployment using a cloud platform.

---

# 📚 Learning Outcomes

This project provides practical experience in building a complete full-stack application around a real-world problem.

The project demonstrates frontend development with React, backend API development using Express, MongoDB data modeling with Mongoose, JWT authentication, password hashing, middleware-based authorization, REST API design, request validation, map-service integration, and real-time communication using Socket.IO.

The project also demonstrates how multiple independent application components can be combined into a single workflow where a passenger, captain, backend server, database, map services, and real-time communication layer work together.

---

# 👨‍💻 Author

**Coding Probably**

GitHub:
https://github.com/coding-probably

---

# 📄 License

This project was developed for educational and development purposes.
