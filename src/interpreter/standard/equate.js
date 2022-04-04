import equate from "../equate.js"
import {RuntimeError, ParseTrace} from '../../util.js'

export default function eqfunc(args, line, trace, compiled) {
	try {
		let statement = args.join(' ').split(' ')
		let a = equate.execute(statement, line)
		if (!compiled) return a
		return `printf(${statement.join(' ')});`
	} catch(err) {
		console.log(err)
		throw new RuntimeError("StandardLibraryEquate", "An error occured during evaluation", line, ParseTrace(trace))
	}
}