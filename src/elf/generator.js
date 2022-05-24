import fileheader from './structs/fileheader.js'
import programheader from './structs/programheader.js'
import fs from 'fs'


export default function ELFGenerator(code, output) {
    let fheader = new fileheader()
    let pheader = new programheader()

    code.push({hex: "B8 01 00 00 00 BB 00 00 00 00 CD 80"})

	let labels = []

    let program = ""
		let programn = ""

    let bytes = 0

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
    labels.forEach(element => {
        labels[counter].address = bytes.toString(16)
        element.label.split(' ').forEach(e => {
            program += e
            bytes++
        })
        counter++
    })
		counter = 0
		let labelcounter = 0
		program = program.match(/.{1,2}/g) || []
		program.forEach(element => {
			console.log(element)
			if (element === "__") {
				console.log(labels)
				program[counter] = labels.shift.address
				labelcounter++
			}

			counter++
		})

		pheader.filesz = bytes.toString(16)
		pheader.memsz = bytes.toString(16)

    let fh = fheader.build()
    let ph = pheader.build()

		fh.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                programn += e
            } else {
                bytes += e
            }
        })
    })
    ph.forEach(element => {
        element.forEach(e => {
            if (e.length == 2) {
                programn += e
            } else {
                bytes += e
            }
        })
    })

		program = programn.split(' ').join('') + program.join('')
		console.log(program)
    fs.writeFileSync(output+".out", program, {encoding: 'hex'})
}