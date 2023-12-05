import { select } from '@inquirer/prompts'

import { AdventFramework } from './adventFramework'
import { Trebuchet } from './1-trebuchet'
import { CubeConundrum } from './2-cubeConundrum'
import { GearRatios } from './3-gearRatios'
import { ScratchCards } from './4-scratchcards'

const showMenu = async () => {
    const selectedApp: AdventFramework = await select<AdventFramework>({
        message: 'Select challenge',
        choices: [
            { name: 'day 1 - trebuchet', value: new Trebuchet() },
            { name: 'day 2 - cube conundrum', value: new CubeConundrum()},
            { name: 'day 3 - gear ratios', value: new GearRatios()},
            { name: 'day 4 - scratch cards', value: new ScratchCards() },
        ]
    })

    const selectedPart: [boolean, boolean] = await select({
        message: 'Select answer',
        choices: [
            { name: 'Both answers', value: [true, true] },
            { name: 'Answer 1', value: [true, false] },
            { name: 'Answer 2', value: [false, true] },
        ]
    })

    await selectedApp.solveProblems(...selectedPart)
}

(async () => {
    await showMenu()
})()