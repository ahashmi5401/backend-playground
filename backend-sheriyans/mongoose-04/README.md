# Mongoose-04: Notes API

Simple REST API for CRUD operations on notes using **Express.js** and **MongoDB** with **Mongoose** ODM.

---

## 📁 Files Overview

| File | Purpose |
|------|---------|
| **package.json** | Dependencies (express, mongoose) and project metadata |
| **server.js** | Entry point - connects to DB and starts server on port 3000 |
| **src/app.js** | Express routes and CRUD API endpoints |
| **src/db/db.js** | MongoDB Atlas connection logic |
| **src/model/notes.model.js** | Mongoose schema and Note model |

---

## 🎯 Why noteModel?

The `noteModel` defines:
- **Structure:** Schema with `title` and `description` fields
- **Validation:** Ensures data consistency before storing in DB
- **CRUD Methods:** Provides `create()`, `find()`, `findOneAndUpdate()`, `findOneAndDelete()`
- **Separation:** Isolates data logic from API routes

---

## 🔌 CRUD API Endpoints

| Operation | Method | Endpoint | Mongoose Function | Purpose |
|-----------|--------|----------|-------------------|---------|
| **Create** | POST | `/note` | `noteModel.create()` | Add new note to DB |
| **Read** | GET | `/note` | `noteModel.find()` | Fetch all notes from DB |
| **Update** | PATCH | `/note/:id` | `noteModel.findOneAndUpdate()` | Update note by ID |
| **Delete** | DELETE | `/note/:id` | `noteModel.findOneAndDelete()` | Delete note by ID |

---

## 🔑 Mongoose Methods Explained

- **`create()`** - Creates and saves a new document
- **`find()`** - Returns array of all documents
- **`findOneAndUpdate()`** - Finds document, updates it, returns updated document
- **`findOneAndDelete()`** - Finds document, deletes it, returns deleted document

---

## ⚙️ Middleware

**`app.use(express.json())`** - Parses JSON request bodies for POST and PATCH requests