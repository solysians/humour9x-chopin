humour9x-chopin Project Setup Guide

Prerequisites

Node.js v22+ (Check version with node -v)

pnpm package manager (Install via npm install -g pnpm)

Backend Setup (AI Agents Service)

1. Navigate to the Backend Directory

cd path/to/humour9x-chopin/aiagents

2. Install Dependencies

pnpm install

3. Install Required Packages

If you encounter package-related errors, manually install:

pnpm add cors express

4. Environment Variables Setup

Create a .env file in the backend directory and add the required keys:

DISCORD_APPLICATION_ID=
DISCORD_API_TOKEN=
OPENAI_API_KEY=sk-*
REDPILL_API_KEY=
GROK_API_KEY=
GROQ_API_KEY=gsk_*
OPENROUTER_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
ELEVENLABS_XI_API_KEY=
SERVER_PORT=3001

5. Run the Backend with Character Configuration

pnpm start --characters="characters/journalist.character.json"

This starts the backend and loads the Journalist agent configuration.

Ensure the backend is running before starting the frontend.

Frontend Setup (Humour9x Web Application)

1. Navigate to the Frontend Directory

cd path/to/humour9x-chopin/frontend

2. Install Dependencies

npm install

3. Install Chopin Framework Packages

npm install @chopinframework/react @chopinframework/next

If you encounter version issues, ensure Chopin's package is correctly installed. Otherwise, force install:

npm install --force

4. Initialize Chopin Framework

Run the following command inside the root directory of your existing codebase:

npx chopd init

This will:

Create a chopin.config.json with default settings

Create a .chopin directory for internal use

Add .chopin to your .gitignore

5. Start the Frontend with Chopin Proxy

Instead of npm run dev, use:

npx chopd

This sets up a reverse proxy on 4000 that forwards to 3000 by default.

Chopin Configuration

chopin.config.json contains:

{
  "command": "npm run dev",
  "proxyPort": 4000,
  "targetPort": 3000
}

Ports & API Usage

Port 4000 (Frontend via Chopin)

The frontend runs on 4000, forwarding to 3000.

Access it at: http://localhost:4000.

Port 3001 (Backend)

The backend runs on 3001, handling AI agent processing and API endpoints.

API Example

For sending user messages:

fetch(`http://localhost:4000/${id}/message`, {...})

Troubleshooting

❌ Issue: Backend fails due to missing dependencies?
✅ Solution: Run inside aiagents folder:

pnpm install && pnpm add cors express

❌ Issue: API calls fail (fetch error)?
✅ Solution: Ensure the backend is running at http://localhost:3001 before testing API calls.

❌ Issue: Chopin proxy not working?
✅ Solution: Run npx chopd instead of npm run dev to start the frontend.

Now your humour9x-chopin project is correctly set up with Chopin authentication and proxy handling!