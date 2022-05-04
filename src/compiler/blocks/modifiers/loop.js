export default {
	name: "loop",
	description: "iterates over a block of code",
	execute(amount, block, current) {
		let anss = []
		let ans = []
		let declared = []
		for (let i = 0; i < amount; i++) block.forEach(e => {
			if (e.type !== "text") {
				if (!declared.includes(e)) {
					ans.push(e)
				}
				declared.push(e)
				return;
			}
			else anss.push(e.commands)
		})
		ans.push(
			{
				os: ['linux', 'win', 'mac'],
				type: "text",
				commands: `call .loop${current}`
			}
		)
		ans.push(
			{ 
				os: ['linux', 'win', 'mac'],
				type: "text",
				commands: `.loop${current}:\n` + anss.join('\n')
			}
		)
		return ans
	}
}