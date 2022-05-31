import sect from './sectionheader.js'

export default class StringTable extends sect {
    #table
    #bytes
    #current

    constructor() {
				super()
				this.name = "00"
				this.type = "03"
        this.#table = []
        this.#bytes = 0
        this.#current = 0
    }
    add(string, name) {
        this.#bytes += string.split(' ').join('').length / 2
        this.#table.push({str: string + "00", name: name, offset: this.#bytes})
    }
    find(name) {
        let str = {}
        this.#table.forEach(element => {
            if (element.name == name) {
                str.str = element.str
                str.offset = element.offset
            }
        })
        return str
    }
    next() {
        this.#current++
        return this.#table[this.#current-1]
    }
    buildstr() {
        let table = ""
        this.#table.forEach(element => {
            table += element.str
        })
        return table
    }
}