#!/usr/bin/env node

const version = "2.0.0-dev"
const devmode = true

const argdef = [
	{name: 'input', alias: 'i', type: String, defaultOption: true},
	{name: 'verbose', alias: 'v', type: Boolean},
	{name: 'version', type: Boolean},
	{name: 'force', alias: 'f', type: Boolean},
	{name: 'disable-warnings', type: Boolean},
	{name: 'output', type: String, alias: 'o'}
]

import stopwatch from 'statman-stopwatch'
import args from 'command-line-args'
import chalk from 'chalk'
import {Compile} from './src/compiler.js'
import {Lexer} from './src/lexer.js'
import {Parse} from './src/parser.js'
import * as fs from 'fs'

export default function runner() {
	try {
		let verbose = false
		const timer =  new stopwatch(true)
		const options =  args(argdef)
		if (!options['disable-warnings']) {
			if (devmode) console.log(chalk.yellow("Warning: Current version is an unstable devmode. Expect bugs."))
		}
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
		Compile(script, false, verbose, options.output || "output")
		if (verbose) console.log("Executed in " + Math.floor(timer.stop()) + " ms")
	} catch(err) {
		console.log(err)
	}
}
runner()
