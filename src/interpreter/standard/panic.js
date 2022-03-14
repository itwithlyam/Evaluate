import {RuntimeError, ParseTrace} from "../../util.js"

export default function outputfunc(line, trace) {
	throw new RuntimeError("UserGenerated", "A user generated error was thrown", line, ParseTrace(trace))
}