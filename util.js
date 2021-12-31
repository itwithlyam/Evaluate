class LexicalError extends Error {
	constructor(type, body, location) {
		super(`Lexical ${type} Error: ${body} (Line${location})`)
	}
}

class CompilationError extends Error {
	constructor(type, body, location) {
		super(`Compilation ${type} Error: ${body} (Line ${location})`)
	}
}

class RuntimeError extends Error {
	constructor(type, body, location) {
		super(`Runtime ${type} Error: ${body} (Line ${location})`)
	}
}

class Fault extends Error {
	constructor(c) {
		super(`FAULT - An internal language fault has been detected! Please report this.\nFull error: \n${c}`)
	}
}

module.exports = {
	LexicalError,
	CompilationError,
	RuntimeError,
	Fault
}
