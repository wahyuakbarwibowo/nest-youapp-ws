# YouApp Backend – Technical Challenge

Backend service for **YouApp** implementing authentication, profile management, and real-time chat using **NestJS**, **MongoDB**, and **RabbitMQ**, following best practices in API design, validation, and scalable architecture.

---

## 🚀 Tech Stack

* **Node.js**
* **NestJS**
* **MongoDB (Mongoose)**
* **RabbitMQ**
* **JWT Authentication**
* **Socket.IO** (notification)
* **Docker & Docker Compose**
* **Jest (Unit Testing)**

---

## 📐 Architecture Overview

This project uses a **modular monolith architecture** with clear domain separation and **event-driven communication** via RabbitMQ.

Although implemented as a single service for simplicity and clarity (suitable for a technical challenge), the system is designed to be **microservice-ready** and easily extractable into independent services in the future.

### High-Level Architecture

```
Client
  |
  v
NestJS API
  |
  ├── Auth Module
  ├── Profile Module
  ├── Chat Module
  |      ├── RabbitMQ Producer
  |      └── RabbitMQ Consumer
  |
  └── MongoDB
```

---

## 🧩 Modules Breakdown

### Auth Module

* User registration
* User login
* JWT authentication
* Password hashing using bcrypt

### Profile Module

* Create profile
* Get profile
* Update profile
* Horoscope & zodiac calculated from birthday (derived fields)

### Chat Module

* One-to-one text messaging
* Message persistence
* RabbitMQ-based message delivery
* Real-time notification via Socket.IO
* Message read status

---

## 🗄 Database Design (MongoDB)

### User Collection

Responsible only for authentication & identity.

```ts
{
  email: string,
  username: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}
```

---

### Profile Collection

User profile data extracted from Figma design.

```ts
{
  userId: ObjectId,
  displayName: string,
  image: string,
  gender: "male" | "female",
  birthday: Date,
  horoscope: string,
  zodiac: string,
  height: number,
  weight: number,
  interests: string[],
  createdAt: Date,
  updatedAt: Date
}
```

> **Note:** `horoscope` and `zodiac` are derived fields calculated from `birthday` to ensure data integrity.

---

### Message Collection

```ts
{
  senderId: ObjectId,
  receiverId: ObjectId,
  content: string,
  isRead: boolean,
  createdAt: Date
}
```

---

## 🔐 Authentication

* JWT-based authentication
* Protected routes using `JwtAuthGuard`
* Token required for profile and chat operations

---

## 📡 RabbitMQ Usage

RabbitMQ is used to decouple chat message sending and processing.

### Flow:

1. User sends message
2. API publishes event to RabbitMQ
3. Consumer processes message
4. Message saved to database
5. Receiver notified via Socket.IO

This demonstrates:

* Asynchronous processing
* Event-driven architecture
* Microservice-ready design

---

## 📑 API Endpoints

### Auth

#### Register

```
POST /api/register
```

```json
{
  "email": "user@email.com",
  "username": "username",
  "password": "password"
}
```

---

#### Login

```
POST /api/login
```

```json
{
  "email": "user@email.com",
  "password": "password"
}
```

---

### Profile

#### Create Profile

```
POST /api/createProfile
Authorization: Bearer <token>
```

```json
{
  "displayName": "John Doe",
  "image": "https://image.url/avatar.png",
  "gender": "male",
  "birthday": "1995-05-20",
  "height": 175,
  "weight": 70,
  "interests": ["Music", "Sports"]
}
```

---

#### Get Profile

```
GET /api/getProfile
Authorization: Bearer <token>
```

---

#### Update Profile

```
PUT /api/updateProfile
Authorization: Bearer <token>
```

---

### Chat

#### Send Message

```
POST /api/sendMessage
Authorization: Bearer <token>
```

```json
{
  "receiverId": "USER_ID",
  "content": "Hello!"
}
```

---

#### View Messages

```
GET /api/viewMessages?userId=USER_ID
Authorization: Bearer <token>
```

---

## ✅ Validation & Best Practices

* DTO validation using `class-validator`
* Centralized error handling
* Clean folder structure
* Separation of concerns
* Secure password hashing
* Environment-based configuration

---

## 🧪 Unit Testing

Unit tests are implemented using **Jest** to validate core business logic such as:

* User registration
* Login authentication
* Profile creation

---

## 🐳 Docker Setup

### Run the project

```bash
docker-compose up --build
```

### Services Included

* NestJS API
* MongoDB
* RabbitMQ (with management UI)

---

## 🧠 Design Decisions

### Why Modular Monolith?

For a technical challenge, a modular monolith offers:

* Lower complexity
* Faster development
* Easier evaluation
* Clear domain separation

RabbitMQ ensures asynchronous communication, making the system ready for future microservice extraction if needed.

---

## 📌 Future Improvements

* Pagination for chat messages
* Message read receipts
* User online status
* Interest normalization
* API documentation with Swagger

---

## 👤 Author

Developed as part of a backend technical challenge using NestJS and MongoDB.

---
