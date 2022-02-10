import {rpn, Yard} from '../util.js'

export default {
	name: "equation",
	description: "evaluate equations that aren't technically equations",
	execute(postfix, line) {
		let round = false
		let op = []
		let nots = ['¬']
    postfix.forEach(e => {
				if (e.value === '~') round = true
				else op.push(e.value)
				if (nots.includes(e.value)) op.push(0)
		})
		let answ = rpn(Yard(op), line)
		if (round) answ = Math.floor(answ)
		return answ
	}
}