export default class SectionHeader {
    constructor() {
        this.name = "00" // Strings table
        this.type = "00" // Type of section
        this.flags = "00" // Flags
        this.addr = "00" // Address of section
        this.offset = "00" // Offset of section
        this.size = "00" // Size of section
        this.link = "00" // Link to another section
        this.info = "00" // Info
        this.addralign = "00" // Alignment
        this.entsize = "00" // Entry size
        this.stringTable = "00 2e 73 68 73 74 72 74 61 62 00"
    }
    build() {
        return [
            // [bytes..., byteslength]
            [this.name, "00", "00", "00", 4],
            [this.type, "00", "00", "00", 4],
            [this.flags, "00", "00", "00", 4],
            [this.addr, "00", "00", "00", 4],
            [this.offset, "00", "00", "00", 4],
            [this.size, "00", "00", "00", 4],
            [this.link, "00", "00", "00", 4],
            [this.info, "00", "00", "00", 4],
            [this.addralign, "00", "00", "00", 4],
            [this.entsize, "00", "00", "00", 4]
        ]
    }
}