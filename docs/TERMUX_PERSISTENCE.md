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

The official Termux:Boot behavior is important: installing the add-on and placing a script in `$HOME/.termux/boot/` does not, by itself, start the `termux-services` daemon. The boot script must source `$PREFIX/etc/profile.d/start-services.sh`. The official service workflow also requires `sv-enable <service>` for persistent enablement; `sv up <service>` only starts a service in the current session.

The corrected private bootstrap creates executable runit `run` files for `omega-mcp`, `omega-reverse`, `omega-cloudflared`, and `omega-ngrok`, enables them with `sv-enable`, and installs `$HOME/.termux/boot/00-omega-services` that runs `termux-wake-lock`, sources `start-services.sh`, and starts the enabled services. Each runit service restarts its child when it exits. Runtime credentials are read from private files rather than Git.

The boot entrypoint writes to `$HOME/.omega/omega-boot.log` before doing any other work and uses absolute `HOME` and `PREFIX` values. An absent boot log means Termux:Boot did not execute the script at all; it is not a failure inside the Omega services. The canonical template is [`deploy/termux/00-omega-services`](../deploy/termux/00-omega-services).

Install Termux:Boot, open it once, and keep the boot script executable. Install `termux-services`, restart the Termux shell once so its service daemon is available, and disable Android battery optimization for Termux and Termux:Boot. These requirements come from the official [Termux:Boot instructions](https://github.com/termux/termux-boot) and [termux-services instructions](https://github.com/termux/termux-services).

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
