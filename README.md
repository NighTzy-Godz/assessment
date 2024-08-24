# Frontend Documentation

## Description

Welcome to the client-side documentation for the E-Commerce Application. This README will guide you through setting up, running, and understanding the client-side code of the application.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Running the Application](#running-the-application)

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

## Project Structure

/app /auth /login page.tsx # Login page component. Handles user login functionality. /register page.tsx # Registration page component. Handles user registration functionality. /item /[productId] page.tsx # Product details page component. Displays details for a specific product based on productId. page.tsx # Main entry point for the application. Renders the home page and handles routing.

/components /forms FileUploader.tsx # Component for handling file uploads. Provides file input and upload functionality. Input.tsx # Component for text input fields. Includes styling and validation logic for input fields. TextArea.tsx # Component for multi-line text input. Used for larger text inputs like descriptions. Navbar.tsx # Navigation bar component. Includes links to various parts of the application. ContentCenter.tsx # Component to center content horizontally and vertically. Used for layout purposes. FormWidth.tsx # Component to control the width of forms. Ensures consistency in form layouts.

/context AuthProvider.tsx # Context provider for managing authentication state. Provides user authentication status and methods for logging in and out.

/styles globals.css # Global CSS styles. Applies styles that affect the entire application, including fonts, colors, and layout.

/public /images logo.png # Application logo. Displayed in the navigation bar and possibly other locations. background.jpg # Background image. Used as a backdrop for the application's main layout.

/pages index.tsx # Home page component. Displays a list of items and handles the main user interface. api /items.ts # API routes related to items. Handles CRUD operations for product items. /auth.ts # API routes related to authentication. Manages user login, registration, and authentication-related functionality.

### Explanation

- **`/app`**: Contains the core pages of the application, organized by routes and functionalities.
- **`/components`**: Includes reusable UI components and form elements used throughout the application.
- **`/context`**: Contains context providers that manage global state and logic, such as authentication state.
- **`/styles`**: Defines global styles for the application, ensuring a consistent look and feel.
- **`/public`**: Stores static assets like images and other files that are publicly accessible.
- **`/pages`**: Manages API routes and static pages, separating logic for server-side and client-side functionality.

Feel free to customize this description based on the actual structure and specifics of your project.

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
