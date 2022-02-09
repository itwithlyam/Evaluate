import {run as start} from '../src/util.js'
import {expect} from 'chai'

describe('Maths', function() {

  context('simple calculations', function() {
    it('addition', function() {
      expect(start("{1 + 1}")).to.equal(2)
    })
		it('multiplication', function() {
			expect(start("{1 * 1}")).to.equal(1)
		})
		it("division", function() {
			expect(start("{10 / 5}")).to.equal(2)
		})
		it("subtraction", function() {
			expect(start("{10 - 6}")).to.equal(4)
		})
		it("modulus", function() {
			expect(start("{54 % 2}")).to.equal(undefined)
		})
		it("square root", function() {
			expect(start("{4¬}")).to.equal(2)
		})
		it("power", function() {
			expect(start("{2^2}")).to.equal(4)
		})
  })
  context('complex calculations', function() {
	  it("should return 121", function() {
		  expect(start("{11 * (12 - 1)}")).to.equal(121)
	  })
	  it("should return 1", function() {
		  expect(start("{0.5 * 2}")).to.equal(1)
	  })
		it("should return a decimal", function() {
			expect(start("{12+76-34*654/908%1234}")).to.equal(63.51101321585903)
		})
  })
  
})
