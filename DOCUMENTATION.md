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
- **Status Code:** **`200`** OK on success, **`422 UNPROCESSABLE_ENTITY`** on invalid id, **`404 NOT_FOUND`** on person not found

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
- **Status Code:** **`201 CREATED`** on success, **`422 UNPROCESSABLE_ENTITY`** on invalid input, **`409 CONFLICT`** on person already exists

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
- **Status Code:** **`200 OK`** on success, **`422 UNPROCESSABLE_ENTITY`** on invalid input, **`404 NOT_FOUND`** on person not found, **`409 CONFLICT`** on person already exists

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
DELETE /id
```

**Response:**
- **Status Code:** **`200 OK`** on success, **`422 UNPROCESSABLE_ENTITY`** on invalid id, **`404 NOT_FOUND`** on person not found

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

## Known Limitations and Assumptions
- This API assumes that the client provides valid input data.
- The API currently only supports URL_ENCODED and JSON as the data input format.
- All outputs are in JSON format.

## Setup and Deployment

### Local Development

1. Clone the repository: git clone https://github.com/destinyayomah/hng-backend-stage2.git
2. Install dependencies: npm install
3. Configure environment variables: Create a .env file with the **`MONGO_URL=`** configuration.
4. Start the development server: npm run start:dev
5. Visit localhost:3000/api to access the api

### Deployment

1. Choose a hosting provider (e.g., Render, Railway, Cyclic, or your preferred platform).
2. Set up the necessary environment variables on the hosting platform like **`MONGO_URL`**. If you are making use of render you would need to also add the **`NODE_VERSION`** environment varaible with a value of **`18.6.0`**, so it can be picked up as the node version for running the project.
3. Deploy your NestJS application following the platform-specific deployment instructions.

## Conclusion
Thank you for using the hng-backend-stage2 API. If you have any questions or need assistance, please feel free to contact me.