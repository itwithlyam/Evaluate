import {Lexer} from "./lexer.js"
import {Interpret} from "./interpreter.js"
import {Parse} from './parser.js'
import fifo from 'fifo'
import chalk from 'chalk'

export class LexicalError {
	constructor(type, body, location, traceback) {
		console.error(chalk.red(`Lexical ${type} Error: ${body} (Line${location})`)+`\n\nTRACEBACK\n${traceback}`)
		process.exit(1)
	}
}

export function ParseTrace(traceback) {
	let Trace = "\n"
	traceback.Stack.forEach(value => {
		Trace += value
		Trace += "\n"
	})
	return Trace
}

export class CompilationError {
	constructor(type, body, location, traceback) {
		console.error(chalk.red(`Compilation ${type} Error: ${body} (Line ${location})`)+`\n\nTRACEBACK` + traceback)
		process.exit(1)
	}
}

export function run(program) {
	let tokens = Lexer(program)
	let script = Parse(tokens)
	return Interpret(script, true)[0]
}

export class RuntimeError {
	constructor(type, body, location, traceback) {
		console.error(chalk.red(`Runtime ${type} Error: ${body} (Line ${location})`)+`\n\nTRACEBACK\n${traceback}`)
		process.exit(1)
	}
}

export class Fault {
	constructor(c) {
		console.error(`FAULT - An internal language fault has been detected! Please report this.\nFull error: \n${c}`)
		process.exit(1)
	}
}

export class StackTrace {
	constructor() {
		this.Stack = fifo()
	}
	push(state, pos) {
		this.Stack.push(`${state}: ${pos}`)
	}
	pop() {
		this.Stack.pop()
	}
	clear() {
		this.Stack.clear()
	}
	get traceback() {
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
