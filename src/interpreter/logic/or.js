export default {
    name: "OR",
    description: "OR Boolean gate",
    execute(args) {
				return args[0] | args[1]
    }
}