export default {
    name: "NOT",
    description: "NOT Boolean gate",
    execute(args) {
				return !args[1]
    }
}