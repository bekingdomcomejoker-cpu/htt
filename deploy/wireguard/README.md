# Omega WireGuard relay for CGNAT

This package flips the connection direction so the home MikroTik and remote device both make outbound connections to a VPS with a public IPv4 address. It does not require forwarding L2TP/IPsec through the CGNAT provider.

## Files

- `vps-install-wireguard.sh` installs `wg0` on a Debian/Ubuntu VPS, enables IPv4 forwarding, opens UDP 51820, and adds the home and optional remote peers.
- `rb951-home-wireguard.rsc` is a RouterOS 7 template for the RB951Ui. Replace placeholders before pasting. It keeps the tunnel alive with `persistent-keepalive=25s`.
- `remote-client.conf.example` is a split-tunnel phone/laptop profile. It routes only the WireGuard mesh (`10.66.0.0/24`) and home LAN (`192.168.88.0/24`); normal internet traffic stays on the remote network.

## Safe deployment order

1. On the RB951, generate a WireGuard keypair and record only the **public** key for the VPS. Never commit the private key.
2. On the VPS, run the installer with `WG_HOME_PUBLIC_KEY` set to the RB951 public key. It generates the VPS private key locally and prints only the VPS public key.
3. Put the printed VPS public key and VPS address into the RB951 template, then paste/import it on the router.
4. Add the remote client public key to the VPS by rerunning the installer with `WG_REMOTE_PUBLIC_KEY`, or add its `[Peer]` block to `/etc/wireguard/wg0.conf` and run `systemctl restart wg-quick@wg0`.
5. Import the remote client profile and test `10.66.0.1`, `10.66.0.2`, then a deliberately limited home-LAN service.

Do not use `AllowedIPs = 0.0.0.0/0` for this split-tunnel design. Do not place RouterOS passwords, IPsec PSKs, WireGuard private keys, or Omega secrets in this repository. Rotate any credential that appeared in the handoff document before production use.

## RB951 compatibility note

WireGuard is a RouterOS 7 feature. If the RB951 is still on RouterOS 6, upgrade it first if the hardware and storage support it; otherwise use a separate RouterOS 7-capable MikroTik or another small WireGuard router as the home peer.

## Firewall note

The installer permits WireGuard UDP ingress and forwarding between WireGuard peers. It does not automatically enable unrestricted internet forwarding/NAT. That is intentional: this is a mesh relay, not a full-tunnel gateway. Add narrow firewall rules for only the home services and remote peers you intend to expose.
