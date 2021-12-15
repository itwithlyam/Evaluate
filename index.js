const LEXER = require("./lexer")
const INTERPRETER = require("./interpreter")
const PARSER = require('./parser')
const repl = require('repl')

const myRepl = repl.start("Evaluate.js Read-Eval-Print loop > ");

const state = {
  Execute(program) {
    let tokens = LEXER.Lexer(program)
		let script = PARSER.Parse(tokens)
		return INTERPRETER.Interpret(script)
  }
};

Object.assign(myRepl.context, state);
