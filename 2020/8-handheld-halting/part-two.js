
const readline = require('readline')

const fs = require('fs')

const INSTRUCTIONS_FILE = '/home/plafhz/Documents/programming/advent-of-code/2020/8-handheld-halting/input_test.txt'

class GameConsole {
    constructor(program) {
        this.program = program || []
        this.halt = false
        this.accumulator = 0
        this.instructionPointer = 0
        this.history = [0]

        this.instructionsDecoder = {
            'nop': this.nop,
            'acc': this.acc,
            'jmp': this.jmp,
        }
    }

    start() {
        while (!this.halt) {
            if (this.instructionPointer >= this.program.length - 1) {
                break
            }

            this.execute()
        }

        console.log(`Program finished ${this.halt ? 'with errors' : 'correctly'}.`)
    }

    nop() {
        this.instructionPointer += 1
        console.log(this)
        this.history.push(this.instructionPointer)
    }

    acc(argument) {
        this.accumulator += argument
        this.instructionPointer += 1
        this.history.push(this.instructionPointer)
    }

    jmp(argument) {
        this.instructionPointer += argument
        this.history.push(this.instructionPointer)
    }

    execute() {
        const instruction = this.program[this.instructionPointer]

        console.log(`IP: ${this.instructionPointer}, ACC: ${this.accumulator} -> ${instruction.operation} ${instruction.argument}`)

        this.instructionsDecoder[instruction.operation](instruction.argument)
    }
}

const originalProgram = []

const readInterface = readline.createInterface({
    input: fs.createReadStream(INSTRUCTIONS_FILE),
    console: false
})

readInterface.on('line', (line) => {
    const instructionRegex = /(?<operation>nop|acc|jmp)\s(?<argument>(-|\+)\d+)/

    const match = line.match(instructionRegex)

    originalProgram.push({
        operation: match?.groups?.operation,
        argument: +match?.groups.argument
    })
})

readInterface.on('close', () => {
    const a = new GameConsole(originalProgram)
    a.start()
})