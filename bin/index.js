#!/usr/bin/env node

import interpreter from '../interpreter.js'
import lexer from '../lexer.js'
import parser from '../parser.js'


import * as fs from 'fs'
fs.writeFileSync('../memory.json', '{}')

let program = process.argv[2]

if (!program) process.exit(1)

let tokens = lexer(fs.readFileSync(program).toString())
let script = parser(tokens)
interpreter(script)
