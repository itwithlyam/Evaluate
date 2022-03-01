import {Parse} from '../parser.js'
import {Lexer} from '../lexer.js'

export default {
	name: "initfunc",
	description: "create function",
	execute(memory, element) {
		let script = ''
		element.declarations.init.value.forEach(element => {
			if (element === null) return
			script += element
		})
		memory[element.declarations.id.name] = {
			raw: element.declarations.init.value,
			ast: Parse(Lexer(script), true, false),
			parameters: element.declarations.init.parameters
		}
		return memory
	}
}