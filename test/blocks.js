const start = require("../util.js").run
const CompilationError = require("../util.js").CompilationError

var expect = require('chai').expect;

describe('Equations/blocks', function() {

  context('Maths with blocks', function() {
    it('should return 2', function() {
      expect(start("{ 1 + 1 }")).to.equal(2)
    })
		it('should return 1', function() {
			expect(start("{ 1 * 1 }")).to.equal(1)
		})
		it("should return 2", function() {
			expect(start("{ 10 / 5 }")).to.equal(2)
		})
		it("should return 4", function() {
			expect(start("{ 10 - 6 }")).to.equal(4)
		})
  })
})


