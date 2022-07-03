const { downloadContentFromMessage } = require("@adiwajshing/baileys");

const downloadMedia = (options, message, messageType) => new Promise(async (resolve, reject) => {
	try {

		const sock = options.sock;

		var __asyncValues = (this && this.__asyncValues) || function(o) {
			if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
			var m = o[Symbol.asyncIterator], i;
			return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() { return this; }, i);
			function verb(n) { i[n] = o[n] && function(v) { return new Promise(function(resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
			function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
		};

		var e_1, _a;

		if (messageType === "image") {
			var stream = await downloadContentFromMessage(message, "image");
		} else if (messageType === "video") {
			var stream = await downloadContentFromMessage(message, "video");
		} else if (messageType === "sticker") {
			var stream = await downloadContentFromMessage(message, "sticker");
		} else if (messageType === "audio") {
			var stream = await downloadContentFromMessage(message, "audio");
		} else {
			resolve(false);
		}

		let buffer = Buffer.from([]);
		try {
			for (var stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = await stream_1.next(), !stream_1_1.done;) {
				const chunk = stream_1_1.value;
				buffer = Buffer.concat([buffer, chunk]);
			}
		}
		catch (e_1_1) { e_1 = { error: e_1_1 }; }
		finally {
			try {
				if (stream_1_1 && !stream_1_1.done && (_a = stream_1.return)) await _a.call(stream_1);
			}
			finally { if (e_1) throw e_1.error; }
		}
		resolve(buffer);

	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = { downloadMedia };