import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function simplifyfunc(args, line, trace) {
	try {
		let sim = simplify(args[0]).toString()
		return sim
	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibrarySimplification", "Invalid expression", line, ParseTrace(trace))
	}
}