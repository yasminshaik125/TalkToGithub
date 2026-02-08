### TalkToGitHub — Backend Service
## Overview

This backend powers the AI command processing and GitHub automation layer for TalkToGitHub.
It acts as the bridge between:

- Chrome Extension UI

- Tambo AI Intent Processing

- GitHub REST API

## Features

- AI Command → Intent Conversion (via Tambo)

- GitHub Repository Operations

    - List Repositories

    - Create Repository

    - Delete Repository

- Secure Token-Based GitHub Access

- Extension Communication API

## Tech Stack

- Node.js

- Express.js

- Axios

- Tambo AI API

- GitHub REST API

## API Endpoints
Health Check
```bash
GET /
```

## Tambo Intent Processing
```bash
POST /tambo-ui
Body:
{
  "text": "open repo TalkToGithub"
}
```


## Returns:
```bash
{
  "intent": "OPEN_REPO",
  "repo": "TalkToGithub"
}
```

## List Repositories
```bash
GET /repos
```

## Create Repository
```bash
POST /create-repo
Body:
{
  "name": "demo-repo",
  "isPrivate": false
}
```

## Delete Repository
```bash
DELETE /delete-repo/:name
```

### Environment Variables

Create .env
```bash
GITHUB_TOKEN=your_github_pat
TAMBO_API_KEY=your_tambo_key
PORT=5000
```
## Setup

Install dependencies:
```bash
npm install
```

Run server:
```bash
node index.js
```

Server runs:
```bash
http://localhost:5000
```
## Security Notes

- Never commit .env

- Use GitHub Fine-Grained Tokens

- Limit repo permissions