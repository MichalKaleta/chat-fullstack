class ConsoleLogger {
	constructor() {
		Object.setPrototypeOf(this, console);
	}
	static init = () => {
		global.c = new this();
	};

	log = (...msg) => {
		console.log(`\x1b[33m ${msg}\x1b[0m`);
	};
}

module.exports = ConsoleLogger;
