export default {
    name: "function",
    description: "Function block modifier",
    execute(block, name) {
        let cmds = []
        return [
            {
                type: "label",
                label: name,
                commands: block.join('\n')
            }
        ]
    }
}