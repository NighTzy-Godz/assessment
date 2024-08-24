# Frontend Documentation

## Description

Welcome to the client-side documentation for the E-Commerce Application. This README will guide you through setting up, running, and understanding the client-side code of the application.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)

3. [Running the Application](#running-the-application)

## Overview

The client side of this e-commerce application is built using Next.js and TypeScript. It provides functionality for managing products, user authentication, and other key features necessary for a complete e-commerce experience.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the Repository

   ```bash
   git clone https://github.com/your-repo/ecommerce-client.git
   cd ecommerce-client
   ```

2. Install Dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a .env.local file in the root of your project and add the following environment variables:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8080/api # Or any API ROUTE that you have
   ```

# Backend Documentation

## Description

This is the backend of a full-stack web application built using Flask, SQLAlchemy, and PostgreSQL. The backend provides RESTful API endpoints to manage users, products, and authentication, including JWT-based security. It supports operations such as creating, reading, updating, and deleting records, along with pagination and user-specific queries.

## Table of Contents

1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [Database Migration](#database-migration)
4. [API Endpoints](#api-endpoints)
   - [User Routes](#user-routes)
   - [Product Routes](#product-routes)
   - [Authentication Routes](#authentication-routes)
5. [Authentication](#authentication)
6. [Error Handling](#error-handling)
7. [Contributing](#contributing)
8. [License](#license)

## Installation

To set up the backend locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo/backend
   ```

2. Create and activate virtual environment

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies
   ```bash
   pip install -r requirements.txt
   ```

## Environment Setup

Create a .env file in the root of the backend directory with the following variables:

- **FLASK_APP**=run.py
- **FLASK_ENV**=development
- **SECRET_KEY**=your_secret_key
- **SQLALCHEMY_DATABASE_URI**=your_database_uri

## Database Migration

To manage your database schema:

1. Initialize the migration environment
   ```bash
   flask --app run.py db init
   ```
2. Create a migration script
   ```bash
   flask --app run.py db migrate -m "Initial migration"
   ```
3. Apply migration
   ```bash
   flask --app run.py db upgrade
   ```

## API Endpoints

### User Routes

- `POST /api/registerUser`

  - Registers a New User
  - **Request Body**: `firstName`, `lastName`, `email`, `password`,`confirmPass`
  - **Response**: User creation confirmation

- `POST /api/loginUser`
  - Registers a New User
  - **Request Body**: `email`, `password`,
  - **Response**: JWT token for authentication.

### Product Routes

- `GET /api/items`

- Retrieves all item.
- **Response**: List of items retrieved.

- `GET /api/items/<id>`

- Retrieves a specific item by ID.
- **Response**: Item details.

- `POST /api/items`

- Creates a new Item
- **Request Body**: `title`, `desc`, `price`, `img`,
- **Response**: Item creation confirmation.

-`PUT /api/items/<id>`

- Updates an existing item.
- **Request Body**: `title`, `desc`, `price`, `img`,
- **Response**: Update Item Confirmation

- `DELETE /api/items/<id>`
- Deletes an item.
- **Response**: Deletion Confirmation

## Authentication

The backend uses JWT tokens to authenticate requests. Tokens are generated during login and must be included in the `header` with an `x-auth-token` property for protected routes.

## Error Handling

- **400 Bad Reques**: Invalid input data.
- **401 Unauthorized**: Authentication required or failed.
- **404 Not Found**: Requested resource not found.
