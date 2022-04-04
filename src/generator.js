import {writeFileSync} from 'fs';

export default function Generator(AST, code, output) {
    let c = `
        #include <stdio.h>

        int main() {
            ${code.join('\n')}
        }
    `

    writeFileSync(output+".c", " ");
    writeFileSync(output+".c", c);
}