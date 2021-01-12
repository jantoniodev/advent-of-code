
const readline = require('readline')

const fs = require('fs')
const { assert, Console } = require('console')

const RULES_FILE = 'input.txt'

const MY_BAG = 'shiny gold'

const rulesTree = {}

const readInterface = readline.createInterface({
    input: fs.createReadStream(RULES_FILE),
    console: false
})

readInterface.on('line', (line) => {
    
    const ruleRegex = /(?<container>\w+\s\w+) bags contain (?<content>.*)/

    const contentRegex = /(?<count>\d+)\s(?<color>\w+\s\w+)\s(bags|bag).?/

    const { container, content } = line.match(ruleRegex).groups

    const contentRules = content.split(', ').map(contentRule => ({...contentRule.match(contentRegex)?.groups}))

    contentRules.forEach(rule => {
        if(!rulesTree[container]) {
            rulesTree[container] = {}
        }

        if(!rule.color) {
            rulesTree[container] = {}
            return    
        }

        rulesTree[container][rule.color] = +rule.count
    });
})

readInterface.on('close', () => {
    const result = countBags(rulesTree[MY_BAG])

    console.log(`Required bags inside ${MY_BAG} are: ${result}`)
})

const countBags = (tree) => {
    return Object.entries(tree).map(([bag, count]) => {
        if(count === 0) {
            return 0
        }

        return count + (count * countBags(rulesTree[bag]))
    }).reduce((prev, current) => prev + current, 0)
}
