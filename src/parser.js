import {CompilationError, ParseTrace, StackTrace} from './util.js'

/*
// TS Syntax from ComplicatedCalculator archive

type BodyItem = {
	type: string;
	kind?: string;
	declarations?: {
		type?: string;
		id?: {
			name: any;
		}
		init?: {
			value: string;
		}
	};
	value: string
	
	
}

type Tree = {
	type: string;
	tokens: any[];
	length: number;
	body: BodyItem[]
}
*/

export function Parse(tokens, func, verbose=false) {
	const ParseStack = new StackTrace(verbose, "Parser Stack")
	ParseStack.push("Program Start", 0)
	let body = []
	let presentblock = []
	let current = 0;
	let block = false
	let line = 0
	let bar = false
	let bracket = false
	let sbracket = false

	tokens.forEach((element) => {
		// console.log(element)
		let status = ParseStack.status()
		// console.log(status)

		if (element.read) return;
		if (element.ident == 6) {
			if (bar && status == "Equation") throw new CompilationError("UnnexpectedEOF", "An EOF was given instead of an Equation Close", line, ParseTrace(ParseStack))
			bar = true
			body.push({
				type: "EOF",
				value: element.char
			})
		}
		if (element.ident === 7) {
			ParseStack.push("Equation", line)
			tokens[current].read = true
			current += 1
		}
		if (status == "Equation") {
			tokens[current].read = true
			current += 1
			// console.log(presentblock)
			if (element.char == '}') {
				body.push({
					type: "block",
					body: presentblock
				})
				// console.log(presentblock)
				presentblock = []
				ParseStack.pop()
				return
			}
			if (parseFloat(element.char) || element.char == 0) {
				return presentblock.push({
					type: "blockelement",
					value: element.char
				})
			}
			switch(element.char) {
				case '(':
				case ')':
				case '+':
				case '-':
				case '*':
				case '/':
				case '%':
				case '¬':
				case '^':
				case '>>':
				case '<<':
					presentblock.push({
						type: "blockelement",
						value: element.char
					})
					return;
			}
			if (element.char == '~') {
				return presentblock.push({
					type: "roundblock",
					value: element.char
				})
			}
		} 
		if (status == "Equation") return;
		switch(element.ident) {
			case 22:
				tokens[current].read = true
			current += 1
				body.push({
					type: "boolean",
					value: "true"
				})
				break;
			case 23:
				tokens[current].read = true
				current += 1
				body.push({
					type: "boolean",
					value: "false"
				})
				break;
			case 21:
				tokens[current].read = true
				current += 1
				ParseStack.push("Pass", line)
				current += 1
				body.push({
					type: "pass",
					value: "pass"
				})
				ParseStack.pop()
				break;
			case 20:
				tokens[current].read = true
				tokens[current + 1].read = true
				ParseStack.push("Function Call " + tokens[current+1].char, line)
				body.push({
					type: "functioncall",
					declarations: {
						id: {
							name: tokens[current+1].char
						}
					},
					value: "call " + tokens[current+1].char
				})
				current += 2 
				ParseStack.pop()
				break;
			case 19:
				tokens[current].read = true
				tokens[current + 1].read = true
				tokens[current + 2].read = true
				ParseStack.push("Function " + tokens[current+1].char, line)
				body.push({
					type: "function",
					declarations: {
						id: {
							name: tokens[current + 1].char
						},
						init: {
							body: tokens[current + 2].char
						}
					},
					value: `${tokens[current].char} ${tokens[current + 1].char} ${tokens[current + 2].char}`
				})
				current += 3
				ParseStack.pop()
				return;
			case 1:
				body.push({
					type: "newline",
					value: element.char
				})
				tokens[current].read = true
				current += 1
				return line += 1
			case 14:
				ParseStack.push("Bracket", line)
				tokens[current].read = true
				current += 1
				if (bracket) throw new CompilationError("BracketOpen", "Brackets within brackets are not permitted", line, ParseTrace(ParseStack))
				body.push({
					type: "bopen",
					value: element.char
				})
				return bracket = true;
			case 15:
				tokens[current].read = true
				current += 1
				if (!bracket) throw new CompilationError("BracketClosed", "Brackets must be opened before closed", line, ParseTrace(ParseStack))
				body.push({
					type: "bclose",
					value: element.char
				})
				ParseStack.pop()
				return bracket = false;
			case 16:
				ParseStack.push("SquareBracket", line)
				tokens[current].read = true
				current += 1
				if (sbracket) throw new CompilationError("SquareBracketOpen", "Square Brackets within square brackets are not permitted", line, ParseTrace(ParseStack))
				body.push({
					type: "sopen",
					value: element.char
				})
				return sbracket = true;
			case 17:
				tokens[current].read = true
				current += 1
				if (!sbracket) throw new CompilationError("SquareBracketClosed", "Square Brackets must be opened before closed", line, ParseTrace(ParseStack))
				body.push({
					type: "sclose",
					value: element.char
				})
				ParseStack.pop()
				return sbracket = false;
			case 2:
			case 3:
			case 4:
			case 5:
				tokens[current].read = true
				current += 1
				return body.push({
					type: "operation",
					value: element.char
				})
		}
		if (element.ident == 0) {
			tokens[current].read = true
			current += 1
			return body.push({
				type: "number",
				value: parseFloat(element.char)
			})
		}
		if (element.ident == 11) {
			ParseStack.push("var", line)
			tokens[current].read = true
			body.push({
				type: "memory",
				kind: "var",
				value: element.char,
				declarations: {
					id: {
						name: element.char
					}
				}
			})
			ParseStack.pop()
			return current += 1
		}
		if (element.ident == 10) {
			ParseStack.push("mset", line)
			tokens[current + 1].read = true
			tokens[current].read = true
			tokens[current + 2].read = true
			body.push({
				type: "memory",
				kind: "mset",
				declarations: {
					id: {
						name: tokens[current + 1].char,
					},
					init: {
						value: tokens[current + 2].char,
					}
				},
				value: "mset " + tokens[current + 1].char + " " + tokens[current + 2].char
			})
			ParseStack.pop()
			return current += 3
		}
	})
	let AST = {
		type: "Program",
		tokens: tokens,
		length: tokens.length,
		body: body
	}
	if (func) AST.type = "Function"
	return AST
}
