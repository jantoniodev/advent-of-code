
const readline = require('readline')

const fs = require('fs')

const EXPENSE_REPORT_FILE = 'input.txt'

const expenseReport = []

const findSum = (numbers, sum) => {
    const results = []
    numbers.forEach(number1 => {
        numbers.forEach(number2 => {
            if(number1 + number2 === sum){
                results.push([number1, number2])
            }
        })
    })
    return results
}

const readInterface = readline.createInterface({
    input: fs.createReadStream(EXPENSE_REPORT_FILE),
    console: false
})

readInterface.on('line', (line) => {
   
    expenseReport.push(+line)

})

readInterface.on('close', () => {
    
    console.log(findSum(expenseReport, 2020)[0].reduce((acumulator, current) => current * acumulator ))

})

