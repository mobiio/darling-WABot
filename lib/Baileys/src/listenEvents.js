const fs = require("fs");
const { jidNormalizedUser } = require("@adiwajshing/baileys");

const { sendMessage } = require(__dirname + "/../lib/sendMessage"),
	{ groupRemove } = require(__dirname + "/../lib/groupManagement");
	
const config = require(__dirname + "/../../../Custom/standard/config"),
{ clog } = require(__dirname + "/../../Utils");

const prefix = config.prefix,
botOwner = config.owner;  

const listenEvents = async (sock) => {

	try {

		sock.ev.on("call", item => console.log("recv call event", item));
		sock.ev.on("chats.set", item => console.log(`recv ${item.chats.length} chats (is latest: ${item.isLatest})`));
		sock.ev.on("messages.set", item => console.log(`recv ${item.messages.length} messages (is latest: ${item.isLatest})`));
		sock.ev.on("contacts.set", item => console.log(`recv ${item.contacts.length} contacts`));

		//sock.ev.on("messages.update", m => console.log("messages.update\n" + JSON.stringify(m)));
		//sock.ev.on("message-receipt.update", m => console.log("message-receipt.update\n" + JSON.stringify(m)));
		//sock.ev.on("presence.update", m => console.log("presence.update\n" + JSON.stringify(m)));
		//sock.ev.on("chats.update", m => console.log("chats.update\n" + JSON.stringify(m)));
		//sock.ev.on("chats.delete", m => console.log("chats.delete\n" + JSON.stringify(m)));
		//sock.ev.on("contacts.upsert", m => console.log("contacts.upsert\n" + JSON.stringify(m)));

		sock.ev.on("group-participants.update", async (m) => {
			try {
				console.log("group-participants.update\n" + JSON.stringify(m));
				if (!m) return;
				let gid = m.id ? m.id : false;
				let sid = m.participants[0];
				let action = m.action;

				let isGroup = gid.endsWith("g.us") ? true : false;
				if (!isGroup) return;

				let options = { sock, gid, sid };

				const antiFakeJSON = await JSON.parse(fs.readFileSync(__dirname + "/../../Utils/cache/JSON/antiFake.json"));
				const isAntiFake = isGroup && JSON.stringify(antiFakeJSON).includes(gid) ? true : false;
				if (action === "add" && isAntiFake) {
					let config = require(__dirname + "/../../../Custom/standard/config");
					if (!sid.startsWith("55") && config.lang === "pt") {
						await sock.sendMessage(gid, { text: "🇧🇷 Não permitimos números estrangeiros nesse grupo" });
						return groupRemove(options, { participants: [sid] });
					}
				}

				if (action === "add") {
					return sock.sendMessage(gid, { text: "Bem vindo @" + sid.split("@")[0], mentions: m.participants });
				} else if (action === "remove") {
					return sock.sendMessage(gid, { text: "Adeus @" + sid.split("@")[0], mentions: m.participants });
				} else if (action === "promote") {
					return sock.sendMessage(gid, { text: "Usuário promovido: @" + sid.split("@")[0], mentions: m.participants });
				} else if (action === "demote") {
					return sock.sendMessage(gid, { text: "Usuário despromovido: @" + sid.split("@")[0], mentions: m.participants });
				}
			} catch(err) {
				console.log(err.stack);
			}
		});

		sock.ev.on("messages.upsert", async (message) => {
			try {

				const mek = message.messages[0];
				if (!mek) return;
				if (!mek.message) return;
				if (message.type !== "notify") return;
				//if (mek.key.fromMe === true) return;
				if (mek.key.remoteJid === "status@broadcast") return;

				const { simpleData } = require(__dirname + "/../lib/simpleData"), { simpleGroupData } = require(__dirname + "/../lib/simpleGroupData");

				const gid = mek.key.remoteJid || mek.key.participant;
				let sid = mek.key.participant || mek.key.remoteJid;
				let isGroup = gid.endsWith("g.us") ? true : false;

				try { var profilePicture = !sid.endsWith("whatsapp.net") ? { profilePicture: false } : { profilePicture: await sock.profilePictureUrl(sid, "image") || false }; } catch { profilePicture = { profilePicture: false }; }
				try { var profileBio = !sid.endsWith("whatsapp.net") ? { profileBio: false } : { profileBio: await sock.fetchStatus(sid) }; } catch { { false; } }
				try { var getGroupData = isGroup ? await sock.groupMetadata(gid) : false; } catch { var getGroupData = false; }
				try { var groupPicture = isGroup ? { groupPicture: await sock.profilePictureUrl(gid, "image") } : false; } catch { var groupPicture = false; }

				try { var msgdata = await simpleData(mek, profilePicture, profileBio); } catch { var msgdata = false; }
				try { var groupdata = isGroup && getGroupData !== false ? await simpleGroupData(getGroupData, groupPicture) : false; } catch { var groupdata = false; }

				if (!msgdata) return;
				if (isGroup && !groupdata) return;
				let timeNow = new Date().toString();
				if (timeNow.includes("Brasilia")){
					let getHours = msgdata.time[2].split(":")[0];
					let getMinutes = parseInt(msgdata.time[2].split(getHours)[1].split(":")[1].split(":")[0]);
					let getTiming1 = `${getHours}:${getMinutes-1}`;
					let getTiming2 = `${getHours}:${getMinutes+1}`;
					let getTiming3 = `${getHours}:${getMinutes}`;

					if (!timeNow.includes(getTiming3) && !timeNow.includes(getTiming2) && !timeNow.includes(getTiming1)) return clog("Recebendo mensagens atrasadas " + msgdata.time[2] + "(" + timeNow + ")", "purple");
				}

				const myJid = await jidNormalizedUser(sock.user.id) || false;

				const isOwner = sid === botOwner ? true : false;
				const isAdmin = groupdata && groupdata.admins.includes(sid) || groupdata && groupdata.owner.includes(sid) ? true : false;
				const isBotAdmin = groupdata && groupdata.admins.includes(myJid) || groupdata && groupdata.owner.includes(myJid) ? true : false;
				const isGroupOwner = groupdata && groupdata.owner.includes(sid) ? true : false;

				const CONTENT = msgdata.text ? msgdata.text : msgdata.caption ? msgdata.caption : false;

				const CMD = CONTENT !== false && CONTENT.startsWith(prefix) ? CONTENT.toLowerCase().split(" ")[0] : false;
				const ARGS = CMD !== false ? CONTENT.split(CMD)[1] : false;

				const buttonCMD = msgdata.messageType === "buttonsResponseMessage" && msgdata.buttonId.startsWith("*") ? msgdata.buttonId.split(" ")[0] : false;
				const buttonARGS = buttonCMD !== false ? msgdata.buttonId.split(buttonCMD)[1] : false;

				const listCMD = msgdata.messageType === "listResponseMessage" && msgdata.rowId.startsWith("*") ? msgdata.rowId.split(" ")[0] : false;
				const listARGS = listCMD !== false ? msgdata.rowId.split(listCMD)[1] : false;
				let allMembers = groupdata.owner && groupdata.admins && groupdata.members ? [...groupdata.owner, ...groupdata.admins, ...groupdata.members] : false;

				const { response } = require(__dirname + "/../../../Custom/response");
				if (CMD !== false) response({ sock, mek, sid, gid, isGroup, myJid, prefix, CMD, ARGS, msgdata, groupdata, allMembers, isAdmin, isGroupOwner, isOwner, isBotAdmin });

				const { buttonIdResponse } = require(__dirname + "/../../../Custom/buttonId_response");
				if (buttonCMD != false) buttonIdResponse({ sock, mek, sid, gid, buttonCMD, buttonARGS, msgdata, groupdata, isAdmin, isGroupOwner, isOwner, isBotAdmin });

				const { rowIdResponse } = require(__dirname + "/../../../Custom/rowId_response");
				if (listCMD != false) rowIdResponse({ sock, mek, sid, gid, listCMD, listARGS, msgdata, groupdata, isAdmin, isGroupOwner, isOwner, isBotAdmin });

				let options = { sock, sid, gid, msgdata, mek };
				const reply = (text) => { sendMessage(options, { text: text, quoted: mek }); };

				console.log(groupdata);
				console.log(msgdata);

				const antiLinkJSON = await JSON.parse(fs.readFileSync(__dirname + "/../../Utils/cache/JSON/antiLink.json"));
				const isAntiLink = isGroup && JSON.stringify(antiLinkJSON).includes(gid) ? true : false;
				if (isAntiLink) {
					if (CONTENT !== false && JSON.stringify(CONTENT).includes("https://") || JSON.stringify(CONTENT).includes("http://") || JSON.stringify(CONTENT).includes("s.kwai") || JSON.stringify(CONTENT).includes("chat.whatsapp") || JSON.stringify(CONTENT).includes("wa.me//")) {
						if (mek.key.fromMe) return;
						if (!isBotAdmin) return reply("Bot não é admin");
						if (isOwner || isAdmin) return reply("🔍 isAntiLink");
						await reply("banido pelo AntiLink");
						return groupRemove(options, { participants: [sid] });
					}
				}

				const antiSpecialJSON = await JSON.parse(fs.readFileSync(__dirname + "/../../Utils/cache/JSON/antiSpecial.json"));
				const isAntiSpecial = isGroup && JSON.stringify(antiSpecialJSON).includes(gid) ? true : false;
				if (isAntiSpecial) {
					if (msgdata.messageType === "buttonsMessage" || msgdata.messageType === "listMessage" || msgdata.messageType === "templateMessage" || msgdata.messageType === "catalogMessage" || msgdata.messageType === "productMessage") {
						if (mek.key.fromMe) return;
						if (!isBotAdmin) return reply("Bot não é admin");
						if (isOwner || isAdmin) return reply("🔍 isAntiSpecial");
						reply("banido por enviar " + msgdata.messageType);
						return groupRemove(options, { participants: [sid] });
					}
				}

				const antiLongMessageJSON = await JSON.parse(fs.readFileSync(__dirname + "/../../Utils/cache/JSON/antiLongMessage.json"));
				const isAntiLongMessage = isGroup && JSON.stringify(antiLongMessageJSON).includes(gid) ? true : false;
				if (isAntiLongMessage) {
					if (CONTENT.length > 3500) {
						if (mek.key.fromMe) return;
						if (!isBotAdmin) return reply("Bot não é admin");
						if (isOwner || isAdmin) return reply("🔍 isAntiLongMessage");
						reply("banido por enviar mensagem de texto muito longa");
						return groupRemove(options, { participants: [sid] });
					}
				}

				const antiTagJSON = await JSON.parse(fs.readFileSync(__dirname + "/../../Utils/cache/JSON/antiTag.json"));
				const isAntiTag = isGroup && JSON.stringify(antiTagJSON).includes(gid) ? true : false;
				if (isAntiTag) {
					if (allMembers.length > 5) {
						if (msgdata.mentioned && msgdata.mentioned.length >= allMembers.length - 1) {
							if (mek.key.fromMe) return;
							if (!isBotAdmin) return reply("Bot não é admin");
							if (isOwner || isAdmin) return reply("🔍 isAntiTag");
							reply("banido por marcar muitos usuários");
							return groupRemove(options, { participants: [sid] });
						}
					}
				}

			} catch (error) {
				console.log(error.stack);
			}
		});

	} catch {
		console.log("listenEvents error");
	}

};

module.exports = { listenEvents };