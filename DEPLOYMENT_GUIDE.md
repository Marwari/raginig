# Deployment & Server Setup Guide for raginig.com

This guide explains how to deploy the **Dr. Ragini Gupta Academic Portal** using Docker on your hosting server for `raginig.com`.

---

## 1. Domain & DNS Configuration (Registrar / Cloudflare / Route53)

Point your domain's DNS `A` records to your server's public IP address:

| Type | Name | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or `raginig.com`) | `YOUR_SERVER_IP` | Auto / 300 |
| **A** (or **CNAME**) | `www` | `YOUR_SERVER_IP` (or `raginig.com`) | Auto / 300 |

---

## 2. Deploying to Your Server

### Option A: One-Command Remote Deploy (From your local terminal)

Run the automated deployment script with your server details:

```bash
# Example:
SERVER_USER=root SERVER_HOST=YOUR_SERVER_IP ./deploy.sh
```

### Option B: Deploying directly on the Server (SSH into your VPS)

1. Copy the project files to your server directory:
   ```bash
   scp -r ./* root@YOUR_SERVER_IP:/var/www/raginig_portal/
   ```

2. SSH into your server:
   ```bash
   ssh root@YOUR_SERVER_IP
   cd /var/www/raginig_portal
   ```

3. Build and run with Docker Compose:
   ```bash
   docker compose up -d --build
   ```

4. Check that the container is healthy and running:
   ```bash
   docker ps
   ```

---

## 3. Free SSL / HTTPS Setup with Let's Encrypt (Certbot)

To enable secure `https://raginig.com`, run Certbot with the webroot plugin:

```bash
# On your server:
apt update && apt install -y certbot

# Request certificate
certbot certonly --standalone -d raginig.com -d www.raginig.com

# Auto-renewal cron is already enabled by certbot!
```

---

## 4. Docker Architecture Overview

- **Base Image:** `nginx:alpine` (Ultra-lightweight, < 25MB total footprint).
- **Optimization:** Gzip compression enabled, static asset caching (30 days), security response headers.
- **Port Bindings:** `80` (HTTP) & `443` (HTTPS).
- **Healthcheck:** Automatic container status probing every 30s.
