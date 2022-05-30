import sect from './sectionheader.js'

export default class StringTable extends sect {
    constructor() {
				super()
				this.name = "00"
				this.type = "03"
        this.table = [{str: "00 2e 73 68 73 74 72 74 61 62 00", name: "shstrtab", offset: 0}]
        this.offset = 0
        this.bytes = 40
    }
    add(string, name) {
        this.bytes += string.split(' ').join('').length / 2
        this.table.push({str: string + "00", name: name, offset: this.bytes})
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
    buildstr() {
        let table = ""
        let sec = this.build() 
        sec.forEach(element => {
            element.forEach(e => {
                if (e.length == 2) {
                    table += e
                }
            })
        })
        this.table.forEach(element => {
            table += element.str
        })
        return table
    }
}