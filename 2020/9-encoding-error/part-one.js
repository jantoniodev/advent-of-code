
const readline = require('readline')

const fs = require('fs')

const NUMBERS_FILE = 'input.txt'

const PREAMBLE = 25

const numbers = []

const readInterface = readline.createInterface({
    input: fs.createReadStream(NUMBERS_FILE),
    console: false
})

readInterface.on('line', (line) => {
    numbers.push(+line)
})

readInterface.on('close', () => {
    let preamble = numbers.splice(0, PREAMBLE)
    let nextNumber

    while(numbers.length !== 0) {
        nextNumber = numbers.shift()

        const isValid = checkValidNumber(preamble, nextNumber)

        if(!isValid){
            break
        }

        preamble.shift()
        preamble.push(nextNumber)
    }

    console.log(`First invalid number ${nextNumber}`)
})

const checkValidNumber = (preamble, number) => {
    const newPreamble = [...preamble]

    for (let i = 0; i < newPreamble.length; i++) {
        for (let j = i + 1; j < newPreamble.length; j++) {
            if(newPreamble[i] + newPreamble[j] === number) {
                // console.log(`\t${newPreamble[i]} + ${newPreamble[j]} = ${newPreamble[i] + newPreamble[j]} : ${i} ${j}`)
                return true
            }
        }
    }

    return false
}