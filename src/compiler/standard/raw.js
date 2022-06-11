export default function raw(args) {
    return [{type: "text", os: ['win', 'mac', 'linux'], commands: args[0], hex: args[0]}]
}