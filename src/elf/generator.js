import fileheader from './structs/fileheader.js'
import programheader from './structs/programheader.js'
import {Buffer} from 'buffer'
import fs from 'fs'


export default function ELFGenerator(code, output) {
    let fheader = new fileheader()
    let pheader = new programheader()

    pheader.filesz = "2C"
    pheader.memsz = "2C"

    let fh = fheader.build()
    let ph = pheader.build()

    let placeholder = "B8 04 00 00 00 BB 01 00 00 00 B9 76 80 04 08 BA 0A 00 00 00 CD 80 B8 01 00 00 00 BB 00 00 00 00 CD 80 48 45 4C 4F 20 57 52 4C 44 0A"

    let program = ""

    fh.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                program += e
            }
        })
    })
    ph.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                program += e
            }
        })
    })

    program += placeholder.replaceAll(' ', '')

    console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}