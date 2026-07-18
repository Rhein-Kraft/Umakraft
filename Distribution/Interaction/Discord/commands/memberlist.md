# /memberlist

## Purpose

Returns a list of active circle members using the uma.moe circle API.

## Input

- `circle_id` — Circle identifier or uma.moe circle URL

## Output

- A Discord message listing active members from the circle.

## Workflow

```text
Discord
    │
    ▼
/memberlist
    │
    ▼
Fetch circle member list
    │
    ▼
Display result in Discord
```
