#!/usr/bin/env bash
set -euo pipefail

# Installs a split-tunnel WireGuard relay on a public Linux VPS.
# Private keys are generated locally on the VPS and never printed or committed.
# Required: WG_HOME_PUBLIC_KEY='the public key printed by the RB951 script'
# Optional: WG_REMOTE_PUBLIC_KEY='public key for a phone/laptop peer'

: "${WG_HOME_PUBLIC_KEY:?Set WG_HOME_PUBLIC_KEY to the RB951 public key before running}"
WG_PUBLIC_IP="${WG_PUBLIC_IP:-$(curl -4fsS --max-time 10 https://ifconfig.me)}"
WG_PORT="${WG_PORT:-51820}"
WG_IF="${WG_IF:-wg0}"
WG_HOME_IP="${WG_HOME_IP:-10.66.0.2/32}"
WG_REMOTE_IP="${WG_REMOTE_IP:-10.66.0.3/32}"
WG_DIR="/etc/wireguard"

if [ "$(id -u)" -ne 0 ]; then echo "Run as root (sudo -i or sudo bash $0)." >&2; exit 1; fi
if [ -z "$WG_PUBLIC_IP" ]; then echo "Could not detect VPS public IPv4; set WG_PUBLIC_IP manually." >&2; exit 1; fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y wireguard iptables curl
install -d -m 700 "$WG_DIR"
umask 077

if [ ! -s "$WG_DIR/server.key" ]; then wg genkey > "$WG_DIR/server.key"; fi
SERVER_PRIVATE_KEY="$(cat "$WG_DIR/server.key")"
SERVER_PUBLIC_KEY="$(printf '%s' "$SERVER_PRIVATE_KEY" | wg pubkey)"

cat >/etc/sysctl.d/99-omega-wireguard.conf <<'EOF'
net.ipv4.ip_forward=1
EOF
sysctl --system >/dev/null

REMOTE_BLOCK=""
if [ -n "${WG_REMOTE_PUBLIC_KEY:-}" ]; then
  REMOTE_BLOCK=$(cat <<EOF

[Peer]
# Remote phone/laptop; split tunnel only.
PublicKey = ${WG_REMOTE_PUBLIC_KEY}
AllowedIPs = ${WG_REMOTE_IP}
EOF
)
fi

cat >"$WG_DIR/$WG_IF.conf" <<EOF
[Interface]
Address = 10.66.0.1/24
ListenPort = $WG_PORT
PrivateKey = $SERVER_PRIVATE_KEY
PostUp = iptables -A INPUT -p udp --dport $WG_PORT -j ACCEPT; iptables -A FORWARD -i $WG_IF -o $WG_IF -j ACCEPT
PostDown = iptables -D INPUT -p udp --dport $WG_PORT -j ACCEPT; iptables -D FORWARD -i $WG_IF -o $WG_IF -j ACCEPT

[Peer]
# Home MikroTik behind CGNAT; it initiates outbound and keeps the tunnel alive.
PublicKey = $WG_HOME_PUBLIC_KEY
AllowedIPs = $WG_HOME_IP, 192.168.88.0/24
PersistentKeepalive = 25
$REMOTE_BLOCK
EOF
chmod 600 "$WG_DIR/$WG_IF.conf" "$WG_DIR/server.key"
systemctl enable --now "wg-quick@$WG_IF"

echo "WireGuard relay is active: $WG_PUBLIC_IP:$WG_PORT"
echo "VPS_PUBLIC_KEY=$SERVER_PUBLIC_KEY"
echo "HOME_PEER_ALLOWED_IPS=$WG_HOME_IP,192.168.88.0/24"
if [ -n "${WG_REMOTE_PUBLIC_KEY:-}" ]; then echo "REMOTE_PEER_ALLOWED_IPS=$WG_REMOTE_IP"; fi
echo "Config: $WG_DIR/$WG_IF.conf"
