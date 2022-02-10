export default {
	name: "mset",
	description: "set memory",
	execute(id, value, memory) {
		memory[id] = value
		return memory
	}
}