const fs = require("fs")

function pushdata(id, value) {
	fs.readFile('./memory.json', (err, data) => {
		data = JSON.parse(data)
		data[id] = value
		fs.writeFile('./memory.json', JSON.stringify(data), (err) => {})
	})
}


function Interpret(AST) {
	console.log(AST)
	let tokens = AST.body
	let current = 0
	let ans = null
	AST.body.forEach(element => {
		switch(element.type) {
			case 'memory':
				if (element.kind === 'mset') {
					current += 1
					pushdata(element.declarations.id.name, element.declarations.init.value)
					return ans = element.declarations.init.value
				}
				if (element.kind === 'var') {
					let id = element.declarations.id.name
					let a;
					let data = JSON.parse(fs.readFileSync('./memory.json').toString())
					a = data[id]
					current += 1
					ans = a
					return
					
					
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