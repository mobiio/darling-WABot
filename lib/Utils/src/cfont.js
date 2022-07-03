const cfonts = require("cfonts");

function cfont (text, font, colors) {
// pallet, simple (favoritos)
	try {
	cfonts.say(text, {
			font: font, //console, block, simpleBlock, simple, 3d, simple3d, chrome, huge, shade, slick, grid, pallet, tiny
			align: "center",
			colors: ["white","black"],
			letterSpacing: 0.5,
			lineHeight: 1,
			space: true,
			gradient: colors,
			independentGradient: true,
			transitionGradient: true,
			env: "node"
		});
		} catch(err) {
		console.log(err.stack)
		}
		}

module.exports = { cfont };