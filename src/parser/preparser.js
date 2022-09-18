export default function preparser(tokens) {
    let exprs = []
    let expr = []

    tokens.forEach(line => {
        let index = 0
        let num = false
        let bracket = false

        for (; index < line.length; index++) {
            if (line[index].type == "int") {
                num = true
                break
            }
        } 

        if (num) {
            console.log("int")
            if (["add" || "mul" || "sub" || "div"].includes(line[index + 1].type)) {
                console.log("operation")
                console.log(line[index])
                while (["add" || "mul" || "sub" || "div" || "int"].includes(line[index].type)) {
                    console.log("in operation")
                    expr.push(line[index].content)
                    index++
                }
            } else expr.push(line[index].content)
        }

        for (index=0; index<line.length; index++) {
            if (line[index].type == "bop") {
                bracket = true
                break
            } 
        }


    })

    return expr
}

console.log(preparser([
    [
      { type: 'val', content: 'print' },
      { type: 'bop', content: '(' },
      { type: 'int', content: '13461' },
      { type: 'add', content: '+' },
      { type: 'int', content: '128356' },
      { type: 'div', content: '/' },
      { type: 'int', content: '876' },
      { type: 'mul', content: '*' },
      { type: 'val', content: 'num' },
      { type: 'bcl', content: ')' }
    ],
  ]))