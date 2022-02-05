import {run as start} from '../util.js'
import {expect} from 'chai'

describe('Maths', function() {

  context('simple equations', function() {
    it('should return 2', function() {
      expect(start("{1 + 1}")).to.equal(2)
    })
		it('should return 1', function() {
			expect(start("{1 * 1}")).to.equal(1)
		})
		it("should return 2", function() {
			expect(start("{10 / 5}")).to.equal(2)
		})
		it("should return 4", function() {
			expect(start("{10 - 6}")).to.equal(4)
		})
		it("should return undefined", function() {
			expect(start("{54 % 2}")).to.equal(undefined)
		})
		it("should return 2", function() {
			expect(start("{4¬}")).to.equal(2)
		})
		it("should return 4", function() {
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
