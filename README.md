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
Create a `.env` file in the backend directory and add the following:
```ini
# Required environment variables
DISCORD_APPLICATION_ID=
DISCORD_API_TOKEN= # Bot token
OPENAI_API_KEY=sk-* # OpenAI API key, starting with sk-
REDPILL_API_KEY=
GROK_API_KEY=
GROQ_API_KEY=gsk_*
OPENROUTER_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY= # Gemini API key

ELEVENLABS_XI_API_KEY= # API key from ElevenLabs

# ELEVENLABS SETTINGS
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
ELEVENLABS_VOICE_STABILITY=0.5
ELEVENLABS_VOICE_SIMILARITY_BOOST=0.9
ELEVENLABS_VOICE_STYLE=0.66
ELEVENLABS_VOICE_USE_SPEAKER_BOOST=false
ELEVENLABS_OPTIMIZE_STREAMING_LATENCY=4
ELEVENLABS_OUTPUT_FORMAT=pcm_16000

TWITTER_DRY_RUN=false
TWITTER_USERNAME= # Account username
TWITTER_PASSWORD= # Account password
TWITTER_EMAIL= # Account email
TWITTER_COOKIES= # Account cookies

X_SERVER_URL=
XAI_API_KEY=
XAI_MODEL=

# POST INTERVAL RANDOM MIN-MAX MINUTES
POST_INTERVAL_MIN=  #90 #Default
POST_INTERVAL_MAX= #180 #Default

# USE IMAGE GEN
IMAGE_GEN= #TRUE

# Leave blank to use local embeddings
USE_OPENAI_EMBEDDING=  #TRUE

# OpenRouter Model Configurations
OPENROUTER_MODEL=
SMALL_OPENROUTER_MODEL=
MEDIUM_OPENROUTER_MODEL=
LARGE_OPENROUTER_MODEL=

# OLLAMA Provider Settings
OLLAMA_SERVER_URL=   # Leave blank for default localhost:11434
OLLAMA_MODEL=
OLLAMA_EMBEDDING_MODEL=     # Default mxbai-embed-large
SMALL_OLLAMA_MODEL=         # Default llama3.2
MEDIUM_OLLAMA_MODEL=        # Default hermes3
LARGE_OLLAMA_MODEL=         # Default hermes3:70b

# Anthropic API Key
ANTHROPIC_API_KEY=

# Heurist API Settings
HEURIST_API_KEY=
SMALL_HEURIST_MODEL=
MEDIUM_HEURIST_MODEL=
LARGE_HEURIST_MODEL=
HEURIST_IMAGE_MODEL=

# DeepSeek Configuration
DEEPSEEK_API_KEY=
DEEPSEEK_API_URL=              # Default: https://api.deepseek.com
SMALL_DEEPSEEK_MODEL=          # Default: deepseek-chat
MEDIUM_DEEPSEEK_MODEL=         # Default: deepseek-chat
LARGE_DEEPSEEK_MODEL=          # Default: deepseek-chat

# Wallet Configuration
WALLET_PRIVATE_KEY=EXAMPLE_WALLET_PRIVATE_KEY
WALLET_PUBLIC_KEY=EXAMPLE_WALLET_PUBLIC_KEY
BIRDEYE_API_KEY=
SOL_ADDRESS=So11111111111111111111111111111111111111112
SLIPPAGE=1
BASE_MINT=So11111111111111111111111111111111111111112
RPC_URL=https://api.mainnet-beta.solana.com
HELIUS_API_KEY=

## Telegram
TELEGRAM_BOT_TOKEN=

TOGETHER_API_KEY=
SERVER_PORT=3000

# Starknet
STARKNET_ADDRESS=
STARKNET_PRIVATE_KEY=

# When true, disables interactive chat mode for background process operation
DAEMON_PROCESS=false
```

### 5. Run the Backend with Character Configuration
```sh
pnpm start --characters="characters/journalist.character.json"
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

### 3. Start the Frontend Development Server
```sh
npm run dev
```
The application will be available at:
- [http://localhost:3000](http://localhost:3000) (or another available port if 3000 is in use).

---

## Ports & API Usage

### Port 3000 (Frontend)
- The frontend runs on port `3000`, serving the user interface of Humour9x.
- It interacts with the backend to fetch and send data.

### Port 3001 (Backend)
- The backend runs on port `3001`, handling AI agent processing, chat responses, and API endpoints.
- The frontend makes API requests to this backend service.

### What is `${id}` in API Calls?
The variable `${id}` represents the unique identifier of an AI agent (e.g., `journalist`).

#### How it is populated:
- The frontend dynamically assigns `${id}` based on the selected character.
- Example: If the journalist agent is chosen, `id="journalist"`, and API calls like:
  ```js
  fetch(`http://localhost:3000/journalist/message`, {...})
  ```
  will send messages to the journalist AI agent.

- The `agents.js` file defines agent details:
  ```js
  const agentsConfig = [{ id: "journalist", name: "Journalist", role: "News & Reports" }];
  ```
- The frontend extracts this `id` from the URL parameter (`useRouter().query.id`) and uses it in API requests.

---

## How Backend and Frontend Work Together

### 1. API Communication
The frontend calls the backend to fetch the agent details using:
```js
fetch("http://localhost:3001/character")
```
For sending user messages, it posts data to:
```js
fetch(`http://localhost:3000/${id}/message`, {...})
```
**Ensure that the backend is running before testing the frontend chat system.**

### 2. Agent Handling in Frontend
`agents.js` contains agent definitions:
```js
const agents = [{ id: "journalist", name: "Journalist", role: "News & Reports" }];
```
The frontend dynamically loads agent details based on the URL parameter (`id`).

### 3. Client-side Navigation
The `useRouter()` hook allows dynamic navigation, such as:
```js
router.push("/")
```
to return to the homepage.

---

## Troubleshooting

❌ **Issue:** Backend fails due to missing dependencies?
✅ **Solution:** Run the following command in the `aiagents` folder:
```sh
pnpm install && pnpm add cors express
```

❌ **Issue:** API calls fail (fetch error)?
✅ **Solution:** Ensure the backend is running on [http://localhost:3001](http://localhost:3001) before testing API calls.
