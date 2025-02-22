# humour9x-chopin

humour9x-chopin is an AI agent fun project designed to generate engaging content across various domains. It includes different character personas that provide unique perspectives, insights, and analyses. The project features sentiment analysis, multilingual support, trending topic tracking, and news categorization.

# Product document - 
Coming...
 
## Default Characters
To load the default characters:
- Use the following command for each character:
  
  ```sh
  pnpm start --characters="characters/journalist.character.json"
  ```
  ```sh
  pnpm start --characters="characters/memejournalist.character.json"
  ```
  ```sh
  pnpm start --characters="characters/comic.character.json"
  ```
  ```sh
  pnpm start --characters="characters/sentiment.character.json"
  ```
  ```sh
  pnpm start --characters="characters/opinion.character.json"
  ```
  
- Multiple character files can be loaded simultaneously using a comma-separated list:
  ```sh
  pnpm start --characters="characters/journalist.character.json,characters/memejournalist.character.json,characters/comic.character.json"
  ```

## Supported Characters
- **Comic**: Delivers humorous takes on trending topics.
- **Humorous**: Generates memes and lighthearted content.
- **Journalist**: Provides structured and factual news reporting.
- **Opinion Leader**: Offers insightful, thought-provoking perspectives.
- **Sentiment Analyst**: Classifies news based on sentiment analysis.
- **Trending Topic Analysis**:
  - Tracks trending hashtags, locations, and real-time topics.
  - Categorizes news based on sentiment and audience engagement.
- **Multilingual Support**:
  - Integration of language models for global accessibility.
  - Text and speech processing for enhanced usability.

## Add Clients
### In `character.ts`:
```ts
clients: [Clients.TWITTER, Clients.DISCORD],
```
### In `character.json`:
```json
"clients": ["twitter", "discord"]
```

## Configure Environment Variables
Duplicate the `.env.example` template and create a `.env` file:
```sh
cp .env.example .env
```
Fill out the `.env` file with your credentials:
```sh
DISCORD_APPLICATION_ID="your-discord-application-id"
DISCORD_API_TOKEN="your-discord-api-token"
OPENROUTER_API_KEY="your-openrouter-api-key"
TWITTER_USERNAME="your-twitter-username"
TWITTER_PASSWORD="your-twitter-password"
TWITTER_EMAIL="your-email@example.com"
```

## Install Dependencies and Start Your Agent
Ensure you have Node.js version **22 or later** installed.
```sh
pnpm i && pnpm start
```

