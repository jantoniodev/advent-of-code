
const readline = require('readline')

const fs = require('fs')

const PASSPORTS_FILE = 'input.txt'

const REQUIRED_FIELDS = [
    'byr', // Birth Year
    'iyr', // Issue Year
    'eyr', // Expiration Year
    'hgt', // Height
    'hcl', // Hair Color
    'ecl', // Eye Color
    'pid', // Passport ID
    // NOT REQUIRED
    //'cid', // Country ID
]

const validateBirthYear = (year) => {
    const match = year.match(/^\d{4}$/)
    return match && year >= 1920 && year <= 2002 
}

const validateIssueYear = (year) => {
    const match = year.match(/^\d{4}$/)
    return match && year >= 2010 && year <= 2020 
}

const validateExpirationYear = (year) => {
    const match = year.match(/^\d{4}$/)
    return match && year >= 2020 && year <= 2030 
}

const validateHeight = (height) => {
    const match = height.match(/^(?<value>\d+)(?<unit>in|cm)/)
    if(match){
        const { value, unit } = match.groups
        return unit === 'in' 
            ? value >= 59  && value <= 76
            : value >= 150 && value <= 193
    }
    return false
}

const validateHairColor = (color) => {
    const match = color.match(/^#([0-9]|[a-f]){6}$/)
    return !!match
}

const validateEyeColor = (color) => {
    const match = color.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)
    return !!match
}

const validatePassportID = (id) => {
    const match = id.match(/^\d{9}$/)
    return !!match
}

const fieldValidations = {
    'byr': validateBirthYear,
    'iyr': validateIssueYear,
    'eyr': validateExpirationYear,
    'hgt': validateHeight,
    'hcl': validateHairColor,
    'ecl': validateEyeColor,
    'pid': validatePassportID,
}

let actualPassport = 0

let passports = []

const readInterface = readline.createInterface({
    input: fs.createReadStream(PASSPORTS_FILE),
    console: false
})

readInterface.on('line', (line) => {
    if(passports.length === 0) {
        passports.push("")
    }

    if(line.trim() === "") {
        passports.push("")
        actualPassport += 1
        return
    }

    passports[actualPassport] += `${line} `
})

readInterface.on('close', () => {
    const validPassports = passports.filter(passport => validatePassport(passport))

    console.log(validPassports)
    console.log()
    console.log(`Valid passports: ${validPassports.length}`)
})

const validatePassport = (passport) => {
    const fields = passport.trim().split(" ")

    const passportObject = {}

    fields.forEach(field => {
        const key = field.split(":")[0]
        const value = field.split(":")[1]

        passportObject[key] = value
    })

    const allFieldsRequiredExists = REQUIRED_FIELDS.every(requiredField => {
        return Object.keys(passportObject).find(field => field === requiredField)
    })

    const allFieldRequiredHadValidFormat = Object.keys(passportObject).every(field => {
        if(typeof fieldValidations[field] === 'function') {
            return fieldValidations[field](passportObject[field])
        }

        return true
    })

    return allFieldsRequiredExists && allFieldRequiredHadValidFormat
}