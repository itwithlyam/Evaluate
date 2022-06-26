VER = 2.0.1
COLOR = '\033[0;31m'
BLUE = '\033[0;34m'
NC='\033[0m'
ARGS = --uncompression-message "Preparing for first time use, please wait..." -- '{{caxa}}/node_modules/.bin/node' '{{caxa}}/index.js'

first:
	@make install
	@echo -e ${BLUE}
	@echo "Please specifify a target: unix, macosapp, win, unixsh (or install dependencies)"

install:
	@echo -e ${COLOR}
	@echo "Installing dependencies"
	@echo -e ${NC}
	@npm install 
	@npm install caxa
	@echo -e ${COLOR}
	@echo "Checking for NASM"
	@echo -e ${NC}
	@nasm -v 
	@echo -e ${COLOR}
	@echo "Checking for linker"
	@echo -e ${NC}
	@ld -v
	@echo -e ${BLUE}
	@echo "Dependencies installed"
	@echo -e ${NC}

unix:
	@make install
	@echo -e ${COLOR}
	@echo "Building for Unix platforms"
	@echo -e ${NC}
	@npx caxa --input '.' --output 'Evaluate-${VER}' ${ARGS}
	@echo "Build complete" 

macosapp:
	@make install
	@echo -e ${COLOR}
	@echo "Building for a MacOS (.app)"
	@echo -e ${NC}
	@npx caxa --input '.' --output 'Evaluate-${VER}.app' ${ARGS}
	@echo "Build complete"

win:
	@make install
	@echo -e ${COLOR}
	@echo "Building for Windows platforms (.exe)"
	@echo -e ${NC}
	@npx caxa --input '.' --output 'Evaluate-${VER}.exe' ${ARGS}
	@echo "Build complete"

unixsh:
	@make install
	@echo -e ${COLOR}
	@echo "Building for Unix platforms (.sh)"
	@echo -e ${NC}
	@npx caxa --input '.' --output 'Evaluate-${VER}.sh' ${ARGS}
	@echo "Build complete"
	
