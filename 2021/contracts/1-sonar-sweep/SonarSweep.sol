//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SonarSweep {
    
    function calculateIncreases(uint[] calldata measurements) public pure returns (uint) {
        uint result = 0;

        for(uint i = 0; i < measurements.length; i++) {
            if(i == 0) {
                continue;
            }

            uint previousMesurement = measurements[i - 1];
            uint currentMesurement = measurements[i];

            if(currentMesurement > previousMesurement) {
                result++;
            }
        }

        return result;
    }

}
