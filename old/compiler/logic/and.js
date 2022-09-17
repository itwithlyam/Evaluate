export default {
    name: "AND",
    description: "AND Boolean gate",
    execute(args) {
				return args[0] & args[1]
    }
}