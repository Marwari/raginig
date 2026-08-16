# Caddy Deployment Guide for raginig.com

Since your server uses **Caddy**, setup is simpler and faster because Caddy handles **automatic SSL/HTTPS certificates** without needing manual certbot renewal scripts.

---

## Architecture

```
[ Visitor / Browser ]
         │
         ▼ (Port 80 / 443 with Auto-SSL)
[ Caddy on Host Server ]
         │
         ▼ (Reverse proxy to localhost:8080)
[ Docker Container (raginig_portal) ]
```

---

## 1. Run the Docker Container on the Server

On your server (`139.59.79.147`):

```bash
cd /var/www/raginig_portal
git pull origin main
docker compose up -d --build
```

---

## 2. Configure Caddyfile on Your Server

Open your host server's Caddyfile:

```bash
nano /etc/caddy/Caddyfile
```

Add the block:

```caddyfile
raginig.com, www.raginig.com {
    reverse_proxy localhost:8080
}
```

Reload Caddy to apply changes:

```bash
systemctl reload caddy
# or: caddy reload --config /etc/caddy/Caddyfile
```

Caddy will automatically fetch and manage free SSL certificates for `raginig.com` and `www.raginig.com`! 🎉
