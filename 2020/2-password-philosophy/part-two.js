
const readline = require('readline')

const fs = require('fs')

const POLICIES_FILE = 'input.txt'

const POLICIES_REGEX = /(?<firstPosition>\d+)-(?<secondPosition>\d+)\s(?<character>\w):\s(?<password>\w+)/

const validPolicies = []

const readInterface = readline.createInterface({
    input: fs.createReadStream(POLICIES_FILE ),
    console: false
})

readInterface.on('line', (line) => {
    const { firstPosition, secondPosition, character, password } = line.match(POLICIES_REGEX).groups

    const passwordArray = password.split("")

    const firstPositionMatched = passwordArray[firstPosition - 1] === character
    const secondPositionMatched = passwordArray[secondPosition - 1] === character

    if( firstPositionMatched ? !secondPositionMatched : secondPositionMatched) {
        validPolicies.push(line)
    }

})

readInterface.on('close', () => {
    console.log(`Valid Policies: ${validPolicies.length}`)
})

