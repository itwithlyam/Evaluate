#!/usr/bin/env node

const LEXER = require("../lexer")
const INTERPRETER = require("../interpreter")
const PARSER = require('../parser')

const fs = require('fs')
fs.writeFileSync('../memory.json', '{}')

let program = process.argv[2]

if (!program) process.exit(1)

let tokens = LEXER.Lexer(fs.readFileSync(program).toString())
let script = PARSER.Parse(tokens)
INTERPRETER.Interpret(script)
