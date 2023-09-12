# API Documentation

## Introduction

This documentation outlines the usage and specifications of the hng-backend-stage2 API built with NestJS.

## API Base URL

The base URL for this API is `https://hng-backend-stage2.onrender.com/api`.

## Authentication

This API doesn't require any authentication.

## Endpoints

### `GET /id`

**Description:** Fetching details of a person.

**Request:**

- **Headers:**
  - `Authorization` No Authorization is required.

- **Parameters:**
  - `id` (ObjectId, required): The ObjectId of the person to fetch.

**Sample Request:**

```http
GET /id

**Response:**
- **Status Code:** **`201 CREATED on success`**, **`422 UNPROCESSABLE_ENTITY on invalid input`**, **`409 CONFLICT on person already exists`**

**Headers:**
    - `Content-Type:` application/json

**Body (JSON):**
```shell
{
  "name": "John Doe"
}

Sample Response:
```json
{
    "statusCode": 201,
    "_id": "65003f6d41cde5cef4f66c6e",
    "message": "Person Created"
}