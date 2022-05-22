class FileHeader {
    constructor() {
        this.ident = new Uint8Array(16);
        this.type = 0x02; // ET_EXEC
        this.machine = 0x03; // x86
        this.version = 0x01; // Always 0x01
        this.entry = 0x00; // Unknown at this stage
        this.phoff = 0x34; // Program header offset 
        this.shoff = 0x00; // Section header offset
        this.flags = 0x00; // None for x86
        this.ehsize = 0x34; // 32 bit headers
        this.phentsize = 0x20; // 32 bit headers
        this.phnum = 0x01; // Amount of PHs 
        this.shentsize = 0x28; // 32 bit headers
        this.shnum = 0x00; // Amount of SHs
        this.shstrndx = 0x00; // We have no SHs yet

        this.ident[0] = 0x7f // Magic number
        this.ident[1] = 0x45 // E
        this.ident[2] = 0x4c // L
        this.ident[3] = 0x46 // F
        this.ident[4] = 0x01 // Class (bits)
        this.ident[5] = 0x01 // Data order
        this.ident[6] = 0x01 // Version, always 0x01
        this.ident[7] = 0x00 // OS/ABI, always 0x00
        this.ident[8] = 0x00 // ABI version, always 0x00`
        this.ident[9] = 0x00 // Padding, always 0x00
        this.ident[10] = 0x00 // Padding, always 0x00
        this.ident[11] = 0x00 // Padding, always 0x00
        this.ident[12] = 0x00 // Padding, always 0x00
        this.ident[13] = 0x00 // Padding, always 0x00
        this.ident[14] = 0x00 // Padding, always 0x00
        this.ident[15] = 0x00 // Padding, always 0x00
    }
    enter(point) {
        this.entry = point;
    }
    build() {
        return [
            // [bytes..., byteslength]
            [this.ident[0], this.ident[1], this.ident[2], this.ident[3], 4],
            [this.ident[4], 1],
            [this.ident[5], 1],
            [this.ident[6], 1],
            [this.ident[7], 1],
            [this.ident[8], 1],
            [this.ident[9], this.ident[10], this.ident[11], 3],
            [this.ident[12], this.ident[13], this.ident[14], this.ident[15], 4],
            [this.type, 0x00, 2],
            [this.machine, 0x00, 2],
            [this.version, 0x00, 0x00, 0x00, 4],
            [this.entry, 4],
            [this.phoff, 0x00, 0x00, 0x00, 4],
            [this.shoff, 0x00, 0x00, 0x00, 4],
            [this.flags, 0x00, 0x00, 0x00, 4],
            [this.ehsize, 0x00, 2],
            [this.phentsize, 0x00, 2],
            [this.phnum, 0x00, 2],
            [this.shentsize, 0x00, 2],
            [this.shnum, 0x00, 2],
            [this.shstrndx, 0x00, 2]
        ]
    }
}