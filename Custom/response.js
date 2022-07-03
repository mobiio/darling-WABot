const fs = require("fs");

const { playMp3, playMp4, ytSearch, isFiltered, addFilter, audioEffect, clog, makeSticker, quo, readmore, sleep } = require(__dirname + "/../lib/Utils")
const preMsg = require(__dirname + "/standard/preMsg");

const { downloadMedia, updateGroupPicture, groupCreate, groupPromote, groupDemote, groupRemove, groupAdd, groupUpdateName, groupUpdateDescription, groupSettingChange, groupLeave, getGroupCode, revokeGroupInviteCode, acceptInviteCode, acceptInviteMessage, inviteCodeInfo, sendMessage, sendSticker, sendImage, sendVideo, sendGif, sendAudio, sendButton, sendList, sendTemplate, sendContact, sendLocation, sendReact } = require(__dirname + "/../lib/Baileys");
	
async function response({ sock, mek, gid, myJid, isGroup, sid, prefix, CMD, ARGS, msgdata, groupdata, allMembers, isAdmin, isGroupOwner, isOwner, isBotAdmin }) {

	const options = { sock, gid, sid, mek, msgdata };

	const reply = (text) => { sendMessage(options, { text: text, quoted: mek }); };
	const writeJSON = ({ path: a, text: b }) => new Promise((d, e) => { let c = JSON.stringify(b); fs.writeFile(a, c, "utf8", function(a) { a && (console.log("writeJSON error\n", a), d(!1)), d(!0); }); });

	try {

		switch (CMD.split(prefix)[1]) {
		
		case "menu":
			sendImage(options, {
				text: preMsg.menu,
				path: __dirname + "/media/image/banner.png",
				quoted: mek
			});
			break;

			// @group Functions

		case "groupname":
			if (!isOwner && !isAdmin) return reply(preMsg.onlyAdmin);
			if (!isBotAdmin) return reply(preMsg.botNotAdmin);
			if (!ARGS) return reply(preMsg.missARGS);

			await groupUpdateName(options, { text: ARGS });
			break;

			//

		case "groupdesc":
			if (!isOwner && !isAdmin) return reply(preMsg.onlyAdmin);
			if (!isBotAdmin) return reply(preMsg.botNotAdmin);
			if (!ARGS) return reply(preMsg.missARGS);

			let oldDesc = groupdata.desc;
			await groupUpdateDescription(options, { text: ARGS });
			let newDesc = ARGS;
			reply("Antiga descrição:\n" + oldDesc + "\n\nNova descrição:\n" + ARGS);
			break;

			//

		case "groupcode":
			let groupCode = await getGroupCode(options, {});
			reply(groupCode);
			break;

			//

		case "revokegroupcode":
			let revokeCode = await revokeGroupInviteCode(options, {});
			reply("Link do Grupo redefinido.\n\nNovo Link: " + revokeCode);
			break;

			//

		case "grouplock": case "groupunlock":
			if (!isOwner && !isAdmin) return reply(preMsg.onlyAdmin);
			if (!isBotAdmin) return reply(preMsg.botNotAdmin);

			CMD.split(prefix)[1] === "grouplock" ?
				await groupSettingChange(options, { action: "lock" })
				: await groupSettingChange(options, { action: "unlock" });
			break;

			//

		case "groupclose": case "groupopen":
			if (!isOwner && !isAdmin) return reply(preMsg.onlyAdmin);
			if (!isBotAdmin) return reply(preMsg.botNotAdmin);

			CMD.split(prefix)[1] === "groupclose" ?
				await groupSettingChange(options, { action: "close" })
				: await groupSettingChange(options, { action: "open" });
			break;

			//

		case "grouppic":
			if (!isOwner && !isAdmin) return reply(preMsg.onlyAdmin);
			if (!isBotAdmin) return reply(preMsg.botNotAdmin);

			if (msgdata.messageType !== "imageMessage" && msgdata.quoted.messageType !== "imageMessage") {
				return reply("Marque uma imagem");
			}

			try {
				reply(preMsg.wait);

				if (msgdata.quoted) {
					if (msgdata.quoted.messageType === "imageMessage") {
						let buffer = await downloadMedia(options, mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, "image");
						await fs.writeFile(__dirname + "/cache/downloadContentImage.jpg", buffer, async function(err) {
							if (err) return console.log(err);
							await updateGroupPicture(options, { path: __dirname + "/cache/downloadContentImage.jpg" });
						});
					} else {
						return reply("Marque uma foto");
					}
				} else if (msgdata.messageType === "imageMessage") {
					let buffer = await downloadMedia(options, mek.message.imageMessage, "image");
					await fs.writeFile(__dirname + "/cache/downloadContentImage.jpg", buffer, async function(err) {
						if (err) return console.log(err);
						await updateGroupPicture(options, { path: __dirname + "/cache/downloadContentImage.jpg" });
					});
				} else {
					return reply("Marque uma foto");
				}
			} catch (err) {
				console.log(err);
			}
			break;

			//

		case "newgroup":
			if (!isOwner) return reply(preMsg.onlyOwner);

			await groupCreate(options, { name: "Meu novo grupo", participants: [sid] });
			break;

			//

		case "demote": case "promote":
			(async () => {
				if (!isOwner && !isAdmin) return reply(preMsg.onlyAdmin);
				if (!isBotAdmin) return reply(preMsg.botNotAdmin);

				let who = msgdata.quoted ? msgdata.quoted.sid
					: ARGS.includes("@") ? parseInt(ARGS.split("@")[1]) + "@s.whatsapp.net"
						: ARGS ? parseInt(ARGS) + "@s.whatsapp.net"
							: false;
				if (!who) return reply(preMsg.tagAnyone);

				if (CMD.split(prefix)[1] === "promote") {
					await groupPromote(options, { participants: [who] });
				}
				else if (CMD.split(prefix)[1] === "demote") {
					await groupDemote(options, { participants: [who] });
				}
			})();
			break;

			//

		case "ban": case "add":
			(async () => {
				if (!isOwner && !isAdmin) return reply(preMsg.onlyAdmin);
				if (!isBotAdmin) return reply(preMsg.botNotAdmin);

				let who = msgdata.quoted ? msgdata.quoted.sid
					: ARGS.includes("@") ? parseInt(ARGS.split("@")[1]) + "@s.whatsapp.net"
						: ARGS ? parseInt(ARGS) + "@s.whatsapp.net"
							: false;
				if (!who) return reply(preMsg.tagAnyone);

				if (CMD.split(prefix)[1] === "add") {
					await groupAdd(options, { participants: [who] });
				}
				else if (CMD.split(prefix)[1] === "ban") {
					if (who === myJid) return reply("Eu não vou me banir 😝");
					if (who === groupdata.owner) return reply(preMsg.cantRemoveGroupOwner);
					await groupRemove(options, { participants: [who] });
				}
			})();
			break;

			//

		case "leave":
			if (!isOwner) return reply(preMsg.onlyOwner);

			await groupLeave(options, {});
			break;

			//

		case "join":
			if (!ARGS) return reply(preMsg.missARGS);
			acceptInviteCode(options, ARGS);
			//acceptInviteMessage(options, { from: sid, code: "code" }) para convites
			break;

			//

		case "infofromcode":
			(async () => {
				if (!ARGS) return reply(preMsg.missARGS);
				if (!ARGS.includes("chat.whatsapp")) return reply("Insira um código de convite valido");
				let infoFromCode = await inviteCodeInfo(options, ARGS);

				let timestamp = infoFromCode.creation * 1000;
				let getTime = new Date(timestamp).toString().split(" G")[0];

				let infoCodeText = `
id: ${infoFromCode.id}
nome: ${infoFromCode.subject}
descrição: ${infoFromCode.desc}
dono do grupo: ${infoFromCode.owner.split("@")[0]}
grupo criado em: ${getTime}
`;
				await reply(infoCodeText);
			})();
			break;

			// @envio de Mensagens

		case "text": case "message":
			sendMessage(options, {
				text: `Olá @${sid.split("@")[0]}`,
				likeHuman: true,
				mentioned: [sid],
				quoted: mek
			});
			break;

			//

		case "sticker":
			sendSticker(options, {
				path: __dirname + "/media/sticker/example.webp",
				quoted: mek,
				isForward: true
			});
			break;

			//

		case "image":
			await sendImage(options, {
				path: __dirname + "/media/image/example.jpg",
				quoted: mek,
				caption: "@" + sid.split("@")[0] + " isso é uma imagem armazenada no dispositivo",
				mentioned: [sid]
			});
			break;

			//

		case "video":
			sendVideo(options, {
				path: __dirname + "/media/video/example.mp4",
				quoted: mek,
				caption: "Vídeo de exemplo"
			});

			sendGif(options, {
				path: __dirname + "/media/video/example.mp4",
				quoted: mek,
				caption: "Gif de exemplo"
			});
			break;
				
			//

		case "audio":
			sendAudio(options, {
				path: __dirname + "/media/audio/example.mp3",
				quoted: mek,
				likeHuman: true,
				ptt: true
			});
			break;
				
			//

		case "button":
			(async () => {

				let buttonOptions = [
					{ buttonId: "*Iddobotão1", buttonText: "botão 1" },
					{ buttonId: "*id do botão 2", buttonText: "botão 2" }
				];

				await sendButton(options, {
					text: "Uma mensagem de botões",
					footer: "Legenda",
					quoted: mek,
					buttonOptions
				});

				await sendButton(options, {
					path: __dirname + "/media/image/example.jpg",
					caption: "Uma mensagem de botões com foto",
					footer: "Legenda",
					quoted: mek,
					buttonOptions
				});

				await sendButton(options, {
					path: __dirname + "/media/video/example.mp4",
					caption: "Uma mensagem de botões com vídeo",
					footer: "Legenda",
					quoted: mek,
					buttonOptions
				});

			})();
			break;
				
			//

		case "list":
			(async () => {

				let itens = [
					{ title: "Opção 1", rowId: "*id1", description: "descrição do item 1" },
					{ title: "Opção 2", rowId: "*id2", description: "descrição do item 2" }
				];

				await sendList(options, {
					title: "Título",
					text: "Texto",
					footer: "Legenda",
					buttonText: "Botão",
					itens,
					quoted: mek
				});
			})();
			break;
				
			//

		case "template":
			(async () => {

				let template = [
					{ urlButton: { displayText: "Veja meu github!", url: "https://github.com/m-mobi" } },
					{ callButton: { displayText: "Me ligue!", phoneNumber: sid.split("@")[0] } },
					{ quickReplyButton: { displayText: "Um botão", id: "id desse botão" } },
				];

				await sendTemplate(options, {
					text: "Template",
					footer: "Legenda",
					template
				});

				await sendTemplate(options, {
					path: __dirname + "/media/image/example.jpg",
					caption: "Template com imagem",
					footer: "Legenda",
					template
				});

			})();
			break;
				
			//

		case "contact":
			sendContact(options, {
				contact: {
					name: msgdata.pushname,
					fone: msgdata.sid.split("@")[0],
					org: "Bot Inc™"
				},
				quoted: mek
			});
			break;
				
			//

		case "location":
			sendLocation(options, {
				latitude: 40.689248,
				longitude: -74.044515,
				quoted: mek
			});
			break;
				
			//

		case "react":
			sendReact(options, {
				emoji: "👍"
			});
			break;

			//

		case "tag":
			if (!isAdmin && !isOwner) return reply(preMsg.onlyAdmin);
			if (!ARGS) return reply(preMsg.missARGS);
			sendMessage(options, {
				text: ARGS,
				quoted: quo("⚠️ " + msgdata.pushname),
				mentioned: allMembers
			});
			break;

			// comandos extra:

		case "ytplay":
			(async () => {
				try {
				if (!ARGS) return reply(preMsg.missARGS)
					reply(preMsg.wait);
					ytSearch(ARGS)
						.then(data => {

							let videos = [];
							for (let i = 0; i < data.length; i++) {
								if (data[i].type === "video") videos.push(data[i]);
							}

							let itens = [];
							for (let y = 0; y < videos.length; y++) {
								let title = videos[y].title, ago = videos[y].ago, channel = videos[y].author.name ? videos[y].author.name : "unknow", seconds = videos[y].seconds, thumb = videos[y].thumbnail, url = videos[y].url;
								let text = `${title}||${channel}||${ago}||${seconds}||${thumb}||${url}`;
								itens.push({ title: videos[y].title, rowId: "*infomusic " + text, description: videos[y].author.name ? videos[y].author.name : "unknow" });
							}

							sendList(options, {
								title: "🔍 " + ARGS,
								text: "Lista de vídeos",
								footer: "escolha um item da lista para baixar o vídeo!",
								buttonText: "ver lista",
								itens,
								quoted: mek
							});
						})
						.catch(error => {
							console.log(error.stack);
							sendMessage(options, { text: "Algo saiu errado... Tente novamente mais tarde", quoted: mek });
						});
				} catch {
					reply("Ocorreu um erro");
				}
			})();
			break;

			//

		case "effect":
			try {
				if (!ARGS) return reply("Marque um áudio e insira qual efeito deseja aplicar nele!\nEfeitos:\n- fast\n- bass\n- burst\n- adolescent\n- squirrel\n\nexemplo: #effect fast");
				if (msgdata.quoted) {
					if (msgdata.quoted.messageType === "audioMessage") {
						reply(preMsg.wait);
						let buffer = await downloadMedia(options, mek.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage, "audio");
						await fs.writeFile(__dirname + "/cache/downloadContentAudio.mp3", buffer, async function(err) {
							if (err) {
								reply("Erro");
								return console.log(err);
							}
							console.log("downloaded audio");
							let isMake = await audioEffect({ path: __dirname + "/cache/downloadContentAudio.mp3", savePath: __dirname + "/cache/audioEffect.mp3", effect: ARGS.toLowerCase().replace(/ /g, "") });
							if (!isMake) return reply("Erro ao aplicar filtro selecionado! Tente novamente");
							if (isMake) {
								sendAudio(options, {
									path: __dirname + "/cache/audioEffect.mp3",
									quoted: mek
								});
								await fs.promises.unlink(__dirname + "/cache/audioEffect.mp3");
							}
						});
					} else {
						return reply("marque um áudio");
					}
				} else {
					return reply("marque um áudio");
				}
			} catch {
				reply("Ocorreu um erro");
			}
			break;

			//

		case "stk": case "crop":
			try {
				if (msgdata.messageType !== "imageMessage" && msgdata.messageType !== "videoMessage" && msgdata.quoted.messageType !== "videoMessage" && msgdata.quoted.messageType !== "imageMessage") {
					return reply("Marque uma imagem ou vídeo de até 10 segundos");
				}

				reply(preMsg.wait);

				if (msgdata.quoted) {
					if (msgdata.quoted.messageType === "imageMessage") {
						let buffer = await downloadMedia(options, mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage, "image");
						await fs.writeFile(__dirname + "/cache/downloadContentImage.jpeg", buffer, async function(err) {
							if (err) return console.log(err);
							console.log("downloaded image");
							let isMake = await makeSticker({ crop: CMD.split(prefix)[1] === "stk" ? false : true, path: __dirname + "/cache/downloadContentImage.jpeg", savePath: __dirname + "/cache/makeSticker.webp" });
							if (!isMake) return reply("Algo deu errado!");
							return sendSticker(options, {
								path: __dirname + "/cache/makeSticker.webp",
								quoted: mek,
							});
						});
					}
					if (msgdata.quoted.messageType === "videoMessage") {
						let buffer = await downloadMedia(options, mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage, "video");
						await fs.writeFile(__dirname + "/cache/downloadContentVideo.mp4", buffer, async function(err) {
							if (err) return console.log(err);
							console.log("downloaded video");
							let isMake = await makeSticker({ crop: CMD.split(prefix)[1] === "stk" ? false : true, path: __dirname + "/cache/downloadContentVideo.mp4", savePath: __dirname + "/cache/makeSticker.webp" });
							if (!isMake) return reply("Algo deu errado!");
							return sendSticker(options, {
								path: __dirname + "/cache/makeSticker.webp",
								quoted: mek,
							});
						});
					}
				} else if (msgdata.messageType === "imageMessage") {
					let buffer = await downloadMedia(options, mek.message.imageMessage, "image");
					await fs.writeFile(__dirname + "/cache/downloadContentImage.jpeg", buffer, async function(err) {
						if (err) return console.log(err);
						console.log("downloaded image");
						let isMake = await makeSticker({ crop: CMD.split(prefix)[1] === "stk" ? false : true, path: __dirname + "/cache/downloadContentImage.jpeg", savePath: __dirname + "/cache/makeSticker.webp" });
						if (!isMake) return reply("Algo deu errado!");
						return sendSticker(options, {
							path: __dirname + "/cache/makeSticker.webp",
							quoted: mek,
						});
					});
				} else if (msgdata.messageType === "videoMessage") {
					let buffer = await downloadMedia(options, mek.message.videoMessage, "video");
					await fs.writeFile(__dirname + "/cache/downloadContentVideo.mp4", buffer, async function(err) {
						if (err) return console.log(err);
						console.log("downloaded video");
						let isMake = await makeSticker({ crop: CMD.split(prefix)[1] === "stk" ? false : true, path: __dirname + "/cache/downloadContentVideo.mp4", savePath: __dirname + "/cache/makeSticker.webp" });
						if (!isMake) return reply("Algo deu errado!");
						return sendSticker(options, {
							path: __dirname + "/cache/makeSticker.webp",
							quoted: mek,
						});
					});
				}
			} catch {
				reply("Ocorreu um erro");
			}
			break;

		case "antilink":
			(async () => {
				if (!isOwner && !isAdmin) return reply (preMsg.onlyAdmin);
				if (!isBotAdmin) return reply("Bot não é adm burro");
				let antiLinkJSON = await JSON.parse(fs.readFileSync(__dirname + "/../lib/Utils/cache/JSON/antiLink.json"));
				let isAntiLink = isGroup && JSON.stringify(antiLinkJSON).includes(gid) ? true : false;

				if (!isAntiLink) {
					let pushJSON = [gid, ...antiLinkJSON];
					await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiLink.json", text: pushJSON });
					reply("AntiLink ativado com sucesso");
				}
				else if (isAntiLink) {
					for (var i = 0; i < antiLinkJSON.length; i++) {
						if (antiLinkJSON[i] === gid) {
							antiLinkJSON.splice(i, 1);
						}
						await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiLink.json", text: antiLinkJSON });
						reply("AntiLink desativado");
					}
				}
			})();
			break;

			//

		case "antifake":
			(async () => {
				let config = require(__dirname + "/standard/config");
				if (config.lang !== "pt") return reply("not available in your region");
				if (!isOwner && !isAdmin) return reply (preMsg.onlyAdmin);
				if (!isBotAdmin) return reply("Bot não é adm burro");
				let antiFakeJSON = await JSON.parse(fs.readFileSync(__dirname + "/../lib/Utils/cache/JSON/antiFake.json"));
				let isAntiFake = isGroup && JSON.stringify(antiFakeJSON).includes(gid) ? true : false;

				if (!isAntiFake) {
					let pushJSON = [gid, ...antiFakeJSON];
					await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiFake.json", text: pushJSON });
					reply("AntiFake ativado com sucesso");
				}
				else if (isAntiFake) {
					for (var i = 0; i < antiFakeJSON.length; i++) {
						if (antiFakeJSON[i] === gid) {
							antiFakeJSON.splice(i, 1);
						}
						await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiFake.json", text: antiFakeJSON });
						reply("AntiFake desativado");
					}
				}
			})();
			break;

			//

		case "antispecial":
			(async () => {
				if (!isOwner && !isAdmin) return reply (preMsg.onlyAdmin);
				if (!isBotAdmin) return reply("Bot não é adm burro");
				let antiSpecialJSON = await JSON.parse(fs.readFileSync(__dirname + "/../lib/Utils/cache/JSON/antiSpecial.json"));
				let isAntiSpecial = isGroup && JSON.stringify(antiSpecialJSON).includes(gid) ? true : false;

				if (!isAntiSpecial) {
					let pushJSON = [gid, ...antiSpecialJSON];
					await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiSpecial.json", text: pushJSON });
					reply("AntiSpecial ativado com sucesso");
				}
				else if (isAntiSpecial) {
					for (var i = 0; i < antiSpecialJSON.length; i++) {
						if (antiSpecialJSON[i] === gid) {
							antiSpecialJSON.splice(i, 1);
						}
						await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiSpecial.json", text: antiSpecialJSON });
						reply("AntiSpecial desativado");
					}
				}
			})();
			break;

			//

		case "antitrava":
			(async () => {
				if (!isOwner && !isAdmin) return reply (preMsg.onlyAdmin);
				if (!isBotAdmin) return reply("Bot não é adm burro");
				let antiLongMessageJSON = await JSON.parse(fs.readFileSync(__dirname + "/../lib/Utils/cache/JSON/antiLongMessage.json"));
				let isAntiLongMessage = isGroup && JSON.stringify(antiLongMessageJSON).includes(gid) ? true : false;

				if (!isAntiLongMessage) {
					let pushJSON = [gid, ...antiLongMessageJSON];
					await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiLongMessage.json", text: pushJSON });
					reply("AntiTrava ativado com sucesso");
				}
				else if (isAntiLongMessage) {
					for (var i = 0; i < antiLongMessageJSON.length; i++) {
						if (antiLongMessageJSON[i] === gid) {
							antiLongMessageJSON.splice(i, 1);
						}
						await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/antiLongMessage.json", text: antiLongMessageJSON });
						reply("AntiTrava desativado");
					}
				}
			})();
			break;

			//

		case "antitag":
			(async () => {
				if (!isOwner && !isAdmin) return reply (preMsg.onlyAdmin);
				if (!isBotAdmin) return reply("Bot não é adm burro");
				let AntiTagJSON = await JSON.parse(fs.readFileSync(__dirname + "/../lib/Utils/cache/JSON/AntiTag.json"));
				let isAntiTag = isGroup && JSON.stringify(AntiTagJSON).includes(gid) ? true : false;

				if (!isAntiTag) {
					let pushJSON = [gid, ...AntiTagJSON];
					await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/AntiTag.json", text: pushJSON });
					reply("AntiTag ativado com sucesso");
				}
				else if (isAntiTag) {
					for (var i = 0; i < AntiTagJSON.length; i++) {
						if (AntiTagJSON[i] === gid) {
							AntiTagJSON.splice(i, 1);
						}
						await writeJSON({ path: __dirname + "/../lib/Utils/cache/JSON/AntiTag.json", text: AntiTagJSON });
						reply("AntiTag desativado");
					}
				}
			})();
			break;

			//

		case "msgdata":
			(async () => {
				let tipoMensagem = msgdata.messageType,
					groupId = msgdata.gid,
					senderId = msgdata.sid,
					pushname = msgdata.pushname,
					fotoDePerfil = msgdata.userPicture,
					recado = msgdata.userBio,
					tempo = msgdata.time,
					texto = msgdata.text,
					mençao = msgdata.mentioned;

				let toPortuguese = tempo[0] === "Sun" ? tempo[0] = "Domingo" : tempo[0] === "Mon" ? tempo[0] === "Segunda" : tempo[0] === "Tue" ? tempo[0] === "Terça" : tempo[0] === "Wed" ? tempo[0] === "Quarta" : tempo[0] === "Thu" ? tempo[0] === "Quinta" : tempo[0] === "Fri" ? tempo[0] === "Sexta" : tempo[0] === "Sat" ? tempo[0] === "Sábado" : undefined;
				let formatedTime = `${tempo[0]}, ${tempo[1]}, ${tempo[2]}`;

				let prepareMessage = `
*DADOS DA MENSAGEM:*

*tipo de mensagem:* ${tipoMensagem.split("Message")[0]}
*id do grupo:* ${groupId}
*usuário:* @${senderId.split("@")[0]}
*nome do usuário:* ${pushname}
*recado do usuário:* ${recado}
*texto da mensagem:* _"${texto}"_
*menções:* ${msgdata.mençao ? msgdata.mençao : "não"}

_enviado ${formatedTime}_
`;

				if (fotoDePerfil) {
					sendImage(options, {
						url: fotoDePerfil,
						caption: prepareMessage,
						mentioned: [sid],
						quoted: mek
					});
				} else if (!fotoDePerfil) {
					sendMessage(options, {
						text: prepareMessage,
						mentioned: [sid],
						quoted: mek
					});
				}
			})();
			break;

			//

		case "groupdata":
			(async () => {
				let groupId = groupdata.gid,
					groupName = groupdata.name,
					groupDesc = groupdata.desc,
					groupPicture = groupdata.picture,
					tempo = groupdata.creation,
					donoGrupo = groupdata.owner,
					groupAdmins = groupdata.admins,
					groupMembers = groupdata.members;

				let toPortuguese = tempo[0] === "Sun" ? tempo[0] = "Domingo" : tempo[0] === "Mon" ? tempo[0] === "Segunda" : tempo[0] === "Tue" ? tempo[0] === "Terça" : tempo[0] === "Wed" ? tempo[0] === "Quarta" : tempo[0] === "Thu" ? tempo[0] === "Quinta" : tempo[0] === "Fri" ? tempo[0] === "Sexta" : tempo[0] === "Sat" ? tempo[0] === "Sábado" : undefined;
				let formatedTime = `${tempo[0]}, ${tempo[1]}, ${tempo[2]}`;


				let prepareMessage = `
*DADOS DO GRUPO:*

*id:* ${groupId}
*nome:* ${groupName}
*descrição:* _"${groupDesc ? groupDesc : "undefined"}"_

_grupo criado ${formatedTime}_
_criador:_ @${donoGrupo[0].split("@")[0]}`;

				if (groupPicture) {
					sendImage(options, {
						url: groupPicture,
						caption: prepareMessage,
						quoted: mek,
						mentioned: donoGrupo
					});
				} else {
					sendMessage(options, {
						text: prepareMessage,
						quoted: mek,
						mentioned: donoGrupo
					});
				}
			})();
			break;

		default:

			sendReact(options, {
				emoji: "❓"
			});

		}

	} catch (error) {
		console.log(error.stack);
	}

}

module.exports = { response };