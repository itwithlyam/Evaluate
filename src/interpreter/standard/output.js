import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function outputfunc(args, line, trace, compiled) {
	try {
		if (!compiled) return args.join(' ')
		let ret = []
		/* {label: args[0], commands: `db "${args[0]}: ${args[1]}",0`, type: "label", os: ['mac', 'linux', 'win']}, */
		let counter = 0
		let concat = false
		args[1].split(/(\\n)|({)|(})/gi).forEach(l => {
			if (!l) return
			console.log(l)
			counter++
			if (l === '\\n') {
				ret.push({commands: `db 10,0`, type: "label", label: args[0]+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: args[0]+"len"+counter, commands: `equ $-${args[0]}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}${counter}\nmov edx,${args[0]}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,${args[0]}${counter}\nmov edx,${args[0]}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else if (l === '{') {
				concat = true
			} else if (l === '}') {
				concat = false
			} else {
				if (concat) {
					ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,${l}\nmov edx,${l}len\nint 0x80\n`, type: "text", os: ['win', 'linux']})
					ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,${l}\nmov edx,${l}}len\nint 0x80\n`, type: "text", os: ['mac']})
				} else {
					ret.push({commands: `db "${l}",0`, type: "label", label: args[0]+counter, os: ['mac', 'linux', 'win']})
					ret.push({label: args[0]+"len"+counter, commands: `equ $-${args[0]}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
					ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}${counter}\nmov edx,${args[0]}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
					ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,${args[0]}${counter}\nmov edx,${args[0]}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
				}
			}
		})
		return ret
	} catch(err) {
		throw new RuntimeError("StandardLibraryOutput", "An error occured during output", line, ParseTrace(trace))
	} 
} 