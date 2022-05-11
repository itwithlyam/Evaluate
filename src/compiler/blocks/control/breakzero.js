export default {
	name: "breakzero",
	description: "breaks out of a block if op1 is zero",
	execute(args) {
		return [{commands:`mov eax,[${args[0]}]\ncmp eax,"0"\njz StrEnd\n`, os: ['win','linux','mac'], type: "text"}]
	}
}