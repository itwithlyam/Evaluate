import Header from './header.js'

export default class ProgramHeader extends Header {
    constructor() {
        super()
        this.type = "01000000" // Loadable
        this.offset = "54000000" // Unknown at this point - Offset to start of segment
        this.vaddr = "54000000" // Unknown at this point - Virtual address of segment
        this.paddr = "00000000" // Unused in x86
        this.filesz = "0C000000" // Unknown at this point - Segment size (file image) in bytes
        this.memsz = "0C000000" // Unknown at this point - Segment size (in memory) in bytes
        this.flags = "05000000" // Can read, can execute. 1 = Executable, 2  = Writable, 4 = Readable
        this.align = "00100000" // 1000 for x86. (note endianness: 0010)
    }
}