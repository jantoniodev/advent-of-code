const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function readInput() {
  const data = await fs.promises.readFile(path.join(__dirname, "input.txt"), "utf8")
  return data.split("\n").map(x => parseInt(x.trim()))
}

async function main() {
  const SonarSweep = await hre.ethers.getContractFactory("SonarSweep");
  const sonarSweep = await SonarSweep.deploy();

  await sonarSweep.deployed();

  const data = await readInput();

  var resultPartOne = await sonarSweep.calculateIncreases(data);
  var resultPartTwo = await sonarSweep.calculateIncreasesWithSlidingWindow(data);

  console.log("Result part one:", resultPartOne.toString());
  console.log("Result part two:", resultPartTwo.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
