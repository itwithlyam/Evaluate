import {writeFileSync} from 'fs';

export default function Generator(AST, code, output) {

    let nasm = `
        section .text
            global _start

            _start:
                ${SMain}
        section .data
            ${SData}
    `

    writeFileSync(output+".s", " ");
    writeFileSync(output+".s", nasm);
}