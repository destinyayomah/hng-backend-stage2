# API Documentation

## Introduction

This documentation outlines the usage and specifications of the [Your API Name] built with NestJS.

## API Base URL

The base URL for this API is `https://hng-backend-stage2.onrender.com/api`.

## Authentication

This API doesn't require any authentication.

## Endpoints

### `GET /endpoint`

**Description:** Fetching details of a person.

**Request:**

- **Headers:**
  - `Authorization` No Authorization is required.

- **Parameters:**
  - `id` (ObjectId, required): The ObjectId of the person to fetch.

**Sample Request:**

```http
GET /id
