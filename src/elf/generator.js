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

		fheader.entry = "7A"

		fheader.shnum = "01"

    code.push({hex: "B8 01 00 00 00 BB 00 00 00 00 CD 80"})

	let labels = []

    let program = ""
		let programn = ""

    let bytes = 124 - 40

		let counter = 0
    code.forEach(element => {
            console.log(element)
			
			if (element.label) return labels.push({label: element.hex})
			element.hex.split(' ').forEach(e => {
				program += e
				bytes++
				counter++
			})
    })

    counter = 0
    program += "00004c424c0000"
    bytes += 7
    labels.forEach(element => {
        labels[counter].address = bytes.toString(16)
        element.label.split(' ').forEach(e => {
            program += e
            bytes++
        })
        counter++
    })
		counter = 0

		pheader.filesz = bytes.toString(16)
		pheader.memsz = bytes.toString(16)
        program += "00000000000000000000000000000000"
        bytes += 16
        stable.offset = bytes

        let startoftable = bytes

        stable.add("2e7465787400", "text")
        stable.link = "01000000"
        let strh = stable.buildstr().split(' ').join('')
        bytes += strh.length / 2

        fheader.shstrndx = parseMemoryAddress(startoftable, 1)

    let fh = fheader.build()
    let ph = pheader.build()

	
        stext.name = parseMemoryAddress(startoftable + stable.find("text").offset, 1)
        console.log(stext.name)
	stext.type = "01"// PROGBITS
	stext.flags = "04"
	stext.offset = "54"
    stext.link = "02000000"
	
	stext.size = (bytes-124).toString(16)
	let ts = stext.build()

		fh.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                programn += e
            }
        })
    })
    ph.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                programn += e
            }
        })
    })
	ts.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                programn += e
            }
        })
    })

	let labelcounter = 0
		program = program.match(/.{1,2}/g) || []
		program.forEach(element => {
			if (element === "__") {
				program[counter] = labels[labelcounter].address
				labelcounter++
			}

			counter++
		})

        program.push(strh)

		program = programn.split(' ').join('') + program.join('')
		console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}