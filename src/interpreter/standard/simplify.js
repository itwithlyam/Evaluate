import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function simplifyfunc(args, line, trace, compiled) {
	try {
		let sim = simplify(args[1]).toString()
		if (compiled) return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80`, type: "text"}, {label: args[0], commands: `db "${args[0]}: ${sim}",10,0`, type: "label"}, {label: args[0]+"len", commands: `equ $-${args[0]}`, type: "label"}]
		return sim
	} catch(err) {
		throw new RuntimeError("StandardLibrarySimplification", "Invalid expression", line, ParseTrace(trace))
	}
}