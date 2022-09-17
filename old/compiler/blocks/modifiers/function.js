export default {
    name: "function",
    description: "Function block modifier",
    execute(name, anss, ans) {
        ans.push({
            type: "label",
            label: name,
            commands: anss.join('\n'),
            os: ['win','linux','mac']
        })

        return ans
    }
}