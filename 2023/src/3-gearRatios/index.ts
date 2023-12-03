import path from 'path'
import { AdventFramework } from '../adventFramework'

interface Coord {
    x: number
    y: number
}

interface Position {
    coords: Coord
    length: number
    value: number
    neighbors: Coord[]
}

export class GearRatios extends AdventFramework {
    constructor() {
        super('Gear ratios', path.join(__dirname, 'input.txt'))
    }

    private getValidNeighbors(coords: Coord, length: number): Coord[] {
        const validNeighbors: Coord[] = []

        for(let i = 0; i < length; i++) {
            // Up
            validNeighbors.push({ x: coords.x + i, y: coords.y - 1 })

            // Down
            validNeighbors.push({ x: coords.x + i, y: coords.y + 1 })
        }

        // Left side
        validNeighbors.push({ x: coords.x - 1, y: coords.y - 1 })
        validNeighbors.push({ x: coords.x - 1, y: coords.y + 0 })
        validNeighbors.push({ x: coords.x - 1, y: coords.y + 1 })

        // Right side
        validNeighbors.push({ x: coords.x + length, y: coords.y - 1 })
        validNeighbors.push({ x: coords.x + length, y: coords.y + 0 })
        validNeighbors.push({ x: coords.x + length, y: coords.y + 1 })

        return validNeighbors
    }

    private checkIsSymbol(char: string) {
        return !!char.match(/[^0-9\.\s]/)
    }

    solveProblemOne(input: string): string | number {
        const inputLines = input.trim().split('\n')

        // Get all number coordinates
        const numberPositions = inputLines.reduce((result, current, row) => {
            const matchs = [...current.trim().matchAll(/\d+/g)]
            const positions = matchs.map(match => {
                const number = match[0]

                if (match.index === undefined) {
                    throw new Error()
                }

                const coords: Coord = { y: row, x: match.index }

                return {
                    coords: coords,
                    length: number.length,
                    value: parseInt(number),
                    neighbors: this.getValidNeighbors(coords, number.length)
                } as Position
            })
            return [...result, ...positions]
        }, [] as Position[])

        // Create a matrix to access easily to each position
        const matrix = inputLines.map(row => {
            return row.trim().split('')
        })

        const validPositions = numberPositions.filter(position => {
            return position.neighbors.some(neighbor => {
                const char = matrix[neighbor.y]?.[neighbor.x] || '.'
                return this.checkIsSymbol(char)
            })
        })

        const validValues = validPositions.map(position => position.value)

        return validValues.reduce((result, value) => result + value)
    }

    solveProblemTwo(input: string): string | number {
        throw new Error('Method not implemented.');
    }
    
}