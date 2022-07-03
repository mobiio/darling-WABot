const simpleGroupData = (data, groupPicture) => new Promise(async (resolve, reject) => {
	try {

		if (!data) resolve(false);

		var admins = [];
		var members = [];
		if (!data.participants) throw "data.participants(mek) indefinido em simpleGroupData";
		for (let i = 0; i < data.participants.length; i++) {
			data.participants[i].admin === "admin" ? admins.push(data.participants[i].id) : "";
			data.participants[i].admin === null ? members.push(data.participants[i].id) : "";
		}

		let timestamp = data.creation * 1000;
		let getTime = new Date(timestamp).toString().split(" G")[0];
		let timeToArray = getTime.split(" ");
		let time = [timeToArray[0], timeToArray[2] + "/" + timeToArray[1] + "/" + timeToArray[3], timeToArray[4]] || false;

		const composeData = {
			gid: data.id,
			name: data.subject,
			desc: data.desc ? data.desc.toString() : null,
			picture: groupPicture.groupPicture,
			creation: time,
			config: {
				restrict: data.restrict,
				announce: data.announce,
				ephemeralDuration: data.ephemeralDuration
			},
			owner: [data.owner],
			admins,
			members
		};

		if (composeData) { resolve(composeData); }
		else { reject("simpleGroupData, composeData error"); }

	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = { simpleGroupData };