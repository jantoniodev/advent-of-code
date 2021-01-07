
const readline = require('readline')

const fs = require('fs')

const ANSWERS_FILE = 'input.txt'

const answers = [new Set()]

const readInterface = readline.createInterface({
    input: fs.createReadStream(ANSWERS_FILE),
    console: false
})

readInterface.on('line', (line) => {
    const lastElement = answers[answers.length - 1]

    if(line.trim() === ''){
        answers.push(new Set())
        return
    }

    line.split('').map((value) => lastElement.add(value))
})

readInterface.on('close', () => {
    const answersYesCount = answers.reduce((previous, current) => {
        return (typeof previous === 'object' ? previous.size : previous) + current.size
    })

    console.log(answersYesCount)
})
