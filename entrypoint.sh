#!/bin/sh
set -e

: "${LOAD_ENV:="/app/load_env"}"
. $LOAD_ENV
VAULT_ADDR=https://${VAULT_ADDR}

if [ "$1" = "dev" ]; then
  npm run start:dev
elif [ "$1" = "test" ]; then
  npm run test 
elif [ "$1" = "prod" ]; then
  npm run start:prod
else
  exec "$@"
fi
