export default {
    name: "declare",
    description: "declares memory",
    execute(annotation, id, value) {
        switch (annotation) {
            case "char":
                return [{type: "bss", id: id, mode: "resb", bytes: 1, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov edx, "${value}"\nmov [${id}], edx`, os: ['mac', 'win', 'linux']}]
            case "int8":
                return [{type: "bss", id: id, mode: "resb", bytes: 1, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov dh, ${value}\nmov [${id}], dh`, os: ['mac', 'win', 'linux']}]
            case "int16":
                return [{type: "bss", id: id, mode: "resb", bytes: 2, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov dx, ${value}\nmov [${id}], dx`, os: ['mac', 'win', 'linux']}]
            case "int32":
                return [{type: "bss", id: id, mode: "resb", bytes: 4, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov edx, ${value}\nmov [${id}], edx`, os: ['mac', 'win', 'linux']}]
            case "int64":
                return [{type: "bss", id: id, mode: "resb", bytes: 8, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov rdx, ${value}\nmov [${id}], rdx`, os: ['mac', 'win', 'linux']}]
            case "string":
                return [{type: "bss", id: id, mode: "resb", bytes: 1, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov edx, "${value}"\nmov [${id}], edx`, os: ['mac', 'win', 'linux']}]
    
            }
    }
}