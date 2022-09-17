import sect from './sectionheader.js'

export default class StringTable extends sect {
    table
    #bytes
    #current

    constructor() {
				super()
				this.name = "00"
				this.type = "03"
        this.table = []
        this.#bytes = 0
        this.#current = 0
    }
		setOffset(offset) {
			let c = 0
			this.#bytes = offset
			this.table.forEach(str => {
				this.table[c].offset += offset
				c++
			})
		}
    add(string, name) {
        string += "00"
        this.table.push({str: string, name: name, offset: this.#bytes})
        this.#bytes += string.split(' ').join('').length / 2
    }
    find(name) {
        let str = {}
        this.table.forEach(element => {
            if (element.name == name) {
                str.str = element.str
                str.offset = element.offset
            }
        })
        return str
    }
    next() {
        this.#current++
        return this.table[this.#current - 1].offset
    }
    buildstr() {
        let table = ""
        this.table.forEach(element => {
            table += element.str
        })
        return table
    }
}