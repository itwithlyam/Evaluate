import {RuntimeError, ParseTrace, Nullify, parseMemoryAddress, ToHex} from '../../util.js'
import {simplify} from 'mathjs'

export default function simplifyfunc(args, line, trace, compiled, id, elf) {
	try {
		let sim = simplify(args[0]).toString()
		if (elf) {
			let hexsim = ToHex(sim) + "0A"
			let ret = []
			let len = Nullify(parseMemoryAddress((hexsim.length / 2),0))
			ret.push({
				hex: hexsim, label: true, desc: "simplification"
				}, {
					hex: `B804000000BB01000000B9__BA${len}CD80`
			})
			return ret
		}
		if (compiled) return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,simplify${id}\nmov edx,simplifylen${id}\nint 0x80`, type: "text", os: ['win', 'linux']}, {commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,simplify${id}\nmov edx,simplifylen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: "simplify"+id, commands: `db "simplify${id}: ${sim}",10,0`, type: "label", os: ['win', 'mac', 'linux']}, {label: "simplifylen"+id, commands: `equ $-simplify${id}`, type: "label", os: ['win', 'mac', 'linux']}]
		return sim
	} catch(err) {
		throw new RuntimeError("StandardLibrarySimplification", "Invalid expression", line, ParseTrace(trace))
	}
}