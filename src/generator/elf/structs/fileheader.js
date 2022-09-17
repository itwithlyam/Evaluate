import Header from './header.js'

export default class FileHeader extends Header {
    constructor() {
        super()
        this.ident = [];
        this.type = "0200"; // ET_EXEC
        this.machine = "0300"; // x86
        this.version = "01000000"; // Always 0x01
        this.entry = "54000000"; // Unknown at this stage
        this.phoff = "34000000"; // Program header offset 
        this.shoff = "00000000"; // Section header offset
        this.flags = "00000000"; // None for x86
        this.ehsize = "3400"; // 32 bit headers
        this.phentsize = "2000"; // 32 bit headers
        this.phnum = "0100"; // Amount of PHs 
        this.shentsize = "2800"; // 32 bit headers
        this.shnum = "0000"; // Amount of SHs
        this.shstrndx = "0000"; // String table index

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
    build() {
        // OVERLOAD OF Header#build()
        let ret = ""
        Object.entries(this).forEach(([key, value]) => {
            if (key === "ident") return ret += value.join('')
            ret += value
        })
        return ret
    }
}