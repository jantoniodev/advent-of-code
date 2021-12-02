const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SonarSweep", function () {
    
    it('Should calculate increased values on a list of measurements', async () => {
        // arrange
        const SonarSweep = await ethers.getContractFactory("SonarSweep");
        const sonarSweep = await SonarSweep.deploy();
        await sonarSweep.deployed();

        const measurements = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ]

        // act
        const result = await sonarSweep.calculateIncreases(measurements)

        // assert
        expect(result).to.equal(7)
    })

});
