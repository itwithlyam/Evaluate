import {RuntimeError, ParseTrace} from '../../util.js'

export default function (args, line, trace, compiled, id) {
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
				return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['linux', 'win']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: `logic${id}`, commands: `db "True",10,0`, type: "label", os: ['mac', 'linux', 'win']}, {label: `logiclen${id}`, commands: `equ $-logic${id}`, type: "label", os: ['mac', 'linux', 'win']}]
			} else {
				return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['linux', 'win']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: `logic${id}`, commands: `db "False",10,0`, type: "label", os: ['mac', 'linux', 'win']}, {label: `logiclen${id}`, commands: `equ $-logic${id}`, type: "label", os: ['mac', 'linux', 'win']}]
			}
		}
	} catch(err) {
		throw new RuntimeError("StandardLibraryLogic", "An error occured during evaluation of logic", line, ParseTrace(trace))
	}
}