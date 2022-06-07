import {RuntimeError, ParseTrace} from '../util.js'
import {Compile} from '../compiler.js'

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
	execute(func, args, line, trace, memory, compiled, id, standard, elf) {
		let res = null
		if (StandardLibrary.includes(func)) {
			if (!standard) throw new RuntimeError("Import", "Standard library not imported", line, ParseTrace(trace))
			switch(func) {
				case 'simplify':
					res = simplify(args, line, trace, compiled, id)
					break;
				case 'printf':
					res = output(args, line, trace, compiled, id)
					break;
				case "equate":
					res = evaluate(args, line, trace, compiled, id, elf)
					break;
				case "panic":
					res = panic(line, trace, compiled)
					break;
				case "logic":
					res = logic(args, line, trace, elf, id)
					break;
				case "malloc":
					res = malloc(args)
					break;
				case "raw":
					res = raw(args)
					break;
			}
		} else {
			res = [{type: "text", commands: `mov ecx,0\ncall ${func}`, os: ['mac','linux','win']}]
		}
		return res
	}
}