# Omega Termux Persistence

This guide documents the additive persistence arrangement for the existing Omega control plane. It does not create a second repository, hub, MCP bridge, or Cloudflare tunnel. Runtime credentials must remain in private Termux files or the Android environment and must never be committed to Git.

## Existing services

The intended runtime consists of the existing `omega_mcp_bridge.py` local MCP service on port `8787`, the existing `omega_reverse.py` connector to `https://omega-hub-canonical.onrender.com`, the existing remotely managed Cloudflare tunnel named `OMEGATERMUX`, and the optional legacy ngrok process. The Cloudflare tunnel is the persistent public path; the free ngrok hostname is temporary unless a reserved ngrok domain is configured.

## One-command recovery

The private Termux bootstrap is installed at `~/omega-persistent-setup.sh`. To restore the existing services without creating duplicates, run:

```bash
bash "$HOME/omega-persistent-setup.sh"
```

The bootstrap writes credentials to mode-600 runtime files, starts only missing processes, preserves the existing Cloudflare tunnel, and checks the local MCP health endpoint.

## Boot and crash recovery

For phone-boot startup, install Termux:Boot and place the bootstrap invocation in `$HOME/.termux/boot/`. The existing `omega-cloudflared` service is supervised by `termux-services`. If `omega-mcp`, `omega-reverse`, or `omega-ngrok` are converted to runit services on a device, each service should use a small executable `run` file and read credentials from private runtime files rather than from Git.

Android battery optimization must be disabled for Termux and Termux:Boot if the processes are expected to remain alive after the screen is locked. Android may otherwise suspend or kill background processes regardless of the shell configuration.

## Verification

Local Termux health:

```bash
curl -fsS http://127.0.0.1:8787/health
```

Canonical hub health:

```bash
curl -fsS https://omega-hub-canonical.onrender.com/health
```

The hub response should report both `vps` and `termux` as live. Cloudflare tunnel status should be checked in the Cloudflare dashboard or through the account API and should report the existing `OMEGATERMUX` tunnel as healthy.

## DNS and ngrok notes

A healthy Cloudflare connector does not automatically make a hostname resolve. The configured public hostnames require DNS records at their authoritative provider. The legacy ngrok URL is ephemeral and can return `ERR_NGROK_3200` when the process is stopped or the URL changes. Do not treat that URL as the persistent Omega endpoint.

## Security

Do not copy hub keys, MCP keys, or Cloudflare connector tokens into this repository, public documentation, issue comments, or broad chat posts. Rotate any credential that has been exposed and update only the private Termux runtime files and Render/Cloudflare secret stores.
