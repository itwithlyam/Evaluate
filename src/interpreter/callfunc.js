import {RuntimeError, ParseTrace} from '../util.js'

const StandardLibrary = ["simplify", "output"]

// Standard Library
import simplify from "./standard/simplify.js"
import output from "./standard/output.js"

export default {
	name: "callfunc",
	description: "run function",
	execute(func, args, line, trace) {
		if (!StandardLibrary.includes(func)) throw new RuntimeError("StandardLibrary", "Function does not exist", line, ParseTrace(trace))
		let res = null
		switch(func) {
			case 'simplify':
				res = simplify(args, line, trace)
				break;
			case 'output':
				res = output(args, line, trace)
				break;
		}
		return res
	}
}