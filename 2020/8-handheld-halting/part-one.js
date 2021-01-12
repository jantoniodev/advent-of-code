
const readline = require('readline')

const fs = require('fs')

const INSTRUCTIONS_FILE = 'input.txt'

const program = []

let halt = false

let accumulator = 0

let instructionPointer = 0

const ipHistory = [0]

const nop = () => {
    next()
}

const acc = (argument) => {
    accumulator +=  argument
    next()
}

const jmp = (argument) => {
    instructionPointer += argument
}

const next = () => {
    instructionPointer += 1

    if( ipHistory.includes(instructionPointer) ) {
        halt = true
    }

    ipHistory.push(instructionPointer)
}

const instructions = {
    'nop': nop,
    'acc': acc,
    'jmp': jmp,
}

const readInterface = readline.createInterface({
    input: fs.createReadStream(INSTRUCTIONS_FILE),
    console: false
})

readInterface.on('line', (line) => {
    const instructionRegex = /(?<operation>nop|acc|jmp)\s(?<argument>(-|\+)\d+)/

    const match = line.match(instructionRegex)

    program.push({
        operation: match?.groups?.operation,
        argument: +match?.groups.argument
    })
})

readInterface.on('close', () => {
    // setInterval(execute, 500)

    while(!halt){
        execute()
    }
})

const execute = () => {
    const instruction = program[instructionPointer]
    
    console.log(`IP: ${instructionPointer}, ACC: ${accumulator} -> ${instruction.operation} ${instruction.argument}`)

    instructions[instruction.operation](instruction.argument)
}