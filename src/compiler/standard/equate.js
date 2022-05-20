import equate from "../equate.js"
import {RuntimeError, ParseTrace} from '../../util.js'

export default function eqfunc(args, line, trace, compiled, id) {
	try {
		let statement = args[0].split(/(\+)|(\-)|(\/)|(\*)|(\^)|(\<\<)|(\>\>)|(\%)|(\¬)|(\()|(\))/gi)
		let a = equate.execute(statement, line)
		if (!compiled) return a
		return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,eq${id}\nmov edx,eqlen${id}\nint 0x80`, type: "text", os: ['win', 'linux']}, {commands: `mov eax,0x20000004\nmov ebx,1\nmov ecx,eq${id}\nmov edx,eqlen${id}\nint 0x80`, type: "text", os: ['mac']}, {label: "eq"+id, commands: `db "${a}",10,"Warning: Standard.equate() is deprecated and will be removed soon",10,0`, type: "label", os: ['mac', 'win', 'linux']}, {label: `eqlen${id}`, commands: `equ $-eq${id}`, type: "label", os: ['mac', 'win', 'linux']}]

	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibraryEquate", "An error occured during evaluation", line, ParseTrace(trace))
	}
}