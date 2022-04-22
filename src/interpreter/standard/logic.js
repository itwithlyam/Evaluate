import {RuntimeError, ParseTrace} from '../../util.js'

export default function (args, line, trace, compiled) {
	try {
		let statement = args[1]
		let func = Function(`if (${statement}) return true
	else return false`)
		let truth = func()
		if (!compiled) {
			if (truth) {
				return args[0] + ": True"
			} else {
				return args[0] + ": False"			
			}
		} else {
			if (truth) {
				return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80`, type: "text", os: ['linux', 'win']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80`, type: "text", os: ['mac']}, {label: args[0], commands: `db "${args[0]}: True",10,0`, type: "label", os: ['mac', 'linux', 'win']}, {label: args[0]+"len", commands: `equ $-${args[0]}`, type: "label", os: ['mac', 'linux', 'win']}]
			} else {
				return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80`, type: "text", os: ['linux', 'win']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80`, type: "text", os: ['mac']}, {label: args[0], commands: `db "${args[0]}: False",10,0`, type: "label", os: ['mac', 'linux', 'win']}, {label: args[0]+"len", commands: `equ $-${args[0]}`, type: "label", os: ['mac', 'linux', 'win']}]
			}
		}
	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibraryLogic", "An error occured during evaluation of logic", line, ParseTrace(trace))
	}
}