import { Trebuchet } from '.'

describe('1-trebuchet', () => {
    it('Should calculate calibration values', () => {
        // Arrange
        const input = `
            1abc2
            pqr3stu8vwx
            a1b2c3d4e5f
            treb7uchet
        `
        const trebuchet = new Trebuchet()

        // Act
        const result = trebuchet.solveProblemOne(input)

        // Assert
        expect(result).toBe(142)
    })

    it('Should calculate calibration values considering that numbers can be written with words', () => {
        // Arrange
        const input = `
            two1nine
            eightwothree
            abcone2threexyz
            xtwone3four
            4nineeightseven2
            zoneight234
            7pqrstsixteen
        `
        const trebuchet = new Trebuchet()

        // Act
        const result = trebuchet.solveProblemTwo(input)

        // Assert
        expect(result).toBe(281)
    })
})