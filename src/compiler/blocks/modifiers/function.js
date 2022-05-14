export default {
    name: "function",
    description: "Function block modifier",
    execute(block, name) {
        let anss = []
		let ans = []
		let declared = []
        block.forEach(e => {
			if (e.type !== "text") {
				if (!declared.includes(e)) {
					ans.push(e)
				}
				declared.push(e)
				return;
            }
			else anss.push(e.commands)
		})
        ans.push({
            type: "label",
            label: name,
            commands: anss.join('\n'),
            os: ['win','linux','mac']
        })

        return ans
    }
}