import ProgramHeader from './structs/programheader.js'
import SectionHeader from './structs/sectionheader.js'
import StringTable from './structs/stringtable.js'
import FileHeader from './structs/fileheader.js'
import fs from 'fs'

import {parseMemoryAddress, convertEndian, parseVaddr} from '../util.js'

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
    let phentry = 52
    let entry = convertEndian(parseVaddr("84"))

    // strshtab.add("2e737472736874616200", "shstrtab")
    // strshtab.add("2e737472746162", "strtab")
    // strshtab.add("2e7465787400", "text")

    fh.setField("entry", entry, 0)
    fh.setField("phoff", phentry, 0)

    parr.forEach(byte => {
        if (byte == '__') {
            let c = convertEndian(parseVaddr((stentry + strtab.next().offset).toString(16))).match(/.{1,2}/g)
            console.log(c)
            parr.splice(counter, 1, c[0], c[1], c[2], c[3])
        }
        counter++
    })

    // strshtab.setField("name", strshtab.find("shstrtab").offset, 0)

    program = []

    let rb = 0
    
    program.push(fh.build())
    rb += 52

    program.push(ph.build())
    rb += 32

    program.push(parr.join(''))
    rb += parr.length

    program.push(strtab.buildstr())
    rb += strtab.buildstr().length / 2

    ph.setField("filesz", (rb - 52).toString(16), 0)
    ph.setField("memsz", (rb - 52).toString(16), 0)
    program[1] = ph.build()

    // fh.setField("shstrndx", rb.toString(16), 1)

    // program.push(strshtab.buildstr())
    // rb += strshtab.buildstr().length / 2

    // fh.setField("shoff", rb.toString(16), 0)

    // program.push(th.build())
    // rb += 40

    // program.push(strtab.build())
    // rb += 40

    // program.push(strshtab.build())
    // rb += 40

    // ph.setField("filesz", (rb - 52).toString(16), 0)
    // ph.setField("memsz", (rb - 52).toString(16), 0)
    // program[1] = ph.build()

    // program[0] = fh.build()

    program = program.join('')

    console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}