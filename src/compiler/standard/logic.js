import {RuntimeError, ParseTrace} from '../../util.js'

export default function (args, line, trace, elf, id) {
	try {
		let statement = args[0]
		let func = Function(`if (${statement}) return true
	else return false`)
		let truth = func()
		if (elf === "elf32") {
			let t = "747275650A"
			let tl = "05000000"
			let f = "66616c73650A"
			let fl = "06000000"

			if (truth) {
				return [{hex: `B804000000BB01000000B9__BA${tl}CD80`}, {hex: t, label: true, desc: "True"}]
			} else {
				return [{hex: `B804000000BB01000000B9__BA${fl}CD80`}, {hex: f, label: true, desc: "False"}]
			}
		} else {
			if (truth) {
				return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['linux', 'win']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: `logic${id}`, commands: `db "True",10,0`, type: "label", os: ['mac', 'linux', 'win']}, {label: `logiclen${id}`, commands: `equ $-logic${id}`, type: "label", os: ['mac', 'linux', 'win']}]
			} else {
				return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['linux', 'win']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,logic${id}\nmov edx,logiclen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: `logic${id}`, commands: `db "False",10,0`, type: "label", os: ['mac', 'linux', 'win']}, {label: `logiclen${id}`, commands: `equ $-logic${id}`, type: "label", os: ['mac', 'linux', 'win']}]
			}
		}
	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibraryLogic", "An error occured during evaluation of logic", line, ParseTrace(trace))
	}
}