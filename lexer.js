const IDENT = {
	NUMBER: 0,
	NEWLINE: 1,
	PLUS: 2,
	MINUS: 3,
	DIVIDE: 4,
	TIMES: 5,
	EOF: 6,
	LCBRACKET: 7,
	RCBRACKET: 8,
	ALGEBRA: 9,
	MEMSET: 10,
	TERM: 11,
	MEMCLR: 12,
	EQUALS: 13,
	LBRACKET: 14,
	RBRACKET: 15,
	LSBRACKET: 16,
	RSBRACKET: 17,
	STRING: 18,
	INITFUNC: 19
}

const Classify = {
	CHAR: 0,
	OPERATION: 1,
	SYSTEM: 2,
	CBRACKET: 3,
	SETTING: 4,
	MEMORY: 5,
	BRACKET: 6,
	SBRACKET: 7,
	FUNCTION: 8
}

const negatives = /\s|(\{)|(\})|(\+)|(\-)|(\/)|(\*)|(\;)|(\()|(\))|(\[)|(\])|(\")/gi

export default function Lexer(script) {
  let program = script.split('\n')
	let idents = []
	idents.push({'char': '<EOF>', 'ident': IDENT.EOF, 'classify': Classify.SYSTEM})
	program.forEach((line) => {
    	let chars = line.split(negatives)
		//let chars = line.split(' ')
		chars.forEach((char) => {
			if (parseInt(char) || char === 0 && char != "") {
				const payload = {'char': char, 'ident': IDENT.NUMBER, 'classify': Classify.CHAR}
				return idents.push(payload)
			}
			if (!char) return;
			switch(char) {
				case "function":
					idents.push({char: char, ident: IDENT.INITFUNC, classify: Classify.FUNCTION})
					break;
				case '"':
					idents.push({char: char, ident: IDENT.STRING, classify: Classify.CHAR})
					break;
				case ' ':
					return;
				case '(':
					return idents.push({'char': '(', 'ident': IDENT.LBRACKET, 'classify': Classify.BRACKET})
				case ')':
					return idents.push({'char': ')', 'ident': IDENT.RBRACKET, 'classify': Classify.BRACKET})
				case '{':
					return idents.push({'char': '{', 'ident': IDENT.LCBRACKET, 'classify': Classify.CBRACKET})
				case '}':
					return idents.push({'char': '}', 'ident': IDENT.RCBRACKET, 'classify': Classify.CBRACKET})
				case '[':
					return idents.push({'char': '[', 'ident': IDENT.LSBRACKET, 'classify': Classify.SBRACKET})
				case ']':
					return idents.push({'char': ']', 'ident': IDENT.RSBRACKET, 'classify': Classify.SBRACKET})
				case '+':
					const payload1 = {'char': char, 'ident': IDENT.PLUS, 'classify': Classify.OPERATION}
					return idents.push(payload1)
					break;
				case ';':
					const payload2 = {'char': char, 'ident': IDENT.NEWLINE, 'classify': Classify.SYSTEM}
					return idents.push(payload2)
					break;
				case '-':
					const payload3 = {'char': char, 'ident': IDENT.MINUS, 'classify': Classify.OPERATION}
					return idents.push(payload3)
					break;
				case '*':
					const payload4 = {'char': char, 'ident': IDENT.TIMES, 'classify': Classify.OPERATION}
					return idents.push(payload4)
					break;
				case '/':
					const payload5 = {'char': char, 'ident': IDENT.DIVIDE, 'classify': Classify.OPERATION}
					return idents.push(payload5)
					break;
				case '{':
					const payload6 = {'char': char, 'ident': IDENT.LCBRACKET, 'classify': Classify.CBRACKET}
					return idents.push(payload6)
					break;
				case '}':
					const payload7 = {'char': char, 'ident': IDENT.RCBRACKET, 'classify': Classify.CBRACKET}
					return idents.push(payload7)
					break;
				case 'mset':
					const payload9 = {'char': char, 'ident': IDENT.MEMSET, 'classify': Classify.MEMORY}
					return idents.push(payload9)
					break;
				case 'mclear':
					const payload10 = {'char': char, 'ident': IDENT.MEMCLR, 'classify': Classify.MEMORY}
					return idents.push(payload10)
					break;
				default:
					const readmem = {'char': char, 'ident': IDENT.TERM, 'classify': Classify.CHAR}
					return idents.push(readmem)
					break;
			}
		})
  })
	idents.push({'char': '<EOF>', 'ident': IDENT.EOF, 'classify': Classify.SYSTEM})
	return idents
}
