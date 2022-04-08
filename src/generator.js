import {writeFileSync} from 'fs';
import os from 'os'

export default function Generator(code, output) {

    // stext = section .text (code)
    // sdata = section .data (variables)
    // sbss = section .bss (undefined variables)
    // labels = values within stext (i.e. varname: db "varcontent",10,0)

    // l- = linux
    // m- = macos
    // w- = windows

    // Preprocessor

    let lstext = []
    let lsdata = []
    let llabels = []
    let lsbss = []
    let mstext = []
    let msdata = []
    let mlabels = []
    let msbss = []
    let wstext = []
    let wsdata = []
    let wlabels = []
    let wsbss = []

    code.forEach(sector => {
        sector.forEach(section => {
            // Universal
            if (section.type === "text") {
                lstext.push(section.commands + "\n")
                wstext.push(section.commands + "\n")
                mstext.push(section.commands + "\n")
            }
            if (section.type === "data") {
                lsdata.push(section.commands + "\n")
                wsdata.push(section.commands + "\n")
                msdata.push(section.commands + "\n")
            }
            if (section.type === "label") {
                llabels.push(`${section.label}: ${section.commands}`)
                wlabels.push(`${section.label}: ${section.commands}`)
                mlabels.push(`${section.label}: ${section.commands}`)
            }
            if (section.type === "bss") {
                lsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
                wsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
                msbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            }

            // Linux
            if (section.type === "ltext") {
                lstext.push(section.commands + "\n")
            }
            if (section.type === "ldata") {
                lsdata.push(section.commands + "\n")
            }
            if (section.type === "lbss") {
                lsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            }
            if (section.type === "llabels") {
                llabels.push(`${section.label}: ${section.commands}`)
            }

            // Windows
            if (section.type === "wtext") {
                wstext.push(section.commands + "\n")
            }
            if (section.type === "wdata") {
                wsdata.push(section.commands + "\n")
            }
            if (section.type === "wbss") {
                wsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            }
            if (section.type === "wlabels") {
                wlabels.push(`${section.label}: ${section.commands}`)
            }

            // MacOS
            if (section.type === "mtext") {
                mstext.push(section.commands + "\n")
            }
            if (section.type === "mdata") {
                msdata.push(section.commands + "\n")
            }
            if (section.type === "mbss") {
                msbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            }
            if (section.type === "mlabels") {
                mlabels.push(`${section.label}: ${section.commands}`)
            }
        })
    })

    console.log(code)

    if (lsdata[0]) lsdata.unshift("section .data")
    if (lsbss[0]) lsbss.unshift("section .bss")
    if (wsdata[0]) wsdata.unshift("section .data")
    if (wsbss[0]) wsbss.unshift("section .bss")
    if (msdata[0]) msdata.unshift("section .data")
    if (msbss[0]) msbss.unshift("section .bss")

    // Generator

    let lnasm = `
        BITS 64

        section .text

            ${llabels.join("\n")}

            main:
                ${lstext.join("\n")}

                jmp end

            end:
                mov eax,1
                int 0x80

        ${lsdata.join('\n')}

        ${lsbss.join('\n')}
    `

    let mnasm = `
        BITS 64

        section .text
            ${mlabels.join("\n")}

            start:
                ${mstext.join("\n")}

                jmp end

            end:
                mov eax,1
                int 0x80

        ${msdata.join('\n')}

        ${msbss.join('\n')}
    `

    let wnasm = `
        BITS 64

        section .text
            global _WinMain@16

            ${wlabels.join("\n")}

            _WinMain@16:
                ${wstext.join("\n")}

                jmp end

            end:
                mov eax,1
                int 0x80

        ${wsdata.join('\n')}

        ${wsbss.join('\n')}
    `
    // Output

    switch(os.type()) {
        case "Windows_NT":
            writeFileSync(output + ".s", wnasm)
            break;
        case "Darwin":
            writeFileSync(output + ".s", mnasm)
            break;
        case "Linux":
            writeFileSync(output + ".s", lnasm)
            break;
        default:
            console.log("Unknown OS, defaulting to Linux")
            writeFileSync(output + ".s", lnasm)
            break;
    }

}