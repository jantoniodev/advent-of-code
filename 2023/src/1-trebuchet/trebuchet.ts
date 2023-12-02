export const calculateCalibrationValuesPartOne = (input: string) => {
    const calibrationInputs = input.trim().split('\n')

    const calibrationValues = calibrationInputs.map(calibrationInput => {
        const numbers = calibrationInput
            .split('')
            .filter(char => !isNaN(parseInt(char)))

        if(numbers.length === 0) {
            return 0
        }

        return parseInt(numbers[0] + numbers[numbers.length - 1])
    })

    const result = calibrationValues.reduce((result, current) => result + current, 0)

    return result
}

export const calculateCalibrationValuesPartTwo = (input: string) => {
    const calibrationInputs = input.trim().split('\n')

    const numberMap: {[key: string]: string} = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9'
    }

    const numbersWord = Object.keys(numberMap)

    const calibrationValues = calibrationInputs.map(calibrationInput => {
        const numbers = calibrationInput
            .split('')
            .reduce((prev, current, index, array) => {
                if(!isNaN(parseInt(current)))
                    return [...prev, current]

                for(const word of numbersWord) {
                    const isWordNumber = array.slice(index, index + word.length).join('') === word
                    if (isWordNumber) {
                        return [...prev, numberMap[word]]
                    }
                }

                return prev
            }, [] as string[])
        
        return parseInt(numbers[0] + numbers[numbers.length - 1])
    })

    const result = calibrationValues.reduce((result, current) => result + current, 0)

    return result
}