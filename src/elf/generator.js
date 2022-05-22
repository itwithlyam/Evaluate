import fileheader from './structs/fileheader.js'
import programheader from './structs/programheader.js'
import {Buffer} from 'buffer'
import fs from 'fs'


export default function ELFGenerator(code, output) {
    let fh = new fileheader().build()
    let ph = new programheader().build()

    let gens = []

    let placeholder = "B801000000BB00000000CD80"

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

    program += placeholder

    console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}