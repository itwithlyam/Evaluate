const fs = require("fs")
const util = require("./util")

function pushdata(id, value) {
	let data = JSON.parse(fs.readFileSync('./memory.json').toString())
	data[id] = value
	let err = fs.writeFileSync('./memory.json', JSON.stringify(data))
	if (err) console.log(err)
}



function Interpret(AST) {
	let tokens = AST.body
	let current = 0
	let line = 1
	let ans = null
	AST.body.forEach(element => {
		switch(element.type) {
			case 'newline':
				current += 1
				line += 1
				break;
			case 'eopen':
			case 'eclose':
				current += 1
				break;
			case 'memory':
				if (element.kind === 'mset') {
					current += 1
					pushdata(element.declarations.id.name, element.declarations.init.value)
					return ans = element.declarations.init.value
				}
				if (element.kind === 'var') {
					let id = element.declarations.id.name
					let raw = fs.readFileSync('./memory.json').toString()
					let data = JSON.parse(raw)
					ans = parseFloat(data[id])
					if (!ans && ans !== 0) ans = data[id]
					if (!ans) throw new util.RuntimeError("NotDefined", `${id} is not defined in memory`, line)
					current += 1
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