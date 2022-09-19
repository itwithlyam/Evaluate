const SplitRegex = /\s|([0-9]+)|(\+)|(\-)|(\*)|(\/)|(\n)|(\()|(\))|(\")/gi
let program = `print(13461+128356 /876*num)
print("yes")`

let tokens = []
let string = false
let currentString = ""

export default function lexer() {
    program.split("\n").forEach(line => {
        line = line.split(SplitRegex)

        line = line.filter(element => {
            if (!element) return false
            return true
        })

        let tokenLine = []

        line.forEach(token => {
            if (string && token !== '"') {
                if (currentString) currentString += " "
                currentString += token
            }
            else if (parseInt(token)) {
                tokenLine.push({ type: "int", content: token })
            } else {
                switch(token) {
                    case '"':
                        if (string) tokenLine.push({ type: "str", content: currentString })
                        else currentString = ""
                        string = !string
                        break
                    case "+": 
                        tokenLine.push({ type: "add", content: token })
                        break
                    case "-": 
                        tokenLine.push({ type: "min", content: token })
                        break
                    case "*": 
                        tokenLine.push({ type: "mul", content: token })
                        break
                    case "/": 
                        tokenLine.push({ type: "div", content: token })
                        break
                    case "(": 
                        tokenLine.push({ type: "bop", content: token })
                        break    
                    case ")": 
                        tokenLine.push({ type: "bcl", content: token })
                        break  
                    default: 
                        tokenLine.push({ type: "val", content: token })
                        break      
                }
            }
        })

        tokens.push(tokenLine)

    })

    tokens.push({ type: "eof" })

    return tokens
}

console.log(lexer())
