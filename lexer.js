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
	EQUALS: 13
}

const Classify = {
	CHAR: 0,
	OPERATION: 1,
	SYSTEM: 2,
	CBRACKET: 3,
	SETTING: 4,
	MEMORY: 5
}

function Lexer(script) {
  let program = script.split('\n')
	let idents = []
	let lastnum = false;
	let lastwd = false;
	let store = ""
	let current = 0
	let recentnum = {'char': parseFloat(char), 'ident': IDENT.NUMBER, 'classify': Classify.CHAR}
	let wordbuffer = ['{', '}', ';', ' ']
	idents.push({'char': '<EOF>', 'ident': IDENT.EOF, 'classify': Classify.SYSTEM})
	program.forEach((line) => {
    let chars = line.split('')
		chars.forEach((char) => {
			current += 1
			if (parseInt(char) || char == 0 || char == '.') {
				if (!lastnum) {
					lastnum = true

				}
				if (char !== ".") {
					idents[idents.length - 1].char += char
					return idents[idents.length - 1].char = parseFloat(idents[idents.length - 1].char)
				}
				return idents[idents.length - 1].char = idents[idents.length - 1].char.toString() + "."
			}
			lastnum = false
			if (!lastwd) {
				lastwd = true
				store = char
				if (!parseFloat(chars[current + 1]) || wordbuffer.includes(chars[current + 1])) return;
			} else if (wordbuffer.includes(char)) {
				store = char
				lastwd = false
			} else {
				return store += char
			}
			console.log(store)
			switch(store) {
				case ' ':
					return;
				case '{':
					return idents.push({'char': '{', 'ident': IDENT.LCBRACKET, 'classify': IDENT.CBRACKET})
				case '}':
					return idents.push({'char': '}', 'ident': IDENT.RCBRACKET, 'classify': IDENT.CBRACKET})
				case '+':
					const payload1 = {'char': store, 'ident': IDENT.PLUS, 'classify': Classify.OPERATION}
					return idents.push(payload1)
					break;
				case ';':
					const payload2 = {'char': store, 'ident': IDENT.NEWLINE, 'classify': Classify.SYSTEM}
					return idents.push(payload2)
					break;
				case '-':
					const payload3 = {'char': store, 'ident': IDENT.MINUS, 'classify': Classify.OPERATION}
					return idents.push(payload3)
					break;
				case '*':
					const payload4 = {'char': store, 'ident': IDENT.TIMES, 'classify': Classify.OPERATION}
					return idents.push(payload4)
					break;
				case '/':
					const payload5 = {'char': store, 'ident': IDENT.DIVIDE, 'classify': Classify.OPERATION}
					return idents.push(payload5)
					break;
				case '{':
					const payload6 = {'char': store, 'ident': IDENT.LCBRACKET, 'classify': Classify.CBRACKET}
					return idents.push(payload6)
					break;
				case '}':
					const payload7 = {'char': store, 'ident': IDENT.RCBRACKET, 'classify': Classify.CBRACKET}
					return idents.push(payload7)
					break;
				case ' ':
					break;
				case '<ALGEBRA>':
					const payload8 = {'char': store, 'ident': IDENT.ALGEBRA, 'classify': Classify.SETTING}
					return idents.push(payload8)
					break;
				case 'mset':
					const payload9 = {'char': store, 'ident': IDENT.MEMSET, 'classify': Classify.MEMORY}
					return idents.push(payload9)
					break;
				case 'mclear':
					const payload10 = {'char': store, 'ident': IDENT.MEMCLR, 'classify': Classify.MEMORY}
					return idents.push(payload10)
					break;
				default:
					const readmem = {'char': store, 'ident': IDENT.TERM, 'classify': Classify.CHAR}
					return idents.push(readmem)
					break;
			}
		})
  })
	idents.push({'char': '<EOF>', 'ident': IDENT.EOF, 'classify': Classify.SYSTEM})
	return idents
}

module.exports = {
  Lexer,
  'IDT': IDENT,
	'IDTCLA': Classify
}