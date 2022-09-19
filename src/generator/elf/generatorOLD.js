import fileheader from './structs/fileheader.js'
import programheader from './structs/programheader.js'
import sectionheader from './structs/sectionheader.js'
import stringtable from './structs/stringtable.js'
import fs from 'fs'

import {parseMemoryAddress} from '../util.js'
import { string } from 'mathjs'


export default function ELFGenerator(code, output) {
    let fheader = new fileheader()
    let pheader = new programheader()
    let stext = new sectionheader()
    let sdata = new sectionheader()
    let sbss = new sectionheader()
    let stable = new stringtable()

    fheader.setField("entry", "7A", 0)
    fheader.setField("shnum", "01", 1)

    code.push({hex: "B8 01 00 00 00 BB 00 00 00 00 CD 80"})

	let labels = []

    let program = ""

    let bytes = 84

    let counter = 0
    code.forEach(element => {        
        if (element.label) return labels.push({label: element.hex})
        element.hex.split(' ').forEach(e => {
            program += e
            bytes++
            counter++
        })
    })

    counter = 0
    labels.forEach(element => {
        labels[counter].address = bytes.toString(16)
        element.label.split(' ').forEach(e => {
            program += e
            bytes++
        })
        counter++
    })
    counter = 0

    fheader.setField("type", "03", 1)
    pheader.setField("filesz", bytes.toString(16), 0)
    pheader.setField("memsz", bytes.toString(16), 0)
    stable.setField("offset", bytes.toString(16), 0)

    let startoftable = bytes

    stable.add("2e7465787400", "text")
    stable.setField("link", "01", 0)
    stable.setField("flags", "22", 0)

    fheader.setField("shstrndx", parseMemoryAddress(startoftable, 1))
    stext.setField("name", parseMemoryAddress(startoftable + stable.find("text").offset, 0))
    stext.setField("type", "01", 0)
    stext.setField("flags", "04", 0)
    stext.setField("offset", "54", 0)
    stext.setField("link", "02", 0)
	stext.setField("size", (bytes-84).toString(16), 0)
    
    fheader.setField("shoff", bytes.toString(16), 0)
    console.log(fheader.shoff)
    
    let strh = stable.buildstr().split(' ').join('')
    let fh = fheader.build()
    let ph = pheader.build()
	let ts = stext.build()

    bytes += strh.length / 2

	fh.reverse()	
    console.log(fh)
    fh.forEach(element => {
        element.reverse()
        element.forEach(e => {
            if (e.length != 1) {
                program = e + program
            }
        })
    })
    ph.forEach(element => {
        element.forEach(e => {
            if (e.length != 1) {
                program += e
            }
        })
    })
	ts.forEach(element => {
        element.forEach(e => {
            if (e.length != 1) {
                program += e
            }
        })
    })

	let labelcounter = 0
    counter = 0
    program = program.match(/.{1,2}/g) || []
    console.log(program)
    program.forEach(element => {
        if (element === "__") {
            program[counter] = labels[labelcounter].address
            labelcounter++
        }

        counter++
    })

    program.push(strh)

    program = program.join('')
    console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}