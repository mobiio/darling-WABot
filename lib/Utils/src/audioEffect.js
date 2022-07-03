const ffmpeg = require("fluent-ffmpeg"),
	fs = require("fs"),
	fd = fs.promises,
	{ exec } = require("child_process");

const audioEffect = ({ path, savePath, effect }) => new Promise(async (resolve, reject) => {
	try {	
		var ffmpegOptions;
		if (!path.endsWith("mp3") || !savePath.endsWith("mp3")) throw "Only mp3 is suported, in audioEffect"; 
		if (effect === "fast") ffmpegOptions = `ffmpeg -i ${path} -filter:a atempo=1.06,asetrate=44100*1.25 ${savePath}`;
		if (effect === "bass") ffmpegOptions = `ffmpeg -i ${path} -filter:a atempo=1.6,asetrate=22100 ${savePath}`;
		if (effect === "burst") ffmpegOptions = `ffmpeg -i ${path} -af equalizer=f=90:width_type=o:width=2:g=30 ${savePath}`;
		if (effect === "adolescent") ffmpegOptions = `ffmpeg -i ${path} -filter:a atempo=1.06,asetrate=44100*1.25 ${savePath}`;
		if (effect === "squirrel") ffmpegOptions = `ffmpeg -i ${path} -filter:a atempo=0.7,asetrate=65100 ${savePath}`;

		if (!ffmpegOptions) resolve(false);

		exec(ffmpegOptions, async (err) => {
			if (err) {
				console.log(err);
				resolve(false);
			}
			resolve(true);
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = { audioEffect };

