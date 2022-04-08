import {CompilationError, ParseTrace, StackTrace} from './util.js'

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
			current += 1
		}
		// Equations are deprecated
		// if (element.ident === 7) {
		// 	ParseStack.push("Equation", line)
		// 	tokens[current].read = true
		// 	current += 1
		// }
		// if (status == "Equation") {
		// 	tokens[current].read = true
		// 	current += 1
		// 	if (element.char == '}') {
		// 		body.push({
		// 			type: "block",
		// 			body: presentblock
		// 		})
		// 		presentblock = []
		// 		ParseStack.pop()
		// 		return
		// 	}
		// 	if (parseFloat(element.char) || element.char == 0) {
		// 		return presentblock.push({
		// 			type: "blockelement",
		// 			value: element.char
		// 		})
		// 	}
		// 	switch(element.char) {
		// 		case '(':
		// 		case ')':
		// 		case '+':
		// 		case '-':
		// 		case '*':
		// 		case '/':
		// 		case '%':
		// 		case '¬':
		// 		case '^':
		// 		case '>>':
		// 		case '<<':
		// 			presentblock.push({
		// 				type: "blockelement",
		// 				value: element.char
		// 			})
		// 			return;
		// 	}
		// 	if (element.char == '~') {
		// 		return presentblock.push({
		// 			type: "roundblock",
		// 			value: element.char
		// 		})
		// 	}
		// } 
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
			case 1:
				body.push({
					type: "newline",
					value: element.char
				})
				tokens[current].read = true
				current += 1
				return line += 1
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
			if (element.char == '') {
				tokens[current].read = true
				current += 1
				return;
			}
			if (tokens[current+1].char == '(') {
				current += 1
				tokens[current].read = true
				let options = []
				while (tokens[current].char != ')') {
					if (tokens[current].char == "," || tokens[current].char == "(" || tokens[current].char == ")") {
						tokens[current].read = true
						current += 1
						continue;
					}
					options.push(tokens[current].char)
					tokens[current+1].read = true
					current += 1
				}
				tokens[current.read] = true
				current += 1
				ParseStack.push("Function Call " + element.char, line)
				body.push({
					type: "functioncall",
					params: options,
					value: element.char
				})
				ParseStack.pop()
				return;
			}
			tokens[current].read = true

			if (tokens[current + 1].ident == 19) {
				// the inevitable cause of lag
				let id = tokens[current].char
				tokens[current].read = true
				ParseStack.push("Function " + tokens[current].char, line)
				let paras = []
				tokens[current + 1].read = true
				current += 2
				if (tokens[current].char == "(") {
					tokens[current].read = true
					current += 1
					while (tokens[current + 1].char != ")") {
						paras.push(tokens[current + 1].char)
						tokens[current+1] = true
						current += 1
					}
				}
				let funcbody = []
				current += 1
				while (tokens[current].char != "}") {
					funcbody.push(tokens[current].char)
					tokens[current].read = true
					current += 1
				}
				current += 1
				body.push({
					type: "function",
					kind: "init",
					declarations: {
						id: {
							name: id
						},
						init: {
							parameters: paras,
							value: funcbody
						}
					}
				})
				ParseStack.pop()
				return;
			}
			ParseStack.push("var", line)
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
		if (element.ident == 30) {
			ParseStack.push("integer declaration", line)
			tokens[current].read = true
			if (tokens[current + 1].ident != 11) throw new CompilationError("InvalidIdentifier", "An identifier was invalid or was not supplied.", line, ParseTrace(ParseStack))
			tokens[current + 1].read = true
			let id = tokens[current + 1].char
			let value = null;
			if (tokens[current + 2].ident == 13) {
				tokens[current + 2].read = true
				if (!parseInt(tokens[current + 3].char)) throw new CompilationError("InsufficientValue", "The given value did not meet the annotation's requirements.", line, ParseTrace(ParseStack))
				tokens[current + 3].read = true
				value = tokens[current + 3].char
				current += 4
			} else { current += 2 }
			
			body.push({
				type: "memory",
				kind: "set",
				declarations: {
					id: {
						name: id
					},
					init: {
						value: value
					},
					annotation: "int"
				}
			})

			ParseStack.pop()
			return;
		}
		if (element.ident == 31) {
			ParseStack.push("string declaration", line)
			tokens[current].read = true
			if (tokens[current + 1].ident != 11) throw new CompilationError("InvalidIdentifier", "An identifier was invalid or was not supplied.", line, ParseTrace(ParseStack))
			tokens[current + 1].read = true
			let id = tokens[current + 1].char
			let value = null;
			if (tokens[current + 2].ident == 13) {
				tokens[current + 2].read = true
				if (tokens[current + 3].ident != 18) throw new CompilationError("InsufficientValue", "The given value did not meet the annotation's requirements.", line, ParseTrace(ParseStack))
				tokens[current + 3].read = true
				value = tokens[current + 3].char
				current += 4
			} else { current += 2 }
			
			body.push({
				type: "memory",
				kind: "set",
				declarations: {
					id: {
						name: id
					},
					init: {
						value: value
					},
					annotation: "string"
				}
			})

			ParseStack.pop()
			return;
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
