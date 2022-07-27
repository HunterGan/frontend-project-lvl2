#Makefile
install: # useful after first clone or del node-modules
	npm ci
lint: #start eslint
	npx eslint .
test: #start testing
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
publish:
	npm publish