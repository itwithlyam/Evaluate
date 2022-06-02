import equate from "../equate.js"
import {RuntimeError, ParseTrace, ToHex, parseMemoryAddress} from '../../util.js'

export default function eqfunc(args, line, trace, compiled, id, elf) {
	try {
		let statement = args[0].split(/(\+)|(\-)|(\/)|(\*)|(\^)|(\<\<)|(\>\>)|(\%)|(\¬)|(\()|(\))/gi)
		let a = equate.execute(statement, line)
		if (!compiled) return a
		let hexa = ToHex(a.toString())
		let hexlen = ((hexa + "0A").split(' ').join('').length / 2).toString()
		
		if (!elf) return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,eq${id}\nmov edx,eqlen${id}\nint 0x80`, type: "text", os: ['win', 'linux']}, {commands: `mov eax,0x20000004\nmov ebx,1\nmov ecx,eq${id}\nmov edx,eqlen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: "eq"+id, commands: `db "${a}",10,"Warning: Standard.equate() is deprecated and will be removed soon",10,0`, type: "label", os: ['mac', 'win', 'linux']}, {label: `eqlen${id}`, commands: `equ $-eq${id}`, type: "label", os: ['mac', 'win', 'linux']}]

		if (hexlen.length === 1) hexlen = "0" + hexlen
		hexlen = parseMemoryAddress(hexlen)
		return [{hex: `B804000000BB01000000B9__BA${hexlen}CD80`, desc: "print out res"}, {hex: `${hexa}0A00`, label: true, desc: "res"}]

	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibraryEquate", "An error occured during evaluation", line, ParseTrace(trace))
	}
}