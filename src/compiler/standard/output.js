import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function outputfunc(args, line, trace, compiled, id) {
	try {
		if (compiled) {
			let ret = []
			let v = false
			let str = args[0].split(/(\\n)|({)|(})|(\\a)|(\\b)|(\\t)|(\\r)|(\\f)|(\\v)/gi)
			str.forEach(element => {
				if (v) {
					ret += [{""}]
				} 
			})
			return ret
		} 
		let ret = []
		/* {label: args[0], commands: `db "${args[0]}: ${args[1]}",0`, type: "label", os: ['mac', 'linux', 'win']}, */
		let counter = 0
		let concat = false
		args[0].split(/(\\n)|({)|(})|(\\a)|(\\b)|(\\t)|(\\r)|(\\f)|(\\v)/gi).forEach(l => {
			if (!l) return
			counter++
			if (l === '\\n') {
				ret.push({commands: `db 10,0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else if (l === '{') {
				concat = true
			} else if (l === '}') {
				concat = false
			} else if (l === '\\a') {
				ret.push({commands: `db 7,0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else if (l === '\\b') {
				ret.push({commands: `db 8,0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else if (l === '\\t') {
				ret.push({commands: `db 9,0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else if (l === '\\r') {
				ret.push({commands: `db 13,0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else if (l === '\\f') {
				ret.push({commands: `db 12,0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else if (l === '\\v') {
				ret.push({commands: `db 11,0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
				ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
				ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
				ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
			} else {
				if (concat) {
					ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,${l}\nmov edx,${l}len\nint 0x80\n`, type: "text", os: ['win', 'linux']})
					ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,${l}\nmov edx,${l}len\nint 0x80\n`, type: "text", os: ['mac']})
				} else {
					ret.push({commands: `db "${l}",0`, type: "label", label: "printf"+id+counter, os: ['mac', 'linux', 'win']})
					ret.push({label: "printf"+id+"len"+counter, commands: `equ $-printf${id}${counter}`, type: "label", os: ['mac', 'linux', 'win']})
					ret.push({commands: `mov eax,4\nmov ebx,1\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['win', 'linux']})
					ret.push({commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,printf${id}${counter}\nmov edx,printf${id}len${counter}\nint 0x80\n`, type: "text", os: ['mac']})
				}
			}
		})
		return ret
	} catch(err) {
		//console.log(err)
		throw new RuntimeError("StandardLibraryOutput", "An error occured during output", line, ParseTrace(trace))
	} 
} 