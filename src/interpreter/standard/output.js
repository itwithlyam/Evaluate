import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function outputfunc(args, line, trace, compiled) {
	try {
		if (!compiled) return args.join(' ')
		return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80\n`, type: "text"}, {label: args[0], commands: `db "${args[0]}: ${args[1]}",10,0`, type: "label"}, {label: args[0]+"len", commands: `equ $-${args[0]}`, type: "label"}]
		//return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,"${args[0]}"\nmov edx,${args[0].length}\nint 0x80\n`, type: "text"}]	
	} catch(err) {
		throw new RuntimeError("StandardLibraryOutput", "An error occured during output", line, ParseTrace(trace))
	} 
} 