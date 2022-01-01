const start = require("../util.js").run

var expect = require('chai').expect;

describe('Maths', function() {

  context('general equation', function() {
    it('should return 2', function() {
      expect(start("1 + 1")).to.equal(2)
    })
		it('should return 1', function() {
			expect(start("1 * 1")).to.equal(1)
		})
		it("should return 2", function() {
			expect(start("10 / 5")).to.equal(2)
		})
		it("should return Infinity", function() {
			expect(start("1 / 0")).to.equal(Infinity)
		})
		it("should return 4", function() {
			expect(start("10 - 6")).to.equal(4)
		})
  })
  
})


