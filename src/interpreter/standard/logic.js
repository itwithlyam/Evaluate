import {RuntimeError, ParseTrace} from '../../util.js'

export default function (args, line, trace, compiled) {
	try {
		let statement = args.join(' ')
		if (!compiled) {
			let func = Function(`if (${statement}) return true
	else return false`)
			if (func()) {
				return "Logic " + statement + " returned True"
			} else {
				return "Logic " + statement + " returned False"
			}
		} else {
			return `if ((${statement}) == 1) {
				printf("${statement}: True\\n");
			} else {
				printf("${statement}: False\\n");
			}`
		}
	} catch(err) {
		throw new RuntimeError("StandardLibraryLogic", "An error occured during evaluation of logic", line, ParseTrace(trace))
	}
}