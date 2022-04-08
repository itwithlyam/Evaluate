export default {
    name: "declare",
    description: "declares memory",
    execute(annotation, id, value) {
        switch (annotation) {
            case "string":
                return [{type: "bss", id: id, mode: "resb", bytes: value.length || 1, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov r12, "${value}"\nmov [${id}], r12`, os: ['mac', 'win', 'linux']}]
            case "int":
                return [{type: "bss", id: id, mode: "resb", bytes: value.length || 1, os: ['mac', 'win', 'linux']}, {type: "text", commands: `mov r12, ${value}\nmov [${id}], r12`, os: ['mac', 'win', 'linux']}]
        }
    }
}