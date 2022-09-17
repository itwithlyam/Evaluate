export default {
	name: "break",
	description: "breaks out of a block",
	execute() {
		return [{type: "text", os: ['win','linux','mac'], commands: "jmp StrEnd"}]
	}
}