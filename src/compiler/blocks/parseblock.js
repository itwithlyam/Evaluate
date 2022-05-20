import funcdec from './modifiers/function.js'
import loop from './modifiers/loop.js'
import oss from 'os'

export default {
	name: "parseblock",
	description: "Parses blocks",
	execute(body, params={}) {
		let anss = []
		let ans = []
		let declared = []

		let os = oss.type()
		
		switch(params.type) {
			case "loop":
				for (let i = 0; i < params.amount; i++) body.forEach(e => {
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
				return loop.execute(params.amount,params.current,anss,ans)

				break;
				
			case "function":
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