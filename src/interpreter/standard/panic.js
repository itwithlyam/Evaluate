import {RuntimeError, ParseTrace} from "../../util.js"

export default function outputfunc(line, trace, compiled) {
	if (!compiled) throw new RuntimeError("UserGenerated", "A user generated error was thrown", line, ParseTrace(trace))
	return "exit();"
}