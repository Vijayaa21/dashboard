# TaskFlow - Full Stack Task Management Dashboard

A modern, full-stack task management application built with React and Node.js, featuring authentication, CRUD operations, and a sleek dark-themed UI.

![TaskFlow Dashboard](https://img.shields.io/badge/TaskFlow-Dashboard-orange?style=for-the-badge)

---

## ✅ Bonus Features Implemented

| Feature | Status | Description |
|---------|--------|-------------|
| **Docker** | ✅ | Dockerfile & docker-compose.yml for containerized deployment |
| **Unit Tests** | ✅ | Jest + Supertest with MongoDB Memory Server (25+ test cases) |
| **Refresh Tokens** | ✅ | Secure httpOnly cookie-based refresh token rotation |
| **Pagination** | ✅ | Server-side pagination with page, limit, total, pages |
| **Rate Limiting** | ✅ | express-rate-limit on all API routes (100 req/15min, 10 for auth) |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 7** - Build tool & dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Animations
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with refresh token interceptor
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 7.6** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Access + Refresh token authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - API rate limiting
- **cookie-parser** - Secure httpOnly cookie handling
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger

### Testing
- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- **MongoDB Memory Server** - In-memory database for tests

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

---

## 📁 Project Structure

```
dashboard/
├── backend/
│   ├── src/
│   │   ├── config/         # Database & environment config
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Helper functions
│   │   └── index.js        # Entry point
│   ├── docker/             # Docker initialization scripts
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+ 
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/taskflow-dashboard.git
cd taskflow-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/taskflow

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

The frontend is pre-configured to proxy API requests to `http://localhost:5000`.

### 4. Database Setup

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod --dbpath /path/to/data
```

**Option B: MongoDB Atlas**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

**Option C: Docker (Recommended)**
```bash
cd backend
docker-compose up -d
```
This starts MongoDB on port 27017 with automatic initialization.

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Using Docker
```bash
cd backend
docker-compose up --build
```

### Running Tests
```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

**Test Suites Include:**
- **Auth Tests:** User registration, login, token refresh, logout, protected routes
- **Task Tests:** CRUD operations, pagination, filtering, authorization

---

## 🔐 Demo Credentials

You can register new accounts or use these seed steps:

### Create Demo Users via API

```bash
# User 1 - Admin
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'

# User 2 - Regular User
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Smith", "email": "jane@example.com", "password": "password123"}'

# User 3 - Test User
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "test1234"}'
```

### Demo Login Credentials
| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password123 |
| test@example.com | test1234 |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/auth/me` | Get current user |
| POST | `/auth/refresh-token` | Refresh access token |
| POST | `/auth/logout` | Logout user |

#### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get user profile |
| PUT | `/users/profile` | Update profile |
| PUT | `/users/change-password` | Change password |

#### Tasks (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks (with filters) |
| POST | `/tasks` | Create new task |
| GET | `/tasks/:id` | Get single task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

### Query Parameters for GET /tasks
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title/description
- `sortBy` - Sort field (createdAt, dueDate, priority)
- `order` - Sort order (asc, desc)

---

## 📬 Postman Collection

Import the following collection into Postman:

```json
{
  "info": {
    "name": "TaskFlow API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api/v1"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/register",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"password\": \"password123\"}"
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/login",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\"email\": \"john@example.com\", \"password\": \"password123\"}"
            }
          },
          "event": [{
            "listen": "test",
            "script": {
              "exec": ["pm.collectionVariables.set('token', pm.response.json().data.token);"]
            }
          }]
        },
        {
          "name": "Get Current User",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/auth/me",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}]
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/tasks",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}]
          }
        },
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/tasks",
            "header": [
              {"key": "Content-Type", "value": "application/json"},
              {"key": "Authorization", "value": "Bearer {{token}}"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"title\": \"New Task\", \"description\": \"Task description\", \"priority\": \"high\", \"status\": \"pending\", \"dueDate\": \"2026-02-15\"}"
            }
          }
        },
        {
          "name": "Update Task",
          "request": {
            "method": "PUT",
            "url": "{{baseUrl}}/tasks/:id",
            "header": [
              {"key": "Content-Type", "value": "application/json"},
              {"key": "Authorization", "value": "Bearer {{token}}"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\"status\": \"completed\"}"
            }
          }
        },
        {
          "name": "Delete Task",
          "request": {
            "method": "DELETE",
            "url": "{{baseUrl}}/tasks/:id",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}]
          }
        }
      ]
    }
  ]
}
```

Save as `TaskFlow.postman_collection.json` and import into Postman.

---

## 🚀 Scaling for Production

To scale this application for production deployment, consider the following strategies:

1. **Deployment**: Deploy backend on AWS EC2/ECS or Railway/Render with auto-scaling. Host frontend on Vercel/Netlify with CDN. Use Docker containers with Kubernetes for orchestration at scale.

2. **CORS & Security**: Configure strict CORS policies with whitelisted origins. Implement rate limiting (express-rate-limit), HTTPS enforcement, and security headers via Helmet. Add CSRF protection and input sanitization.

3. **Environment Management**: Use environment-specific configs (development, staging, production). Store secrets in AWS Secrets Manager, HashiCorp Vault, or platform env vars. Never commit `.env` files.

4. **Database Optimization**: Add compound indexes on frequently queried fields (`userId + status`, `userId + createdAt`). Enable MongoDB Atlas with replica sets for high availability. Implement connection pooling and read replicas.

5. **Caching Strategy**: Add Redis for session storage and API response caching. Implement cache invalidation on data mutations. Use CDN caching for static assets with proper cache headers.

6. **Monitoring & Logging**: Integrate APM tools (DataDog, New Relic). Centralize logs with ELK Stack or CloudWatch. Set up health checks, uptime monitoring, and alerting.

7. **Performance**: Implement pagination (already done), lazy loading, and API response compression. Consider GraphQL for complex data fetching. Add service workers for offline support.

---

## 📄 License

MIT License - feel free to use this project for learning or production purposes.

---

## 👨‍💻 Author

Built with ❤️ for the Frontend Developer Intern Shortlisting Assignment.
