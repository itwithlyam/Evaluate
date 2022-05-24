import equate from "../equate.js"
import {RuntimeError, ParseTrace, ToHex} from '../../util.js'

export default function eqfunc(args, line, trace, compiled, id, elf) {
	try {
		let statement = args[0].split(/(\+)|(\-)|(\/)|(\*)|(\^)|(\<\<)|(\>\>)|(\%)|(\¬)|(\()|(\))/gi)
		let a = equate.execute(statement, line)
		if (!compiled) return a
		let hexa = ToHex(a.toString())
		let hexb = ToHex("Warning: Standard.equate() is deprecated and will be removed soon")
		let hexlen = (hexa + hexb + "0A" + "0A").split(' ').join('').length
		console.log(hexa)
		console.log(hexb)
		console.log(hexlen.toString(16))
		if (!elf) return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,eq${id}\nmov edx,eqlen${id}\nint 0x80`, type: "text", os: ['win', 'linux']}, {commands: `mov eax,0x20000004\nmov ebx,1\nmov ecx,eq${id}\nmov edx,eqlen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: "eq"+id, commands: `db "${a}",10,"Warning: Standard.equate() is deprecated and will be removed soon",10,0`, type: "label", os: ['mac', 'win', 'linux']}, {label: `eqlen${id}`, commands: `equ $-eq${id}`, type: "label", os: ['mac', 'win', 'linux']}]
		return [{hex: `B8 04 00 00 00 BB 01 00 00 00 B9 __ 80 04 08 BA ${hexlen.toString(16)} 00 00 00 CD 80`, desc: "print out res"}, {hex: `${hexa} 0A ${hexb} 0A`, label: true, desc: "res"}]

	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibraryEquate", "An error occured during evaluation", line, ParseTrace(trace))
	}
}