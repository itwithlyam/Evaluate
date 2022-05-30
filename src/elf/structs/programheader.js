import Header from './header.js'

export default class ProgramHeader extends Header {
    constructor() {
        super()
        this.type = "01" // Loadable
        this.offset = "54" // Unknown at this point - Offset to start of segment
        this.vaddr = "54" // Unknown at this point - Virtual address of segment
        this.paddr = "00" // Unused in x86
        this.filesz = "0C" // Unknown at this point - Segment size (file image) in bytes
        this.memsz = "0C" // Unknown at this point - Segment size (in memory) in bytes
        this.flags = "05" // Can read, can execute. 1 = Executable, 2 = Writable, 4 = Readable
        this.align = "10" // 1000 for x86. (note endianness)
    }
    build() {
        return [
            // [bytes..., byteslength]
            [this.type, "00", "00", "00", 4],
            [this.offset, "00", "00", "00", 4],
            [this.vaddr, "80", "04", "08", 4],
            [this.paddr, "00", "00", "00", 4],
            [this.filesz, "00", "00", "00", 4],
            [this.memsz, "00", "00", "00", 4],
            [this.flags, "00", "00", "00", 4],
            ["00", this.align, "00", "00", 4]
        ]
    }
}