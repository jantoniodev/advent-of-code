
const readline = require('readline')

const fs = require('fs')

const ANSWERS_FILE = 'input.txt'

const answers = [{
    'groupSize': 0,
    'answers': {}
}]

const readInterface = readline.createInterface({
    input: fs.createReadStream(ANSWERS_FILE),
    console: false
})

readInterface.on('line', (line) => {
    const lastElement = answers[answers.length - 1]

    if(line.trim() === ''){
        answers.push({
            'groupSize': 0,
            'answers': {}
        })
        return
    }

    line.split('').map((value) => {
        lastElement['answers'][value] = !lastElement['answers'][value] ? 1 : lastElement['answers'][value] + 1
    })

    lastElement['groupSize'] += 1

})

readInterface.on('close', () => {

    const countAnswers = answers.map((answer) => Object.keys(answer.answers).filter((key) => answer.answers[key] === answer.groupSize).length)

    const sum = countAnswers.reduce((previous, current) => previous + current)

    console.log(sum)
})
