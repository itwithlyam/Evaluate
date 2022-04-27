export default {
	name: "loop",
	description: "iterates over a block of code",
	execute(amount, block) {
		let ans = []
		for (let i = 0; i < amount; i++) block.forEach(e => ans.push(e))
		return ans
	}
}