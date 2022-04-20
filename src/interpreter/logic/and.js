export default {
    name: "AND",
    description: "AND Boolean gate",
    execute(args) {
        return [
					{
						type: "bss",
						id: "a",
						mode: "resb",
						bytes: 1,
						os: ["mac", "win", "linux"]
					},
            {
                type: "text",
                commands: `mov eax,${args[0]}\nmov [a],eax\nand a,${args[1]}`,
                os: ["mac", "win", "linux"],
            },
            {
                type: "text",
                commands: `mov eax,4\nmov ebx,1\nmov ecx,a\nmov edx,1\nint 0x80\n`,
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