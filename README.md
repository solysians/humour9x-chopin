# humour9x-chopin Project Setup Guide

## Prerequisites

- **Node.js v22+** (Check version with `node -v`)
- **pnpm package manager** (Install via `npm install -g pnpm`)

---

## Backend Setup (AI Agents Service)

### 1. Navigate to the Backend Directory

```sh
cd path/to/humour9x-chopin/aiagents
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Install Required Packages

If you encounter package-related errors, manually install:

```sh
pnpm add cors express
```

### 4. Environment Variables Setup

Create a `.env` file in the backend directory and add the required environment variables.

### 5. Run the Backend with Character Configuration

```sh
pnpm start --characters="characters/journalist.character.json,characters/memejournalist.character.json,characters/comic.character.json"
```

This starts the backend and loads the Journalist agent configuration.

**Ensure the backend is running before starting the frontend.**

---

## Frontend Setup (Humour9x Web Application)

### 1. Navigate to the Frontend Directory

```sh
cd path/to/humour9x-chopin/frontend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Install Chopin Framework

To prevent version issues, ensure the Chopin framework is correctly installed:

```sh
npm install @chopinframework/react @chopinframework/next
```

If any version issues occur, use:

```sh
npm install @chopinframework/react @chopinframework/next --force
npm install --force 
```



### 4. Initialize Chopin Configuration

Run the following command inside the root directory of your existing codebase:

```sh
npx chopd init
```

This will:

- Create a `chopin.config.json` with default settings
- Create a `.chopin` directory for internal use
- Add `.chopin` to your `.gitignore`

### 5. Start the Proxy and Development Server

Instead of `npm run dev`, run:

```sh
npx chopd
```

This sets up a reverse proxy on **port 4000**, forwarding to **port 3000**.

#### `chopin.config.json` Structure:

```json
{
  "command": "npm run dev",
  "proxyPort": 4000,
  "targetPort": 3000
}
```

Your application will now be accessible at:

- [http://localhost:4000](http://localhost:4000)

---

## Ports & API Usage

### Port 4000 (Frontend Proxy)

- The frontend now runs on port **4000**, proxying requests to **3000**.

### Port 3001 (Backend)

- The backend runs on **3001**, handling AI agent processing and API endpoints.

---

## Troubleshooting

❌ **Issue:** Backend fails due to missing dependencies?
✅ **Solution:** Run inside `aiagents` folder:

```sh
pnpm install && pnpm add cors express
```

❌ **Issue:** API calls fail (fetch error)?
✅ **Solution:** Ensure the backend is running on [http://localhost:3001](http://localhost:3001) before testing API calls.

❌ **Issue:** Frontend version conflicts with Chopin?
✅ **Solution:** Ensure Chopin packages are correctly installed:

```sh
npm install @chopinframework/react @chopinframework/next --force
```

❌ **Issue:** Unable to start frontend with `npm run dev`?
✅ **Solution:** Use:

```sh
npx chopd
```

Now your humour9x-chopin project is correctly set up with Chopin authentication and proxy handling!
