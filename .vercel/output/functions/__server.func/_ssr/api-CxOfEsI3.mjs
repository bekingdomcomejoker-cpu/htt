import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CxOfEsI3.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var HUB = process.env.OMEGA_VPS_ORIGIN || "http://127.0.0.1:8790";
async function hubKey() {
	const { readFile } = await import("node:fs/promises");
	const raw = await readFile("/workspace/hub/config.json", "utf8");
	return JSON.parse(raw).hubKey;
}
async function hubFetch(path, init) {
	const key = await hubKey();
	const text = await (await fetch(`${HUB}${path}`, {
		...init,
		headers: {
			"content-type": "application/json",
			"x-api-key": key,
			...init?.headers || {}
		}
	})).text();
	try {
		return JSON.parse(text);
	} catch {
		return {
			ok: false,
			error: text.slice(0, 400)
		};
	}
}
function asPeer(value) {
	const p = value ?? {};
	const tools = Array.isArray(p.tools) ? p.tools.map(String) : [];
	return {
		id: String(p.id ?? ""),
		name: String(p.name ?? ""),
		role: String(p.role ?? ""),
		via: String(p.via ?? ""),
		status: String(p.status ?? "down"),
		lastSeen: p.lastSeen == null ? null : String(p.lastSeen),
		tools,
		latencyMs: typeof p.latencyMs === "number" ? p.latencyMs : null,
		reverse: Boolean(p.reverse)
	};
}
function emptySnapshot(error) {
	return {
		ok: false,
		error,
		service: "omega-vps",
		startedAt: "",
		publicUrl: null,
		hubKey: "",
		termuxUrl: "",
		termuxConfigured: false,
		peers: [],
		inbox: [],
		transcript: [],
		termuxLastError: null,
		reverseConnect: {
			url: null,
			mcp: null,
			health: null
		}
	};
}
var getHubSnapshot_createServerFn_handler = createServerRpc({
	id: "0122ba6d2a99b0277b63d4e9aa94e34734217a037a4fb5cf12bc9502237b7b84",
	name: "getHubSnapshot",
	filename: "src/lib/hub/api.ts"
}, (opts) => getHubSnapshot.__executeServer(opts));
var getHubSnapshot = createServerFn({ method: "POST" }).handler(getHubSnapshot_createServerFn_handler, async () => {
	try {
		const raw = await hubFetch("/v1/snapshot");
		const reverse = raw.reverseConnect ?? {};
		const inbox = Array.isArray(raw.inbox) ? raw.inbox : [];
		const transcript = Array.isArray(raw.transcript) ? raw.transcript : [];
		return {
			ok: Boolean(raw.ok),
			service: String(raw.service ?? "omega-vps"),
			startedAt: String(raw.startedAt ?? ""),
			publicUrl: raw.publicUrl ? String(raw.publicUrl) : null,
			hubKey: String(raw.hubKey ?? ""),
			termuxUrl: String(raw.termuxUrl ?? ""),
			termuxConfigured: Boolean(raw.termuxConfigured),
			peers: Array.isArray(raw.peers) ? raw.peers.map(asPeer) : [],
			inbox: inbox.map((row) => {
				const m = row;
				return {
					id: String(m.id ?? ""),
					to: String(m.to ?? ""),
					body: String(m.body ?? ""),
					at: String(m.at ?? "")
				};
			}),
			transcript: transcript.map((row) => {
				const m = row;
				return {
					t: String(m.t ?? ""),
					kind: String(m.kind ?? "event"),
					detail: JSON.stringify(m).slice(0, 240)
				};
			}),
			termuxLastError: raw.termuxLastError ? String(raw.termuxLastError) : null,
			reverseConnect: {
				url: reverse.url ? String(reverse.url) : null,
				mcp: reverse.mcp ? String(reverse.mcp) : null,
				health: reverse.health ? String(reverse.health) : null
			}
		};
	} catch (err) {
		return emptySnapshot(err instanceof Error ? err.message : "VPS unreachable");
	}
});
var invokeHub_createServerFn_handler = createServerRpc({
	id: "903d8e95b9c166a9ef0cfd73fcd867f6002dbb3ca4c8d41984b8c7a76275472d",
	name: "invokeHub",
	filename: "src/lib/hub/api.ts"
}, (opts) => invokeHub.__executeServer(opts));
var invokeHub = createServerFn({ method: "POST" }).validator((input) => input).handler(invokeHub_createServerFn_handler, async ({ data }) => {
	let args = {};
	if (data.argsJson.trim()) {
		const parsed = JSON.parse(data.argsJson);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) args = parsed;
	}
	const raw = await hubFetch("/v1/invoke", {
		method: "POST",
		body: JSON.stringify({
			node: data.node,
			tool: data.tool,
			args
		})
	});
	return {
		ok: Boolean(raw.ok),
		text: JSON.stringify(raw, null, 2).slice(0, 8e3)
	};
});
//#endregion
export { getHubSnapshot_createServerFn_handler, invokeHub_createServerFn_handler };
