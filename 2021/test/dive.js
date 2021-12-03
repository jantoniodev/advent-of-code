const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dive", function () {
    
    it('Should calculate the horizontal and depth given a list of instructions', async () => {
        // arrange
        const Dive = await ethers.getContractFactory("Dive");
        const dive = await Dive.deploy();
        await dive.deployed();

        await dive.move(0, 5)
        await dive.move(2, 5)
        await dive.move(0, 8)
        await dive.move(1, 3)
        await dive.move(2, 8)
        await dive.move(0, 2)

        // act
        const depth = await dive.depth()
        const horizontal = await dive.horizontal()

        // assert
        expect(depth * horizontal).to.equal(150)
    })
});
