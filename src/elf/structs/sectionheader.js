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
    }
}