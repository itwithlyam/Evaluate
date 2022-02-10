import {Ident, Classify, negatives} from './util.js'

export function Lexer(script) {
	/*console.log(script)
	console.log("END SCRIPT")*/
  let program = script.split('\n')
	let idents = []
	idents.push({'char': '<EOF>', 'ident': Ident.EOF, 'classify': Classify.SYSTEM})
	program.forEach((line) => {
		idents.push({char: null, ident: Ident.NEWLINE, classify: Classify.SYSTEM})
    	let chars = line.split(negatives)
			chars.forEach((char) => {
			if (parseInt(char) || char === 0 && char != "") {
				const payload = {'char': char, 'ident': Ident.NUMBER, 'classify': Classify.CHAR}
				return idents.push(payload)
			}
			if (!char) return;
			switch(char) {
				case '~':
					idents.push({char: char, ident: Ident.ROUND, classify: Classify.OPERATION})
					break;
				case '<<':
					idents.push({char: char, ident: Ident.LEFTSHIFT, classify: Classify.OPERATION})
					break;
				case '>>':
					idents.push({char: char, ident: Ident.RIGHTSHIFT, classify: Classify.OPERATION})
					break;
				case '**':
					idents.push({char: char, ident: Ident.POWER, classify: Classify.OPERATION})
					break;
				case '¬':
					idents.push({char: char, ident: Ident.SQRT, classify: Classify.OPERATION})
					break;
				case "%":
					idents.push({char: char, ident: Ident.MODULO, classify: Classify.OPERATION})
					break;
				case "true":
					idents.push({char: char, ident: Ident.TRUE, classify: Classify.BOOLEAN})
					break;
				case "false":
					idents.push({char: char, ident: Ident.FALSE, classify: Classify.BOOLEAN})
					break;
				case "pass":
					idents.push({char: char, ident: Ident.PASS, classify: Classify.FUNCTION})
					break;
				case "function":
					idents.push({char: char, ident: Ident.INITFUNC, classify: Classify.FUNCTION})
					break;
				case "call":
					idents.push({char: char, ident: Ident.FUNCCALL, classify: Classify.FUNCTION})
					break;
				case '"':
					idents.push({char: char, ident: Ident.STRING, classify: Classify.CHAR})
					break;
				case ' ':
					return;
				case '(':
					return idents.push({'char': '(', 'ident': Ident.LBRACKET, 'classify': Classify.BRACKET})
				case ')':
					return idents.push({'char': ')', 'ident': Ident.RBRACKET, 'classify': Classify.BRACKET})
				case '{':
					return idents.push({'char': '{', 'ident': Ident.LCBRACKET, 'classify': Classify.CBRACKET})
				case '}':
					return idents.push({'char': '}', 'ident': Ident.RCBRACKET, 'classify': Classify.CBRACKET})
				case '[':
					return idents.push({'char': '[', 'ident': Ident.LSBRACKET, 'classify': Classify.SBRACKET})
				case ']':
					return idents.push({'char': ']', 'ident': Ident.RSBRACKET, 'classify': Classify.SBRACKET})
				case '+':
					const payload1 = {'char': char, 'ident': Ident.PLUS, 'classify': Classify.OPERATION}
					return idents.push(payload1)
					break;
				case '-':
					const payload3 = {'char': char, 'ident': Ident.MINUS, 'classify': Classify.OPERATION}
					return idents.push(payload3)
					break;
				case '*':
					const payload4 = {'char': char, 'ident': Ident.TIMES, 'classify': Classify.OPERATION}
					return idents.push(payload4)
					break;
				case '/':
					const payload5 = {'char': char, 'ident': Ident.DIVIDE, 'classify': Classify.OPERATION}
					return idents.push(payload5)
					break;
				case '{':
					const payload6 = {'char': char, 'ident': Ident.LCBRACKET, 'classify': Classify.CBRACKET}
					return idents.push(payload6)
					break;
				case '}':
					const payload7 = {'char': char, 'ident': Ident.RCBRACKET, 'classify': Classify.CBRACKET}
					return idents.push(payload7)
					break;
				case 'mset':
					const payload9 = {'char': char, 'ident': Ident.MEMSET, 'classify': Classify.MEMORY}
					return idents.push(payload9)
					break;
				case 'mclear':
					const payload10 = {'char': char, 'ident': Ident.MEMCLR, 'classify': Classify.MEMORY}
					return idents.push(payload10)
					break;
				default:
					const readmem = {'char': char, 'ident': Ident.TERM, 'classify': Classify.CHAR}
					return idents.push(readmem)
					break;
			}
		})
  })
	idents.push({'char': '<EOF>', 'ident': Ident.EOF, 'classify': Classify.SYSTEM})
	return idents
}
