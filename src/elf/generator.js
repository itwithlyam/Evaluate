import fileheader from './structs/fileheader.js'
import programheader from './structs/programheader.js'


export default function ELFGenerator(code, output) {
    let fh = new fileheader()
    let ph = new programheader()

    console.log(fh.build())
    console.log(ph.build())
}