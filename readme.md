# Evaluate
_A bad interpreter that works_

## Example program
Input 
```
mset a 12;
var a
```
Result: `12`  
Input: 
```
{210*4};
```
Result: `840`

**Syntax guide: https://itwithlyam.gitbook.io/evaluate**

## Installation
**If it exists, download the binary for your system. If not, then build from source:**

### Build from source

1. Install [GNU Make](https://www.gnu.org/software/make/).
2. Run `make install` in the source code directory to install required dependencies.

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
--input <file> -i <file> - Path to the target file
--verbose -v - Outputs stack modifications
--version - Version of Evaluate installation
--force -f - Forces the interpreter to run
--disable-warnings - Do not show warnings
```
