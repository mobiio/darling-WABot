const Pino = require("pino");
const { default: AnyWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeInMemoryStore, } = require("@adiwajshing/baileys");

const { clog, sleep } = require(__dirname + "/../../Utils")

const MAIN_LOGGER = Pino({ timestamp: () => `\n\nMAIN_LOGGER\n,"time":"${new Date().toJSON()}"` }),
logger = MAIN_LOGGER.child({}); logger.level = "warn";

const useStore = !process.argv.includes("--no-store"),
doReplies = !process.argv.includes("--no-reply"),
msgRetryCounterMap = {},
store = useStore ? makeInMemoryStore({ logger }) : undefined;
store === null || store === void 0 ? void 0 : store.readFromFile(__dirname + "/store_multi.json");

// save every 10s
setInterval(() => {
	store === null || store === void 0 ? void 0 : store.writeToFile(__dirname + "/store_multi.json");
}, 10000);

// start connection
const startSock = async () => {
	try {

		const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/auth_info");

		// buscar a versão mais recente do WA Web
		const { version, isLatest } = await fetchLatestBaileysVersion();
		clog(`WAWeb v${version.join(".")}, isLatest?: ${isLatest}`, "purple");

		 sock = AnyWASocket({
			version,
			logger: Pino({ level: "silent" }),
			printQRInTerminal: true,
			auth: state,
			msgRetryCounterMap,
			// implementar para lidar com novas tentativas
			getMessage: async (key) => {
				return {
					conversation: "hello"
				};
			}
		});

		store === null || store === void 0 ? void 0 : store.bind(sock.ev);

		try {
			const { listenEvents } = require("./listenEvents");
			await listenEvents(sock);
		} catch (err) {
			console.log(err.stack);
		}

		// reconnect
		sock.ev.on("connection.update", async (update) => {
			try {
				if (!update) return;
				var _a, _b;
				const { connection, lastDisconnect } = update;
				if (connection === "close") {
					if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
						await sleep(1000);
						await startSock();
					}
					else {
						clog("CONEXÃO ENCERRADA VOCÊ FOI DESLOGADO", "red");
					}
				}
				if (connection === "open") {
					clog("✓ CONEXÃO ABERTA [ " + sock.type + " ]", "green");
				}
				if (connection === "connecting") {
					clog("CONECTANDO...", "cyan");
				}
			//console.log("connection update", update);
			} catch(err) {
				console.log(err.stack);
			}
		});

		// ouvir quando as credenciais de autenticação forem atualizadas
		sock.ev.on("creds.update", saveCreds);
		return sock;
	} catch(err) {
		console.log(err);
	}
};
startSock();