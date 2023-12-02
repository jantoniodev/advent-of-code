import { calculateCalibrationValuesPartOne, calculateCalibrationValuesPartTwo } from './trebuchet'

describe('1-trebuchet', () => {
    it('Should calculate calibration values', () => {
        // Arrange
        const input = `
            1abc2
            pqr3stu8vwx
            a1b2c3d4e5f
            treb7uchet
        `

        // Act
        const result = calculateCalibrationValuesPartOne(input)

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

        // Act
        const result = calculateCalibrationValuesPartTwo(input)

        // Assert
        expect(result).toBe(281)
    })
})