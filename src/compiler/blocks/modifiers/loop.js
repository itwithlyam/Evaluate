export default {
	name: "loop",
	description: "iterates over a block of code",
	execute(amount, current, anss, ans) {
		
		ans.push(
			{
				os: ['linux', 'win', 'mac'],
				type: "text",
				commands: `call loop${current}`
			}
		)
		ans.push(
			{ 
				os: ['linux', 'win', 'mac'],
				type: "label",
				label: "loop" + current,
				commands: anss.join('\n')
			}
		)
		return ans
	}
}