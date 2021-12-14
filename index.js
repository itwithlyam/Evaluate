const LEXER = require("./lexer")
const INTERPRETER = require("./interpreter")
const PARSER = require('./parser')

const program = "mset ImportantNumber 12 var ImportantNumber";

console.log("COMPLICATED-CALCULATOR> " + program)
let tokens = LEXER.Lexer(program)
let script = PARSER.Parse(tokens)
console.log(script)
console.log(INTERPRETER.Interpret(script))
