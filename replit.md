# Umakraft UmaMoe

Node.js pipeline for the Uma.moe → Umakraft data flow. Handles fetching trainer/race data from the uma.moe API, processing it through a Miner → Courier → Inspector → Vault pipeline, and serving Discord slash commands.

## Stack

- **Runtime:** Node.js ≥ 16
- **Dependencies:** `node-fetch` (production), `mocha` + `chai` (dev/testing)
- **Originally deployed on:** Railway (Docker)

## How to run

```bash
npm start        # starts the app (node index.js)
npm test         # runs the Mocha test suite
node demo_run.js # demo of the full Miner → Courier → Inspector → Vault pipeline
```

## Environment variables / secrets

| Variable | Type | Description |
|---|---|---|
| `DISCORD_BOT_TOKEN` | Secret | Discord bot token (Bot → Token in Dev Portal) |
| `DISCORD_APPLICATION_ID` | Secret | Discord application/client ID |
| `DISCORD_GUILD_ID` | Secret | Discord server/guild ID |
| `UMAMOE_API_URL` | Env var | Uma.moe API base URL (default: `https://uma.moe/api`) |

## Project layout

```
Distribution/Interaction/Discord/   Discord slash commands & interaction handler
Umamoe/                             Miner, Courier, Inspector, Vault modules
Refinery/                           Refiner, Compiler, Depot modules
Workshop/                           Draftsman, Fabricator, Terminal utilities
index.js                            Module entry point
demo_run.js                         Demo pipeline runner
```

## User preferences

- Keep the existing project structure and module layout.
