import funcdec from './modifiers/function.js'
import loop from './modifiers/loop.js'
import oss from 'os'

export default {
	name: "parseblock",
	description: "Parses blocks",
	execute(body, params={}, mode) {
		let anss = []
		let ans = []
		let declared = []

		let os = oss.type()
		
		console.log(mode)

		switch(params.type) {
			case "loop":
				for (let i = 0; i < params.amount; i++)
				body.forEach(e => {
					if (mode === "elf32") {
						ans.push(e)
						return
					}
					if (!e.os.includes('mac') && os == 'Darwin') return
					if (!e.os.includes('linux') && os == 'Linux') return
					if (!e.os.includes('win') && os == 'Windows_NT') return
					if (e.type !== "text") {
						if (!declared.includes(e)) {
							ans.push(e)
						}
						declared.push(e)
						return;
					}
					else anss.push(e.commands)
				})
				
				if (mode === "elf32") {
					return ans
				}
				anss.push("\n\tret\n")
				return loop.execute(params.amount,params.current,anss,ans)

				break;
				
			case "function":
				if (mode === "elf32") {
					body.forEach(e => {
						ans.push(e)
					})

					return ans
				}
				body.forEach(e => {
					if (!e.os.includes('mac') && os == 'Darwin') return
					if (!e.os.includes('linux') && os == 'Linux') return
					if (!e.os.includes('win') && os == 'Windows_NT') return
					if (e.type !== "text") {
						if (!declared.includes(e)) {
							ans.push(e)
						}
						declared.push(e)
						return;
								}
					else anss.push(e.commands)
				})
				
        anss.push("\n\tret\n")
				return funcdec.execute(params.func,anss,ans)
		}
	}
}