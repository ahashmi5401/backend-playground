# Project Post Creator

## 📋 Project Overview

A full-stack application for creating and managing posts with image uploads. Built with Express.js (backend) and Vite + React (frontend), featuring ImageKit integration for image storage.

**One-line summary:** A CRUD API for posts with cloud image storage and CORS-enabled frontend-backend communication.

---

## 🏗️ Architecture & Why We Use These Components

### Why Middleware, Controllers, Models & Services?

Instead of putting all logic in one place, we **separate concerns** into layers:

```
Request → Middleware (prepare) → Controller (handle) → Service (process) → Model (database)
```

| Component | Purpose | Example |
|-----------|---------|---------|
| **Middleware** | Intercept & modify requests before reaching controller | Parse JSON, validate CORS, upload files |
| **Controller** | Handle business logic, call services, send responses | Validate input, call uploadFile, save to DB |
| **Service** | Perform specific tasks (external APIs, complex logic) | Upload to ImageKit, process data |
| **Model** | Define database schema & structure | Post schema with caption & image fields |

**Benefits:**
- ✅ **Reusable** - Share middleware across routes
- ✅ **Testable** - Test each layer independently
- ✅ **Maintainable** - Easy to find and fix bugs
- ✅ **Scalable** - Add new features without breaking existing code

---

## 🔄 Middleware Explained

### What is Middleware?

Middleware is a **function that runs BEFORE your controller** processes a request. It can:
- ✅ Modify the request object (add data to it)
- ✅ Modify the response object
- ✅ Block/reject requests
- ✅ Pass control to the next middleware using `next()`

### Middleware Flow Diagram

```
Client Request
    ↓
Middleware 1 (Express JSON Parser)
    ↓
Middleware 2 (CORS)
    ↓
Middleware 3 (Multer - File Upload)
    ↓
Controller (createPost / getAllPosts)
    ↓
Service (ImageKit Upload)
    ↓
Model (Save to MongoDB)
    ↓
Response to Client
```

### Your Project's Middleware

#### 1. **Express JSON Middleware** (`app.use(express.json())`)
```javascript
// In app.js
app.use(express.json());
```
**What it does:** Parses incoming JSON data from request body into `req.body`

**Example:**
```javascript
// Without middleware: req.body = undefined
// With middleware: req.body = { caption: "Hello World" }
```

---

#### 2. **CORS Middleware** (`middleware/cors.js`)
```javascript
const cors = require('cors');

const corsOption = {
    origin: 'http://localhost:5173',  // Allow only this frontend URL
    methods: ['GET', 'PATCH', 'DELETE', 'PUT', 'POST'],
    credentials: true  // Allow cookies
};

const corsMiddleware = cors(corsOption);
module.exports = corsMiddleware;
```

**What it does:** Allows/blocks requests from different domains

**Why you need it:**
- Frontend runs on `localhost:5173` (Vite)
- Backend runs on `localhost:3000`
- Browsers block cross-domain requests by default (CORS policy)
- This middleware tells the browser: "It's OK to let frontend talk to backend"

**How to use:**
```javascript
app.use(corsMiddleware);  // Apply to all routes
```

---

#### 3. **Multer Middleware** (`middleware/multer.js`)
```javascript
const multer = require('multer');

const upload = multer({ 
    storage: multer.memoryStorage()  // Store file in RAM, not disk
});

module.exports = upload;
```

**What it does:** Handles file uploads from `form-data` requests

**Why you need it:**
- Express can't parse `form-data` (files) by default
- Multer intercepts file data and puts it in `req.file`

**How to use:**
```javascript
app.post('/create-post', upload.single("image"), createPost);
//                       ^^^^^^^^^^^^^^^^^^^^^^
//                       Middleware applies here first
```

**In your controller:**
```javascript
const image = await uploadFile(req.file.buffer);  // Now req.file exists!
```

---

## 📸 ImageKit Integration - Full Details

### What is ImageKit?

ImageKit is a **cloud storage service** for images. Instead of saving images to your server (wastes storage), you upload them to ImageKit's servers and get a URL back.

**Benefits:**
- 💾 Save server storage space
- ⚡ Images load faster (CDN)
- 🛡️ Automatic optimization & security
- 🌍 Global distribution

### Setup Steps

