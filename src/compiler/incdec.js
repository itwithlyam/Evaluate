export default {
    name: "IncrementDecrement",
    description: "Increments and Decrements",
    execute(id, incdec) {
        if (incdec) {
            return [{os: ['win', 'mac', 'linux'], commands: `mov eax,[${id}]\nadd eax,"1"\nmov [${id}],eax\n`, type: "text"}]
        }
        return [{os: ['win', 'mac', 'linux'], commands: `mov eax,[${id}]\nsub eax,"1"\nmov [${id}],eax\n`, type: "text"}]
    }
}