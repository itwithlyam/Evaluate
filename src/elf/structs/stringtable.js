import sect from './sectionheader.js'

export default class StringTable extends sect {
    constructor() {
				super()
				this.name = "00"
				this.type = "03"
        this._table = []
        this._bytes = 0
        this._current = 0
    }
    add(string, name) {
        this._bytes += string.split(' ').join('').length / 2
        this._table.push({str: string + "00", name: name, offset: this._bytes})
    }
    find(name) {
        let str = {}
        this._table.forEach(element => {
            if (element.name == name) {
                str.str = element.str
                str.offset = element.offset
            }
        })
        return str
    }
    next() {
        this._current++
        return this._table[this._current-1]
    }
    buildstr() {
        let table = ""
        this._table.forEach(element => {
            table += element.str
        })
        return table
    }
}