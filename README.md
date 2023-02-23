# llm-page-builder
openai API page builder

This project is VERY WIP at this time

## Installation

1) `npx pnpm i`
2) `cp /apps/server/.env.sample /apps/server/.env` and fill in your [Open AI API key](https://openai.com/blog/openai-api/)
3) `cp /apps/client/.env.sample /apps/client/.env` 
4) `pnpm --filter server dev` to start server (default port is 8080)
5) `pnpm --filter client dev` (default port is 5173)
6) visit [port 5173](localhost:5173)
