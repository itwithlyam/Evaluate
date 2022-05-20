import funcdec from './modifiers/function.js'
import loop from './modifiers/loop.js'
import oss from 'os'

export default {
	name: "parseblock",
	description: "Parses blocks",
	execute(body, current=null, func=null, amount=null, type) {
		let anss = []
		let ans = []
		let declared = []

		let os = oss.type()
		
		switch(type) {
			case "loop":
				for (let i = 0; i < amount; i++) body.forEach(e => {
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
				return loop.execute(amount,current,anss,ans)

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
				return funcdec.execute(func,anss,ans)
		}
	}
}