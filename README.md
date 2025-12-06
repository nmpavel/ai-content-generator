# ai-content-generator
# AI-Powered Content Generator & Management System

## Project Overview

This project is a **full-stack web application** that allows users to generate, manage, and track AI-powered content in real-time. Users can submit prompts to generate different types of content such as blog posts, captions, or product descriptions. The content generation is powered by **Google Gemini AI**. Jobs are queued with **BullMQ + Redis** for delayed execution, and users receive **real-time status updates via WebSockets (Socket.IO)**.

Key features:

- User authentication (JWT-based) and secure content management.
- Smart AI content generation using Google Gemini API.
- Delayed job execution (1-minute delay) using Redis + BullMQ.
- Real-time job status updates via WebSockets.
- Content CRUD operations with MongoDB.
- Dashboard showing recent content and quick stats.

---

## Tech Stack Used

**Frontend:**

- Next.js (React + TypeScript)
- Tailwind CSS
- Zustand (state management)
- js-cookie (for authentication tokens)

**Backend:**

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- Redis + BullMQ (queue)
- JWT Authentication
- Google Gemini API (AI content generation)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-content-generator.git
cd ai-content-generator/backend
```
### 2. Install backend dependencies
```bash
npm install
```
### 3. Create .env file
```bash
MONGO_URI=
JWT_SECRET=
PORT=
GEMINI_API_KEY=
REDIS_URL =
```
### 4. Run the backend server
```bash
npx ts-node src/server.ts
```
### 5. Run the worker process
```bash
npx ts-node src/lib/content.worker.ts
```
### 5. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```
Open your browser at http://localhost:3000.


## API Documentation


Authentication

Method	Endpoint	Body	Description

POST	/api/auth/register	{ name, email, password }	Register new user

POST	/api/auth/login	{ email, password }	Login user and get JWT

Content Management

Method	Endpoint	Body / Params	Description

POST	/api/content/generate	{ prompt, type }	Queue a new AI content generation job

GET	/api/content	?status= (optional)	Get all user content or filter by status

GET	/api/content/:id		Get content by ID

PUT	/api/content/:id	{ title, prompt, type }	Update content by ID

DELETE	/api/content/:id		Delete content by ID

GET	/api/content/:id/status		Get job status by Job ID

GET	/api/content/stats		Get count of content grouped by type

## Architectural Decisions

AI Model:

We chose Google Gemini API for content generation because it is robust, provides high-quality natural language generation, and has a free tier for testing.

Queue System:

BullMQ + Redis handles delayed execution (1-minute delay) for content generation, keeping API endpoints non-blocking.

Worker Process:

A separate Node.js worker monitors the queue and executes the AI call, decoupling request handling from heavy processing.

Database:

MongoDB + Mongoose stores user content and AI-generated text.

Tracks status: queued, processing, done, failed.

Frontend State Management:

Zustand is used for authentication and real-time content updates.

Security:

JWT authentication protects API endpoints.
