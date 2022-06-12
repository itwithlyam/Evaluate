export default {
  name: "declare",
  description: "declares memory",
  execute(annotation, id, value) { 
    switch (annotation) {
      case "char":
        return [
          {
            type: "bss",
            id: id,
            mode: "resb",
            bytes: 1,
            os: ["mac", "win", "linux"],
          },
          {
            type: "label",
            label: id+"len",
            commands: "equ 1",
            os: ['mac','win','linux']
          },
          {
            type: "text",
            commands: `mov edx, "${value}"\nmov [${id}], edx`,
            os: ["mac", "win", "linux"],
            requires: "ascii"
          },
        ];
      case "int8":
        return [
          {
            type: "bss",
            id: id,
            mode: "resb",
            bytes: 1,
            os: ["mac", "win", "linux"],
          },
          {
            type: "label",
            label: id+"len",
            commands: "equ " + (""+value).length,
            os: ['mac','win','linux'],
            requires: "ascii"
          },
          {
            type: "text",
            commands: `mov dh, ${value}\nmov [${id}], dh`,
            os: ["mac", "win", "linux"],
          },
        ];
      case "int16":
        return [
          {
            type: "bss",
            id: id,
            mode: "resb",
            bytes: 2,
            os: ["mac", "win", "linux"],
          },
          {
            type: "label",
            label: id+"len",
            commands: "equ " + value.length,
            os: ['mac','win','linux'],
            requires: "ascii"
          },
          {
            type: "text",
            commands: `mov dx, ${value}\nmov [${id}], dx`,
            os: ["mac", "win", "linux"],
          },
        ];
      case "int32":
        return [
          {
            type: "bss",
            id: id,
            mode: "resb",
            bytes: 4,
            os: ["mac", "win", "linux"],
          },
          {
            type: "label",
            label: id+"len",
            commands: "equ " + value.length,
            os: ['mac','win','linux'],
            requires: "ascii"
          },
          {
            type: "text",
            commands: `mov edx, ${value}\nmov [${id}], edx`,
            os: ["mac", "win", "linux"],
          },
        ];
      case "int64":
        return [
          {
            type: "bss",
            id: id,
            mode: "resb",
            bytes: 8,
            os: ["mac", "win", "linux"],
          },
          {
            type: "label",
            label: id+"len",
            commands: "equ " + value.length,
            os: ['mac','win','linux'],
            requires: "ascii"
          },
          {
            type: "text",
            commands: `mov rdx, ${value}\nmov [${id}], rdx`,
            os: ["mac", "win", "linux"],
          },
        ];
      case "string":
        // Null termination be like
        return [
          {
            type: "bss",
            id: id,
            mode: "resb",
            bytes: value.length,
            os: ["mac", "win", "linux"],
          },
          {
            type: "label",
            label: id+"label",
            commands: `
                db "${value}",0
            `,
            os: ["mac", "win", "linux"],
          },
          {
            type: "label",
            label: id+"len",
            commands: "equ " + value.length,
            os: ['mac','win','linux'],
            requires: "ascii"
          },
          {
              type: "text",
              commands: `
                mov ebx, ${id}label\n
                mov ecx, 0\n
                call ${id}loop\n
              `,
              os: ['win', 'macos', 'linux']
          },
          {
              type: "label",
              label: id+"loop",
              commands: `
                mov al, [ebx]\n
                or al,al\n
                jz StrEnd\n

                cmp al,0\n
                je StrEnd\n

                add [${id}+ecx], al\n

                inc ebx\n
                inc ecx\n
                jmp ${id}loop\n
              `,
              os: ['win', 'linux', 'macos']
          },
        ];
    }
  },
};
