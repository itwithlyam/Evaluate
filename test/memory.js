const start = require("../util.js").run

var expect = require('chai').expect;

describe('Memory', function() {

  context('mset', function() {
    it('should set "a" to "12"', function() {
      expect(start("mset a 12"))
    })
		it('should set "b" to "hello"', function() {
			expect(start("mset b hello"))
		})
  })

	context('var', function() {
		it('should return 12', function() {
			expect(start("var a")).to.equal(12)
		})
		it('should return "hello"', function() {
			expect(start("var b")).to.equal("hello")
		})
	})

	context('mset var', function() {
		it('should return 14', function() {
			expect(start(`mset c 14 ;
			var c ;`)).to.equal(14)
		})
		it('should return "Helloworld"', function() {
			expect(start(`mset d Helloworld ;
			var d ;`)).to.equal("Helloworld")
		})
	})
  
})


