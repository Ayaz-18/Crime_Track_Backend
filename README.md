# Anonymous Crime Reporting System (Backend)

A secure backend API for an **Anonymous Crime Reporting System** that allows users to report incidents without revealing their identity.
The system ensures anonymity by hashing user emails and storing only hashed identifiers.

Built using **Node.js, Express.js, and MongoDB**.

---

## Features

* User Registration with hashed email
* Secure Authentication using JWT
* Anonymous report submission
* File upload support for evidence
* Priority-based reports (Low, Medium, High)
* Secure user-report relationship
* Protected API routes using authentication middleware

---

## Tech Stack

Backend Framework: Express.js
Runtime Environment: Node.js
Database: MongoDB
ODM: Mongoose
Authentication: JSON Web Tokens (JWT)
File Upload: Multer

---

## Project Structure

```
src/
│
├── controllers/
│   └── Report.controller.js
│
├── middleware/
│   └── auth_user.js
│
├── models/
│   ├── User.model.js
│   └── Report.model.js
│
├── routes/
│   └── report.routes.js
│
├── config/
│   └── db.js
│
└── server.js
```

---

## Installation

Clone the repository

```
git clone https://github.com/yourusername/anonymous-crime-reporting-backend.git
```

Navigate to the project folder

```
cd anonymous-crime-reporting-backend
```

Install dependencies

```
npm install
```

Run the server

```
npm run dev
```

Server will start on

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Create Report

POST `/api/report/create`

Protected route (requires authentication)

Request Body

```
{
  "description": "Garbage not collected for 3 days",
  "location": "Unit 4 Market, Bhubaneswar",
  "priority": "Medium"
}
```

Response

```
{
  "success": true,
  "message": "Report submitted",
  "data": { ...report }
}
```

---

### Get All Reports

GET `/api/report`

Returns all reports sorted by latest.

---

## Authentication Flow

1. User logs in
2. Server generates JWT token
3. Token stored in cookies
4. Middleware verifies token
5. User information is attached to `req.user`

---

## Database Models

### User Model

```
{
  enc_email: String,
  hash_email: String,
  password: String,
  isVerified: Boolean
}
```

### Report Model

```
{
  description: String,
  location: String,
  priority: String,
  file: String,
  createdAt: Date,
  user: ObjectId (ref: User)
}
```

---

## Security Features

* Email hashing for anonymity
* JWT based authentication
* Protected routes
* Input validation
* Secure cookie handling

---

## Future Improvements

* Admin dashboard
* Report status tracking
* Email verification
* Image/video evidence support
* Notification system
* Geo-location based reports

---

## Author

Ayaz

---

## License

This project is licensed under the MIT License.
