
const readline = require('readline')

const fs = require('fs')

const MAP_FILE = 'input.txt'

const TREE = '#'

let trees = 0

let positionX = 0

let firstLine = true

let lineLength = 0

const readInterface = readline.createInterface({
    input: fs.createReadStream(MAP_FILE),
    console: false
})

readInterface.on('line', (line) => {
    if(firstLine) {
        lineLength = line.length       
        firstLine = false
        return
    }

    positionX = (positionX + 3) % lineLength

    const isTree = line.split("")[positionX] === TREE 
    
    trees += isTree ? 1 : 0
   
})

readInterface.on('close', () => {
    console.log(`Trees count: ${trees}`)
})

