const { MessageType, MessageOptions, Mimetype } = require("@adiwajshing/baileys");
const fs = require("fs"),
	fp = fs.promises;

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function updateGroupPicture(options, { from, url, path }) {

	try {
		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;
		if (!from) from = gid;

		await sock.updateProfilePicture(from, { url: path ? path : url });
	} catch (err) {
		console.log(err.stack);
	}
}

///

async function groupCreate(options, { name, participants /*array*/, message }) {

	const sock = options.sock;

	let group = await sock.groupCreate(name, participants);
	console.log("Grupo criado com sucesso: " + group);
	sock.sendMessage(group.id, { text: message ? message : "Bem vindo ao meu grupo!" });

}

//

async function groupPromote(options, { to, from, participants /*array*/, message }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;
		if (!to) to = gid;

		let response = await sock.groupParticipantsUpdate(
			from,
			participants,
			"promote" // replace this parameter with "remove", "demote" or "promote"
		);
	} catch (err) {
		console.log(err.stack);
	}
}

//

async function groupDemote(options, { from, to, participants /*array*/, message }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;
		if (!to) to = gid;

		let response = await sock.groupParticipantsUpdate(
			from,
			participants,
			"demote" // replace this parameter with "remove", "demote" or "promote"
		);
	} catch (err) {
		console.log(err.stack);
	}
}

//

async function groupRemove(options, { from, to, participants /*array*/, message }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;
		if (!to) to = gid;

		let response = await sock.groupParticipantsUpdate(
			from,
			participants,
			"remove" // replace this parameter with "remove", "demote" or "promote"
		);
	} catch (err) {
		console.log(err.stack);
	}
}

//

async function groupAdd(options, { from, to, participants /*array*/, message }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;
		if (!to) to = gid;

		let response = await sock.groupParticipantsUpdate(
			from,
			participants,
			"add" // replace this parameter with "remove", "demote" or "promote"
		);
		await sleep(500);
		sock.sendMessage(to, { text: message ? message : "Usuário adicionado com sucesso!" }, { quoted: mek });
	} catch (err) {
		console.log(err.stack);
	}
}

//

async function groupUpdateName(options, { from, text }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;

		await sock.groupUpdateSubject(from, text);

	} catch (err) {
		console.log(err.stack);
	}
}

//

async function groupUpdateDescription(options, { from, text }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;

		await sock.groupUpdateDescription(from, text);

	} catch (err) {
		console.log(err.stack);
	}
}

//

async function groupSettingChange(options, { from, action }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;

		if (action === "close") {
			await sock.groupSettingUpdate(from, "announcement");
		}
		else if (action === "open") {
			await sock.groupSettingUpdate(from, "not_announcement");
		}
		else if (action === "unlock") {
			await sock.groupSettingUpdate(from, "unlocked");
		}
		else if (action === "lock" || action === "locked") {
			await sock.groupSettingUpdate(from, "locked");
		}
		else {
			console.log("groupSettingChange: action invalid");
		}

	} catch (err) {
		console.log(err.stack);
	}
}

//

async function groupLeave(options, { from }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;

		await sock.groupLeave(from);

	} catch (err) {
		console.log(err.stack);
	}
}

//

const getGroupCode = (options, { from, to }) => new Promise(async (resolve, reject) => {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;
		if (!to) to = gid;

		let code = await sock.groupInviteCode(gid);
		resolve("https://chat.whatsapp.com/" + code);

	} catch (err) {
		console.log(err.stack);
	}
});

//

const revokeGroupInviteCode = (options, { from }) => new Promise(async (resolve, reject) => {
	try {


		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		if (!from) from = gid;

		let code = await sock.groupRevokeInvite(from);
		resolve("https://chat.whatsapp.com/" + code);

	} catch (err) {
		console.log(err.stack);
	}
});

// 

async function acceptInviteCode(options, code) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		let response = await sock.groupAcceptInvite(code.split(".com/")[1]);
		console.log("entrei no grupo: " + response);

	} catch (err) {
		console.log(err.stack);
	}
}

//

async function acceptInviteMessage(options, { from, code }) {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		let response = await sock.groupAcceptInviteV4(from, code);
		console.log("entrei no grupo: " + response);

	} catch (err) {
		console.log(err.stack);
	}
}

//

const inviteCodeInfo = (options, code) => new Promise(async (resolve, reject) => {
	try {

		let sock = options.sock;
		let gid = options.gid;
		let mek = options.mek;

		let response = await sock.groupGetInviteInfo(code.split(".com/")[1]);
		if (response) resolve(response);
		resolve(false);

	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = { updateGroupPicture, groupCreate, groupPromote, groupDemote, groupRemove, groupAdd, groupUpdateName, groupUpdateDescription, groupSettingChange, groupLeave, getGroupCode, revokeGroupInviteCode, acceptInviteCode, acceptInviteMessage, inviteCodeInfo };