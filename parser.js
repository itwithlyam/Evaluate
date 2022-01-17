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

export function Parse(tokens) {
	const ParseStack = new StackTrace()
	ParseStack.push("Program Start", 0)
	let body = []
	let presentblock = []
	let current = 0;
	let block = false
	let line = 1
	let bar = false
	let bracket = false
	let sbracket = false

	tokens.forEach((element) => {
		if (element.read) return;
		if (element.ident == 6) {
			if (bar && block) throw new CompilationError("UnnexpectedEOF", "An EOF was given instead of an Equation Close", line, ParseTrace(ParseStack))
			bar = true
			body.push({
				type: "EOF",
				value: element.char
			})
		}
		if (block) {
			tokens[current].read = true
			current += 1
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
					return presentblock.push({
						type: "blockelement",
						value: element.char
					})
				default:
					//throw new util.CompilationError("InvalidBlockElement", "An invalid block element was recieved", line)
			}
		} 
		
		switch(element.ident) {
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
				
				current += 1
				body.push({
					type: "newline",
					value: element.char
				})
				return line += 1
			case 7:
			ParseStack.push("Equation", line)
			tokens[current].read = true
			current += 1
				return block = true;
				
			case 8:
			tokens[current].read = true
			current += 1
				if (!block) throw new CompilationError("EquationClosed", "Equations must be opened before closed", line, ParseTrace(ParseStack))
				body.push({
					type: "block",
					body: presentblock
				})
				presentblock = []
				ParseStack.pop()
				return block = false;
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
				return body.push({
					type: "operation",
					value: element.char
				})
		}
		if (element.ident == 0) {
			tokens[current].read = true
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
				value: tokens[current].char,
				declarations: {
					id: {
						name: tokens[current].char
					}
				}
			})
			return current += 1
			ParseStack.pop()
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
		current += 1
	})
	let AST = {
		type: "Program",
		tokens: tokens,
		length: tokens.length,
		body: body
	}
	return AST
}
