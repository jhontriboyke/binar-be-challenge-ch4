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

## Users Endpoints

### **1. Create User**

<a>http://localhost:PORT/api/v1/users</a>

> **Endpoint:** `/users`\
> **Method:** `POST`\
> **Description:** Create a new user

**Request Body**

```json
{
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "identity_type": "string",
    "identity_number": "string",
    "phone_number": "string",
    "nationality": "string",
    "job": "string",
    "street": "string",
    "village?": "string", <optional>
    "postal_code": "string",
    "city": "string",
    "province": "string",
    "country": "string"
}
```

**Response Body**

```json
{
  {
    "status": "success",
    "message": "User created",
    "data": {
        "user": {
            "id": "uuid",
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "password": "string"
        },
        "profile": {
            "id": "uuid",
            "identity_type": "string",
            "identity_number": "string",
            "phone_number": "string",
            "nationality": "string",
            "job": "string",
            "user_id": "uuid"
        },
        "address": {
            "id": "uuid",
            "street": "string",
            "village": null / "string",
            "postal_code": "string",
            "city": "string",
            "province": "string",
            "country": "string",
            "user_id": "uuid"
        }
    }
}
}
```

### **2. Get All Users**

<a>http://localhost:PORT/api/v1/users</a>

> **Endpoint:** `/users`\
> **Method:** `GET`\
> **Description:** Get all users

**Request Body**

```json
null
```

**Response Body**

```json
{
  {
    "status": "success",
    "message": "Data retrieved successfully",
    "data": {
        "users": [
            {
                "id": "uuid",
                "first_name": "string",
                "last_name": "string",
                "email": "string"
            },
            {
                "id": "uuid",
                "first_name": "string",
                "last_name": "string",
                "email": "string"
            },
            {}
        ]
    }
  }
}
```

### **3. Get An User By Id**

<a>http://localhost:PORT/api/v1/users/:id</a>

> **Endpoint:** `/users/:id`\
> **Method:** `GET`\
> **Description:** Get an user by id

**Request Parameter**

```json
"user_id": "uuid"
```

**Response Body**

```json
{
    "status": "success",
    "message": "Data retrieved successfully",
    "data": {
        "user": {
            "id": "uuid",
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "profile": {
                "id": "uuid",
                "identity_number": "string",
                "identity_type": "string",
                "nationality": "string",
                "phone_number": "string",
                "job": "string"
            },
            "address": {
                "id": "uuid",
                "street": "string",
                "village": null / "string",
                "postal_code": "string",
                "city": "string",
                "province": "string",
                "country": "string"
            }
        }
    }
}
```

### **4. Update An User By Id**

<a>http://localhost:PORT/api/v1/users/:id</a>

> **Endpoint:** `/users/:id`\
> **Method:** `PUT`\
> **Description:** Update an user by id

**Request Parameter**

```json
"user_id": "uuid"
```

**Request Body**

```json
{
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "password": "string",
    "identity_type": "string",
    "identity_number": "string",
    "phone_number": "string",
    "nationality": "string",
    "job": "string",
    "street": "string",
    "village?": "string", <optional>
    "postal_code": "string",
    "city": "string",
    "province": "string",
    "country": "string"
}
```

**Response Body**

```json
{
    "status": "success",
    "message": "User updated",
    "data": {
        "user": {
            "id": "uuid",
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "profile": {
                "id": "uuid",
                "identity_number": "string",
                "identity_type": "string",
                "nationality": "string",
                "phone_number": "string",
                "job": "string"
            },
            "address": {
                "id": "uuid",
                "street": "string",
                "village": null / "string",
                "postal_code": "string",
                "city": "string",
                "province": "string",
                "country": "string"
            }
        }
    }
}
```

### **5. Delete An User By Id**

<a>http://localhost:PORT/api/v1/users/:id</a>

> **Endpoint:** `/users/:id`\
> **Method:** `DELETE`\
> **Description:** Delete an user by id

**Request Parameter**

```json
"user_id": "uuid"
```

**Response Body**

```json
{
  "status": "success",
  "message": "User deleted",
  "data": {
    "user": {
      "id": "uuid",
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "password": "string"
    }
  }
}
```

## Accounts Endpoints

### 1. Create An Account

<a>http://localhost:PORT/api/v1/accounts</a>

> **Endpoint:** `/accounts`\
> **Method:** `POST`\
> **Description:** Create a new account

**Request Body**

```json
{
  "user_id": "uuid",
  "number": "string",
  "pin_number": "string",
  "balance": "integer" / "float",
  "bank_name": "string",
  "account_type_id": "integer",
}
```

**Response Body**

```json
{
  "status": "success",
  "message": "Account created",
  "data": {
    "account": {
      "id": "uuid",
      "number": "string",
      "pin_number": "string",
      "balance": "float",
      "bank_name": "string",
      "user_id": "string",
      "account_type_id": "integer"
    }
  }
}
```

### **2. Get All Accounts**

<a>http://localhost:PORT/api/v1/accounts</a>

> **Endpoint:** `/accounts`\
> **Method:** `GET`\
> **Description:** Get all acccounts

**Request Body**

```json
null
```

**Response Body**

