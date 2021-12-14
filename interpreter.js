let UserMemory = {}

function Interpret(AST) {
	let tokens = AST.body
	let current = 0
	let ans = ""
	AST.body.forEach(element => {
		switch(element.type) {
			case 'memory':
				if (element.kind === 'mset') {
					current += 1
					return UserMemory[element.declarations.id.name] = element.declarations.init.value
				}
				if (element.kind === 'var') {
					current += 1
					return ans = UserMemory[element.declarations.id.name]
				}
				break;
			case 'operation':
				switch(element.value) {
					case '+':
						ans = tokens[current - 1].value + tokens[current + 1].value
						return current += 1
					case '-':
						ans = tokens[current - 1].value - tokens[current + 1].value
						return current += 1
					case '*':
						ans = tokens[current - 1].value * tokens[current + 1].value
						return current += 1
					case '/':
						ans = tokens[current - 1].value / tokens[current + 1].value
						return current += 1
				}
			default:
				current += 1
		}
	})
	return ans
}
module.exports = {
	Interpret
}