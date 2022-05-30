import Header from './header.js'

export default class SectionHeader extends Header {
    constructor() {
        super()
        this.name = "00000000" // Strings table
        this.type = "00000000" // Type of section
        this.flags = "00000000" // Flags
        this.addr = "00000000" // Address of section
        this.offset = "00000000" // Offset of section
        this.size = "00000000" // Size of section
        this.link = "00000000" // Link to another section
        this.info = "00000000" // Info
        this.addralign = "10000000" // Alignment
        this.entsize = "00000000" // Entry size
        this.stringTable = "00 2e 73 68 73 74 72 74 61 62 00"
    }
    build() {
        return [
            // [field, bytes]
            [this.name, 4],
            [this.type, 4],
            [this.flags, 4],
            [this.addr, 4],
            [this.offset, 4],
            [this.size, 4],
            [this.link, 4],
            [this.info, 4],
            [this.addralign, 4],
            [this.entsize, 4]
        ]
    }
}