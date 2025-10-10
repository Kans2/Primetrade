# Frontend Developer Intern Assignment – Kannan S

## Project Overview
This is a scalable web application built as part of the **Frontend Developer Intern assignment**.  
It demonstrates modern frontend and backend practices, including authentication, CRUD operations, and a responsive dashboard.

**Frontend:** React.js + Material UI  
**Backend:** Node.js + Express + MongoDB  
**Authentication:** JWT-based with password hashing (bcrypt)  
**Deployment:** Render

---

## Features

### Frontend
- Responsive design using Material UI
- User registration & login
- Protected routes for dashboard access
- Forms with client-side validation

### Backend
- Node.js + Express APIs
- JWT-based authentication
- Password hashing using bcrypt
- CRUD operations on a sample entity (Tasks/Posts)
- Profile fetching & updating
- Connected to MongoDB

### Dashboard
- Display user profile
- CRUD operations on tasks/posts
- Search and filter functionality
- Logout flow

### Security & Scalability
- Password hashing (bcrypt)
- JWT authentication middleware
- Error handling & validation
- Modular project structure for easy scaling

---

## Tech Stack
| Frontend | Backend | Database |
|----------|---------|----------|
| React.js | Node.js | MongoDB |
| Material UI | Express | Mongoose |
| React Router | JWT | - |
| React Hook Form | bcrypt | - |

---

## Installation

### Clone the repository
```bash
git clone https://github.com/your-username/assignment-frontend-backend.git
cd Primetrade
```


---

## Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Fill in your environment variables (MongoDB URI, JWT_SECRET)
npm run dev
```
---
## Frontend Setup
```bash
cd client
npm install
npm run dev
``
---

## How to Use

Register a new user or login with existing credentials.

Access the dashboard to create, read, update, and delete tasks/posts.

Profile page allows updating user info.

Logout to end the session securely.
---

## Live Demo
https://primetrade-c9st.onrender.com/

## Author
Kannan S 



