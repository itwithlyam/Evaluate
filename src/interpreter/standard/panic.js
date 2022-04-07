import {RuntimeError, ParseTrace} from "../../util.js"

export default function outputfunc(line, trace, compiled) {
	if (!compiled) throw new RuntimeError("UserGenerated", "A user generated error was thrown", line, ParseTrace(trace))
	return [{type: "label", label: "Panic", commands: `db "PANIC: A user generated error was thrown on line ${line}",10,0`},{type: "label", label: "Paniclen", commands: "equ $-Panic"},{type: "text", commands: "mov eax,4\nmov ebx,1\nmov ecx,Panic\nmov edx,Paniclen\nint 0x80\njmp end\n"}]
}