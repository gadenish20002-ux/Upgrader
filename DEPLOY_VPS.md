# Upgrader VPS Deployment

Production target: `upgrader.pro.upgrader.ru` on `185.250.47.16`.

## Safety Rules

- Do not reset `upgrader_global_state`.
- Do not change `adminPassword`.
- Do not run with an empty Redis or fallback default state.
- Do not commit `/etc/upgrader/upgrader.env`, Redis URLs, tokens, passwords, or backups.
- Do not change DNS until the app is healthy on the VPS.

## Required Environment

Store production env in `/etc/upgrader/upgrader.env` with mode `600`.

```env
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
KV_URL=
REDIS_URL=
CRON_SECRET=
CATALOG_STEAM_USD_MULTIPLIER=
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
UPGRADER_DOMAIN=upgrader.pro.upgrader.ru
```

`CRON_SECRET` can be newly generated if it does not exist in Vercel. It does not change existing Redis data.

## VPS Bootstrap

```bash
timedatectl set-timezone Europe/Moscow
apt-get update
apt-get install -y ca-certificates curl git jq ufw fail2ban unattended-upgrades
install -d -m 755 /opt/upgrader /var/log/upgrader
install -d -m 700 /etc/upgrader /var/backups/upgrader
```

Install Docker Engine and the Compose plugin from Docker's official Ubuntu repository.

Firewall after SSH access is confirmed:

```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

## First Deploy

```bash
cd /opt
git clone https://github.com/gadenish20002-ux/Upgrader.git upgrader
cd /opt/upgrader
git fetch origin
git checkout <verified-sha-or-branch>
npm ci
node scripts/backup-upstash.mjs /etc/upgrader/upgrader.env /var/backups/upgrader
docker compose build app
docker compose up -d
docker compose ps
./scripts/health-check.sh http://127.0.0.1
```

If testing before DNS points to the VPS, temporarily set `UPGRADER_DOMAIN` in `/etc/upgrader/upgrader.env` to a test hostname that resolves to the VPS.

## Data Checks

Before DNS cutover, verify:

- backup key counts match the audit;
- `upgrader_global_state` exists;
- `adminPassword` exists and has not changed;
- access key count matches backup;
- account count matches backup;
- `/api/state`, `/api/auth`, `/api/account`, `/api/v1/skins`, `/api/v1/stats` respond;
- admin login and at least one existing active access key work;
- catalog meta and Steam additions are present.

## Daily Catalog Cron

Copy timer units:

```bash
cp deploy/systemd/upgrader-catalog.service /etc/systemd/system/
cp deploy/systemd/upgrader-catalog.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now upgrader-catalog.timer
systemctl list-timers upgrader-catalog.timer
```

Manual check:

```bash
systemctl start upgrader-catalog.service
systemctl status upgrader-catalog.service --no-pager
cat /var/log/upgrader/catalog-sync.log
```

The timer runs daily at `03:00` server local time. The VPS timezone must be `Europe/Moscow`.

## Backup

Manual:

```bash
node scripts/backup-upstash.mjs /etc/upgrader/upgrader.env /var/backups/upgrader
```

Recommended retention:

- 14 daily backups;
- 8 weekly backups;
- 6 monthly backups;
- at least one off-VPS copy.

## Update

```bash
APP_DIR=/opt/upgrader HEALTH_URL=https://upgrader.pro.upgrader.ru ./scripts/deploy-vps.sh <commit-sha>
```

## GitHub Actions Autodeploy

`.github/workflows/deploy-vps.yml` deploys every push to `main` and can also be run manually.

Add these repository secrets in GitHub Actions:

```text
VPS_HOST=185.250.47.16
VPS_PORT=22
VPS_USER=<ssh-user>
VPS_SSH_KEY=<private-key-for-that-user>
VPS_DEPLOY_PATH=/opt/upgrader
```

Do not store application env variables in GitHub. They stay on the VPS in `/etc/upgrader/upgrader.env`.

## Rollback

```bash
APP_DIR=/opt/upgrader HEALTH_URL=https://upgrader.pro.upgrader.ru ./scripts/rollback-vps.sh
```

Manual rollback:

```bash
cd /opt/upgrader
git checkout "$(cat .last-good-sha)"
UPGRADER_IMAGE_TAG="$(cat .last-good-image)" docker compose up -d
./scripts/health-check.sh https://upgrader.pro.upgrader.ru
```

## DNS Cutover

Only after health and data checks pass:

- set A record for `upgrader.pro.upgrader.ru` to `185.250.47.16`;
- remove or avoid AAAA if IPv6 is not configured;
- keep TTL low during cutover;
- verify HTTPS certificate is issued by Caddy;
- test desktop, mobile, incognito, admin, cabinet, API, and static assets.

## Troubleshooting

```bash
docker compose ps
docker compose logs --tail=200 app
docker compose logs --tail=200 caddy
curl -I http://127.0.0.1
curl --fail http://127.0.0.1/api/state
journalctl -u upgrader-catalog.service --no-pager -n 100
```
