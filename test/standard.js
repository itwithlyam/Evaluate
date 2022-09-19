import {run as start} from '../src/util.js'
import {expect} from 'chai'

describe('Functions', function() {
	context('standard mathematical functions', function() {
		it('simplify', function() {
			expect(start(`simplify("12x*17x")`)).to.equal("204 * x ^ 2")
		})
		it('output', function() {
			expect(start(`output("Hello, World!")`)).to.equal(" Hello, World!")
		})
	})
})
