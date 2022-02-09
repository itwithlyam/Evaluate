import {RuntimeError, ParseTrace} from '../util.js'


export default {
	name: "var",
	description: "get variables from memory",
	execute(VarMemory, element, RuntimeStack) {
		let ans = 0
		let id = element.declarations.id.name
		let data = ""
		if (VarMemory.hasOwnProperty(id)) {
			data = VarMemory[id]
			let num = parseFloat(data)
			if (num || data == 0) ans = num
			else ans = data
		}
		else throw new RuntimeError("NotDefined", `${id} is not defined as a variable`, line, ParseTrace(RuntimeStack))
		return ans
	}
}