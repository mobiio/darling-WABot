const ffmpeg = require("fluent-ffmpeg"),
	fs = require("fs"),
	fp = fs.promises,
	{ exec } = require("child_process");

let exifFile = __dirname + "/../cache/metadata.exif";

const makeSticker = ({ crop, path, savePath }) => new Promise(async (resolve, reject) => {
	try {

		const outputOptions2 = ["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"];
		const outputOptions = ["-y", "-vcodec libwebp", "-loop 0", "-an", "-vsync 0", "-s 512x512"];

		ffmpeg(path)
			.outputOptions(crop ? outputOptions : outputOptions2)
			.save(savePath)
			.on("end", function(err) {
				/*exec("webpmux -set exif " + exifFile + " " + savePath + " -o " + savePath, async function(err) {
					if (err) {
						console.log(err);
						resolve(false);
					}
					resolve(true);
				});*/
		    if (err) {
		    console.log(err)
		    resolve(false)
		    }
		    resolve(true)
			})
			.on("error", () => {
				resolve(false);
			});

	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = { makeSticker };


