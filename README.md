# SimpleLoginRegister

A full-stack authentication app built with **React (Vite)** on the frontend and **Node.js + Express + MongoDB** on the backend. Features include user registration, login, token-based authentication, and protected routes.

---

## 🌐 Live Demo
Coming soon!

---

## 🚀 Tech Stack

**Frontend**
- React + Vite
- React Router DOM
- Axios
- React Toastify
- Bootstrap 5
- dotenv

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- dotenv for config management

---

## 📁 Folder Structure

```
SimpleLoginRegister/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/CoderMohib/SimpleLoginRegister.git
cd SimpleLoginRegister
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `/frontend`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

## 🔐 Features

- User registration and login
- JWT-based authentication and token storage
- Axios interceptors for handling 401 errors
- Protected routes using `react-router-dom`
- Notifications via `react-toastify`
- Styling with Bootstrap 5

---

## 📦 .gitignore

```gitignore
# Node modules
backend/node_modules/
frontend/node_modules/

# Build outputs
frontend/dist/

# Env files
backend/.env
frontend/.env

# Logs and cache
*.log
.vscode/
```

---

## 🧪 Coming Soon

- Token refresh system  
- Logout from all devices  
- Role-based access control  

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙋‍♂️ Author

- GitHub: [@CoderMohib](https://github.com/CoderMohib)