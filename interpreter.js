const fs = require("fs")

function pushdata(id, value) {
	fs.readFile('./memory.json', (err, data) => {
		data = JSON.parse(data)
		data[id] = value
		fs.writeFile('./memory.json', JSON.stringify(data), (err) => {})
	})
}
function pulldata(id) {
	
}


function Interpret(AST) {
	let tokens = AST.body
	let current = 0
	let ans = ""
	AST.body.forEach(async element => {
		switch(element.type) {
			case 'memory':
				if (element.kind === 'mset') {
					current += 1
					pushdata(element.declarations.id.name, element.declarations.init.value)
					return ans = element.declarations.init.value
				}
				if (element.kind === 'var') {
					current += 1
					let id = element.declarations.id.name
					fs.readFile('./memory.json', (err, data) => {
						data = JSON.parse(data.toString())
						console.log(data)
						ans = data[`${id}`]
					})
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