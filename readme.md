# Evaluate
A bad interpreter that works

## Example program
Input: ``{67+2};``  
Result: ``69``

Input: `{210*4};`  
Result: `840`

**Syntax guide: https://itwithlyam.gitbook.io/evaluate**

## Installation
### Windows
Download binary, add to PATH

### MacOS and Linux (build from source):

Our builder doesn't support cross-compiling so you must build from source.

1. Clone source
2. Use the relevant npm script: "npm run buildmacos" or "npm run buildlinux"
3. Wait for the binary to finish building
4. Add the binary to PATH or move it to the directory you are working on

## Run 
Template: `evaluate <input> [args]`

Valid arguments:
```
--input <file> -i <file> - Path to the target file
--verbose -v - Outputs the location of the interpreter at every operation
--version -V - Version of Evaluate installation
```
