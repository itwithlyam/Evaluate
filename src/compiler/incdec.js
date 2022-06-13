export default {
    name: "IncrementDecrement",
    description: "Increments and Decrements",
    execute(id, incdec, output) {
        if (output === "elf32") {
            if (incdec) {
                return [{hex: "83"}]
            }
        } else {
            if (incdec) {
                return [{os: ['win', 'mac', 'linux'], commands: `mov eax,[${id}]\nadd eax,1\nmov [${id}],eax\n`, type: "text"}]
            }
            return [{os: ['win', 'mac', 'linux'], commands: `mov eax,[${id}]\nsub eax,1\nmov [${id}],eax\n`, type: "text"}]
        }  
    }
}