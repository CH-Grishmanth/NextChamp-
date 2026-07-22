# NextChamp Full-Stack React & Express Monorepo

This directory contains the production-ready React frontend and Express backend for **NextChamp**.

For a complete description of the project architecture, dependencies, setup instructions, and the core Python MediaPipe AI engine, please refer to the main **[README.md (Root)](file:///c:/Users/grish/Desktop/SIH-25/README.md)**.

## Quick Start (Monorepo)

### 1. Install Dependencies
Run from this directory:
```bash
npm run install:all
```

### 2. Setup Environment Variables
In the `backend` directory, create a `.env` file based on `.env.example`:
```bash
cp backend/.env.example backend/.env
```

### 3. Initialize and Seed Database
Run from the `backend` directory:
```bash
cd backend
npm run db:migrate
npm run db:seed
```

### 4. Run Development Servers
Run from this directory:
```bash
npm run dev
```
- Frontend starts at: `http://localhost:3000`
- Backend starts at: `http://localhost:3001` (calls are proxied automatically via package.json config)
