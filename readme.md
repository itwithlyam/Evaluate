# Evaluate.js
Just an old project... 

## Example program
Input: ``mset b 12 var b``  
Result: ``12``

## Lexer

### Tokens
NUMBER - 0  
NEWLINE - 1  
PLUS - 2  
MINUS - 3  
DIVIDE - 4  
TIMES - 5  
EOF - 6  
LCBRACKET - 7  
RCBRACKET - 8  
ALGEBRA - 9  
MEMSET - 10  
TERM - 11  
MEMCLR - 12  
EQUALS - 13  

## Parser

Tree schema:

```json
{
	"type": string,
	"tokens": Token[],
	"length": number,
	"body": BodyItem[]
}
```
BodyItem schema:

```json
{
	"type": string,
	"kind?": string,
	"declarations?": {
		"type?": string,
		"id?": {
			"name": any,
		},
		"init?": {
			"value": string
		}
	},
	"value": string
}
```
