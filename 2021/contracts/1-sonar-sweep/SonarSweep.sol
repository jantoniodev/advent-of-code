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

    function calculateIncreasesWithSlidingWindow(uint[] calldata measurements) public pure returns (uint) {
        uint result = 0;

        uint previousWindow = 0;

        for(uint i = 0; i < measurements.length; i++) {
            uint[3] memory window = [
                measurements[i],
                i + 1 < measurements.length - 1 ? measurements[i + 1] : 0,
                i + 2 < measurements.length - 1 ? measurements[i + 2] : 0
            ];

            uint currentWindow = window[0] + window[1] + window[2];

            if(i > 0 && currentWindow > previousWindow) {
                result++;
            }

            previousWindow = currentWindow;
        }

        return result;
    }

}
