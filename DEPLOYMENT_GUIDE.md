# Deployment Guide — raginig.com (Port 5557)

## 1. Start Docker Container (Port 5557)

On your server:

```bash
cd /var/www/raginig_portal
git pull origin main
docker compose up -d --build
```

---

## 2. Configure Caddyfile

Add to `/etc/caddy/Caddyfile`:

```caddyfile
raginig.com, www.raginig.com {
    reverse_proxy localhost:5557
}
```

Reload Caddy:

```bash
systemctl reload caddy
```
