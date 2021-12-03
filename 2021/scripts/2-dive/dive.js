const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function readInput() {
  const data = await fs.promises.readFile(path.join(__dirname, "input.txt"), "utf8")
  return data.split("\n").map(x => x.trim())
}

async function main() {
  const Dive = await hre.ethers.getContractFactory("Dive");
  const dive = await Dive.deploy();

  await dive.deployed();

  const data = await readInput();

  const instructionsMapping = {
      "forward": 0,
      "up": 1,  
      "down": 2,
  }

  const instructions = data.map(line => {
    const splited = line.split(' ')
    return [parseInt(instructionsMapping[splited[0]]), parseInt(splited[1])]
  })

  instructions.forEach(async instruction => {
      if(isNaN(instruction[0]) || isNaN(instruction[1])) return

      await dive.move(instruction[0], instruction[1])
  })

  const depth = await dive.depth()
  const horizontal = await dive.horizontal()

  console.log(`Result part one: depth ${depth} horizontal ${horizontal} - result ${depth * horizontal}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
