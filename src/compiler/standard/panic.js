import {RuntimeError, ParseTrace} from "../../util.js"

export default function outputfunc(line, trace, compiled) {
	if (compiled) return [{hex: "B804000000BB01000000B9__BA0A000000CD80B801000000BB00000000CD80"}]
	return [{type: "label", label: "Panic", commands: `db "PANIC: A user generated error was thrown on line ${line}",10,0`, os: ['win', 'linux', 'mac']},{type: "label", label: "Paniclen", commands: "equ $-Panic", os: ['win', 'linux', 'mac']},{type: "text", commands: "mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,Panic\nmov edx,Paniclen\nint 0x80\njmp end\n", os: ['mac']}, {type: "text", commands: "mov eax,4\nmov ebx,1\nmov ecx,Panic\nmov edx,Paniclen\nint 0x80\njmp end\n", os: ['win', 'linux']}]
}