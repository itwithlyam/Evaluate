import {RuntimeError, ParseTrace} from '../util.js'

const StandardLibrary = ["simplify"]

// Standard Library
import simplify from "./standard/simplify.js"

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
		}
		return res
	}
}