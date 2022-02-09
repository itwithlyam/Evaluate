import {Parse} from '../parser.js'
import {Lexer} from '../lexer.js'

export default {
	name: "initfunc",
	description: "create function",
	execute(memory, element) {
			const functionname = element.declarations.id.name
			const functionbody = Parse(Lexer(element.declarations.init.body), true)
			memory[functionname] = functionbody
			return memory
	}
}