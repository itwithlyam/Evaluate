const fs = require("fs")
const util = require("./util")
const rpn = require("rpn")

function pushdata(id, value) {
	let data = JSON.parse(fs.readFileSync('./memory.json').toString())
	data[id] = value
	let err = fs.writeFileSync('./memory.json', JSON.stringify(data))
	if (err) console.log(err)
}

const Yard = util.Yard

function Interpret(AST) {
	util.Stack("push", "Program start", 0)
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
			case 'bopen':
			case 'sopen':
				util.Stack("push", "Block", line)
				current += 1
				break;
			case 'eclose':
			case 'bclose':
			case 'sclose':
				util.Stack("pop")
			case 'memory':
				if (element.kind === 'mset') {
					util.Stack("push", "mset", line)
					current += 1
					pushdata(element.declarations.id.name, element.declarations.init.value)
					ans = element.declarations.init.value
					util.Stack("pop")
					return;
				}
				if (element.kind === 'var') {
					let id = element.declarations.id.name
					let raw = fs.readFileSync('./memory.json').toString()
					let data = JSON.parse(raw)
					ans = parseFloat(data[id])
					if (!ans && ans !== 0) ans = data[id]
					if (!ans) throw new util.RuntimeError("NotDefined", `${id} is not declared`, line)
					current += 1
					console.log(ans)
					return
					
					
				}
				break;
			case 'block':
				let op = []
				element.body.forEach(e => {
					op.push(e.value)
				})
				ans = util.rpn(Yard(op), line)
				return console.log(ans)
			default:
				current += 1
		}
	})
}
module.exports = {
	Interpret
}