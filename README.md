 # humour9x-chopin Project Setup Guide

A comprehensive guide for setting up the **humour9x-chopin** project, including backend and frontend configurations with Chopin Framework integration.

## 🚀 Prerequisites

- **Node.js v22+**  
  _Check version:_  
  ```bash
  node -v
  ```

- **pnpm package manager**  
  _Install pnpm globally:_  
  ```bash
  npm install -g pnpm
  ```

---

## ⚙️ Backend Setup (AI Agents Service)

### 1. Navigate to the Backend Directory

```bash
cd path/to/humour9x-chopin/aiagents
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Install Required Packages (If Needed)

If you encounter package-related errors:

```bash
pnpm add cors express
```

### 4. Environment Variables Setup

Create a `.env` file in the backend directory and add the required keys:

 
### 5. Run the Backend with Character Configuration

Start the backend and load the specific character configuration:

```bash
pnpm start --characters="characters/journalist.character.json"
```

> ✅ **Ensure the backend is running before starting the frontend.**

---

## 🌐 Frontend Setup (Humour9x Web Application)

### 1. Navigate to the Frontend Directory

```bash
cd path/to/humour9x-chopin/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Chopin Framework Packages

```bash
npm install @chopinframework/react @chopinframework/next
```

_If you encounter version issues, force install:_

```bash
npm install --force
```

### 4. Initialize Chopin Framework

Inside the root directory:

```bash
npx chopd init
```

This command will:

- Create a `chopin.config.json` with default settings.
- Generate a `.chopin` directory for internal use.
- Add `.chopin` to your `.gitignore`.

### 5. Start the Frontend with Chopin Proxy

Instead of the default `npm run dev`, use:

```bash
npx chopd
```

> ⚡ **This sets up a reverse proxy on port `4000` that forwards to `3000` by default.**

---

## ⚡ Chopin Configuration

The `chopin.config.json` should include:

```json
{
  "command": "npm run dev",
  "proxyPort": 4000,
  "targetPort": 3000
}
```

---

## 🔌 Ports & API Usage

- **Frontend (Chopin Proxy):**  
  Access the frontend at [http://localhost:4000](http://localhost:4000)

- **Backend (AI Agents API):**  
  Runs on port `3001`, handling AI agent processing and API endpoints.

### 📱 API Example

Send a user message to an agent:

```js
fetch(`http://localhost:4000/${id}/message`, {
  method: "POST",
  body: JSON.stringify({ message: "Hello, Agent!" }),
  headers: {
    "Content-Type": "application/json",
  },
});
```

---

## 🛠️ Troubleshooting

### ❌ Backend fails due to missing dependencies?
✅ Solution:  
Run the following inside the `aiagents` directory:
```bash
pnpm install && pnpm add cors express
```

### ❌ API calls fail (fetch error)?
✅ Solution:  
Ensure the backend server is running at [http://localhost:3001](http://localhost:3001) before making API calls.

### ❌ Chopin proxy not working?
✅ Solution:  
Use this command to start the frontend:
```bash
npx chopd
```

 
Now your **humour9x-chopin** project is ready with Chopin authentication and proxy handling!  

