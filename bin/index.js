#!/usr/bin/env node

import {Interpret} from '../interpreter.js'
	import {Lexer} from '../lexer.js'
	import {Parse} from '../parser.js'
	import * as fs from 'fs'

export default function runner() {
	let program = process.argv[2]

	if (!program) process.exit(1)

	let tokens = Lexer(fs.readFileSync(program).toString())
	let script = Parse(tokens)
	Interpret(script, false)
}
runner()