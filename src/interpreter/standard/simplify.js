import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function simplifyfunc(args, line, trace, compiled) {
	try {
		if (compiled) return `polynomial p;\np = "${args.join('')}";\nprintf(simplify(p) + "\\n");`
		let sim = simplify(args.join('')).toString()
		return sim
	} catch(err) {
		throw new RuntimeError("StandardLibrarySimplification", "Invalid expression", line, ParseTrace(trace))
	}
}