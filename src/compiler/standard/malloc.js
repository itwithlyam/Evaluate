export default function malloc(args) {
    return [{type: "bss", bytes: args[1], id: args[0], mode: "resb", os: ['win', 'mac', 'linux']}]
}