import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function simplifyfunc(args, line, trace, compiled, id) {
	try {
		let sim = simplify(args[0]).toString()
		if (compiled) return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,simplify${id}\nmov edx,simplifylen${id}\nint 0x80`, type: "text", os: ['win', 'linux']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,simplify${id}\nmov edx,simplifylen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: "simplify"+id, commands: `db "simplify${id}: ${sim}",10,0`, type: "label", os: ['win', 'mac', 'linux']}, {label: "simplifylen"+id, commands: `equ $-simplify${id}`, type: "label", os: ['win', 'mac', 'linux']}]
		return sim
	} catch(err) {
		throw new RuntimeError("StandardLibrarySimplification", "Invalid expression", line, ParseTrace(trace))
	}
}