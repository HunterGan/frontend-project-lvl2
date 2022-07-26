#Makefile
install: # useful after first clone or del node-modules
	npm ci
lint: #start eslint
	npx eslint .
test: #start testing
	NODE_OPTIONS=--experimental-vm-modules npx jest