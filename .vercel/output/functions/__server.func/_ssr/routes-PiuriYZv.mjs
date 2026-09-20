import { i as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as Radio, c as ArrowLeftRight, i as Server, l as Activity, n as Terminal, o as Copy, r as Smartphone, s as Check } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-PiuriYZv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-line bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getHubSnapshot = createServerFn({ method: "POST" }).handler(createSsrRpc("0122ba6d2a99b0277b63d4e9aa94e34734217a037a4fb5cf12bc9502237b7b84"));
var invokeHub = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("903d8e95b9c166a9ef0cfd73fcd867f6002dbb3ca4c8d41984b8c7a76275472d"));
var PRESETS = [
	{
		node: "termux",
		tool: "battery_status",
		label: "Termux battery"
	},
	{
		node: "termux",
		tool: "connector_health",
		label: "Termux connectors"
	},
	{
		node: "vps",
		tool: "hub_info",
		label: "VPS identity"
	},
	{
		node: "vps",
		tool: "hub_ping",
		label: "VPS ping"
	},
	{
		node: "vps",
		tool: "list_peers",
		label: "List peers"
	},
	{
		node: "vps",
		tool: "sandbox_exec",
		label: "VPS uname",
		args: { command: "uname -a && hostname && date -u" }
	},
	{
		node: "termux",
		tool: "termux_exec",
		label: "Termux uname",
		args: { command: "uname -a && echo reverse-path-ok" }
	},
	{
		node: "vps",
		tool: "hub_echo",
		label: "Echo to VPS",
		args: { message: "termux calling the sandbox" }
	}
];
function statusTone(status) {
	if (status === "live" || status === "reverse") return "bg-live";
	if (status === "connecting") return "bg-warn";
	return "bg-down";
}
function CopyField({ label, value, mono = true }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!value) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface-2 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Waiting for tunnel"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface-2 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium text-faint",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "inline-flex size-9 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-fg",
				onClick: async () => {
					await navigator.clipboard.writeText(value);
					setCopied(true);
					setTimeout(() => setCopied(false), 1200);
				},
				"aria-label": `Copy ${label}`,
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-1 break-all text-sm text-fg", mono && "font-mono text-[11px] leading-relaxed"),
			children: value
		})]
	});
}
function NodeCard({ peer }) {
	const Icon = peer.id === "termux" ? Smartphone : Server;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "min-w-0 rounded-3xl bg-surface p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-xl bg-surface-2 text-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium tracking-tight",
						children: peer.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-faint",
						children: peer.id
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", statusTone(peer.status)) }), peer.status]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-faint",
						children: "Path"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-fg",
						children: peer.reverse ? "reverse" : peer.via
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-faint",
						children: "Latency"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 font-mono tabular-nums text-fg",
						children: peer.latencyMs == null ? "—" : `${peer.latencyMs} ms`
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-faint",
							children: "Last seen"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 font-mono text-xs text-muted",
							children: peer.lastSeen ?? "not yet"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-1.5",
				children: [(peer.tools.length ? peer.tools : ["waiting"]).slice(0, 8).map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-md bg-surface-2 px-2 py-1 font-mono text-[10px] tracking-wide text-muted",
					children: tool
				}, tool)), peer.tools.length > 8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-md px-2 py-1 font-mono text-[10px] text-faint",
					children: ["+", peer.tools.length - 8]
				}) : null]
			})
		]
	});
}
function Home() {
	const [node, setNode] = (0, import_react.useState)("termux");
	const [tool, setTool] = (0, import_react.useState)("battery_status");
	const [argsText, setArgsText] = (0, import_react.useState)("{}");
	const [lastResult, setLastResult] = (0, import_react.useState)("");
	const snap = useQuery({
		queryKey: ["hub-snapshot"],
		queryFn: () => getHubSnapshot(),
		refetchInterval: 2500
	});
	const data = snap.data;
	const peers = data?.peers ?? [];
	const vps = peers.find((p) => p.id === "vps");
	const termux = peers.find((p) => p.id === "termux");
	const invoke = useMutation({
		mutationFn: (input) => invokeHub({ data: {
			node: input.node,
			tool: input.tool,
			argsJson: JSON.stringify(input.args || {})
		} }),
		onSuccess: (res) => {
			setLastResult(res.text);
			snap.refetch();
		},
		onError: (err) => setLastResult(String(err))
	});
	const reverseCmd = (0, import_react.useMemo)(() => {
		if (!data?.publicUrl || !data.hubKey) return "";
		return `OMEGA_HUB_URL='${data.publicUrl}' OMEGA_HUB_KEY='${data.hubKey}' nohup python3 "$HOME/omega_reverse.py" > "$HOME/.omega-reverse.log" 2>&1 &`;
	}, [data?.publicUrl, data?.hubKey]);
	const liveCount = peers.filter((p) => p.status === "live" || p.status === "reverse").length;
	async function runPreset(preset) {
		setNode(preset.node);
		setTool(preset.tool);
		setArgsText(JSON.stringify(preset.args || {}, null, 2));
		invoke.mutate({
			node: preset.node,
			tool: preset.tool,
			args: preset.args || {}
		});
	}
	function runManual() {
		let args = {};
		try {
			args = argsText.trim() ? JSON.parse(argsText) : {};
		} catch {
			setLastResult("Arguments must be valid JSON.");
			return;
		}
		invoke.mutate({
			node,
			tool,
			args
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen overflow-x-hidden bg-bg px-4 pb-16 pt-6 sm:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-6xl flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.22em] text-faint uppercase",
							children: "Omega mesh"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl font-medium tracking-tight text-fg sm:text-4xl",
							children: "VPS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
							children: "Both directions are live. This sandbox is the hub. Termux is a peer. Either side can call the other through the VPS."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4 text-live" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-faint",
							children: "Mesh"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm tabular-nums text-fg",
							children: [
								liveCount,
								"/",
								Math.max(peers.length, 2),
								" live"
							]
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch",
					children: [
						termux ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeCard, { peer: termux }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl bg-surface p-4 text-muted",
							children: "Termux connecting"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden flex-col items-center justify-center gap-2 lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] tracking-[0.18em] text-faint uppercase",
								children: "reverse"
							})]
						}),
						vps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeCard, { peer: vps }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl bg-surface p-4 text-muted",
							children: "VPS booting"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-w-0 rounded-3xl bg-surface p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium",
								children: "Credentials for the reverse path"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
									label: "Your hub key",
									value: data?.hubKey || ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
									label: "Public VPS URL",
									value: data?.publicUrl || ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
									label: "VPS MCP",
									value: data?.reverseConnect.mcp || ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
									label: "Termux MCP (outbound from hub)",
									value: data?.termuxUrl || ""
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyField, {
								label: "Termux reverse-connect",
								value: reverseCmd
							})
						}),
						data?.termuxLastError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-down",
							children: data.termuxLastError
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid min-w-0 gap-4 lg:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 rounded-3xl bg-surface p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] lg:col-span-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium",
									children: "Call a node"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => runPreset(preset),
									children: preset.label
								}, preset.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-faint",
										children: "Node"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-surface-2 px-3 text-sm text-fg",
										value: node,
										onChange: (e) => setNode(e.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "termux",
											children: "termux"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "vps",
											children: "vps"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-faint",
										children: "Tool"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "mt-1 h-11 w-full rounded-xl border border-line bg-surface-2 px-3 font-mono text-sm text-fg",
										value: tool,
										onChange: (e) => setTool(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-faint",
									children: "Arguments JSON"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "mt-1 min-h-24 w-full rounded-xl border border-line bg-surface-2 px-3 py-2 font-mono text-xs text-fg",
									value: argsText,
									onChange: (e) => setArgsText(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: runManual,
									disabled: invoke.isPending,
									children: invoke.isPending ? "Calling" : "Run"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "mt-4 max-h-72 max-w-full overflow-auto whitespace-pre-wrap break-all rounded-2xl bg-bg p-4 font-mono text-xs leading-relaxed text-muted",
								children: lastResult || "Results land here."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 rounded-3xl bg-surface p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Transcript"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2",
							children: [(data?.transcript ?? []).slice(0, 14).map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-xl bg-surface-2 px-3 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] text-faint",
										children: String(row.t ?? "")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-xs text-fg",
										children: String(row.kind ?? "event")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 truncate font-mono text-[11px] text-muted",
										children: row.detail
									})
								]
							}, String(row.t ?? i))), !data?.transcript?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: "No events yet."
							}) : null]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
