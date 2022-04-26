import {RuntimeError, ParseTrace} from '../util.js'
import {Interpret} from '../interpreter.js'

const StandardLibrary = ["simplify", "printf", "equate", "panic", "logic", "malloc", "raw"]

// Standard Library
import simplify from "./standard/simplify.js"
import output from "./standard/output.js"
import evaluate from "./standard/equate.js"
import panic from "./standard/panic.js"
import logic from "./standard/logic.js"
import malloc from './standard/malloc.js'
import raw from './standard/raw.js'

export default {
	name: "callfunc",
	description: "run function",
	execute(func, args, line, trace, memory, compiled) {
		let res = null
		if (memory.hasOwnProperty(func)) {
			res = Interpret(memory[func].ast, true, false) 
		} else {
			if (!StandardLibrary.includes(func)) throw new RuntimeError("StandardLibrary", "Function does not exist", line, ParseTrace(trace))
			switch(func) {
				case 'simplify':
					res = simplify(args, line, trace, compiled)
					break;
				case 'printf':
					res = output(args, line, trace, compiled)
					break;
				case "equate":
					res = evaluate(args, line, trace, compiled)
					break;
				case "panic":
					res = panic(line, trace, compiled)
					break;
				case "logic":
					res = logic(args, line, trace, compiled)
					break;
				case "malloc":
					res = malloc(args)
					break;
				case "raw":
					res = raw(args)
					break;
			}
		}
		return res
	}
}