import Header from './header.js'

export default class FileHeader extends Header {
    constructor() {
        super()
        this.ident = [];
        this.type = "02"; // ET_EXEC
        this.machine = "03"; // x86
        this.version = "01"; // Always 0x01
        this.entry = "54"; // Unknown at this stage
        this.phoff = "34"; // Program header offset 
        this.shoff = "00"; // Section header offset
        this.flags = "00"; // None for x86
        this.ehsize = "34"; // 32 bit headers
        this.phentsize = "20"; // 32 bit headers
        this.phnum = "01"; // Amount of PHs 
        this.shentsize = "28"; // 32 bit headers
        this.shnum = "01"; // Amount of SHs
        this.shstrndx = "00"; // String table index

        this.ident[0] = "7f" // Magic number
        this.ident[1] = "45" // E
        this.ident[2] = "4c" // L
        this.ident[3] = "46" // F
        this.ident[4] = "01" // Class (bits)
        this.ident[5] = "01" // Data order
        this.ident[6] = "01" // Version, always 0x01
        this.ident[7] = "00" // OS/ABI, always 0x00
        this.ident[8] = "00" // ABI version, always 0x00`
        this.ident[9] = "00" // Padding, always 0x00
        this.ident[10] = "00" // Padding, always 0x00
        this.ident[11] = "00" // Padding, always 0x00
        this.ident[12] = "00" // Padding, always 0x00
        this.ident[13] = "00" // Padding, always 0x00
        this.ident[14] = "00" // Padding, always 0x00
        this.ident[15] = "00" // Padding, always 0x00
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
            [this.type, 2],
            [this.machine, 2],
            [this.version, 4],
            [this.entry, 4],
            [this.phoff, 4],
            [this.shoff, 4],
            [this.flags, 4],
            [this.ehsize, 2],
            [this.phentsize, 2],
            [this.phnum, 2],
            [this.shentsize, 2],
            [this.shnum, 2],
            [this.shstrndx, 2]
        ]
    }
}