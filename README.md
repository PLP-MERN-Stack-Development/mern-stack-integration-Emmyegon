# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Ensure Node.js (v18+) and MongoDB are installed and running
2. Create environment files from the provided examples
    - `server/.env` (copy from `server/.env.example`)
    - `client/.env` (copy from `client/.env.example`)
3. Install dependencies
    - In `server`: `npm install`
    - In `client`: `npm install`
4. Run development servers in two terminals
    - In `server`: `npm run dev`
    - In `client`: `npm run dev`
5. Open the client at http://localhost:5173 (Vite proxy forwards API to http://localhost:5000)

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Setup & Run

1. Server configuration (`server/.env`):
   - `PORT=5000`
   - `MONGODB_URI=mongodb://localhost:27017/mern_blog`
   - `JWT_SECRET=change_this_secret`
   - `CLIENT_ORIGIN=http://localhost:5173`
2. Client configuration (`client/.env`):
   - `VITE_API_BASE=/api`
   - `VITE_SERVER_ORIGIN=http://localhost:5000`
3. Start servers:
   - Server: `npm run dev` (nodemon)
   - Client: `npm run dev` (Vite)

## API Endpoints

- Auth
  - POST `/api/auth/register`
  - POST `/api/auth/login`
- Posts
  - GET `/api/posts`
  - GET `/api/posts/:id`
  - POST `/api/posts` (Bearer token required; multipart for `image`)
  - PUT `/api/posts/:id` (Bearer token required; multipart for `image`)
  - DELETE `/api/posts/:id` (Bearer token required)
- Categories
  - GET `/api/categories`
  - POST `/api/categories`

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 