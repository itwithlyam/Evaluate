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

	let labels = []

    code = [{hex: "B8 04 00 00 00 BB 01 00 00 00 B9 __ 80 04 08 BA 0C 00 00 00 CD 80"}, {hex: "B8 04 00 00 00 BB 01 00 00 00 B9 __ 80 04 08 BA 02 00 00 00 CD 80"}, {hex: "B8 01 00 00 00 BB 00 00 00 00 CD 80"}, {hex: "48 45 4C 4C 4F 20 57 4F 52 4C 44 0A", label: true}, {hex: "48 0A", label: true}]

    let program = ""

    let bytes = 0

    fh.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                program += e
            } else {
                bytes += e
            }
        })
    })
    ph.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                program += e
            } else {
                bytes += e
            }
        })
    })

		let counter = 0
    code.forEach(element => {
			
			if (element.label) labels.push(bytes.toString(16))
			element.hex.split(' ').forEach(e => {
				program += e
				bytes++
				counter++
			})
    })

			console.log(program)
		counter = 0
		let labelcounter = 0
		program = program.match(/.{1,2}/g) || []
		program.forEach(element => {
			console.log(element)
			if (element === "__") {
				console.log(labels)
				program[counter] = labels[labelcounter]
				labelcounter++
			}

			counter++
		})

		program = program.join('')
		console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}