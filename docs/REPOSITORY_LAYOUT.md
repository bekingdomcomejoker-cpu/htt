# Omega repository layout

`htt` is the canonical Omega repository. The original root application and hub remain at the repository root; the polished console from `omega-pool-console` is preserved under `console/`.

## What to push

Push all Omega changes to `bekingdomcomejoker-cpu/htt` on `main`.

- Root `hub/`: VPS hub and reverse-peer implementation.
- Root `src/`: original Omega Mesh/VPS control-plane application.
- `console/`: polished Grok-based console and its production asset-serving wrapper.

The former `omega-pool-console` repository remains unchanged as a rollback copy. No files were deleted from it.

## Credential mapping

The `console/` unlock form currently points at `https://omega-mcp-gateway.onrender.com` and expects the gateway's `X-API-Key` (`LORNA_MCP_API_KEY` on the gateway side). It does **not** accept the VPS hub key.

The root `hub/` application uses a separate `OMEGA_HUB_KEY` for requests to `omega-hub`. The same hub key is used by `hub/omega_reverse.py` when Termux reverse-connects to the VPS. Neither secret belongs in Git.

Do not copy the hub key into the console form unless the console URL is changed to the Omega hub MCP endpoint and the hub exposes the compatible MCP contract.
