let UserMemory = {}

function Interpret(AST) {
	let current = 0
	let ans = ""
	AST.body.forEach(element => {
		switch(element.type) {
			case 'memory':
				if (element.kind === 'mset') {
					return UserMemory[element.declarations.id.name] = element.declarations.init.value
				}
				if (element.kind === 'var') {
					ans = UserMemory[element.declarations.id.name]
				}
		}
	})
	return ans
}
module.exports = {
	Interpret
}