import {writeFileSync} from 'fs';

export default function Generator(AST, code, output) {
    let generation = ""
    let c = `
        #include <stdio.h>

        int main() {
            ${generation}
        }
    `
    writeFileSync()
}