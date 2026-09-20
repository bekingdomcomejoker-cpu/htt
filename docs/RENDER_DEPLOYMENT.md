# Permanent Omega Hub Deployment

The recommended production arrangement is **Render Web Service -> Omega hub -> reverse-connected Termux**. Render supplies the stable HTTPS endpoint, health checks, deploys from GitHub, and process restarts. The phone connects outbound to the Render URL using `hub/omega_reverse.py`, so neither the phone nor the MikroTik needs an inbound public port.

Cloudflare quick tunnels are not suitable as the primary endpoint: their `trycloudflare.com` hostnames are temporary and change when the connector restarts. Cloudflare remains useful as an optional named-tunnel or custom-domain layer in front of a stable origin, but it is not required for the Render service.

## Render settings

The repository contains `render.yaml` with the following service contract:

| Setting | Value |
|---|---|
| Runtime | Node |
| Build command | `npm ci --no-audit --no-fund` |
| Start command | `node hub/vps.mjs` |
| Health check | `/health` |
| Bind host | `0.0.0.0` |
| Port | Render's `PORT` environment variable |

Set `OMEGA_HUB_KEY` in the Render dashboard as a secret. Do not commit it. The hub intentionally refuses to start in production if that value is absent. The Termux URL and ngrok key are not required for the permanent design because the phone uses the reverse connector.

After Render provides its service URL, configure Termux with:

```sh
export OMEGA_HUB_URL='https://YOUR-RENDER-SERVICE.onrender.com'
export OMEGA_HUB_KEY='THE_SAME_RENDER_SECRET'
python3 "$HOME/omega_reverse.py" --daemon
```

The phone must keep the reverse connector supervised by Termux:Boot, `termux-services`, or an equivalent process supervisor. The connector retries the hub after transient network failures.

## Plan note

Render's free web service tier may spin down after inactivity. That is acceptable for a smoke test but not for a continuously available control plane. An always-on Render instance requires a paid service plan; enabling or upgrading billing must be performed by the account owner.

## Cloudflare option

If a custom domain is desired, use a **named Cloudflare Tunnel** or DNS proxy in front of the Render hostname. Do not use `cloudflared tunnel --url ...` quick tunnels for production. Named tunnels require a Cloudflare account, a controlled DNS zone, a persistent tunnel identity, and a managed connector. The Cloudflare hostname then remains stable while Render remains the origin.

## Security requirements

Rotate any credential that has previously been committed to Git history. Runtime files such as `hub/config.json`, `hub/public-url.txt`, and hub logs are ignored and must not be committed. Keep the hub key, Termux MCP key, WireGuard private keys, and RouterOS passwords in service secret stores or on their respective devices only.
