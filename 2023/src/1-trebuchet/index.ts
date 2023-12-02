import fs from 'fs/promises'

import { calculateCalibrationValuesPartOne, calculateCalibrationValuesPartTwo } from './trebuchet'

const readInput = async () => {
    const buffer = await fs.readFile('./input.txt')
    return buffer.toString()
}

(async () => {
    const input = await readInput()

    const resultPartOne = calculateCalibrationValuesPartOne(input)
    console.log(`Part one: ${resultPartOne}`)

    const resultPartTwo = calculateCalibrationValuesPartTwo(input)
    console.log(`Part two: ${resultPartTwo}`)
})()