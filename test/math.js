const start = require("../util.js").run

var expect = require('chai').expect;

describe('Maths', function() {

  context('simple equations', function() {
    it('should return 2', function() {
      expect(start("1 + 1")).to.equal(2)
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
  })
  context('complex calculations', function() {
	  it("should return 44", function() {
		  expect(start("{11 * (12 - 1)}")).to.equal(44)
	  })
	  it("should return 1", function() {
		  expect(start("{0.5 * 2}")).to.equal(1)
	  })
  })
  
})
