const { sendMessage, sendSticker, sendImage, sendVideo, sendGif, sendAudio, sendButton, sendList, sendTemplate, sendContact, sendLocation, sendReact } = require(__dirname + "/../lib/Baileys");
const { ytSearch, downloadMp3, downloadMp4 } = require(__dirname + "/../lib/Utils");

async function buttonIdResponse({ sock, mek, gid, sid, buttonCMD, buttonARGS, msgdata, isAdmin, isGroupOwner, isOwner, isBotAdmin }) {
const options = { sock, gid, sid, mek };

	try {

		switch (buttonCMD.split("*")[1]) {

		case "playmp4": case "playmp3":
			try {
				if (parseInt(buttonARGS.split("||")[1]) > 600) return sendMessage(options, { text: "O vídeo é superior a 10 minutos, por esse motivo não posso enviar 💽", quoted: mek });
				await sendMessage(options, { text: "⌛ Aguarde, baixando...", quoted: mek });

				if (buttonCMD.split("*")[1] === "playmp4") {
					await downloadMp4(buttonARGS.split("||")[0])
						.then(data => {
							sendVideo(options, {
								url: data.link,
								quoted: mek
							});
						})
						.catch(error => {
							console.log(error.stack);
							sendMessage(options, { text: "Não foi possível concluir o download...", quoted: mek });
						});
				}

				else if (buttonCMD.split("*")[1] === "playmp3") {
					await downloadMp3(buttonARGS.split("||")[0])
						.then(data => {
							sendAudio(options, {
								url: data.link,
								quoted: mek
							});
						})
						.catch(error => {
							console.log(error.stack);
						});
				}
			} catch (error) {
				console.log(error.stack);
			}
			break;

		default:
			sendMessage(options, {
				text: "Esse botão não tem nenhuma função ainda ☹️",
				quoted: mek
			});

		}

	} catch (error) {
		console.log(error);
	}
}

module.exports = { buttonIdResponse };