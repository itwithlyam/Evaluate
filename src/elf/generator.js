import ProgramHeader from './structs/programheader.js'
import SectionHeader from './structs/sectionheader.js'
import StringTable from './structs/stringtable.js'
import FileHeader from './structs/fileheader.js'
import fs from 'fs'

export default function ELFGenerator(mc, output) {
    // ELF Structures
    const ph = new ProgramHeader() // Program Header (aka segment header)
    const strtab = new StringTable() // String table
    const strshtab = new StringTable() // String section header table
    const fh = new FileHeader() // File header
    const th = new SectionHeader() // .text section header

    let program = ""

    mc.forEach(element => {
        if (element.label) return strtab.add(element.hex, element.label)
        program += element.hex
    })

    program += "B801000000BB00000000CD80"

    let parr = program.match(/.{1,2}/g) || []

    let counter = 0
    let stentry = 84 + parr.length // String table entry
    let shstoffset = stentry + strtab._offset
    let shtentry; // Unknown
    let shentry; // Unknown
    let phentry = 52
    let entry = 84

    parr.forEach(byte => {
        if (byte == '__') {
            parr[counter] = stentry + strtab.next().offset
            console.log(parr[counter])
        }
        counter++
    })

    program = parr.join('')

    program = ph.build() + program
    program = fh.build() + program
    program += strtab.buildstr()
    program += strshtab.buildstr()
    program += th.build()
    program += strtab.build()
    program += strshtab.build()

    console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}