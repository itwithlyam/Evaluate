#!/usr/bin/env node

const version = "1.1.1"

const argdef = [
	{name: 'input', alias: 'i', type: String, defaultOption: true},
	{name: 'verbose', alias: 'v', type: Boolean},
	{name: 'version', type: Boolean}
]

import stopwatch from 'statman-stopwatch'
import args from 'command-line-args'
import {Interpret} from './interpreter.js'
import {Lexer} from './lexer.js'
import {Parse} from './parser.js'
import * as fs from 'fs'

export default function runner() {
	try {
		let verbose = false
		const timer =  new stopwatch(true)
		const options =  args(argdef)

		if (options.version) console.log("Evaluate v" + version)

		if (!options.input) process.exit(1)
		if (options.verbose) {
			verbose = true
			console.log("Loading program")
		}

		let tokens =  Lexer(fs.readFileSync(options.input).toString())
		let script =  Parse(tokens)
		Interpret(script, false, verbose)
		if (verbose) console.log("Executed in " + Math.floor(timer.stop()) + " ms")
	} catch(err) {
		console.log("Invalid argument")
	}
}
runner()