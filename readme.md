# SkillSnap

## Overview

SkillSnap is a full-stack skill-sharing platform where users can learn, teach, and collaborate through educational videos. The platform allows creators to upload free and premium video tutorials while learners can watch videos, earn credits by completing them, and use those credits to unlock premium content. Users can also request new learning topics, vote on community requests, and manage their own profiles.

The project is built using the MERN stack with React, TypeScript, Express.js, MongoDB, JWT Authentication, and Cloudinary for media storage.

---

# Features

## Authentication

* User Registration
* User Login
* Secure JWT Authentication
* HTTP-only Cookie Authentication
* Protected Routes
* Automatic Login Persistence
* Logout

---

## User Management

* View Profile
* Update Profile Avatar
* View Uploaded Videos
* Earn Credits
* Unlock Premium Videos
* Logout Securely

---

## Video Management

* Upload Videos
* Upload Thumbnails
* Categorize Videos
* Watch Free Videos
* Unlock Premium Videos
* Track Video Completion
* Earn Credits After Completion
* Display Related Videos
* Search Videos

---

## Premium System

* Premium videos remain locked until unlocked.
* Users unlock videos using earned credits.
* Once unlocked, a video remains permanently available for that user.
* Credits are automatically deducted after a successful unlock.

---

## Credit System

* Users receive credits after completing eligible videos.
* Credits can only be earned once per video.
* Credits are stored in the user's account.
* Credits are used to unlock premium content.

---

## Skill Request System

Users can:

* Create skill requests
* Delete their own requests
* Upvote requests
* Downvote requests

Voting Rules

* One vote per user
* A user cannot vote twice
* A user cannot both upvote and downvote the same request
* Only the creator can delete their request

---

## Search

* Search videos by title.
* If no matching videos are found, all available videos are displayed.

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* React Icons
* React Hot Toast

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cookie Parser
* Multer
* Cloudinary
* bcrypt
* dotenv
* CORS

---

# External Services

## MongoDB Atlas

Used as the primary database for storing users, videos, skill requests, and application data.

---

## Cloudinary

Used to store:

* User avatars
* Video thumbnails
* Uploaded videos

Media URLs are stored inside MongoDB while the files themselves are stored in Cloudinary.

---

# Project Structure

## Backend

```text
backend/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── config/
├── constants/
├── public/
├── app.js
└── server.js
```

---

## Frontend

```text
frontend/
│
├── src/
│   ├── components/
│   ├── Context/
│   ├── Routes/
│   ├── assets/
│   ├── App.tsx
│   └── main.tsx
```

---

# Installation

## Clone the Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Start the backend server.

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGODB_URI=

ACCESS_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=

REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

CORS_ORIGIN=http://localhost:5173
```

---

## Optional Frontend Environment

Although the current project uses hardcoded API URLs, creating a frontend environment file is recommended.

```env
VITE_API_URL=http://localhost:3000/api
```

Replace API URLs such as

```ts
http://localhost:3000/api
```

with

```ts
import.meta.env.VITE_API_URL
```

This makes switching between development and production environments much easier.

---

# Backend API Routes

## Authentication

| Method | Route                | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| POST   | `/api/auth/logout`   | Logout user         |

---

## User

| Method | Route               | Description                          |
| ------ | ------------------- | ------------------------------------ |
| GET    | `/api/user/me`      | Get logged-in user                   |
| PATCH  | `/api/user/avatar`  | Update avatar                        |
| PATCH  | `/api/user/credits` | Award credits after video completion |

Authentication is required for every user route.

---

## Videos

| Method | Route                   | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/video`            | Get all videos       |
| GET    | `/api/video/:id`        | Get single video     |
| POST   | `/api/video`            | Upload new video     |
| POST   | `/api/video/:id/unlock` | Unlock premium video |

Uploading and unlocking require authentication.

---

## Skill Requests

| Method | Route                             | Description      |
| ------ | --------------------------------- | ---------------- |
| GET    | `/api/skill-request`              | Get all requests |
| POST   | `/api/skill-request`              | Create request   |
| PATCH  | `/api/skill-request/:id/upvote`   | Upvote request   |
| PATCH  | `/api/skill-request/:id/downvote` | Downvote request |
| DELETE | `/api/skill-request/:id`          | Delete request   |

Authentication is required for every write operation.

---

# Frontend Routes

## Public Routes

| Route       | Description  |
| ----------- | ------------ |
| `/`         | Landing Page |
| `/login`    | Login        |
| `/register` | Register     |

