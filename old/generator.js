import {writeFileSync, readFileSync} from 'fs';
import os from 'os'
import elfgen from './elf/generator.js'

export default function Generator(code, output, type) {

    if (type === "elf32") return elfgen(code, output)

    // stext = section .text (code)
    // sdata = section .data (variables)
    // sbss = section .bss (reserves)
    // labels = values within stext (i.e. varname: db "varcontent",10,0)

		// Declarations ALWAYS go as BSS reserves

    // l- = linux
    // m- = macos
    // w- = windows

    // Preprocessor
		let requires = []

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

    code.forEach(section => {
        //sector.forEach(section => {
            if (!section.os) return
			if (section.requires) requires.push(section.requires)
            if (section.os.includes('mac')) {
                if (section.type === "text") {
                    mstext.push(section.commands + "\n")
                }
                if (section.type === "data") {
                    msdata.push(section.commands + "\n")
                }
                if (section.type === "bss") {
                    msbss.push(`${section.id} ${section.mode} ${section.bytes}`)
                }
                if (section.type === "label") {
                    mlabels.push(`${section.label}: ${section.commands}`)
                }
            }
            if (section.os.includes('win')) {
                if (section.type === "text") {
                    wstext.push(section.commands + "\n")
                }
                if (section.type === "data") {
                    wsdata.push(section.commands + "\n")
                }
                if (section.type === "bss") {
                    wsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
                }
                if (section.type === "label") {
                    wlabels.push(`${section.label}: ${section.commands}`)
                }
            }
            if (section.os.includes('linux')) {
                if (section.type === "text") {
                    lstext.push(section.commands + "\n")
                }
                if (section.type === "data") {
                    lsdata.push(section.commands + "\n")
                }
                if (section.type === "bss") {
                    lsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
                }
                if (section.type === "label") {
                    llabels.push(`${section.label}: ${section.commands}`)
                }
            }
            // Universal
            // if (section.type === "text") {
            //     lstext.push(section.commands + "\n")
            //     wstext.push(section.commands + "\n")
            //     mstext.push(section.commands + "\n")
            // }
            // if (section.type === "data") {
            //     lsdata.push(section.commands + "\n")
            //     wsdata.push(section.commands + "\n")
            //     msdata.push(section.commands + "\n")
            // }
            // if (section.type === "label") {
            //     llabels.push(`${section.label}: ${section.commands}`)
            //     wlabels.push(`${section.label}: ${section.commands}`)
            //     mlabels.push(`${section.label}: ${section.commands}`)
            // }
            // if (section.type === "bss") {
            //     lsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            //     wsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            //     msbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            // }

            // // Linux
            // if (section.type === "ltext") {
            //     lstext.push(section.commands + "\n")
            // }
            // if (section.type === "ldata") {
            //     lsdata.push(section.commands + "\n")
            // }
            // if (section.type === "lbss") {
            //     lsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            // }
            // if (section.type === "llabels") {
            //     llabels.push(`${section.label}: ${section.commands}`)
            // }

            // // Windows
            // if (section.type === "wtext") {
            //     wstext.push(section.commands + "\n")
            // }
            // if (section.type === "wdata") {
            //     wsdata.push(section.commands + "\n")
            // }
            // if (section.type === "wbss") {
            //     wsbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            // }
            // if (section.type === "wlabels") {
            //     wlabels.push(`${section.label}: ${section.commands}`)
            // }

            // // MacOS
            // if (section.type === "mtext") {
            //     mstext.push(section.commands + "\n")
            // }
            // if (section.type === "mdata") {
            //     msdata.push(section.commands + "\n")
            // }
            // if (section.type === "mbss") {
            //     msbss.push(`${section.id} ${section.mode} ${section.bytes}`)
            // }
            // if (section.type === "mlabels") {
            //     mlabels.push(`${section.label}: ${section.commands}`)
            // }
        //})
    })

		// Check if program needs any special features
		let imp = ""
	
		if (requires.includes("ascii")) {
			imp = readFileSync('src/preprocessor/ascii/bss.asm')
			lsbss.unshift(imp)
			wsbss.unshift(imp)
			msbss.unshift(imp)
			imp = readFileSync('src/preprocessor/ascii/labels.asm')
			llabels.unshift(imp)
			wlabels.unshift(imp)
			mlabels.unshift(imp)
		}

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

            global _start


            ${llabels.join("\n")}

            StrEnd: ret

            _start:
                ${lstext.join("\n")}

                jmp end

            end:
                mov eax,1
mov ebx,0
                int 0x80

        ${lsdata.join('\n')}

        ${lsbss.join('\n')}
    `

    let mnasm = `
        BITS 64

        section .text

            ${mlabels.join("\n")}

            StrEnd: ret

            start:
                ${mstext.join("\n")}

                jmp end

            end:
                mov eax,0x20000001
								mov ebx,0
                int 0x80

        ${msdata.join('\n')}

        ${msbss.join('\n')}
    `

    let wnasm = `
        BITS 64

        section .text
            global _WinMain@16

            ${wlabels.join("\n")}

            StrEnd: ret

            _WinMain@16:
                ${wstext.join("\n")}

                jmp end

            end:
                mov eax,1
mov ebx,0
                int 0x80

        ${wsdata.join('\n')}

        ${wsbss.join('\n')}
    `
    // Output
    switch(os.type()) {
        case "Windows_NT":
            writeFileSync(output + ".asm", wnasm)
            break;
        case "Darwin":
            writeFileSync(output + ".asm", mnasm)
            break;
        case "Linux":
            writeFileSync(output + ".asm", lnasm)
            break;
        default:
            console.log("Unknown OS, defaulting to Linux")
            writeFileSync(output + ".asm", lnasm)
            break;
    }

}