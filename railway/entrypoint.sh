#!/bin/sh
set -e

REQUIRED_VARS="DISCORD_BOT_TOKEN DISCORD_APPLICATION_ID DISCORD_GUILD_ID DISCORD_PUBLIC_KEY UMA_MOE_API_KEY"

MISSING=""
for VAR in $REQUIRED_VARS; do
  eval VAL=\$$VAR
  if [ -z "$VAL" ]; then
    MISSING="$MISSING $VAR"
  fi
done

if [ -n "$MISSING" ]; then
  echo ""
  echo "ERROR: Missing required environment variables:"
  for VAR in $MISSING; do
    echo "  - $VAR"
  done
  echo ""
  echo "Set these in Railway: Service → Variables"
  echo ""
  exit 1
fi

exec "$@"
