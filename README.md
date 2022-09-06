### Tests and linter status:

[![Actions Status](https://github.com/HunterGan/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/HunterGan/frontend-project-lvl2/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/1a3720beb9601b5139e4/maintainability)](https://codeclimate.com/github/HunterGan/frontend-project-lvl2/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/1a3720beb9601b5139e4/test_coverage)](https://codeclimate.com/github/HunterGan/frontend-project-lvl2/test_coverage)

# Description

The following repository contains the util that finds the differ between 2 files.
Input format of files: **JSON**, **YAML**.
Output formats: **Stylish**, **Plain**, **JSON**.

## Installation

1. Clone the repository:
```
HTTPS
$ git clone https://github.com/HunterGan/frontend-project-lvl2.git
SSH
$ git clone git@github.com:HunterGan/frontend-project-lvl2.git
GitHub CLI
gh repo clone HunterGan/frontend-project-lvl2
```
2. Change the working direcctory:
```
$ cd frontend-project-lvl2
```
3. Install dependencies:
```
$ make install
```

## Testing and linting
```
make test
make lint
make test-coverage
```
## How to use
```
$ gendiff [options] <filepath1> <filepath2>
```
_Options:_
```
    -V, --version        output the version number
    -f, --format <type>  output format: 'stylish', 'plain', 'json' (default: 'stylish')
    -h, --help           display help for command
```

**gendiff file1.yaml file2.yml**

**gendiff --format plain file1.json file2.json**

### Example for 2 JSON files

[![asciicast](https://asciinema.org/a/aSeJGrj42Ec9NWnPwknUmNtYX.svg)](https://asciinema.org/a/aSeJGrj42Ec9NWnPwknUmNtYX)

### Example for 2 YAML files

[![asciicast](https://asciinema.org/a/Qmr11wnKXhKMtrHtuAyHYS7dc.svg)](https://asciinema.org/a/Qmr11wnKXhKMtrHtuAyHYS7dc)

### Example for deep files

[![asciicast](https://asciinema.org/a/ot9PxvGDBhVJAKliOoinVjOCn.svg)](https://asciinema.org/a/ot9PxvGDBhVJAKliOoinVjOCn)

### Example plain printout

[![asciicast](https://asciinema.org/a/A8dgUVKGW2a53LP9vjp1ZkA4t.svg)](https://asciinema.org/a/A8dgUVKGW2a53LP9vjp1ZkA4t)

### Example json printout

[![asciicast](https://asciinema.org/a/tHvPHXqqAp1bIacsOlZskihVx.svg)](https://asciinema.org/a/tHvPHXqqAp1bIacsOlZskihVx)
