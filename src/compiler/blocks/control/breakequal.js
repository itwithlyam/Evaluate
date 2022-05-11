export default {
	name: "breakequal",
	description: "breaks out of a block if op1 and op2 are equal",
	execute(args) {
		return [{commands:`mov eax,[${args[0]}]\nmov ebx,[${args[1]}]\ncmp eax,ebx\nje StrEnd\n`, os: ['win','linux','mac'], type: "text"}]
	}
}