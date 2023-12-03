import { AdventFramework } from '../adventFramework'
import path from 'path'

export class CubeConundrum extends AdventFramework {
    constructor() {
        super('Cube Conundrum', path.join(__dirname, 'input.txt'))
    }

    solveProblemOne(input: string): string | number {
        const inputLines = input.trim().split('\n')

        const maxGreen = 13
        const maxRed = 12
        const maxBlue = 14

        const games = inputLines.map(line => {
            const gameSection = line.split(':')[0].trim()
            const gameSectionMatch = gameSection.match(/Game (?<gameNumber>\d+)/)
            const gameNumber = parseInt(gameSectionMatch?.groups?.['gameNumber'] || '0')

            const gameSetsSection = line.split(':')[1]
            const sets = gameSetsSection.split(';')
            const arePossibleSets = sets.map(set => {
                const matches = [...set.matchAll(/((?<blueCount>\d+) blue)|((?<redCount>\d+) red)|((?<greenCount>\d+) green)/g)]
                
                const counts = matches.reduce((result, match) => {
                    const blueCount = match.groups?.blueCount
                    const redCount = match.groups?.redCount
                    const greenCount = match.groups?.greenCount

                    return {
                        green: greenCount ? parseInt(greenCount) : result.green,
                        red: redCount ? parseInt(redCount) : result.red,
                        blue: blueCount ? parseInt(blueCount) : result.blue
                    }
                    
                }, {red: 0, green: 0, blue: 0})

                return counts.red <= maxRed && counts.green <= maxGreen && counts.blue <= maxBlue
            })

            const result = arePossibleSets.every(set => set) ? gameNumber : 0
            return result
        })

        return games.reduce((result, current) => result + current, 0)
    }

    solveProblemTwo(input: string): string | number {
        throw new Error('Method not implemented.');
    }
}