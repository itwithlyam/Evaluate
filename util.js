class LexicalError extends Error {
	constructor(type, body, location) {
		super(`Lexical ${type} Error: ${body} (${location})`)
	}
}

class CompilationError extends Error {
	constructor(type, body, location) {
		super(`Compilation ${type} Error: ${body} (${location})`)
	}
}

class RuntimeError extends Error {
	constructor(type, body, location) {
		super(`Runtime ${type} Error: ${body} (${location})`)
	}
}

class Fault extends Error {
	constructor(catch) {
		super(`FAULT - An internal language fault has been detected! Please report this.\nFull error: \n${catch}`)
	}
}

module.exports = {
	LexicalError,
	CompilationError,
	RuntimeError,
	Fault
}
