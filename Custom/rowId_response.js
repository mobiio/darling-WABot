async function rowIdResponse({ sock, mek, gid, sid, listCMD, listARGS, msgdata, isAdmin, isGroupOwner, isOwner, isBotAdmin }) {

	const { sendMessage, sendSticker, sendImage, sendVideo, sendGif, sendAudio, sendButton, sendList, sendTemplate, sendContact, sendLocation, sendReact } = require(__dirname + "/../lib/Baileys");
	const { ytSearch, downloadMp3, downloadMp4 } = require(__dirname + "/../lib/Utils");
	const options = { sock, gid, sid, mek };

	try {

		switch (listCMD.split("*")[1]) {

		case "infomusic":
			let title = listARGS.split("||")[0],
				channel = listARGS.split("||")[1],
				ago = listARGS.split("||")[2],
				seconds = listARGS.split("||")[3];
			thumb = listARGS.split("||")[4];
			url = listARGS.split("||")[5];

			let buttonOptions = [
				{ buttonId: "*playmp4 " + url + "||" + seconds, buttonText: "MP4" },
				{ buttonId: "*playmp3 " + url + "||" + seconds, buttonText: "MP3" }
			];

			sendButton(options, {
				url: thumb,
				caption: title,
				footer: channel + " || " + ago,
				quoted: mek,
				buttonOptions
			});
			break;

		default:
			sendMessage(options, {
				text: "Esse lista não tem nenhuma função ainda ☹️",
				quoted: mek
			});

		}

	} catch (error) {
		console.log(error);
	}
}

module.exports = { rowIdResponse };