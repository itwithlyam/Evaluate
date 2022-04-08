export default {
    name: "declare",
    description: "declares memory",
    execute(annotation, id, value) {
        switch (annotation) {
            case "string":
                return [{type: "bss", id: id, mode: "db", bytes: value.length || 1}, {type: "text", commands: `mov edx, "${value}"\nmov [${id}], edx`}];
            case "int":
                return [{type: "bss", id: id, mode: "db", bytes: value.length || 1}, {type: "text", commands: `mov edx, ${value}\nmov [${id}], edx`}]
        }
    }
}