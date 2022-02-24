import {RuntimeError, ParseTrace} from '../../util.js'
import math from 'math.js'

export default async function simplify(args, line, trace) {
	try {
		let sim = math.simplify(args[0]).toString()
		return sim
	} catch(err) {
		throw new RuntimeError("StandardLibrary", "Invalid expression", line, ParseTrace(trace))
	}
}