import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function outputfunc(args, line, trace, compiled) {
	try {
		if (!compiled) return args.join(' ')
		return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,${args[0]}\nmov edx,${args[0]}len\nint 0x80\n`, type: "text"},{commands: `${args[0]} db "${args[1]}",10,0\n${args[0]}len equ $ - ${args[0]}`, type: "data"}]
	} catch(err) {
		throw new RuntimeError("StandardLibraryOutput", "An error occured during output", line, ParseTrace(trace))
	} 
}