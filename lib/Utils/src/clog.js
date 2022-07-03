const chalk = require("chalk");

const clog = (texto, cor) => {
	try {
		if (!cor) cor = "white";
		return console.log(((texto, cor) => (cor ? chalk.keyword(cor)(texto) : chalk.green(texto)))(texto, cor));
	} catch(error) {
		console.log(error.stack);
	}
};

module.exports = { clog };