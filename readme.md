# Evaluate
*A homemade professional compiled programming language.*

*It compiles to NASM and can cross-compile, though it's cross-compilation capabilities haven't been verified.*

# Notice
I am now going to archive Evaluate due to the project becoming boring and confusing to work on. In the future I might continue with Evaluate V2 (written in C++) but for the forseeable future I am focusing a lot more on web development which is where I can both earn money through freelancing and enjoy my work more.

## Example program
Input 
```
Int_64 number = 123456751
printf("{number}\n")
``` 
Result: `123456751`

Input: 
```
equate("240*4")
```
Result: `840`

**Syntax guide has moved to GitHub discussions.**

## Installation

1. Install NASM (The Netwide Assembler) and GNU Binutils on your desired computer. These are Evaluate's external dependencies.
2. If you're using Visual Studio Code, the Evaluate Language Support extension is recommended.
3. **If it exists, download the Evaluate binary for your OS. If not, then build from source:**

### Build from source

1. Install [GNU Make](https://www.gnu.org/software/make/). Make sure to add to PATH or envrionment variables.
2. Install [Node.js and npm](https://www.nodejs.org). Make sure to select npm when given the option by the node installer. Make sure to add to PATH or environment variables.
3. Install the latest release of [NASM (the Netwide Assembler)](https://www.nasm.us/pub/nasm/releasebuilds/?C=M;O=D) for your OS. Make sure to add to PATH or environment variables.
4. If you're using Visual Studio Code, the Evaluate Language Support extension is recommended.
5. Follow the instructions below for your OS.

#### Windows
Run `make win`, the output will be a .exe file

#### Unix (macos/linux)
Run `make unix`, the output will be an executable

#### MacOS app
Run `make macosapp`, the output will be a .app file

## Run 
1. Template: `evaluate <input> [args]`

CLI Flags:
```
--input <file> -i <file> - Path to the target file - Default parameter
--verbose -v - Outputs stack modifications
--version -V - Version of Evaluate installation
--force -f - Forces the program to run
--disable-warnings -d - Do not show warnings
--output <output> -o <output> - defaults to "output" - The name of the outputted *.asm file.
--help -h - Outputs the args help menu
--file <type> -F <type> - Specifies the file type to output (elf32, asmWin, asmMac, asm)
```

2. Use NASM to compile the generated asm file (if generating ELF, skip this step). The OS-specific commands are:
```
Linux (highly supported): nasm -f elf <file>.asm
Windows (supported): nasm -f win32 <file>.asm
MacOS (not supported): nasm -f macho64 <file>.asm
```
3. Link the object file - GCC can also be used (if generating ELF, skip this step).
```
Linux and MacOS: ld -o <file> <file>.o
Windows: ld -o <file>.exe <file>.o
```


## Git

As you might have noticed, we have multiple GitHub branches. The order of reliability follows:

1. Featured Experiments
2. Experimental Build (main)
3. PTB - Public Test Build
4. Production

with 1 being the least reliable and littered with bugs and 4 being the most reliable and without many bugs.