#### 1. Create ImageKit Account
- Go to [imagekit.io](https://imagekit.io)
- Sign up & get your credentials:
  - **Private Key** (keep secret)
  - **Public Key** (safe to share)
  - **URL Endpoint** (your domain)

#### 2. Install Package
```bash
npm install @imagekit/nodejs
```

#### 3. Create `.env` File
```env
IMAGEKIT_PRIVATE_KEY=your_private_key_here
MONGO_URI=your_mongodb_connection_string
```

#### 4. Add to Service (`src/services/storage.service.js`)
```javascript
const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),  // Convert to base64
        fileName: "image.jpg"
    });
    return result;  // Returns { url, fileId, ... }
}

module.exports = uploadFile;
```

#### 5. How It Works in Your App

```javascript
// User uploads image → Multer stores in req.file.buffer
// Controller calls uploadFile(req.file.buffer)
// → ImageKit uploads to cloud
// → Returns image URL
// → Controller saves URL to MongoDB (not the image itself!)
```

**Example Flow:**
```javascript
// User sends: POST /create-post
// - caption: "My first post"
// - image: [file data]

// Middleware (Multer) processes file → req.file.buffer
// Controller receives request
// → uploadFile(req.file.buffer) → returns { url: "https://imagekit.io/..." }
// → Save to DB: { caption: "My first post", image: "https://imagekit.io/..." }
// → Send back to frontend
```

---

## 📁 Project Structure

```
project-post-creator/
├── backend/
│   ├── server.js                 # Entry point, starts Express
│   ├── package.json              # Dependencies
│   ├── .env                       # Environment variables (create this)
│   └── src/
│       ├── app.js                # Express app setup, routes, middleware
│       ├── controller/
│       │   └── post.controller.js # Handles POST /create-post, GET /posts
│       ├── middleware/
│       │   ├── cors.js            # CORS middleware
│       │   └── multer.js          # File upload middleware
│       ├── models/
│       │   └── posts.model.js     # MongoDB schema for posts
│       ├── services/
│       │   └── storage.service.js # ImageKit upload logic
│       └── db/
│           └── db.js              # MongoDB connection
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx               # React component
        └── main.jsx              # Entry point
```

---

## 🚀 Getting Started

### Backend Setup

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Create .env file
# Add:
IMAGEKIT_PRIVATE_KEY=your_key_here
MONGO_URI=mongodb_connection_string

# 3. Start server
npm run start:dev
```

The server runs on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

The frontend runs on `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create-post` | Create a new post (with image) |
| GET | `/posts` | Fetch all posts |

### Example: Create Post

```javascript
// Frontend (JavaScript)
const formData = new FormData();
formData.append('caption', 'Hello World');
formData.append('image', fileInput.files[0]);

const response = await fetch('http://localhost:3000/create-post', {
    method: 'POST',
    body: formData  // Note: no Content-Type header!
});

const data = await response.json();
console.log(data);  // { message: "...", post: { caption, image } }
```

---

## 🔧 How Middleware Works Step-by-Step

### When you make a POST request:

```
1. Browser sends: POST /create-post
   └─ Headers: Content-Type: multipart/form-data
   └─ Body: caption + file

2. Server receives request
   └─ Middleware #1: express.json()
      └─ Checks if JSON → No, skip
      
   └─ Middleware #2: CORS
      └─ Checks if origin is allowed
      └─ YES (localhost:5173 is in corsOption.origin)
      └─ Adds CORS headers to response
      
   └─ Middleware #3: multer
      └─ Checks if multipart/form-data
      └─ YES
      └─ Extracts file from body
      └─ Stores in memory as req.file.buffer
      
3. Controller receives modified request
   └─ req.body = { caption: "Hello World" }
   └─ req.file = { buffer: <file data>, ... }
   └─ Calls uploadFile(req.file.buffer)
   
4. Service processes
   └─ Uploads file to ImageKit
   └─ Gets back { url: "https://..." }
   
5. Controller continues
   └─ Saves post to MongoDB
   └─ Sends response to frontend
```

---

## ⚠️ Common Issues & Fixes

### Issue: "CORS policy blocked"
```javascript
// Make sure CORS middleware is BEFORE routes
app.use(corsMiddleware);  // ✅ Correct
app.post('/create-post', createPost);

// Not this:
app.post('/create-post', createPost);
app.use(corsMiddleware);  // ❌ Wrong, too late
```

### Issue: "req.file is undefined"
```javascript
// Make sure multer middleware is on the route
app.post('/create-post', upload.single("image"), createPost);
//                       ^^^^^^^^^^^^^^^^^^^^^^^^^
//                       This must match the field name in form

// Frontend must send:
formData.append('image', file);  // Field name must be 'image'
```

### Issue: "IMAGEKIT_PRIVATE_KEY not found"
```javascript
// Make sure .env file exists and is loaded
require('dotenv').config();  // Must be at top of server.js
console.log(process.env.IMAGEKIT_PRIVATE_KEY);  // Should print key, not undefined
```

---

## 🎯 Summary

| Layer | Purpose | File |
|-------|---------|------|
| **Middleware** | Prepare/modify requests | `cors.js`, `multer.js` |
| **Controller** | Business logic & responses | `post.controller.js` |
| **Service** | External operations | `storage.service.js` |
| **Model** | Database schema | `posts.model.js` |

**Request Journey:**
```
CORS Check → Parse JSON → Extract File → Controller → ImageKit Upload → MongoDB Save → Response
```

---

## 📚 Dependencies Used

- **express**: Web framework
- **mongoose**: MongoDB connection & schemas
- **multer**: File upload handling
- **cors**: Cross-origin requests
- **@imagekit/nodejs**: Cloud image storage
- **dotenv**: Environment variables
- **nodemon**: Auto-reload on file changes

---

## 🔐 Security Tips

1. ✅ Never commit `.env` file (add to `.gitignore`)
2. ✅ Use environment variables for sensitive data
3. ✅ Validate file sizes before upload
4. ✅ Check file types (only allow images)
5. ✅ Use HTTPS in production

---

**Created:** 2025 | **Framework:** Express.js + MongoDB + ImageKit
