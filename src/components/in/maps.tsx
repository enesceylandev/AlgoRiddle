type Map = {
    ruleset: {
        control: string[],
        color: string[],
        functions: { name: string; args: number }[];
    },
    player: {
        spawn: number[],
        direction: string,
    },
    board: {
        cord: number[],
        color: string,
        required?: true
    }[]
}
export const playground: Map[] = [
    {
        ruleset: {
            control: [ 'left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: [{ name: 'f0', args: 5 }, { name: 'f1', args: 7 }]
        },
        player: {
            spawn: [4, 5],
            direction: 'right'
        },
        board: [
            {
                cord: [4, 5],
                color: 'blue'
            },
            {
                cord: [5, 5],
                color: 'blue',
                required: true
            },
            {
                cord: [6, 5],
                color: 'purple'
            },
            {
                cord: [7, 5],
                color: 'purple'
            },
            {
                cord: [8, 5],
                color: 'purple'
            },
            {
                cord: [9, 5],
                color: 'purple'
            },
            {
                cord: [10, 5],
                color: 'purple',
                required: true
            },
            {
                cord: [10, 6],
                color: 'red'
            },
            {
                cord: [10, 7],
                color: 'red'
            }
        ]
    }
]

