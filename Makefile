VER = 1.1.1

first:
	@echo "Please specifify a target: unix, macosapp, win (or install dependencies)"

install:
	@echo "Installing dependencies"
	@npm install 
	@npm install caxa

unix:
	@echo "Building for Unix platforms"
	@npx caxa --input '.' --output 'Evaluate-${VER}' -- '{{caxa}}/node_modules/.bin/node' '{{caxa}}/index.js'
	@echo "Build complete"

macosapp:
	@echo "Building for a MacOS (.app)"
	@npx caxa --input '.' --output 'Evaluate-${VER}.app' -- '{{caxa}}/node_modules/.bin/node' '{{caxa}}/index.js'
	@echo "Build complete"

win:
	@echo "Building for Windows platforms (.exe)"
	@npx caxa --input '.' --output 'Evaluate-${VER}.exe' -- '{{caxa}}/node_modules/.bin/node' '{{caxa}}/index.js'
	@echo "Build complete"
	