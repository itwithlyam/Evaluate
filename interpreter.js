import * as fs from 'fs'
import {RuntimeError, StackTrace, Yard, rpn, ParseTrace} from "./util.js"
import {Parse} from "./parser.js"
import {Lexer} from "./lexer.js"
let VarMemory = {}
let FunctionMemory = {}

function pushdata(id, value, type) {
	if (type === "function") FunctionMemory[id] = value
	if (type === "variable") VarMemory[id] = value
}

export function Interpret(AST, unit) {
	const RuntimeStack = new StackTrace()
	RuntimeStack.push("Program Start", 0)
	let tokens = AST.body
	let current = 0
	let line = 1
	let ans = []
	AST.body.forEach(element => {
		switch(element.type) {
			case 'function':
				const functionname = element.declarations.id.name
				const functionbody = Parse(Lexer(element.declarations.init.body))
				return pushdata(functionname, functionbody, 'function')
			case 'newline':
				current += 1
				line += 1
				break;
			case 'eopen':
			case 'bopen':
			case 'sopen':
				RuntimeStack.push("Brackets", line)
				current += 1
				break;
			case 'eclose':
			case 'bclose':
			case 'sclose':
				RuntimeStack.pop()
			case 'memory':
				if (element.kind === 'mset') {
					RuntimeStack.push("mset", line)
					current += 1
					pushdata(element.declarations.id.name, element.declarations.init.value, 'variable')
					RuntimeStack.pop()
					return;
				}
				if (element.kind === 'var') {
					RuntimeStack.push("var", line)
					let id = element.declarations.id.name
					let data = ""
					let result = ""
					if (VarMemory.hasOwnProperty(id)) {
						data = VarMemory[id]
						let num = parseInt(data)
						if (num || data == 0) return result = num
						result = data
					}
					else if (FunctionMemory.hasOwnProperty(id)) {
						result = Interpret(Parse(Lexer(FunctionMemory[id])))
					}
					else throw new RuntimeError("NotDefined", `${id} is not defined as a function or variable`, line, ParseTrace(RuntimeStack))
					
					current += 1
					ans.push(result)
					
					RuntimeStack.pop()
				}
				break;
			case 'block':
				RuntimeStack.push("Equation", line)
				let op = []
				element.body.forEach(e => {
					op.push(e.value)
				})
				let answ = rpn(Yard(op), line)
				ans.push(answ)
				RuntimeStack.pop()
				break;
			default:
				current += 1
		}
	})
	if (!unit) {
		ans.forEach(value => {
			console.log(value)
		})
		return;
	}
	return ans
}
