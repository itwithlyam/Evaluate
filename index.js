#!/usr/bin/env node

const version = "1.1.2-dev.1"
const devmode = true

const argdef = [
	{name: 'input', alias: 'i', type: String, defaultOption: true},
	{name: 'verbose', alias: 'v', type: Boolean},
	{name: 'version', type: Boolean},
	{name: 'force', alias: 'f', type: Boolean}
]

import stopwatch from 'statman-stopwatch'
import args from 'command-line-args'
import chalk from 'chalk'
import {Interpret} from './src/interpreter.js'
import {Lexer} from './src/lexer.js'
import {Parse} from './src/parser.js'
import * as fs from 'fs'

export default function runner() {
	try {
		let verbose = false
		const timer =  new stopwatch(true)
		const options =  args(argdef)

		if (devmode) console.log(chalk.yellow("Warning: Current version is an unstable devmode. Expect bugs."))
		if (devmode && !options.force) {
			console.log(chalk.red("To use devmode, please continue with force."))
			process.exit(1)
		}
		
		if (options.version) console.log("Evaluate v" + version)

		if (!options.input) process.exit(1)
		if (options.verbose) {
			verbose = true
			console.log("Loading program")
		}

		let tokens =  Lexer(fs.readFileSync(options.input).toString())
		let script =  Parse(tokens, false, verbose)
		Interpret(script, false, verbose)
		if (verbose) console.log("Executed in " + Math.floor(timer.stop()) + " ms")
	} catch(err) {
		console.log(err)
	}
}
runner()
