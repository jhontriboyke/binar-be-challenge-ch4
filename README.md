# ![Binar](./public/logo_binar.png) Binar Bootcamp Challenge - Bank System REST API Documentation

## Introduction

This repository is a part of Binar JavaScript Backend Bootcamp - FGA Batch 2 Challenge Chapter 5.

The challenge is to build a _simple_ Bank System REST API where can handle basic CRUD (Create, Read, Update, dan Delete) operations.

The REST API for now only supported on your localhost server, please provide and define your .env file.\
**Further update will be implement accordingly**.

## Base URL

The base URL for this API is:

```
http://localhost:PORT/api/v1
```

> **Notes :**\
> `PORT` is define in .env file

First install all package.json modules:

```
npm install
```

After that run seed.js with this command :

```
npm run seed
```

**There will be 1 admin that can be use after running the seeder:**
| No | Email | Password |
|----|----------------------|-----------|
| 1 | admin@mail.com | admin123 |\

**There will be 2 users that can be use after running the seeder:**
| No | Email | Password |
|----|----------------------|-----------|
| 1 | jhontriboyke@example.com | 123456 |
| 2 | janedoe@example.com | 123456 |

> **Notes :**\
> check prisma/seed.js for further info

To activate the server, run this command :

```
npm run start
```

To excecute tests file, run this command:

```
npm run test
```

## API Docs

Check API Endpoints Docs as Swagger by this URL:

```
http://localhost:PORT/api/v1/docs
```

## **_There will update soon_**
