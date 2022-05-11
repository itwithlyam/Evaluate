export default {
	name: "breakzero",
	description: "breaks out of a block if op1 is zero",
	execute(args) {
		return `mov eax,[${args[0]}]\nadd eax,48\ntest eax,"0"\nje StrEnd\n`
	}
}