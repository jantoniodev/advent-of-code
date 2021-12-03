// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Dive {

    enum Instructions { Forward, Up, Down }

    uint public horizontal = 0;
    uint public depth = 0;
    uint public aim = 0;

    function move(Instructions instruction, uint value) public {
        if(instruction == Instructions.Forward) {
            horizontal += value;
            return;
        }

        if(instruction == Instructions.Up) {
            depth -= value;
            return;
        }

        if(instruction == Instructions.Down) {
            depth += value;
            return;
        }
    }

    function moveAim(Instructions instruction, uint value) public {
        if(instruction == Instructions.Forward) {
            horizontal += value;
            depth += aim * value;
            return;
        }

        if(instruction == Instructions.Up) {
            aim -= value;
            return;
        }

        if(instruction == Instructions.Down) {
            aim += value;
            return;
        }
    }

    function reset() public {
        horizontal = 0;
        depth = 0;
        aim = 0;
    }
}