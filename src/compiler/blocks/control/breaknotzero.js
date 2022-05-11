export default {
	name: "breaknotzero",
	description: "breaks out of a block if op1 is not zero",
	execute(args) {
		return [{commands:`mov eax,[${args[0]}]\ncmp eax,"0"\njnz StrEnd\n`, os: ['win','linux','mac'], type: "text"}]
	}
}