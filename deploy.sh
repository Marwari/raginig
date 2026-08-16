#!/usr/bin/env bash
# ==============================================================================
# Automated Deployment Script for raginig.com (Dr. Ragini Gupta Portal)
# ==============================================================================

set -e

# Default configuration (Update SERVER_HOST / SERVER_USER as needed)
SERVER_USER="${SERVER_USER:-root}"
SERVER_HOST="${SERVER_HOST:-}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/raginig_portal}"
DOMAIN="raginig.com"

echo "============================================================"
echo " Deploying Dr. Ragini Gupta Course Portal to ${DOMAIN}"
echo "============================================================"

# If run directly on the server (Local deploy)
if [ -z "$SERVER_HOST" ]; then
    echo "[1/3] Building Docker container locally..."
    docker compose build

    echo "[2/3] Starting container service..."
    docker compose up -d --remove-orphans

    echo "[3/3] Checking container status..."
    docker compose ps

    echo "============================================================"
    echo " Successfully deployed! The site is live at http://${DOMAIN}"
    echo "============================================================"
    exit 0
fi

# Remote Deployment via SSH
echo "[1/4] Connecting to remote server: ${SERVER_USER}@${SERVER_HOST}..."
ssh -o StrictHostKeyChecking=no "${SERVER_USER}@${SERVER_HOST}" "mkdir -p ${REMOTE_DIR}"

echo "[2/4] Syncing files to ${REMOTE_DIR}..."
rsync -avz --exclude '.git' --exclude '*.log' --exclude '.DS_Store' \
    ./ "${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}/"

echo "[3/4] Building and launching Docker container on remote server..."
ssh "${SERVER_USER}@${SERVER_HOST}" << EOF
    cd ${REMOTE_DIR}
    if command -v docker compose >/dev/null 2>&1; then
        docker compose down || true
        docker compose build
        docker compose up -d
    elif command -v docker-compose >/dev/null 2>&1; then
        docker-compose down || true
        docker-compose build
        docker-compose up -d
    else
        echo "Error: Docker or docker compose not found on server!"
        exit 1
    fi
EOF

echo "[4/4] Verifying deployment..."
ssh "${SERVER_USER}@${SERVER_HOST}" "docker ps --filter name=raginig_portal"

echo "============================================================"
echo " Deployment Complete! Website is active at http://${DOMAIN}"
echo "============================================================"
