export default {
	name: "breakzero",
	description: "breaks out of a block if op1 is zero",
	execute(args) {
		console.log(args)
		return [{type: "text", os: ['win','mac','linux'], commands: `mov eax,0\ncmp [${args[0]}],eax\njz StrEnd\n`}]
	}
}