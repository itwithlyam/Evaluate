import {RuntimeError, ParseTrace} from '../util.js'
import {Interpret} from '../interpreter.js'

const StandardLibrary = ["simplify", "printf", "equate", "panic"]

// Standard Library
import simplify from "./standard/simplify.js"
import output from "./standard/output.js"
import evaluate from "./standard/equate.js"
import panic from "./standard/panic.js"

export default {
	name: "callfunc",
	description: "run function",
	execute(func, args, line, trace, memory) {
		let res = null
		if (memory.hasOwnProperty(func)) {
			res = Interpret(memory[func].ast, true, false) 
		} else {
			if (!StandardLibrary.includes(func)) throw new RuntimeError("StandardLibrary", "Function does not exist", line, ParseTrace(trace))
			switch(func) {
				case 'simplify':
					res = simplify(args, line, trace)
					break;
				case 'printf':
					res = output(args, line, trace)
					break;
				case "equate":
					res = evaluate(args, line, trace)
					break;
				case "panic":
					res = panic()
					break;
			}
		}
		return res
	}
}