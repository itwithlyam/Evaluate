import {writeFileSync} from 'fs';

export default function Generator(AST, code, output) {
    let c = `
        #include <cstdio>

        int main() {
            ${code.join('\n')}
        }
    `

    writeFileSync(output+".cpp", " ");
    writeFileSync(output+".cpp", c);
}