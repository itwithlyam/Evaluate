
import * as fs from 'fs'
import {RuntimeError, StackTrace, Yard, rpn, ParseTrace} from "./util.js"
import {Parse} from "./parser.js"
import {Lexer} from "./lexer.js"
import chalk from "chalk"
import fifo from 'fifo'
let VarMemory = {}
let FunctionMemory = {}

function pushdata(id, value, type) {
	if (type === "function") return FunctionMemory[id] = value
	if (type === "variable") {
		if (parseInt(value)) { VarMemory[id] = parseInt(value) }
		else {
			VarMemory[id] = value
		}
	}
}

export function Interpret(AST, unit, verbose) {
	const RuntimeStack = new StackTrace(verbose)
	RuntimeStack.push("Program Start", 0)
	let tokens = AST.body
	let current = 0
	let line = 0
	let ans = []
	AST.body.forEach(element => {
		switch(element.type) {
			case 'pass':
				current += 1
				break;
			case 'functioncall':
				let id = element.declarations.id.name
				RuntimeStack.push(`Function call ${id}`, line)
				let result = ""
				if (FunctionMemory.hasOwnProperty(id)) {
						result = Interpret(FunctionMemory[id])
				} else {
					throw new RuntimeError("NotDefined", `${id} is not defined as a function`, line, ParseTrace(RuntimeStack))
				}
				ans.push(result)
				current += 1
				RuntimeStack.pop()
				break;
			case 'function':
				RuntimeStack.push("Function " + element.declarations.id.name, line)
				const functionname = element.declarations.id.name
				const functionbody = Parse(Lexer(element.declarations.init.body), true)
				pushdata(functionname, functionbody, 'function')
				current += 1
				return RuntimeStack.pop()
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
					if (VarMemory.hasOwnProperty(id)) {
						data = VarMemory[id]
						let num = parseInt(data)
						if (num || data == 0) ans.push(num)
						else
						ans.push(data)
					}
					else throw new RuntimeError("NotDefined", `${id} is not defined as a variable`, line, ParseTrace(RuntimeStack))
					
					current += 1
					
					RuntimeStack.pop()
				}
				break;
			case 'block':
				RuntimeStack.push("Equation", line)
				let round = false
				let op = []
				let nots = ['¬']
				element.body.forEach(e => {
					if (e.value === '~') round = true
					else op.push(e.value)
					console.log(e)
					if (nots.includes(e.value)) op.push(0)
				})
				let answ = rpn(Yard(op), line)
				if (round) answ = Math.floor(answ)
				ans.push(answ)
				RuntimeStack.pop()
				break;
			case 'EOF':
				break;
			default:
				console.log(chalk.yellow("Warning: Expressor '" + element.value + "' is still a work in progress: Line " + line))
				current += 1
				break
		}
	})
	if (!unit) {
		if (!ans[0] && ans[0] != 0) return
		const returns = fifo()
		ans.forEach(value => {
			returns.push(value)
		})
		returns.forEach(value => {
			console.log(value)
		})
		return;
	}
	return ans
}