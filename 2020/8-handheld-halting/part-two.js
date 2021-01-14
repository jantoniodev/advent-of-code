
const readline = require('readline')

const fs = require('fs')

const INSTRUCTIONS_FILE = 'input.txt'

class GameConsole {
    constructor(program) {
        this.program = program || []
        this.halt = false
        this.accumulator = 0
        this.instructionPointer = 0
        this.history = [0]

        this.nop = this.nop.bind(this)
        this.acc = this.acc.bind(this)
        this.jmp = this.jmp.bind(this)

        this.instructionsDecoder = {
            'nop': this.nop,
            'acc': this.acc,
            'jmp': this.jmp,
        }
    }

    start() {
        while (!this.halt) {
            if (this.instructionPointer >= this.program.length) {
                break
            }

            this.execute()
        }

        return [!this.halt, this.accumulator]
    }

    nop() {
        this.next()
    }

    acc(argument) {
        this.accumulator += argument
        this.next()
    }

    jmp(argument) {
        this.next(argument)
    }

    execute() {
        const instruction = this.program[this.instructionPointer]
        this.instructionsDecoder[instruction.operation](instruction.argument)
    }

    next(step) {
        this.instructionPointer += step || 1

        if( this.history.includes(this.instructionPointer) ) {
            this.halt = true
        }

        this.history.push(this.instructionPointer)
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
    // const a = new GameConsole(originalProgram)
    // a.start()

    const allPossibilities = generateAllPossibilities(originalProgram)

    const programs = allPossibilities.map(program => new GameConsole(program))

    const executionResults = programs.map((program, index, programs) => {
        console.log(`Ejecutando programa ${index + 1} de ${programs.length}`)
        const [result, accumulator] = program.start()
        return {
            index,
            result,
            accumulator
        }
    })

    const successExecutions = executionResults.reduce((prev, current) => {
        if(current.result){
            prev.push(current)
        }
        return prev
    }, [])

    console.log(successExecutions)
})

const generateAllPossibilities = (originalProgram) => {
    const toChangeInstructions = originalProgram.reduce((prev, current, index) => {
        if(["jmp", "nop"].includes(current.operation)) {
            prev.push(index)
        }
        return prev
    }, [])

    let changedPrograms = toChangeInstructions.map(index => {
        const program = getProgramClone(originalProgram)
        program[index].operation = program[index].operation === 'jmp' ? 'nop' : 'jmp'
        return program
    })

    changedPrograms.unshift(originalProgram)

    return changedPrograms
}

const getProgramClone = (program) => {
    return [...program.map(instruction => ({...instruction}))]
}