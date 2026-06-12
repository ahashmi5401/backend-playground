# Express Middleware

## What is Middleware?

Middleware in Express is a function that runs **between the request and response cycle**.

It has access to:
- `req` → request object
- `res` → response object  
- `next` → moves control to the next middleware

```text
Request → Middleware → Route Handler → Response
```

---

## Types of Middleware

| Type | Description |
|---|---|
| **Built-in** | Provided by Express itself |
| **Third-party** | Installed via npm |
| **Custom** | Created by developer for specific logic |

---

## Common Middleware Reference

| Middleware | Type | Purpose |
|---|---|---|
| `express.json()` | Built-in | Parses incoming JSON request body |
| `express.urlencoded()` | Built-in | Parses form data (URL-encoded) |
| `morgan` | Third-party | Logs HTTP requests |
| `cors` | Third-party | Allows cross-origin requests |
| `helmet` | Third-party | Adds security HTTP headers |
| `cookie-parser` | Third-party | Parses cookies from requests |
| `express-session` | Third-party | Manages user sessions |
| `express-rate-limit` | Third-party | Limits requests per IP |
| `multer` | Third-party | Handles file uploads |
| `compression` | Third-party | Compresses HTTP responses |
| `express-validator` | Third-party | Validates incoming request data |
| `passport` | Third-party | Authentication (JWT, OAuth) |

---

## Request Flow

```text
Client Request
      ↓
Middleware 1 (e.g. cors)
      ↓
Middleware 2 (e.g. express.json)
      ↓
Middleware 3 (e.g. auth check)
      ↓
Route Handler
      ↓
Response
```

---

## Golden Rule

Every middleware **must** do one of two things:

```javascript
next()        // ✅ Pass control to next middleware
res.send()    // ✅ End the request with a response
// Neither   // ❌ Request will hang forever!
```

---

## Common Use Cases

- Logging requests
- Parsing request bodies
- Authentication & authorization
- Input validation
- Error handling
- Security improvements
- Rate limiting
- File uploads

---

## Quick Summary

> Express middleware is the **core building block of backend logic**.
> Almost every request passes through multiple middleware before reaching the final route handler.