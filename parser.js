// TODO: Make Parser (start with mset and mread idents)

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

function Parse(tokens) {
	let body = []
	let current = 0;

	tokens.forEach((element) => {
		if (element.read) return;
		if (element.ident == 6) {
			body.push({
				type: "EOF",
				value: element.char
			})
		}
		switch(element.ident) {
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
				value: element.char
			})
		}
		if (element.ident == 11) {
			tokens[current].read = true
			tokens[current + 1].read = true
			body.push({
				type: "memory",
				kind: "var",
				value: "var " + tokens[current + 1].char,
				declarations: {
					id: {
						name: tokens[current + 1].char
					}
				}
			})
			return current += 2
		}
		if (element.ident == 10) {
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

module.exports = {
	Parse
}
