import {Parse} from '../parser.js'
import {Lexer} from '../lexer.js'

export default {
	name: "initfunc",
	description: "create function",
	execute(memory, element) {
		let script = ''
		script = element.declarations.init.value.join("")
		memory[element.declarations.id.name] = {
			raw: script,
			ast: Parse(Lexer(script), true, false),
			parameters: element.declarations.init.parameters
		}
		return memory
	}
}