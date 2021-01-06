
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

    const isValid = REQUIRED_FIELDS.every(requiredField => {
        return Object.keys(passportObject).find(field => field === requiredField)
    })

    return isValid
}