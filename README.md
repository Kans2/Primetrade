# ⭐ Frontend Developer Intern Assignment – Kannan S S K ⭐

## 🚀 Project Overview
This is a **scalable web application** built as part of the **Frontend Developer Intern assignment**.  
It demonstrates modern frontend and backend practices, including **authentication, CRUD operations**, and a **responsive dashboard**.

- **Frontend:** React.js + Material UI  
- **Backend:** Node.js + Express + MongoDB  
- **Authentication:** JWT-based with password hashing (bcrypt)  
- **Deployment:** [Live Demo Link]

---

## ✨ Features

### 🖥 Frontend
- Responsive design using Material UI  
- User registration & login  
- Protected routes for dashboard access  
- Forms with client-side validation  

### ⚙️ Backend
- Node.js + Express APIs  
- JWT-based authentication  
- Password hashing using bcrypt  
- CRUD operations on a sample entity (Tasks/Posts)  
- Profile fetching & updating  
- Connected to MongoDB  

### 📊 Dashboard
- Display user profile  
- CRUD operations on tasks/posts  
- Search and filter functionality  
- Logout flow  

### 🔒 Security & Scalability
- Password hashing (bcrypt)  
- JWT authentication middleware  
- Error handling & validation  
- Modular project structure for easy scaling  

---

## 🛠 Tech Stack

| Frontend       | Backend   | Database  |
|----------------|-----------|-----------|
| React.js       | Node.js   | MongoDB   |
| Material UI    | Express   | Mongoose  |
| React Router   | JWT       | -         |
| React Hook Form| bcrypt    | -         |

---

## ⚡ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/assignment-frontend-backend.git
cd assignment-frontend-backend
```

---
### 2️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in your environment variables (MongoDB URI, JWT_SECRET)
npm run dev
```
---
### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```
---

### 📝 How to Use

1.Register a new user or login with existing credentials.

2.Access the dashboard to create, read, update, and delete tasks/posts.

3.Profile page allows updating user info.

4.Logout to end the session securely.

---

### 📈 Scaling Notes
1.Frontend: Modularize with feature-based folders and lazy-loading routes for large-scale apps.

2.Backend: Structured API routes; can add service/middleware layers for microservices.

3.Database: MongoDB can be scaled with clusters for high traffic.

4.Authentication: JWT can be rotated and stored in HTTP-only cookies for production security.

### 🌐 Live Demo
Production - https://primetrade-c9st.onrender.com/


### Author
Kannan s.





