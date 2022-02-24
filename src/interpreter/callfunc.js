import {RuntimeError, ParseTrace} from '../util.js'

const StandardLibrary = ["simplify"]

// Standard Library
import simplify from "./standard/simplify.js"

export default {
	name: "callfunc",
	description: "run function",
	async execute(func, args, line, trace) {
		if (!StandardLibrary.includes(func)) throw new RuntimeError("StandardLibrary", "Function does not exist", line, ParseTrace(trace))
		switch(func) {
			case 'simplify':
				return simplify(args, line, trace)
		}
	}
}