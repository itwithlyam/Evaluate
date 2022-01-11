import * as LEXER from "./lexer.js"
import * as INTERPRETER from "./interpreter.js"
import * as PARSER from './parser.js'
import * as FIFO from 'fifo'

export class LexicalError {
	constructor(type, body, location) {
		console.error(`Lexical ${type} Error: ${body} (Line${location})`)
		process.exit(1)
	}
}

export class CompilationError {
	constructor(type, body, location) {
		console.error(`Compilation ${type} Error: ${body} (Line ${location})`)
		process.exit(1)
	}
}

export function run(program) {
	let tokens = LEXER.Lexer(program)
	let script = PARSER.Parse(tokens)
	return INTERPRETER.Interpret(script)
}

export class RuntimeError {
	constructor(type, body, location) {
		console.error(`Runtime ${type} Error: ${body} (Line ${location})`)
		process.exit(1)
	}
}

export class Fault {
	constructor(c) {
		console.error(`FAULT - An internal language fault has been detected! Please report this.\nFull error: \n${c}`)
		process.exit(1)
	}
}

class StackTrace {
	constructor() {
		this.Stack = FIFO()
	}
	Push(state, pos) {
		this.Stack.push(`${state}: ${pos}`)
	}
	Pop() {
		this.Stack.pop()
	}
	Clear() {
		this.Stack.clear()
	}
	get Traceback() {
		return this.Stack
	}
}
export const GlobalStack = new StackTrace()

export let Yard = (infix) => {
	let ops = {'+': 1, '-': 1, '*': 2, '/': 2};
	let peek = (a) => a[a.length - 1];
	let stack = [];
  
	return infix
	  .reduce((output, token) => {
		if (parseFloat(token)) {
		  output.push(token);
		}
  
		if (token in ops) {
		  while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
			output.push(stack.pop());
		  stack.push(token);
		}
  
		if (token == '(') {
		  stack.push(token);
		}
  
		if (token == ')') {
		  while (peek(stack) != '(')
			output.push(stack.pop());
		  stack.pop();
		}
  
		return output;
	  }, [])
	  .concat(stack.reverse())
  }

export function rpn(postfix, line) {
	if (postfix.length === 0) {
		return 0;
	}
		
	var stack = [];
	
	for (var i = 0; i < postfix.length; i++) {
		var token = postfix[i];
	
		if (!Number.isNaN(+token)) {
		stack.push(parseFloat(token));
		}
	
		else {
		if (stack.length < 2) {
			throw new RuntimeError('ExpressionTooShort', 'Insufficient values in expression', line);
		}
	
		var y = stack.pop();
		var x = stack.pop();
		stack.push(eval(x + token + ' ' + y));
		}
	}
	
	if (stack.length > 1) {
		throw new RuntimeError('ExpressionSyntax', 'Inputted expression has a syntax error', line);
	}
	
	return stack.pop();
}
