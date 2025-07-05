# 📡 API Documentation

This document outlines the available API endpoints for the **[E-Commerce]** service.

## 📁 Base URL : http://localhost:8080/api/v1

---

## 🔐 Authentication

All endpoints (unless marked as `Public`) require authentication using **Bearer Token** in the `Authorization` header:

---

## 🗂️ Endpoints Overview

| Method | Endpoint                | Description             | Auth Required |
| ------ | ----------------------- | ----------------------- | ------------- |
| GET    | /user/                  | Get all users           | ✅            |
| POST   | /user/signup            | Create new user account | ❌            |
| POST   | /user/login             | User login              | ❌            |
| POST   | /user/verified          | User login              | ❌            |
| POST   | /user/verifying_account | User login              | ❌            |
| POST   | /user/login             | User login              | ❌            |
| GET    | /product/               | Get all products        |               |
| POST   | /product/               | Create a new product    | ✅ (Admin)    |
| PUT    | /product/:id            | Update a product        | ✅ (Admin)    |
| DELETE | /products/:id           | Delete a product        | ✅ (Admin)    |

---

## 🧑‍💻 API Endpoints Details

### 🔐 Auth Endpoints

#### `POST /auth/signup`

Register a new user.

- **Body Parameters:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

Endpoints

Auth :

## url :http://localhost:8080/api/v1/user/signul

method: **post**

simpleData:

```
{
"name": "exampleName",
"email": "exampleEmail",
"password": "123456" (min 6 digit)
}
```

# Auth :

## Signup

## url : http://localhost:8080/user/signup

**Method: post** <br>
Simple Data :

```
{
"name": "exampleName",
"email": "exampleEmail",
"password": "123456" (min 6 digit)
}
```

Response :

```
{
    "success": true,
    "message": "User SignUp Successfully",
    "data": {
        "email": "faysalhasan12@gmail.com",
        "name": "Faysal",
        "role": "USER",
        "status": "PENDING",
        "verified": false,
        "id": "3ef9c10f-6cf5-46f0-ba7b-81044d622407"
    },
    "meta": null
}
```

---

## Account Verifying

## url : http://localhost:8080/user/verifying_account

**Method : Post** <br>
Simple Data:

```
Body:
{
  "code": "123456" (Check Mail and Get Code)
}
Headers: email : example@gmail.com
```

Response:

```
{
    "success": true,
    "message": "Account Verify Successful",
    "data": {
        "message": "Account Verified Successful"
    },
    "meta": null
}
```
