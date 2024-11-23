# Email Verification API with Node.js

This project is a backend system built with Node.js, Express, and MongoDB, which sends a verification email to users during the signup process. Users can only log in after verifying their email by clicking on the verification link sent to their inbox.

## Features

* User registration with email verification.
* Sends verification emails using Nodemailer.
* Secure verification link with unique tokens.
* Database integration with MongoDB.
* Error handling for invalid or expired verification links.

## Tech Stack

* Node.js: Backend runtime environment.
* Express: Web framework for API endpoints.
* MongoDB: Database for storing user information and verification tokens.
* Nodemailer: Library for sending emails.
* dotenv: Environment variable management.

## Installation and Setup

1. Clone the repository:
2. Install dependencies with `npm install`.
3. Set environment variables in `.env` file. Refer to `.env.example` for the list of required variables.
4. Run the application with `npm start`.


