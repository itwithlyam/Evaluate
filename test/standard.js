import {run as start} from '../src/util.js'
import {expect} from 'chai'

describe('Functions', function() {
	context('standard mathematical functions', function() {
		it('simplify', function() {
			start(`simplify("12x*17x")`)
		})
	})
})
