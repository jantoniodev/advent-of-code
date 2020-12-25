
const readline = require('readline')

const fs = require('fs')

const POLICIES_FILE = 'input.txt'

const POLICIES_REGEX = /(?<atLeast>\d+)-(?<atMost>\d+)\s(?<character>\w):\s(?<password>\w+)/

const validPolicies = []

const readInterface = readline.createInterface({
    input: fs.createReadStream(POLICIES_FILE ),
    console: false
})

readInterface.on('line', (line) => {
    const { atLeast, atMost, character, password } = line.match(POLICIES_REGEX).groups

    const occurrences = password.split("")
       .filter((letter) => letter === character).length

    if(occurrences >= atLeast && occurrences <= atMost){
        validPolicies.push(password)
    }
})

readInterface.on('close', () => {
    console.log(validPolicies.length)
})

