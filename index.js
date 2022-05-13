#!/usr/bin/env node

const version = "2.0.1-dev"
const devmode = true

const argdef = [
	{name: 'input', alias: 'i', type: String, defaultOption: true},
	{name: 'verbose', alias: 'v', type: Boolean},
	{name: 'version', type: Boolean},
	{name: 'force', alias: 'f', type: Boolean},
	{name: 'disable-warnings', type: Boolean},
	{name: 'output', type: String, alias: 'o'},
	{name: 'help', type: Boolean, alias: 'h'}
]

import stopwatch from 'statman-stopwatch'
import args from 'command-line-args'
import chalk from 'chalk'
import {Compile} from './src/compiler.js'
import {Lexer} from './src/lexer.js'
import {Parse} from './src/parser.js'
import consola from 'consola'
import { table } from 'table';
import * as fs from 'fs'

export default function runner() {
	if (args(argdef).help) {
		const flags = [
			['Flag', 'Alias', 'Description'],
			['--help', '-h', 'Shows this menu.'],
			['--input <file>', '-i <file>', 'Input file. Default parameter.'],
			['--verbose', '-v', 'Outputs all stack operations and produced data.'],
			['--version', 'None', 'Outputs this version of Evaluate'],
			['--force', '-f', 'Make sure the program runs'],
			['--output <filename>', '-o <filename>', 'Output filename.'],
			['--disable-warnings', 'None', 'Disables warnings thrown by Evaluate.']
		]
		const config = {
			header: {
				alignment: 'center',
				content: 'CLI Help Panel: ' + version
			}
		}
		console.log(table(flags, config))
		if (devmode) consola.warn("Running devmode, use force")
		return
	}
	try {
		let verbose = false
		const timer =  new stopwatch(true)
		const options =  args(argdef)
		if (!options['disable-warnings']) {
			if (devmode) consola.warn(chalk.yellow("Warning: Current version is an unstable devmode. Expect bugs."))
		}
		if (devmode && !options.force) {
			consola.fatal(chalk.red("To use devmode, please continue with force."))
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
