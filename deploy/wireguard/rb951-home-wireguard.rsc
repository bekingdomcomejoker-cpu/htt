# OMEGA CGNAT-safe home peer for MikroTik RB951Ui
# RouterOS 7 WireGuard is required. Replace every <PLACEHOLDER> before importing.
# This peer initiates outbound to the VPS; no inbound port-forward is required.
# Generate the home key on the router and keep the private key secret.

:local vpsEndpoint "<VPS_PUBLIC_IP_OR_DNS>"
:local vpsPublicKey "<VPS_WIREGUARD_PUBLIC_KEY>"
:local homePrivateKey "<GENERATED_HOME_PRIVATE_KEY>"

/interface/wireguard/add name=wg-home listen-port=13231 private-key=$homePrivateKey comment="OMEGA CGNAT relay"
/ip/address/add address=10.66.0.2/24 interface=wg-home comment="OMEGA relay address"
/interface/wireguard/peers/add interface=wg-home public-key=$vpsPublicKey endpoint-address=$vpsEndpoint endpoint-port=51820 allowed-address=10.66.0.0/24 persistent-keepalive=25s comment="OMEGA VPS relay"

# Route only the WireGuard mesh and home LAN through the relay.
/ip/route/add dst-address=10.66.0.0/24 gateway=wg-home comment="OMEGA mesh"

# Permit remote mesh clients to reach the home LAN. Restrict this to the
# exact services you need if your existing firewall is more restrictive.
/ip/firewall/filter/add chain=forward in-interface=wg-home dst-address=192.168.88.0/24 action=accept comment="OMEGA remote to home LAN"
/ip/firewall/filter/add chain=forward src-address=192.168.88.0/24 out-interface=wg-home action=accept comment="OMEGA home LAN return"

# Print the public key to give the VPS installer.
:put ("HOME_WIREGUARD_PUBLIC_KEY=" . [/interface/wireguard/get [find name="wg-home"] public-key])
