const readline = require('readline')

const fs = require('fs')

const MAP_FILE = '/home/plafhz/Documents/programming/advent-of-code/2020/3-toboggan-trajectory/input.txt'

const TREE = '#'

const countMapTrees = (slopeX, slopeY) => {
    let trees = 0

    let lines = []

    return new Promise((resolve, reject) => {
        const readInterface = readline.createInterface({
            input: fs.createReadStream(MAP_FILE),
            console: false
        })

        readInterface.on('line', (line) => {
            lines.push(line.split(""))
        })

        readInterface.on('close', () => {

            let x = 0

            for(let y = 0; y < lines.length; y += slopeY){
                trees += lines[y][x] === TREE ? 1 : 0
                x = (x + slopeX) % lines[0].length 
            }

            resolve(trees)
        })
    })
}

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
]

const trees = slopes.map((slope) => {
    return countMapTrees(slope[0], slope[1])
})

Promise.all(trees)
    .then((treesCountResults) => {
        console.log(treesCountResults)
        const result = treesCountResults.reduce((previous, current) => previous * current) 
        console.log(`Result: ${result}`)
    })
