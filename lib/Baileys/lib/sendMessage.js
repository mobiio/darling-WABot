const { MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys");
const fp = require("fs").promises;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendMessage(options, { to, text, likeHuman, quoted, isForward, forwardScore, mentioned }) {

	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!forwardScore) forwardScore = 1;
		if (!isForward) isForward = false;
		if (!quoted) quoted = false;

		if (!likeHuman) {
			await sock.sendMessage(to,
				{
					text,
					mentions: mentioned,
					contextInfo: { forwardingScore: forwardScore, isForwarded: isForward }
				},
				{ quoted });
		} else if (likeHuman) {
			await sock.presenceSubscribe(gid);
			await sleep(500);
			await sock.sendPresenceUpdate("composing", gid);
			await sleep(text.length * 100);
			await sock.sendPresenceUpdate("paused", gid);
			await sock.sendMessage(to,
				{
					text,
					mentions: mentioned,
					contextInfo: { forwardingScore: forwardScore, isForwarded: isForward }
				},
				{ quoted });
		}


	} catch (error) {
		console.log(error.stack);
	}

}

async function sendSticker(options, { to, path, url, quoted, isForward, forwardScore, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!forwardScore) forwardScore = 1;
		if (!isForward) isForward = false;
		if (!quoted) quoted = false;

		await sock.sendMessage(to, {
			sticker: path ? await fp.readFile(path) : url ? { url: url } : false,
			mentions: mentioned,
			/*jpegThumbnail: thumb,*/
			contextInfo: { forwardingScore: forwardScore, isForwarded: isForward }
		},
		{ quoted: quoted });

	} catch (error) {
		console.log(error.stack);
	}
}

async function sendImage(options, { to, path, thumb, url, caption, text, quoted, isForward, forwardScore, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!forwardScore) forwardScore = 1;
		if (!isForward) isForward = false;
		if (!quoted) quoted = false;
		if (!thumb) thumb = null;

		await sock.sendMessage(to, {
			image: path ? await fp.readFile(path) : url ? { url: url } : false,
			mentions: mentioned,
			jpegThumbnail: thumb,
			/*jpegThumbnail: thumb,*/
			caption: caption ? caption : text ? text : null,
			contextInfo: { forwardingScore: forwardScore, isForwarded: isForward }
		},
		{ quoted: quoted });

	} catch (error) {
		console.log(error.stack);
	}
}

async function sendVideo(options, { to, path, thumb, url, caption, text, quoted, isForward, forwardScore, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!forwardScore) forwardScore = 1;
		if (!isForward) isForward = false;
		if (!quoted) quoted = false;
		if (!thumb) thumb = null;

		await sock.sendMessage(to, {
			video: path ? await fp.readFile(path) : url ? { url: url } : false,
			mentions: mentioned,
			jpegThumbnail: thumb,
			/*jpegThumbnail: thumb,*/
			caption: caption ? caption : text ? text : null,
			contextInfo: { forwardingScore: forwardScore, isForwarded: isForward }
		},
		{ quoted: quoted });

	} catch (error) {
		console.log(error.stack);
	}
}

async function sendGif(options, { to, path, thumb, url, caption, text, quoted, isForward, forwardScore, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		if (!thumb) thumb = null;

		if (!to) to = gid;
		if (!forwardScore) forwardScore = 1;
		if (!isForward) isForward = false;
		if (!quoted) quoted = false;

		await sock.sendMessage(to, {
			video: path ? await fp.readFile(path) : url ? { url: url } : false,
			mentions: mentioned,
			jpegThumbnail: thumb,
			caption: caption ? caption : text ? text : null,
			gifPlayback: true,
			contextInfo: { forwardingScore: forwardScore, isForwarded: isForward }
		},
		{ quoted: quoted });

	} catch (error) {
		console.log(error.stack);
	}
}

async function sendAudio(options, { to, path, likeHuman, url, ptt, quoted, isForward, forwardScore, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!forwardScore) forwardScore = 1;
		if (!isForward) isForward = false;
		if (!quoted) quoted = false;
		if (!ptt) ptt = false;

		if (!likeHuman) {
			await sock.sendMessage(to,
				{
					audio: path ? await fp.readFile(path) : url ? { url: url } : null,
					mentions: mentioned,
					mimetype: "audio/mp4",
					contextInfo: { forwardingScore: forwardScore, isForwarded: isForward },
					ptt
				},
				{ quoted: quoted }
			);
		} else if (likeHuman) {
			await sock.presenceSubscribe(gid);
			await sleep(500);
			await sock.sendPresenceUpdate("recording", gid);
			await sleep(6000);
			await sock.sendPresenceUpdate("paused", gid);
			await sock.sendMessage(to,
				{
					audio: path ? await fp.readFile(path) : url ? { url: url } : null,
					mentions: mentioned,
					mimetype: "audio/mp4",
					contextInfo: { forwardingScore: forwardScore, isForwarded: isForward  },
					ptt
				},
				{ quoted: quoted }
			);
		}

	} catch (error) {
		console.log(error.stack);
	}
}


