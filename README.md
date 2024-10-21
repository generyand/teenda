# Teenda E-Commerce Application

## Description

Teenda is a full-stack e-commerce application built with React for the frontend and Express.js for the backend. It features a robust admin panel for managing products and orders, as well as a user-friendly shopping interface for customers.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (register, login, logout)
- Admin panel for managing products and orders
- Product listing and details
- Shopping cart functionality
- Order placement and management
- Payment integration (PayPal)
- Image upload and management
- Responsive design

## Technologies Used

### Frontend
- React
- Redux Toolkit
- React Router
- Axios
- TailwindCSS
- ShadCN UI components

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- PayPal SDK for payments

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Cloudinary account
- PayPal developer account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/teenda-ecommerce.git
   cd teenda-ecommerce
   ```

2. Install dependencies for both client and server:
   ```
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory and add the following:
     ```
     DB_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     PAYPAL_CLIENT_ID=your_paypal_client_id
     PAYPAL_CLIENT_SECRET=your_paypal_client_secret
     ```

4. Start the development servers:
   ```
   # In the client directory
   npm run dev

   # In the server directory
   npm run dev
   ```

## Project Structure
