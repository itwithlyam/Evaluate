import consola from "consola"

export default {
	name: "mset",
	description: "set memory (DEPRECATED)",
	execute(id, value, memory) {
		consola.info("Deprecation Warning: mset is deprecated and will be removed in the next update.")
		memory[id] = value
		return memory
	}
}