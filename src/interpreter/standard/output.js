import {RuntimeError, ParseTrace} from '../../util.js'
import {simplify} from 'mathjs'

export default function outputfunc(args, line, trace) {
	try {
		return args.join(' ')
	} catch(err) {
		throw new RuntimeError("StandardLibraryOutput", "An error occured during output", line, ParseTrace(trace))
	}
}