<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
  <p align="center">A GraphQL API built with <a href="http://nestjs.com" target="_blank">NestJS</a> for managing departments and sub-departments, using TypeORM, PostgreSQL, and JWT authentication.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# Description

A NestJS GraphQL API for managing departments and sub-departments, featuring JWT authentication, TypeORM with PostgreSQL, and deployment on Render.com. This project allows users to create, update, delete, and query departments and their sub-departments securely.
Repository: https://github.com/EjiroOsiephri/Tacktology-Solution-with-nestJS

# Project Setup

# Clone the repository

```git clone https://github.com/EjiroOsiephri/Tacktology-Solution-with-nestJS.git
cd Tacktology-Solution-with-nestJS
```

# Install dependencies

`npm install `

# Environment Variables

Create a .env file in the project root with the following:

```DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
JWT_SECRET=your-secure-secret-key-123456
PORT=3000
ALLOW_USER_AUTO_CREATE=true
```

Replace DATABASE_URL with your PostgreSQL connection string (e.g., Neon).

Use a secure JWT_SECRET for production.

Set ALLOW_USER_AUTO_CREATE=false in production to disable automatic user creation.

## Compile and Run the Project

# Development

```
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

The GraphQL Playground is available at http://localhost:3000/graphql in development.
Example GraphQL Queries/Mutations
Test the API in GraphQL Playground (http://localhost:3000/graphql).

# 1. Login (Obtain JWT)

```
mutation {
  login(input: { username: "admin", password: "password123" }) {
    access_token
  }
}
```

Response:

```{
  "data": {
    "login": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

Set the Authorization header in GraphQL Playground:

```
{
  "Authorization": "Bearer <access_token>"
}
```

# 2. Create a Department

```
mutation {
  createDepartment(input: {
    name: "Finance"
    subDepartments: [
      { name: "Accounts" },
      { name: "Payroll" }
    ]
  }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

# Response:

```
{
  "data": {
    "createDepartment": {
      "id": 1,
      "name": "Finance",
      "subDepartments": [
        { "id": 1, "name": "Accounts" },
        { "id": 2, "name": "Payroll" }
      ]
    }
  }
}
```

# 3. Query All Departments

```
query {
  getDepartments {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

# Response:

```
{
  "data": {
    "getDepartments": [
      {
        "id": 1,
        "name": "Finance",
        "subDepartments": [
          { "id": 1, "name": "Accounts" },
          { "id": 2, "name": "Payroll" }
        ]
      }
    ]
  }
}
```

## 4. Query a Single Department

```graphql
query {
  getDepartment(id: 1) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

# Response:

```
{
  "data": {
    "getDepartment": {
      "id": 1,
      "name": "Finance",
      "subDepartments": [
        { "id": 1, "name": "Accounts" },
        { "id": 2, "name": "Payroll" }
      ]
    }
  }
}
```

# 5. Update a Department

```
mutation {
  updateDepartment(id: 1, input: { name: "Finance Updated" }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

# 6. Delete a Department

```
mutation {
  removeDepartment(id: 1)
}
```

# Run Tests

```
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```
