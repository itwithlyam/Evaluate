import {Interpret} from '../interpreter.js'
import {RuntimeError, ParseTrace} from '../util.js'

export default {
	name: "callfunc",
	description: "run function",
	execute(id, memory, stack, line) {
		let result = ""
		if (memory.hasOwnProperty(id)) {
				result = Interpret(memory[id])
		} else {
			throw new RuntimeError("NotDefined", `${id} is not defined as a function`, line, ParseTrace(stack))
		}
		return result
	}
}