import {run as start} from '../src/util.js'
import {expect} from 'chai'

describe('Functions', function() {
	context('minimal functions', function() {
		it('should create a function', function() {
			start(`function a pass`)
		})
		it('should call the function', function() {
			start(`function a pass
			call a`)
		})
	})
	context('better functions?', function() {
		it("doesn't exist yet", function() {})
	})
  
})


