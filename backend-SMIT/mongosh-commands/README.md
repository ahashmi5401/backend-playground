Here is a clean, structured `README.md` file based on your commands. It uses a clean, high-contrast style that focuses entirely on practical utility.

You can copy and paste this text directly into a file named `README.md` in your project folder.

---

```markdown
# MongoDB Cheat Sheet for Beginners (SQL to MongoDB)

A practical reference guide mapping traditional SQL queries to MongoDB Shell (`mongosh`) CRUD operations.

---

## 🛠️ Database & Collection Setup

```javascript
// 1. List all databases
show dbs;

// 2. Switch to (or create) database 'personal'
use personal;

// 3. Manually create a collection named 'students'
db.createCollection("students");

// 4. List all collections in the current database
show collections;

```

> ⚠️ **Note on renaming:** If you run `db.students.renameCollection("student");`, your collection becomes singular. For the rest of this guide, we assume the collection remains plural (`db.students`).

---

## 📥 Create Operations (Insert)

```javascript
// Insert a single document
db.students.insertOne({ 
  name: "ali", 
  city: "karachi", 
  age: 23 
});

// Insert multiple documents at once
db.students.insertMany([
  { name: "ali", city: "karachi", age: 27 },
  { name: "asim", city: "lahore", age: 22 }
]);

```

---

## 🔍 Read Operations (Find & Filter)

### 1. Select All Records

* **SQL:** `SELECT * FROM students;`
* **MongoDB:**

```javascript
  db.students.find();

```

### 2. Exact Match (WHERE)

* **SQL:** `SELECT * FROM students WHERE city = 'Karachi';`
* **MongoDB:**

```javascript
  db.students.find({ city: "Karachi" });

```

### 3. Logical AND

* **SQL:** `SELECT * FROM students WHERE name = 'ali' AND age = 21;`
* **MongoDB:** *(Comma separated fields imply an AND condition)*

```javascript
  db.students.find({ name: "ali", age: 21 });

```

### 4. Logical OR

* **SQL:** `SELECT * FROM students WHERE city = 'Karachi' OR city = 'Lahore';`
* **MongoDB:**

```javascript
  db.students.find({
    $or: [
      { city: "karachi" },
      { city: "lahore" }
    ]
  });

```

### 5. IN Operator

* **SQL:** `SELECT * FROM students WHERE id IN (101, 102, 103);`
* **MongoDB:**

```javascript
  db.students.find({ _id: { $in: [101, 102, 103] } });

```

### 6. Not Equal Operator (`!=` or `<>`)

* **SQL:** `SELECT * FROM students WHERE city <> 'Karachi';`
* **MongoDB:**

```javascript
  db.students.find({ city: { $ne: "karachi" } });

```

### 7. Comparison Operators (`>` and `<=`)

* **SQL:** `SELECT * FROM students WHERE age > 20;`
* **MongoDB:**

```javascript
  db.students.find({ age: { $gt: 20 } });

```

* **SQL:** `SELECT * FROM students WHERE age <= 21;`
* **MongoDB:**

```javascript
  db.students.find({ age: { $lte: 21 } });

```

### 8. Pattern Matching (LIKE)

* **SQL:** `SELECT * FROM students WHERE name LIKE 'A%';` *(Starts with 'A')*
* **MongoDB:** *(Uses Regular Expressions. Append `i` for case-insensitivity)*

```javascript
  db.students.find({ name: /^a/i });

```

---

## 📊 Sorting, Limiting, & Counting

### 1. Sort Records

* **SQL:** `SELECT * FROM students ORDER BY name ASC;`
* **MongoDB:** *(Use `1` for Ascending, `-1` for Descending)*

```javascript
  db.students.find().sort({ name: 1 });

```

### 2. Limit Records

* **SQL:** `SELECT * FROM students LIMIT 5;`
* **MongoDB:**

```javascript
  db.students.find().limit(5);

```

### 3. Count Documents

* **SQL:** `SELECT COUNT(*) FROM students;`
* **MongoDB:**

```javascript
  db.students.countDocuments();

```

---

## ✏️ Update Operations

* **SQL:** `UPDATE students SET city = 'Lahore' WHERE id = 101;`
* **MongoDB:** *(The `$set` operator ensures only the specified fields are modified)*

```javascript
  db.students.updateOne(
    { _id: 101 },
    { $set: { city: "Lahore" } }
  );

```

---

## ❌ Delete & Destructive Operations

```javascript
// 1. Delete the first matching document
db.students.deleteOne({ name: "ali" });

// 2. Wipe an entire collection (Deletes all documents and indexes)
db.students.drop();

// 3. Drop the active database completely
db.dropDatabase();

```

```

```