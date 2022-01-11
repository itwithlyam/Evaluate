#!/usr/bin/env node

import * as INTERPRETER from '../interpreter.js'
import * as LEXER from '../lexer.js'
import * as PARSER from '../parser.js'


import * as fs from 'fs'
fs.writeFileSync('../memory.json', '{}')

let program = process.argv[2]

if (!program) process.exit(1)

let tokens = LEXER.Lexer(fs.readFileSync(program).toString())
let script = PARSER.Parse(tokens)
INTERPRETER.Interpret(script)
