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
```

**Response:**
- **Status Code:** **`200 OK on success`**, **`422 UNPROCESSABLE_ENTITY on invalid id`**, **`404 NOT_FOUND on person not found`**

**Headers:**
    - `Content-Type:` application/json

**Sample Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "_id": "65003f6d41cde5cef4f66c6e",
    "name": "John Doe"
}
```

### `POST /`

**Description:** Adding a new person.

**Request:**

- **Headers:**
  - `Authorization` No Authorization is required.

- **Parameters:**
  - No parameter is required.

**Sample Request:**

```http
POST /
```

**Response:**
- **Status Code:** **`201 CREATED on success`**, **`422 UNPROCESSABLE_ENTITY on invalid input`**, **`409 CONFLICT on person already exists`**

**Headers:**
    - `Content-Type:` application/json

**Body (JSON):**
```json
{
  "name": "John Doe"
}
```

**Sample Response:**
```http
HTTP/1.1 201 OK
Content-Type: application/json

{
    "statusCode": 201,
    "_id": "65003f6d41cde5cef4f66c6e",
    "message": "Person Created"
}
```

### `PATCH /id`

**Description:** Modifying details of an existing person 

**Request:**

- **Headers:**
  - `Authorization` No Authorization is required.

- **Parameters:**
  - `id` (ObjectId, required): The ObjectId of the person to be modified.

**Sample Request:**

```http
PATCH /id
```

**Response:**
- **Status Code:** **`200 OK on success`**, **`422 UNPROCESSABLE_ENTITY on invalid input`**, **`404 NOT_FOUND on person not found`**, **`409 CONFLICT on person already exists`**

**Headers:**
    - `Content-Type:` application/json

**Body (JSON):**
```json
{
  "name": "Jane Doe"
}
```

**Sample Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "statusCode": 200,
    "message": "Person Updated",
    "data": {
        "_id": "65003f6d41cde5cef4f66c6e",
        "name": "Jane Doe"
    }
}
```

### `DELETE /id`

**Description:** Removing a person.

**Request:**

- **Headers:**
  - `Authorization` No Authorization is required.

- **Parameters:**
  - `id` (ObjectId, required): The ObjectId of the person to removed.

**Sample Request:**

```http
GET /id
```

**Response:**
- **Status Code:** **`200 OK on success`**, **`422 UNPROCESSABLE_ENTITY on invalid id`**, **`404 NOT_FOUND on person not found`**

**Headers:**
    - `Content-Type:` application/json

**Sample Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "statusCode": 200,
    "message": "Person Deleted"
}
```