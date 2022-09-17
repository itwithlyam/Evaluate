const SplitRegex = /\s|([0-9]+)|(\+)|(\-)|(\*)|(\/)|(\n)|(\()|(\))|(\")/gi
let program = `print(13461+128356 /876*num)
print("yes")`

let tokens = []
let string = false
let currentString = ""

program.split("\n").forEach(line => {
    tokens.push({ type: "nln" })

    line = line.split(SplitRegex)

    line = line.filter(element => {
        if (!element) return false
        return true
    })

    line.forEach(token => {
        if (string && token !== '"') {
            if (currentString) currentString += " "
            currentString += token
        }
        else if (parseInt(token)) {
            tokens.push({ type: "int", content: token })
        } else {
            switch(token) {
                case '"':
                    if (string) tokens.push({ type: "str", content: currentString })
                    else currentString = ""
                    string = !string
                    break
                case "+": 
                    tokens.push({ type: "add", content: token })
                    break
                case "-": 
                    tokens.push({ type: "min", content: token })
                    break
                case "*": 
                    tokens.push({ type: "mul", content: token })
                    break
                case "/": 
                    tokens.push({ type: "div", content: token })
                    break
                case "(": 
                    tokens.push({ type: "bop", content: token })
                    break    
                case ")": 
                    tokens.push({ type: "bcl", content: token })
                    break  
                default: 
                    tokens.push({ type: "val", content: token })
                    break      
            }
        }
    })

})

tokens.push({ type: "eof" })

console.log(tokens)
