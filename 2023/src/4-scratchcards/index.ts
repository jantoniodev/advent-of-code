import path from 'path'

import { AdventFramework } from '../adventFramework'

export class ScratchCards extends AdventFramework {
    constructor() {
        super('Scratch Cards', path.join(__dirname, 'input.txt'))
    }

    solveProblemOne(input: string): string | number {
        const cards = input.trim().split('\n')

        const cardRegex = /(Card\s+(?<cardNumber>\d+):)(?<winningNumbers>[\d\s]+)\|(?<numbers>[\d\s]+)/

        const cardPoints = cards.map(card => {
            const match = card.match(cardRegex)

            const cardNumber = parseInt(match?.groups?.['cardNumber'] || '0')

            const winningNumbers = match?.groups?.['winningNumbers']
                .trim()
                .split(' ')
                .map(number => parseInt(number.trim())) || []

            const numbers = match?.groups?.['numbers']
                .trim()
                .split(' ')
                .map(number => parseInt(number.trim())) || []

            const gamePoints = numbers?.reduce((points, number) => {
                if(winningNumbers.find(winningNumber => winningNumber === number)) {
                    return points + 1
                }

                return points
            }, 0)

            if (gamePoints === 0) {
                return {
                    cardNumber,
                    points: 0
                }
            }

            return {
                cardNumber,
                points: Math.pow(2, gamePoints - 1)
            }
        })

        return cardPoints.reduce((result, cardPoint) => result + cardPoint.points, 0)
    }

    solveProblemTwo(input: string): string | number {
        throw new Error('Method not implemented.');
    }
}