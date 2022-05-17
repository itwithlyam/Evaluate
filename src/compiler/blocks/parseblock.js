import funcdec from './modifiers/function.js'
import loop from './modifiers/loop.js'

export default {
	name: "parseblock",
	description: "Parses blocks",
	execute(body, current=null, func=null, times=null, type) {
		let anss = []
		let ans = []
		let declared = []
		
		switch(type) {
			case "loop":
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
				
				anss.push("\n\tret\n")
				loop.execute(times,current,anss,ans)

				break;
				
			case "function":
		}
	}
}