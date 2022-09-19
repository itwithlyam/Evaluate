export default function preparser(tokens) {
    let exprs = []

    tokens.forEach(line => {
        let index = 0
        let num = false
        let statement = {}
        let high = 0
        let low = 2**64

        let obracket = false
        let cbracket = false
        let val = false

        let numexpr = []
        let valexpr = []
        let obexpr = []
        let cbexpr = []

        for (; index < line.length; index++) {
            if (["add", "mul", "sub", "div", "int", "str"].includes(line[index].type)) {
                num = true
                if (index<low) low = index
                if (index>high) high = index
                break
            }
        } 

        if (num) {
            if (["add", "mul", "sub", "div"].includes(line[index + 1].type)) {
                do {
                    line[index].expr = true
                    numexpr.push(line[index])
                    index++
                } while (!["bcl"].includes(line[index].type))
            } else numexpr.push(line[index])
            if (index<low) low = index
            if (index>high) high = index
        }

        for (index=0; index < line.length; index++) {
            if (["val"].includes(line[index].type) && !line[index].expr) {
                val = true
                if (index<low) low = index
                if (index>high) high = index
                break
            }
        }

        if (val) {
            valexpr.push(line[index])
        }

        for (index=0; index < line.length; index++) {
            if (["bop"].includes(line[index].type) && !line[index].expr) {
                obracket = true
                if (index<low) low = index
                if (index>high) high = index
                break
            }
        }

        if (obracket) {
            if (!line[index].expr) obexpr.push(line[index])
            line[index].expr = true
        }

        for (index=0; index < line.length; index++) {
            if (["bcl"].includes(line[index].type) && !line[index].expr) {
                cbracket = true
                if (index<low) low = index
                if (index>high) high = index
                break
            }
        }

        if (cbracket) {
            if (!line[index].expr) cbexpr.push(line[index])
            line[index].expr = true
        }

        statement.raw = line
        statement.expr = []
        // for (index=0; index<low; index++) {
        //     console.log(index)
        //     statement.expr[0].push(line[index])
        // }

        if (valexpr) statement.expr.push(valexpr)
        if (obexpr) statement.expr.push(obexpr)
        if (numexpr) statement.expr.push(numexpr)
        if (cbexpr) statement.expr.push(cbexpr)


        // statement.expr[statement.expr.length] = []
        // for (index=high; index<line.length; index++) {
        //     statement.expr[statement.expr.length-1].push(line[index])
        // }

        valexpr = []
        numexpr = []
        cbexpr = []
        obexpr = []

        exprs.push(statement)
    })

    return exprs
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
    [
      { type: 'val', content: 'print' },
      { type: 'bop', content: '(' },
      { type: 'str', content: 'yes' },
      { type: 'bcl', content: ')' }
    ],
  ])[0].expr)