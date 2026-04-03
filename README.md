# ZeroTrace

> **Share sensitive information securely — it vanishes after being read.**

ZeroTrace is a **MERN stack web application** built as a learning-focused project to explore **secure secret sharing, encryption, and full-stack development**.

The idea is simple but powerful: you create a secret (password, API key, or private message), share a unique link, and **once view limit is reached, it’s permanently deleted** from the database. 

No history.
No recovery.
No trace. 🕶️


---

## 🚀 Features

- **Create Secrets**  
  Generate a unique, one-time link for sensitive information.
- **One-Time View (Self-Destruct)**  
  The secret is destroyed immediately after being accessed.
- **Encrypted Storage**  
  Secrets are encrypted using **AES encryption**, ensuring even database admins cannot read them.
- **Secure by Design**  
  Helmet, CORS, rate limiting, validation, and secure cookies are implemented.
- **Responsive UI**  
  Fully mobile-friendly interface built with Tailwind CSS.

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Crypto module (AES Encryption)
- Helmet
- CORS
- Rate Limiting
- Joi Validation
- HttpOnly Cookies

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository_url>
cd ZeroTrace
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder (or copy from `.env.example`):
```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_super_secret_jwt_key
ENCRYPTION_KEY=your_encryption_key
ADMIN_PASSWORD=your_admin_password
```
*Note: `ENCRYPTION_KEY` must be exactly 32 characters long.*

Start the backend server:
```bash
npm run dev
```
Server runs at: `http://localhost:5000`

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open in browser: `http://localhost:5173`

---

## 🔌 API Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/secrets` | Create a new secret |
| GET | `/api/secrets/:id` | View & destroy a secret |
| POST | `/api/admin/login` | Admin authentication |
| GET | `/api/admin/stats` | Get active secret count |

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push repository to GitHub
2. Import `frontend` directory in Vercel
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Configure routing if required

### Backend (Render)
1. Create a new Web Service
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add all required environment variables (MONGO_URI, JWT_SECRET, ENCRYPTION_KEY, ADMIN_PASSWORD) in the Render dashboard.

---

## 🙏 Conclusion
ZeroTrace was built to deeply understand backend security, encryption, REST APIs, and frontend–backend integration using the MERN stack.

If you find bugs or have suggestions, feel free to open an issue or contribute.
Thanks for checking it out! 🚀