If a user is already logged in, the login and register pages automatically redirect to the home page.

---

## Protected Routes

| Route             | Description           |
| ----------------- | --------------------- |
| `/videos`         | Browse free videos    |
| `/premiumvideos`  | Premium video library |
| `/video/:id`      | Video player          |
| `/profile`        | User profile          |
| `/upload-video`   | Upload new video      |
| `/skill-requests` | Community requests    |
| `/search`         | Search videos         |

Protected routes automatically redirect unauthenticated users to the login page.

---

# Authentication Flow

1. A user logs in using valid credentials.
2. The backend validates the credentials.
3. A JWT is generated.
4. The JWT is stored inside an HTTP-only cookie.
5. Axios sends the cookie automatically using `withCredentials: true`.
6. Protected backend routes verify the token before processing requests.
7. User information is fetched through `/api/user/me` and stored locally for rendering the interface.

---

# Video Flow

1. A creator uploads a video.
2. The video, thumbnail, and metadata are uploaded to Cloudinary.
3. Video information is stored inside MongoDB.
4. Users browse the available videos.
5. Users watch videos through the video player.
6. After a video finishes, the frontend notifies the backend.
7. The backend awards credits if the video has not already been rewarded.

---

# Credit System

1. Users complete a video.
2. The frontend sends the completed video's ID to the backend.
3. The backend verifies:

   * the user exists,
   * the video exists,
   * credits have not already been awarded for that video.
4. If eligible, credits are added to the user's account.
5. The completed video's ID is stored to prevent duplicate rewards.

---

# Premium Video Flow

1. A user opens a premium video.
2. If the video is locked, an unlock screen is displayed.
3. The user clicks **Unlock**.
4. The backend verifies that the user has enough credits.
5. Credits are deducted.
6. The video is permanently unlocked for that user.

---

# Skill Request Flow

1. A user creates a request for a new skill.
2. Other users can upvote or downvote the request.
3. Each user can vote only once.
4. Only the creator of the request can delete it.
5. Requests remain visible until removed or managed by the application.

---

# Search Flow

1. All available videos are fetched.
2. Users search by typing a video title.
3. Matching videos are displayed instantly.
4. If there are no matches, all videos are shown again.

---

# Security

The application includes several security measures.

* JWT Authentication
* HTTP-only Cookies
* Password Hashing using bcrypt
* Protected Backend Routes
* Route Guards on the Frontend
* Premium Video Validation
* Credit Validation
* One-Time Credit Rewards
* One Vote Per User
* Ownership Verification Before Deletion

---

# Packages Used

## Frontend

* react
* react-router-dom
* axios
* react-hot-toast
* react-icons
* tailwindcss
* vite
* typescript

---

## Backend

* express
* mongoose
* jsonwebtoken
* bcrypt
* cookie-parser
* cors
* dotenv
* multer
* cloudinary
* fs
* path

---

# Deployment

Recommended deployment services:

Frontend

* Vercel
* Netlify

Backend

* Render
* Railway
* VPS

Database

* MongoDB Atlas

Media Storage

* Cloudinary

---

# Running on Another Laptop

1. Clone the repository.
2. Install backend dependencies using `npm install`.
3. Install frontend dependencies using `npm install`.
4. Create the backend `.env` file using the required variables.
5. Create a MongoDB Atlas database.
6. Create a Cloudinary account and add the credentials to `.env`.
7. Start the backend using `npm run dev`.
8. Start the frontend using `npm run dev`.
9. Open `http://localhost:5173` in your browser.

---

# Future Improvements

Possible future enhancements include:

* Comments
* Likes
* Playlists
* Watch History
* Admin Dashboard
* Notifications
* Email Verification
* Password Reset
* Recommendation System
* Infinite Scrolling
* Pagination
* Analytics Dashboard
* AI-Based Video Recommendations
* Real-Time Notifications
* Better Video Streaming Optimization

---

# Notes

* Start the backend before starting the frontend.
* Ensure MongoDB Atlas is connected before running the backend.
* Cloudinary credentials must be configured correctly.
* `CORS_ORIGIN` must match the frontend URL.
* All authenticated Axios requests must use `withCredentials: true`.
* Browser cookies must be enabled.
* Premium videos require sufficient credits.
* Credits are awarded only once for each completed video.
* Users can vote only once per skill request.
* Only the creator can delete their own request.
* Authentication is enforced on the backend through JWT stored in HTTP-only cookies, while the frontend stores basic user information locally only for rendering purposes.