async function sendButton(options, { to, text, thumb, caption, footer, quoted, path, url, buttonOptions, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!thumb) thumb = null;
		if (!to) to = gid;
		if (!quoted) quoted = mek;
		if (!text) text = null;
		if (!caption) caption = null;
		if (!footer) footer = null;
		if (!buttonOptions) throw "buttonOptions não foi definido";

		let buttons;
		buttonOptions.length === 1 ?
			buttons = [
				{ buttonId: buttonOptions[0].buttonId, buttonText: { displayText: buttonOptions[0].buttonText }, type: 1 }
			]
			: buttonOptions.length === 2 ?
				buttons = [
					{ buttonId: buttonOptions[0].buttonId, buttonText: { displayText: buttonOptions[0].buttonText }, type: 1 },
					{ buttonId: buttonOptions[1].buttonId, buttonText: { displayText: buttonOptions[1].buttonText }, type: 1 }
				]
				: buttonOptions.length >= 3 ?
					buttons = [
						{ buttonId: buttonOptions[0].buttonId, buttonText: { displayText: buttonOptions[0].buttonText }, type: 1 },
						{ buttonId: buttonOptions[1].buttonId, buttonText: { displayText: buttonOptions[1].buttonText }, type: 1 },
						{ buttonId: buttonOptions[2].buttonId, buttonText: { displayText: buttonOptions[2].buttonText }, type: 1 }
					] : buttons = {};

		if (!path && !url) {
			if (!text) throw "texto da mensagem está indefinido";
			await sock.sendMessage(to,
				{
					text: text,
					mentions: mentioned,
					footer: footer,
					buttons: buttons,
					headerType: 1
				},
				{ quoted: quoted });

		} else if (path || url) {
			let imageOrVideo;
			imageOrVideo = { image: path ? await fp.readFile(path) : url ? { url: url } : false };
			if (path && path.endsWith("mp4")) imageOrVideo = { video: path ? await fp.readFile(path) : url ? { url: url } : false };

			await sock.sendMessage(to,
				{
					...imageOrVideo,
					jpegThumbnail: thumb,
					caption: caption,
					mentions: mentioned,
					footer: footer,
					buttons: buttons,
					headerType: 4
				},
				{ quoted: quoted });
		}

	} catch (error) {
		console.log(error.stack);
	}
}


async function sendList(options, { to, text, title, buttonText, footer, itens, quoted, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!quoted) quoted = false;

		let myRows = { rows: [] };
		for (let i = 0; i < itens.length; i++) {
			(myRows.rows).push(itens[i]);
		}

		const theSections = [
			{
				title: "Selecione um item para continuar",
				...myRows
			}
		];

		await sock.sendMessage(to,
			{
				text: text,
				mentions: mentioned,
				footer: footer,
				title: title,
				buttonText: buttonText,
				sections: theSections
			},
			{ quoted: quoted });


	} catch (error) {
		console.log(error.stack);
	}
}

async function sendTemplate(options, { to, text, caption, footer, quoted, path, template, url, mentioned }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!text) text = caption;
		if (!caption) caption = text;
		if (!quoted) quoted = false;

		let myTemplate = [];
		for (let i = 0; i < template.length; i++) {

			template[i].urlButton ?
				myTemplate.push({
					...{ index: 1, urlButton: template[i].urlButton }
				})
				: template[i].callButton ?
					myTemplate.push({
						...{ index: 2, callButton: template[i].callButton }
					})
					: template[i].quickReplyButton ?
						myTemplate.push({
							...{ index: 3, quickReplyButton: template[i].quickReplyButton }
						})
						: "";

		}

		if (!path && !url) {
			const templateMessage = {
				text: text,
				mentions: mentioned,
				footer: footer,
				templateButtons: template
			};
			await sock.sendMessage(to, templateMessage);
		} else {
			const templateMessage = {
				image: url ? { url: url } : path ? await fp.readFile(path) : false,
				caption: text,
				contextInfo: { mentionedJid: mentioned },
				footer: footer,
				templateButtons: template
			};
			await sock.sendMessage(to, templateMessage);
		}

	} catch (error) {
		console.log(error.stack);
	}
}

async function sendContact(options, { to, contact, quoted }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!quoted) quoted = false;

		let vcard = "BEGIN:VCARD\n" // metadata of the contact card
			+ "VERSION:3.0\n"
			+ "FN:" + contact.name + "\n" // full name
			+ "ORG:" + contact.org + ";\n" // the organization of the contact
			+ "TEL;type=CELL;type=VOICE;waid=" + contact.fone.replace(/[()-+ ]/g, "") + ":" + contact.fone + "\n"
			+ "END:VCARD";
		await sock.sendMessage(
			to,
			{
				contacts: {
					displayName: contact.name,
					contacts: [{ vcard }]
				}
			},
			{ quoted: quoted }
		);

	} catch (error) {
		console.log(error.stack);
	}
}

async function sendLocation(options, { to, latitude, longitude, quoted }) {
	try {

		let sock = options.sock;
		let gid = options.gid;

		if (!to) to = gid;
		if (!quoted) quoted = false;

		await sock.sendMessage(
			to,
			{ location: { degreesLatitude: latitude, degreesLongitude: longitude } },
			{ quoted: quoted }
		);
	} catch (error) {
		console.log(error.stack);
	}
}

async function sendReact(options, { to, emoji }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!to) to = gid;
		if (!emoji) throw "Emoji não especificado";

		await sock.sendMessage(to, { react: { text: emoji, key: mek.key } });

	} catch (error) {
		console.log(error.stack);
	}
}

module.exports = { sendMessage, sendSticker, sendImage, sendVideo, sendGif, sendAudio, sendButton, sendList, sendTemplate, sendContact, sendLocation, sendReact };