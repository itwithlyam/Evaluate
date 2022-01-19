import {run as start} from '../util.js'
import {expect} from 'chai'

describe('Functions', function() {
	context('function', function() {
		it('should create a function', function() {
			start(`function a pass`)
		})
	})
	context('function call', function() {
		it('should call the function', function() {
			start(`function a pass; call a`)
		})
	})
  
})


