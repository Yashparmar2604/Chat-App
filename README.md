# Chat App

This repository contains the source code for a chat application, divided into two main parts: the Frontend and the Backend.



## Table of Contents
- [Frontend](#frontend)
- [Backend](#backend)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [License](#license)


## Frontend

The frontend is built using modern web technologies to provide a seamless user experience.

### Features
- User authentication
- Real-time messaging
- Responsive design

### Tech Stack
- React.js
- Zustand (for state management)
- Socket.IO (for real-time communication)
- Tailwind CSS
- DaisyUI

---

## Backend

The backend handles user authentication, message storage, and real-time communication.

### Features
- RESTful API
- WebSocket support for real-time messaging
- Secure user authentication with JWT
- MongoDB for data storage

### Tech Stack
- Node.js
- Express.js
- MongoDB
- Socket.IO

---

## API Documentation

### Base URL
`http://localhost:8080/api`

### Authentication

#### 1. **Register User**
- **Endpoint:** `/user/signup`
- **Method:** POST
- **Request Body:**
    ```json
    {
        "fullname": "string",
        "email": "string",
        "password": "string",
        "confirmPassword": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User created successfully",
        "user": {
            "_id": "string",
            "fullname": "string",
            "email": "string"
        }
    }
    ```

#### 2. **Login User**
- **Endpoint:** `/user/login`
- **Method:** POST
- **Request Body:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User logged in successfully",
        "user": {
            "_id": "string",
            "fullname": "string",
            "email": "string"
        }
    }
    ```

#### 3. **Logout User**
- **Endpoint:** `/user/logout`
- **Method:** POST
- **Response:**
    ```json
    {
        "message": "User logged out successfully"
    }
    ```

#### 4. **Get All Users**
- **Endpoint:** `/user/allusers`
- **Method:** GET
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <jwt-token>"
    }
    ```
- **Response:**
    ```json
    [
        {
            "_id": "string",
            "fullname": "string",
            "email": "string"
        }
    ]
    ```

### Messaging

#### 1. **Send Message**
- **Endpoint:** `/message/send/:id`
- **Method:** POST
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <jwt-token>"
    }
    ```
- **Request Body:**
    ```json
    {
        "message": "string"
    }
    ```
- **Response:**
    ```json
    {
        "_id": "string",
        "senderId": "string",
        "receiverId": "string",
        "message": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
    ```

#### 2. **Get Messages**
- **Endpoint:** `/message/get/:id`
- **Method:** GET
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <jwt-token>"
    }
    ```
- **Response:**
    ```json
    [
        {
            "_id": "string",
            "senderId": "string",
            "receiverId": "string",
            "message": "string",
            "createdAt": "string",
            "updatedAt": "string"
        }
    ]
    ```

---

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB instance running

### Backend Setup
1. Navigate to the `Backend` directory:
     ```bash
     cd Backend
     ```
2. Install dependencies:
     ```bash
     npm install
     ```
3. Create a `.env` file and configure the following:
     ```
     PORT=8080
     MONGODB_URI=<your-mongodb-uri>
     JWT_TOKEN=<your-jwt-secret>
     ```
4. Start the server:
     ```bash
     npm start
     ```

### Frontend Setup
1. Navigate to the `Frontend` directory:
     ```bash
     cd Frontend
     ```
2. Install dependencies:
     ```bash
     npm install
     ```
3. Start the development server:
     ```bash
     npm run dev
     ```

---

## License
This project is licensed under the MIT License.
