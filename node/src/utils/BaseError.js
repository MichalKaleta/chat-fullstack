class BaseError extends Error {
	constructor(msg, code) {
		super(msg);
		this.code = code;
		this.msg = msg;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

module.exports = BaseError;
