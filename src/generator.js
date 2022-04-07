import {writeFileSync} from 'fs';

export default function Generator(AST, code, output) {

    let stext = []
    let sdata = []

    code.forEach(section => {
        console.log(section.type)
        if (section.type === "text") stext.push(section.commands)
        if (section.type === "data") sdata.push(section.commands)
    })

    let nasm = `
        section .text
            global _start

            _start:
                ${stext.join("\n")}

                jmp end

            end:
                mov eax,1
                int 0x80

        section .data
            ${sdata.join("\n")}
    `

    writeFileSync(output+".s", " ");
    writeFileSync(output+".s", nasm);
}