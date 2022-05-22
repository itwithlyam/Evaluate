export default class ProgramHeader {
    constructor() {
        this.type = 0x01 // Loadable
        this.offset = 0x00 // Unknown at this point - Offset to start of segment
        this.vaddr = 0x00 // Unknown at this point - Virtual address of segment
        this.paddr = 0x00 // Unused in x86
        this.filesz = 0x00 // Unknown at this point - Segment size (file image) in bytes
        this.memsz = 0x00 // Unknown at this point - Segment size (in memory) in bytes
        this.flags = 0x02 // Can read, can execute. 1 = Executable, 2 = Writable, 4 = Readable
        this.align = 0x10 // 1000 for x86. (note endianness)
    }
    build() {
        return [
            // [bytes..., byteslength]
            [this.type, 0x00, 0x00, 0x00, 4],
            [this.offset, 0x00, 0x00, 0x00, 4],
            [this.vaddr, 0x00, 0x00, 0x00, 4],
            [this.paddr, 0x00, 0x00, 0x00, 4],
            [this.filesz, 0x00, 0x00, 0x00, 4],
            [this.memsz, 0x00, 0x00, 0x00, 4],
            [this.flags, 0x00, 0x00, 0x00, 4],
            [this.align, 0x00, 0x00, 0x00, 4]
        ]
    }
}