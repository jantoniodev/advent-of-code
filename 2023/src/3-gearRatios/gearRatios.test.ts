import { GearRatios } from '.'

describe('Gear ratios', () => {
    it('Should calculate the part number from number that are adjacent to a symbol', async () => {
        // Arrange
        const input = `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `
        const gearRatios = new GearRatios()

        // Act
        const result = gearRatios.solveProblemOne(input)

        // Assert
        expect(result).toBe(4361)
    })
})