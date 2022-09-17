export default {
	name: "breaknotequal",
	description: "breaks out of a block if op1 and op2 are not equal",
	execute(args) {
		return [{commands:`mov eax,[${args[0]}]\nmov ebx,[${args[1]}]\ncmp eax,ebx\njne StrEnd\n`, os: ['win','linux','mac'], type: "text"}]
	}
}