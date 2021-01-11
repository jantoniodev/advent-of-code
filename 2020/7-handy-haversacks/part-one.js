
const readline = require('readline')

const fs = require('fs')

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
    const rules = Object.keys(rulesTree)
    
    const myBagRules = rules.map(rule => {
        const stack = [rule]

        while(stack.length != 0) {
            const actualChild = stack.pop()

            if(getChildren(actualChild).includes(MY_BAG)){
                return rule
            }

            stack.push(...getChildren(actualChild))
        }
    }).filter(rule => rule)

    console.log(`The bags colors that can eventually contain at least one ${MY_BAG} are: ${myBagRules.length}`)
})

const getChildren = (object) => {
    return Object.keys(rulesTree[object])
}