import {parseMemoryAddress} from '../../util.js'

export default class Header {
    constructor() {}
    setField(field, value, type) {
        if (type === null) this[field] = value
        this[field] = parseMemoryAddress(value, type)
    }
}