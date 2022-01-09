const LEXER = require("./lexer")
const INTERPRETER = require("./interpreter")
const PARSER = require('./parser')

class LexicalError {
	constructor(type, body, location) {
		console.error(`Lexical ${type} Error: ${body} (Line${location})`)
		process.exit(1)
	}
}

class CompilationError {
	constructor(type, body, location) {
		console.error(`Compilation ${type} Error: ${body} (Line ${location})`)
		process.exit(1)
	}
}

function run(program) {
	let tokens = LEXER.Lexer(program)
	let script = PARSER.Parse(tokens)
	return INTERPRETER.Interpret(script)
}

class RuntimeError {
	constructor(type, body, location) {
		console.error(`Runtime ${type} Error: ${body} (Line ${location})`)
		process.exit(1)
	}
}

class Fault {
	constructor(c) {
		console.error(`FAULT - An internal language fault has been detected! Please report this.\nFull error: \n${c}`)
		process.exit(1)
	}
}

let Yard = (infix) => {
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

function rpn(postfix, line) {
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
	  
	  
  
module.exports = {
	LexicalError,
	CompilationError,
	RuntimeError,
	Fault,
	Yard,
	rpn,
	run
}
