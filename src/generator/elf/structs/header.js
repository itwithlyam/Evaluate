import {parseMemoryAddress} from '../../../../old/util.js'

export default class Header {
    constructor() {}
    setField(field, value, type) {
        if (type === null) this[field] = value
        this[field] = parseMemoryAddress(value, type)
    }
    build() {
        let ret = ""
        Object.entries(this).forEach(([key, value]) => {
            if (key.startsWith("_")) return
            ret += value
        })
        return ret
    }
}