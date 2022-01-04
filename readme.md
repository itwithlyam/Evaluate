# Evaluate.js
Part of the Evaluate collection.

## Example program
Input: ``67+2;``  
Result: ``69``

Input: `210*4;`  
Result: `840`

## Error handling

### Compile-time
- UnnexpectedEOF
- EquationOpen
- EquationClosed

### Runtime
- NotDefined

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
LBRACKET - 14  
RBRACKET - 15  
LSBRACKET - 16  
RSBRACKET - 17  

Input: `67+2;`  
Output: `[{0, 67}, {2, +}, {0, 2}, {1, ;}]`


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
