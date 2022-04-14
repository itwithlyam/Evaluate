export default {
    name: "AND",
    description: "AND Boolean gate",
    execute(args) {
        return [
            {
                type: "text",
                commands: `mov al,${args[0]}\nmov bl,${args[1]}\nand al,bl`,
                os: ["mac", "win", "linux"],
            },
            {
                type: "text",
                commands: `mov eax,4\nmov ebx,1\nmov ecx,al\nmov edx,1\nint 0x80\n`,
                os: ["win", "linux"],
            },
            {
                type: "text",
                commands: `mov eax,0x20000004\nmov ebx,0x20000001\nmov ecx,al\nmov edx,1\nint 0x80\n`,
                os: ["mac"]
            }
        ]
    }
}