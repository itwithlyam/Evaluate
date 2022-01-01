const LEXER = require("./lexer")
const INTERPRETER = require("./interpreter")
const PARSER = require('./parser')

class LexicalError {
	constructor(type, body, location) {
		console.error(`Lexical ${type} Error: ${body} (Line${location})`)
		process.exit(1)
	}
}

class CompilationError {
	constructor(type, body, location) {
		console.error(`Compilation ${type} Error: ${body} (Line ${location})`)
		process.exit(1)
	}
}

function run(program) {
	let tokens = LEXER.Lexer(program)
	let script = PARSER.Parse(tokens)
	return INTERPRETER.Interpret(script)
}

class RuntimeError {
	constructor(type, body, location) {
		console.error(`Runtime ${type} Error: ${body} (Line ${location})`)
		process.exit(1)
	}
}

class Fault {
	constructor(c) {
		console.error(`FAULT - An internal language fault has been detected! Please report this.\nFull error: \n${c}`)
		process.exit(1)
	}
}

module.exports = {
	LexicalError,
	CompilationError,
	RuntimeError,
	Fault,
	run
}
