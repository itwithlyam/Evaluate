# Evaluate
_A hybrid programming language. It can both compile and interpret._

**We use Jira to track bugs and new features, so in some commits and branches there will be a Jira issue ID.**

## Example program
Input 
```
mset a 12;
var a
```
Result: `12`  
Input: 
```
equate("240*4")
```
Result: `840`

**Syntax guide: https://itwithlyam.gitbook.io/evaluate**

## Installation

1. Install NASM (The Netwide Assembler) on your desired computer. This is a dependency of Evaluate's compiler.
2. **If it exists, download the Evaluate binary for your OS. If not, then build from source:**

### Build from source

1. Install [GNU Make](https://www.gnu.org/software/make/). Make sure to add to PATH or envrionment variables.
2. Install [Node.js and npm](https://www.nodejs.org). Make sure to select npm when given the option by the node installer. Make sure to add to PATH or environment variables.
3. Install the latest release of [NASM (the Netwide Assembler)](https://www.nasm.us/pub/nasm/releasebuilds/?C=M;O=D) for your OS. Make sure to add to PATH or environment variables.
4. Run `make install` in the source code directory to install required libraries.

#### Windows
Run `make win`, the output will be a .exe file

#### Unix (macos/linux)
Run `make unix`, the output will be an executable

#### MacOS app
Run `make macosapp`, the output will be a .app file

## Run 
Template: `evaluate <input> [args]`

CLI Flags:
```
--input <file> -i <file> - Path to the target file - Default
--verbose -v - Outputs stack modifications
--version - Version of Evaluate installation
--force -f - Forces the interpreter to run
--disable-warnings - Do not show warnings
--compile <output> -o <output> - Switch between the interpreter and in-built compiler, takes the target file name
```

## Git format

As you might have noticed, we have multiple GitHub branches. The order of reliability follows:

1. Featured Experiments (other branches)
2. Experimental Build (main)
3. Public Test Build - PTB (production)
4. Tags (GitHub releases)

with 1 being the least reliable and littered with bugs and 4 being the most reliable and without many bugs. To run an experimental build or featured experiment, you must use the --force flag.
