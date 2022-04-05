import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function outputfunc(args, line, trace, compiled) {
	try {
		if (!compiled) return args.join(' ')
		return [{commands: `mov eax,4\nmov ebx,1\nmov ecx,message\nmov edx,messagelen\nint 0x80\n`, type: "text"},{commands: `message db "${args.join(' ')}",10,0\nmessagelen equ $ - message`, type: "data"}]
	} catch(err) {
		throw new RuntimeError("StandardLibraryOutput", "An error occured during output", line, ParseTrace(trace))
	} 
}