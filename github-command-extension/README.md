### TalkToGitHub — Chrome Extension
## Overview

This extension injects an AI command bar directly into GitHub UI, allowing natural language navigation and automation using Tambo-powered intent detection.

## Features

- AI Command Bar inside GitHub

- Natural Language Navigation

- Repo Page Navigation

- Profile Navigation

- Issues / PR Navigation

- Backend AI Integration

## Tech Stack

- Chrome Extension Manifest V3

- Vanilla JS Content Script

- Backend REST API

- Tambo AI Intent Engine

## How It Works

User types command →
Extension sends text →
Backend → Tambo → Intent →
Extension executes navigation →
GitHub page changes

## Install Extension (Developer Mode)

1️⃣ Open Chrome
2️⃣ Go to:
```bash
chrome://extensions
```

3️⃣ Enable Developer Mode
4️⃣ Click Load Unpacked
5️⃣ Select extension folder

## Required Permissions

- github.com domain access

- localhost backend communication

## Extension Files
```bash
manifest.json
content.js
(optional styles)
dist (if React bundle used)
```
## Debugging

Open GitHub → F12 → Console

Look for:
```bash
TTG CONTENT LOADED
```