const LEXER = require("./lexer")
const INTERPRETER = require("./interpreter")
const PARSER = require('./parser')
const repl = require('repl')

const fs = require('fs')
fs.writeFileSync('./memory.json', '{}')

const myRepl = repl.start("Read-Eval-Print loop > ");

const state = {
  e(program) {
    let tokens = LEXER.Lexer(program)
	let script = PARSER.Parse(tokens)
	return INTERPRETER.Interpret(script)
  }
};

Object.assign(myRepl.context, state);
