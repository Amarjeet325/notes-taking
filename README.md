# 🔐 MERN OTP Authentication App

A full-stack OTP-based authentication system built using the **MERN** stack (MongoDB, Express, React, Node.js). Users can sign up with their name, DOB, and email, receive an OTP, verify it, and access a protected dashboard.

---

## 🚀 Features

- 🔐 OTP-based signup & login
- ✅ Email verification
- 🧾 JWT-based session authentication
- 🌐 Responsive React frontend
- 📦 MongoDB for user storage
- 📧 Nodemailer for email delivery

---

## 🧩 Tech Stack

| Layer       | Technology                |
|------------|---------------------------|
| Frontend    | React, React Router, Tailwind CSS / Custom CSS |
| Backend     | Node.js, Express.js       |
| Database    | MongoDB, Mongoose         |
| Email       | Nodemailer (Gmail SMTP)   |
| Auth        | JWT (JSON Web Tokens)     |

---

## 📁 Folder Structure
```
otp-auth-app/
│
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/ # Images
│ │ ├── components/
│ │ │ ├── Dashboard.jsx
│ │ │ └── VerifyOtp.jsx
│ │ ├── pages/
│ │ │ ├── Signup.jsx
│ │ │ └── Login.jsx
│ │ ├── styles/
│ │ │ ├── Signup.css
│ │ │ ├── VerifyOtp.css
│ │ │ └── Dashboard.css
│ │ ├── utils/
│ │ │ └── index.js # toast utils
│ │ └── App.jsx
│ └── package.json
│
├── server/ # Node.js backend
│ ├── controllers/
│ │ └── authController.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ └── auth.js
│ ├── utils/
│ │ └── sendMail.js
│ ├── config/
│ │ └── db.js
│ ├── .env
│ ├── server.js
│ └── package.json
│
└── README.md
```
yaml
Copy
Edit

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory:

```env


PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

```

 ## 🛠️ Setup Instructions

1. Clone the Repo
```bash
Copy
Edit
git clone https://github.com/your-username/otp-auth-app.git
cd otp-auth-app
```

2. Install Backend Dependencies
``` bash
Copy
Edit
cd server
npm install
```
3. Start Backend Server
```bash
Copy
Edit
nodemon server.js
```
# or
npm start
4. Install Frontend Dependencies
```bash
Copy
Edit
cd ../client
npm install
```
5. Start React App
```bash
Copy
Edit
npm run dev
# OR if using CRA:
npm start
```
