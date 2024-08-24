<h1 align="center">
  <br>
<img src="https://raw.githubusercontent.com/NighTzy-Godz/assessment/master/client/public/ShopmeFy.png" width="70%">
  <br>
  ShopmeFy Full Documentation
  <br>
</h1>

<h4 align="center">A full stack development that is built on top of NextJs and Typescript for frontend, and Flask for backend.</h4>

- [Frontend Documentation](#frontend-documentation)
- [Backend Documentation](#backend-documentation)
- [Summary](#summary)

# Frontend Documentation

## Description

Welcome to the client-side documentation for the E-Commerce Application. This README will guide you through setting up, running, and understanding the client-side code of the application.

## Table of Contents - Client Side

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [Running the Application - Please Read](#running-the-application)

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

## Features

- **User Authentication**:

  - Registration and login functionality.
  - Secure authentication using JWT tokens.

- **Product Management**:

  - Create, read, update, and delete (CRUD) operations for products.
  - Product details view with information such as title, description, price, and image.

- **Responsive Design**:

  - User interface that adjusts to different screen sizes and devices.
  - Mobile-friendly layout for better user experience on smartphones and tablets.

- **Error Handling**:

  - User-friendly error messages and validation.
  - Proper handling of API errors and form submission issues.

- **Form Handling**:

  - Custom components for form inputs, including text fields, text areas, and file uploads.
  - Integration with `react-hook-form` for managing form state and validation.

- **State Management**:
  - Context-based state management for authentication and user sessions.
  - Global state handling through React Context API.

## Running the application

To Start the development server, run

```bash
    npm run dev
    # or
    yarn dev
```

# Backend Documentation

## Description

This is the backend of a full-stack web application built using Flask, SQLAlchemy, and PostgreSQL. The backend provides RESTful API endpoints to manage users, products, and authentication, including JWT-based security. It supports operations such as creating, reading, updating, and deleting records, along with pagination and user-specific queries.

## Table of Contents - Server Side

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

# Summary

This project is a junior fullstack assessment that marks my first experience into building a web application with Next.js and Flask. Over the course of a single day, I dove into Next.js and Flask, learning their intricacies and applying them to build a functional client-side application. With just one and a half day to complete the project, I tackled both the frontend and backend aspects, utilizing Flask for the server-side functionality.

While I’m familiar with deploying applications, deploying both Next.js and Flask posed a unique challenge due to my lack of experience with these specific technologies. I faced an additional setback when my internet connection from PLDT was down for almost a day. Because of these challenges and time constraints, the application wasn’t fully deployed by the end of the project.

Despite these hurdles, this project has been a significant learning experience. It demonstrated that I can quickly grasp new technologies and adapt to new challenges. This journey has reinforced my ability to learn and implement new skills efficiently, even within a tight deadline. I appreciate your understanding as I worked through these challenges and strived to complete the assessment to the best of my ability.
