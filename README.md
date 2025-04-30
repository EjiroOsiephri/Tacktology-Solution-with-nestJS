<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://nextjs.org/" target="blank"><img src="https://assets.vercel.com/image/upload/v1607554385/nextjs/Icon_dark_background.png" width="120" alt="Next.js Logo" /></a>
</p>
  <p align="center">A GraphQL API built with <a href="http://nestjs.com" target="_blank">NestJS</a> and a <a href="https://nextjs.org" target="_blank">Next.js</a> frontend for managing departments and sub-departments, powered by TypeORM, PostgreSQL, and JWT authentication.</p>
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
Description
A NestJS GraphQL API and Next.js frontend for managing departments and sub-departments. The backend uses TypeORM with PostgreSQL and JWT authentication, deployed on Render.com. The frontend (optional) is deployed on Vercel.
Repository: https://github.com/your-username/department-api
Backend Setup
Clone the Repository:

bash

git clone https://github.com/your-username/department-api.git
cd department-api

Install Dependencies:

bash

npm install

Set Environment Variables:
Create a .env file in the project root:

env

DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
JWT_SECRET=your-secure-secret-key-123456
PORT=3000
ALLOW_USER_AUTO_CREATE=true

Replace DATABASE_URL with your PostgreSQL connection (e.g., Neon).

Use a secure JWT_SECRET.

Set ALLOW_USER_AUTO_CREATE=false in production.

Running the Backend
bash

# Development (watch mode)

npm run start:dev

# Production

npm run start:prod

GraphQL Playground: http://localhost:3000/graphql
Frontend Setup (Optional)
Clone the Frontend Repository (if separate):

bash

git clone https://github.com/your-username/department-frontend.git
cd department-frontend

Install Dependencies:

bash

npm install

Set Environment Variables:
Create a .env.local file:

env

NEXT_PUBLIC_API_URL=http://localhost:3000/graphql

Update NEXT_PUBLIC_API_URL to https://your-app.onrender.com/graphql for production.

Run the Frontend:

bash

# Development

npm run dev

# Production

npm run build
npm run start

Frontend: http://localhost:3001
Example GraphQL Queries/Mutations
Test in GraphQL Playground (http://localhost:3000/graphql).

1. Login (Get JWT)
   graphql

mutation {
login(input: { username: "admin", password: "password123" }) {
access_token
}
}

Response:
json

{
"data": {
"login": {
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
}
}

Set Authorization header:
json

{
"Authorization": "Bearer <access_token>"
}

2. Create Department
   graphql

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

Response:
json

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

3. Get All Departments
   graphql

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

Response:
json

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

4. Get Single Department
   graphql

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

Response:
json

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

5. Update Department
   graphql

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

6. Delete Department
   graphql

mutation {
removeDepartment(id: 1)
}

Deployment
Backend (Render.com)
Push to GitHub:

bash

git add .
git commit -m "Deploy backend"
git push origin main

Create Render Service:

Create a Web Service on Render.com.

Link to https://github.com/your-username/department-api.

Runtime: Node.

Build: npm install.

Start: npm run start:prod.

Environment Variables:

In Render dashboard:

env

DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
JWT_SECRET=your-secure-secret-key-123456
PORT=3000
ALLOW_USER_AUTO_CREATE=false

Deploy:

Trigger deployment. Access at https://your-app.onrender.com/graphql.

Frontend (Vercel, Optional)
Push to GitHub:

bash

cd department-frontend
git add .
git commit -m "Deploy frontend"
git push origin main

Deploy on Vercel:

Import https://github.com/your-username/department-frontend in Vercel.

Set environment variable:

env

NEXT_PUBLIC_API_URL=https://your-app.onrender.com/graphql

Deploy. Access at https://your-frontend.vercel.app.

Database
Uses PostgreSQL with TypeORM. In development, synchronize: true creates tables. In production, use migrations:
bash

# Generate migration

npm run typeorm:migration:generate -- -n InitialMigration

# Run migrations

npm run typeorm:migration:run

Resources
NestJS Documentation

Next.js Documentation

TypeORM Documentation

Render.com Documentation

Vercel Documentation

Support
MIT-licensed open source project. Contribute or support at NestJS Support.
Stay in Touch
Repository: https://github.com/your-username/department-api

NestJS Twitter: @nestframework

License
MIT licensed (LICENSE).
