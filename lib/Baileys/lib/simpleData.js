
const simpleData = (mek, profilePicture, profileBio) => new Promise((resolve, reject) => {
	try {

		let messageType = Object.keys(mek.message)[2] ? Object.keys(mek.message)[2] : Object.keys(mek.message)[0];
		let composeData = {};

		let timestamp = mek.messageTimestamp * 1000;
		let getTime = new Date(timestamp).toString().split(" G")[0];
		let timeToArray = getTime.split(" ");
		let time = [timeToArray[0], timeToArray[2] + "/" + timeToArray[1] + "/" + timeToArray[3], timeToArray[4]] || false;

		if (messageType === "conversation" || messageType === "senderKeyDistributionMessage" && mek.message.conversation) {
			// conversation

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				text: mek.message.conversation ? mek.message.conversation : false,
				//urlPreview: mek.message.canonicalUrl ? mek.message.canonicalUrl : false,
				quoted: false,
				mentioned: false
			};

			resolve(composeData);

		} else if (messageType === "extendedTextMessage" || messageType === "senderKeyDistributionMessage" && mek.message.extendedTextMessage) {
			// extendedTextMessage

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				text: mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : false,
				////urlPreview: mek.message.extendedTextMessage.canonicalUrl ? mek.message.extendedTextMessage.canonicalUrl : false,
				quoted: mek.message.extendedTextMessage.contextInfo && mek.message.extendedTextMessage.contextInfo.quotedMessage ?
					{
						messageType: Object.keys(mek.message.extendedTextMessage.contextInfo.quotedMessage)[0],
						id: mek.message.extendedTextMessage.contextInfo.stanzaId,
						sid: mek.message.extendedTextMessage.contextInfo.participant
					} : false,
				mentioned: mek.message.extendedTextMessage.contextInfo && mek.message.extendedTextMessage.contextInfo.mentionedJid ? mek.message.extendedTextMessage.contextInfo.mentionedJid : false
			};

			resolve(composeData);

		} else if (messageType === "imageMessage") {
			// imageMessage

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				caption: mek.message.imageMessage.caption ? mek.message.imageMessage.caption : false,
				//urlPreview: mek.message.imageMessage.canonicalUrl ? mek.message.imageMessage.canonicalUrl : false,
				quoted: mek.message.imageMessage.contextInfo && mek.message.imageMessage.contextInfo.quotedMessage ?
					{
						messageType: Object.keys(mek.message.imageMessage.contextInfo.quotedMessage)[0],
						id: mek.message.imageMessage.contextInfo.stanzaId,
						sid: mek.message.imageMessage.contextInfo.participant
					} : false,
				mentioned: mek.message.imageMessage.contextInfo && mek.message.imageMessage.contextInfo.mentionedJid ? mek.message.imageMessage.contextInfo.mentionedJid : false
			};

			resolve(composeData);

		} else if (messageType === "stickerMessage") {
			// stickerMessage

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				caption: false,
				quoted: mek.message.stickerMessage.contextInfo && mek.message.stickerMessage.contextInfo.quotedMessage ?
					{
						messageType: Object.keys(mek.message.stickerMessage.contextInfo.quotedMessage)[0],
						id: mek.message.stickerMessage.contextInfo.stanzaId,
						sid: mek.message.stickerMessage.contextInfo.participant
					} : false,
				mentioned: mek.message.stickerMessage.contextInfo && mek.message.stickerMessage.contextInfo.mentionedJid ? mek.message.stickerMessage.contextInfo.mentionedJid : false
			};

			resolve(composeData);

		} else if (messageType === "videoMessage") {
			// videoMessage

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				caption: mek.message.videoMessage.caption ? mek.message.videoMessage.caption : false,
				//urlPreview: mek.message.videoMessage.canonicalUrl ? mek.message.videoMessage.canonicalUrl : false,
				seconds: mek.message.videoMessage.seconds,
				gif: mek.message.videoMessage.gifPlayback ? mek.message.videoMessage.gifPlayback : false,
				quoted: mek.message.videoMessage.contextInfo && mek.message.videoMessage.contextInfo.quotedMessage ?
					{
						messageType: Object.keys(mek.message.videoMessage.contextInfo.quotedMessage)[0],
						id: mek.message.videoMessage.contextInfo.stanzaId,
						sid: mek.message.videoMessage.contextInfo.participant
					} : false,
				mentioned: mek.message.videoMessage.contextInfo && mek.message.videoMessage.contextInfo.mentionedJid ? mek.message.videoMessage.contextInfo.mentionedJid : false
			};

			resolve(composeData);

		} else if (messageType === "audioMessage") {
			// audioMessage

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				caption: false,
				seconds: mek.message.audioMessage.seconds || 0,
				ptt: mek.message.audioMessage.ptt ? mek.message.audioMessage.ptt : false,
				quoted: mek.message.audioMessage.contextInfo && mek.message.audioMessage.contextInfo.quotedMessage ?
					{
						messageType: Object.keys(mek.message.audioMessage.contextInfo.quotedMessage)[0],
						id: mek.message.audioMessage.contextInfo.stanzaId,
						sid: mek.message.audioMessage.contextInfo.participant
					} : false,
				mentioned: mek.message.audioMessage.contextInfo && mek.message.audioMessage.contextInfo.mentionedJid ? mek.message.audioMessage.contextInfo.mentionedJid : false
			};

			resolve(composeData);

		} else if (messageType === "listResponseMessage") {
			// listResponseMessage

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				text: mek.message.listResponseMessage.title ? mek.message.listResponseMessage.title : false,
				rowId: mek.message.listResponseMessage.singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId : false
			};

			resolve(composeData);

		} else if (messageType === "buttonsResponseMessage") {
			// buttonsResponseMessage

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time,
				text: mek.message.buttonsResponseMessage.selectedDisplayText ? mek.message.buttonsResponseMessage.selectedDisplayText : false,
				buttonId: mek.message.buttonsResponseMessage.selectedButtonId ? mek.message.buttonsResponseMessage.selectedButtonId : false
			};

			resolve(composeData);

		} else if (messageType === "buttonsMessage" || messageType === "listMessage" || messageType === "contactMessage" || messageType === "locationMessage" || messageType === "documentMessage" || messageType === "sendPaymentMessage" || messageType === "viewOnceMessage") {

			composeData = {
				messageType,
				gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
				sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
				pushname: mek.pushName ? mek.pushName : "sem nome",
				userPicture: profilePicture && profilePicture.profilePicture ? profilePicture.profilePicture : false,
				userBio: profileBio && profileBio.profileBio.status ? profileBio.profileBio.status : false,
				id: mek.key.id,
				time
			};

			resolve(composeData);

		} else {
   try {
    composeData = {
        messageType,
        gid: mek.key.remoteJid ? mek.key.remoteJid : mek.key.participant,
	sid: mek.key.participant ? mek.key.participant : mek.key.remoteJid,
        extrainfo: mek
        }
        resolve(composeData)
         } catch {
resolve(false);
}
		}

	} catch (error) {
		console.log(error.stack);
	}
});

module.exports = { simpleData };
