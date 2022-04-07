import {writeFileSync} from 'fs';

export default function Generator(AST, code, output) {

    // stext = section .text
    // sdata = section .data
    // labels = values within stext (i.e. varname: db "varcontent",10,0)

    // Preprocessor

    let stext = []
    let sdata = []
    let labels = []

    code.forEach(section => {
        if (section.type === "text") stext.push(section.commands + "\n")
        if (section.type === "data") sdata.push(section.commands + "\n")
        if (section.type === "label") labels.push(`${section.label}: ${section.commands}`)
    })

    if (sdata[0]) sdata.unshift("section .data")

    // Generator

    let nasm = `
        section .text
            global _start

            ${labels.join("\n")}

            _start:
                ${stext.join("\n")}

                jmp end

            end:
                mov eax,1
                int 0x80

        ${sdata.join('\n')}
    `

    writeFileSync(output+".s", " ");
    writeFileSync(output+".s", nasm);
}