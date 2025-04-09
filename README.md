
# MochaGo ☕ - Full Stack Café Management Web App

Welcome to the MochaGo group project! This is a full-stack web application built with **React (Vite)** for the frontend and **Node.js + Express + MySQL** for the backend.

---

## 🚀 Local Setup Guide

> Follow these steps to run the MochaGo app on your local device.

### ✅ Prerequisites

- Node.js (v18 or higher)
- MySQL Server (running locally)
- Git
- Terminal or Command Prompt

---

## 1. Clone the Repository

```bash
git clone git@github.com:Natanf002/MochaGo.git
cd MochaGo
```

---

## 2. Backend Setup (Express API)

```bash
cd server
npm install
cp .env.example .env
```

### Edit `.env` file with your local MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=mochago
PORT=5050
JWT_SECRET=super_secret_key
```

### Make sure you have the `mochago` MySQL database and `users` table created.

Start the backend server:

```bash
npm run dev
```

> The backend will run on `http://localhost:5050`

---

## 3. Frontend Setup (React + Vite)

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

> The frontend will run on `http://localhost:5173`

---

## 4. Testing the App

- Visit `http://localhost:5173` in your browser
- Sign up with your name, email, and password
- Log in to access protected pages like Checkout, Settings, Orders, etc.

You can also view authentication tokens in **DevTools → Application → Local Storage**.

---

## 📁 Project Structure

```
MochaGo/
├── client/          # React Frontend
├── server/          # Express Backend
├── README.md
```

---

## 📣 Contributors

- Tal – Project Manager / Frontend (React)
- Natan – Backend Developer (Node.js, MySQL)
- Joseph – QA Engineer / Full Stack

---

Happy coding! ☕💻