```json
{
    "status": "success",
    "message": "Data retrieved succesfully",
    "data": {
        "accounts": [
            {
                "id": "uuid",
                "number": "string",
                "balance": "integer" / "float",
                "bank_name": "string",
                "account_type": {
                    "id": "integer",
                    "name": "string",
                    "description": "string"
                }
            },
            {}
        ]
    }
}
```

### **3. Get An Account By Id**

<a>http://localhost:PORT/api/v1/accounts/:id</a>

> **Endpoint:** `/accounts/:id`\
> **Method:** `GET`\
> **Description:** Get an account by id

**Request Parameter**

```
id: "uuid"
```

**Response Body**

```json
{
  "status": "success",
  "message": "Account found",
  "data": {
    "account": {
      "id": "string",
      "bank_name": "string",
      "number": "string",
      "pin_number": "string",
      "balance": "float",
      "account_type_id": "integer",
      "user": {
        "id": "string",
        "first_name": "string",
        "last_name": "string",
        "email": "string"
      }
    }
  }
}
```

## Transactions Endpoints

### **1. Create deposit transaction**

<a>http://localhost:PORT/api/v1/transactions/deposit</a>

> **Endpoint:** `/transactions/deposit`\
> **Method:** `POST`\
> **Description:** Create a new deposit transaction

**Request Body**

```json
{
    "to_account_number": "string",
    "amount": "float" / "number"
}
```

**Response Body**

```json
{
  "status": "success",
  "message": "Transaction success and created",
  "data": {
    "transaction": {
      "id": "string",
      "amount": "float",
      "date": "timestamp",
      "from_account_number": null,
      "to_account_number": "string",
      "type": "deposit"
    }
  }
}
```

### **2. Create withdraw transaction**

<a>http://localhost:PORT/api/v1/transactions/withdraw</a>

> **Endpoint:** `/transactions/withdraw`\
> **Method:** `POST`\
> **Description:** Create a new withdraw transaction

**Request Body**

```json
{
  "from_account_number": "string",
  "amount": "float"
}
```

**Response Body**

```json
{
  "status": "success",
  "message": "Transaction success and created",
  "data": {
    "transaction": {
      "id": "string",
      "amount": "float",
      "date": "timestamp",
      "from_account_number": "string",
      "to_account_number": null,
      "type": "withdraw"
    }
  }
}
```

### **3. Create transfer transaction**

<a>http://localhost:PORT/api/v1/transactions/transfer</a>

> **Endpoint:** `/transactions/transfer`\
> **Method:** `POST`\
> **Description:** Create a new transfer transaction

**Request Body**

```json
{
  "from_account_number": "string",
  "to_account_number": "string",
  "amount": "float"
}
```

**Response Body**

```json
{
  "status": "success",
  "message": "Transaction success and created",
  "data": {
    "transaction": {
      "id": "string",
      "amount": "float",
      "date": "timestamp",
      "from_account_number": "string",
      "to_account_number": "string",
      "type": "transfer"
    }
  }
}
```

### **4. Get All Transactions**

<a>http://localhost:PORT/api/v1/transactions</a>

> **Endpoint:** `/transactions`\
> **Method:** `GET`\
> **Description:** Get all transactions

**Request Body**

```json
null
```

**Request Parameter**

```
type=deposit/withdraw/transfer

http://localhost:PORT/api/v1/transactions?type=deposit
```

**Response Body**

```json
{
  {
    "status": "success",
    "message": "Data retrieved successfully",
    "data": {
        "users": [
            {
                "id": "uuid",
                "first_name": "string",
                "last_name": "string",
                "email": "string"
            },
            {
                "id": "uuid",
                "first_name": "string",
                "last_name": "string",
                "email": "string"
            },
            {}
        ]
    }
  }
}
```

### **5. Get A Transaction By Id**

<a>http://localhost:PORT/api/v1/transactions/:id</a>

> **Endpoint:** `/transactions/:id`\
> **Method:** `GET`\
> **Description:** Get transaction by id

**Request Body**

```json
null
```

**Request Parameter**

```
id: "uuid"
```

**Response Body**

Transfer

```json
{
  "status": "success",
  "message": "Transaction found",
  "data": {
    "transaction": {
      "id": "string",
      "type": "string",
      "amount": "float",
      "date": "timestamp",
      "from_account": {
        "id": "string",
        "number": "string",
        "user": {
          "first_name": "string",
          "last_name": "string"
        }
      },
      "to_account": {
        "id": "string",
        "number": "string",
        "user": {
          "first_name": "string",
          "last_name": "string"
        }
      }
    }
  }
}
```

Deposit

```json
{
  "status": "success",
  "message": "Transaction found",
  "data": {
    "transaction": {
      "id": "string",
      "type": "string",
      "amount": "float",
      "date": "timestamp",
      "from_account": {
        "user": {}
      },
      "to_account": {
        "id": "string",
        "number": "string",
        "user": {
          "first_name": "string",
          "last_name": "string"
        }
      }
    }
  }
}
```

Withdraw

```json
{
  "status": "success",
  "message": "Transaction found",
  "data": {
    "transaction": {
      "id": "string",
      "type": "string",
      "amount": "float",
      "date": "timestamp",
      "from_account": {
        "id": "string",
        "number": "string",
        "user": {
          "first_name": "string",
          "last_name": "string"
        }
      },
      "to_account": {
        "user": {}
      }
    }
  }
}
```

## **_There will update soon_**
