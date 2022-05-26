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

    code.push({hex: "B8 01 00 00 00 BB 00 00 00 00 CD 80"})

	let labels = []

    let program = ""
		let programn = ""

    let bytes = 84

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
        let strh = stable.build().split(' ').join('')
        bytes += strh.length / 2

        fheader.shstrndx = startoftable.toString(16)
        console.log(startoftable.toString(16))

    let fh = fheader.build()
    let ph = pheader.build()

        stext.name = startoftable + stable.find("text").offset

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