import fileheader from './structs/fileheader.js'
import programheader from './structs/programheader.js'
import fs from 'fs'

import {parseMemoryAddress} from '../util.js'


export default function ELFGenerator(code, output) {
    let fheader = new fileheader()
    let pheader = new programheader()

    code.push({hex: "B8 01 00 00 00 BB 00 00 00 00 CD 80"})

	let labels = []

    let program = ""
		let programn = ""

    let bytes = 87

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

    let fh = fheader.build()
    let ph = pheader.build()

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
			console.log(element)
			if (element === "__") {
				program[counter] = labels[labelcounter].address
				labelcounter++
			}

			counter++
		})

		program = programn.split(' ').join('') + program.join('')
		console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}