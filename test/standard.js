import {run as start} from '../src/util.js'
import {expect} from 'chai'

describe('Standard Library', function() {
	context('standard mathematical functions', function() {
		it('simplify', function() {
			expect(start(`simplify("12x*17x")`)).to.equal("204 * x ^ 2")
		})
		it('printf', function() {
			expect(start(`printf("Hello, World!")`)).to.equal(" Hello, World!")
		})
	})
	context('logic', function() {
		it('should return true', function() {
			expect(start("logic(true)")).to.equal("Logic true returned True")
		})
		it('should return false', function() {
			expect(start("logic(false)")).to.equal("Logic false returned False")
		})
		it('should return true - comparison', function() {
			expect(start("logic(1==1)")).to.equal("Logic 1==1 returned True")
		})
		it('should return true - less than', function() {
			expect(start("logic(1<78)")).to.equal("Logic 1<78 returned True")
		})
		it('should return true - NOT operator', function() {
			expect(start('logic(766!=64)')).to.equal('Logic 766!=64 returned True')
		})
		it('should return false - AND operator', function() {
			expect(start('logic(true && false)')).to.equal('Logic true && false returned False')
		})
		it('should return true - OR operator', function() {
			expect(start('logic(true || false)')).to.equal('Logic true || false returned True')
		})
	})
})
