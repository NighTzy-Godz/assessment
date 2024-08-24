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
7. [Deployment](#deployment)
8. [Contributing](#contributing)
9. [License](#license)

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

**FLASK_APP**=run.py
**FLASK_ENV**=development
**SECRET_KEY**=your_secret_key
**SQLALCHEMY_DATABASE_URI**=your_database_uri

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
