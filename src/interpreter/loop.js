export default {
	name: "loop",
	description: "iterates over a block of code",
	execute(amount, block) {
		let ans = []
		for (let i = 0; i < amount; i++) block.forEach(e => {
			if (e.type != 'text') return 
			ans.push(e.commands)
		})
		return [
			{ 
				os: ['linux', 'win', 'mac'],
				type: "text",
				commands: ".a:\n" + ans.join('\n')
			},
			{
				os: ['linux', 'win', 'mac'],
				type: "text",
				commands: `mov ecx,${amount}\nloop .a`
			}
		]
	}
}