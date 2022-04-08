import equate from "../equate.js"
import {RuntimeError, ParseTrace} from '../../util.js'

export default function eqfunc(args, line, trace, compiled) {
	try {
		let statement = args[1].split(/(\+)|(\-)|(\/)|(\*)|(\^)|(\<\<)|(\>\>)|(\%)|(\¬)|(\()|(\))/gi)
		let a = equate.execute(statement, line)
		if (!compiled) return a
		return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80`, type: "text", os: ['win', 'linux']}, {commands: `mov eax,0x20000004\nmov ebx,1\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80`, type: "text", os: ['mac']}, {label: args[0], commands: `db "${args[0]}: ${a}",10,0`, type: "label", os: ['mac', 'win', 'linux']}, {label: args[0]+"len", commands: `equ $-${args[0]}`, type: "label", os: ['mac', 'win', 'linux']}]

	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibraryEquate", "An error occured during evaluation", line, ParseTrace(trace))
	}
}