# ![Binar](./public/logo_binar.png) Binar Bootcamp Challenge - Bank System REST API Documentation

## Introduction

This repository is a part of Binar JavaScript Backend Bootcamp - FGA Batch 2 Challenge Chapter 4. The challenge is to build a _simple_ Bank System REST API where can handle basic CRUD (Create, Read, Update, dan Delete) operations.

The REST API for now only supported on your localhost server, please provide and define your .env file.\
**Further update for online server will be implemented**.

Below are the detailed information on how to use the API, including all endpoints to use, request methods, and example responses.

## Base URL

The base URL for this API is:

```
http://localhost:PORT/api/v1
```

> **Notes :**\
> `PORT` is define in .env file

## Endpoints

### Users Endpoints

#### **1. Create User**

<a>http://localhost:PORT/api/v1/users</a>

> **Notes :**\
> `PORT` is define in .env file

> **Endpoint:** `/users`\
> **Method:** `POST`\
> **Description:** Create a new user

**Request Body**

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string"
}
```

**Response Body**
