import fs from 'fs/promises'
import path from 'path'

export abstract class AdventFramework {
    constructor(
        private name: string,
        private inputFilePath: string
    ){}

    abstract solveProblemOne(input: string): number | string
    abstract solveProblemTwo(input: string): number | string

    private async readInputFile() {
        return (await fs.readFile(this.inputFilePath)).toString()
    }

    async solveProblems(problem1: boolean = true, problem2: boolean = true) {
        const input = await this.readInputFile()

        if(problem1) {
            const problem1Result = this.solveProblemOne(input)
            console.log(`Answer problem 1: ${problem1Result}`)
        }

        if(problem2) {
            const problem2Result = this.solveProblemTwo(input)
            console.log(`Answer problem 2: ${problem2Result}`)
        }
    }
}