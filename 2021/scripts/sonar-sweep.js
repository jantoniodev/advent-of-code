const hre = require("hardhat");

async function main() {
  const SonarSweep = await hre.ethers.getContractFactory("SonarSweep");
  const sonarSweep = await Greeter.deploy();

  await sonarSweep.deployed();

  console.log("SonarSweep deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
