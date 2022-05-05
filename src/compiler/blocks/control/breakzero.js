export default {
	name: "breakzero",
	description: "breaks out of a block if op1 is zero",
	execute(args) {
		return [{type: "text", os: ['win','mac','linux'], commands: `mov eax,[${args[0]}]\nadd eax,48\ntest eax,"0"\nje StrEnd\n`}]
	}
}